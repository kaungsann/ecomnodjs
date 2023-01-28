const mongoose = require("mongoose");

const { Schema } = mongoose;

const childSchema = new Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  subCategoryId: [
    { type: Schema.Types.ObjectId, required: true, ref: "subcat" },
  ],
  create: { type: Date, default: Date.now },
});

const childCategory = mongoose.model("childcat", childSchema);

module.exports = childCategory;
