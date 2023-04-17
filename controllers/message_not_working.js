const asyncHandler = require("express-async-handler");
const Message = require("../models/Message.js");
const User = require("../models/User.js");
const Channel = require("../models/Channel.js");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/index.js");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, channelId } = req.body;

  if (!content || !channelId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: channelId,
  };

  try {
    let message = await Message.create(newMessage);

    message = await message.populate("sender", "name").execPopulate();
    message = await message.populate("channel").execPopulate();
    message = await User.populate(message, {
      path: "channel.users",
      select: "name email",
    });

    await Channel.findByIdAndUpdate(req.body.channelId, {
      latestMessage: message,
    });

    res.json(message);
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  sendMessage,
};
