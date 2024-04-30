import { Router } from "express";
import * as UserController from "../controller/user-controller";
import { validateUser } from "../middleware/validate-user";

const route = Router();

route.route("/").post(validateUser, UserController.authUser);
// route.route("/session").get(UserController.checkSession);

export default route;
