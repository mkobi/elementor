import { RequestHandler } from "express";
import { Logic } from "../logic";

export const contextCreator: RequestHandler = (req, res, next) => {
  const context = {
    logic: new Logic()
  };

  req.app.locals = {
    context
  };

  next();
};
