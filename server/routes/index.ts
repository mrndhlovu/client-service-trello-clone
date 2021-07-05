import { Router } from "express"

import { boardRoutes, cardRoutes } from "../controllers"

const getRoutes = () => {
  const router = Router()

  router.use("/board", boardRoutes())
  router.use("/card", cardRoutes())

  return router
}

export { getRoutes }
