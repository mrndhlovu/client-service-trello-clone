import { BoardContextProvider, IBoard } from "../lib/providers"
import { withAuthComponent, withAuthSsp } from "../lib/hocs"
import ApiRequest from "../api"
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
    const ssRequest = new ApiRequest(context?.req?.headers)
    return await ssRequest
      .getBoards()
      .then(res => res?.data)
      .catch(() => null)
  },
  {
    protected: true,
  }
)

export default withAuthComponent(LandingPage)
