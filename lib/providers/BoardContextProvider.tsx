import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/router"

import { clientRequest } from "../../api"
import { checkStringIncludes, getErrorMessage } from "../../util"
import { ROUTES } from "../../util/constants"
import { BoardContext, useAuth, useGlobalState } from "../hooks/context"

export interface IBoard {
  [key: string]: any
}

interface IProps {
  boardList?: IBoard[]
  board?: IBoard
  children: ReactNode
}

const BoardContextProvider = ({ children, boardList, board }: IProps) => {
  const { refreshToken } = useAuth()
  const { notify } = useGlobalState()
  const router = useRouter()

  const [boards, setBoards] = useState<IProps["boardList"]>([])
  const [activeBoard, setActiveBoard] = useState<IProps["board"]>()
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  const isStarred = Boolean(activeBoard?.prefs?.starred === "true")

  const rehydrateBoardList = (newBoard: IBoard) => {
    const updatedList = boards.map(board =>
      board?.id === newBoard?.id ? newBoard : board
    )
    setBoards(updatedList)
  }

  const updateBoardWithRetry = async (update: IBoard, boardId?: string) => {
    const id = activeBoard.id || boardId

    await clientRequest
      .updateBoard(update, id)
      .then(res =>
        boardList ? rehydrateBoardList(res?.data) : setActiveBoard(res.data)
      )
      .catch(err => {
        if (
          checkStringIncludes(err?.response?.data?.errors?.[0]?.message, [
            "expired",
            "Authorization",
          ])
        ) {
          const response = refreshToken()

          if (response) {
            return updateBoardWithRetry(update, id)
          }
        }
      })
  }

  const handleStarBoard = (board?: IBoard) => {
    const id = activeBoard.id || board.id

    const update = {
      "prefs.starred": !Boolean(
        (activeBoard || board)?.prefs!?.starred === "true"
      ),
    }

    return updateBoardWithRetry(update, id)
  }

  const handleCreateBoard = () => {}

  const handleDeleteBoard = async () => {
    await clientRequest
      .deleteBoard(activeBoard.id)
      .then(() => router.push(ROUTES.home))
      .catch(err => {
        notify({ description: getErrorMessage(err?.response.data) })
      })
  }

  const closeBoard = async () => {
    await clientRequest
      .updateBoard({ archived: "true" }, activeBoard.id)

      .then(() => router.push(ROUTES.home))
      .catch(err => {
        notify({ description: getErrorMessage(err?.response.data) })
      })
  }

  const toggleDrawerMenu = () => setDrawerOpen(prev => !prev)

  useEffect(() => {
    if (!boardList) return
    setBoards(boardList)
  }, [boardList])

  useEffect(() => {
    if (!board) return
    setActiveBoard(board)
  }, [board])

  return (
    <BoardContext.Provider
      value={{
        board: activeBoard,
        boards,
        drawerOpen,
        isStarred,
        handleCreateBoard,
        handleDeleteBoard,
        handleStarBoard,
        toggleDrawerMenu,
        handleUpdateBoard: updateBoardWithRetry,
        closeBoard,
        setActiveBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}

export { BoardContextProvider }
