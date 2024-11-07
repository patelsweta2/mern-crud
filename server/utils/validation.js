const CustomError = require("./customError");

const validateSignUp = ({ userName, fullName, email, password }) => {
  if (!userName || !fullName || !email || !password) {
    throw new CustomError("All fields are required", 400);
  }

  //userName validation
  const usernameRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.*[0-9]).{6,}$/;
  if (!usernameRegex.test(userName)) {
    throw new CustomError(
      "Username must be at least 6 characters long, contain at least one capital letter, one special character (!@#$%^&*()), and one number.",
      400
    );
  }

  //Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new CustomError("Invalid email format", 400);
  }

  // password number validation
  if (password.length < 6) {
    throw new CustomError("Password must be at least 6 characters long", 400);
  }
};

const validateEmployee = ({
  name,
  email,
  mobileNo,
  designation,
  gender,
  course,
}) => {
  if (!name || !email || !mobileNo || !designation || !gender || !course) {
    throw new CustomError("All fields are required", 400);
  }
  //Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new CustomError("Invalid email format", 400);
  }
  // phoneNo validation
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(mobileNo)) {
    throw new CustomError("mobile number should be 10 digits");
  }

  // Allowed values for designation
  const validDesignations = ["HR", "Manager", "sales"];
  if (!validDesignations.includes(designation)) {
    throw new CustomError(
      "Invalid designation. Allowed values: HR, Manager, sales",
      400
    );
  }

  // Allowed values for gender
  const validGenders = ["male", "female", "others"];
  if (!validGenders.includes(gender)) {
    throw new CustomError(
      "Invalid gender. Allowed values: male, female, others",
      400
    );
  }

  // Allowed values for course
  const validCourses = ["MCA", "BCA", "BSC"];
  if (!validCourses.includes(course)) {
    throw new CustomError("Invalid course. Allowed values: MCA, BCA, BSC", 400);
  }
};

module.exports = { validateSignUp, validateEmployee };
