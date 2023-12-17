const express = require("express");
const multer = require("multer");
const { employeeModel } = require("../model/employee.model");
const excletojson = require("convert-excel-to-json");
const fs = require("fs-extra");

const employeeRoutes = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, "./public/Images");
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });

const upload = multer({ dest: "uploads/" });

// const upload = multer({ storage });

employeeRoutes.post("/read", upload.single("file"), async (req, res) => {
  try {
    if (req.file?.filename === null || req.file?.filename == "undefined") {
      req.status(400).json({ message: "No file" });
    } else {
      const filepath = "uploads/" + req.file.filename;

      const excleData = excletojson({
        sourceFile: filepath,
        header: {
          rows: 1,
        },
        columnToKey: {
          "*": "{{columnHeader}}",
        },
      });
      fs.remove(filepath);
      res.status(200).json(excleData);
    }
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
