const userController = require("../controller/users");
const userRouter = require("express").Router();
const { Register, login, addRole } = require("../helperLibary/schema");
const {
  validBody,
  validToken,
  validRole,
  validRoles,
} = require("../helperLibary/valid");

userRouter.post("/register", validBody(Register), userController.register);
userRouter.post("/", validBody(login), userController.login);
userRouter.get("/", userController.all);
userRouter.post(
  "/addrole",
  validToken,
  validRole("kaungsanhein"),
  //validBody(addRoles),
  userController.addRole
);
userRouter.post(
  "/removerole",
  validToken,
  validRole("kaungsanhein"),
  userController.removeRole
);

userRouter.post("/addpermit", userController.addPermit);
userRouter.post("/removepermit", userController.removePermit);
module.exports = userRouter;
