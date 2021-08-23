import axios, {
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios"
import { GetServerSidePropsContext } from "next"
import { ICardDetails } from "../lib/hooks/context"

import { isBrowser } from "../util"

import END_POINTS from "./endpoints"

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

export interface IRequestError {
  errors: [{ message: string; [key: string]: any }]
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

export interface ISsHeaders extends AxiosRequestConfig {
  [key: string]: any
}

interface IUpdateBoardData {
  [key: string]: any
}

class AxiosConfig {
  private instance = axios.create({
    baseURL: isBrowser
      ? "/api"
      : `${process.env.NEXT_PUBLIC_NGINX_BASE_URL}/api`,
    headers: isBrowser ? {} : { Host: process.env.NEXT_PUBLIC_HOST },
  })

  http: AxiosInstance
  constructor(public ssHeaders?: ISsHeaders) {
    this.http = this.instance

    this.http.interceptors.request.use(
      request => this.requestHandler(request),
      error => this.errorHandler(error)
    )

    this.http.interceptors.response.use(
      request => this.responseHandler(request),
      error => this.errorHandler(error)
    )
  }

  protected responseHandler = (response: AxiosResponse) => {
    return response
  }

  protected errorHandler = (error: Error) => {
    return Promise.reject(error)
  }

  protected requestHandler = (request: AxiosRequestConfig) => {
    request.headers = this.ssHeaders
    return request
  }
}

class ApiRequest extends AxiosConfig {
  constructor(ssHeaders?: ISsHeaders) {
    super(ssHeaders)
  }

  signupUser = async (userData: ISignupCredentials) =>
    await this.http.post(END_POINTS.signup, userData)

  logoutUser = async () => await this.http.get(END_POINTS.logout)

  loginUser = async (data: ILoginCredentials) =>
    await this.http.post(END_POINTS.login, data)

  deleteUser = async () => await this.http.delete(END_POINTS.deleteUser)

  getCurrentUser = async () => {
    return await this.http.get(END_POINTS.currentUser)
  }

  handleUpdateUser = async (data: { [key: string]: any }) => {
    return await this.http.patch(END_POINTS.updateUser, data)
  }

  refreshAuthToken = async () => {
    return await this.http.get(END_POINTS.refreshToken)
  }

  verifyMfaCode = async (data: ICodeVerification) => {
    return await this.http.post(END_POINTS.verifyMfaCode, data)
  }

  verifyAccount = async (token: string) => {
    return await this.http.get(`${END_POINTS.verify}/${token}`)
  }

  requestNewVerificationLink = async data => {
    return await this.http.post(`${END_POINTS.requestLink}`, data)
  }

  connectMultiFactorAuth = async (data: INewMfaData) => {
    return await this.http.post(END_POINTS.connectMfa, data)
  }

  generateQrCode = async () => {
    return await this.http.get(END_POINTS.getQrCodeImage)
  }

  createNewBoard = async (data: INewBoardData) => {
    return await this.http.post(END_POINTS.createBoard, data)
  }

  verifyUserCredentials = async (data: ILoginCredentials) => {
    return await this.http.post(END_POINTS.verifyCredentials, data)
  }

  getBoards = async () => {
    return await this.http.get(END_POINTS.boards)
  }

  getBoardById = async (boardId: string) => {
    return await this.http.get(`${END_POINTS.boards}/${boardId}`)
  }

  updateBoard = async (data: IUpdateBoardData, boardId: string) => {
    return await this.http.patch(`${END_POINTS.boards}/${boardId}`, data)
  }

  async deleteBoard(boardId: string) {
    return await this.http.delete(`${END_POINTS.boards}/${boardId}`)
  }
  async updateList(
    data: { [key: string]: any },
    options: { listId: string; boardId: string }
  ) {
    return await this.http.patch(
      `${END_POINTS.lists}/${options.boardId}/${options.listId}`,
      data
    )
  }

  async createList(data: { [key: string]: any }, boardId: string) {
    return await this.http.post(`${END_POINTS.lists}/create/${boardId}`, data)
  }

  async createCard(
    data: { [key: string]: any },
    options: { listId: string; boardId: string }
  ) {
    return await this.http.post(
      `${END_POINTS.cards}/${options.listId}/${options.boardId}`,
      data
    )
  }

  createCustomerSubscription = async (data: ICardDetails) => {
    return await this.http.post(END_POINTS.payments, data)
  }

  getBillingOptions = async () => {
    return await this.http.get(END_POINTS.getBillingOptions)
  }

  getBillingHistory = async () => {
    return await this.http.get(END_POINTS.getBillingHistory)
  }
}

export const clientRequest = new ApiRequest()
export const serverRequest = (headers: ISsHeaders) => new ApiRequest(headers)
export default ApiRequest
