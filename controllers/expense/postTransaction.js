const {Expense, User} = require("../../model/index")

const moment = require("moment")

const postTransaction = async (req, res, next) => {
  const {_id, balance} = req.user
  const {date, price} = req.body
  const updateBalance = balance - Number(price)
  await User.findByIdAndUpdate(_id, {balance: updateBalance})
  let year
  let month
  if (date) {
    month = moment(Number(date)).format("MMMM")
    year = moment(Number(date)).format("YYYY")
  }
  const addedTransaction = await Expense.create({
    ...req.body,
    year,
    month,
    owner: _id
  })
  res
    .status(201)
    .json({status: "success", data: addedTransaction, balance: updateBalance})
}
module.exports = postTransaction
