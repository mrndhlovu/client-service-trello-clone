import { useEffect, useState } from "react"

import { updateBoard } from "../../api"
import { BoardContext, useAuth } from "../hooks/context"

const BoardContextProvider = ({ children, boardList }) => {
  const { logout } = useAuth()

  const [boards, setBoards] = useState([])

  const rehydrateBoardList = newBoard => {
    const updatedList = boards.map(board =>
      board?.id === newBoard?.id ? newBoard : board
    )
    setBoards(updatedList)
  }

  const handleStarBoard = async (ev, board) => {
    ev.preventDefault()
    ev.stopPropagation()

    const update = {
      "prefs.starred": !Boolean(board?.prefs?.starred === "true"),
    }

    await updateBoard(update, board?.id)
      .then(res => rehydrateBoardList(res?.data))
      .catch(err => {
        logout()
      })
  }

  useEffect(() => {
    setBoards(boardList)
  }, [boardList])

  return (
    <BoardContext.Provider value={{ handleStarBoard, boards }}>
      {children}
    </BoardContext.Provider>
  )
}

export { BoardContextProvider }
