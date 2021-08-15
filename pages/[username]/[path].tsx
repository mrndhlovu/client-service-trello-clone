import { GetServerSidePropsContext } from "next"
import { TabPanel, TabPanels } from "@chakra-ui/react"

import { getBillingHistory, getBillingOptions } from "../../api"
import { IUser, StripeContextProvider } from "../../lib/providers"
import { ROUTES } from "../../util/constants"
import { withAuthComponent, withAuthServerSideProps } from "../../lib/hocs"
import Billing from "../../components/profile/billing/Billing"
import ProfileLayout from "../../components/layout/ProfileLayout"
import UserProfileSettings from "../../components/profile/UserProfileSettings"

const index = ({ data }) => {
  return (
    <ProfileLayout>
      <TabPanels>
        <TabPanel>
          <p>Profile and visibility</p>
        </TabPanel>

        <TabPanel>
          <p>Activity</p>
        </TabPanel>

        <TabPanel>
          <p>Cards</p>
        </TabPanel>

        <TabPanel>
          <UserProfileSettings />
        </TabPanel>

        <TabPanel>
          <StripeContextProvider data={data}>
            <Billing />
          </StripeContextProvider>
        </TabPanel>
      </TabPanels>
    </ProfileLayout>
  )
}

export const getServerSideProps = withAuthServerSideProps(
  async (context: GetServerSidePropsContext, currentUser: IUser) => {
    const { username, path } = context.params
    let data: {}
    if (!username || username !== currentUser.username) return null

    if (path === "billing") {
      const products = await getBillingOptions(context.req.headers)
        .then(res => res.data.data)
        .catch(() => null)

      data = { products: products || [] }
    }
    return data || {}
  },
  {
    auth: true,
    redirect: {
      destination: `/${ROUTES.login}`,
      permanent: false,
    },
  }
)

export default withAuthComponent(index)
