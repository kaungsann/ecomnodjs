const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: "user", required: true },
  to: { type: Schema.Types.ObjectId, ref: "user", required: true },
  type: { type: String, enum: ["text", "image"], default: "text" },
  message: { type: String, required: true },
  create: { type: Date, default: Date.now },
});

const Message = mongoose.model("message", messageSchema);

module.exports = Message;
