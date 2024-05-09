import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import env from "../utils/validateEnv";
import { OperationalError } from "../utils/errors/operationalError";
import { ParamsDictionary } from "express-serve-static-core";
import { User } from "@prisma/client";
import { ParsedQs } from "qs";

export interface CustomRequest
  extends Request<
    ParamsDictionary,
    unknown,
    unknown,
    ParsedQs,
    Record<string, unknown>
  > {
  user: string | User | jwt.JwtPayload | null | undefined;
}
/**
 * @description Protect routes from unauthorized access
 * @access Private
 * @route POST /api/user/loggout
 * @param req
 * @param res
 * @param next
 */
const protect: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the JWT token from the session or request headers
  const token = req.session?.jwt;

  if (!token) {
    throw new OperationalError("Unauthorized", 401);
  }

  try {
    const decoded = jwt.verify(token, env.JWT_KEY);
    console.log(decoded);
    (req as CustomRequest).user = decoded;
    console.log((req as CustomRequest).user);
    next();
  } catch (error) {
    res.status(401);
    throw new OperationalError("Unauthorized,token faild", 401);
  }
};

export { protect };
