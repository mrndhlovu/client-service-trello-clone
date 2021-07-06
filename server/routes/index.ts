import { Router } from "express"

import { boardRoutes, cardRoutes, listRoutes } from "../controllers"

const getRoutes = () => {
  const router = Router()

  router.use("/board", boardRoutes())
  router.use("/list", listRoutes())
  router.use("/card", cardRoutes())

  return router
}

export { getRoutes }
