import { Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import { IUserDocument, IAccessTokens } from "../models/User"
import { RolesType } from "../utils/types"
import { ObjectID, ObjectId } from "mongodb"
import Board, { BoardDocument } from "../models/Board"
import List from "../models/List"

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

export const assignBoardRole = async (
  role: RolesType,
  user: IUserDocument,
  boardId: ObjectId
) => {
  await user.update({ $push: { roles: { [role]: boardId } } })

  await user.save()

  return
}

export const handleError = (status: number, res: Response, error: Error) => {
  res.status(status).send({ message: error.message })
}

export const validateEditableFields = <T>(allowedFields: T[], updates: T[]) => {
  return updates.every((update: T) => allowedFields.includes(update))
}

export const populatedBoard = async (boardId: ObjectId | string) => {
  const board = await Board.findById(boardId).populate({
    path: "lists",
    populate: [{ path: "cards", model: "Card" }],
  })
  return board
}

export const populatedList = async (listId: ObjectId | string) => {
  const list = await List.findById(listId).populate({
    path: "cards",
  })
  return list
}

export const toObjectId = (id: string) => new ObjectID(id)
