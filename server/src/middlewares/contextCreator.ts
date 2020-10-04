import { last } from "lodash";
import { RequestHandler } from "express";
import { Logic } from "../logic";

export const contextCreator: RequestHandler = (req, res, next) => {
  const { ip } = req;
  const formattedIp = last(ip?.split(":"));
  const userAgent = req.get("User-Agent");

  const context = {
    logic: new Logic()
  };

  req.app.locals = {
    context,
    userAgent,
    ip: formattedIp
  };

  next();
};
