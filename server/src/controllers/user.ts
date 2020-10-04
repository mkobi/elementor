import { isEmpty } from "lodash";
import { RequestHandler } from "../handlers/asyncHandler";
import { BadRequest } from "../middlewares/errorHandler";

export const registerUserController: RequestHandler = async (req) => {
  const { context } = req.app.locals;
  const { logic } = context;
  const { body } = req;

  return logic.user.registerUser(body);
};

export const loginController: RequestHandler = async (req) => {
  const { context, userAgent, ip } = req.app.locals;
  const { logic } = context;
  const { body } = req;

  const result = await logic.user.authenticateUser({
    user: body,
    sessionData: {
      ip,
      userAgent,
    },
  });
  if (isEmpty(result)) {
    throw new BadRequest("Username or password are incorrect.");
  }

  return {
    success: true,
    userId: result?.user.id,
    sessionId: result?.session?.id,
  };
};

export const getUserController: RequestHandler = async (req) => {
  const { context } = req.app.locals;
  const { logic } = context;
  const { params } = req;
  const result = await logic.user.authenticateUser(params);

  if (isEmpty(result)) {
    throw new BadRequest("No matching user for this id.");
  }

  const { id, ...rest } = result;

  return rest;
};

export const getOnlineUsersController: RequestHandler = async (req) => {
  const { context } = req.app.locals;
  const { logic } = context;

  return logic.user.getOnlineUsers();
};

export const logoutController: RequestHandler = async (req) => {
  const { context } = req.app.locals;
  const { logic } = context;
  const { body } = req;

  return logic.user.logoutUser(body);
};
