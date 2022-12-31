const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");

app.use(cors());

const authController = require("./controllers/authController");
const userController = require("./controllers/userController");

app.use("/api/auth", authController);
app.use("/api/user", userController);

const connect = require("./config/db");

const port = process.env.PORT || 8080;

app.listen(port, async () => {
  try {
    await connect();
    console.log(`Connected to ${port}`);
  } catch (e) {
    console.log(`Error connecting to ${port}`);
  }
});
