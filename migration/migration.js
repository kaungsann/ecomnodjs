const Helper = require("../helperLibary/helper");
const fs = require("fs");
const DB = require("../model/users");
const roleDB = require("../model/roles");
const permitDB = require("../model/permits");

const migrator = () => {
  let data = fs.readFileSync("./migration/users.json");
  let users = JSON.parse(data);
  users.forEach(async (user) => {
    user.password = Helper.encodePassword(user.password);
    await new DB(user).save();
  });
};
const backUp = async () => {
  let users = await DB.find();
  fs.writeFileSync("./migration/backup/users.json", JSON.stringify(users));
};
const roleAndPermitMigrate = () => {
  let roleAndPermit = fs.readFileSync("./migration/permitAndRole.json");
  let rp = JSON.parse(roleAndPermit);
  rp.roles.forEach(async (roles) => {
    let results = await new roleDB(roles).save();
    console.log(results);
  });
  rp.permits.forEach(async (permit) => {
    let results = await new permitDB(permit).save();
    console.log(results);
  });
};

const addOwerRole = async () => {
  let owerDB = await DB.findOne({ phone: "09100100100" });
  let owerRole = await roleDB.findOne({ name: "Ower" });
  await DB.findByIdAndUpdate(owerDB._id, {
    $push: { roles: owerRole._id },
  });
  await DB.findById(owerDB._id);
};

module.exports = {
  migrator,
  backUp,
  roleAndPermitMigrate,
  addOwerRole,
};
