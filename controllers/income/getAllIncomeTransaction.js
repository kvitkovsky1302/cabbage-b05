const moment = require("moment")

const {Income} = require("../../model")

const getAllIncomeTransaction = async (req, res) => {
  const {date} = req.query
  const {_id} = req.user
  const month = moment(Number(date)).format("MMMM")

  const monthTransactions = await Income.find({owner: _id, month})
  return res.json({
    status: "success",
    code: 200,
    message: "Transactions found",
    data: {
      monthTransactions
    }
  })
}

module.exports = getAllIncomeTransaction
