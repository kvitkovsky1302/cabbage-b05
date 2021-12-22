const {Income} = require("../../model")

const getIncomeTransaction = async (req, res) => {
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

  const data = await Income.find(
    filter,
    "category description sum year month"
  ).populate("owner", "email _id")
  const totalIncome = data.reduce((acc, {sum}) => acc + sum, 0)
  res.status(200).json({
    status: "success",
    totalIncome,
    data
  })
}

module.exports = getIncomeTransaction
