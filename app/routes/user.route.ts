import express from "express";
import { UserController } from "../controllers/user.controller";
const route: express.Router = express.Router();
const userController: UserController = new UserController();

route.post("/signup", userController.signUp);

export default route;
