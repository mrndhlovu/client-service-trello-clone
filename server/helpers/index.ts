import { Response } from "express"
import jwt from "jsonwebtoken"

import { IUserDocument, IAccessTokens } from "../models/User"

export const generateAccessCookie = async (
  res: Response,
  tokens: IAccessTokens
) => {
  const options = {
    maxAge: 15,
    httpOnly: true,
  }

  const cookieString = `access_token:${tokens?.accessToken}|refresh_token:${tokens?.refreshToken}`

  res.cookie("auth", cookieString, options)
}

export const generateTokens = (userId: IUserDocument["_id"]) => {
  const { TOKEN_SIGNATURE, REFRESH_TOKEN_SIGNATURE } = process.env
  const accessTokenExpiresIn: string = "15m"
  const refreshTokenExpiresIn: string = "12h"

  const accessToken = jwt.sign({ _id: userId.toString() }, TOKEN_SIGNATURE, {
    expiresIn: accessTokenExpiresIn,
  })

  const refreshToken = jwt.sign(
    { _id: userId.toString() },
    REFRESH_TOKEN_SIGNATURE,
    { expiresIn: refreshTokenExpiresIn }
  )

  return { accessToken, refreshToken }
}
