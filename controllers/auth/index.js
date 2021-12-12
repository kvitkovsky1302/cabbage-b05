const register = require("./register")
const login = require("./login")
const logout = require("./logout")
const getUser = require("./getUser")
const patchUserAvatar = require("./patchUserAvatar")
const updateUserBalance = require("./updateUserBalance")

module.exports = {
  register,
  login,
  logout,
  getUser,
  patchUserAvatar,
  updateUserBalance
}
