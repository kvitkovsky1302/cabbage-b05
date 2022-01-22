const {Expense} = require("../../model/index")
const moment = require("moment")

moment.updateLocale("ru", {
  months: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
  ]
})

const getTransactions = async (req, res) => {
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
    result.forEach(async ({month, year}) => {
      uniqueMonths.add(`${year}.${month}`)
    })
    data = [...uniqueMonths]
      .sort((a, b) => b - a)
      .map(value => {
        const resultForMonth = result.filter(
          ({month, year}) => value === `${year}.${month}`
        )
        const month = moment(resultForMonth[0].date).format("MMMM")
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

module.exports = getTransactions
