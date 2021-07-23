import { createContext, useContext } from "react"
import { HomeContextValueTypes } from "../../pages"

export const GlobalContext = createContext({})

export const ThemeContext = createContext(null)
export const HomeContext = createContext({})
export const AuthContext = createContext({})

export const useGlobalContext = () => useContext(GlobalContext)
export const useHomeContext = () => useContext(HomeContext)
export const useAuth = () => useContext(AuthContext)
