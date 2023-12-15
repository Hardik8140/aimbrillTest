const express = require("express");
const multer = require("multer");
const { employeeModel } = require("../model/employee.model");

const employeeRoutes = express.Router();

const upload = multer({ dest: "uploads/" });

employeeRoutes.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { filename, path } = req.file;

    const employee = new employeeModel({
      fileName: filename,
      filePath: path,
    });

    const saveEmployee = await employee.save();
    res
      .status(200)
      .json({ message: "File uploaded successful", employee: saveEmployee });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

employeeRoutes.get("/employees", async (req, res) => {
  try {
    const employees = await employeeModel.find();
    res.status(200).json({ employees });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

employeeRoutes.get("/employees/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await employeeModel.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ employee });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

employeeRoutes.patch("/employees/:id", async (req, res) => {
  const { id } = req.params;
  const { fileName, filePath } = req.body;

  try {
    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      id,
      { fileName, filePath },
      { new: true } // return the updated document
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res
      .status(200)
      .json({ message: "Employee updated", employee: updatedEmployee });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

employeeRoutes.delete("/employees/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await employeeModel.findByIdAndRemove(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res
      .status(200)
      .json({ message: "Employee deleted", employee: deletedEmployee });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { employeeRoutes };
