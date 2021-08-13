import { ProfileContextProvider } from "../../lib/providers"
import { withAuthComponent, withAuthServerSideProps } from "../../lib/hocs"
import TabOptions from "./TabOptions"

const ProfileLayout = () => {
  return (
    <ProfileContextProvider>
      <TabOptions />
    </ProfileContextProvider>
  )
}

export const getServerSideProps = withAuthServerSideProps()

export default withAuthComponent(ProfileLayout)
