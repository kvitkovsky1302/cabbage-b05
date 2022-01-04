const {Expense} = require("../../model/index")
const moment = require("moment")

const getMonthExpenseTotal = async (req, res) => {
  const {month, year, category, yearSummary} = req.query
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
  let data
  let totalSum

  const uniqueMonths = new Set()

  if (yearSummary) {
    const result = await Expense.find(filter).populate("owner", "email _id")
    result.forEach(async ({month}) => {
      uniqueMonths.add(month)
    })
    console.log("uniqueMonths", uniqueMonths)
    data = [...uniqueMonths].map(value => {
      const resultForMonth = result.filter(({month}) => value === month)
      const month = moment(resultForMonth[0].date).format("MMMM")
      // const month = resultForMonth[0].month
      const owner = resultForMonth[0].owner
      const sum = resultForMonth.reduce((acc, {sum}) => sum + acc, 0)
      return {month, sum, owner}
    })
  } else {
    data = await Expense.find(filter).populate("owner", "email _id")
    totalSum = data.reduce((acc, {sum}) => acc + sum, 0)
  }
  res.status(200).json({status: "success", totalSum, data})
}

module.exports = getMonthExpenseTotal
