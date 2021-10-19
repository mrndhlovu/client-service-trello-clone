import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
} from "react"
import { isEmpty } from "lodash"
import update from "immutability-helper"

import { clientRequest } from "../../api"
import { ICardDraggingProps } from "./ListItemContextProvider"
import { ICardItem } from "../../components/board/canvas/ListItem"
import { useBoard } from "./BoardContextProvider"
import { useGlobalState } from "."

interface IProps {
  children: ReactNode
}

const ListsContextProvider = ({ children }: IProps) => {
  const { board, boardId, updateCardsStateOnBoard, updateListsStateOnBoard } =
    useBoard()
  const { notify } = useGlobalState()

  const dragRef = useRef<ICardItem | null>(null)

  const saveListDndChanges = async (data: IListDraggingProps) => {
    if (!data?.sourceListId || !data?.targetListId) return

    await clientRequest.moveList({ ...data, boardId: board.id }).catch(err => {
      notify({
        description: err.message,
        placement: "top",
      })
    })
  }

  const saveCardDndChanges = async (data: ICardDraggingProps) => {
    if (
      ((!data?.sourceCardId || !data?.targetCardId) &&
        !data?.isSwitchingList) ||
      // (data?.sourceCardId === data?.targetCardId && !data?.isSwitchingList) ||
      (data?.sourceCardId === data?.targetCardId &&
        data.sourceListId === data.targetListId &&
        !data.isSwitchingList)
    )
      return

    const dndData = { ...data, boardId: board.id }
    dragRef.current = null
    await clientRequest.moveCard(dndData).catch(err => {
      notify({
        description: err.message,
        placement: "top",
      })
    })
  }

  const switchCardList = useCallback(
    (cardId, hoverListId) => {
      const dragCard = board.cards.find(card => card.id === cardId)
      const cardIndex = board.cards.findIndex(card => card.id === cardId)

      if (!dragCard) return

      const updatedCards = update(board.cards, {
        [cardIndex]: { listId: { $set: hoverListId } },
      })

      updateCardsStateOnBoard(updatedCards)
    },
    [updateCardsStateOnBoard, board?.cards]
  )

  const saveListChanges = useCallback(
    async (listId: string, update: { [key: string]: any }) => {
      await clientRequest
        .updateList(update, { listId, boardId })
        .then(res => updateListsStateOnBoard(res.data))
        .catch(err =>
          notify({
            description: err.message,
            placement: "top",
          })
        )
    },
    [notify, boardId]
  )

  const removeCardFromSource = (cardId: string) => {
    const dragCard = board.cards.find(card => card.id === cardId)
    const cardIndex = board.cards.findIndex(card => card.id === cardId)

    if (!dragCard) return

    const updatedCards = update(board.cards, {
      $splice: [[cardIndex, 1]],
    })

    updateCardsStateOnBoard(updatedCards)
  }

  const removeListFromSource = (listId: string) => {
    const dragList = board.lists.findIndex(list => list.id === listId)

    const updatedList = update(board.lists, {
      $splice: [[dragList, 1]],
    })

    updateListsStateOnBoard(updatedList)
  }

  const moveCard = useCallback(
    (dragCardId, targetCardId) => {
      if (dragCardId === undefined || targetCardId === undefined) return

      const dragCard = board.cards.find(card => card.id === dragCardId)
      const dragIndex = board.cards.findIndex(card => card.id === dragCardId)
      const hoverIndex = board.cards.findIndex(card => card.id === targetCardId)

      const updatedCards = update(board.cards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      })

      updateCardsStateOnBoard(updatedCards)
    },
    [board?.cards, updateCardsStateOnBoard]
  )

  const moveList = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragList = board.lists[dragIndex]

      const updatedList = update(board.lists, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragList],
        ],
      })

      updateListsStateOnBoard(updatedList)
    },
    [board?.lists, updateListsStateOnBoard]
  )

  return (
    <ListContext.Provider
      value={{
        hasBoardList: !isEmpty(board?.lists),
        moveCard,
        moveList,
        saveCardDndChanges,
        saveListChanges,
        saveListDndChanges,
        switchCardList,
        removeCardFromSource,
        removeListFromSource,
      }}
    >
      {children}
    </ListContext.Provider>
  )
}

export interface IListDraggingProps {
  sourceListId: string
  targetListId: string
  boardId?: string
  isSwitchingBoard?: boolean
  targetBoardId: string
}

export interface IListContextProps {
  sourceIndex?: number
  hasBoardList: boolean
  saveCardDndChanges: (cardItem: ICardDraggingProps) => void
  moveList: (dragIndex: number, hoverIndex: number) => void
  saveListDndChanges: (data: IListDraggingProps) => void
  saveListChanges: (listId: string, update: { [key: string]: any }) => void
  switchCardList: (cardId: string, hoverListId: string) => void
  moveCard: (dragCardId: string, hoverCardId: string) => void
  removeCardFromSource: (cardId: string) => void
  removeListFromSource: (listId: string) => void
}

export const ListContext = createContext({} as IListContextProps)

export const useListsContext = () => useContext(ListContext)

export { ListsContextProvider }
