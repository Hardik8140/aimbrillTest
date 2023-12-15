const mongoose = require("mongoose");

const connection = mongoose.connect(
  `mongodb+srv://hardik:hardik8800@cluster0.ztat8o7.mongodb.net/employee?retryWrites=true&w=majority`
);

module.exports = { connection };
