import { isEmpty, first } from "lodash";
import { getRepository } from "typeorm";
import { User } from "../../model/entity/User";
import { UserData } from "./types";

export class UserLogic {
  private userRepo;

  constructor() {
    this.userRepo = getRepository(User);
  }

  public async registerUser(data: UserData) {
    const { username } = data;
    const isUsernameAvailable = await this.isUsernameAvailable(username);

    if (!isUsernameAvailable) {
      throw new Error(
        `Username "${username}" is taken, please choose another one.`
      );
    }

    this.userRepo.save(data);
  }

  public async authenticateUser(data: UserData): Promise<string> {
    const user = await this.userRepo.find(data);


    return isEmpty(user) ? undefined : first(user);
  }

  private async isUsernameAvailable(username) {
    return this.userRepo.find({ username }).then(result => isEmpty(result));
  }
}
