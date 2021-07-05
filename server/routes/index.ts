import { Router } from "express"

import { cardRoutes } from "../controllers/cards"

const getRoutes = () => {
  const router = Router()
  router.use("/cards", cardRoutes())

  return router
}

export { getRoutes }
