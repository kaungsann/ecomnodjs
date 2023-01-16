const DB = require("../model/permits");

const Helper = require("../helperLibary/helper");

const all = async (req, res, next) => {
  let results = await DB.find();
  Helper.helper(res, "all permit", results);
};

const postPermit = async (req, res, next) => {
  let findName = await DB.findOne({ name: req.body.name });
  if (findName) {
    next(new Error("your name is  already in use"));
  }
  let results = await new DB(req.body).save();
  Helper.helper(res, "all permit", results);
};

const getSinglePermit = async (req, res, next) => {
  let findId = await DB.findById(req.params.id);
  if (findId) {
    Helper.helper(res, "all permit", findId);
  } else {
    next(new Error("this name already in use "));
  }
};

const permitPath = async (req, res, next) => {
  let findId = await DB.findById(req.params.id);
  if (findId) {
    await DB.findByIdAndUpdate(findId._id, req.body);
    let results = await DB.findById(findId._id);
    Helper.helper(res, "all permit", results);
  }
};
const drop = async (req, res, next) => {
  let findId = await DB.findById(req.params.id);
  if (findId) {
    await DB.findByIdAndDelete(findId);
    Helper.helper(res, "delete permit ");
  }
};

module.exports = {
  all,
  getSinglePermit,
  postPermit,
  permitPath,
  drop,
};
