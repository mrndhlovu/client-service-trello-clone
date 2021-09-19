import { FiTrello } from "react-icons/fi"

import { UIDropdown } from "../../shared"
import { useGlobalState, useAuth } from "../../../lib/providers"
import HeaderBoardStyles from "./HeaderBoardStyles"
import HeaderBoardGroup from "./HeaderBoardGroup"

const HeaderBoardsDropdown = () => {
  const { boards } = useGlobalState()
  const { user } = useAuth()
  const starredBoards = boards.filter(board => board.prefs.starred === "true")
  const viewedRecentBoards = boards
    .filter(board => user.viewedRecent.includes(board.id))
    .reverse()

  return (
    <UIDropdown
      className="header-board-dropdown-button"
      heading="Boards"
      toggle={
        <div className="header-board-button">
          <span>
            <FiTrello />
          </span>
          <span className="header-board-text">Boards</span>
        </div>
      }
    >
      <HeaderBoardStyles>
        <HeaderBoardGroup
          icon="star"
          heading="Starred boards"
          boards={starredBoards}
          category="starred"
        />
        <HeaderBoardGroup
          heading="Viewed recent"
          boards={viewedRecentBoards}
          icon="clock"
          category="recent"
        />
        <HeaderBoardGroup
          heading="Workspaces"
          boards={boards}
          category="workspaces"
        />
      </HeaderBoardStyles>
    </UIDropdown>
  )
}

export default HeaderBoardsDropdown
