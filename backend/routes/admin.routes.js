import { Router } from "express";
import {adminLogin} from "../controllers/admin.controller.js";
const adminRouter = Router();

adminRouter.post('/login', adminLogin);
export default adminRouter