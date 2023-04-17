const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema(
  {
    channelName: {
      type: String,
      required: [true, "must provide name for the channel"],
      trim: true,
      maxlength: [50, "Pls provide a shorter name for the chat"],
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Channel = mongoose.model("Channel", ChannelSchema);
module.exports = Channel;
