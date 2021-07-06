import { Router, Request, Response } from "express"

import Card from "../models/Card"
import List from "../models/List"

const router = Router()

const cardRoutes = () => {
  router.get("/list", async (req: Request, res: Response) => {
    const _id = req.params.listId

    try {
      let cards = await Card.find()

      res.send(cards)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  })

  router.get("/:cardId", async (req: Request, res: Response) => {
    const _id = req.params.cardId

    try {
      const card = await Card.findOne({ _id })
      if (!card) throw new Error("Card with that id was not found")

      res.send(card)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  })

  router.post("/create/:listId", async (req: Request, res: Response) => {
    const _id = req.params.listId
    const { title } = req?.body

    try {
      const card = new Card({ title })
      if (!card) throw new Error("Card with that id was not found")

      await card.save()

      await List.updateOne({ _id }, { $push: { cards: card?.id } })

      res.status(201).send(card)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  })

  router.delete("/delete", async (req: Request, res: Response) => {
    const { listId, cardId } = req.body
    const { deleteall = "false" } = req?.query

    try {
      const shouldDeleteAll = deleteall === "true"

      let list = await List.findOne({ _id: listId })

      if (shouldDeleteAll) {
        list?.cards?.map(async (id: string) => {
          const card = await Card.findById(id)
          return card.delete()
        })

        await List.updateOne({ _id: listId }, { $set: { cards: [] } })
      } else {
        const card = await Card.findById(cardId)
        if (!card) throw new Error("Card with that id was not found")

        await List.updateOne({ _id: listId }, { $pull: { cards: cardId } })

        await card.delete()
      }

      list = await List.findOne({ _id: listId })

      res.status(200).send(list)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  })

  router.patch("/update", async (req: Request, res: Response) => {
    const { cardId, key, newValue } = req.body

    try {
      if (!cardId) throw new Error("Card id required.")

      switch (key) {
        case "description":
        case "shortDesc":
        case "title":
          await Card.updateOne({ _id: cardId }, { $set: { [key]: newValue } })
          break

        default:
          throw new Error("Field is not editable.")
      }

      const card = await Card.findById({ _id: cardId })

      res.status(200).send(card)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  })

  return router
}

export default cardRoutes
