import styled from "styled-components"

import CardsList from "./CardsList"
import HomeSidebar from "./HomeSidebar"
import Layout from "../layout"

const Container = styled.div`
  margin: 0 10px;
  height: 97vh;
  overflow-y: auto;
`

const HomePage = () => {
  return (
    <Layout>
      <Container>
        <HomeSidebar />
        <CardsList />
      </Container>
    </Layout>
  )
}

export default HomePage
