const express = require("express")
const router = express.Router()
const controllersWrapper = require("../../controllers/wrapper")
const authenticate = require("../../controllers/authenticate")
const validator = require("../../validations/midleware")
const {postIncome} = require("../../controllers/income")
const {validationRulesPostIncome} = require("../../validations/income")

router.post(
  "/",
  controllersWrapper(authenticate),
  validator(validationRulesPostIncome),
  controllersWrapper(postIncome)
)

module.exports = router
