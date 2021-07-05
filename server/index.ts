import next, { NextApiHandler } from "next"

import { startServer } from "./config/startServer"

const { NODE_ENV, PORT = "3000" } = process.env
const _PORT = parseInt(PORT, 10)
const dev = NODE_ENV !== "production"

const nextApp = next({ dev })
const nextHandler: NextApiHandler = nextApp.getRequestHandler()

export type NextHandlerType = typeof nextHandler

nextApp.prepare().then(async () => {
  startServer(nextHandler, _PORT)
})
