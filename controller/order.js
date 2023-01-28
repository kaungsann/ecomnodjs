const orderDB = require("../model/order");
const Helper = require("../helperLibary/helper");
const orderItemsDB = require("../model/orderitems");
const productDB = require("../model/product");

const all = async (req, res, next) => {
  let authUser = req.user;
  // console.log("authentication user ", authUser);
  let results = await orderDB
    .find({ user: authUser._id })
    .populate("items user");
  Helper.helper(res, "all get order", results);
};
const add = async (req, res, next) => {
  let user = req.user;
  let items = req.body.items;

  let saveOrder = new orderDB();
  let orderItemsObj = [];
  let total = 0;
  console.log("loop items ", items);
  for await (let item of items) {
    let product = await productDB.findById(item.id);
    console.log("product id ", product);

    let obj = {
      order: saveOrder._id, //auto generate id
      count: item.count,
      product: product._id,
      name: product.name,
      price: product.price,
    };
    // order  ထဲကိုထည့္ ဖို့ orderitems ကို အရင္ ဆုံးရွိဖို့ လို့ပါသည္
    // order: { type: Schema.Types.ObjectId, ref: "order", required: true },
    // count: { type: Number, default: 1 },
    // product: { type: Schema.Types.ObjectId, ref: "product", required: true },
    // name: { type: String, required: true },
    // price: { type: Number, required: true },
    orderItemsObj.push(obj);
    total += product.price * item.count;
  }
  //saveorderitems
  let orderItemsResult = await orderItemsDB.insertMany(orderItemsObj); // အရင္ ဆုံး orderitems ေတၤကို အရင္္ ဆုံးsave
  console.log(orderItemsResult); // Array ဖစါ တဲ့ orderitems ေတကို id အေနနဲ့ ပဲ ႀူ
  let orderItemsIds = orderItemsResult.map((itemid) => itemid._id);

  //order save
  saveOrder.user = user._id;
  saveOrder.items = orderItemsIds;
  saveOrder.count = items.length; // items ထဲက orderitems ေတရဲ့ အရည္္ အတက္
  saveOrder.total = total; // အ ေပါ က ေပါငါးထားတဲံ  total

  // order

  // name: { type: Schema.Types.ObjectId, ref: "user", required: true },
  // items: [{ type: Schema.Types.ObjectId, ref: "orderitem" }],
  // count: { type: Number, required: true },
  // total: { type: Number, requried: true },
  let results = await saveOrder.save();
  Helper.helper(res, "order accepted ", results);
};

module.exports = {
  all,
  add,
};
