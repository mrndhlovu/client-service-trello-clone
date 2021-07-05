import mongoose from "mongoose"

const DEFAULT_BOARD_BG_COLOR = "#0079be"

const BoardSchema = new mongoose.Schema(
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
      type: Array,
      required: true,
      default: [],
    },
    category: {
      type: Array,
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
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    archived: {
      type: Object,
      required: true,
      default: false,
    },
    comments: {
      type: Array,
      required: true,
      default: [],
    },
    activities: {
      type: Array,
      required: true,
      default: [],
    },
    owners: {
      type: Array,
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

BoardSchema.pre("save", async function (next) {
  // this.updateAt = Date.now()
  next()
})

const Board = mongoose.model("Board", BoardSchema)

export default Board
