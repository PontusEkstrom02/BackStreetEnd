const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [100, "A chatmessage must be shorter then 100 characters"],
  },
});

module.exports = mongoose.model("Channel", ChannelSchema);
