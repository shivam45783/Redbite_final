import categoryModel from "../models/category.models.js";
import foodModel from "../models/food.models.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../middleware/uploader.js";
const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res
      .status(200)
      .json({
        success: true,
        message: "Categories fetched successfully",
        data: categories,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await categoryModel.findById(id);
    res
      .status(200)
      .json({
        success: true,
        message: "Category fetched successfully",
        data: category,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    let image_filename = `${req.file.filename}`;
    const foodLocalPath = `./uploads/${image_filename}`;
    const result = await uploadOnCloudinary(image_filename, foodLocalPath);
    const url = result.secure_url;
    const category = await categoryModel.create({ name, url });
    res
      .status(200)
      .json({
        success: true,
        message: "Category added successfully",
        data: category,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const removeCategory = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    await deleteFromCloudinary(category.publicId);
    await categoryModel.deleteOne({ _id: req.params.id });
    res
      .status(200)
      .json({ success: true, message: "Category removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const cateory = await categoryModel.findById(id);
    if (!cateory) {
      return res.json({ success: false, message: "Category not found" });
    }
    const { name } = req.body;
    let image_filename = `${req.file.filename}`;
    const foodLocalPath = `./uploads/${image_filename}`;
    const result = await uploadOnCloudinary(image_filename, foodLocalPath);
    const url = result.secure_url;
    const categoryOld = await categoryModel.findById(id);
    const oldName = categoryOld.name;
    const changeFood = await foodModel.updateMany({ category: oldName }, { category: name });
    await categoryModel.updateOne({ _id: id }, { name, url });

    res
      .status(200)
      .json({ success: true, message: "Category updated successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { getAllCategories, addCategory, removeCategory, getCategory, updateCategory };
