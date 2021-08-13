import Link from "next/link"

import { AiOutlineHome } from "react-icons/ai"

import { ROUTES } from "../../util/constants"
import { useBoard } from "../../lib/hooks/context"
import HeaderAppListDropdown from "./leftsection/HeaderAppListDropdown"
import HeaderAuthDropdown from "./rightsection/HeaderAuthDropdown"
import HeaderBoardsDropdown from "./leftsection/HeaderBoardsDropdown"
import HeaderButton from "./HeaderButton"
import HeaderCreateOptionsDropdown from "./rightsection/HeaderCreateOptionsDropdown"
import HeaderInformationDropdown from "./rightsection/HeaderInformationDropdown"
import HeaderNotificationsDropdown from "./rightsection/HeaderNotificationsDropdown"
import HeaderSearchDropdown from "./leftsection/HeaderSearchDropdown"
import HeaderStyles from "./Styles"
import Logo from "./centersection/Logo"

const Header = () => {
  const { activeBoard } = useBoard()

  return (
    <HeaderStyles activeBoardColor={activeBoard?.bgColor}>
      <div className="header">
        <div className="header-left-content">
          <div className="header-left-icon-wrapper">
            <HeaderAppListDropdown />

            <Link href={ROUTES.home}>
              <a>
                <HeaderButton>
                  <AiOutlineHome />
                </HeaderButton>
              </a>
            </Link>

            <HeaderBoardsDropdown />
            <HeaderSearchDropdown />
          </div>
        </div>

        {/* <Logo /> */}

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
