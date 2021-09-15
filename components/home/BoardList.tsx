import { useAuth, useGlobalState } from "../../lib/providers"
import BoardsGroup from "./BoardsGroup"

const BoardList = () => {
  const { boards } = useGlobalState()
  const { user } = useAuth()

  const starredBoards = boards.filter(board => board.prefs.starred === "true")
  const viewedRecentBoards = boards
    .filter(board => user.viewedRecent.includes(board.id))
    .reverse()

  return (
    <>
      <BoardsGroup
        heading="Starred boards"
        icon="star"
        boards={starredBoards}
        category="starred"
      />
      <BoardsGroup
        heading="Recently viewed"
        icon="clock"
        boards={viewedRecentBoards}
        category="recent"
      />

      <BoardsGroup
        heading="YOUR WORKSPACES"
        boards={boards}
        category="workspaces"
      />
    </>
  )
}

export default BoardList
