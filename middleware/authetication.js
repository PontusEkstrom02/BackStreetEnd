const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

//middleware
const auth = async (req, res, next) => {
  //check for header and Bearer ("startsWith" är en inbyggd javascript method)
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid Bearer");
  }

  const token = authHeader.split(" ")[1]; //Vi splittar headern, vi får en lista och väljer ut den the second value, som är the Token.

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //attach the user to chatsRoute
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
