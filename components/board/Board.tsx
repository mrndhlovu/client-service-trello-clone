import styled from "styled-components"

import { ListContextProvider, useBoard } from "../../lib/providers"

import BoardHeader from "./BoardHeader"
import BoardCanvas from "./canvas/BoardCanvas"
import BoardDrawer from "./sidebar/BoardSidebar"

interface IBoardStyles {
  bgColor: string
  image: string
}

interface IBoardProps {
  board: {
    [key: string]: any
  }
}

const Container = styled.div<IBoardStyles>`
  height: 100vh;
  width: 100vw;
  background-color: ${props => props?.bgColor};
  background-image: url("${props => props?.image}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`

const Content = styled.div`
  ${props => props.theme.mixins.flex("column", "flex-start")};
  padding-top: 37px;
  width: 100vw;
  height: 100vh;
  position: relative;
`

const Board = () => {
  const { board } = useBoard()
  return (
    <>
      <Container image={board?.prefs?.image} bgColor={board?.prefs?.color}>
        <Content>
          <BoardHeader />
          <ListContextProvider>
            <BoardCanvas />
          </ListContextProvider>
          <BoardDrawer />
        </Content>
      </Container>
    </>
  )
}

export default Board
