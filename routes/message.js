const express = require("express");
const router = express.Router();

const { createMessage, getAllMessages } = require("../controllers/message");

router.route("/:id").get(getAllMessages);
router.route("/:id").post(createMessage);

module.exports = router;
