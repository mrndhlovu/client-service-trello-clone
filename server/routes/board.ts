import { Router } from "express"
import { controller } from "../controllers"

import checkAuth from "../middleware/auth"

const router = Router()
const boardRoutes = () => {
  router.get("/all", checkAuth, controller.board.getBoardList)

  router.get("/:boardId", checkAuth, controller.board.getBoardById)

  router.post("/create", checkAuth, controller.board.createBoard)

  router.patch("/update/:boardId", checkAuth, controller.board.updateBoard)

  router.delete("/delete/:boardId", checkAuth, controller.board.deleteBoard)

  return router
}

export default boardRoutes
