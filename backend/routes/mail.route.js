import { Router } from "express";
import  {sendMail, authUser, verifyMail, authOTP}  from "../middleware/mailer.js";
const mailRouter = Router();

mailRouter.post("/send", sendMail);
mailRouter.post("/auth", authUser);
mailRouter.post("/verify", verifyMail);
mailRouter.post("/authmail", authOTP);
export default mailRouter;