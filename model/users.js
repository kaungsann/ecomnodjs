const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  permits: [{ type: Schema.Types.ObjectId, ref: "permit" }],
  roles: [{ type: Schema.Types.ObjectId, ref: "role" }],
  create: { type: Date, default: Date.now },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
