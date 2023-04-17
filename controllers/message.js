const Message = require("../models/Message.js");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const broadcastChannelId = "643d4fde35c69db1508a18ae";

const createMessage = async (req, res) => {
  const {
    user: { userId },
    params: { id: channelId },
  } = req;

  const { content } = req.body;

  if (!content) {
    throw new BadRequestError("pls provide content to your message");
  }

  let newMessage = {
    sendedBy: userId,
    content: content,
    channel: channelId,
  };

  try {
    let message = await Message.create(newMessage);
    message = await message.populate("sendedBy", "name");
    res.status(StatusCodes.CREATED).json({ message });
    console.log(message);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new BadRequestError(
      "Något gick fel i ditt försök att skicka ett meddelande"
    );
  }
};

const getAllMessages = async (req, res) => {
  const messages = await Message.find({ channel: req.params.id })
    .populate("sendedBy", "name")
    .populate("channel", "channelName");

  res.status(StatusCodes.OK).json({ messages });
};

const getAllMessagesInBroadcast = async (req, res) => {
  const messages = await Message.find({ channel: broadcastChannelId })
    .populate("sendedBy", "name")
    .populate("channel", "channelName");

  res.status(StatusCodes.OK).json({ messages });
};

module.exports = {
  getAllMessagesInBroadcast,
  createMessage,
  getAllMessages,
};
