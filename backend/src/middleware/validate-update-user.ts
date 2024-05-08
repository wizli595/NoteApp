import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { OperationalError } from "../utils/errors/operationalError";

/**
 * @description Validate Update User
 * @body email
 * @body username
 * @throws Error
 * @returns void
 */
export const validateUpdateUser = [
  body("email").isEmail().withMessage("email must be a valid email"),
  body("username")
    .isLength({ min: 3 })
    .withMessage("username must be at least 3 characters long"),
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
