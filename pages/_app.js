import "bootstrap/dist/css/bootstrap.css"

import { getCurrentUser } from "../apiRequests"

import Layout from "../components/layout"
import {
  AuthContextProvider,
  GlobalContextProvider,
} from "../helpers/providers"

const AppComponent = ({ Component, pageProps, authData }) => {
  return (
    <AuthContextProvider ssrAuthData={authData}>
      <GlobalContextProvider>
        <Layout authData={authData}>
          <Component {...pageProps} />
        </Layout>
      </GlobalContextProvider>
    </AuthContextProvider>
  )
}

AppComponent.getInitialProps = async appContext => {
  const authData = await getCurrentUser(appContext?.ctx?.req?.headers)
    .then(res => ({
      isAuthenticated: true,
      user: res?.data,
    }))
    .catch(err => {
      const errRes = JSON.stringify(err)

      return {
        isAuthenticated: false,
        reason: JSON.parse(errRes)?.message,
      }
    })
  let pageProps = {}

  // if (appContext.Component.getInitialProps) {
  //   pageProps = await appContext.Component.getInitialProps(appContext?.ctx)
  // }

  return { pageProps, authData }
}

export default AppComponent
