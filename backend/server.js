import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import foodRouter from "./routes/food.routes.js";
import userRouter from "./routes/user.routes.js";
import cartRouter from "./routes/cart.routes.js";
import dotenv from "dotenv";
import "dotenv/config";
import mailRouter from "./routes/mail.route.js";
import orderRouter from "./routes/order.routes.js";
import categoryRouter from "./routes/category.routes.js";
import riderRouter from "./routes/rider.routes.js";
import quoteRouter from "./utils/quote.js";
import messageRouter from "./routes/message.routes.js";
import adminRouter from "./routes/admin.routes.js";
// app config

const app = express();
const port = 4000 || process.env.PORT;

// middleware
app.use(cors({
  origin: "*",
  credentials: true
}));
/*
{
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "tokenId"],
    credentials: true
  }
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("API is running");
});

// db connection
connectDB();

dotenv.config({
  path: "./.env",
});
// api routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/mail", mailRouter);
app.use("/api/order", orderRouter);
app.use("/api/category", categoryRouter);
app.use("/api/rider", riderRouter);
app.use("/api/quote", quoteRouter);
app.use("/api/message", messageRouter);
app.use("/api/admin", adminRouter);
app.use("/images", express.static("./uploads"));
// app.use("/")

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

//mongodb+srv://serviceredbite:<db_password>@redbite.bouddex.mongodb.net/
