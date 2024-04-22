/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import env from "../utils/validateEnv";
import { OperationalError } from "../utils/errors/operationalError";

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

const sendErrorDev = (err: OperationalError, res: Response) => {
  console.error("ERROR ", err);
  res.status(err.statusCode || 500).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

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

const notFound = (req: Request, _res: Response, next: NextFunction) => {
  const error = new OperationalError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );
  next(error);
};
export { errorhandler, notFound };
