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
    filter.name = category
  }
  const data = await Expense.find(
    filter,
    "name description price year month"
  ).populate("owner", "email _id")

  const totalPrice = data.reduce((acc, {price}) => acc + price, 0)
  res.status(200).json({status: "success", totalPrice, data})
}
module.exports = getTransactions
