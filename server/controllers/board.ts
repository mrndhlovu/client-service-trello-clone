import { Request, Response } from "express"

import { allowedBoardUpdateFields, ROLES } from "../utils/constants"
import { IGetUserAuthInfoRequest } from "../utils/types"
import Board from "../models/Board"
import {
  assignBoardRole,
  handleError,
  populatedBoard,
  toObjectId,
  validateEditableFields,
} from "../helpers"

const getBoardList = async (_req: Request, res: Response) => {
  try {
    let boards = await Board.find()
    res.send(boards)
  } catch (error) {
    handleError(400, res, error)
  }
}

const getBoardById = async (req: Request, res: Response) => {
  const _id = toObjectId(req?.params?.boardId)

  try {
    const board = await populatedBoard(_id)

    if (!board) throw new Error("Board with that id was not found")

    res.send(board)
  } catch (error) {
    handleError(400, res, error)
  }
}

const createBoard = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const board = new Board({
      ...req.body,
      admin: true,
      owner: req.user._id,
      members: [req.user._id],
    })

    await assignBoardRole(ROLES.ADMIN, req.user, board._id)

    await board.save()

    res.status(201).send(board)
  } catch (error) {
    handleError(400, res, error)
  }
}

const updateBoard = async (req: Request, res: Response) => {
  const _id = toObjectId(req?.params?.boardId)

  const updates = Object.keys(req.body)

  const hasValidFields = validateEditableFields(
    allowedBoardUpdateFields,
    updates
  )

  try {
    if (!hasValidFields) throw new Error("Invalid update field")

    const board = await populatedBoard(_id)

    if (!board) throw new Error("Board with that id was not found")

    updates.forEach(update => (board[update] = req.body[update]))

    board.save()

    res.status(200).send(board)
  } catch (error) {
    handleError(400, res, error)
  }
}

const deleteBoard = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    req.board.delete()
    res.status(200).send({ message: "Board deleted" })
  } catch (error) {
    handleError(400, res, error)
  }
}

export default {
  deleteBoard,
  updateBoard,
  createBoard,
  getBoardById,
  getBoardList,
}
