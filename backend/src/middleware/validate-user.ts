import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { OperationalError } from "../utils/errors/operationalError";

export const validateUser = [
  body("email").isEmail().withMessage("email must be valid!"),
  body("password").trim().notEmpty().withMessage("password must be supplied"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = errors
        .array()
        .map((err) => err.msg)
        .join(". ");
      throw new OperationalError(message, 400);
    }
    next();
  },
];
