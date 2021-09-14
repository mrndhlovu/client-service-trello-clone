import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

import { checkStringIncludes } from "../../util"
import { clientRequest } from "../../api"
import { ICardItem, IListItem } from "../../components/board/canvas/ListItem"
import { useAuth } from "."

export interface IBoard {
  lists?: IListItem[]
  cards?: ICardItem[]
  title?: string
  id?: string
  activeBg?: "image" | "color"
  prefs?: {
    color?: string
    image?: string
    starred: "true" | "false" | boolean
  }
  [key: string]: any
}

interface IProps {
  boardList?: IBoard[]
  children: ReactNode
}

const HomeContextProvider = ({ children, boardList }: IProps) => {
  const { refreshToken } = useAuth()

  const [boards, setBoards] = useState<IProps["boardList"]>([])

  const rehydrateBoardList = (newBoard: IBoard) => {
    const updatedList = boards.map(board =>
      board?.id === newBoard?.id ? newBoard : board
    )
    setBoards(updatedList)
  }

  const updateBoardsState = useCallback((newBoardsList: IBoard[]) => {
    setBoards(newBoardsList)
  }, [])

  const updateBoardWithRetry = useCallback(
    async (update: IBoard, boardId?: string) => {
      const id = boardId

      await clientRequest
        .updateBoard(update, id)
        .then(res => rehydrateBoardList(res?.data))
        .catch(err => {
          if (checkStringIncludes(err?.message, ["expired", "Authorization"])) {
            const response = refreshToken()

            if (response) {
              return updateBoardWithRetry(update, id)
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

    return updateBoardWithRetry(update, board.id)
  }, [])

  useEffect(() => {
    if (!boardList) return
    setBoards(boardList)
  }, [boardList])

  return (
    <HomeContext.Provider
      value={{
        boards,
        handleStarBoard,
        updateBoardsState,
      }}
    >
      {children}
    </HomeContext.Provider>
  )
}

interface IHomeContext {
  handleStarBoard: (board?: IBoard) => void
  boards?: IBoard[]
  updateBoardsState: (boards: IBoard[]) => void
}

export const HomeContext = createContext<IHomeContext>({} as IHomeContext)
export const useHomeContext = () => useContext(HomeContext)

export { HomeContextProvider }
