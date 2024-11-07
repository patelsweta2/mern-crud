const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { validateSignUp } = require("../utils/validation");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");

// signup controller
const signUpController = async (req, res) => {
  const { userName, fullName, email, password } = req.body;
  try {
    // Validate user input using the custom validation function
    validateSignUp({
      userName,
      fullName,
      email,
      password,
    });

    //check if the user already exists
    const userExists = await User.findOne({ $or: [{ email }, { userName }] });
    if (userExists) {
      let message = "User with this ";
      if (userExists.email === email && userExists.userName === userName) {
        message += "email and username already exist";
      } else if (userExists.email === email) {
        message += "email already exists";
      } else {
        message += "username already exists";
      }
      throw new CustomError(message, 400);
    }

    //hash the password using bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    //create a new user object
    const newUser = new User({
      userName,
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    // Handle validation or any other errors
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    // General error handler
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginController = async (req, res) => {
  const { userName, password } = req.body;
  try {
    if (!userName || !password) {
      throw new CustomError("UserName and password are required", 400);
    }
    const user = await User.findOne({ userName });
    if (!user) {
      throw new CustomError("Invalid userName", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new CustomError("Invalid password", 401);
    }

    // create JWT payload
    const payload = {
      userId: user._id,
      userName: user.userName,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("auth_token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });
    res.status(200).json({
      message: "Login successful",
      user: {
        userName: user.userName,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

const logoutController = (req, res) => {
  try {
    res.clearCookie("auth_token");
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signUpController, loginController, logoutController };
