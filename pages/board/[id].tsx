import { GetServerSidePropsContext } from "next"

import ApiRequest from "../../api"
import Board from "../../components/board/Board"
import { withAuthComponent, withAuthSsp } from "../../lib/hocs"
import { BoardContextProvider, IBoard } from "../../lib/providers"

interface IProps {
  data: IBoard
}

const index = ({ data }: IProps) => {
  return (
    <BoardContextProvider board={data}>
      <Board board={data} />
    </BoardContextProvider>
  )
}

export const getServerSideProps = withAuthSsp(
  async (ctx: GetServerSidePropsContext) => {
    const ssrRequest = new ApiRequest(ctx.req?.headers)

    return await ssrRequest
      .getBoardById(ctx?.params?.id as string)
      .then(res => res?.data)
      .catch(err => err?.response)
  },
  { protected: true }
)
export default withAuthComponent(index)
