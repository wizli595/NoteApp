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

export { authUser };
