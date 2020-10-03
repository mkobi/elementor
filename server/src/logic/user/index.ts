import { isEmpty } from "lodash";
import { getRepository } from "typeorm";
import { User } from "../../model/entity/User";

export class UserLogic {
  private userRepo;

  constructor() {
    this.userRepo = getRepository(User);
  }

  public async registerUser(userData) {
    const { username } = userData;
    const isUsernameAvailable = await this.isUsernameAvailable(username);

    if (!isUsernameAvailable) {
      throw new Error(
        `Username "${username}" is taken, please choose another one.`
      );
    }

    this.userRepo.save(userData);
  }

  private async isUsernameAvailable(username) {
    return this.userRepo.find({ username }).then(result => isEmpty(result));
  }
}
