const express = require("express");
const UserModel = require("../models/UserModel");

const UserRouter = express.Router();

UserRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await UserModel.findOne({ email });
    if (exist) {
      return res.send("user already exists");
    }
    const user = new UserModel({ name, email, password });
    await user.save();
    res.status(201).send({
      msg: "User Registered Successfully",
      user: { name, email },
      token: `${email}+${Math.random(0, 999999)}`,
    });
  } catch (error) {
    res.send({ error });
  }
});

UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      if (user.password === password) {
        res.send({
          msg: "Logged in Successfully",
          token: `${email}+${Math.random(0, 999999999)}`,
          name: user.name,
        });
      } else {
        res.send("Wrong Password");
      }
    } else {
      res.send("User not found");
    }
  } catch (error) {
    res.send({ error });
  }
});

UserRouter.get("/", async (req, res) => {
  try {
    let users = await UserModel.find();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

UserRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let user = await UserModel.findById(id);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = UserRouter;
