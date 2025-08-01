import { Router } from "express";
import { createUserHandler, getUserInfoHandler, loginHandler } from "../controllers/userController.js";

const userRouter = Router();
userRouter.post("/register", createUserHandler);
userRouter.post("/login", loginHandler);
userRouter.get("/me", getUserInfoHandler);

export default userRouter;