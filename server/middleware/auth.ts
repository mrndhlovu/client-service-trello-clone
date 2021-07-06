import { Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { IGetUserAuthInfoRequest } from "../helpers/types"

import User from "../models/User"

const auth = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const { TOKEN_SIGNATURE } = process.env
  try {
    const token = req.cookies?.accesstoken

    const decoded = <any>jwt.verify(token, TOKEN_SIGNATURE)
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    })
    if (!user) throw new Error()

    req.token = token
    req.user = user
    next()
  } catch (error) {
    res.status(401).send({ error: error.message })
  }
}

export default auth
