import { useRouter } from "next/router"

import { AiOutlineHome } from "react-icons/ai"

import { NextLink } from "../shared"
import { ROUTES } from "../../util/constants"
import HeaderAppListDropdown from "./leftsection/HeaderAppListDropdown"
import HeaderAuthDropdown from "./rightsection/HeaderAuthDropdown"
import HeaderBoardsDropdown from "./leftsection/HeaderBoardsDropdown"
import HeaderButton from "./HeaderButton"
import HeaderCreateOptionsDropdown from "./rightsection/HeaderCreateOptionsDropdown"
import HeaderInformationDropdown from "./rightsection/HeaderInformationDropdown"
import HeaderNotificationsDropdown from "./rightsection/HeaderNotificationsDropdown"
import HeaderSearchDropdown from "./leftsection/HeaderSearchDropdown"
import HeaderStyles from "./Styles"

const Header = () => {
  const router = useRouter()
  const isTransParent = Boolean(router.asPath.indexOf("board") !== -1)

  return (
    <HeaderStyles isTransParent={isTransParent}>
      <div className="header">
        <div className="header-left-content">
          <div className="header-left-icon-wrapper">
            <HeaderAppListDropdown />

            <NextLink href={ROUTES.home}>
              <HeaderButton>
                <AiOutlineHome />
              </HeaderButton>
            </NextLink>

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
