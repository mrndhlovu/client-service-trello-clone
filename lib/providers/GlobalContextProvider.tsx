import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { useToast } from "@chakra-ui/react"

import { checkStringIncludes } from "../../util"
import { clientRequest } from "../../api"
import { IBoard, useAuth, Workspace } from "."
import { useLocalStorage } from "../hooks"
import { useRouter } from "next/router"

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
  const { refreshToken, isAuthenticated } = useAuth()
  const { pathname } = useRouter()
  const toast = useToast()
  const [theme, setTheme] = useLocalStorage<string, IThemeMode>("theme", {
    darkMode: false,
  })
  const [boards, setBoards] = useState<IBoard[]>([])
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])

  const refetchBoardsAndWorkspaces =
    workspaces?.length === 0 && pathname !== "/" && isAuthenticated

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

  const updateInitialState = useCallback(data => {
    setBoards(data.boards)
    setWorkspaces(data.workspaces)
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

  useEffect(() => {
    if (!refetchBoardsAndWorkspaces) return
    ;(async () => {
      const promises = [
        clientRequest
          .getBoards()
          .then(res => res?.data)
          .catch(() => null),

        clientRequest
          .getWorkspaces()
          .then(res => res?.data)
          .catch(() => null),
      ]

      const data = await Promise.all(promises)

      setBoards(data?.[0])
      setWorkspaces(data?.[1])
    })()
  }, [refetchBoardsAndWorkspaces])

  return (
    <GlobalContext.Provider
      value={{
        boards,
        workspaces,
        darkMode: theme?.darkMode,
        handleModeChange,
        handleStarBoard,
        notify,
        rehydrateBoardsList,
        updateInitialState,
        setWorkspaces,
        setBoards,
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
  workspaces: Workspace[]
  updateInitialState: (boards: {
    boards?: IBoard[]
    workspaces?: Workspace[]
  }) => void
  rehydrateBoardsList: (board: IBoard) => void
  setWorkspaces: Dispatch<SetStateAction<Workspace[]>>
  setBoards: Dispatch<SetStateAction<IBoard[]>>
}

export const GlobalContext = createContext<IDefaultGlobalState>(
  {} as IDefaultGlobalState
)

export const useGlobalState = () => useContext(GlobalContext)

export { GlobalContextProvider }
