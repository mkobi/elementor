import { NextFunction } from "express";
import {
  Params,
  ParamsDictionary,
  Query,
  Response
} from "express-serve-static-core";
import { Logic } from "../logic";

export interface RequestContext {
  logic: Logic;
}

export const SUCCESS_MESSAGE = { success: true };

export interface RequestHandler<
  P extends Params = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Query
> {
  // tslint:disable-next-line callable-types (This is extended from and can't extend from a type alias in ts<2.2
  (req: any, res: Response<ResBody>, next?: NextFunction): any;
}

export const asyncHandler = <
  P extends Params = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Query
>(
  fn: RequestHandler<P, ResBody, ReqBody, ReqQuery>
): RequestHandler<P, ResBody, ReqBody, ReqQuery> => {
  return async (...args) => {
    const next = args[args.length - 1] as NextFunction;
    const response = args[args.length - 2] as Response<ResBody>;
    try {
      const result = await Promise.resolve(fn(...args));
      response.status(200).json(result || SUCCESS_MESSAGE);
    } catch (error) {
      next(error);
    }
  };
};
