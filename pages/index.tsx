import { HomeContextProvider, IBoard, Workspace } from "../lib/providers"
import { withAuthComponent, withAuthSsp } from "../lib/hocs"
import ApiRequest from "../api"
import HomePage from "../components/home/HomePage"

interface IProps {
  data?: { boards: IBoard[]; workspaces: Workspace[] }
}

const LandingPage = ({ data }: IProps) => {
  return (
    <HomeContextProvider data={data}>
      <HomePage />
    </HomeContextProvider>
  )
}

export const getServerSideProps = withAuthSsp(
  async context => {
    const ssRequest = new ApiRequest(context?.req?.headers)

    const boards = await ssRequest
      .getBoards()
      .then(res => res?.data)
      .catch(() => null)

    const notifications = await ssRequest
      .getNotifications()
      .then(res => res?.data)
      .catch(() => null)

    const templates = await ssRequest
      .getTemplates()
      .then(res => res?.data)
      .catch(() => null)

    const workspaces = await ssRequest
      .getWorkspaces()
      .then(res => res?.data)
      .catch(() => null)

    const response = { boards, workspaces, templates, notifications }

    return response
  },
  {
    protected: true,
  }
)

export default withAuthComponent(LandingPage)
