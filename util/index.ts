import { IPlan } from "../components/profile/billing/BillingPlans"
import { IRequestError } from "../api"
import { isArray } from "lodash"
import { ILabelProps } from "../components/board/canvas/CardLabels"
import { LABEL_DEFAULT_OPTIONS } from "./constants"

export const getErrorMessage = (data: IRequestError) => {
  let message: string | string[]
  const isArrayList = isArray(data?.errors)

  if (isArrayList) {
    return (message = data?.errors.map(error => error.message))
  }

  return message || "Something went wrong"
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

export const getLabelOptions = (
  savedLabels: ILabelProps[],
  slice?: boolean
): ILabelProps[] => {
  if (slice) {
    const labelOptions = [
      ...LABEL_DEFAULT_OPTIONS.slice(0, 6).filter(
        label =>
          label.color !==
          savedLabels.find(item => item.color === label.color)?.color
      ),
      ...savedLabels,
    ]

    return labelOptions
  }

  return [
    ...LABEL_DEFAULT_OPTIONS.filter(
      label =>
        label.color !==
        savedLabels.find(item => item.color === label.color)?.color
    ),
    ...savedLabels,
  ]
}
