const {Schema, model} = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = Schema(
  {
    name: {
      type: String
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true
    },
    token: {
      type: String,
      default: null
    },
    avatarUrl: {
      type: String,
      required: [true, "Avatar is required"]
    },
    balance: {
      type: Number,
      default: null
    }
  },
  {versionKey: false, timestamps: true}
)

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync())
}
userSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password)
}
const User = model("users", userSchema)

module.exports = User
