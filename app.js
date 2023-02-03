require("dotenv").config();
const express = require("express");
let jwt = require("jsonwebtoken");

app = express();
server = require("http").createServer(app);
io = require("socket.io")(server);
fileUpload = require("express-fileupload");
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
const helper = require("./helperLibary/helper");

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

io.of("/chat")
  .use(async (socket, next) => {
    let token = socket.handshake.query.token;
    // console.log(token);
    if (token) {
      let decode = jwt.verify(token, process.env.SECRET_KEY);
      //console.log(decode);
      if (decode) {
        let user = await helper.get(decode._id);
        // console.log(user);
        socket.userData = user;
        next();
      } else {
        next(new Error("Tokenization error"));
      }
    }
  })
  .on("connection", (socket) => {
    require("./helperLibary/chat").initialize(io, socket);
  });

// io.on("connection", (socket) => {
//   socket.on("test", (data) => {
//     console.log("socket id ", socket.id);
//     console.log("user sent data", data);
//     socket.emit("success", { greet: "hello client user" });
//   });
// });

server.listen(4000, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
