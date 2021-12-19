const {Income, User} = require("../../model/index")

const moment = require("moment")

const postIncome = async (req, res, next) => {
  const {_id, price} = req.user
  const updateBalance = price + Number(req.body.sum)

  await User.findByIdAndUpdate(_id, {balance: updateBalance})
  const month = moment(Number(req.body.date)).format("MMMM")
  const year = moment(Number(req.body.date)).format("YYYY")
  const addedTransaction = await Income.create({
    ...req.body,
    year,
    month,
    owner: _id
  })
  res
    .status(201)
    .json({status: "success", data: addedTransaction, balance: updateBalance})
}
module.exports = postIncome
