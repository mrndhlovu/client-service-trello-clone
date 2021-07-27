import styled from "styled-components"

import CardsList from "./CardsList"
import HomeSidebar from "./HomeSidebar"

const Container = styled.div``

const HomePage = () => {
  return (
    <Container>
      <HomeSidebar />
      <CardsList />
    </Container>
  )
}

export default HomePage
