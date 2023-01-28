const Helper = require("../helperLibary/helper");
const deliveryDB = require("../model/delivery");

const all = async (req, res, next) => {
  let results = await deliveryDB.find();
  Helper.helper(res, "all get delivery", results);
};

const add = async (req, res, next) => {
  let findName = await deliveryDB.findOne({ name: req.body.name });
  if (findName) {
    next(new Error("Name is already in use"));
  } else {
    req.body.remark = req.body.remark.split(",");
    let results = await new deliveryDB(req.body).save();
    Helper.helper(res, " add delivery ", results);
  }
};
const getSingle = async (req, res, next) => {
  let findId = await deliveryDB.findById(req.params.id);
  if (findId) {
    Helper.helper(res, "get single deliver", findId);
  } else {
    next(new Error("Not have with that id "));
  }
};
const patch = async (req, res, next) => {
  let findId = await deliveryDB.findById(req.params.id);
  if (findId) {
    await deliveryDB.findByIdAndUpdate(findId._id, req.body);
    let results = await deliveryDB.findById(findId._id);
    Helper.helper(res, "Edit delivery", results);
  }
};
const drop = async (req, res, next) => {
  let findId = await deliveryDB.findById(req.params.id);
  if (findId) {
    await deliveryDB.findByIdAndDelete(findId._id);
    Helper.helper(res, "Delete delivery");
  } else {
    next(new Error("Not found with that id"));
  }
};

module.exports = {
  all,
  add,
  getSingle,
  patch,
  drop,
};
