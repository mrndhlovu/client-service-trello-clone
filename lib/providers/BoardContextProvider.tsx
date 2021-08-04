import { ReactNode, useEffect, useState } from "react"

import { updateBoard } from "../../api"
import { checkStringIncludes } from "../../util"
import { BoardContext, useAuth } from "../hooks/context"

export interface IBoard {
  [key: string]: any
}

interface IProps {
  boardList?: IBoard[]
}

const BoardContextProvider = ({ children, boardList }) => {
  const { refreshToken } = useAuth()

  const [boards, setBoards] = useState<IProps["boardList"]>([])
  const [activeBoard, setActiveBoard] = useState<IBoard | undefined | null>()

  const rehydrateBoardList = newBoard => {
    const updatedList = boards.map(board =>
      board?.id === newBoard?.id ? newBoard : board
    )
    setBoards(updatedList)
  }

  const updateBoardWithRetry = async (boardId: string, update: IBoard) => {
    await updateBoard(update, boardId)
      .then(res => rehydrateBoardList(res?.data))
      .catch(async err => {
        if (
          checkStringIncludes(err?.response?.data?.errors?.[0]?.message, [
            "expired",
            "Authorization",
          ])
        ) {
          const response = await refreshToken()

          if (response) {
            return updateBoardWithRetry(boardId, update)
          }
        }
      })
  }

  const handleStarBoard = (ev: MouseEvent, board: IBoard) => {
    ev.preventDefault()
    ev.stopPropagation()

    const update = {
      "prefs.starred": !Boolean(board?.prefs?.starred === "true"),
    }

    return updateBoardWithRetry(board.id, update)
  }

  const handleCreateBoard = () => {}

  useEffect(() => {
    setBoards(boardList)
  }, [boardList])

  return (
    <BoardContext.Provider
      value={{ handleCreateBoard, handleStarBoard, boards, activeBoard }}
    >
      {children}
    </BoardContext.Provider>
  )
}

export { BoardContextProvider }
