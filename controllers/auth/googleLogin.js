const queryString = require("query-string")
const axios = require("axios")
const {User} = require("../../model/index")
const uuid = require("crypto").randomUUID()
const jwt = require("jsonwebtoken")
const {
  SECRET_KEY,
  GOOGLE_CLIENT_ID,
  BASE_URL,
  GOOGLE_CLIENT_SECRET,
  FRONTEND_URL
} = process.env

const googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${BASE_URL}/auth/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile"
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent"
  })
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  )
}
const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`
  const urlObj = new URL(fullUrl)
  const urlParams = queryString.parse(urlObj.search)
  const code = urlParams.code
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}/auth/google-redirect`,
      grant_type: "authorization_code",
      code
    }
  })
  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`
    }
  })

  const email = userData.data.email
  const avatarUrl = userData.data.picture
  const name = userData.data.name
  const user = await User.findOne({email})
  let token
  let id
  let balance
  if (user) {
    const payload = {id: user._id}
    token = jwt.sign(payload, SECRET_KEY, {expiresIn: "12h"})
    await User.findByIdAndUpdate(user._id, {
      token
    })
    id = user._id
    balance = user.balance
  } else {
    const newUser = new User({email, avatarUrl, name})
    newUser.setPassword(uuid)
    const newUserWith = await newUser.save()
    const payload = {id: newUserWith._id}
    token = jwt.sign(payload, SECRET_KEY, {expiresIn: "12h"})
    await User.findByIdAndUpdate(newUserWith._id, {
      token
    })
    id = newUserWith._id
    balance = newUserWith.balance
  }

  return res.redirect(
    `${FRONTEND_URL}?token=${token}&_id=${id}&email=${email}&name=${name}&avatarUrl=${avatarUrl}&balance=${balance}`
  )
}
module.exports = {googleAuth, googleRedirect}

//= ============получение параметров из строки=============//

// const searchParams = new URLSearchParams(document.location.search)
// for (const pair of searchParams.entries()) {
//   console.log(pair[0] + "," + pair[1])
// }

//= ==================или======================//

// const query = String(window.location.href).split("?")[1]
// const queryObj = queryString.parse(query)
// console.log(queryObj)
