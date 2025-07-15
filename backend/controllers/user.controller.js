import userModel from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email, role: "user" });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (user.otp) {
      await userModel.findByIdAndDelete(user._id);
      return res.json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    return res.json({
      success: true,
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in logging in user",
      error,
    });
  }
};
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email, role: "user" });
    if (existingUser && existingUser.otp == null) {
      return res.json({ success: false, message: "User already exists" });
    } else if (existingUser && existingUser.otp != null) {
      await userModel.findByIdAndDelete(existingUser._id);
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "PLease enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password length should be greater than 8",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = createToken(user._id);
    return res.json({
      success: true,
      message: "User created successfully",
      user,
      token,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in creating user",
      error,
    });
  }
};
const getUser = async (req, res) => {
  const { userId } = req.body;
  const user = await userModel.findById(userId);
  if (!user) {
    return res.json({ success: false, message: "User not found" });
  }
  return res.json({ success: true, message: "User found successfully", user });
};
const forgotPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    return res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error in changing password", error });
  }
};

export { loginUser, registerUser, getUser, forgotPassword };
