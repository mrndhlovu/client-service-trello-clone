import { useEffect, useState } from "react"
import { isEmpty } from "lodash"
import router from "next/router"
import styled from "styled-components"

import { Notifications } from "../shared"
import { ROUTES } from "../../util/constants"
import { useAuth, useGlobalContext } from "../../lib/hooks/context"
import Head from "./Head"
import Header from "../header/Header"
import ModeSwitch from "./ModeSwitch"

export const siteTitle = "Trello clone"

const Main = styled.div`
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
  const [mounted, setMounted] = useState(false)

  const hasNotification = !isEmpty(notifications?.list)

  useEffect(() => {
    lightMode
      ? document.body.classList.add("light")
      : document.body.classList.remove("light")
  }, [lightMode])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Main>
      <Head siteTitle={siteTitle} />
      {hasNotification && <Notifications />}
      {isAuthenticated && <Header />}

      <div className="main-content">{children}</div>
      {mounted && <ModeSwitch />}
    </Main>
  )
}

export default Layout
