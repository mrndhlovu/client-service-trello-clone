import { IPlan } from "../components/profile/billing/BillingPlans"
import { IRequestError } from "../api"
import { isArray } from "lodash"
import { AxiosError } from "axios"

export const getErrorMessage = (data: IRequestError | AxiosError) => {
  let message: string | string[]
  const isArrayList = isArray(data.errors)

  if (isArrayList) {
    return (message = data.errors.map(error => error.message))
  }

  message =
    data?.errorMessage ??
    data?.data?.message ??
    data?.response?.data.message ??
    data?.message ??
    data?.data ??
    data

  return message
}

export const isBrowser = typeof window !== "undefined"

export const checkStringIncludes = (
  string: string,
  values: string[]
): boolean => {
  if (!string) return
  const stringValuesArray = string.split(" ")
  return values.some(value => stringValuesArray.includes(value))
}

export const getFilteredPlans = <T extends IPlan[]>(plans: T): IPlan[] => {
  const allowedPlans = ["basic", "gold"]
  const filteredPlans = []

  plans?.map(plan => {
    if (allowedPlans.includes(plan.metadata.plan)) {
      plan.metadata.plan === "basic"
      filteredPlans.push(plan)
    }
  })

  return filteredPlans
}

export const getActivePlans = (
  filteredPlans: IPlan[],
  plan: string
): IPlan[] => {
  const plans = filteredPlans.filter(option => option.metadata.plan === plan)

  const annualPlan = plans.find(option => option.recurring.interval === "year")
  const monthlyPlan = plans.find(
    option => option.recurring.interval === "month"
  )

  return [annualPlan, monthlyPlan]
}

export const getPendingPlan = (
  filteredPlans: IPlan[],
  options: { checkedPlan: string; billingMethod: string }
): IPlan => {
  const plan = filteredPlans.find(
    option =>
      option.metadata.plan === options.checkedPlan &&
      option.recurring.interval === options.billingMethod
  )

  return plan
}

export const getPlanDiscount = (
  monthlyPrice: number,
  annualPrice: number
): string => {
  const normalPrice = (monthlyPrice / 100) * 12
  const discountPrice = (annualPrice / 100 / 12) * 12

  const discount = (
    ((normalPrice - discountPrice) * normalPrice) /
    100
  ).toFixed(2)
  return `Save ${discount}%`
}
