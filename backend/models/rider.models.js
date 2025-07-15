import mongoose from "mongoose";

const riderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    id: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        unique: true,
        required: true,
    },
    authorized: {
        type: Boolean,
        default: false,
    },
});

const riderModel = mongoose.model("rider", riderSchema);

export default riderModel;