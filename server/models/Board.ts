import { ObjectId } from "mongodb"
import { Schema, Document } from "mongoose"

import { dbTusks } from "../config/dbConnect"
import List from "./List"

const DEFAULT_BOARD_BG_COLOR = "#0079be"

const BoardSchema = new Schema<BoardDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    lists: {
      type: [{ type: Schema.Types.ObjectId, ref: "List" }],
      required: true,
      default: [],
    },
    category: {
      type: [String],
      required: true,
      default: [],
    },

    styles: {
      type: Object,
      default: { color: DEFAULT_BOARD_BG_COLOR },
    },
    visibility: {
      type: Object,
      required: true,
      default: { private: true, public: false, team: false, workspace: false },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    archived: {
      type: Boolean,
      required: true,
      default: false,
    },
    workspaces: {
      type: [{ type: Schema.Types.ObjectId, ref: "Workspace" }],
      required: true,
      default: [],
    },
    members: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
)

BoardSchema.pre("save", async function (next) {
  if (this?.updatedAt) {
    this.updatedAt = Date.now()
  }
  next()
})

BoardSchema.pre("remove", async function (next) {
  if (this.visibility.private) {
    await List.deleteMany({ boardId: this._id })
  }

  next()
})

export interface IBoard {
  title: string
  lists: string[]
  date: string
  category: string[]
  styles: { color: string } | {}
  visibility: {
    private: boolean
    public: boolean
    team: boolean
    workspace: boolean
  }
  owner: ObjectId
  archived: boolean
  comments: string[]
  activities: string[]
  members: string[]
  description: string
  workspaces: string[]
}

export interface BoardDocument
  extends IBoardWithSchemaTimestampsConfig,
    Document {
  _id: ObjectId
}

interface IBoardWithSchemaTimestampsConfig extends IBoard {
  createdAt?: boolean | string | number
  updatedAt?: boolean | string | number
}

const Board = dbTusks.model<BoardDocument>("Board", BoardSchema)

export default Board
