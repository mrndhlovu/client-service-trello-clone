import axios from "axios"
import { ICardDetails } from "../lib/hooks/context"

import { isBrowser } from "../util"

import endpoints from "./endpoints"

const CLUSTER_SERVICE_NAME =
  "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local"

const axiosInstance = axios.create({
  baseURL: isBrowser ? "/api" : `${CLUSTER_SERVICE_NAME}/api`,
  headers: isBrowser ? {} : { Host: "tusks.dev" },
})

export interface ISignupCredentials {
  username: string
  email: string
  password: string
}

export interface ILoginCredentials {
  identifier: string
  password: string
}

export interface INewBoardData {
  title: string
  prefs: {
    image?: string
    color?: string
  }
}

export interface ISsrHeaders {}

export const signupUser = async (userData: ISignupCredentials) =>
  await axiosInstance.post(endpoints.signup, userData)

export const logoutUser = async () => await axiosInstance.get(endpoints.logout)

export const loginUser = async (data: ILoginCredentials) =>
  await axiosInstance.post(endpoints.login, data)

export const getCurrentUser = async (ssrHeaders: ISsrHeaders) => {
  if (ssrHeaders) {
    axiosInstance.defaults["headers"] = ssrHeaders
  }

  return await axiosInstance.get(endpoints.currentUser)
}

export const refreshAuthToken = async () => {
  return await axiosInstance.get(endpoints.refreshToken)
}

export const createNewBoard = async (data: INewBoardData) => {
  return await axiosInstance.post(endpoints.createBoard, data)
}

interface IUpdateBoardData {
  [key: string]: any
}

export const getBoards = async (ssrHeaders: ISsrHeaders) => {
  if (ssrHeaders) {
    axiosInstance.defaults["headers"] = ssrHeaders
  }

  return await axiosInstance.get(endpoints.boards)
}

export const getBoardById = async (
  ssrHeaders: ISsrHeaders,
  boardId: string
) => {
  if (ssrHeaders) {
    axiosInstance.defaults["headers"] = ssrHeaders
  }

  return await axiosInstance.get(`${endpoints.boards}/${boardId}`)
}

export const updateBoard = async (data: IUpdateBoardData, boardId: string) => {
  return await axiosInstance.patch(`${endpoints.boards}/${boardId}`, data)
}

export const createCustomerSubscription = async (data: ICardDetails) => {
  return await axiosInstance.post(endpoints.payments, data)
}

export const verifyAccount = async (ssrHeaders: ISsrHeaders, token: string) => {
  if (ssrHeaders) {
    axiosInstance.defaults["headers"] = ssrHeaders
  }

  return await axiosInstance.get(`${endpoints.verify}/${token}`)
}
