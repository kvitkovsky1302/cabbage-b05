const {Schema, model} = require("mongoose")
const moment = require("moment")
// moment.locale("ru")

const incomeSchema = Schema(
  {
    category: {
      type: String,
      required: [true, "Укажите категорию дохода"]
    },
    description: {
      type: String,
      required: [true, "Введите описание дохода"]
    },
    sum: {
      type: Number,
      required: [true, "Введите сумму дохода"]
    },
    date: {
      type: Number,
      required: [true, "Введите дату транзакции"],
      default: moment().valueOf()
    },
    year: {
      type: String,
      default: moment().format("YYYY")
    },
    month: {
      type: String,
      default: moment().format("MMMM")
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  },
  {versionKey: false, timestamps: true}
)

const Income = model("incomes", incomeSchema)

module.exports = Income
