import { Condition, ObjectId } from "mongodb"
import { model, Schema, Model, Document } from "mongoose"

export interface ICard {
  title: string
  attachments: string[]
  labels: string[]
  dueDate: string
  shortDesc: string
  checklists: string[]
  comments: string[]
  activities: string[]
  owners: string[]
  description: string
  cover: string
  assignees: string[]
  archived: boolean
}

const CardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    attachments: {
      type: Array,
      required: true,
      default: [],
    },
    archived: {
      type: Boolean,
      default: false,
      required: true,
    },
    cover: {
      type: String,
      default: "",
    },
    comments: {
      type: [Schema.Types.ObjectId],
      default: [],
      required: true,
    },
    labels: {
      type: Array,
      default: [],
      required: true,
    },
    checklists: {
      type: Array,
      default: [],
      required: true,
    },
    shortDesc: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    assignees: {
      type: Array,
      default: [],
      required: true,
    },
    dueDate: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
)

export interface CardDocument extends ICard, Document {
  _id: Condition<ObjectId>
}

const Card: Model<CardDocument> = model<CardDocument>("Card", CardSchema)

export default Card
