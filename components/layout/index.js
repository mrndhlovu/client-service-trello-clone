import { useEffect } from "react"
import { isEmpty } from "lodash"
import styled from "styled-components"

import { Notifications } from "../shared"
import { ThemeProvider } from "../../helpers/providers"
import { useAuth, useGlobalContext } from "../../helpers/hooks/context"
import Head from "./Head"
import ModeSwitch from "./ModeSwitch"
import Header from "../header/Header"

export const siteTitle = "Trello clone"

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  z-index: -1;

  @media ${props => props.theme.device.mobileSm} {
    min-width: 400px;
    overflow-x: scroll;
    padding: 0;
    z-index: -1;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .main-content {
    padding-top: 37px;
  }
`

const Layout = ({ children }) => {
  const { lightMode, notifications } = useGlobalContext()
  const { isAuthenticated } = useAuth()

  const hasNotification = !isEmpty(notifications?.list)

  useEffect(() => {
    lightMode
      ? document.body.classList.add("light")
      : document.body.classList.remove("light")
  }, [lightMode])

  return (
    <ThemeProvider>
      <Main>
        <Head siteTitle={siteTitle} />
        {hasNotification && <Notifications />}
        {isAuthenticated && <Header />}
        <ModeSwitch />
        <section className="main-content">{children}</section>
      </Main>
    </ThemeProvider>
  )
}

export default Layout
