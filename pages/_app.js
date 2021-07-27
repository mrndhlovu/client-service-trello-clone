import "bootstrap/dist/css/bootstrap.css"

import Layout from "../components/layout"
import {
  AuthContextProvider,
  GlobalContextProvider,
  ThemeProvider,
} from "../lib/providers"

const AppComponent = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <GlobalContextProvider>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </GlobalContextProvider>
    </AuthContextProvider>
  )
}

export default AppComponent
