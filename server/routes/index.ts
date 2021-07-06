import { Router } from "express"

import { boardRoutes, cardRoutes, listRoutes, authRoutes } from "../controllers"

const getRoutes = () => {
  const router = Router()

  router.use("/auth", authRoutes())
  router.use("/board", boardRoutes())
  router.use("/card", cardRoutes())
  router.use("/list", listRoutes())

  return router
}

export { getRoutes }
