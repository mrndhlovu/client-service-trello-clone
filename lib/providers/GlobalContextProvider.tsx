import { useToast } from "@chakra-ui/react"
import { createContext, useCallback, useContext, useState } from "react"

import { useLocalStorage } from "../hooks"
import { IBoard } from "."

export type IUIRequestError = string[]

export interface IToastProps {
  title?: string
  description: string | string[]
  status?: "info" | "warning" | "success" | "error"
  placement?:
    | "top-right"
    | "top"
    | "top-left"
    | "bottom-left"
    | "bottom-right"
    | "bottom"
}

export interface IThemeMode {
  darkMode: boolean
}

const GlobalContextProvider = ({ children }) => {
  const toast = useToast()
  const [theme, setTheme] = useLocalStorage<string, IThemeMode>("theme", {
    darkMode: false,
  })
  const [boards, setBoards] = useState<IBoard[]>([])

  const handleModeChange = () => {
    return setTheme((prev: IThemeMode) => {
      return { ...prev, darkMode: !prev?.darkMode }
    })
  }

  const handleUpdateBoardState = useCallback(newBoards => {
    setBoards(newBoards)
  }, [])

  const notify = useCallback(
    (msg: IToastProps) => {
      const data = {
        title: msg.title,
        status: msg.status || "success",
        duration: 9000,
        isClosable: true,
        position: msg.placement || "bottom",
      }

      if (typeof msg.description === "string") {
        return toast({
          ...data,
          description: msg.description,
        })
      }

      return msg.description.map(desc =>
        toast({
          ...data,
          description: desc,
        })
      )
    },
    [toast]
  )

  return (
    <GlobalContext.Provider
      value={{
        handleModeChange,
        darkMode: theme?.darkMode,
        notify,
        handleUpdateBoardState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

interface IDefaultGlobalState {
  darkMode: boolean
  handleModeChange: () => void
  notify: (option: IToastProps) => void
  handleUpdateBoardState: (boards: IBoard[]) => void
}

export const GlobalContext = createContext<IDefaultGlobalState>(
  {} as IDefaultGlobalState
)

export const useGlobalState = () => useContext(GlobalContext)

export { GlobalContextProvider }
