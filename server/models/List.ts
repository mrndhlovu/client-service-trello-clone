import { Condition, ObjectId } from "mongodb"
import { Schema, Document } from "mongoose"
import { dbTusks } from "../config/dbConnect"
import Card from "./Card"

interface IList {
  title: string
  cards: string[]
}

const ListSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Board",
    },
    cards: {
      type: [{ type: Schema.Types.ObjectId, ref: "Card" }],
      default: [],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

ListSchema.pre("remove", async function (next) {
  await Card.deleteMany({ listId: this._id })
  next()
})

export interface ListDocument extends IList, Document {
  _id: Condition<ObjectId>
}

const List = dbTusks.model<ListDocument>("List", ListSchema)

export default List
