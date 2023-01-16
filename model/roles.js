const mongoose = require("mongoose");

const { Schema } = mongoose;

const roleSchema = new Schema({
  name: { type: String, required: true },
  permits: [{ type: Schema.Types.ObjectId, ref: "permit" }],
  create: { type: Date, default: Date.now },
});

const roles = mongoose.model("role", roleSchema);

module.exports = roles;
