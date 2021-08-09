import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import { createCustomerSubscription } from "../../api"
import { ICardDetails, StripeContext } from "../hooks/context"
import { STRIPE_PUBLISHABLE_KEY } from "../../util/constants"

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

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
