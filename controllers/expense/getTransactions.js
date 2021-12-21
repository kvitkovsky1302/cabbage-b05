const {Expense} = require("../../model/index")

const getTransactions = async (req, res) => {
  const {month, year, category} = req.query
  const {_id} = req.user
  const filter = {owner: _id}
  if (month) {
    filter.month = month
  }
  if (year) {
    filter.year = year
  }
  if (category) {
    filter.category = category
  }
  const data = await Expense.find(
    filter,
    "name category description sum year month"
  ).populate("owner", "email _id")

  const totalSum = data.reduce((acc, {sum}) => acc + sum, 0)
  res.status(200).json({status: "success", totalSum, data})
}
module.exports = getTransactions
