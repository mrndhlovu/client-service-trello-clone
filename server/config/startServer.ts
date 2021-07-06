import express from "express"
import { promisify } from "util"
import cookieParser from "cookie-parser"

import { NextHandlerType } from ".."
import { getRoutes } from "../routes"
import { closeOnExit } from "./closeOnExit"
import { errorHandler } from "./error"

const startServer = async (handle: NextHandlerType, port: number) => {
  const app = express()
  app.use(cookieParser())
  app.use(express.json())
  app.disable("x-powered-by")
  app.use("/api", getRoutes())
  app.use(errorHandler)
  app.all("*", (req: any, res: any) => handle(req, res))

  return new Promise(resolve => {
    const server = app.listen(port, () => {
      console.log(
        `> Server ready on PORT:${port} - env: ${process.env.NODE_ENV}`
      )
    })

    const originalClose = server.close.bind(server)
    server.close = promisify(originalClose)
    closeOnExit(server)

    resolve(server)
  })
}

export { startServer }
