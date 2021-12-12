const {BadRequest} = require("http-errors")

const {User} = require("../../model")

const updateUserBalance = async (req, res) => {
  const balance = Number(req.body.balance)

  if (Number.isNaN(balance)) {
    throw new BadRequest()
  }

  const {_id, email} = req.user
  await User.findByIdAndUpdate(_id, {balance})

  res.json({
    status: "success",
    code: 200,
    message: "Balance updated",
    user: {
      _id,
      email,
      balance
    }
  })
}

module.exports = updateUserBalance
