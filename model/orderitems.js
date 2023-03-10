const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderItemSchema = new Schema({
  order: { type: Schema.Types.ObjectId, ref: "order", required: true },
  count: { type: Number, default: 1 },
  product: { type: Schema.Types.ObjectId, ref: "product", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  status: {
    type: String,
    enum: ["ACCEPT", "PENDING", "DELIVERED"],
    default: "ACCEPT",
  },
  create: { type: Date, default: Date.now },
});

const Orderitem = mongoose.model("orderitem", orderItemSchema);

module.exports = Orderitem;
