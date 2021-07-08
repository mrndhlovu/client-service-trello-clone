import Link from "next/link"

import { AiOutlineExclamationCircle, AiOutlineHome } from "react-icons/ai"
import { BsFillGrid3X3GapFill, BsFileCheck } from "react-icons/bs"
import { CgBoard } from "react-icons/cg"
import { FiBell, FiPlus } from "react-icons/fi"

import { ROUTES, APP_NAME } from "../../util/constants"
import HeaderStyles from "./Styles"
import HeaderButton from "./HeaderButton"

const Header = () => {
  let activeBoardColor
  return (
    <HeaderStyles activeBoardColor={activeBoardColor}>
      <div className="header">
        <div className="header-left-content">
          <div className="header-left-icon-wrapper">
            <HeaderButton>
              <BsFillGrid3X3GapFill />
            </HeaderButton>
            <Link href={`/${ROUTES.home}`}>
              <HeaderButton>
                <AiOutlineHome />
              </HeaderButton>
            </Link>

            <button className="header-board-button">
              <span>
                <CgBoard />
              </span>
              <span>Boards</span>
            </button>
          </div>
        </div>
        <div className="header-logo-content">
          <Link href={`/${ROUTES.home}`}>
            <span className="header-logo-text">
              <span>
                <BsFileCheck />
              </span>
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className="header-right-content">
          <div className="header-right-icon-wrapper">
            <HeaderButton>
              <FiPlus />
            </HeaderButton>
            <HeaderButton>
              <FiBell />
            </HeaderButton>
            <HeaderButton>
              <AiOutlineExclamationCircle />
            </HeaderButton>

            <button className="header-auth-button">
              <span className="header-button-text">MN</span>
            </button>
          </div>
        </div>
      </div>
    </HeaderStyles>
  )
}

export default Header
