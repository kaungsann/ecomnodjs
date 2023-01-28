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
    //console.log(token);
    if (token) {
      try {
        let decode = jwt.verify(token, process.env.SECRET_KEY);
        console.log("token", decode);
        let users = await helper.get(decode._id);
        if (users) {
          req.user = users;
          next();
        } else {
          next(new Error("Tokenization error"));
        }
      } catch (error) {
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
  validRoles: (roles) => {
    return async (req, res, next) => {
      let bol = false;

      for (let i = 0; i < roles.length; i++) {
        let hasRole = req.user.roles.find((rol) => rol.name === roles[i]);
        console.log("is it true", hasRole);
        if (hasRole) {
          bol = true;
          break;
        }
      }
      if (bol) {
        next();
      } else {
        next(new Error("You are not vip roles"));
      }
    };
  },
  validPermits: (permits) => {
    return async (req, res, next) => {
      let bol = false;
      console.log(req.user.permits);
      for (let i = 0; i < permits.length; i++) {
        let findPermit = req.user.permits.find(
          (per) => per.name === permits[i]
        );
        if (findPermit) {
          bol = true;
          break;
        }
      }
      if (bol) {
        next();
      } else {
        next(new Error("You don't have permission"));
      }
    };
  },
};
