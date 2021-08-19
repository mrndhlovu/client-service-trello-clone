import { GetServerSidePropsContext } from "next"
import { serverRequest } from "../../api"
import { ROUTES } from "../../util/constants"
import { IUser } from "../providers"

interface IOptions {
  protected: boolean
}

export const withAuthSsp = (
  getServerSideProps?: (
    context: GetServerSidePropsContext,
    user?: IUser
  ) => Promise<any>,
  options?: IOptions
) => {
  return async (context: GetServerSidePropsContext) => {
    const api = serverRequest(context.req.headers)

    let currentUser: IUser | null

    await api
      .getCurrentUser()
      .then(res => {
        console.log(
          "🚀 ~ file: withAuthSsp.tsx ~ line 25 ~ return ~ res",
          res.data
        )
        return (currentUser = res?.data || null)
      })
      .catch(() => {
        return (currentUser = null)
      })

    if (currentUser?.id && !currentUser?.account.isVerified) {
      return {
        redirect: {
          destination: `/${ROUTES.verify}`,
          permanent: false,
        },
      }
    }

    if (!currentUser && options?.protected) {
      return {
        redirect: {
          destination: `/${ROUTES.login}`,
          permanent: false,
        },
      }
    }

    if (getServerSideProps && getServerSideProps instanceof Function) {
      const response = await getServerSideProps(context, currentUser)

      if (response?.redirect) {
        return response
      }

      return { props: { currentUser, data: response } }
    }

    return { props: { currentUser } }
  }
}
