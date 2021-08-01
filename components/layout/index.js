import { useEffect, useState } from "react"
import { isEmpty } from "lodash"

import { Notifications } from "../shared"
import { useAuth, useGlobalState } from "../../lib/hooks/context"
import Header from "../header/Header"
import ModeSwitch from "./ModeSwitch"

export const siteTitle = "Trello clone"

const Layout = ({ children }) => {
  const { lightMode, notifications } = useGlobalState()
  const { isAuthenticated } = useAuth()
  const [mounted, setMounted] = useState(false)

  const hasNotification = !isEmpty(notifications?.list)

  useEffect(() => {
    lightMode
      ? document.body.classList.add("light")
      : document.body.classList.remove("light")
  }, [lightMode])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {isAuthenticated && <Header />}
      {hasNotification && <Notifications />}
      {children}
      {mounted && <ModeSwitch />}
    </>
  )
}

export default Layout
