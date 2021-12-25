const express = require("express")
const router = express.Router()
const controllersWrapper = require("../../controllers/wrapper")
const authenticate = require("../../controllers/authenticate")
const {
  register,
  login,
  logout,
  getUser,
  patchUserAvatar,
  updateUserBalance,
  googleAuth,
  googleRedirect,
  googleAuthWithReact
} = require("../../controllers/auth")
const {validationRulesPostAuth} = require("../../validations/auth")
const {validationRulesUpdateBalance} = require("../../validations/balance")
const validator = require("../../validations/midleware")
const upload = require("../../controllers/upload")

router.post(
  "/user/signup",
  validator(validationRulesPostAuth),
  controllersWrapper(register)
)
router.post(
  "/users/signin",
  validator(validationRulesPostAuth),
  controllersWrapper(login)
)
router.post(
  "/users/signout",
  controllersWrapper(authenticate),
  controllersWrapper(logout)
)
router.get(
  "/users/current",
  controllersWrapper(authenticate),
  controllersWrapper(getUser)
)
router.patch(
  "/users/avatars",
  controllersWrapper(authenticate),
  upload.single("avatar"),
  controllersWrapper(patchUserAvatar)
)
router.patch(
  "/users/balance",
  controllersWrapper(authenticate),
  validator(validationRulesUpdateBalance),
  controllersWrapper(updateUserBalance)
)
router.get("/google", controllersWrapper(googleAuth))
router.get("/google-redirect", controllersWrapper(googleRedirect))
router.post("/google", controllersWrapper(googleAuthWithReact))
module.exports = router
