const warrantyDB = require("../model/warranty");
const Helper = require("../helperLibary/helper");

const all = async (req, res, next) => {
  let results = await warrantyDB.find();
  Helper.helper(res, "get all warranty ", results);
};

const add = async (req, res, next) => {
  let findName = await warrantyDB.findOne({ name: req.body.name });
  if (findName) {
    next(new Error("Name is already in use"));
  } else {
    req.body.remark = req.body.remark.split(",");
    let results = await new warrantyDB(req.body).save();
    Helper.helper(res, "add warranty", results);
  }
};

const getSingle = async (req, res, next) => {
  let findId = await warrantyDB.findById(req.params.id);
  if (findId) {
    Helper.helper(res, "get single warranty", findId);
  }
};

const patch = async (req, res, next) => {
  let findId = await warrantyDB.findById(req.params.id);
  if (findId) {
    await warrantyDB.findByIdAndUpdate(findId._id, req.body);
    let results = await warrantyDB.findById(findId._id);
    Helper.helper(res, "Edit warranty", results);
  }
};

const drop = async (req, res, next) => {
  let findId = await warrantyDB.findById(req.params.id);
  if (findId) {
    await warrantyDB.findByIdAndDelete(findId._id);
    Helper.helper(res, "Delete warranty");
  }
};

module.exports = {
  all,
  add,
  getSingle,
  patch,
  drop,
};
