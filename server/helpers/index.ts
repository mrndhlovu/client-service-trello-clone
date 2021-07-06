import { Response } from "express"

export const allowedBoardUpdateFields: string[] = [
  "accessLevel",
  "activities",
  "archived",
  "category",
  "comments",
  "description",
  "labels",
  "lists",
  "styles",
  "title",
]

export const editableUserFields = [
  "firstname",
  "lastname",
  "email",
  "password",
  "starred",
  "username",
  "avatar",
  "bio",
  "viewedRecent",
  "notifications",
]

export const generateAccessCookie = async (res: Response, token: string) => {
  const options = {
    maxAge: 3600 * 1000,
    httpOnly: true,
  }

  res.cookie("accesstoken", token, options)
}
