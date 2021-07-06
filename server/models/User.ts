import { Condition, ObjectId } from "mongodb"
import { model, Schema, Model, Document } from "mongoose"

import Board from "./Board"
import isEmail from "validator/lib/isEmail"

interface IUser {
  username: string
  firstname: string
  lastname: string
  email: string
  password: string
  starred: string[]
  viewedRecent: string[]
  avatar: string
  bio: string
  templates: string[]
  socialAuth: {
    provider: string
    id: string
  }
  tokens: string[]
  resetPasswordToken: string
  resetPasswordExpires: string
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      trim: true,
      minlength: 4,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!isEmail(value)) throw new Error("Email is invalid")
      },
    },
    password: {
      type: String,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password"))
          throw new Error(`Password should not include 'password'`)
      },
    },
    starred: {
      type: [{ type: Schema.Types.ObjectId, ref: "Board" }],
      required: true,
      default: [],
    },
    viewedRecent: {
      type: [{ type: Schema.Types.ObjectId, ref: "Board" }],
      required: true,
      default: [],
    },
    notifications: {
      type: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
      required: true,
      default: [],
    },
    socialAuth: {
      type: Object,
      required: true,
      default: {
        provider: "",
        id: "",
      },
    },
    boards: {
      type: [{ type: Schema.Types.ObjectId, ref: "Board" }],
      required: true,
      default: [],
    },
    avatar: {
      type: Array,
      required: true,
      default: [],
    },
    bio: {
      type: String,
      trim: true,
      minlength: 4,
    },
    templates: {
      type: [{ type: Schema.Types.ObjectId, ref: "Template" }],
      required: true,
      default: [],
    },
    tokens: [{ type: String, required: true }],
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.virtual("boards", {
  ref: "Board",
  localField: "_id",
  foreignField: "owner",
})

UserSchema.virtual("template", {
  ref: "Templates",
  localField: "_id",
  foreignField: "owner",
})

UserSchema.virtual("comment", {
  ref: "Comment",
  localField: "_id",
  foreignField: "owner",
})

UserSchema.virtual("InvitedBoards", {
  ref: "Board",
  localField: "_id",
  foreignField: "owners",
})

UserSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  return userObject
}

UserSchema.pre("remove", async function (next) {
  const user = this
  await Board.deleteMany({ owner: user._id })
  next()
})

export interface UserDocument extends IUser, Document {
  _id: Condition<ObjectId>
}

const User: Model<UserDocument> = model<UserDocument>("User", UserSchema)

module.exports = User
