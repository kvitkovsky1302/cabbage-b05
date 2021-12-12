const {Expense} = require("../../model/index")

const postTransaction = async (req, res, next) => {
  const {_id} = req.user
  const addedTransaction = await Expense.create({...req.body, owner: _id})
  res.status(201).json({status: "success", data: addedTransaction})
}
module.exports = postTransaction
