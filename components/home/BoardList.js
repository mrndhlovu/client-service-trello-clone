import { Col } from "react-bootstrap"
import { AiOutlineStar, AiOutlineClockCircle } from "react-icons/ai"
import { useBoard } from "../../lib/hooks/context"
import BoardsGroup from "./BoardsGroup"

const BoardList = () => {
  const { boards } = useBoard()

  return (
    <Col xs="12" md="12" className="home-all-boards">
      <BoardsGroup
        heading="Starred boards"
        icon={<AiOutlineStar size={22} />}
        boards={boards}
      />
      <BoardsGroup
        heading="Recently viewed"
        icon={<AiOutlineClockCircle size={22} />}
        boards={boards}
      />

      <BoardsGroup
        heading="YOUR WORKSPACES"
        icon={<AiOutlineClockCircle size={22} />}
        boards={boards}
        category="workspaces"
      />
    </Col>
  )
}

export default BoardList
