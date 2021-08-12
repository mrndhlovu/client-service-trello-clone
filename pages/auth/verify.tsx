import { GetServerSidePropsContext } from "next"

import { verifyAccount } from "../../api"
import { withAuthServerSideProps } from "../../lib/hocs"
import AccountVerification from "../../components/auth/AccountVerification"

interface IProps {
  data: {
    isVerified?: boolean
  }
}

const index = ({ data }: IProps) => {
  return <AccountVerification isVerified={data?.isVerified} />
}

export const getServerSideProps = withAuthServerSideProps(
  async (context: GetServerSidePropsContext) => {
    const token = context.query.token as string

    return await verifyAccount(context?.req?.headers, token)
      .then(res => JSON.parse(JSON.stringify(res?.data)))
      .catch(() => null)
  },
  {
    auth: false,
  }
)

export default index
