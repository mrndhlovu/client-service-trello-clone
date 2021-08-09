import { GetServerSidePropsContext } from "next"
import { getCurrentUser } from "../../api"
import { ROUTES } from "../../util/constants"

interface IOptions {
  auth: boolean
}
export const withAuthServerSideProps = (
  getServerSideProps?: (
    context: GetServerSidePropsContext,
    currentUser?: { [key: string]: any }
  ) => Promise<any>,
  options?: IOptions
) => {
  return async (context: GetServerSidePropsContext) => {
    const currentUser = await getCurrentUser(context?.req?.headers)
      .then(res => JSON.parse(JSON.stringify(res?.data)))
      .catch(() => null)

    if (!currentUser && options?.auth) {
      return {
        redirect: {
          destination: ROUTES.login,
          permanent: false,
        },
      }
    }

    if (getServerSideProps && getServerSideProps instanceof Function) {
      const data = await getServerSideProps(context, currentUser)

      return { props: { currentUser, data } }
    }

    return { props: { currentUser, data: { props: { currentUser } } } }
  }
}
