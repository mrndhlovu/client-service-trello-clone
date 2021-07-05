import chalk from "chalk"
import { ErrorRequestHandler } from "express"

const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (res.headersSent) return next(error)

  chalk.red(error)
  res.status(500)
  res.json({
    message: error.message,
  })
}

export { errorHandler }
