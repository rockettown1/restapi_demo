const { Router } = require("express");
const { User } = require("../models/User");
const userRouter = Router();

//get all users
userRouter.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//add a user
userRouter.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    console.log(req.body);
    res.status(201).send(savedUser);
  } catch (error) {
    res.status(500).send({ message: "Could not connect" });
  }
});

userRouter.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(user);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ message: "User not found" });
  }
});

userRouter.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ message: "User not found" });
  }
});

module.exports = {
  userRouter,
};
