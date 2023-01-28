const tagDB = require("../model/tag");
const Helper = require("../helperLibary/helper");

const all = async (req, res, next) => {
  let results = await tagDB.find();
  Helper.helper(res, "all tag ", results);
};

const add = async (req, res, next) => {
  let findOne = await tagDB.findOne({ name: req.body.name });
  if (findOne) {
    next(new Error("Name is already in use"));
  } else {
    let results = await new tagDB(req.body).save();
    Helper.helper(res, "add tag ", results);
  }
};

const getSingle = async (req, res, next) => {
  let findId = await tagDB.findById(req.params.id);
  if (findId) {
    Helper.helper(res, " get single tag", findId);
  }
};

const patch = async (req, res, next) => {
  let findId = await tagDB.findById(req.params.id);
  if (findId) {
    await tagDB.findByIdAndUpdate(findId._id, req.body);
    let results = await tagDB.findById(findId._id);
    Helper.helper(res, "Edit Tag", results);
  }
};

const drop = async (req, res, next) => {
  let findId = await tagDB.findById(req.params.id);
  if (findId) {
    await tagDB.findByIdAndDelete(findId._id);
    Helper.helper(res, "Delete tag");
  }
};
module.exports = {
  all,
  add,
  getSingle,
  patch,
  drop,
};
