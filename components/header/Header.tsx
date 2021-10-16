import { useRouter } from "next/router"

import { AiOutlineHome } from "react-icons/ai"

import { NextLink } from "../shared"
import { ROUTES } from "../../util/constants"
import HeaderAppListDropdown from "./leftsection/HeaderAppListDropdown"
import HeaderAuthDropdown from "./rightsection/HeaderAuthDropdown"
import HeaderWorkspaceDropdown from "./leftsection/HeaderWorkspaceDropdown"
import HeaderViewedRecentDropdown from "./leftsection/HeaderViewedRecentDropdown"
import HeaderButton from "./HeaderButton"
import HeaderCreateOptionsDropdown from "./rightsection/HeaderCreateOptionsDropdown"
import HeaderNotificationsDropdown from "./rightsection/HeaderNotificationsDropdown"
import HeaderSearchDropdown from "./leftsection/HeaderSearchDropdown"
import HeaderStyles from "./Styles"
import HeaderStarredDropdown from "./leftsection/HeaderStarredDropdown"
import { useAuth } from "../../lib/providers"

const Header = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const isTransParent =
    Boolean(router.asPath.indexOf("board") !== -1) &&
    Boolean(router.asPath.indexOf("workspace") === -1)

  return isAuthenticated ? (
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

            <HeaderWorkspaceDropdown />
            <HeaderViewedRecentDropdown />
            <HeaderStarredDropdown />
            <HeaderSearchDropdown />
          </div>
        </div>

        {/* <Logo /> */}

        <div className="header-right-content">
          <div className="header-right-icon-wrapper">
            <HeaderCreateOptionsDropdown />

            <HeaderNotificationsDropdown />
            <HeaderAuthDropdown />
          </div>
        </div>
      </div>
    </HeaderStyles>
  ) : null
}

export default Header
