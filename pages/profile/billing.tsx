import { withAuthComponent, withAuthServerSideProps } from "../../lib/hocs"

import Billing from "../../components/subscriptions/Billing"
import { StripeContextProvider } from "../../lib/providers"
import Layout from "../../components/layout"

const Index = () => {
  return (
    <Layout>
      <StripeContextProvider>
        <Billing />
      </StripeContextProvider>
    </Layout>
  )
}

export const getServerSideProps = withAuthServerSideProps()
export default withAuthComponent(Index)
