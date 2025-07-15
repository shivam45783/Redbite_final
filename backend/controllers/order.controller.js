import orderModel from "../models/order.models.js";
import userModel from "../models/user.models.js";
import jwt from "jsonwebtoken";
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}

const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    newOrder.payment = true;
    newOrder.otp = generateOTP();
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in placing order" });
  }
};
// for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in fetching orders" });
  }
};
// for admin
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in fetching orders" });
  }
};
// for delivery panel
const getCartItems = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await orderModel.findById(orderId);
    const cartData = order.items;
    res.json({
      success: true,
      message: "Cart items fetched successfully",
      cartData,
    });
  } catch (error) {
    res.json({ success: false, message: "Error in fetching cart items" });
    console.log(error);
  }
};
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in updating status" });
  }
};
const removeOrder = async (req, res) => {
  try {
    await orderModel.findByIdAndDelete(req.body.orderId);
    res.json({ success: true, message: "Order removed successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in removing order" });
  }
};
const verifyOTP = async (req, res) => {
  const { orderId, OTP } = req.body;
  try {
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }
    if (order.otp === Number(OTP)) {
      order.otp = null;
      order.status = "Delivered";
      await order.save();
      return res.json({ success: true, message: "OTP verified successfully" });
    } else {
      return res.json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    res.json({ success: false, message: "Error in verifying OTP", error });
    console.log(error);
  }
};
const todayOrders = async (req, res) => {
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setUTCHours(23, 59, 59, 999);

  const todayOrders = await orderModel.find({
    createdAt: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
  });

  res.json({
    success: true,
    message: "Today's orders fetched successfully",
    data: todayOrders,
  });
};
const weekyOrders = async (req, res) => {
  const now = new Date();
  const dayOfWeek = now.getUTCDay(); // Sunday = 0, Monday = 1
  const diffToMonday = (dayOfWeek + 6) % 7;

  const startOfWeek = new Date(now);
  startOfWeek.setUTCDate(now.getUTCDate() - diffToMonday);
  startOfWeek.setUTCHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 7);
  endOfWeek.setUTCHours(0, 0, 0, 0);

  const weeklyOrders = await orderModel.find({
    createdAt: {
      $gte: startOfWeek,
      $lt: endOfWeek,
    },
  });
  res.json({
    success: true,
    message: "Weekly orders fetched successfully",
    data: weeklyOrders,
  });
};
const monthlyOrders = async (req, res) => {
  const now = new Date();

  const startOfMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
  );
  const endOfMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)
  );

  const monthlyOrders = await orderModel.find({
    createdAt: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
  });
  res.json({
    success: true,
    message: "Monthly orders fetched successfully",
    data: monthlyOrders,
  });
};
const todayDeliveredOrders = async (req, res) => {
  const { token } = req.params;
  // console.log(token);
  const decodedId = jwt.verify(token, process.env.JWT_SECRET);
  const deliveryRider = decodedId.id;
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setUTCHours(23, 59, 59, 999);

  const todayOrders = await orderModel.find({
    createdAt: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
    deliveryRider,
    status: "Delivered",
  });

  res.json({
    success: true,
    message: "Today's orders fetched successfully",
    data: todayOrders,
  });
};
const weekyDeliveredOrders = async (req, res) => {
  const { token } = req.params;
  const decodedId = jwt.verify(token, process.env.JWT_SECRET);
  const deliveryRider = decodedId.id;
  const now = new Date();
  const dayOfWeek = now.getUTCDay(); // Sunday = 0, Monday = 1
  const diffToMonday = (dayOfWeek + 6) % 7;
  const otp = null;
  const startOfWeek = new Date(now);
  startOfWeek.setUTCDate(now.getUTCDate() - diffToMonday);
  startOfWeek.setUTCHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 7);
  endOfWeek.setUTCHours(0, 0, 0, 0);

  const weeklyOrders = await orderModel.find({
    createdAt: {
      $gte: startOfWeek,
      $lt: endOfWeek,
    },
    deliveryRider,
    status: "Delivered",
  });
  res.json({
    success: true,
    message: "Weekly orders fetched successfully",
    data: weeklyOrders,
  });
};
const monthlyDeliveredOrders = async (req, res) => {
  const { token } = req.params;
  const decodedId = jwt.verify(token, process.env.JWT_SECRET);
  const deliveryRider = decodedId.id;
  const now = new Date();
  const otp = null;
  const startOfMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
  );
  const endOfMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)
  );

  const monthlyOrders = await orderModel.find({
    createdAt: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
    deliveryRider,
    status: "Delivered",
  });
  res.json({
    success: true,
    message: "Monthly orders fetched successfully",
    data: monthlyOrders,
  });
};
export {
  placeOrder,
  userOrders,
  listOrders,
  updateStatus,
  removeOrder,
  getCartItems,
  verifyOTP,
  todayOrders,
  weekyOrders,
  monthlyOrders,
  todayDeliveredOrders,
  weekyDeliveredOrders,
  monthlyDeliveredOrders,
};
