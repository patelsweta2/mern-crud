const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");

//middleware to authenticate the user
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) {
      throw new CustomError("Authentication token is missing", 401);
    }

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Authentication failed" });
  }
};

module.exports = authMiddleware;
