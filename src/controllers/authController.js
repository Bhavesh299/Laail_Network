const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");

//This route is for registering the user.

router.post("/register", async (req, res) => {
  try {
    let ExitingUser = await User.findOne({ email: req.body.email });
    if (ExitingUser) {
      return res.status(404).send("User already exists");
    }
    //hash password
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    };
    const user = await User.create(newUser);
    console.log("Sucessfully Regsiter");
    return res.status(201).send(user);
  } catch (err) {
    return res.status(404).send(err.message);
  }
});

//This route is for logging the user.

router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("emailId is not registered");
    }
    let IsValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!IsValidPassword) {
      return res.status(404).send("Invalid password");
    }
    await sendEmail(req.body.email);
    console.log("Sucessfully Login");
    return res.status(200).send(user);
  } catch (err) {
    return res.status(404).send(err.message);
  }
});
module.exports = router;
