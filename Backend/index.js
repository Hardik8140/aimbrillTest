const express = require("express");
const { connection } = require("./db");
const path = require("path");
const cors = require("cors");
const { employeeRoutes } = require("./routes/employee.routes");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to the Homepage" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.use("/", employeeRoutes);
// app.use("/users", userRouter);
// app.use("/doctor", doctorRouter);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to the db");
    console.log(`Server running on the port `);
  } catch (error) {
    console.log(error);
  }
});
