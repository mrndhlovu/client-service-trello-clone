import { Condition, ObjectId } from "mongodb"
import { model, Schema, Model, Document } from "mongoose"

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
    cards: {
      type: [Schema.Types.ObjectId],
      default: [],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export interface ListDocument extends IList, Document {
  _id: Condition<ObjectId>
}

const List: Model<IList> = model<IList>("List", ListSchema)

export default List
