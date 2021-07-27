import { getBoards } from "../api"
import { HomeContext } from "../lib/hooks/context"
import HomePage from "../components/home/HomePage"
import { withAuthServerSideProps } from "../lib/hocs/withAuthSsp"
import { withAuthComponent } from "../lib/hocs/withAuthComponent"

const LandingPage = ({ data }) => {
  return (
    <HomeContext.Provider value={{ boards: data }}>
      <HomePage />
    </HomeContext.Provider>
  )
}

export const getServerSideProps = withAuthServerSideProps(
  async context => {
    return await getBoards(context)
      .then(res => res?.data)
      .catch(err => err?.response)
  },
  {
    auth: true,
  }
)

export default withAuthComponent(LandingPage)
