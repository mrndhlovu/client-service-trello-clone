import styled from "styled-components"

import CardsList from "./CardsList"
import HomeSidebar from "./HomeSidebar"

const Container = styled.div`
  margin: 0 10px;
  height: 97vh;
  overflow-y: auto;
`

const HomePage = () => {
  return (
    <Container>
      <HomeSidebar />
      <CardsList />
    </Container>
  )
}

export default HomePage
