const bcrypt = require("bcryptjs");
const Redis = require("async-redis").createClient();
const JWT = require("jsonwebtoken");
module.exports = {
  helper: (res, mes = "", results = []) => {
    res.status(200).json({
      con: true,
      mes,
      results,
    });
  },
  encodePassword: (password) => bcrypt.hashSync(password),
  ComparePassword: (plain, hash) => bcrypt.compareSync(plain, hash),
  set: async (id, value) =>
    await Redis.set(id.toString(), JSON.stringify(value)),
  get: async (id) => JSON.parse(await Redis.get(id.toString())),
  drop: async (id) => await Redis.del(id.toString()),
  makeToken: (payload) =>
    JWT.sign(payload, process.env.SECRET_KEY, { expiresIn: "4h" }),
};
