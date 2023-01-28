const deliveryRouter = require("express").Router();
const deliveryController = require("../controller/delivery");
const { saveFile } = require("../gallery/gallery");
deliveryRouter.get("/", deliveryController.all);
deliveryRouter.post("/", saveFile, deliveryController.add);

deliveryRouter
  .route("/:id")
  .get(deliveryController.getSingle)
  .patch(deliveryController.patch)
  .delete(deliveryController.drop);
module.exports = deliveryRouter;
