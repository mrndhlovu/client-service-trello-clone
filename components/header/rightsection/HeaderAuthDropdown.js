import { Dropdown } from "react-bootstrap"
import { FaRegUser } from "react-icons/fa"

import { UIDropdown } from "../../shared"
import { useAuth } from "../../../helpers/hooks/context"
import { useEffect, useState } from "react"

const HeaderAuthDropdown = () => {
  const { user, logout } = useAuth()
  const [userInitial, setUserInitials] = useState("")

  const handleLogout = () => {
    logout()
  }

  const HEADER_AUTH_MENU_OPTIONS = [
    { handleClick: handleLogout, key: "logout", title: "Log out" },
  ]

  useEffect(() => {
    setUserInitials(user?.initials)
  }, [user])

  return (
    <UIDropdown
      className="header-auth-dropdown"
      heading="Account"
      toggle={
        userInitial ? (
          <span className="header-button-text">{userInitial}</span>
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
