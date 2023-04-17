const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    sendedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: { type: String, trim: true },
    channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channel" },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
