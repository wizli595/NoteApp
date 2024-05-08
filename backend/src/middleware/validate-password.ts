import { body, validationResult } from "express-validator";
import { OperationalError } from "../utils/errors/operationalError";
import { NextFunction, Request, Response } from "express";
/**
 * @description Validate Password
 * @body password
 * @body newPassword
 * @throws Error
 * @returns void
 */
export const validatePassword = [
  body("password").trim().notEmpty().withMessage("password must be supplied"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
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
