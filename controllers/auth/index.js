const register = require("./register")
const login = require("./login")
const logout = require("./logout")
const getUser = require("./getUser")
const patchUserAvatar = require("./patchUserAvatar")
const updateUserBalance = require("./updateUserBalance")
const {googleAuth, googleRedirect} = require("./googleLogin")
module.exports = {
  register,
  login,
  logout,
  getUser,
  patchUserAvatar,
  updateUserBalance,
  googleRedirect,
  googleAuth
}
