import { getBoards } from "../api"
import { withAuthComponent, withAuthSsp } from "../lib/hocs"

import { BoardContextProvider, IBoard } from "../lib/providers"
import HomePage from "../components/home/HomePage"

interface IProps {
  data?: IBoard[]
}

const LandingPage = ({ data }: IProps) => {
  return (
    <BoardContextProvider boardList={data}>
      <HomePage />
    </BoardContextProvider>
  )
}

export const getServerSideProps = withAuthSsp(
  async context => {
    return await getBoards(context?.req?.headers)
      .then(res => res?.data)
      .catch(() => null)
  },
  {
    protected: true,
  }
)

export default withAuthComponent(LandingPage)
