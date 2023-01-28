const warrantyRouter = require("express").Router();

const warrantyController = require("../controller/warranty");
const { saveFile } = require("../gallery/gallery");

warrantyRouter.get("/", warrantyController.all);
warrantyRouter.post("/", saveFile, warrantyController.add);

warrantyRouter
  .route("/:id")
  .get(warrantyController.getSingle)
  .patch(warrantyController.patch)
  .delete(warrantyController.drop);

module.exports = warrantyRouter;
