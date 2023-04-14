//Skapa en chatt
const CreateChannel = async (req, res) => {
  // const task = await Chat.create(req.body);
  // res.status(200).json({ chat });
  res.json(req.user);
  res.json(req.body);
};

//Hämta alla chattar
const GetAllChannels = async (req, res) => {
  // const chat = await Chat.find({});
  // res.status(200).json({ chat });
  res.send("get all chats");
};
//Posta i en chatt?
const PostInChannel = async (req, res) => {
  // const { id: ChatID } = req.params;
  // const chat = await Chat.findOneAndUpdate({ _id: ChatID }, req.body, {
  //   new: true,
  //   runValidators: true,
  // });
  // res.status(200).json({ chat });
  res.send("Post a message in chat");
};

//Radera en chatt
const DeleteChannel = async (req, res) => {
  // const { id: ChatID } = req.params;
  // const chat = await Chat.findOneAndDelete({ _id: ChatID });
  // res.status(200).json({ chat });
  res.send("Delete chat");
};

module.exports = {
  CreateChannel,
  GetAllChannels,
  PostInChannel,
  DeleteChannel,
};
