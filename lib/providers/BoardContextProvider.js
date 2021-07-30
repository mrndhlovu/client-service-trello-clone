import { useEffect, useState } from "react"

import { updateBoard } from "../../api"
import { checkStringIncludes } from "../../util"
import { BoardContext, useAuth } from "../hooks/context"

const BoardContextProvider = ({ children, boardList }) => {
  const { refreshToken, logout } = useAuth()

  const [boards, setBoards] = useState([])

  const rehydrateBoardList = newBoard => {
    const updatedList = boards.map(board =>
      board?.id === newBoard?.id ? newBoard : board
    )
    setBoards(updatedList)
  }

  const updateBoardWithRetry = async (boardId, update) => {
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

  const handleStarBoard = (ev, board) => {
    ev.preventDefault()
    ev.stopPropagation()

    const update = {
      "prefs.starred": !Boolean(board?.prefs?.starred === "true"),
    }

    updateBoardWithRetry(board.id, update)
  }

  const handleCreateBoard = () => {}

  useEffect(() => {
    setBoards(boardList)
  }, [boardList])

  return (
    <BoardContext.Provider
      value={{ handleCreateBoard, handleStarBoard, boards }}
    >
      {children}
    </BoardContext.Provider>
  )
}

export { BoardContextProvider }
