const Message = require("../models/Message.js");
const User = require("../models/User");
const Channel = require("../models/Channel.js");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const SendMessage = async (req, res) => {
  const { content } = req.body;
  const {
    params: { id: channelId },
  } = req;

  if (!content || !channelId) {
    throw new NotFoundError(`No content or chatId in request`);
  }

  const newMessage = {
    sender: req.userId,
    content: content,
    channel: channelId,
  };

  try {
    let message = await Message.create(newMessage);
    message = message.populate("sender", "name");
    message = message.populate("channel");
    message = await User.populate(message, {
      path: "channel.users",
      select: "name email",
    });

    await Channel.findByIdAndUpdate(req.body.channelId, {
      latestMessage: message,
    });

    res.status(StatusCodes.CREATED).json({ message });
  } catch (error) {
    console.log(error);
    throw new BadRequestError(`Bad request, something went wrong`);
  }
};

module.exports = {
  SendMessage,
};
