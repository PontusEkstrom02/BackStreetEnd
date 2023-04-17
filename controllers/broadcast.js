const Message = require("../models/Message.js");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
//643d4fde35c69db1508a18ae

const GetBroadcast = async (req, res) => {
  const broadcastId = "643d4fde35c69db1508a18ae";
  const broadcastMessages = await Message.find({ channel: broadcastId })
    .populate("sendedBy", "name")
    .populate("channel", "channelName");
  res.status(StatusCodes.OK).json({ broadcastMessages });
};

const CreateBroadcastPost = async (req, res) => {
  if (req.user.isAdmin === true) {
    const {
      user: { userId },
    } = req;
    const { content, channelId } = req.body;

    if (!content || !channelId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("Pls provide a message and a channelId");
    }

    let newMessage = {
      sendedBy: userId,
      content: content,
      channel: channelId,
    };

    try {
      let message = await Message.create(newMessage);
      res.status(StatusCodes.CREATED).json({ message });
    } catch (error) {
      res.status(400).json("something went wrong");
    }
  } else {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json("You are not authorized to send messages in the BroadCastpage");
  }
};

module.exports = {
  GetBroadcast,
  CreateBroadcastPost,
};
