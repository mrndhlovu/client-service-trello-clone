import { getBoardById } from "../../api"
import { withAuthComponent, withAuthServerSideProps } from "../../lib/hocs"

const Board = ({ data }) => {
  return <div>Board: {data?.title}</div>
}

export const getServerSideProps = withAuthServerSideProps(
  async ({ req, params }) => {
    return await getBoardById(req?.headers, params.id)
      .then(res => res?.data)
      .catch(err => err?.response)
  },
  { auth: true }
)
export default withAuthComponent(Board)
