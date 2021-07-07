import { Response, NextFunction } from "express"
import jwt, { TokenExpiredError, JwtPayload } from "jsonwebtoken"

import { IGetUserAuthInfoRequest } from "../utils/types"
import User from "../models/User"

const auth = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const { TOKEN_SIGNATURE } = process.env

  try {
    const authHeader = req.headers?.authorization
    if (!authHeader) throw new Error("Authorization credentials are missing.")

    const token = authHeader.split(" ")?.[1]

    const decoded = <any>jwt.verify(
      token,
      TOKEN_SIGNATURE,
      (err: TokenExpiredError, payload: JwtPayload): JwtPayload => {
        if (err) throw new Error("Authorization credentials have expired.")

        return payload
      }
    )

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.access": token,
    })
    if (!user)
      throw new Error("Authorization credentials are wrong or have expired.")

    req.token = token
    req.user = user
    next()
  } catch (error) {
    res.status(401).send({ error: error.message })
  }
}

export default auth
