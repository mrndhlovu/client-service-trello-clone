import { createContext, ReactNode, useContext } from "react"

import { useBoard } from "./BoardContextProvider"
import { IListItem } from "../../components/board/canvas/ListItem"

interface IProps {
  listId: string
  listIndex: number
  children: ReactNode
  list: IListItem
}

export interface ICardDraggingProps {
  sourceCardId: string
  targetCardId: string
  sourceListId?: string
  targetListId?: string
  boardId?: string
  isSwitchingList?: boolean
  isSwitchingBoard?: boolean
  targetBoardId?: string
}

export interface IDndProps {
  isSwitchingList?: boolean
}

const ListItemContextProvider = ({
  children,
  listId,
  listIndex,
  list,
}: IProps) => {
  const { findCardsByListId } = useBoard()

  const [, listHasCards] = findCardsByListId(listId)

  return (
    <ListItemContext.Provider
      value={{
        listIndex,
        listHasCards,
        listId,
        list,
      }}
    >
      {children}
    </ListItemContext.Provider>
  )
}

export interface IListCardsContextProps {
  listHasCards: boolean
  listIndex?: number
  listId: string
  list: IListItem
}

const ListItemContext = createContext({} as IListCardsContextProps)
export const useListItemContext = () => useContext(ListItemContext)

export { ListItemContextProvider }
