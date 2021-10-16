import { isEmpty } from "lodash"
import { IoIosArrowDown } from "react-icons/io"

import { UIDropdown } from "../../shared"
import { useGlobalState, useAuth } from "../../../lib/providers"
import HeaderBoardStyles from "./HeaderBoardStyles"
import HeaderBoardGroup from "./HeaderBoardGroup"

const HeaderViewedRecentDropdown = () => {
  const { boards } = useGlobalState()
  const { user } = useAuth()
  const viewedRecentBoards = boards
    ?.filter(board => user.viewedRecent.includes(board.id))
    .sort((a, b) => {
      const dateA = new Date(a.lastViewed).getTime()
      const dateB = new Date(b.lastViewed).getTime()

      return dateA < dateB ? 1 : -1
    })
    .slice(0, 6)
  const hasBoards = !isEmpty(viewedRecentBoards)

  return (
    <UIDropdown
      className="header-board-dropdown-button"
      heading="Viewed recent"
      toggle={
        <div className="header-board-button">
          <span className="header-board-text">Recent</span>
          <span>
            <IoIosArrowDown />
          </span>
        </div>
      }
    >
      <HeaderBoardStyles>
        <HeaderBoardGroup boards={viewedRecentBoards} category="recent" />

        {!hasBoards && <p>Recently viewed boards will be listed here.</p>}
      </HeaderBoardStyles>
    </UIDropdown>
  )
}

export default HeaderViewedRecentDropdown
