const helper = require("../helperLibary/helper");
const DB = require("../model/users");
const roleDB = require("../model/roles");
const permitDB = require("../model/permits");

const register = async (req, res, next) => {
  let findName = await DB.findOne({ name: req.body.name });
  if (findName) {
    next(new Error("Name is already in use "));
    return;
  }
  let findEmail = await DB.findOne({ email: req.body.email });
  if (findEmail) {
    next(new Error("email is already in use"));
    return;
  }
  let findPhone = await DB.findOne({ phone: req.body.phone });
  if (findPhone) {
    next(new Error("phone number is already in use"));
    return;
  }
  req.body.password = helper.encodePassword(req.body.password);
  let results = await new DB(req.body).save();
  helper.helper(res, "save user new ", results);
};

const login = async (req, res, next) => {
  let DBName = await DB.findOne({ email: req.body.email }).populate(
    "roles permits"
  );
  if (DBName) {
    let result = helper.ComparePassword(req.body.password, DBName.password);
    if (result) {
      let users = DBName.toObject();
      delete users.password;
      users.token = helper.makeToken(users);
      helper.set(users._id, users);
      helper.helper(res, "Login successful", users);
    } else {
      next(new Error("Creditial error"));
    }
  } else {
    next(new Error("not have that email in server"));
  }
};
const all = async (req, res, next) => {
  let results = await DB.find().populate("roles permits");
  helper.helper(res, "all users ", results);
};

const addRole = async (req, res, next) => {
  let userDB = await DB.findById(req.body.userId);
  let roleID = await roleDB.findById(req.body.roleId);
  let foundId = userDB.roles.find((rolid) => rolid.equals(roleID._id));
  if (foundId) {
    next(new Error("Role is already exist"));
  } else {
    let results = await DB.findByIdAndUpdate(userDB._id, {
      $push: { roles: roleID._id },
    });
    helper.helper(res, "add roles to user", results);
  }
};

const removeRole = async (req, res, next) => {
  let userDB = await DB.findById(req.body.userId);
  let roleId = await roleDB.findById(req.body.roleId);
  let foundId = userDB.roles.find((rolid) => rolid.equals(req.body.roleId));
  console.log("not found roles", foundId);
  if (foundId) {
    await DB.findByIdAndUpdate(userDB._id, {
      $pull: { roles: req.body.roleId },
    });
    let results = await DB.find(userDB._id);
    helper.helper(res, "remove role user", results);
  } else {
    next(new Error("there is no roles"));
  }
};

const addPermit = async (req, res, next) => {
  let userId = await DB.findById(req.body.userId);
  let permitId = await permitDB.findById(req.body.permitId);

  console.log(userId);
  let foundPermits = userId.permits.find((per) => per.equals(permitId._id));

  if (foundPermits) {
    next(new Error("Permits Id is already in exits"));
  } else {
    await DB.findByIdAndUpdate(userId._id, {
      $push: { permits: permitId._id },
    });
    let results = await DB.findById(userId._id);
    helper.helper(res, "add permit user", results);
  }
};

const removePermit = async (req, res, next) => {
  let userId = await DB.findById(req.body.userId);
  let permitId = await permitDB.findById(req.body.permitId);
  let foundPermit = userId.permits.find((per) => per.equals(permitId._id));
  if (foundPermit) {
    await DB.findByIdAndUpdate(userId._id, {
      $pull: { permits: permitId._id },
    });
    let remove = await DB.findById(userId._id);
    helper.helper(res, "remove permits user", remove);
  } else {
    next(new Error("there is no this permit ID"));
  }
};

module.exports = {
  register,
  login,
  all,
  addRole,
  removeRole,
  addPermit,
  removePermit,
};
