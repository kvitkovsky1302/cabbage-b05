const register = require("./register")
const login = require("./login")
const logout = require("./logout")
const getUser = require("./getUser")
const patchUserAvatar = require("./patchUserAvatar")
const updateUserBalance = require("./updateUserBalance")
const {googleAuth, googleRedirect} = require("./googleLogin")
const googleAuthWithReact = require("./googleLogin-withReact")
module.exports = {
  register,
  login,
  logout,
  getUser,
  patchUserAvatar,
  updateUserBalance,
  googleRedirect,
  googleAuth,
  googleAuthWithReact
}
