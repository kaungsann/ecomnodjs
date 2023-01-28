const mongoose = require("mongoose");

const { Schema } = mongoose;

const warrantySchema = new Schema({
  name: { type: String, required: true, unquie: true },
  image: { type: String, required: true },
  remark: { type: Array },
  create: { type: Date, default: Date.now },
});

const Warranty = mongoose.model("warranty", warrantySchema);

module.exports = Warranty;
