//Skapa en chatt
const CreateChat = async (req, res) => {
  // const task = await Chat.create(req.body);
  // res.status(200).json({ chat });
  res.send("create chat");
};

//Hämta alla chattar
const GetAllChats = async (req, res) => {
  // const chat = await Chat.find({});
  // res.status(200).json({ chat });
  res.send("get all chats");
};
//Posta i en chatt?
const PostInChat = async (req, res) => {
  // const { id: ChatID } = req.params;
  // const chat = await Chat.findOneAndUpdate({ _id: ChatID }, req.body, {
  //   new: true,
  //   runValidators: true,
  // });
  // res.status(200).json({ chat });
  res.send("Post a message in chat");
};

//Radera en chatt
const DeleteChat = async (req, res) => {
  // const { id: ChatID } = req.params;
  // const chat = await Chat.findOneAndDelete({ _id: ChatID });
  // res.status(200).json({ chat });
  res.send("Delete chat");
};

module.exports = { CreateChat, GetAllChats, PostInChat, DeleteChat };
