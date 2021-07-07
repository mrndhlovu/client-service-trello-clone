import { Response, NextFunction } from "express"

import Board from "../../models/Board"

import { IGetUserAuthInfoRequest } from "../../utils/types"

const admin = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const _id = req.params.boardId

  try {
    const board = await Board.findById(_id)
    if (!board?._id) throw new Error("Board with that id was not found")
    if (board.owner !== req.user._id) {
      throw new Error("Only admin can delete this board.")
    }

    req.board = board

    next()
  } catch (error) {
    res.status(401).send({ error: error.message })
  }
}

export default { admin }
