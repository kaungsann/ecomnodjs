let categoryRoute = require("express").Router();
let cattegoryController = require("../controller/category");
let { saveFile } = require("../gallery/gallery");

categoryRoute.get("/", cattegoryController.all);
categoryRoute.post("/", saveFile, cattegoryController.add);
categoryRoute
  .route("/:id")
  .get(cattegoryController.getSingle)
  .patch(cattegoryController.patch)
  .delete(cattegoryController.drop);

//categoryRoute.route("/:id").get(categoryRoute.getSingle);
//.patch(categoryRoute.patch);

module.exports = categoryRoute;
