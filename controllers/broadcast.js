const SocketService = require("../service/socketService.js");
const Channel = require("../models/Channel.js");
//643d4fde35c69db1508a18ae

/*6.[GET] - http://adress:port/ducks/api/broadcast/
hämtar en lista över alla händelser som har skickats ut, ex. älgvandring, traffikolycker m.m.*/
const GetBroadcast = async (req, res) => {
  res.json(req.body);
  // const channel = await Channel.findOne({ _id:'643d4fde35c69db1508a18ae'
  // });
  // res.status(StatusCodes.OK).json({ channel });
};

/*7. [POST] - http://adress:port/ducks/api/broadcast/
skapar en ny nödhändelse. Detta anrop ska kräva ett giltigt JWT token.*/
const CreateBroadcastPost = async (req, res) => {};

module.exports = {
  GetBroadcast,
  CreateBroadcastPost,
};
