import { TabPanel, TabPanels } from "@chakra-ui/react"

import { StripeContextProvider } from "../../lib/providers"
import Billing from "../../components/profile/Billing"
import ProfileLayout from "../../components/layout/ProfileLayout"
import UserProfileSettings from "../../components/profile/UserProfileSettings"

const TabOptions = () => {
  return (
    <ProfileLayout>
      <TabPanels>
        <TabPanel>
          <p>Profile and visiblity</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>

        <TabPanel>
          <p>Activity</p>
        </TabPanel>

        <TabPanel>
          <UserProfileSettings />
        </TabPanel>

        <TabPanel>
          <StripeContextProvider>
            <Billing />
          </StripeContextProvider>
        </TabPanel>
      </TabPanels>
    </ProfileLayout>
  )
}

export default TabOptions
