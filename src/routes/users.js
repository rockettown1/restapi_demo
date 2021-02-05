const { Router } = require("express");
const { getMyProfile, addUser, updateUserById, deleteUser, login, logout } = require("../controllers/users");
const { hashPassword, auth } = require("../middleware/");
const userRouter = Router();

//TEST
//add a user
//copy the token
// get your profile (remember to include the token in the header)

userRouter.get("/users/myprofile", auth, getMyProfile);
userRouter.post("/users", hashPassword, addUser);
userRouter.patch("/users/:id", auth, hashPassword, updateUserById);
userRouter.delete("/users/:id", auth, deleteUser);
userRouter.post("/users/login", login);
userRouter.get("/users/logout", auth, logout);

//tidier way
// userRouter.route("/users").get(getAllUsers).post(addUser);
// userRouter.route("/users/:id").patch(updateUserById).delete(deleteUser);

module.exports = {
  userRouter,
};
