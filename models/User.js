const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); //bibliotek för att hasha
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 50,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
    },
    role: {
      type: String,
      required: [true],
      default: "USER",
    },
    /*
    picture: {
      type: String,
      required: true,
      default:
        "https://icons.iconarchive.com/icons/thesquid.ink/free-flat-sample/512/rubber-duck-icon.png",
    },
    */
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

UserSchema.methods.comparePassword = async function (incomingPassword) {
  const comparedPasswords = await bcrypt.compare(
    incomingPassword,
    this.password
  );
  return comparedPasswords;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
