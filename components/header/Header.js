import Link from "next/link"

import { AiOutlineHome } from "react-icons/ai"

import { ROUTES } from "../../util/constants"
import HeaderAppListDropdown from "./leftsection/HeaderAppListDropdown"
import HeaderAuthDropdown from "./rightsection/HeaderAuthDropdown"
import HeaderBoardsDropdown from "./leftsection/HeaderBoardsDropdown"
import HeaderCreateOptionsDropdown from "./rightsection/HeaderCreateOptionsDropdown"
import HeaderInformationDropdown from "./rightsection/HeaderInformationDropdown"
import HeaderNotificationsDropdown from "./rightsection/HeaderNotificationsDropdown"
import HeaderButton from "./HeaderButton"
import HeaderSearchDropdown from "./leftsection/HeaderSearchDropdown"
import HeaderStyles from "./Styles"
import Logo from "./centersection/Logo"

const Header = () => {
  let activeBoardColor

  return (
    <HeaderStyles activeBoardColor={activeBoardColor}>
      <div className="header">
        <div className="header-left-content">
          <div className="header-left-icon-wrapper">
            <HeaderAppListDropdown />
            <Link href={`/${ROUTES.home}`}>
              <HeaderButton>
                <AiOutlineHome />
              </HeaderButton>
            </Link>

            <HeaderBoardsDropdown />
            <HeaderSearchDropdown />
          </div>
        </div>
        <Logo />

        <div className="header-right-content">
          <div className="header-right-icon-wrapper">
            <HeaderCreateOptionsDropdown />
            <HeaderInformationDropdown />
            <HeaderNotificationsDropdown />
            <HeaderAuthDropdown />
          </div>
        </div>
      </div>
    </HeaderStyles>
  )
}

export default Header
