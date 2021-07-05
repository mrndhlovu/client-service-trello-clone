import { Router, Request, Response } from "express"

const router = Router()

const fakeCardsList = [
  { name: "test card", category: "testing" },
  { name: "test card1", category: "testing" },
  { name: "test card2", category: "testing" },
]

const cardRoutes = () => {
  router.get("/", async (req: Request, res: Response) => {
    try {
      res.send(fakeCardsList)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  })

  return router
}

export { cardRoutes }
