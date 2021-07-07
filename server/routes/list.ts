import { Router } from "express"

import { controller } from "../controllers"
import checkAuth from "../middleware/auth"

const router = Router()

const listRoutes = () => {
  router.get("/all", checkAuth, controller.list.getLists)

  router.get("/:listId", checkAuth, controller.list.getListById)

  router.post("/create", checkAuth, controller.list.createList)

  router.delete(
    "/delete/:boardId/:listId",
    checkAuth,
    controller.list.deleteList
  )

  router.patch("/update", checkAuth, controller.list.updateList)

  return router
}

export default listRoutes
