import { Request } from "express"
import { IUserDocument } from "../../models/User"

export interface IGetUserAuthInfoRequest extends Request {
  user?: IUserDocument
  token?: string
}
