import { Request, Response } from "express"
import { populatedBoard, populatedList } from "../helpers"

import Board from "../models/Board"
import List from "../models/List"

const getLists = async (req: Request, res: Response) => {
  try {
    const lists = await List.find()

    res.status(200).send(lists)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

const getListById = async (req: Request, res: Response) => {
  try {
    const listIem = await populatedList(req.params.listId)

    if (!listIem) throw new Error("List with that id was not found")

    res.status(200).send(listIem)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

const createList = async (req: Request, res: Response) => {
  const { boardId, title } = req.body
  try {
    const list = new List({ title, boardId })

    await list.save()

    await Board.updateOne({ _id: boardId }, { $push: { lists: list.id } })

    res.status(201).send(list)
  } catch (error) {
    if (error?.message.indexOf("duplicate") !== -1) {
      return res.status(400).send({ message: "List title should be unique." })
    }
    res.status(400).send({ message: error.message })
  }
}

const deleteList = async (req: Request, res: Response) => {
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
    const board = await populatedBoard(boardId)
    await list.delete()

    res.status(200).send(board)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

const updateList = async (req: Request, res: Response) => {
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
}

export default { updateList, deleteList, getLists, getListById, createList }
