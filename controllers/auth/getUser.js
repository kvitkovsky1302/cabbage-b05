const {User} = require("../../model/index")

const getUser = async (req, res) => {
  const user = await User.findById(req.user._id)
  res.status(200).json({
    status: "success",
    user
  })
}
module.exports = getUser
