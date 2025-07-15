import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import userModel from "../models/user.models.js";
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

const sendMail = async (req, res) => {
  try {
    const { token, subject } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await userModel.findById(userId);
    console.log(user);
    const otp = generateOTP();
    const { email, name } = user;
    user.otp = otp;
    await user.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });
    const logoURL =
      "https://res.cloudinary.com/dzzvnwacx/image/upload/v1749099375/RedBite_black_logo_jqt6cv.png";
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>OTP Verification</title>
    <style>
      @media only screen and (max-width: 700px) {
        .container {
          width: 90% !important;
          padding: 20px !important;
        }

        .otp {
          font-size: 20px !important;
          padding: 12px 20px !important;
        }

        .title {
          font-size: 20px !important;
        }

        .message {
          font-size: 14px !important;
        }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0"
      style="background: linear-gradient(to right, #ffb630, #ff5517); background-color: #ffb630; min-height: 100vh; width: 100%; text-align: center;">
      <tr>
        <td align="center" style="padding: 40px 0;">
          <table class="container" width="100%" cellpadding="0" cellspacing="0" border="0"
            style="max-width: 500px; background: #ffffff; border-radius: 10px; padding: 30px; text-align: center; font-family: 'Segoe UI', sans-serif; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);">
            <tr style="background-color: #fff;">
              <td>
                <img src="${logoURL}" alt="Logo" width="60" style="margin-bottom: 20px;" />
                <h2 class="title" style="font-size: 24px; font-weight: 700; color: #333; margin: 0 0 15px;">OTP Verification</h2>
                <p class="message" style="font-size: 16px; color: #333; margin: 0 0 25px;">
                  Hello ${name}👋,<br />
                  Use the OTP below to verify your email address. It is valid for the next 10 minutes.
                </p>
                <div class="otp" style="display: inline-block; padding: 15px 30px; font-size: 22px; font-weight: bold; color: #fff; background: linear-gradient(to right, #ffb630, #ff5517); border-radius: 8px; letter-spacing: 4px; margin-bottom: 25px;">
                  ${otp}
                </div>
                <p class="message" style="font-size: 16px; color: #333; margin: 0 0 20px;">
                  If you didn't request this, please ignore this email.
                </p>
                <hr\>
                <p class="footer" style="font-size: 12px; color: #666; margin-top: 30px;">© 2025 RedBite. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        res
          .status(200)
          .json({ success: true, message: "Email sent successfully" });
      }
    });
  } catch (error) {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await userModel.findByIdAndDelete(userId);
    return res.status(500).json({
      success: false,
      message: "Error in sending email and user deleted",
      error,
    });
  }
};

const authUser = async (req, res) => {
  try {
    const { token, otp } = req.body;
    console.log(otp, token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await userModel.findById(userId);
    console.log(user);
    console.log(user.otp);
    console.log(user.otp === otp);

    if (Number(user.otp) === Number(otp)) {
      await userModel.findByIdAndUpdate(userId, { otp: "" });
      return res
        .status(200)
        .json({ success: true, message: "User authenticated successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in authenticating user",
      error,
    });
  }
};
// for changing password
const authOTP = async (req, res) => {
  try {
    const {email, otp} = req.body;
    const user = await userModel.findOne({email});
    if (user) {
      if (Number(user.otp) === Number(otp)) {
        user.otp = null
        await user.save()
        return res.json({success: true, message: "OTP verified successfully"});
      } else {
        return res.status(400).json({success: false, message: "Invalid OTP"});
      }
    }
  } catch (error) {
    console.log(error);
    
  }
}
// for changing password
const verifyMail = async (req, res) => {
  try {
    const { email, subject } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found, verify your email",
      });
    }
    const otp = generateOTP();
    user.otp = otp;
    await user.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });
    const logoURL =
      "https://res.cloudinary.com/dzzvnwacx/image/upload/v1749099375/RedBite_black_logo_jqt6cv.png";
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
    <style>
      @media only screen and (max-width: 700px) {
        .container {
          width: 90% !important;
          padding: 20px !important;
        }

        .otp {
          font-size: 20px !important;
          padding: 12px 20px !important;
        }

        .title {
          font-size: 20px !important;
        }

        .message {
          font-size: 14px !important;
        }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0"
      style="background: linear-gradient(to right, #ffb630, #ff5517); background-color: #ffb630; min-height: 100vh; width: 100%; text-align: center;">
      <tr>
        <td align="center" style="padding: 40px 0;">
          <table class="container" width="100%" cellpadding="0" cellspacing="0" border="0"
            style="max-width: 500px; background: #ffffff; border-radius: 10px; padding: 30px; text-align: center; font-family: 'Segoe UI', sans-serif; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);">
            <tr style="background-color: #fff;">
              <td>
                <img src="${logoURL}" alt="Logo" width="60" style="margin-bottom: 20px;" />
                <h2 class="title" style="font-size: 24px; font-weight: 700; color: #333; margin: 0 0 15px;">Email Verification</h2>
                <p class="message" style="font-size: 16px; color: #333; margin: 0 0 25px;">
                  Hello👋,<br />
                  Use the OTP below to verify your email address. It is valid for the next 10 minutes.
                </p>
                <div class="otp" style="display: inline-block; padding: 15px 30px; font-size: 22px; font-weight: bold; color: #fff; background: linear-gradient(to right, #ffb630, #ff5517); border-radius: 8px; letter-spacing: 4px; margin-bottom: 25px;">
                  ${otp}
                </div>
                <p class="message" style="font-size: 16px; color: #333; margin: 0 0 20px;">
                  If you didn't request this, please ignore this email.
                </p>
                <hr\>
                <p class="footer" style="font-size: 12px; color: #666; margin-top: 30px;">© 2025 RedBite. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
    };
    transporter.sendMail(mailOptions,async function (error, info) {
      if (error) {
        console.log(error);
        user.otp = ""
        await user.save();
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({
          success: true,
          message: "Email sent successfully",
          
        });
      }
    });
  } catch (error) {
    console.log(error);
    user.otp = "";
    await user.save();
    res.status(500).json({ success: false, message: "Error in sending email" });
  }
};
export { sendMail, authUser, verifyMail, authOTP };
