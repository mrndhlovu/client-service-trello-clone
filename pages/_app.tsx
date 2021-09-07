import { AppProps } from "next/dist/next-server/lib/router/router"
import { ChakraProvider } from "@chakra-ui/react"
import { ReactQueryDevtools } from "react-query-devtools"
import {
  AuthContextProvider,
  GlobalContextProvider,
  ThemeProvider,
} from "../lib/providers"
import Layout from "../components/layout"

const AppComponent = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <ChakraProvider>
        <AuthContextProvider>
          <GlobalContextProvider>
            <>
              <Layout>
                <Component {...pageProps} />
              </Layout>
              <ReactQueryDevtools initialIsOpen={false} />
            </>
          </GlobalContextProvider>
        </AuthContextProvider>
      </ChakraProvider>
    </ThemeProvider>
  )
}

export default AppComponent
