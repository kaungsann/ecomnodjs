const mongoose = require("mongoose");

const { Schema } = mongoose;

const deliverySchema = new Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  remark: { type: Array },
  create: { type: Date, default: Date.now },
});

const Delivery = mongoose.model("delivery", deliverySchema);

module.exports = Delivery;
