import { listOrders, placeOrder, updateStatus, userOrders, removeOrder, getCartItems, verifyOTP, todayOrders, weekyOrders, monthlyOrders, todayDeliveredOrders, weekyDeliveredOrders, monthlyDeliveredOrders } from "../controllers/order.controller.js";
import authMiddleware from "../middleware/auth.js";
import { Router } from "express";

const orderRouter = Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus)
orderRouter.post("/remove", removeOrder);
orderRouter.get("/getcart/:userId",getCartItems);
orderRouter.post("/auth", verifyOTP)
orderRouter.get("/today", todayOrders);
orderRouter.get("/weekly", weekyOrders);
orderRouter.get("/monthly", monthlyOrders);
orderRouter.post("/today/:token", todayDeliveredOrders);
orderRouter.post("/weekly/:token", weekyDeliveredOrders);
orderRouter.post("/monthly/:token", monthlyDeliveredOrders);
export default orderRouter;