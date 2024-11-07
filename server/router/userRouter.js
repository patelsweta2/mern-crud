const express = require("express");
const {
  signUpController,
  loginController,
  logoutController,
} = require("../controller/userController");
const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.get("/logout", logoutController);

module.exports = router;
