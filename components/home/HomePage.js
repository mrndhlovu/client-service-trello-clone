import { Container, Row } from "react-bootstrap"

import BoardList from "./BoardList"
import HomeStyles from "./HomeStyles"

const HomePage = () => {
  return (
    <HomeStyles className="home">
      <BoardList />
    </HomeStyles>
  )
}

export default HomePage
