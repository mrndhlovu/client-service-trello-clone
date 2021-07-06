import jwt from "jsonwebtoken"
import isEmail from "validator/lib/isEmail"
import bcrypt from "bcrypt"

import { ObjectId } from "mongodb"
import { model, Schema, Model, Document } from "mongoose"

import Board from "./Board"

const UserSchema: Schema<IUserDocument> = new Schema(
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
      default: {
        provider: "",
        id: "",
      },
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
    tokens: [{ token: { type: String, required: true } }],
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

UserSchema.methods.getAuthToken = async function () {
  const { TOKEN_SIGNATURE } = process.env
  const user = this
  const token = jwt.sign(
    { _id: user._id.toString(), expiresIn: 3600 },
    TOKEN_SIGNATURE
  )
  user.tokens = user.tokens.concat({ token })
  user.username = user.email.split("@")[0]

  await user.save()
  return token
}

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  let isMatch
  if (!user) throw new Error("Login error: check your email or password.")

  isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error("Login error: check your email or password.")

  return user
}

UserSchema.pre("save", function (next) {
  const user = this
  const SALT_FACTOR = 12

  if (!user.isModified("password")) return next()

  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

UserSchema.pre("remove", async function (next) {
  const user = this
  const id = user._id as any

  await Board.deleteMany({ admin: id })
  next()
})

export interface IToken {
  token: string
}

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
  tokens: IToken[]
  resetPasswordToken: string
  resetPasswordExpires: string
}

export interface IUserModel extends Model<IUserDocument> {
  findByCredentials: (
    email?: string,
    password?: string,
    token?: string
  ) => Promise<IUserDocument>
}

export interface IUserDocument extends IUser, Document {
  _id: ObjectId
  getAuthToken: () => Promise<string>
}

const User = model<IUserDocument, IUserModel>("User", UserSchema)

export default User
