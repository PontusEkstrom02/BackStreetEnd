const express = require("express");
const router = express.Router();

const { SendMessage } = require("../controllers/message");

router.route("/:id").post(SendMessage);

module.exports = router;
