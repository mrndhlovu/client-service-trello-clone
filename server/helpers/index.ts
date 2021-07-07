import { NextFunction, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

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

export type EncryptCallbackError = Error | undefined
export type EncryptCallbackPayload = string
export type EncryptCallback = (
  err?: EncryptCallbackError,
  payload?: EncryptCallbackPayload
) => EncryptCallbackPayload | EncryptCallbackError | void

export const encryptUserPassword = async (
  password: string,
  salt: number,
  callback: EncryptCallback
) => {
  bcrypt.genSalt(salt, function (err, salt) {
    if (err) return callback(err)

    bcrypt.hash(password, salt, function (err, hash) {
      if (err) return callback(err, hash)

      callback(err, hash)
    })
  })
}
