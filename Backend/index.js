const express = require("express");
const { connection } = require("./db");
const path = require("path");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to the Homepage" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
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
