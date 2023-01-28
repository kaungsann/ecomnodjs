const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  categroy: { type: Schema.Types.ObjectId, ref: "category" },
  subcategory: { type: Schema.Types.ObjectId, ref: "subcat" },
  childcategory: { type: Schema.Types.ObjectId, ref: "childcat" },
  tag: { type: Schema.Types.ObjectId, ref: "tag" },
  discount: { type: Number, required: true },
  features: { type: Array, required: true },
  description: { type: String, required: true },
  details: { type: String, required: true },
  status: { type: Boolean, default: true },
  delivery: [{ type: Schema.Types.ObjectId, ref: "delivery" }],
  warranty: [{ type: Schema.Types.ObjectId, ref: "warranty" }],
  color: { type: Array, required: true },
  size: { type: String, required: true },
  rating: { type: String, required: true },
  images: { type: Array, required: true },
  create: { type: Date, default: Date.now },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
