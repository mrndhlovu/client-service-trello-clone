import { createContext, useContext } from "react"

export const GlobalContext = createContext({})

export const ThemeContext = createContext(null)
export const HomeContext = createContext({})
export const AuthContext = createContext({})
export const BoardContext = createContext({})

export const useGlobalState = () => useContext(GlobalContext)
export const useHomeContext = () => useContext(HomeContext)
export const useAuth = () => useContext(AuthContext)
export const useBoard = () => useContext(BoardContext)
