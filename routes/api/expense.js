const express = require("express")
const router = express.Router()
const controllersWrapper = require("../../controllers/wrapper")
const authenticate = require("../../controllers/authenticate")
const validator = require("../../validations/midleware")
const {postTransaction} = require("../../controllers/expense/index")
const {validationRulesPostTransaction} = require("../../validations/expense")

router.post(
  "/",
  controllersWrapper(authenticate),
  validator(validationRulesPostTransaction),
  controllersWrapper(postTransaction)
)

module.exports = router
