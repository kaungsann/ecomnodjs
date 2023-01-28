const catDB = require("../model/category");
const Helper = require("../helperLibary/helper");

const all = async (req, res, next) => {
  let findCat = await catDB.find().populate({
    path: "subcategory",
    populate: {
      path: "childcategoryId",
      model: "childcat",
    },
  });
  Helper.helper(res, "all category", findCat);
};
const add = async (req, res, next) => {
  let findName = await catDB.findOne({ name: req.body.name });
  if (findName) {
    next(new Error("Name is already use"));
  } else {
    let result = await new catDB(req.body).save();
    Helper.helper(res, "add category", result);
  }
};
const getSingle = async (req, res, next) => {
  let findID = await catDB.findById(req.params.id);
  if (findID) {
    Helper.helper(res, "get Single", findID);
  }
};
const patch = async (req, res, next) => {
  let findId = await catDB.findById(req.params.id);
  if (findId) {
    await catDB.findByIdAndUpdate(findId._id, req.body);
    let result = await catDB.findById(findId._id);
    Helper.helper(res, "Edits Category", result);
  }
};

const drop = async (req, res, next) => {
  let findId = await catDB.findById(req.params.id);
  if (findId) {
    await catDB.findByIdAndDelete(findId);
    await catDB.findById(findId.__id);
    Helper.helper(res, "Delete Category");
  }
};
module.exports = {
  all,
  add,
  patch,
  getSingle,
  drop,
};
