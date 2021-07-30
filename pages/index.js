import { getBoards } from "../api"
import { withAuthComponent, withAuthServerSideProps } from "../lib/hocs"

import { BoardContextProvider } from "../lib/providers"
import HomePage from "../components/home/HomePage"
import Layout from "../components/layout"

const LandingPage = ({ data }) => {
  return (
    <Layout>
      <BoardContextProvider boardList={data}>
        <HomePage />
      </BoardContextProvider>
    </Layout>
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
