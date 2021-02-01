const { Router } = require("express");
const { getAllUsers, addUser, updateUserById, deleteUser } = require("../controllers/users");
const userRouter = Router();

// userRouter.get("/users", getAllUsers);
// userRouter.post("/users", addUser);
// userRouter.patch("/users/:id", updateUserById);
// userRouter.delete("/users/:id", deleteUser);

//tidier way
userRouter.route("/users").get(getAllUsers).post(addUser);
userRouter.route("/users/:id").patch(updateUserById).delete(deleteUser);

module.exports = {
  userRouter,
};
