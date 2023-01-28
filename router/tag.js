const tagController = require("../controller/tag");
const { saveFile } = require("../gallery/gallery");
const tagRouter = require("express").Router();

tagRouter.get("/", tagController.all);
tagRouter.post("/", saveFile, tagController.add);

tagRouter
  .route("/:id")
  .get(tagController.getSingle)
  .patch(tagController.patch)
  .delete(tagController.drop);

module.exports = tagRouter;
