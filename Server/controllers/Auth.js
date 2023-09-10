// SendOTP controller

const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const mailSender = require("../utils/mailSender");
const passwordUpdated = require("../mail/templates/passwordUpdate");
require("dotenv").config();

exports.sendOTP = async (req, res) => {
  let { email } = req.body;

  // Yet to be verified
  // email = email.toLowerCase()

  try {
    const checkUserExistence = await User.findOne({ email });

    if (checkUserExistence) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }

    // generate OTP

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("Otp Generated : ", otp);

    // checking if otp is unique or not

    let CheckUniqueOTP = await OTP.findOne({ otp: otp });

    while (CheckUniqueOTP) {
      otp = otpGenerator(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      CheckUniqueOTP = await OTP.findOne({ otp: otp });
    }

    // Create OTP entry in DB
    const OTPDatabase = await OTP.create({ email: email, otp: otp });

    console.log(OTPDatabase);

    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp: otp,
    });
  } catch (e) {
    console.error(e);
    console.log("Error in generating otp while signing up");
    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
      contactNumber,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match",
      });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    console.log(email);

    const recentOtp = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    console.log(recentOtp);

    if (!recentOtp) {
      return res.status(404).json({
        success: false,
        message: "Please enter your OTP",
      });
    }

    if (otp !== recentOtp.otp) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP ",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    let approved = "";
    // approved or accountType
    approved === "Instructor" ? (approved = false) : (approved = true);

    const profileDetails = await Profile.create({
      gender: null,
      about: null,
      contactNumber: null,
      dateOfBirth: null,
    });

    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      // contactNumber, // Ye nahi hona chahiye tha shayad
      password: hashedPassword,
      accountType: accountType,
      approved: approved,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}+${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      user: user,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong while Signing up",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Fill out all the details",
      });
    }

    const userExists = await User.findOne({ email: email })
      .populate("additionalDetails")
      .exec();

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exists",
      });
    }

    const comparePassword = await bcrypt.compare(password, userExists.password);

    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const payload = {
      email: userExists.email,
      id: userExists._id,
      accountType: userExists.accountType,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    userExists.token = token;
    userExists.password = undefined;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie("token", token, options).status(200).json({
      success: true,
      token: token,
      user: userExists,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Error while Logging In",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Enter all the fields",
      });
    }
    const email = req.user.email;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Does not Exists",
      });
    }

    const checkOldPasword = await bcrypt.compare(oldPassword, user.password);

    if (!checkOldPasword) {
      return res.status(404).json({
        success: false,
        message: "Incorrect old password",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const encodePassword = await bcrypt.hash(newPassword, 10);

    user.password = encodePassword;

    await user.save();

    try {
      const emailResponse = await mailSender(
        email,
        "Password Changed",
        passwordUpdated(email, `${user.firstName} ${user.lastName}`)
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password changed Successfully and updated in the database",
      password: encodePassword,
    });

    // Yet to be completed
    // Token Problem Occuring
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error occurred while Changing Password",
    });
  }
};
