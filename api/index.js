import axios from "axios"

import { isBrowser } from "../util"

import endpoints from "./endpoints"

const CLUSTER_SERVICE_NAME =
  "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local"

const axiosInstance = axios.create({
  baseURL: isBrowser ? "/api" : `${CLUSTER_SERVICE_NAME}/api`,
  headers: isBrowser ? {} : { Host: "tusks.dev" },
})

export const signupUser = async data =>
  await axiosInstance.post(endpoints.signup, data)

export const logoutUser = async () => await axiosInstance.get(endpoints.logout)

export const loginUser = async data =>
  await axiosInstance.post(endpoints.login, data)

export const getCurrentUser = async ssrHeaders => {
  if (ssrHeaders) {
    axiosInstance.defaults["headers"] = ssrHeaders
  }

  return await axiosInstance.get(endpoints.currentUser)
}

export const getBoards = async ssrHeaders => {
  if (ssrHeaders) {
    axiosInstance.defaults["headers"] = ssrHeaders
  }

  return await axiosInstance.get(endpoints.boards)
}
