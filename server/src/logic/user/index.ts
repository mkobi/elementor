import { first, isEmpty, omit } from "lodash";
import { getRepository } from "typeorm";
import { Session } from "../../model/entity/Session";
import { User } from "../../model/entity/User";
import {
  AuthenticateUserInput,
  LogoutUserInput,
  SessionDataInput,
  UserInput,
} from "./types";

export class UserLogic {
  private userRepo;
  private sessionRepo;

  constructor() {
    this.userRepo = getRepository(User);
    this.sessionRepo = getRepository(Session);
  }

  public async registerUser(data: UserInput) {
    const { username } = data;

    const isUsernameAvailable = await this.isUsernameAvailable(username);

    if (!isUsernameAvailable) {
      throw new Error(
        `Username "${username}" is taken, please choose another one.`
      );
    }

    this.userRepo.save(data);
  }

  public async authenticateUser(data: AuthenticateUserInput) {
    const { user, sessionData } = data;
    const result = await this.userRepo.find(user);
    if (isEmpty(result)) {
      return undefined;
    }

    const authenticatedUser: User = first(result);
    const sessionRecord = await this.saveUserSession({
      user: authenticatedUser,
      sessionData,
    });

    return { user: authenticatedUser, session: sessionRecord };
  }

  public async getSessionData(data: SessionDataInput) {
    const { id } = data;

    const result = await this.sessionRepo
      .createQueryBuilder("session")
      .where({ id })
      .leftJoinAndSelect("session.user", "user")
      .getOne();

    if (isEmpty(result)) {
      return undefined;
    }

    const user = await this.userRepo
      .createQueryBuilder("user")
      .where({ id: result?.user?.id })
      .leftJoinAndSelect("user.sessions", "session")
      .getOne();

    const formattedResult = this.extractSessionData(result);
    return { ...formattedResult, sessionsCount: user?.sessions?.length };
  }

  public async getOnlineUsers() {
    return this.sessionRepo
      .createQueryBuilder("session")
      .where({ isOnline: true })
      .leftJoinAndSelect("session.user", "user")
      .getMany()
      .then((results) => ({
        onlineUsers: results.map((onlineUser) => ({
          sessionId: onlineUser.id,
          ip: onlineUser.ip,
          sessionStartTime: onlineUser.createdAt,
          username: onlineUser.user?.username,
        })),
      }));
  }

  public async logoutUser(data: LogoutUserInput) {
    const { userId, sessionId } = data;

    sessionId
      ? this.sessionRepo.update(sessionId, { isOnline: false })
      : this.sessionRepo.update({ userId }, { isOnline: false });
  }

  private async saveUserSession(data: AuthenticateUserInput): Promise<void> {
    const {
      user,
      sessionData: { ip, userAgent },
    } = data;

    const session = {
      ip,
      userAgent,
      isOnline: true,
      user,
    };

    return this.sessionRepo.save(session);
  }

  private extractSessionData(sessionData) {
    const { user, userAgent } = sessionData;

    return { userAgent, registrationTime: user?.createdAt };
  }

  private async isUsernameAvailable(username) {
    return this.userRepo.find({ username }).then((result) => isEmpty(result));
  }
}
