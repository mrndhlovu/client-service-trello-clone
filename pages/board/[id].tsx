import { GetServerSidePropsContext } from "next"

import { BoardContextProvider, IBoard } from "../../lib/providers"
import { ROUTES } from "../../util/constants"
import { withAuthComponent, withAuthSsp } from "../../lib/hocs"
import ApiRequest from "../../api"
import Board from "../../components/board/Board"

interface IProps {
  data: IBoard
}

const index = ({ data }: IProps) => {
  return data ? (
    <BoardContextProvider board={data}>
      <Board />
    </BoardContextProvider>
  ) : null
}

export const getServerSideProps = withAuthSsp(
  async (ctx: GetServerSidePropsContext) => {
    const ssrRequest = new ApiRequest(ctx.req?.headers)
    let hasData = false
    if (hasData) return null
    return await ssrRequest
      .getBoardById(ctx?.params?.id as string)
      .then(res => {
        hasData = true
        return res?.data
      })
      .catch(err => {
        return {
          redirect: {
            destination: ROUTES.home,
            permanent: false,
          },
        }
      })
  },
  { protected: true }
)
export default withAuthComponent(index)
