const subCatRouter = require("express").Router();
const { saveFile } = require("../gallery/gallery");

const subCatController = require("../controller/subcategory");
const subCategory = require("../model/subCategory");

subCatRouter.get("/", subCatController.all);
subCatRouter.post("/", saveFile, subCatController.add);

subCatRouter
  .route("/:id")
  .get(subCatController.getSingle)
  .patch(subCatController.patch)
  .delete(subCatController.drop);

module.exports = subCatRouter;
