import { JsonWebTokenError } from "jsonwebtoken";
import { InvalidParamError } from "../../errors/InvalidParamError";
import { NotAuthorizedError } from "../../errors/NotAuthorizedError";
import { QueryError } from "../../errors/QueryError";
import { TokenError } from "../../errors/TokenError";
import { statusCodes } from "../../utils/constants/statusCode";
import { NextFunction, Request, Response } from "express";


function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  let message = error.message;
  let status = statusCodes.INTERNAL_SERVER_ERROR;

  if (error instanceof JsonWebTokenError ||
    error instanceof NotAuthorizedError) {
    status = statusCodes.FORBIDDEN;
  }

  if (error instanceof InvalidParamError) {
    status = statusCodes.BAD_REQUEST;
  }

  if (error instanceof TokenError) {
    status = statusCodes.NOT_FOUND;
  }

  if (error instanceof QueryError) {
    status = statusCodes.BAD_REQUEST;
  }

  console.log(error);
  res.status(status).json(message);
}

export default errorHandler;