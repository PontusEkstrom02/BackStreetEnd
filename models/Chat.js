const mongoose = require("mongoose");

//Detta är bara ett exempel, egentligen en task från vår Task upg.
const ChatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [100, "A chatmessage must be shorter then 100 characters"],
  },
});

module.exports = mongoose.model("Chat", ChatSchema);
