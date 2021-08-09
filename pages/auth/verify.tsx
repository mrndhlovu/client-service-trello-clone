import { GetServerSidePropsContext } from "next"

import { verifyAccount } from "../../api"
import { withAuthServerSideProps } from "../../lib/hocs"
import AccountVerificationPage from "../../components/auth/AccountVerificationPage"

const index = ({ data }) => {
  return <AccountVerificationPage isVerified={data?.isVerified} />
}

export const getServerSideProps = withAuthServerSideProps(
  async (context: GetServerSidePropsContext) => {
    const token = context.query.token as string

    return await verifyAccount(context?.req?.headers, token)
      .then(res => JSON.parse(JSON.stringify(res?.data)))
      .catch(err => JSON.parse(JSON.stringify(err)))
  },
  {
    auth: true,
  }
)

export default index
