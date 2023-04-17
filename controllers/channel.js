const Channel = require("../models/Channel.js");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const express = require('express');
const { createServer } = require('http');
const SocketService = require('../service/socketService.js');

const app = express();
const httpServer = createServer(app);

app.use(express.json());

SocketService.attach(httpServer);

const GetAllChannels = async (req, res) => {
  const channels = await Channel.find({}).sort("CreatedAt");
  res.status(StatusCodes.OK).json({ channels });
};

//I meddelande-modellen skickar jag in meddelanden till kanalen, inte där än
const GetThisChannel = async (req, res) => {
  const {
    params: { id: channelId },
  } = req;

  const channel = await Channel.findOne({
    _id: channelId,
  });

  if (!channel) {
    throw new NotFoundError(`No channel with that id: ${channelId}`);
  }

  res.status(StatusCodes.OK).json({ channel });
};

const CreateChannel = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const channel = await Channel.create(req.body);
  res.status(StatusCodes.CREATED).json({ channel });
};

 const PostInChannel = async (req, res) => {
    const {
      params: { id: channelId },
    } = req;

    const channel = await Channel.findOne({
      _id: channelId,
    });

    if (!channel) {
      throw new NotFoundError(`No channel with that id: ${channelId}`);
    }

    SocketService.broadcast("public", "request.params.msg")
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
  PostInChannel,
  DeleteChannel,
  GetThisChannel,
};
