const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    channel: { type: mongoose.Types.ObjectId, ref: "Channel" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
