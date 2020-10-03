import { UserLogic } from "./user";

export class Logic {
  public user: UserLogic;

  constructor() {
    this.user = new UserLogic();
  }
}
