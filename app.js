require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

const mongoose = require("mongoose");
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

const permitRouter = require("./router/permit");
const roleRouter = require("./router/role");
const userRouter = require("./router/users");
app.use("/permits", permitRouter);
app.use("/roles", roleRouter);
app.use("/users", userRouter);

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
