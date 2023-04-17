const Channel = require("../models/Channel.js");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const GetAllChannels = async (req, res) => {
  const channels = await Channel.find({}).sort("CreatedAt");
  res.status(StatusCodes.OK).json({ channels });
};

// const GetThisChannel = async (req, res) => {
//   const {
//     params: { id: channelId },
//   } = req;

//   const channel = await Channel.findOne({
//     _id: channelId,
//   });

//   if (!channel) {
//     throw new NotFoundError(`No channel with that id: ${channelId}`);
//   }

//   res.status(StatusCodes.OK).json({ channel });
// };

const CreateChannel = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const channel = await Channel.create(req.body);
  res.status(StatusCodes.CREATED).json({ channel });
};

const DeleteChannel = async (req, res) => {
  const {
    params: { id: channelId },
  } = req;

  const channel = await Channel.findByIdAndRemove({ _id: channelId });

  if (!channel) {
    throw new NotFoundError(`No channel with that id: ${channelId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  CreateChannel,
  GetAllChannels,
  DeleteChannel,
};
