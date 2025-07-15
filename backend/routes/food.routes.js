import { Router } from "express";
import { addFood, listFood, removeFood, getFood, updateFood } from "../controllers/food.controller.js";
import { upload } from "../middleware/multer.middlewares.js";

const foodRouter = Router();




foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.get("/get/:id", getFood);
foodRouter.post("/update/:id", upload.single("image"), updateFood);
export default foodRouter;
