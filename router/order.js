const orderRouter = require("express").Router();
const orderController = require("../controller/order");
const { validToken } = require("../helperLibary/valid");

orderRouter.get("/", validToken, orderController.all);
orderRouter.post("/", validToken, orderController.add);

module.exports = orderRouter;
