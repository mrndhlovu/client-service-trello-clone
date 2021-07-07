import { Request, Response } from "express"
import jwt, { TokenExpiredError, JwtPayload } from "jsonwebtoken"

import { editableUserFields } from "../utils/constants"
import { generateAccessCookie } from "../helpers"
import { IGetUserAuthInfoRequest } from "../utils/types"
import User, { IToken } from "../models/User"
import Token from "../models/Token"

const signUpUser = async (req: Request, res: Response) => {
  try {
    const user = new User({ ...req.body })
    const tokens = await user.getAuthTokens("signup")

    await generateAccessCookie(res, tokens)

    const newUser = await User.findById(user?._id).populate(
      "refreshToken",
      "token"
    )

    res.status(201).send(newUser)
  } catch (error) {
    if (error?.message.indexOf("duplicate") !== -1) {
      return res
        .status(400)
        .send({ message: "Account with email already exists." })
    }
    res.status(400).send({ message: error.message })
  }
}

const getUserInfo = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    if (!req.user) throw new Error("User not found")

    res.status(200).send(req?.user.populate("refreshToken"))
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email = null, password = null } = req.body
    const user = (await User.findByCredentials(email, password)).populate(
      "refreshToken"
    )

    const authTokens = await user.getAuthTokens("login")
    await generateAccessCookie(res, authTokens)
    res.send(user)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const logoutUser = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { all } = req.query
  const logoutAll = all === "true"

  try {
    if (logoutAll) {
      req.user.tokens = []
    } else {
      req.user.tokens = req.user.tokens.filter(
        (tokenItem: IToken) => tokenItem.access !== req.token
      )
    }
    await req.user.save()
    res.clearCookie("accesstoken")

    res.send({ success: true, message: "Logout successfully" })
  } catch (error) {
    res.status(500).send()
  }
}

const updateUser = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const targetFields = Object.keys(req.body)

  const isValidField = targetFields.every((field: string) =>
    editableUserFields.includes(field)
  )

  if (!isValidField) throw new Error("Field is not editable.")

  try {
    targetFields.forEach((field: string) => (req.user[field] = req.body[field]))

    await req.user.save()

    res.send(req.user)
  } catch (error) {
    return res.status(400).send({ message: error })
  }
}

const deleteUser = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?._id)

    if (!user) throw new Error("User not found")

    await user.delete()

    res.status(200).send({ message: "Account deleted", success: true })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

const getRefreshToken = async (req: Request, res: Response) => {
  const { refreshId } = req.params

  try {
    const { REFRESH_TOKEN_SIGNATURE } = process.env
    const refreshToken = await Token.findOne({ token: refreshId })

    if (!refreshToken) throw new Error("Access credentials not found")

    const decoded = <any>jwt.verify(
      refreshToken.token,
      REFRESH_TOKEN_SIGNATURE,
      (err: TokenExpiredError, payload: JwtPayload): JwtPayload => {
        if (err) throw new Error("Authorization credentials have expired.")

        return payload
      }
    )

    const user = await User.findOne({
      _id: decoded._id,
      refreshToken: refreshToken._id,
    })
    if (!user)
      throw new Error("Authorization credentials are wrong or have expired.")

    const tokens = await user.getAuthTokens()
    await generateAccessCookie(res, tokens)

    res.status(200).send(tokens)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

export default {
  signUpUser,
  loginUser,
  deleteUser,
  updateUser,
  getRefreshToken,
  logoutUser,
  getUserInfo,
}
