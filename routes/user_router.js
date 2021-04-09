const express = require("express");
const UserController = require("../controllers/User_Controller");
const userRouter = express.Router();
const auth = require("../middlewares/auth_Jwt");

userRouter.post("/register", UserController.createUser);
userRouter.post("/login", UserController.loginUser);
userRouter.get("/:userId", auth.authentication, auth.authorization, UserController.findIdUser);
userRouter.put("/:userId", auth.authentication, auth.authorization, UserController.updatedUser);
userRouter.post("/:userId/attack/:enemyId", auth.authentication, auth.authorization, UserController.attackPlayer);
// userRouter.post("/attack", auth.authentication, auth.authorization, UserController.attackPlayer2);
// userRouter.get("/", UserController.findAllUser);

module.exports = userRouter;
