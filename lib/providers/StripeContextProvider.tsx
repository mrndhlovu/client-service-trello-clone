import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { reject } from "lodash"
import { resolveHref } from "next/dist/next-server/lib/router/router"
import { ReactNode } from "react"

import { createCustomerSubscription } from "../../api"
import { ICardDetails, StripeContext, useAuth } from "../hooks/context"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export interface IStripeProduct {
  [key: string]: any
}

export interface IStripeInvoice {
  periodEnd: string
  periodStart: string
  invoiceUrl: string
  invoiceId: string
  description: string
  billingMethod: string
  amountPaid: number
  isPaid: boolean
  invoicePdf: string
  currency: string
  [key: string]: any
}
interface IProps {
  data?: { products: IStripeProduct[]; invoices?: IStripeInvoice[] }
  children: ReactNode
}

const StripeContextProvider = ({ children, data }: IProps) => {
  const { fetchUser } = useAuth()

  const createSubscription = async (data: ICardDetails) => {
    return new Promise(async (resolve, reject) => {
      await createCustomerSubscription(data)
        .then(res => {
          fetchUser()
          return resolve(res.data)
        })
        .catch(err => reject("Subscription failed"))
    })
  }

  return (
    <StripeContext.Provider
      value={{
        createSubscription,
        products: data.products,
        invoices: data.invoices,
      }}
    >
      <Elements stripe={stripePromise}>{children}</Elements>
    </StripeContext.Provider>
  )
}

export { StripeContextProvider }
