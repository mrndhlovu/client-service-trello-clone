import { useEffect, useState } from "react"
import { isEmpty } from "lodash"

import { useAuth, useGlobalState } from "../../lib/hooks/context"
import Header from "../header/Header"
import ModeSwitch from "./ModeSwitch"

export const siteTitle = "Trello clone"

const Layout = ({ children }) => {
  const { darkMode } = useGlobalState()
  const { isAuthenticated } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    darkMode
      ? document.body.classList.add("dark-mode")
      : document.body.classList.remove("dark-mode")
  }, [darkMode])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="layout">
      {isAuthenticated && <Header />}
      <div className="layout-children">{children}</div>
      {mounted && <ModeSwitch />}
    </div>
  )
}

export default Layout
