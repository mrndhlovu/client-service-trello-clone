import { GetServerSidePropsContext } from "next"
import { getBoardById } from "../../api"
import { withAuthComponent, withAuthServerSideProps } from "../../lib/hocs"
import { IBoard } from "../../lib/providers"

interface IProps {
  data: IBoard
}

const Board = ({ data }: IProps) => {
  return <div>Board: {data?.title}</div>
}

export const getServerSideProps = withAuthServerSideProps(
  async (ctx: GetServerSidePropsContext) => {
    return await getBoardById(ctx.req?.headers, ctx?.params?.id as string)
      .then(res => res?.data)
      .catch(err => err?.response)
  },
  { auth: true }
)
export default withAuthComponent(Board)
