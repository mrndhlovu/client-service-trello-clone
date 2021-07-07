import { Router } from "express"

import authRoutes from "./auth"
import boardRoutes from "./board"
import cardRoutes from "./card"
import listRoutes from "./list"

const getRoutes = () => {
  const router = Router()

  router.use("/auth", authRoutes())
  router.use("/board", boardRoutes())
  router.use("/card", cardRoutes())
  router.use("/list", listRoutes())

  return router
}

export { getRoutes }
