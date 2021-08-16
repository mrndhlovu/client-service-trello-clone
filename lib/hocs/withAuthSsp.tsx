import { GetServerSidePropsContext, Redirect } from "next"
import { getCurrentUser } from "../../api"
import { ROUTES } from "../../util/constants"
import { IUser } from "../providers"

interface IOptions {
  protected: boolean
  redirect?: Redirect
  replacePath?: string
}

export const withAuthSsp = (
  getServerSideProps?: (
    context: GetServerSidePropsContext,
    user?: IUser
  ) => Promise<any>,
  options?: IOptions
) => {
  return async (context: GetServerSidePropsContext) => {
    let currentUser: IUser | null

    await getCurrentUser(context?.req?.headers)
      .then(res => (currentUser = res?.data || null))
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

      if (options?.redirect && !response) {
        return { redirect: options.redirect }
      }

      return { props: { currentUser, data: response } }
    }

    return { props: { currentUser } }
  }
}
