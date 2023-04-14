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
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    //Vi kan använda denna för att visa chanells med nyast meddelandena först/högt upp
    latestMessage: {
      type: mongoose.Types.ObjectId,
      ref: "Message",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "pls provide user"], //Tror inte vi behöver denna rad
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Channel", ChannelSchema);
