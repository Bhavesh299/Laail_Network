const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/userModel");
const admin = "admin";

//This route is for getting the user.

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    return res.status(200).send(user);
  } catch (err) {
    return res.status(404).send(err.message);
  }
});

//This route is for updating the user.

router.patch("/:id", async (req, res) => {
  try {
    if (req.params.id === req.body.userId || req.body.role === admin) {
      const user = await User.findOne({ id: req.params.id });
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (e) {
          return res.status(500).send(e);
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        console.log("Account has been updated");
        return res.status(200).send("Account has been updated");
      } catch (e) {
        return res.status(500).send(e);
      }
    }
    return res.status(404).send("You can't update other's account");
  } catch (err) {
    return res.status(404).send(err.message);
  }
});

//This route is for deleting the user.

router.delete("/:id", async (req, res) => {
  try {
    if (req.params.id === req.body.userId || req.body.role === admin) {
      const user = await User.findOneAndDelete({ _id: req.params.id });
      console.log("User has been deleted");
      return res.status(201).send("User has been deleted");
    } else {
      return res.status(404).send("You can't delete other's account");
    }
  } catch (err) {
    return res.status(404).send(err.message);
  }
});

module.exports = router;
