import { Router } from "express";
import { loginUser, registerUser, getUser, forgotPassword } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get", authMiddleware, getUser);
userRouter.post("/forgotpassword", forgotPassword)
export default userRouter;