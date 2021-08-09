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
      <AuthContextProvider>
        <GlobalContextProvider>
          <ThemeProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </GlobalContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  )
}

export default AppComponent
