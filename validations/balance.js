const {checkSchema} = require("express-validator")

const validationRulesUpdateBalance = checkSchema({
  balance: {
    in: ["body"],
    notEmpty: true,
    trim: true,
    errorMessage: "Введите начальное значение баланса",
    bail: true,
    isNumeric: {
      args: true,
      errorMessage: "Введите баланс в числовом формате",
      bail: true
    },
    matches: {
      options: ["^\\d+[.]?\\d{0,2}$"],
      errorMessage: "Введите баланс в формате 0 или 0.0 или 0.00"
    }
  }
})

module.exports = {validationRulesUpdateBalance}
