import { useEffect } from "react"
import { isEmpty } from "lodash"
import { GetServerSidePropsContext } from "next"

import {
  BoardContextProvider,
  IBoard,
  useGlobalState,
} from "../../lib/providers"
import { ROUTES } from "../../util/constants"
import { withAuthComponent, withAuthSsp } from "../../lib/hocs"
import ApiRequest, { clientRequest } from "../../api"
import Board from "../../components/board/Board"

interface IProps {
  data: IBoard
}

const index = ({ data }: IProps) => {
  const { updateBoardsState, boards } = useGlobalState()
  const hasBoards = !isEmpty(boards)

  useEffect(() => {
    if (hasBoards) return

    const getData = () => {
      clientRequest
        .getBoards()
        .then(res => updateBoardsState(res?.data))
        .catch(() => null)
    }
    getData()
  }, [hasBoards, updateBoardsState])

  return data ? (
    <BoardContextProvider board={data}>
      <Board />
    </BoardContextProvider>
  ) : null
}

export const getServerSideProps = withAuthSsp(
  async (ctx: GetServerSidePropsContext) => {
    const ssrRequest = new ApiRequest(ctx.req?.headers)

    return await ssrRequest
      .getBoardById(ctx?.params?.id as string)
      .then(res => res?.data)
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
