import { Col, Container, Row } from "react-bootstrap"
import styled from "styled-components"

import NavSidebar from "./NavSidebar"

const Main = styled.main`
  position: relative;

  .sidebar {
    position: relative;
    width: 240px;
    height: 100%;
  }

  .layout-content {
    position: relative;
    margin-top: 4vh;
    width: 100vw;
    height: 96vh;
    overflow-y: scroll;
  }

  @media ${props => props.theme.device.mobileSm} {
    min-width: 400px;
    padding: 0;
    z-index: -1;

    &::-webkit-scrollbar {
      display: none;
    }

    .layout-content {
      margin-left: 0;
      margin-right: 0;
    }
  }

  @media ${props => props.theme.device.mobileLg} {
    .content {
      overflow-y: scroll;
    }
  }

  .main-content {
    padding-top: 37px;
    ${props => props.theme.mixins.flex("row", undefined, "flex-start")};

    @media ${props => props.theme.device.mobileLg} {
      flex-direction: column-reverse;
    }
  }
`

const SidebarLayout = ({ children }) => {
  return (
    <Main>
      <Container fluid className="layout-content">
        <Row md="12" className="main-content">
          <Col className="sidebar" sm="2">
            <NavSidebar />
          </Col>
          <Col className="content" md="8" xs="12" className="home">
            {children}
          </Col>
        </Row>
      </Container>
    </Main>
  )
}

export default SidebarLayout
