const {BadRequest} = require("http-errors")
const {User} = require("../../model")

const updateUserBalance = async (req, res) => {
  const balance = Number(req.body.balance)

  if (Number.isNaN(balance)) {
    throw new BadRequest("Введите сумму в числовом формате")
  }

  const {_id, email, name} = req.user
  await User.findByIdAndUpdate(_id, {balance})

  res.json({
    status: "success",
    code: 200,
    message: "Balance updated",
    user: {
      _id,
      name,
      email,
      balance
    }
  })
}

module.exports = updateUserBalance
