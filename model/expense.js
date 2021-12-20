const {Schema, model} = require("mongoose")
const moment = require("moment")

const expenseSchema = Schema(
  {
    category: {
      type: String,
      required: [true, "Укажите категорию расхода"]
    },
    description: {
      type: String,
      required: [true, "Введите описание расхода"]
    },
    sum: {
      type: Number,
      required: [true, "Введите сумму расхода"]
    },
    date: {
      type: Number,
      required: [true, "Введите дату покупки"],
      default: moment().valueOf()
    },
    year: {
      type: String,
      default: moment().format("YYYY")
    },
    month: {
      type: String,
      default: moment().format("MM")
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  },
  {versionKey: false, timestamps: true}
)

const Expense = model("expenses", expenseSchema)

module.exports = Expense
