const permitRouter = require("express").Router();

const permitController = require("../controller/permits");
const { permitSchema, id } = require("../helperLibary/schema");
const { validId, validBody } = require("../helperLibary/valid");
permitRouter.get("/", permitController.all);
permitRouter.post("/", validBody(permitSchema), permitController.postPermit);

permitRouter
  .route("/:id")
  .get(validId(id, "id"), permitController.getSinglePermit)
  .patch(permitController.permitPath)
  .delete(permitController.drop);

module.exports = permitRouter;
