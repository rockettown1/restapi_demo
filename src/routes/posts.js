const { Router } = require("express");
const postRouter = Router();
const { getAllPosts, getPostsByUser, addPost, updatePost, deletePost } = require("../controllers/posts");
const { auth } = require("../middleware/");

postRouter.get("/posts", getAllPosts);
postRouter.get("/posts/", auth, getPostsByUser); //lock down
postRouter.post("/posts/", auth, addPost); //lock down
postRouter.patch("/posts/:id", auth, updatePost); //lock down
postRouter.delete("/posts/:id", auth, deletePost); //lock down

module.exports = {
  postRouter,
};
