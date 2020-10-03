import { RequestHandler } from "../handlers/asyncHandler";

export const registerUserController: RequestHandler = async (req, res) => {
  const { context } = req.app.locals;
  const { logic } = context;
  const { body } = req;

  return logic.user.registerUser(body);
};
