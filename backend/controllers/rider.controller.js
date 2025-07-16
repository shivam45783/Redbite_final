import riderModel from "../models/rider.models.js";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import orderModel from "../models/order.models.js";
const generateRandomId = (length = 10) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
const generateNewRider = async (req, res) => {
  console.log(req.body);

  const { name, address, email, phone } = req.body;

  try {
    const password = generateRandomId();
    const riderId = generateRandomId();
    const existingRider = await riderModel.findOne({ email });
    if (existingRider) {
      return res.json({ success: false, message: "Rider already exists" });
    }
    const hashedPassword = await bycrypt.hash(password, 10);
    const rider = await riderModel.create({
      name,
      address,
      email,
      password: hashedPassword,
      phone,
      riderId,
    });
    console.log(rider);
    let data = rider;
    data.password = password;

    res.json({ success: true, message: "Rider created successfully", data });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ success: false, message: "Rider with same phone number already exists" });
    }
    res.json({ success: false, message: "Error in creating rider", error });
    console.log(error);
  }
};

const login = async (req, res) => {
  const { id, password } = req.body;
  try {
    const rider = await riderModel.findOne({ riderId: id });
    if (!rider) {
      return res.json({ success: false, message: "Rider not found" });
    }
    const isMatch = await bycrypt.compare(password, rider.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const token = createToken(rider._id);
    res.json({
      success: true,
      message: "Rider logged in successfully",
      rider,
      token,
    });
  } catch (error) {
    res.json({ success: false, message: "Error in logging in rider", error });
    console.log(error);
  }
};
const changeCredentials = async (req, res) => {
  console.log(req.body);

  const { id, password, tokenId } = req.body;
  console.log(tokenId);

  try {
    const decodedId = jwt.verify(tokenId, process.env.JWT_SECRET);
    const _id = decodedId.id;
    const rider = await riderModel.findById(_id);
    const hashedPassword = await bycrypt.hash(password, 10);
    rider.password = hashedPassword;
    rider.userId = id;
    rider.authorized = true;
    await rider.save();
    res.json({ success: true, message: "Credentials changed successfully" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error in changing credentials",
      error,
    });
  }
};

const getRider = async (req, res) => {
  const token = req.params.token;
  try {
    const decodedId = jwt.verify(token, process.env.JWT_SECRET);
    const id = decodedId.id;
    const rider = await riderModel.findById(id);
    res.json({ success: true, message: "Rider fetched successfully", rider });
  } catch (error) {
    if ((error.name = "TokenExpiredError")) {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please log in again.",
      });
    }
    res.json({ success: false, message: "Error in fetching rider", error });
  }
};
const setRider = async (req, res) => {
  const { riderId, orderId } = req.body;

  try {
    const order = await orderModel.findById(orderId);
    order.deliveryRider = riderId;
    await order.save();
    res.json({ success: true, message: "Rider assigned successfully" });
  } catch (error) {
    res.json({ success: false, message: "Error in assigning rider", error });
    console.log(error);
  }
};
export { generateNewRider, login, changeCredentials, getRider, setRider };
