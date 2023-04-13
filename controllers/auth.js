const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { STATUS_CODES } = require("http");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  //Checking if user have provided email and password
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  //Chech if user exist in database by checking for uniqe emailadress
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError(
      "Invalid Credentials; your email is not conected to any of our users, pls register."
    );
  }

  //Om användaren finns, jämför det givna lösenordet med det i databasen.
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError(
      "Invalid Credentials; your password is wrong, pls provide the correct one."
    );
  }

  //Kommer vi förbi if ovan vill vi skapa ett token dvs om den användaren är registrerad i vår databas.
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
