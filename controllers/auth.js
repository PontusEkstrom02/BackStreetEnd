const User = require("../models/User");
// const { StatusCodes } = require("http-status-codes");
// const { BadRequestError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(201).json({ user });
};

const login = async (req, res) => {
  res.send("log in user");
};

module.exports = { register, login };
