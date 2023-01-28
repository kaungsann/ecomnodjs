const permitRouter = require("express").Router();

const permitController = require("../controller/permits");
const { permitSchema, id } = require("../helperLibary/schema");
const { validId, validBody, validPermits } = require("../helperLibary/valid");
permitRouter.get("/", permitController.all);
permitRouter.post("/", validBody(permitSchema), permitController.postPermit);

permitRouter
  .route("/:id")
  .get(
    validId(id, "id"),
    validPermits(["Create_Category", "Edit_Category", "Delete_Category"]),
    permitController.getSinglePermit
  )
  .patch(permitController.permitPath)
  .delete(permitController.drop);

module.exports = permitRouter;
