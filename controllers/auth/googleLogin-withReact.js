const {OAuth2Client} = require("google-auth-library")
const uuid = require("crypto").randomUUID()
const {GOOGLE_CLIENT_ID, SECRET_KEY} = process.env
const jwt = require("jsonwebtoken")
const {User} = require("../../model/index")

const googleAuthWithReact = async (req, res) => {
  const client = new OAuth2Client(GOOGLE_CLIENT_ID)
  const {tokenId} = req.body
  const ticket = await client.verifyIdToken({
    idToken: tokenId,
    audience: GOOGLE_CLIENT_ID
  })
  const {name, email, picture} = ticket.getPayload()
  const user = await User.findOne({email})
  if (user) {
    const payload = {id: user._id}
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "12h"})
    const userWithToken = await User.findByIdAndUpdate(
      user._id,
      {
        token
      },
      {new: true}
    )
    console.log("userWithToken", userWithToken)
    res.status(200).json({
      status: "success",
      user: userWithToken
    })
  } else {
    const newUser = new User({email, avatarUrl: picture, name})
    newUser.setPassword(uuid)
    const newUserWith = await newUser.save()
    const payload = {id: newUserWith._id}
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "12h"})
    const newUserWithToken = await User.findByIdAndUpdate(
      newUserWith._id,
      {
        token
      },
      {new: true}
    )
    res.status(201).json({
      status: "success",
      user: newUserWithToken
    })
  }
}
module.exports = googleAuthWithReact
