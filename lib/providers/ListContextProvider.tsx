import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { isEmpty } from "lodash"
import update from "immutability-helper"

import { clientRequest } from "../../api"
import { IListItem } from "../../components/board/canvas/ListItem"
import { useGlobalState } from "../hooks/context"
import { useBoard } from "./BoardContextProvider"
import { ICardDraggingProps } from "./ListCardsContextProvider"

interface IProps {
  children: ReactNode
}

const ListContextProvider = ({ children }: IProps) => {
  const { board, setActiveBoard } = useBoard()
  const { notify } = useGlobalState()

  if (!board) return null
  const [lists, setLists] = useState<IListItem[]>([])
  const hasBoardList = !isEmpty(lists)

  const updateBoardLists = (updatedListItem: IListItem) => {
    const newList = board.lists.map((list: IListItem) =>
      list.id === updatedListItem.id ? updatedListItem : list
    )

    setActiveBoard({ ...board, lists: newList })
  }

  const saveListDndChanges = async (data: IListDraggingProps) => {
    if (!data?.source || !data?.target) return

    await clientRequest.moveList({ ...data, boardId: board.id }).catch(err => {
      notify({
        description: err.message,
        placement: "top",
      })
    })
  }

  const saveCardDndChanges = async (data: ICardDraggingProps) => {
    const dndData = { ...data, boardId: board.id }

    await clientRequest.moveCard(dndData).catch(err => {
      notify({
        description: err.message,
        placement: "top",
      })
    })
  }

  const handleUpdateList = useCallback(
    async (listId: string, update: { [key: string]: any }) => {
      await clientRequest
        .updateList(update, { listId, boardId: board.id })
        .then(res => updateBoardLists(res.data))
        .catch(err =>
          notify({
            description: err.message,
            placement: "top",
          })
        )
    },
    [notify, board]
  )

  const onMoveList = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragList = lists[dragIndex]

      const updatedList = update(lists, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragList],
        ],
        $apply: function (list: IListItem[]) {
          const newList = list.map((item, index) => ({
            ...item,
            position: index,
          }))

          return newList
        },
      })

      setLists(updatedList)
    },
    [lists]
  )

  useEffect(() => {
    setLists(board.lists)
  }, [board.lists])

  return (
    <ListContext.Provider
      value={{
        onMoveList,
        handleUpdateList,
        updateBoardLists,
        saveListDndChanges,
        hasBoardList,
        lists,
        saveCardDndChanges,
      }}
    >
      {children}
    </ListContext.Provider>
  )
}

export interface IListDraggingProps {
  source: string
  target: string
  listId?: string
  boardId?: string
}

export interface IListContextProps {
  updateBoardLists: (newListItem: IListItem) => void
  sourceIndex?: number
  lists: IListItem[]
  hasBoardList: boolean
  saveCardDndChanges: (cardItem: ICardDraggingProps) => void
  onMoveList: (
    dragIndex: number,
    hoverIndex: number,
    isActive?: boolean
  ) => void
  saveListDndChanges: (data: IListDraggingProps) => void
  handleUpdateList: (listId: string, update: { [key: string]: any }) => void
}

export const ListContext = createContext({} as IListContextProps)

export const useListContext = () => useContext(ListContext)

export { ListContextProvider }
