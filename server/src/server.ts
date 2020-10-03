import bodyParser from "body-parser";
import express from "express";
import { Router } from "express-serve-static-core";
import _ from "lodash";
import { createConnection } from "typeorm";
import settings from "./config/settings";
import { userControllers } from "./controllers";
import { asyncHandler } from "./handlers/asyncHandler";
import { contextCreator } from "./middlewares/contextCreator";
import { errorHandlerMiddleware } from "./middlewares/errorHandler";

export async function initDatabase() {
  const dbConf = _.extend(settings.db);

  return createConnection({
    ...dbConf
  }).catch(error => {
    console.error("Failed to connect to MySql: ", error);
    process.exit(1);
  });
}

export async function runServer(port: number) {
  const app = express();
  app.use(bodyParser.json());
  const router: Router = express.Router();
  router.use(contextCreator);

  router.post(
    "/register",
    asyncHandler(userControllers.registerUserController)
  );

  router.post("/login", asyncHandler(userControllers.loginController));
  router.get("/getUserData/:id", asyncHandler(userControllers.getUserController));

  router.use(errorHandlerMiddleware);

  app.use("/", router);
  app.listen(port, () => {
    console.log(`Server listener is up on port ${port}`);
  });
}
