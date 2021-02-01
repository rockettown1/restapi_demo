const { Router } = require("express");
const postRouter = Router();
const { Post } = require("../models/Post");

postRouter.get("/posts", async (req, res) => {
  try {
    const allPosts = await Post.find({});
    res.status(200).send(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

postRouter.get("/posts/:user_id", async (req, res) => {
  try {
    const allPosts = await Post.find({ author: req.params.user_id });
    res.status(200).send(allPosts);
  } catch (error) {
    res.status(404).send({ message: "user not found" });
  }
});

postRouter.post("/posts", async (req, res) => {
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();
    console.log(req.body);
    res.status(201).send(savedPost);
  } catch (error) {
    res.status(500).send({ message: "Could not connect" });
  }
});

postRouter.post("/posts/:user_id", async (req, res) => {
  try {
    // const post = new Post(req.body);
    // const user = await User.findById(req.params.user_id);
    // user.posts.push(post);
    // const returnedValue = await user.save();
    const post = new Post(req.body);
    post.author = req.params.user_id;
    const returnedValue = await post.save();

    res.status(201).send(returnedValue);
  } catch (error) {
    res.status(400).send(error);
  }
});

postRouter.patch("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(post);
    res.status(200).send("successfully updated");
  } catch (error) {
    res.status(404).send({ message: "user not found" });
  }
});

postRouter.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send({ message: "user not found" });
  }
});

module.exports = {
  postRouter,
};
