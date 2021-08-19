import ApiRequest, { serverRequest } from "../../api"
import { ROUTES } from "../../util/constants"
import { withAuthSsp } from "../../lib/hocs"
import LoginPage from "../../components/auth/LoginPage"

const login = () => <LoginPage />

export const getServerSideProps = withAuthSsp(
  async (ctx, currentUser) => {
    const from = ctx.req.headers.referer
    const cookie = ctx.req.cookies?.["express:sess"]
    const ssRequest = serverRequest(ctx.req.headers)
    const referredFromAuthRoute = Boolean(from) && from?.indexOf("auth") !== -1

    if (currentUser?.id && !currentUser.account.isVerified) {
      return {
        redirect: {
          destination: `/${ROUTES.verify}`,
          permanent: false,
        },
      }
    }

    if (currentUser?.account?.isVerified) {
      return {
        redirect: {
          destination: referredFromAuthRoute ? ROUTES.home : from,
          permanent: false,
        },
      }
    }

    if (cookie) {
      const response = await ssRequest
        .refreshAuthToken()
        .then(res => res)
        .catch(() => null)

      if (response?.status === 200) {
        return {
          redirect: {
            destination: referredFromAuthRoute ? ROUTES.home : from,
            permanent: false,
          },
        }
      }
    }

    return null
  },
  {
    protected: false,
  }
)

export default login
