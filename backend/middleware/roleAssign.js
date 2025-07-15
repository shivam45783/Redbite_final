import userModel from "../models/user.models";
import riderModel from "../models/rider.models";

const roleAssign = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res
      .status(500)
      .json({ success: false, message: "Not Authorized Login again" });
  }

  try {
    let token_decode = jwt.verify(token, process.env.JWT_SECRET);
    let id = token_decode.id;
    let user = await userModel.findById(id);
    let rider = await riderModel.findById(id);
    if (user) {
      req.body.role = "user";
      req.body.userId = id;
      next();
    } else if (rider) {
      req.body.role = "rider";
      req.body.userId = id;
      next();
    }
  } catch (error) {}
};

export default roleAssign;