const subCatDB = require("../model/subCategory");
const catDB = require("../model/category");
const Helper = require("../helperLibary/helper");

const all = async (req, res, next) => {
  let findAll = await subCatDB.find().populate("");
  Helper.helper(res, "All subcategory", findAll);
};
const add = async (req, res, next) => {
  let find = await subCatDB.findOne({ name: req.body.name });
  if (find) {
    next(new Error("Name is already in use"));
  }
  let findCat = await catDB.findById(req.body.categoryId);
  if (findCat) {
    let result = await new subCatDB(req.body).save();
    await catDB.findByIdAndUpdate(findCat._id, {
      $push: { subcategory: result._id },
    });
    Helper.helper(res, "add subcategory", result);
  }
};
const getSingle = async (req, res, next) => {
  let findId = await subCatDB.findById(req.params.id);
  if (findId) {
    Helper.helper(res, " get subcategory", findId);
  } else {
    next(new Error("No have subcategory id in exist"));
  }
};
const patch = async (req, res, next) => {
  let findId = await subCatDB.findById(req.params.id);
  if (findId) {
    await subCatDB.findByIdAndUpdate(findId._id, req.body);
    let result = await subCatDB.findById(findId._id);
    Helper.helper(res, "Edit subcategory", result);
  } else {
    next(new Error("No have subcategory id in exist"));
  }
};
const drop = async (req, res, next) => {
  let findId = await subCatDB.findById(req.params.id);
  if (findId) {
    await catDB.findByIdAndUpdate(findId.categoryId, {
      $pull: { subcategory: findId._id },
    });
    await subCatDB.findByIdAndDelete(findId._id);
    Helper.helper(res, "delete");
  }
};

module.exports = {
  all,
  add,
  getSingle,
  patch,
  drop,
};
