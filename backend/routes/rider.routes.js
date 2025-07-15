import { Router } from "express";
import { generateNewRider, login, changeCredentials, getRider, setRider } from "../controllers/rider.controller.js";

const riderRouter = Router();

riderRouter.post("/add", generateNewRider);
riderRouter.post("/login", login);
riderRouter.post("/auth",changeCredentials )
riderRouter.get("/get/:token", getRider);
riderRouter.post("/set", setRider);
export default riderRouter;

