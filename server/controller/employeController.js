const Employee = require("../models/employee");
const { validateEmployee } = require("../utils/validation");
const CustomError = require("../utils/customError");
// const { upload } = require("../utils/validation");
const axios = require("axios");

// create a new employee
const createEmployeeController = async (req, res) => {
  let imageBuffer = null;

  if (req.file) {
    imageBuffer = req.file.buffer;
  } else if (req.body.image) {
    try {
      const imageUrl = req.body.image;
      const response = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });
      imageBuffer = Buffer.from(response.data, "binary").toString("base64");
    } catch (error) {
      console.error("Error downloading image:", error.message);
      return res
        .status(400)
        .json({ error: "Unable to download the image from URL" });
    }
  }
  if (!imageBuffer) {
    return res.status(400).json({ error: "Image is required" });
  }

  const { name, email, mobileNo, designation, gender, course } = req.body;

  try {
    // Validate employee data
    validateEmployee({ name, email, mobileNo, designation, gender, course });

    // Check if email already exists
    const emailExists = await Employee.findOne({ email });
    if (emailExists) {
      throw new CustomError("Email already exists", 400);
    }

    // Create and save employee
    const employee = new Employee({
      name,
      email,
      mobileNo,
      designation,
      gender,
      course,
      image: { data: imageBuffer, contentType: "image/jpeg" },
    });

    await employee.save();

    // Send success response
    res.status(201).json({
      message: "Employee created successfully",
      employee,
    });
  } catch (error) {
    // Send error response with appropriate status code
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

//get All employee
const getAllEmployeeController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const employees = await Employee.find().skip(skip).limit(limit);

    const totalEmployees = await Employee.countDocuments();
    res.status(200).json({
      totalEmployees,
      page,
      totalPages: Math.ceil(totalEmployees / limit),
      employees,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get EmployeeById

// update employee by id
const updateEmployeeController = async (req, res) => {
  const { name, email, mobileNo, designation, gender, course } = req.body;
  const { id } = req.params;
  try {
    //check if employee exists
    const employee = await Employee.findById(id);
    if (!employee) {
      throw new CustomError("Employee not found", 404);
    }

    //validate employee data
    validateEmployee({ name, email, mobileNo, designation, gender, course });

    // check if email is unique, excluding the current employee
    if (email && email !== employee.email) {
      const emailExists = await Employee.findOne({ email });
      if (emailExists) {
        throw new CustomError("Email already exists", 400);
      }
    }

    //handle image update
    let image = employee.image;
    if (req.file) {
      image = req.file.buffer;
    } else if (req.body.image) {
      try {
        const imageUrl = req.body.image;
        const response = await axios.get(imageUrl, {
          responseType: "arraybuffer",
        });
        image = Buffer.from(response.data, "binary");
      } catch (error) {
        console.error("Error downloading image:", error.message);
        return res
          .status(400)
          .json({ error: "Unable to download the image from URL" });
      }
    }

    //update employee details
    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.mobileNo = mobileNo || employee.mobileNo;
    employee.designation = designation || employee.designation;
    employee.gender = gender || employee.gender;
    employee.course = course || employee.course;
    employee.image = image;

    await employee.save();

    //send success response
    res.status(200).json({
      massage: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

//delete employee by id
const deleteEmployeeController = async (req, res) => {
  const { id } = req.params;
  try {
    //check if employee exists
    const employee = await Employee.findById(id);
    if (!employee) {
      throw new CustomError("Employee not found", 404);
    }

    // delete the employee
    await employee.deleteOne();
    res.status(200).json({
      message: "Employee deleted successfully",
      employeeId: id,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

//search employee by name, designation,

module.exports = {
  createEmployeeController,
  getAllEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
};
