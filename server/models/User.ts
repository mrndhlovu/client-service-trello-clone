import isEmail from "validator/lib/isEmail"
import bcrypt from "bcrypt"

import { ObjectId } from "mongodb"
import { model, Schema, Model, Document } from "mongoose"

import Board from "./Board"
import Token from "./Token"
import { generateTokens } from "../helpers"

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
    refreshToken: {
      type: Schema.Types.ObjectId,
      ref: "Token",
      required: true,
    },
    tokens: [
      {
        access: { type: String, required: true },
        deviceId: { type: String },
      },
    ],

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

UserSchema.path("tokens").validate(function (value) {
  console.log(value.length)
  if (value.length > 2) {
    throw new Error(
      "You can only have 2 active sessions, logout from one of your devices"
    )
  }
})

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

UserSchema.methods.getAuthTokens = async function (action?: string) {
  const user = this
  const { accessToken, refreshToken } = generateTokens(user._id)

  user.tokens = user.tokens.concat({ access: accessToken })
  user.username = user.email.split("@")[0]

  if (action === "signup") {
    var dbRefreshToken = new Token({ token: refreshToken, owner: user._id })
    if (!dbRefreshToken) throw new Error("Fail to create user")

    await dbRefreshToken.save()

    user.refreshToken = dbRefreshToken?._id
  }

  await user.save()

  return { accessToken, refreshToken }
}

UserSchema.statics.findByCredentials = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email })
  let isMatch: boolean
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
  await Board.deleteMany({ admin: this._id })

  await Token.deleteMany({ owner: this._id })

  next()
})

export interface IToken {
  access: string
  deviceId?: string
}

export interface IAccessTokens {
  accessToken: string
  refreshToken: string
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
  refreshToken: ObjectId
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
  getAuthTokens: (
    actionType?: "signup" | "login" | "refreshToken"
  ) => Promise<IAccessTokens>
}

const User = model<IUserDocument, IUserModel>("User", UserSchema)

export default User
