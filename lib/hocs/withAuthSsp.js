import { getCurrentUser } from "../../api"
import { ROUTES } from "../../util/constants"

export const withAuthServerSideProps = (getServerSideProps, options) => {
  return async context => {
    const currentUser = await getCurrentUser(context?.req?.headers)
      .then(res => JSON.parse(JSON.stringify(res?.data)))
      .catch(() => null)

    if (!currentUser && options.auth) {
      return {
        redirect: {
          destination: `/${ROUTES.login}`,
          permanent: false,
        },
      }
    }

    if (getServerSideProps && getServerSideProps instanceof Function) {
      const data = await getServerSideProps(context?.req?.headers, currentUser)

      return {
        props: {
          currentUser,
          data,
        },
      }
    }

    return { props: { currentUser, data: { props: { currentUser } } } }
  }
}
