const {checkSchema} = require("express-validator")

const validationRulesPostIncome = checkSchema({
  name: {
    in: ["body"],
    notEmpty: true,
    trim: true,
    isString: true,
    errorMessage: "Укажите категорию дохода.",
    bail: true,
    isLength: {
      options: {max: 25},
      errorMessage: "Превышен лимит. Максимальная длинна категории 25 символов."
    }
  },
  description: {
    in: ["body"],
    notEmpty: true,
    trim: true,
    isString: true,
    errorMessage: "Введите описание дохода.",
    bail: true,
    isLength: {
      options: {max: 50},
      errorMessage: "Длинна описания должна быть не более 50 символов."
    }
  },
  sum: {
    in: ["body"],
    notEmpty: true,
    trim: true,
    errorMessage: "Введите сумму дохода",
    bail: true,
    isNumeric: {
      args: true,
      errorMessage: "Введите сумму дохода в числовом формате",
      bail: true
    },
    matches: {
      options: ["^\\d+[.]?\\d{0,2}$"],
      errorMessage: "Введите сумму дохода в формате 0 или 0.0 или 0.00"
    }
  },
  date: {
    in: ["body"],
    notEmpty: true,
    trim: true,
    errorMessage: "Введите дату получения дохода",
    bail: true,
    isNumeric: {
      args: true,
      errorMessage:
        "Введите дату получения дохода в числовом формате в милисекундах "
    }
  }
})

module.exports = {
  validationRulesPostIncome
}
