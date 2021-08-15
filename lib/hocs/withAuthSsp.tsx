import { GetServerSidePropsContext, Redirect } from "next"
import { getCurrentUser, refreshAuthToken } from "../../api"
import { checkStringIncludes } from "../../util"
import { ROUTES } from "../../util/constants"
import { IUser } from "../providers"

interface IOptions {
  auth: boolean
  redirect?: Redirect
  replacePath?: string
}
export const withAuthServerSideProps = (
  getServerSideProps?: (
    context: GetServerSidePropsContext,
    currentUser?: { [key: string]: any }
  ) => Promise<any>,
  options?: IOptions
) => {
  return async (context: GetServerSidePropsContext) => {
    let currentUser: IUser

    await getCurrentUser(context?.req?.headers)
      .then(res => (currentUser = res?.data))
      .catch(() => {
        return (currentUser = {})
      })

    if (!currentUser && options?.auth) {
      return {
        redirect: {
          destination: `/${ROUTES.login}`,
          permanent: false,
        },
      }
    }

    if (getServerSideProps && getServerSideProps instanceof Function) {
      const data = await getServerSideProps(context, currentUser)

      if (options.redirect && !data) {
        return { redirect: options.redirect }
      }

      return { props: { currentUser, data } }
    }

    return { props: { currentUser } }
  }
}
