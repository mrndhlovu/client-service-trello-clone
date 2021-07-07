import { Router } from "express"

import checkAuth from "../middleware/auth"
import { controller } from "../controllers"

const router = Router()

const authRoutes = () => {
  router.post("/signup", controller.auth.signUpUser)

  router.get("/me", checkAuth, controller.auth.getUserInfo)

  router.post("/login", controller.auth.loginUser)

  router.get("/logout", checkAuth, controller.auth.logoutUser)

  router.patch("/update", checkAuth, controller.auth.updateUser)

  router.delete("/delete", checkAuth, controller.auth.deleteUser)

  router.get("/token/:refreshId", controller.auth.getRefreshToken)

  return router
}

export default authRoutes
