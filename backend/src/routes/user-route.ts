import { Router } from "express";
import * as UserController from "../controller/user-controller";
import { validateUser } from "../middleware/validate-user";
import { protect } from "../middleware/authMiddleware";
import { validatePassword } from "../middleware/validate-password";
import { validateUpdateUser } from "../middleware/validate-update-user";
import { validateSession } from "../middleware/validate-session";

const route = Router();

route
  .route("/")
  .post(validateUser, UserController.authUser)
  .put(validateSession,protect, validateUpdateUser, UserController.updateUser);
route.route("/loggout").post(validateSession,protect, UserController.logout);
route
  .route("/password")
  .put(validateSession,protect, validatePassword, UserController.changePassword);
route
  .route("/sessions")
  .get(validateSession,protect, UserController.getMysession)
  .delete(validateSession,protect, UserController.loggoutAllSessions);


export default route;
