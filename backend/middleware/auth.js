import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    console.log("Token not found");
    
    return res.status(500).json({ success: false, message: "Not Authorized Login again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);


    if (!req.body) {
      req.body = {};
    }

    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({
          success: false,
          message: "Session expired. Please log in again.",
        });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(402)
        .json({
          success: false,
          message: "Invalid token. Please log in again.",
        });
    } else {
      return res
        .status(500)
        .json({
          success: false,
          message: "Authentication error",
          error: error.message,
        });
    }
  }
};

export default authMiddleware