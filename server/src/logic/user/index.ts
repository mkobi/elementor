import { first, isEmpty } from "lodash";
import { getRepository } from "typeorm";
import { User } from "../../model/entity/User";
import { Session } from "../../model/entity/Session";
import { AuthenticateUserInput, UserInput } from "./types";

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
    this.saveUserSession({ user: authenticatedUser, sessionData });

    return isEmpty(result) ? undefined : authenticatedUser;
  }

  public async getOnlineUsers() {
    return this.sessionRepo
      .find({ isOnline: true, relations: ["user"] })
      .then(results => ({
        onlineUsers: results.map(onlineUser => onlineUser.user?.username)
      }));
  }

  private async saveUserSession(data: AuthenticateUserInput): Promise<void> {
    const {
      user,
      sessionData: { ip, userAgent }
    } = data;

    const session = {
      ip,
      userAgent,
      isOnline: true,
      user
    };

    return this.sessionRepo.save(session);
  }

  private async isUsernameAvailable(username) {
    return this.userRepo.find({ username }).then(result => isEmpty(result));
  }
}
