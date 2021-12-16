const {Expense, User} = require("../../model/index")
const mongoose = require("mongoose")
const {BadRequest, Unauthorized, NotFound} = require("http-errors")

const deleteTransaction = async (req, res) => {
  const {transactionId} = req.params
  const {_id, balance} = req.user
  if (!mongoose.Types.ObjectId.isValid(transactionId)) {
    throw new BadRequest("Не валидный id")
  }
  const result = await Expense.findById(transactionId)
  if (!result) {
    throw new NotFound("Транзакция удалена или не существует")
  }
  if (result.owner.valueOf() !== _id.valueOf()) {
    throw new Unauthorized(`Доступ запрещен`)
  }
  const updateBalance = balance + Number(result.price)
  await User.findByIdAndUpdate(_id, {balance: updateBalance})
  await Expense.findByIdAndDelete(transactionId)
  res.status(200).json({status: "success", balance: updateBalance})
}
module.exports = deleteTransaction
