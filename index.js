require("dotenv").config();
const express = require("express");
const app = express();

//connectDB
const connectDB = require("./db/connect");

//routers
const authRouter = require("./routes/auth");
const chatsRouter = require("./routes/chats");

//middleware
app.use(express.static("./public")); //gör mappen public till static.
app.use(express.json()); //säger att vi använder json i express,

//testing
app.get("/home", (req, res) => {
  res.send("Chatapp!");
});

//urls
app.use("/chattapp/auth", authRouter);
app.use("/chattapp/chats", chatsRouter);

//server
const port = process.env.PORT || 3000; // Port number to listen on

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Det funkar vi lyssnar på ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
