import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { OperationalError } from "../utils/errors/operationalError";
import prisma from "../../prisma/middleware/prismaMiddleware";
import env from "../utils/validateEnv";
/**
 * @description Log In
 * @access Public
 * @requires request
 * @requires response
 * @route POST /api/user/auth
 *
 */

const authUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUniqueOrThrow({
      where: { email, password },
    });
    if (!existingUser) throw new Error("shit");
    console.log(existingUser);
    const signedJWT = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      env.JWT_KEY
    );
    req.session = {
      jwt: signedJWT,
    };
    return res.status(200).send(existingUser);
  } catch (error) {
    next(new OperationalError("Invalid credintial !!", 405));
  }
};
/**
 * @description destroy user session
 * @route POST /api/user/loggout
 * @access PRIVATE
 * @param req
 * @param res
 * @returns  Promise<Response>
 */
const logout: RequestHandler = async (req, res) => {
  req.session = null;
  return res.status(200).send("Logged out successfully");
};

/**
 * @description Check Session
 * @access Public
 * @requires request
 * @requires response
 * @route GET /api/user/session
 *
 */

const checkSession: RequestHandler = async (req, res, next) => {
  try {
    const token = req.session?.jwt;
    if (!token) {
      throw new Error("No session found");
    }
    const decoded = jwt.verify(token, env.JWT_KEY) as {
      id: string;
      email: string;
    };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      throw new Error("User not found");
    }
    return res.status(200).send(user);
  } catch (error) {
    next(new OperationalError("Invalid session", 401));
  }
};

export { authUser, checkSession, logout };
