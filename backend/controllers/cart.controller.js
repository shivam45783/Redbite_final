import userModel from "../models/user.models.js";

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Item added to cart successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in adding item to cart" });
  }
};


const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    if (cartData[req.body.itemId] > 1) {
      cartData[req.body.itemId] -= 1;
    } else if (!cartData[req.body.itemId]) {
      return res.json({ success: false, message: "Item not found in cart" });
    } else {
      delete cartData[req.body.itemId];
    } 
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Item removed from cart successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in removing item from cart" });
  }
};
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    res.json({ success: true, message: "Cart data fetched successfully", cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in fetching cart data" });
    
  }
};

export { addToCart, removeFromCart, getCart };
