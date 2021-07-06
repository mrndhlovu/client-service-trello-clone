import { Condition, ObjectId } from "mongodb"
import { model, Schema, Model, Document } from "mongoose"
import List from "./List"

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
      type: [{ type: Schema.Types.ObjectId, ref: "List" }],
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
      type: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
      required: true,
      default: [],
    },
    activities: {
      type: [{ type: Schema.Types.ObjectId, ref: "Activities" }],
      required: true,
      default: [],
    },
    owners: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    description: {
      type: String,
      default: "",
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
  // const board = this as BoardDocument

  // board.updateAt = Date.now()
  next()
})

BoardSchema.pre("remove", async function (next) {
  const board = this as BoardDocument
  if (!board.admin) {
    throw new Error("Only admin of this board can delete it.")
  }

  if (board.accessLevel.private) {
    await List.deleteMany({ boardId: this._id })
  }

  next()
})

const Board: Model<BoardDocument> = model<BoardDocument>("Board", BoardSchema)

export default Board
