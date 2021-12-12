const {Schema, model} = require("mongoose")
const moment = require("moment")
moment.locale("ru")

const expenseSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Укажите категорию расхода"]
    },
    description: {
      type: String,
      required: [true, "Введите описание расхода"]
    },
    price: {
      type: Number,
      required: [true, "Введите сумму расхода"]
    },
    date: {
      type: String,
      required: [true, "Введите дату покупки"]
    },
    year: {
      type: String,
      default: moment().format("YYYY")
    },
    month: {
      type: String,
      default: moment().format("MMMM")
    },
    day: {
      type: String,
      default: moment().format("DD")
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
