/*import { createConnection } from "typeorm";
import settings from "../../config/settings";
import { User } from "../entity/User";
import mockData from "../mockData";*/

async function seed() {
  console.log("seeding...");
  /*createConnection({
    ...settings.db,
    name: "seed",
    host: settings.db.host
  })
    .then(async connection => {
      connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(mockData)
        .execute();
    })
    .catch(error => {
      console.error("Failed to connect to MySql: ", error);
      process.exit(1);
    });*/
}

seed();
