const productController = require("../controller/product");
const productRouter = require("express").Router();
const { saveFiles } = require("../gallery/gallery");

productRouter.get("/", productController.all);
productRouter.post("/", saveFiles, productController.add);
productRouter.get("/paginate/:page", productController.paginate);
productRouter.get("/paginate/bytag/:page/:id", productController.byTag);
productRouter
  .route("/:id")
  .get(productController.getSingle)
  .patch(productController.patch)
  .delete(productController.drop);

module.exports = productRouter;
