import { Router } from "express";
import * as UserController from "../controller/user-controller";
import { validateUser } from "../middleware/validate-user";
import { protect } from "../middleware/authMiddleware";

const route = Router();

route
  .route("/")
  .post(validateUser, UserController.authUser)
  .put(protect, UserController.updateUser);
route.route("/loggout").post(protect, UserController.logout);
route.route("/password").put(protect, UserController.changePassword);

export default route;
