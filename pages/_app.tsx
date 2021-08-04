import { AppProps } from "next/dist/next-server/lib/router/router"
import { ChakraProvider } from "@chakra-ui/react"
import {
  AuthContextProvider,
  GlobalContextProvider,
  ThemeProvider,
} from "../lib/providers"

const AppComponent = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <GlobalContextProvider>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </GlobalContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  )
}

export default AppComponent
