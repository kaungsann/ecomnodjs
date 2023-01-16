const userController = require("../controller/users");
const userRouter = require("express").Router();
const { Register, login, addRole } = require("../helperLibary/schema");
const { validBody, validToken, validRole } = require("../helperLibary/valid");

userRouter.post("/register", validBody(Register), userController.register);
userRouter.post("/", validBody(login), userController.login);
userRouter.get("/", userController.all);
userRouter.post(
  "/add/role",
  validToken,
  validRole("kaungsanhein"),
  //validBody(addRoles),
  userController.addRole
);
userRouter.post(
  "/remove/role",
  validToken,
  validRole("kaungsanhein"),
  userController.removeRole
);
module.exports = userRouter;
