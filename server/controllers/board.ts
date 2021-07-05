import { Router, Request, Response } from "express"

import { allowedBoardUpdateFields } from "../../helpers"

import Board from "../../models/Board"

const router = Router()

const boardRoutes = () => {
  router.get("/list", async (req: Request, res: Response) => {
    try {
      let boards = []

      const getBoards = async () => {
        boards = await Board.find()
      }

      await getBoards()

      res.send(boards)
    } catch (error) {
      return error
    }
  })

  router.get("/:boardId", async (req, res) => {
    const _id = req.params.boardId

    let board
    try {
      board = await Board.findOne({ _id })

      res.send(board)
    } catch (error) {
      return error
    }
  })

  router.post("/create", async (req: Request, res: Response) => {
    try {
      const board = new Board({
        ...req.body,
      })

      const savedBoard = await board.save()
      res.status(201)
      res.send(savedBoard)
    } catch (error) {
      return error
    }
  })

  router.patch("/update/:boardId", async (req, res) => {
    const _id = req.params.boardId

    let board
    const updates = Object.keys(req.body)

    const isValidField = updates.every(update =>
      allowedBoardUpdateFields.includes(update)
    )

    if (!isValidField)
      return res.status(400).send({ message: "Invalid update field" })
    try {
      board = await Board.findOne({ _id })

      if (!board) {
        try {
          board = await Board.findOne({ _id })
        } catch (error) {
          return res.status(400).send({ message: error.message })
        }
      }

      updates.forEach(update => (board[update] = req.body[update]))

      board.save()
      res.send(board)
    } catch (error) {
      return error
    }
  })

  router.delete("/delete/:boardId", async (req, res) => {
    const _id = req.params.boardId

    try {
      await Board.findById({ _id })
        .then(board => {
          return board.delete()
        })
        .catch(err => err)

      res.send({ message: "Board deleted" })
    } catch (error) {
      return error
    }
  })

  return router
}

export default boardRoutes
