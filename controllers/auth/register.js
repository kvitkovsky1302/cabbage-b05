const {Conflict} = require("http-errors")
const gravatar = require("gravatar")
require("dotenv").config()
const {User} = require("../../model/index")

const register = async (req, res) => {
  const {email, password} = req.body
  const avatarUrl = gravatar.url(email, {s: "250", r: "x", d: "robohash"})
  const result = await User.findOne({email})
  if (result) {
    throw new Conflict(`Эта почта ${email} уже используется`)
  }
  const newUser = new User({email, avatarUrl})
  newUser.setPassword(password)
  await newUser.save()
  res.status(201).json({
    status: "success",
    user: newUser
  })
}

module.exports = register
