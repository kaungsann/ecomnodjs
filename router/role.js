const roleRouter = require("express").Router();
const roleController = require("../controller/role");
const { permitAndRole } = require("../helperLibary/schema");
const { validBody } = require("../helperLibary/valid");
roleRouter.get("/", roleController.all);
roleRouter.post("/", roleController.addRole);
roleRouter.post(
  "/addpermit",
  validBody(permitAndRole),
  roleController.addPermit
);
roleRouter.post(
  "/removepermit",
  validBody(permitAndRole),
  roleController.removePermit
);

roleRouter
  .route("/:id")
  .get(roleController.getSingle)
  .patch(roleController.patch)
  .delete(roleController.Drop);

module.exports = roleRouter;
