const express = require("express")
const router = express.Router()
const controllersWrapper = require("../../controllers/wrapper")
const authenticate = require("../../controllers/authenticate")
const validator = require("../../validations/midleware")
const {
  postIncome,
  deleteIncomeTransaction,
  getAllIncomeTransaction
} = require("../../controllers/income")
const {validationRulesPostIncome} = require("../../validations/income")

router.post(
  "/",
  controllersWrapper(authenticate),
  validator(validationRulesPostIncome),
  controllersWrapper(postIncome)
)

router.delete(
  "/:transactionId",
  controllersWrapper(authenticate),
  controllersWrapper(deleteIncomeTransaction)
)

router.get(
  "/",
  controllersWrapper(authenticate),
  controllersWrapper(getAllIncomeTransaction)
)

module.exports = router
