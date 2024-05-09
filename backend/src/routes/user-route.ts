import { Router } from "express";
import * as UserController from "../controller/user-controller";
import { validateUser } from "../middleware/validate-user";
import { protect } from "../middleware/authMiddleware";
import { validatePassword } from "../middleware/validate-password";
import { validateUpdateUser } from "../middleware/validate-update-user";

const route = Router();

route
  .route("/")
  .post(validateUser, UserController.authUser)
  .put(protect, validateUpdateUser, UserController.updateUser);
route.route("/loggout").post(protect, UserController.logout);
route
  .route("/password")
  .put(protect, validatePassword, UserController.changePassword);
route.route("/sessions").get(protect, UserController.getMysession);
export default route;
