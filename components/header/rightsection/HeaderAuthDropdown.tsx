import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { MenuItem } from "@chakra-ui/react"
import { FaRegUser } from "react-icons/fa"

import { UIDropdown } from "../../shared"
import { useAuth } from "../../../lib/hooks/context"
import { ROUTES } from "../../../util/constants"

const HeaderAuthDropdown = () => {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [userInitial, setUserInitials] = useState("")

  const HEADER_AUTH_MENU_OPTIONS = [
    {
      handleClick: () => router.push(`/${ROUTES.billing}`),
      key: "billing",
      title: "Billing",
    },
    { handleClick: logout, key: "logout", title: "Log out" },
  ]

  useEffect(() => {
    setUserInitials(user?.initials)
  }, [user])

  return (
    <UIDropdown
      className="header-auth-dropdown"
      heading="Account"
      toggle={
        <div className="header-auth-button">
          {userInitial ? (
            <span className="header-button-text">{userInitial}</span>
          ) : (
            <FaRegUser className="header-auth-user-icon" />
          )}
        </div>
      }
    >
      {HEADER_AUTH_MENU_OPTIONS.map((option, index) => (
        <MenuItem
          key={option?.key || index}
          onClick={option?.handleClick}
          className="header-dropdown-item-text"
        >
          {option?.title}
        </MenuItem>
      ))}
    </UIDropdown>
  )
}

export default HeaderAuthDropdown
