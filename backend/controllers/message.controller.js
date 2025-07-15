import userModel from "../models/user.models.js";
import riderModel from "../models/rider.models.js";
import messageModel from "../models/message.models.js";

const getUsersForSideBar = async (req, res) => {
  try {
    const { role } = req.body;
    if (role == "user") {
      const riderId = req.headers.riderid;
      console.log(riderId);
      
      const rider = await riderModel.findById(riderId);

      res.json({
        success: true,
        message: "Rider fetched successfully",
        rider: rider,
      });
    } else if (role == "rider") {
      const { userId } = req.headers;
      const user = await userModel.findById(userId);
      res.json({
        success: true,
        message: "User fetched successfully",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error in fetching rider for sidebar",
      error,
    });
  }
};
const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, userId, riderId } = req.body; 

    let senderId;
    if (role === "user") {
      senderId = userId;
    } else if (role === "rider") {
      senderId = riderId;
    } else {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const messages = await messageModel.find({
      $or: [
        { senderId: senderId, receiverId: id },
        { senderId: id, receiverId: senderId },
      ],
    });
    res.json({
      success: true,
      message: "Messages fetched successfully",
      messages,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error in fetching messages",
      error,
    });
  }
};
const sendMessages = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: receiverId } = req.params;
    const { role } = req.body;
    let senderId;
    let receiverRole;
    if (role == "user") {
      const { userId } = req.body;
      senderId = userId;
      receiverRole = "rider";
    } else if (role == "rider") {
      const { riderId } = req.body;
      senderId = riderId;
      receiverRole = "user";
    }
    let imageUrl;
    if (req.file) {
      const image_filename = `${req.file.filename}`;
      const imageLocalPath = `./uploads/${image_filename}`;
      const result = await uploadOnCloudinary(image_filename, imageLocalPath);
      imageUrl = result.url;
    }
    const newMessage = await messageModel.create({
      senderId,
      senderRole: role,
      receiverRole,
      receiverId,
      text,
      image: imageUrl,
    });
    res.json({
      success: true,
      message: "Message sent successfully",
      newMessage,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error in sending message",
      error,
    });
    
  }
};
export { getUsersForSideBar, getMessages, sendMessages, };
