import { ErrorRequestHandler } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status';

export class BaseError extends Error {
  constructor(public message: string, public status: number = INTERNAL_SERVER_ERROR) {
    super(message);
  }
}

export const errorHandlerMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof BaseError) {
    console.error('Error occurred in endpoint ', {
      message: error.message,
      ...error,
      stack: error.stack,
    });
    res.status(error.status).send(error.message);
  } else {
    console.error('Unknown error occurred', { error });
    res.status(INTERNAL_SERVER_ERROR).send(error.message || 'Internal Error');
  }
};
