import { isEmpty } from "lodash";
import { RequestHandler } from "../handlers/asyncHandler";
import { BadRequest } from "../middlewares/errorHandler";

export const registerUserController: RequestHandler = async (req, res) => {
  const { context } = req.app.locals;
  const { logic } = context;
  const { body } = req;

  return logic.user.registerUser(body);
};

export const loginController: RequestHandler = async (req, res) => {
  const { context } = req.app.locals;
  const { logic } = context;
  const { body } = req;
  const result = await logic.user.authenticateUser(body);
  if (isEmpty(result)) {
    throw new BadRequest("User or Password are incorrect.");
  }

  return { success: true, userId: result?.id };
};
