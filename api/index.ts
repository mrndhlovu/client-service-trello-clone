import axios from "axios"
import { ICardDetails } from "../lib/hooks/context"

import { isBrowser } from "../util"

import END_POINTS from "./endpoints"

const axiosInstance = axios.create({
  baseURL: isBrowser ? "/api" : `${process.env.NEXT_PUBLIC_NGINX_BASE_URL}/api`,
  headers: isBrowser ? {} : { Host: process.env.NEXT_PUBLIC_HOST },
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

export interface ICodeVerification {
  code: string
}

export interface INewBoardData {
  title: string
  prefs: {
    image?: string
    color?: string
  }
}

export interface INewMfaData {
  preference?: {
    email?: boolean
    sms?: boolean
    authenticator?: boolean
  }
  code: string
}

export interface IPasswordConfirmation {
  password: string
}

export interface ISsrHeaders {}

export const signupUser = async (userData: ISignupCredentials) =>
  await axiosInstance.post(END_POINTS.signup, userData)

export const logoutUser = async () => await axiosInstance.get(END_POINTS.logout)

export const loginUser = async (data: ILoginCredentials) =>
  await axiosInstance.post(END_POINTS.login, data)

export const deleteUser = async () =>
  await axiosInstance.delete(END_POINTS.deleteUser)

export const getCurrentUser = async (ssrHeaders?: ISsrHeaders) => {
  if (ssrHeaders) {
    axiosInstance.defaults["headers"] = ssrHeaders
  }

  return await axiosInstance.get(END_POINTS.currentUser)
}

export const handleUpdateUser = async (data: { [key: string]: any }) => {
  return await axiosInstance.patch(END_POINTS.updateUser, data)
}

export const refreshAuthToken = async () => {
  return await axiosInstance.get(END_POINTS.refreshToken)
}

export const verifyMfaCode = async (data: ICodeVerification) => {
  return await axiosInstance.post(END_POINTS.verifyMfaCode, data)
}

export const createNewBoard = async (data: INewBoardData) => {
  return await axiosInstance.post(END_POINTS.createBoard, data)
}

export const connectMultiFactorAuth = async (data: INewMfaData) => {
  return await axiosInstance.post(END_POINTS.connectMfa, data)
}

export const generateQrCode = async () => {
  return await axiosInstance.get(END_POINTS.getQrCodeImage)
}

export const verifyUserCredentials = async (data: ILoginCredentials) => {
  return await axiosInstance.post(END_POINTS.verifyCredentials, data)
}

interface IUpdateBoardData {
  [key: string]: any
}

export const getBoards = async (ssrHeaders?: ISsrHeaders) => {
  if (ssrHeaders) {
    axiosInstance.defaults["headers"] = ssrHeaders
  }

  return await axiosInstance.get(END_POINTS.boards)
}

export const getBoardById = async (
  ssrHeaders: ISsrHeaders,
  boardId: string
) => {
  if (ssrHeaders) {
    axiosInstance.defaults["headers"] = ssrHeaders
  }

  return await axiosInstance.get(`${END_POINTS.boards}/${boardId}`)
}

export const updateBoard = async (data: IUpdateBoardData, boardId: string) => {
  return await axiosInstance.patch(`${END_POINTS.boards}/${boardId}`, data)
}

export const createCustomerSubscription = async (data: ICardDetails) => {
  return await axiosInstance.post(END_POINTS.payments, data)
}

export const verifyAccount = async (ssrHeaders: ISsrHeaders, token: string) => {
  if (ssrHeaders) {
    axiosInstance.defaults["headers"] = ssrHeaders
  }

  return await axiosInstance.get(`${END_POINTS.verify}/${token}`)
}

export const getBillingOptions = async (ssrHeaders?: ISsrHeaders) => {
  if (ssrHeaders) {
    axiosInstance.defaults["headers"] = ssrHeaders
  }

  return await axiosInstance.get(END_POINTS.getBillingOptions)
}

export const getBillingHistory = async (ssrHeaders?: ISsrHeaders) => {
  if (ssrHeaders) {
    axiosInstance.defaults["headers"] = ssrHeaders
  }

  return await axiosInstance.get(END_POINTS.getBillingHistory)
}

export const requestNewVerificationLink = async data => {
  return await axiosInstance.post(`${END_POINTS.requestLink}`, data)
}
