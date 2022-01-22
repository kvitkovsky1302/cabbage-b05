const express = require("express")
const router = express.Router()
const controllersWrapper = require("../../controllers/wrapper")
const authenticate = require("../../controllers/authenticate")
const validator = require("../../validations/midleware")
const {
  postTransaction,
  deleteTransaction,
  getTransactions
} = require("../../controllers/expense")
const {validationRulesPostTransaction} = require("../../validations/expense")

router.post(
  "/",
  controllersWrapper(authenticate),
  validator(validationRulesPostTransaction),
  controllersWrapper(postTransaction)
)
router.delete(
  "/:transactionId",
  controllersWrapper(authenticate),
  controllersWrapper(deleteTransaction)
)
router.get(
  "/",
  controllersWrapper(authenticate),
  controllersWrapper(getTransactions)
)

module.exports = router
