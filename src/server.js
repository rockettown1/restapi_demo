require("./db/connection");
const express = require("express");
const { Post } = require("./models/Post");
const { userRouter } = require("./routes/users");

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(userRouter);

app.get("/health", (req, res) => {
  res.status(200).send({ message: "API is working" });
});

app.get("/posts", async (req, res) => {
  try {
    const allPosts = await Post.find({});
    res.status(200).send(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get("/posts/:user_id", async (req, res) => {
  try {
    const allPosts = await Post.find({ author: req.params.user_id });
    res.status(200).send(allPosts);
  } catch (error) {
    res.status(404).send({ message: "user not found" });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();
    console.log(req.body);
    res.status(201).send(savedPost);
  } catch (error) {
    res.status(500).send({ message: "Could not connect" });
  }
});

app.post("/posts/:user_id", async (req, res) => {
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

app.patch("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(post);
    res.status(200).send("successfully updated");
  } catch (error) {
    res.status(404).send({ message: "user not found" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send({ message: "user not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
