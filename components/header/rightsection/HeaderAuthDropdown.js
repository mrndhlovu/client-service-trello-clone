import { Dropdown } from "react-bootstrap"
import { FaRegUser } from "react-icons/fa"

import { UIDropdown } from "../../shared"
import { useAuth } from "../../../helpers/hooks/context"

const HeaderAuthDropdown = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  const HEADER_AUTH_MENU_OPTIONS = [
    { handleClick: handleLogout, key: "logout", title: "Log out" },
  ]

  return (
    <UIDropdown
      className="header-auth-dropdown"
      heading="Account"
      toggle={
        user?.initials ? (
          <span className="header-button-text">{user?.initials}</span>
        ) : (
          <FaRegUser className="header-auth-user-icon" />
        )
      }
    >
      {HEADER_AUTH_MENU_OPTIONS.map((option, index) => (
        <Dropdown.Item
          key={option?.key || index}
          onClick={option?.handleClick}
          className="header-dropdown-item-text"
        >
          {option?.title}
        </Dropdown.Item>
      ))}
    </UIDropdown>
  )
}

export default HeaderAuthDropdown
