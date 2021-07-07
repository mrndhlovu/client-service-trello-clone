import { IRoleOptions } from "./types"

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

export const ROLES: IRoleOptions = {
  ADMIN: "admin",
  BASIC: "basic",
  GUEST: "guest",
}
