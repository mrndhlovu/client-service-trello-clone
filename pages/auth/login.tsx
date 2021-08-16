import { refreshAuthToken } from "../../api"
import { ROUTES } from "../../util/constants"
import { withAuthSsp } from "../../lib/hocs"
import LoginPage from "../../components/auth/LoginPage"

const login = () => <LoginPage />

export const getServerSideProps = withAuthSsp(
  async (ctx, currentUser) => {
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
          destination: ROUTES.home,
          permanent: false,
        },
      }
    }

    if (ctx.req.cookies?.["express:sess"]) {
      const response = await refreshAuthToken()
        .then(res => res)
        .catch(() => null)

      if (response?.status === 200) {
        return {
          redirect: {
            destination: ROUTES.home,
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
