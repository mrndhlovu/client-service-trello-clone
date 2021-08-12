import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import { createCustomerSubscription } from "../../api"
import { ICardDetails, StripeContext } from "../hooks/context"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const StripeContextProvider = ({ children }) => {
  const createSubscription = async (data: ICardDetails) => {
    await createCustomerSubscription(data)
      .then(res => res.data)
      .catch(err => err.response.data)
  }

  return (
    <StripeContext.Provider
      value={{
        createSubscription,
      }}
    >
      <Elements stripe={stripePromise}>{children}</Elements>
    </StripeContext.Provider>
  )
}

export { StripeContextProvider }
