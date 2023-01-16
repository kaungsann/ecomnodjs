const joi = require("joi");

module.exports = {
  permitSchema: joi.object({
    name: joi.string().required(),
  }),
  id: joi.object({
    id: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),
  permitAndRole: joi.object({
    roleId: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    permitId: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),
  Register: joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi.string().min(6).max(11).required(),
    password: joi.string().min(6).max(24).required(),
  }),
  login: joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(24).required(),
  }),
  addRole: joi.object({
    userId: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    roleId: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),
};
