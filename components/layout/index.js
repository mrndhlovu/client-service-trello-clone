import { useEffect } from "react"
import { isEmpty } from "lodash"
import router from "next/router"
import styled from "styled-components"

import { Notifications } from "../shared"
import { ROUTES } from "../../util/constants"
import { ThemeProvider } from "../../helpers/providers"
import { useAuth, useGlobalContext } from "../../helpers/hooks/context"
import Head from "./Head"
import Header from "../header/Header"
import ModeSwitch from "./ModeSwitch"

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

  useEffect(() => {
    if (!isAuthenticated) return router.push(`/${ROUTES.login}`)
  }, [isAuthenticated])

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
