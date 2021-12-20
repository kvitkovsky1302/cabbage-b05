const {User} = require("../../model/index")

const getUser = async (req, res) => {
  const {token} = req.user
  const user = await User.findOne({token})
  res.status(200).json({
    status: "success",
    user
  })
}
module.exports = getUser
