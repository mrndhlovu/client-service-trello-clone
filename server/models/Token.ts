import { ObjectId } from "mongodb"
import { model, Schema, Document } from "mongoose"
import { dbAuth } from "../config/dbConnect"

interface IToken {
  token: string
  owner: ObjectId
}

const TokenSchema: Schema<ITokenDocument> = new Schema(
  {
    token: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

export interface ITokenDocument extends IToken, Document {
  _id: ObjectId
}

const Token = dbAuth.model<ITokenDocument>("Token", TokenSchema)

export default Token
