import { Router, Request, Response } from "express"

import Board from "../models/Board"
import List from "../models/List"

const router = Router()

const listRoutes = () => {
  router.get("/all", async (req: Request, res: Response) => {
    try {
      const lists = await List.find()

      res.status(200).send(lists)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  })

  router.get("/list/:listId", async (req: Request, res: Response) => {
    try {
      const listIem = await List.findById(req.params.listId)

      if (!listIem) throw new Error("List with that id was not found")

      res.status(200).send(listIem)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  })

  router.post("/create", async (req: Request, res: Response) => {
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

  router.delete(
    "/delete/:boardId/:listId",
    async (req: Request, res: Response) => {
      const { boardId, listId } = req.params
      const { all = "false" } = req?.query

      try {
        const list = await List.findById({ _id: listId })
        const shouldDeleteAll = all === "true"

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
    }
  )

  router.patch("/update", async (req: Request, res: Response) => {
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

  return router
}

export default listRoutes
