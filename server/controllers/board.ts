import { Router, Request, Response } from "express"
import { ObjectID } from "mongodb"

import { allowedBoardUpdateFields } from "../helpers"
import Board from "../models/Board"
import List from "../models/List"

const router = Router()

const boardRoutes = () => {
  router.get("/lists", async (req: Request, res: Response) => {
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

  router.get("/list/:listId", async (req: Request, res: Response) => {
    try {
      const listIem = await List.findById({
        _id: new ObjectID(req.params.listId),
      })
      console.log(
        "🚀 ~ file: board.ts ~ line 56 ~ router.get ~ req.params.listId",
        req.params.listId
      )
      if (!listIem) throw new Error("List with that id was not found")

      res.status(200).send(listIem)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  })

  router.get("/:boardId", async (req: Request, res: Response) => {
    const _id = req.params.boardId

    let board
    try {
      board = await Board.findOne({ _id })
      if (!board) throw new Error("Board with that id was not found")

      res.send(board)
    } catch (error) {
      res.status(400).send({ message: error.message })
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
      res.status(400).send({ message: error.message })
    }
  })

  router.post("/create-list", async (req: Request, res: Response) => {
    const { boardId, title } = req.body
    try {
      const list = new List({ title })

      await list.save()

      await Board.updateOne({ _id: boardId }, { $push: { lists: list.id } })

      res.status(201).send(list)
    } catch (error) {
      if (error?.message.indexOf("duplicate") !== -1) {
        return res.status(400).send({ message: "List title should be unique." })
      }
      res.status(400).send({ message: error.message })
    }
  })

  router.patch("/delete-list", async (req: Request, res: Response) => {
    const { boardId, listId } = req.body
    const { deleteall = "false" } = req?.query

    try {
      const list = await List.findById({ _id: listId })
      const shouldDeleteAll = deleteall === "true"

      if (!list) throw new Error("List with that id was not found")

      await Board.updateOne(
        { _id: boardId },
        { $pull: { lists: shouldDeleteAll ? [] : listId } }
      )
      const board = await Board.findOne({ _id: boardId })
      await list.delete()

      res.status(200).send(board)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  })

  router.patch("/update-list", async (req: Request, res: Response) => {
    const { listId, key, newValue } = req.body

    try {
      if (!listId) throw new Error("List id required.")

      switch (key) {
        case "title":
          await List.updateOne({ _id: listId }, { $set: { [key]: newValue } })
          break

        case "cards":
          await List.updateOne({ _id: listId }, { $push: { [key]: newValue } })
          break
        default:
          throw new Error("Field is not editable.")
      }

      const list = await List.findById({ _id: listId })

      res.status(200).send(list)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  })

  router.patch("/update/:boardId", async (req: Request, res: Response) => {
    const _id = req?.params?.boardId

    let board
    const updates = Object.keys(req.body)

    const isValidField = updates.every(update =>
      allowedBoardUpdateFields.includes(update)
    )

    if (!isValidField)
      return res.status(400).send({ message: "Invalid update field" })
    try {
      board = await Board.findOne({ _id })
      if (!board) throw new Error("Board with that id was not found")

      updates.forEach(update => (board[update] = req.body[update]))

      board.save()
      res.send(board)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  })

  router.delete("/delete/:boardId", async (req: Request, res: Response) => {
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
  })

  return router
}

export default boardRoutes
