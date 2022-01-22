const {User} = require("../../model/index")

const logout = async (req, res) => {
  const {_id} = req.user
  await User.findByIdAndUpdate(_id, {
    token: null
  })
  res.status(204).json({status: "success"})
}

module.exports = logout
