const express = require("express");
const authMiddleware = require("../middleware/authMiddleWare");
const {
  createEmployeeController,
  getAllEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
} = require("../controller/employeController");
const router = express.Router();
const { upload } = require("../utils/uploads");

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createEmployeeController
);
router.get("/", authMiddleware, getAllEmployeeController);
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateEmployeeController
);
router.delete("/:id", authMiddleware, deleteEmployeeController);

module.exports = router;
