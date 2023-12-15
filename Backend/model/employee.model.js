const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    employeeId: String,
    employeeName: String,
    employeeStatus: String,
    joiningDate: String,
    birthDate: String,
    skill: String,
    salaryDetails: Number,
    address: String,
  },
  {
    versionKey: false,
  }
);

const employeeModel = mongoose.model("employee", employeeSchema);

module.exports = { employeeModel };
