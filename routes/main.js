const express = require("express");
const router = express.Router();
const {
  CreateChat,
  GetAllChats,
  PostInChat,
  DeleteChat,
} = require("../controllers/chat");

router.route("/").post(CreateChat);
router.route("/").get(GetAllChats);
router.route("/:id").patch(PostInChat);
router.route("/:id").delete(DeleteChat);
