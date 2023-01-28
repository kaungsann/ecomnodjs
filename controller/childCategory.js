const childDB = require("../model/childCategory");
const subCatDB = require("../model/subCategory");
const Helper = require("../helperLibary/helper");

const getAll = async (req, res, next) => {
  let result = await childDB.find();
  Helper.helper(res, "get all child category", result);
};
const add = async (req, res, next) => {
  let findName = await childDB.findOne({ name: req.body.name });
  if (findName) {
    next(new Error("Name is already in use"));
  } else {
    let findID = await subCatDB.findById(req.body.subCategoryId);

    if (findID) {
      let results = await new childDB(req.body).save();
      await subCatDB.findByIdAndUpdate(findID._id, {
        $push: { childcategoryId: results._id },
      });
      Helper.helper(res, "add child", results);
    }
  }
};
const getSingle = async (req, res, next) => {
  let findId = await childDB.findById(req.params.id);
  if (findId) {
    Helper.helper(res, " get one child category", findId);
  }
};
const patch = async (req, res, next) => {
  let findId = await childDB.findById(req.params.id);
  if (findId) {
    await childDB.findByIdAndUpdate(findId._id, req.body);
    let results = await childDB.findById(findId._id);
    Helper.helper(res, "Edit child category", results);
  } else {
    new Error("Not have with that id");
  }
};
const drop = async (req, res, next) => {
  let findID = await childDB.findById(req.params.id);
  if (findID) {
    await childDB.findByIdAndDelete(findID._id);
    await subCatDB.findByIdAndUpdate(findID.subCategoryId, {
      $pull: { childcategoryId: findID._id },
    });
    Helper.helper(res, "Delete id ");
  }
};
module.exports = {
  getAll,
  add,
  getSingle,
  patch,
  drop,
};
