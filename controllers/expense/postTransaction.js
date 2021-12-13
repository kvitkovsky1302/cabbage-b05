const {Expense} = require("../../model/index")
const moment = require("moment")

const postTransaction = async (req, res, next) => {
  const {_id} = req.user
  const month = moment(Number(req.body.date)).format("MMMM")
  const year = moment(Number(req.body.date)).format("YYYY")
  const addedTransaction = await Expense.create({
    ...req.body,
    year,
    month,
    owner: _id
  })
  res.status(201).json({status: "success", data: addedTransaction})
}
module.exports = postTransaction
