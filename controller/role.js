const DB = require("../model/roles");
const permitDB = require("../model/permits");
const Helper = require("../helperLibary/helper");

const all = async (req, res, next) => {
  let results = await DB.find().populate("permits", "-__v");
  Helper.helper(res, "all roles ", results);
};
const addRole = async (req, res, next) => {
  let addRole = await DB.findOne({ name: req.body.name });
  if (addRole) {
    next(new Error("Role is already in use"));
  } else {
    let results = await new DB(req.body).save();
    Helper.helper(res, "add role", results);
  }
};

const getSingle = async (req, res, next) => {
  let findId = await DB.findById(req.params.id);
  if (findId) {
    Helper.helper(res, "get role single", findId);
  } else {
    next(new Error("Not have with that id "));
  }
};

const patch = async (req, res, next) => {
  let updatePatch = await DB.findById(req.params.id);
  if (updatePatch) {
    await DB.findByIdAndUpdate(updatePatch._id, req.body);
    let results = await DB.findById(updatePatch._id);
    Helper.helper(res, "update roles ", results);
  }
};
const Drop = async (req, res, next) => {
  let findById = await DB.findById(req.params.id);
  if (findById) {
    await DB.findByIdAndDelete(findById);
    Helper.helper(res, "delete role ");
  } else {
    next(new Error("Not have roles "));
  }
};

const addPermit = async (req, res, next) => {
  let roleId = await DB.findById(req.body.roleId);
  let permitId = await permitDB.findById(req.body.permitId);
  if (roleId && permitId) {
    await DB.findByIdAndUpdate(roleId._id, {
      $push: { permits: permitId._id },
    });
    let results = await DB.findById(roleId._id);
    Helper.helper(res, "add permit in role", results);
  } else {
    next(new Error("pls check it your role id and permit id"));
  }
};
const removePermit = async (req, res, next) => {
  let roleId = await DB.findById(req.body.roleId);
  let permitId = await permitDB.findById(req.body.permitId);
  if (roleId && permitId) {
    await DB.findByIdAndUpdate(roleId._id, {
      $pull: { permits: permitId._id },
    });
    let results = await DB.findById(roleId._id);
    Helper.helper(res, "delete permit id", results);
  }
};

module.exports = {
  all,
  addRole,
  getSingle,
  patch,
  Drop,
  addPermit,
  removePermit,
};
