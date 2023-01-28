require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
app.use(express.json());
app.use(fileUpload());

const mongoose = require("mongoose");
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

const permitRouter = require("./router/permit");
const roleRouter = require("./router/role");
const userRouter = require("./router/users");
const categoryRouter = require("./router/category");
const subCatRouter = require("./router/subcategory");
const childCatRouter = require("./router/childCategory");
const tagRouter = require("./router/tag");
const deliveryRouter = require("./router/delivery");
const warrantyRouter = require("./router/warranty");
const productRouter = require("./router/product");
const orderRouter = require("./router/order");
const { validToken, validRoles } = require("./helperLibary/valid");

app.use("/category", categoryRouter);
app.use("/subcategory", subCatRouter);
app.use("/childcategory", childCatRouter);
app.use("/delivery", deliveryRouter);
app.use("/warranty", warrantyRouter);
app.use("/tag", tagRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);

app.use(
  "/permits",
  validToken,
  validRoles(["Ower", "Manager", "Supervisor"]),
  permitRouter
);
app.use(
  "/roles",
  validToken,
  validRoles(["Ower", "Manager", "Supervisor"]),
  roleRouter
);
app.use(
  "/users",

  userRouter
);

app.use((err, req, res, next) => {
  err.status = err.status || 400;
  res.status(err.status).json({
    con: false,
    err: err.message,
  });
});
const defaultsUser = async () => {
  let migration = require("./migration/migration");
  // migration.migrator();
  // migration.backUp();
  //migration.roleAndPermitMigrate();
  // migration.addOwerRole();
};

//defaultsUser();

app.listen(4000, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
