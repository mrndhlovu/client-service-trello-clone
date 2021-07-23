import "bootstrap/dist/css/bootstrap.css"

import { getCurrentUser } from "../apiRequests"

import Layout from "../components/layout"
import {
  AuthContextProvider,
  GlobalContextProvider,
} from "../helpers/providers"

const AppComponent = ({ Component, pageProps, userData }) => {
  return (
    <AuthContextProvider ssrAuthData={userData}>
      <GlobalContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalContextProvider>
    </AuthContextProvider>
  )
}

AppComponent.getInitialProps = async appContext => {
  const authData = {
    isAuthenticated: false,
    error: "",
    user: undefined,
  }
  const userData = await getCurrentUser(appContext?.ctx?.req?.headers)
    .then(res => {
      return {
        ...authData,
        isAuthenticated: true,
        user: res?.data,
      }
    })
    .catch(err => {
      const errRes = JSON.stringify(err)

      return {
        ...authData,
        isAuthenticated: false,
        error: JSON.parse(errRes)?.message,
      }
    })
  let pageProps = {}

  // if (appContext.Component.getInitialProps) {
  //   pageProps = await appContext.Component.getInitialProps(appContext?.ctx)
  // }

  return { pageProps, userData }
}

export default AppComponent
