const {checkSchema} = require("express-validator")

const validationRulesPostTransaction = checkSchema({
  name: {
    in: ["body"],
    notEmpty: true,
    trim: true,
    isString: true,
    errorMessage: "Укажите категорию расхода.",
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
    errorMessage: "Введите описание расхода.",
    bail: true,
    isLength: {
      options: {max: 50},
      errorMessage: "Длинна описания должна быть не более 50 символов."
    }
  },
  price: {
    in: ["body"],
    notEmpty: true,
    trim: true,
    isNumeric: true,
    errorMessage: "Введите сумму расхода.",
    bail: true,
    matches: {
      options: ["^\\d+[.]\\d{2}$"],
      errorMessage: "Введите сумму в формате 0.00"
    }
  },
  date: {
    in: ["body"],
    notEmpty: true,
    trim: true,
    isNumeric: true,
    errorMessage: "Введите дату."
  }
})

module.exports = {
  validationRulesPostTransaction
}
