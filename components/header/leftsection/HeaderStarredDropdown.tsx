import { isEmpty } from "lodash"
import { IoIosArrowDown } from "react-icons/io"

import { UIDropdown } from "../../shared"
import { useGlobalState } from "../../../lib/providers"
import HeaderBoardStyles from "./HeaderBoardStyles"
import HeaderBoardGroup from "./HeaderBoardGroup"

const HeaderStarredDropdown = () => {
  const { boards } = useGlobalState()

  const starredBoards = boards?.filter(board => board.prefs.starred === "true")
  const hasBoards = !isEmpty(starredBoards)

  return (
    <UIDropdown
      className="header-board-dropdown-button"
      heading="Starred boards"
      toggle={
        <div className="header-board-button">
          <span className="header-board-text">Starred</span>
          <span>
            <IoIosArrowDown />
          </span>
        </div>
      }
    >
      <HeaderBoardStyles>
        <HeaderBoardGroup boards={starredBoards} category="starred" />

        {!hasBoards && (
          <p>Star important boards to access them quickly and easily.</p>
        )}
      </HeaderBoardStyles>
    </UIDropdown>
  )
}

export default HeaderStarredDropdown
