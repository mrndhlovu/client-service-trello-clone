import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { useRouter } from "next/router"
import { isEmpty } from "lodash"
import update from "immutability-helper"

import { checkStringIncludes } from "../../util"
import { clientRequest } from "../../api"
import { IBoard } from "./HomeContextProvider"
import { ICardItem } from "../../components/board/canvas/ListItem"
import { ROUTES } from "../../util/constants"
import { useAuth, useGlobalState } from "../hooks/context"

interface IProps {
  board?: IBoard
  children: ReactNode
}

const BoardContextProvider = ({ children, board }: IProps) => {
  const { refreshToken } = useAuth()
  const { notify } = useGlobalState()
  const router = useRouter()

  const [activeBoard, setActiveBoard] = useState<IProps["board"]>()
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  const isStarred = Boolean(activeBoard?.prefs?.starred === "true")

  const updateBoardWithRetry = async (update: IBoard) => {
    await clientRequest
      .updateBoard(update, activeBoard.id)
      .then(res => setActiveBoard(res.data))
      .catch(err => {
        if (checkStringIncludes(err?.message, ["expired", "Authorization"])) {
          const response = refreshToken()

          if (response) {
            return updateBoardWithRetry(update)
          }
        }
      })
  }

  const handleStarBoard = (board?: IBoard) => {
    const update = {
      "prefs.starred": !Boolean(
        (activeBoard || board)?.prefs!?.starred === "true"
      ),
    }

    return updateBoardWithRetry(update)
  }

  const handleDeleteBoard = async () => {
    await clientRequest
      .deleteBoard(activeBoard.id)
      .then(() => router.push(ROUTES.home))
      .catch(err => {
        notify({ description: err.message })
      })
  }

  const findCardsByListId = useCallback(
    (id: string): [ICardItem[], boolean] => {
      const boardCards: ICardItem[] = board.cards

      const cards = boardCards.filter((card: ICardItem) => card?.listId === id)
      const hasCards = !isEmpty(cards)
      return [cards, hasCards]
    },
    [board?.cards]
  )

  const switchCardList = useCallback(
    (dragIndex, sourceListId, hoverListId) => {
      const [sourceCards] = findCardsByListId(sourceListId)

      const dragCard = sourceCards[dragIndex]
      if (!dragCard) return
      const dragIndexCardOnBoardCards = board.cards.findIndex(
        (card: ICardItem) => card.id === dragCard.id
      )

      if (!dragCard) return

      const updatedDragCard = { ...dragCard, listId: hoverListId }

      const filteredCards = update(board.cards, {
        $splice: [[dragIndexCardOnBoardCards, 1, updatedDragCard]],
      })

      setActiveBoard({ ...board, cards: filteredCards })
    },
    [findCardsByListId, setActiveBoard, board]
  )

  const closeBoard = async () => {
    await clientRequest
      .updateBoard({ archived: "true" }, activeBoard.id)

      .then(() => router.push(ROUTES.home))
      .catch(err => {
        notify({ description: err.message })
      })
  }

  const toggleDrawerMenu = () => setDrawerOpen(prev => !prev)

  useEffect(() => {
    if (!board) return
    setActiveBoard(board)
  }, [board])

  return (
    <BoardContext.Provider
      value={{
        board: activeBoard,
        drawerOpen,
        isStarred,
        handleDeleteBoard,
        handleStarBoard,
        toggleDrawerMenu,
        handleUpdateBoard: updateBoardWithRetry,
        closeBoard,
        setActiveBoard,
        findCardsByListId,
        switchCardList,
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}

interface IDefaultBoardContext {
  handleStarBoard: (board?: IBoard) => void
  boards?: IBoard[]
  board?: IBoard
  handleDeleteBoard: () => void
  findCardsByListId: (listId: string) => [ICardItem[]?, boolean?]
  drawerOpen: boolean
  isStarred: boolean
  toggleDrawerMenu: () => void
  closeBoard: () => void
  switchCardList: (
    dragIndex: number,
    sourceListId: string,
    hoverListId: string
  ) => void
  setActiveBoard: (board?: IBoard) => void
  handleUpdateBoard: (
    boardUpdate: { [key: string]: any },
    boardId?: string
  ) => void
}

export const BoardContext = createContext<IDefaultBoardContext>(
  {} as IDefaultBoardContext
)
export const useBoard = () => useContext(BoardContext)

export { BoardContextProvider }
