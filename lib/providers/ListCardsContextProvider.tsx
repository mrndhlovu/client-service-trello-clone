import { createContext, ReactNode, useContext } from "react"

import { useBoard } from "./BoardContextProvider"

interface IProps {
  listId: string
  listIndex: number
  children: ReactNode
}

export interface ICardDraggingProps {
  sourceCardId: string
  targetCardId: string
  sourceListId?: string
  targetListId?: string
  boardId?: string
  isSwitchingList?: boolean
}

export interface IDndProps {
  isSwitchingList?: boolean
}

const ListCardsContextProvider = ({ children, listId, listIndex }: IProps) => {
  const { findCardsByListId } = useBoard()

  const [, listHasCards] = findCardsByListId(listId)

  return (
    <CardContext.Provider
      value={{
        listIndex,
        listHasCards,
        listId,
      }}
    >
      {children}
    </CardContext.Provider>
  )
}

export interface IListCardsContextProps {
  listHasCards: boolean
  listIndex?: number
  listId: string
}

export const CardContext = createContext({} as IListCardsContextProps)
export const useListCardsContext = () => useContext(CardContext)

export { ListCardsContextProvider }
