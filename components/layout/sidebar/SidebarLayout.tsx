import styled from "styled-components"

import { Box, Grid, GridItem } from "@chakra-ui/react"

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
      <Box fluid className="layout-content">
        <Grid md="12" className="main-content">
          <GridItem className="sidebar">
            <NavSidebar />
          </GridItem>
          <GridItem className="content home">{children}</GridItem>
        </Grid>
      </Box>
    </Main>
  )
}

export default SidebarLayout
