const productDB = require("../model/product");

const Helper = require("../helperLibary/helper");

const all = async (req, res, next) => {
  let all = await productDB.find();
  Helper.helper(res, "all products", all);
};
const add = async (req, res, next) => {
  let findName = await productDB.findOne({ name: req.body.name });
  if (findName) {
    next(new Error("Name is already in use"));
  } else {
    req.body.features = req.body.features.split(",");
    req.body.delivery = req.body.delivery.split(",");
    req.body.warranty = req.body.warranty.split(",");
    req.body.color = req.body.color.split(",");
    let results = await new productDB(req.body).save();
    Helper.helper(res, "add product", results);
  }
};
const paginate = async (req, res, next) => {
  let pageNo = req.params.page;
  let limit = Number(process.env.PAGE_LIMIT);
  let pageCount = pageNo == 1 ? 0 : (pageNo -= 1);
  let skipCount = pageCount * limit;
  console.log(skipCount);
  let results = await productDB.find().skip(skipCount).limit(limit);
  Helper.helper(res, "get paginate", results);
};

const getSingle = async (req, res, next) => {
  let findId = await productDB.findById(req.params.id);
  if (findId) {
    Helper.helper(res, " get single product", findId._id);
  } else {
    next(new Error("Not found with that id "));
  }
};
const patch = async (req, res, next) => {
  let findID = await productDB.findById(req.params.id);
  if (findID) {
    await productDB.findByIdAndUpdate(findID._id, req.body);
    let results = await productDB.findById(findID._id);
    Helper.helper(res, "Edit product", results);
  } else {
    next(new Error("Not have with that id"));
  }
};
const drop = async (req, res, next) => {
  let findId = await productDB.findById(req.params.id);
  if (findId) {
    await productDB.findByIdAndDelete(findId._id);
    Helper.helper(res, "products Delete");
  }
};

const byTag = async (req, res, next) => {
  let pageNo = req.params.page;
  let limit = Number(process.env.PAGE_LIMIT);
  let pageCount = pageNo == 1 ? 0 : (pageNo -= 1);
  let skipCount = pageCount * limit;
  console.log(skipCount);
  let results = await productDB
    .find({ tag: req.params.id })
    .skip(skipCount)
    .limit(limit);
  Helper.helper(res, "get paginate", results);
};
// 0 -> 2
// 1 ->  2 to 4

module.exports = {
  all,
  add,
  paginate,
  getSingle,
  patch,
  drop,
  byTag,
};
