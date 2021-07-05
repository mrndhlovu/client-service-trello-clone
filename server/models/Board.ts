import { Condition, ObjectId } from "mongodb"
import mongoose, { model, Schema, Model, Document } from "mongoose"

const DEFAULT_BOARD_BG_COLOR = "#0079be"

export interface IBoard {
  title: string
  lists: string[]
  date: string
  category: string[]
  styles: { color: string } | {}
  accessLevel: {
    private: boolean
    public: boolean
    team: boolean
  }
  admin: string
  archived: boolean
  comments: string[]
  activities: string[]
  owners: string[]
  description: string
  isTemplate: string
}

const BoardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    lists: {
      type: [String],
      required: true,
      default: [],
    },
    category: {
      type: [String],
      required: true,
      default: ["default"],
    },
    styles: {
      type: Object,
      default: { color: DEFAULT_BOARD_BG_COLOR },
    },
    accessLevel: {
      type: Object,
      required: true,
      default: { private: true, public: false, team: false },
    },
    admin: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    archived: {
      type: Object,
      required: true,
      default: false,
    },
    comments: {
      type: [Schema.Types.ObjectId],
      required: true,
      default: [],
    },
    activities: {
      type: [Schema.Types.ObjectId],
      required: true,
      default: [],
    },
    owners: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    description: {
      type: String,
      default: "",
    },
    isTemplate: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export interface BoardDocument extends IBoard, Document {
  _id: Condition<ObjectId>
}

BoardSchema.pre("save", async function (next) {
  // this.updateAt = Date.now()
  next()
})

const Board: Model<BoardDocument> = model<BoardDocument>("Board", BoardSchema)

export default Board
