const childCatRouter = require("express").Router();
const childCatController = require("../controller/childCategory");
const { saveFile } = require("../gallery/gallery");
const childCategory = require("../model/childCategory");

childCatRouter.get("/", childCatController.getAll);
childCatRouter.post("/", saveFile, childCatController.add);

childCatRouter
  .route("/:id")
  .get(childCatController.getSingle)
  .patch(childCatController.patch)
  .delete(childCatController.drop);

module.exports = childCatRouter;
