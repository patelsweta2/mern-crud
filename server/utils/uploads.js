const multer = require("multer");
const path = require("path");

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Allow only jpeg, jpg, and png file types
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg and .png files are allowed!"), false);
  }
};

// Multer middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max file size
  fileFilter: fileFilter,
});

module.exports = { upload };
