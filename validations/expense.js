const {checkSchema} = require("express-validator")

const validationRulesPostTransaction = checkSchema({
  category: {
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
  sum: {
    in: ["body"],
    notEmpty: true,
    trim: true,
    errorMessage: "Введите сумму расхода",
    bail: true,
    isNumeric: {
      args: true,
      errorMessage: "Введите сумму в числовом формате",
      bail: true
    },
    matches: {
      options: ["^\\d+[.]?\\d{0,2}$"],
      errorMessage: "Введите сумму в формате 0 или 0.0 или 0.00"
    }
  },
  date: {
    in: ["body"],
    if: {options: value => value},
    trim: true,
    isNumeric: {
      args: true,
      errorMessage: "Введите дату покупки в числовом формате",
      bail: true
    },
    matches: {
      options: ["^\\d{13}$"],
      errorMessage:
        "Введите дату покупки в милисекундах с начала эпохи захвата мира SKYNET"
    }
  }
})

module.exports = {
  validationRulesPostTransaction
}
