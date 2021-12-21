const {Income, User} = require("../../model/index")
const moment = require("moment")

const postIncome = async (req, res, next) => {
  const {_id, balance} = req.user
  const {date, sum} = req.body
  const updateBalance = balance + Number(sum)
  await User.findByIdAndUpdate(_id, {balance: updateBalance})
  let year
  let month
  if (date) {
    month = moment(Number(date)).format("MM")
    year = moment(Number(date)).format("YYYY")
  }
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
