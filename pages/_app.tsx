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
    <AuthContextProvider>
      <GlobalContextProvider>
        <ChakraProvider>
          <ThemeProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </ChakraProvider>
      </GlobalContextProvider>
    </AuthContextProvider>
  )
}

export default AppComponent
