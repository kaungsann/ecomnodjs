const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, requried: true, unique: true },
  image: { type: String, requried: true },
  subcategory: [{ type: Schema.Types.ObjectId, ref: "subcat" }],
  create: { type: Date, default: Date.now },
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
