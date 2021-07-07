import { Router, Request, Response } from "express"

import { allowedBoardUpdateFields } from "../utils/constants"
import { IGetUserAuthInfoRequest } from "../utils/types"
import Board from "../models/Board"
import checkAuth from "../middleware/auth"

const router = Router()

const boardRoutes = () => {
  router.get("/all", checkAuth, async (_req: Request, res: Response) => {
    try {
      let boards = []

      const getBoards = async () => {
        boards = await Board.find()
      }

      await getBoards()

      res.send(boards)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  })

  router.get("/:boardId", checkAuth, async (req: Request, res: Response) => {
    const _id = req.params.boardId

    let board
    try {
      board = await Board.findOne({ _id }).populate({
        path: "lists",
        populate: [{ path: "cards", model: "Card" }],
      })
      if (!board) throw new Error("Board with that id was not found")

      res.send(board)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  })

  router.post(
    "/create",
    checkAuth,
    async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const board = new Board({
          ...req.body,
          admin: req.user?._id,
        })

        await board.save()

        const createdBoard = board.populate({
          path: "admin",
        })

        res.status(201)
        res.send(createdBoard)
      } catch (error) {
        res.status(400).send({ message: error.message })
      }
    }
  )

  router.patch(
    "/update/:boardId",
    checkAuth,
    async (req: Request, res: Response) => {
      const _id = req?.params?.boardId

      const updates = Object.keys(req.body)

      const isValidField = updates.every(update =>
        allowedBoardUpdateFields.includes(update)
      )

      if (!isValidField)
        return res.status(400).send({ message: "Invalid update field" })
      try {
        const board = await Board.findOne({ _id })
        if (!board) throw new Error("Board with that id was not found")

        updates.forEach(update => (board[update] = req.body[update]))

        board.save()
        res.send(board)
      } catch (error) {
        res.status(400).send({ message: error.message })
      }
    }
  )

  router.delete(
    "/delete/:boardId",
    checkAuth,
    async (req: Request, res: Response) => {
      const _id = req.params.boardId

      try {
        const board = await Board.findById({ _id })
          .then(boardObj => boardObj)
          .catch(err => err)

        if (!board?._id) throw new Error("Board with that id was not found")
        board.delete()

        res.send({ message: "Board deleted" })
      } catch (error) {
        res.status(400).send({ message: error.message })
      }
    }
  )

  return router
}

export default boardRoutes
