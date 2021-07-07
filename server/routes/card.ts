import { Router } from "express"

import { controller } from "../controllers"
import checkAuth from "../middleware/auth"

const router = Router()

const cardRoutes = () => {
  router.get("/list", checkAuth, controller.card.getCards)

  router.get("/:cardId", checkAuth, controller.card.getCardById)

  router.post("/create/:listId", checkAuth, controller.card.createCard)

  router.delete(
    "/delete/:listId/:cardId",
    checkAuth,
    controller.card.deleteCard
  )

  router.patch("/update", checkAuth, controller.card.updateCard)

  return router
}

export default cardRoutes
