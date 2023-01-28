const roleRouter = require("express").Router();
const roleController = require("../controller/role");
const { permitAndRole } = require("../helperLibary/schema");
const { validPermits, validBody } = require("../helperLibary/valid");
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
  .get(
    validPermits(["Create_Category", "Edit_Category", "Delete_Category"]),
    roleController.getSingle
  )
  .patch(
    validPermits(["Create_Category", "Edit_Category", "Delete_Category"]),
    roleController.patch
  )
  .delete(
    validPermits(["Create_Category", "Edit_Category", "Delete_Category"]),
    roleController.Drop
  );

module.exports = roleRouter;
