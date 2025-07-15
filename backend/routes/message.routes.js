import { Router } from "express";
import {
  getUsersForSideBar,
  getMessages,
  sendMessages,
} from "../controllers/message.controller.js";
const messageRouter = Router();

messageRouter.post("/users", getUsersForSideBar);
messageRouter.get("/:id", getMessages)
messageRouter.post("/send/:id", sendMessages)
export default messageRouter;