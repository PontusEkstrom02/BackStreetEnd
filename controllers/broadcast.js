const SocketService = require("../service/socketService.js");
const dotenv = require('dotenv');
const env = dotenv.config();

if(process.env.MONGO_URI == undefined) {
  console.log("[WARN] - no jwt key found, perhaps you are missing the env file?");
}

/*6.[GET] - http://adress:port/ducks/api/broadcast/
hämtar en lista över alla händelser som har skickats ut, ex. älgvandring, traffikolycker m.m.*/
const GetBroadcast = async (req, res) => {

  const channel = await Channel.findOne({
    _id: "broadcast",
  });

  if (!channel) {
    req.body.createdBy = "ADMIN";
    const channel = await Channel.create(req.body);
    res.status(StatusCodes.CREATED).json({ channel });
  }

  res.status(StatusCodes.OK).json({ channel });
};

/*7. [POST] - http://adress:port/ducks/api/broadcast/
skapar en ny nödhändelse. Detta anrop ska kräva ett giltigt JWT token.*/
const CreateBroadcastPost = async (req, res) => {
  
  try{
    jwt.verify(token, process.env.MONGO_URI);
  }catch(err){
    console.log(err)
  }
};


module.exports = {
    GetBroadcast,
    CreateBroadcastPost,
};
  