import { Container } from "@chakra-ui/react"
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { useState } from "react"
import styled from "styled-components"
import { useAuth, useStripeContext } from "../../lib/hooks/context"

const StyledContainer = styled(Container)`
  form {
    margin: 0 auto;
    max-width: 600px;

    align-items: flex-start;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-right: -16px;
  }

  .card-input {
    background-color: transparent;
    border: none;
    border-radius: 3px;
    box-shadow: inset 0 0 0 2px #dfe1e6;
    box-sizing: border-box;
    color: #172b4d;
    font-size: 16px;
    height: 48px;
    line-height: 20px;
    margin-bottom: 12px;
    position: relative;
    transition-property: background-color, border-color, box-shadow;
    transition-duration: 85ms;
    transition-timing-function: ease;
    width: 100%;
  }

  h3 {
    color: #172b4d;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.006em;
    line-height: 20px;
    margin-top: 24px;
    margin: 30px 0 20px;
    display: flex;
  }
`

const Checkout = () => {
  const { createSubscription } = useStripeContext()
  const { user } = useAuth()
  const stripe = useStripe()

  const [priceId, setPriceId] = useState("price_1JLt3aCuWRJTIKQP7jUhram5")
  const [plan, setPlan] = useState("gold")

  const elements = useElements()

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement(CardNumberElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      billing_details: { email: user.email },
      card: cardElement,
    })

    if (error) {
      console.log("[error]", error)
    } else {
      console.log("[PaymentMethod]", paymentMethod)
      const response = await createSubscription({
        paymentMethodId: paymentMethod.id,
        customerId: user.account.customerId,
        priceId,
        plan,
      })

      console.log("[id]", response)
    }

    return {}
  }

  return (
    <StyledContainer>
      <h3>Pay with credit card</h3>
      <div>
        <form id="subscription-form" onSubmit={handleSubmit}>
          <CardNumberElement className="card-input" />
          <CardCvcElement className="card-input" />
          <CardExpiryElement className="card-input" />

          <button form="subscription-form" type="submit" disabled={!stripe}>
            Upgrade me
          </button>
        </form>
      </div>
    </StyledContainer>
  )
}

export default Checkout
