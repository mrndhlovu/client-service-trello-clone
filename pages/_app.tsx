import { AppProps } from "next/dist/next-server/lib/router/router"
import { ChakraProvider } from "@chakra-ui/react"
import {
  AuthContextProvider,
  GlobalContextProvider,
  ThemeProvider,
} from "../lib/providers"
import Layout from "../components/layout"

const AppComponent = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <ThemeProvider>
        <AuthContextProvider>
          <GlobalContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </GlobalContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </ChakraProvider>
  )
}

export default AppComponent
