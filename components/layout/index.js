import { useEffect, useState } from "react"
import { isEmpty } from "lodash"
import styled from "styled-components"

import { Col, Container, Row } from "react-bootstrap"

import { Notifications } from "../shared"
import { useAuth, useGlobalState } from "../../lib/hooks/context"
import Head from "./Head"
import Header from "../header/Header"
import ModeSwitch from "./ModeSwitch"
import NavSidebar from "./sidebar/NavSidebar"

export const siteTitle = "Trello clone"

const Main = styled.div`
  width: 100vw;
  height: 96vh;
  z-index: -1;

  .layout-content {
    margin-top: 4vh;
  }

  .sidebar {
    position: relative;
    width: 240px;
    height: 100%;
  }

  @media ${props => props.theme.device.mobileSm} {
    min-width: 400px;
    padding: 0;
    z-index: -1;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media ${props => props.theme.device.mobileLg} {
    overflow-y: scroll;
    .content {
      width: 100%;
    }
  }

  .main-content {
    padding-top: 37px;
    ${props => props.theme.mixins.flex("row", undefined, "flex-start")};

    @media ${props => props.theme.device.mobileLg} {
      flex-direction: column-reverse;
      width: 100%;
      margin-right: 0;
    }
  }
`

const Layout = ({ children }) => {
  const { lightMode, notifications } = useGlobalState()
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

      <Container fluid className="layout-content">
        <Row md="8" xs="12" className="main-content">
          <Col className="sidebar" sm="2">
            <NavSidebar />
          </Col>

          <Col className="content" xs="12" sm="7">
            {children}
          </Col>
        </Row>
      </Container>

      {mounted && <ModeSwitch />}
    </Main>
  )
}

export default Layout
