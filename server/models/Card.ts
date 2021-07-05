import mongoose from "mongoose"

const CardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
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
      required: true,
    },
    comments: {
      type: Array,
      default: [],
      required: true,
    },
    activities: {
      type: Array,
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
      required: true,
    },
    description: {
      type: String,
      default: "",
      required: true,
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

const Card = mongoose.model("Card", CardSchema)

export default Card
