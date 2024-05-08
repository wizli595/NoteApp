import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { OperationalError } from "../utils/errors/operationalError";
/**
 * @description Validate Note
 * @body title
 * @body text
 * @throws Error
 * @returns void
 */
export const validateNote = [
  body("title").trim().not().isEmpty().withMessage("Title is required."),
  body("text").isString().withMessage("Text must be string."),
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
