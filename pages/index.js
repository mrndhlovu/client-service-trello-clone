import { getBoards } from "../api"
import { withAuthComponent, withAuthServerSideProps } from "../lib/hocs"

import HomePage from "../components/home/HomePage"
import { BoardContextProvider } from "../lib/providers"

const LandingPage = ({ data }) => {
  return (
    <BoardContextProvider boardList={data}>
      <HomePage />
    </BoardContextProvider>
  )
}

export const getServerSideProps = withAuthServerSideProps(
  async context => {
    return await getBoards(context?.req?.headers)
      .then(res => res?.data)
      .catch(err => err?.response)
  },
  {
    auth: true,
  }
)

export default withAuthComponent(LandingPage)
