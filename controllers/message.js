const Message = require("../models/Message.js");
const Channel = require("../models/Channel.js");
const User = require("../models/User.js");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const broadcastChannelId = "643d4fde35c69db1508a18ae";

const createMessage = async (req, res) => {
  const {
    user: { userId, name },
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
    res.status(400);
    throw new Error(error.message);
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

const createMessageInBroadcast = async (req, res) => {
  if (req.user.role == "ADMIN"){
    const {
      user: { userId, name },
      params: { id: broadcastChannelId },
    } = req;
  
    const { content } = req.body;
  
    if (!content) {
      throw new BadRequestError("pls provide content to your message");
    }
  
    let newMessage = {
      sendedBy: userId,
      content: content,
      channel: broadcastChannelId,
    };
  
    try {
      let message = await Message.create(newMessage);
      message = await message.populate("sendedBy", "name");
      res.status(StatusCodes.CREATED).json({ message });
      console.log(message);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }else{
    res.send("u no admin");
  }
  
};

//DENNA FUNKAR
//   const {
//     user: {userId},
//     params: { id: channelId },
//   } = req;

//   const messages = await Message.find({}).populate("sendedBy", "name");
//   res.status(StatusCodes.OK).json({ messages });

module.exports = {
  getAllMessagesInBroadcast,
  createMessageInBroadcast,
  createMessage,
  getAllMessages,
};
