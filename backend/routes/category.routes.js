import { Router } from "express";
import { getAllCategories, addCategory,removeCategory, getCategory, updateCategory } from "../controllers/category.controller.js";
import { upload } from "../middleware/multer.middlewares.js";

const categoryRouter = Router();

categoryRouter.get("/list", getAllCategories);
categoryRouter.post("/add", upload.single("image"), addCategory);
categoryRouter.post("/remove/:id", removeCategory);
categoryRouter.get("/get/:id", getCategory);
categoryRouter.patch("/update/:id", upload.single("image"), updateCategory);
export default categoryRouter;
