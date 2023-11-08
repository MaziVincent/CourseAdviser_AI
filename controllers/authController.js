const User = require("../models/User");

const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../services/generateToken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  //check if there is email and password
  if (!email || !password)
    return res.status(400).json({ message: "email and password required" });
  //check if user exist
  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) return res.sendStatus(401); //unauthorized
  //check password validity

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) {
    return res.sendStatus(401); //unAuthorised
  }

  const roles = Object.values(foundUser.roles);
  //create jwt
  const accessToken = generateAccessToken(foundUser.email, roles);
  const refreshToken = generateRefreshToken(foundUser.email);

  foundUser.refreshToken = refreshToken;
  const result = await foundUser.save();

  console.log(result);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
};

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  //check if there is a cookie called refreshToken
  if (!cookies.refreshToken) return res.sendStatus(204); //No content

  const refreshToken = cookies.refreshToken;
  //check if user exist
  const foundUser = User.findOne({ email: email }).exec();
  if (!foundUser) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.sendStatus(204); //No Content
  }

  //Delete from DB
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.sendStatus(204); //No Content
};

module.exports = { handleLogin, handleLogout };
