import express from "express";
import connect from "./db/connect";
const app = express();

//Middleware
app.use(express.static("./public")); //gör mappen public till static.
app.use(express.json()); //säger att vi använder json i express,

const port = process.env.PORT || 3000; // Port number to listen on

const start = async () => {
  try {
    app.listen(port, console.log(`Det funkar vi lyssnar på ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
