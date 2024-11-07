const express = require("express");
const ConnectDB = require("./server/config/db");
const userRoute = require("./server/router/userRouter");
const employeeRoute = require("./server/router/employeeRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

dotenv.config();
ConnectDB();

//middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//enable cors
// app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(cors());

//routes
app.use("/api/users", userRoute);
app.use("/api/employees", employeeRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the API server!");
});

//handle invalid routes
app.all("*", (req, res) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`,
  });
});

//error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ message });
});

//server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
