import { createContext, useContext } from "react"
import { HomeContextValueTypes } from "../../pages"
import {
  DefaultGlobalContextTypes,
  notificationsInitialState,
} from "../providers/GlobalContextProvider"

export const GlobalContext = createContext<DefaultGlobalContextTypes>({
  lightMode: false,
  handleModeChange: () => {},
  dismissNotification: () => {},
  notify: () => {},
  notifications: notificationsInitialState,
})

export const ThemeContext = createContext(null)
export const HomeContext = createContext<HomeContextValueTypes>({ cards: [] })

export const useGlobalContext = () => useContext(GlobalContext)
export const useHomeContext = () => useContext(HomeContext)
