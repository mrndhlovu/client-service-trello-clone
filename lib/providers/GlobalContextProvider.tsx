import { createContext, useCallback, useContext, useState } from "react"
import { useToast } from "@chakra-ui/react"

import { checkStringIncludes } from "../../util"
import { clientRequest } from "../../api"
import { IBoard, useAuth } from "."
import { useLocalStorage } from "../hooks"

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
  const { refreshToken } = useAuth()

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

  const rehydrateBoardsList = useCallback(
    (newBoard: IBoard) => {
      setBoards(prev => [
        ...prev.map(board => (board?.id === newBoard?.id ? newBoard : board)),
      ])
    },
    [boards]
  )
  const saveBoardChanges = useCallback(
    async (update: IBoard, boardId?: string) => {
      const id = boardId

      await clientRequest
        .updateBoard(update, id)
        .then(res => rehydrateBoardsList(res?.data))
        .catch(err => {
          if (checkStringIncludes(err?.message, ["expired", "Authorization"])) {
            const response = refreshToken()

            if (response) {
              return saveBoardChanges(update, id)
            }
          }
        })
    },
    []
  )

  const handleStarBoard = useCallback((board?: IBoard) => {
    const update = {
      "prefs.starred": !Boolean(board?.prefs!?.starred === "true"),
    }

    return saveBoardChanges(update, board.id)
  }, [])

  const updateBoardsState = useCallback(newBoards => {
    setBoards(newBoards)
  }, [])

  const notify = useCallback(
    (msg: IToastProps) => {
      const data = {
        title: msg.title,
        status: msg.status || "success",
        duration: 9000,
        isClosable: true,
        position: msg.placement || "top-right",
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
        boards,
        darkMode: theme?.darkMode,
        handleModeChange,
        handleStarBoard,
        notify,
        rehydrateBoardsList,
        updateBoardsState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

interface IDefaultGlobalState {
  boards: IBoard[]
  darkMode: boolean
  handleModeChange: () => void
  handleStarBoard: (board?: IBoard) => void
  notify: (option: IToastProps) => void
  updateBoardsState: (boards: IBoard[]) => void
  rehydrateBoardsList: (board: IBoard) => void
}

export const GlobalContext = createContext<IDefaultGlobalState>(
  {} as IDefaultGlobalState
)

export const useGlobalState = () => useContext(GlobalContext)

export { GlobalContextProvider }
