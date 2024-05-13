import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { OperationalError } from "../utils/errors/operationalError";
import prisma from "../../prisma/middleware/prismaMiddleware";
import env from "../utils/validateEnv";
import { CustomRequest } from "../middleware/authMiddleware";
import generateVerificationToken from "../utils/generateRandomToken";
import sendVerificationEmail from "../utils/sendEmailVerifcation";
import path from "path";

/**
 * @description Log In
 * @access Public
 * @requires request
 * @requires response
 * @route POST /api/user/auth
 *
 */

const authUser: RequestHandler = async (req, res, next) => {
  const { email, password, userAgent } = req.body;
  try {
    const existingUser = await prisma.user.findUniqueOrThrow({
      where: { email, password },
    });
    if (!existingUser) throw new Error("Invalid credintial !!");
    const signedJWT = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      env.JWT_KEY
    );
    req.session = {
      jwt: signedJWT,
    };

    // insert the jwt into the session table
    await prisma.session.create({
      data: {
        token: signedJWT,
        userAgent,
        userId: existingUser.id,
      },
    });
    // generate the token and save it in the user
    const randomToken = generateVerificationToken();
    await prisma.user.update({
      where: { id: existingUser.id },
      data: { verifcationToken: randomToken },
    });
    if (!existingUser.isVerified) {
      sendVerificationEmail(existingUser, randomToken,req);
      throw new Error("Please verify your email and try again");
    }

    return res.status(200).send(existingUser);
  } catch (error: unknown) {
    next(new OperationalError((error as Error)?.message, 405));
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
  await prisma.session.deleteMany({ where: { token: req.session?.jwt } });
  req.session = null;
  return res.status(200).send("Logged out successfully");
};

/**
 * @description Update the userName and email
 * @access PRIVATE
 * @route PUT api/users
 * @param req
 * @param res
 * @param next
 * @returns Promise<Response>
 */
const updateUser: RequestHandler = async (req, res, next) => {
  const { email, username } = req.body;
  try {
    const userId = ((req as CustomRequest)?.user as { id: string })?.id;
    if (!userId) {
      throw new Error("No user session found");
    }
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { email, username },
    });
    return res.status(200).send(updatedUser);
  } catch (error) {
    next(new OperationalError("Failed to update user", 500));
  }
};

/**
 * @description Change the password
 * @access PRIVATE
 * @route PUT api/users/password
 * @param req
 * @param res
 * @param next
 * @returns Promise<Response>
 */

const changePassword: RequestHandler = async (req, res, next) => {
  const { password: currentPassword, newPassword } = req.body;
  try {
    const userId = ((req as CustomRequest)?.user as { id: string })?.id;
    if (!userId) {
      throw new Error("No user session found");
    }
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.password === currentPassword) {
      throw new Error("use different password");
    }
    await prisma.user.update({
      where: { id: userId },
      data: { password: newPassword },
    });
    return res.status(200).send("Password updated successfully");
  } catch (error) {
    next(new OperationalError("Failed to update password", 500));
  }
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

/**
 * @description Get user session
 * @access PRIVATE
 * @route GET api/users/sessions
 * @param req
 * @param res
 * @param next
 * @returns Promise<Response>
 */

const getMysession: RequestHandler = async (req, res, next) => {
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
    console.log(user)
    if (!user) {
      throw new Error("User not found");
    }
    
    const sessions = await prisma.session.findMany({
      where: { userId: user.id },
    });
    return res.status(200).send(sessions);
  } catch (error) {
    next(new OperationalError("Invalid session", 401));
  }
};

/**
 * @description Log out from all sessions
 * @access PRIVATE
 * @route POST api/users/loggoutAll
 * @param req
 * @param res
 * @param next
 * @returns Promise<Response>
 * */
const loggoutAllSessions : RequestHandler = async (req, res, next) => {
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
    // exept the current session
    await prisma.session.deleteMany({
      where: { userId: user.id, token: { not: token } },
    });
    
    return res.status(200).send("Logged out from all sessions");
  } catch (error) {
    next(new OperationalError("Invalid session", 401));
  }
};

const verifyEmail: RequestHandler = async (req, res, next) => {
  try {
    const token = req.query.token as string;
    const user = await prisma.user.findFirst({
      where: { verifcationToken: token },
    });
    if (!user) {
      throw new Error("User not found");
    }
    if(user.verifcationToken !== token){
      throw new Error("Invalid token");
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true },
    });
    const filePath = path.join(__dirname, '../utils/pages', 'email-verification-success.html');

    return res.status(200).sendFile(filePath);
  } catch (error) {
    next(new OperationalError("Invalid token", 401));
  }
}
export {
  authUser,
  checkSession,
  logout,
  updateUser,
  changePassword,
  getMysession,
  loggoutAllSessions,
  verifyEmail,
};
