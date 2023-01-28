const mongoose = require("mongoose");

const { Schema } = mongoose;

const subCatSchema = new Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, required: true, ref: "category" },
  childcategoryId: [{ type: Schema.Types.ObjectId, ref: "childcat" }],
  create: { type: Date, default: Date.now },
});

const SubCategory = mongoose.model("subcat", subCatSchema);

module.exports = SubCategory;
