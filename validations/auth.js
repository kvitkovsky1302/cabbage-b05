const {checkSchema} = require("express-validator")

const validationRulesPostAuth = checkSchema({
  name: {
    in: ["body"],
    trim: true,
    isString: true,
    isLength: {min: 3, max: 20},
    errorMessage: "Пожалуйста введите имя, не менее 3 символов и не более 20",
    bail: true
  },
  password: {
    in: ["body"],
    trim: true,
    notEmpty: true,
    isLength: {min: 6, max: 12},
    errorMessage: "Пожалуйста пароль не менее 6 символов и не более 12"
  },
  email: {
    in: ["body"],
    trim: true,
    normalizeEmail: true,
    notEmpty: true,
    isEmail: true,
    errorMessage:
      "Введите действительный электронный адрес в формате 'имя_пользователя@имя_домена' "
  }
})
module.exports = {validationRulesPostAuth}
