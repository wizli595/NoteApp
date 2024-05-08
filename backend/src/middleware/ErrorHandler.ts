/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import env from "../utils/validateEnv";
import { OperationalError } from "../utils/errors/operationalError";

/**
 * @description Error Handler
 * @param error 
 * @param req 
 * @param res 
 * @param _next 
 * @returns void
 */
function errorhandler(
  error: OperationalError,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (env.NODE_ENV === "development") {
    sendErrorDev(error, res);
  } else if (env.NODE_ENV === "production") {
    const err = { ...error, message: error.message };
    console.log("error", err);
    sendErrorProd(err, res);
  }
}

/**
 * @description Send Error in Development
 * @param err 
 * @param res 
 * @returns void
 */
const sendErrorDev = (err: OperationalError, res: Response) => {
  console.error("ERROR ", err);
  res.status(err.statusCode || 500).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

/**
 * @description Send Error in Production
 * @param err 
 * @param res 
 * @returns void
 */
const sendErrorProd = (err: OperationalError, res: Response) => {
  if (!err.isOperational) {
    res.status(err.statusCode || 500).send({
      status: err.status,
      message: err.message,
    });
  }
  res.status(500).json({
    status: "error",
    message: "Somthing went wrong",
  });
};

/**
 * @description Not Found Handler
 * @param req 
 * @param res 
 * @param next 
 * @returns void
 */

const notFound = (req: Request, _res: Response, next: NextFunction) => {
  const error = new OperationalError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );
  next(error);
};
export { errorhandler, notFound };
