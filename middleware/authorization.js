const { STATUS_CODES } = require("http");
const { StatusCodes } = require("http-status-codes");

const authPage = (Permissions) => {
  return (req, res, next) => {
    const isAdmin = req.user.isAdmin;
    if (isAdmin == true) {
      next();
    } else {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json("You dont have access to send messages to this route");
    }
  };
};

module.exports = { authPage };
