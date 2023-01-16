const jwt = require("jsonwebtoken");
const helper = require("./helper");

module.exports = {
  validBody: (schema) => {
    return (req, res, next) => {
      let results = schema.validate(req.body);
      if (results.error) {
        next(new Error(results.error.details[0].message));
      } else {
        next();
      }
    };
  },
  validId: (schema, name) => {
    return (req, res, next) => {
      let obj = {};
      obj[`${name}`] = req.params[`${name}`];
      let results = schema.validate(obj);
      if (results.error) {
        next(results.error.details[0].message);
      } else {
        next();
      }
    };
  },
  validToken: async (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decode = jwt.verify(token, process.env.SECRET_KEY);
      let users = await helper.get(decode._id);
      if (users) {
        req.user = users;
        next();
      } else {
        next(new Error("Tokenization error"));
      }
    } else {
      next(new Error("Tokenization error"));
    }
  },
  validRole: (role) => {
    return async (req, res, next) => {
      // console.log(req.user);
      if (req.user.name == role) {
        next();
      } else {
        next(new Error("you don't have this permission"));
      }
    };
  },
};
