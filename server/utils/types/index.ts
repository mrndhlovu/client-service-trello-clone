import { Request } from "express"
import { ObjectId } from "mongodb"

import { BoardDocument } from "../../models/Board"
import { IUserDocument } from "../../models/User"

export interface IGetUserAuthInfoRequest extends Request {
  user?: IUserDocument
  token?: string
  board: BoardDocument
}

export type RolesType = "admin" | "basic" | "guest"

export interface IRoleOptions {
  [role: string]: RolesType
}
