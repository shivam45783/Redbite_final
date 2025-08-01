import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
    otp: {
      type: Number,
      default: null,
    },
  },
  { minimize: false, timestamps: true }
);

const userModel = mongoose.model("user", userSchema, "user");
export default userModel;
