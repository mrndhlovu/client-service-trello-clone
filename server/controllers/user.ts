import { Router, Request, Response } from "express"

import { editableUserFields, generateAccessCookie } from "../helpers"
import User, { IToken } from "../models/User"
import checkAuth from "../middleware/auth"
import { IGetUserAuthInfoRequest } from "../helpers/types"
import { NextFunction } from "express-serve-static-core"

const router = Router()

const authRoutes = () => {
  router.post("/signup", async (req: Request, res: Response) => {
    try {
      const user = new User({ ...req.body })
      const token = await user.getAuthToken()

      await generateAccessCookie(res, token)

      res.status(201).send(user)
    } catch (error) {
      if (error?.message.indexOf("duplicate") !== -1) {
        return res
          .status(400)
          .send({ message: "Account with email already exists." })
      }
      res.status(400).send({ message: error.message })
    }
  })

  router.get(
    "/me",
    checkAuth,
    async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        if (!req.user) throw new Error("User not found")

        res.status(200).send(req?.user)
      } catch (error) {
        res.status(400).send({ message: error.message })
      }
    }
  )

  router.post("/login", async (req, res) => {
    try {
      const { email = null, password = null } = req.body
      const user = await User.findByCredentials(email, password)

      const newToken = await user.getAuthToken()
      await generateAccessCookie(res, newToken)
      res.send(user)
    } catch (error) {
      res.status(400).send(error.message)
    }
  })

  router.get(
    "/logout",
    checkAuth,
    async (req: IGetUserAuthInfoRequest, res: Response) => {
      const { all } = req.query
      const logoutAll = all === "true"

      try {
        if (logoutAll) {
          req.user.tokens = []
        } else {
          req.user.tokens = req.user.tokens.filter(
            (tokenItem: IToken) => tokenItem.token !== req.token
          )
        }
        await req.user.save()
        res.clearCookie("accesstoken")

        res.send({ success: true, message: "Logout successfully" })
      } catch (error) {
        res.status(500).send()
      }
    }
  )

  router.patch(
    "/update",
    checkAuth,
    async (req: IGetUserAuthInfoRequest, res: Response) => {
      const targetFields = Object.keys(req.body)

      const isValidField = targetFields.every((field: string) =>
        editableUserFields.includes(field)
      )

      if (!isValidField) throw new Error("Field is not editable.")

      try {
        targetFields.forEach(
          (field: string) => (req.user[field] = req.body[field])
        )

        await req.user.save()

        res.send(req.user)
      } catch (error) {
        return res.status(400).send({ message: error })
      }
    }
  )

  router.delete(
    "/delete",
    checkAuth,
    async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const user = await User.findById(req.user?._id)

        if (!user) throw new Error("User not found")

        await user.delete()

        res.status(200).send({ message: "Account deleted", success: true })
      } catch (error) {
        res.status(400).send({ message: error.message })
      }
    }
  )

  return router
}

export default authRoutes
