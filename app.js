const express = require("express")
const logger = require("morgan")
const cors = require("cors")
require("dotenv").config()

const authRouter = require("./routes/api/auth")
const expenseRouter = require("./routes/api/expense")
const incomeRouter = require("./routes/api/income")

const app = express()

const formatsLogger = app.get("env") === "development" ? "dev" : "short"

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use("/api/auth", authRouter)
app.use("/api/expense", expenseRouter)
app.use("/api/income", incomeRouter)

app.use((req, res) => {
  res.status(404).json({message: "Not found"})
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({errors: err.message})
})

module.exports = app
