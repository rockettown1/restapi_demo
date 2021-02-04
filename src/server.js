require("./db/connection");
const express = require("express");
const cors = require("cors");
const { userRouter } = require("./routes/users");
const { postRouter } = require("./routes/posts");

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(postRouter);

app.get("/health", (req, res) => {
  res.status(200).send({ message: "API is working" });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
