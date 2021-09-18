import { createContext, ReactNode, useCallback, useContext } from "react"

import { clientRequest } from "../../api"
import { useBoard } from "./BoardContextProvider"
import { useGlobalState } from "."
import { useListContext } from "./ListContextProvider"
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

const ListCardsContextProvider = ({
  children,
  listId,
  listIndex,
  list,
}: IProps) => {
  const { findCardsByListId } = useBoard()
  const { updateCardsState } = useListContext()
  const { notify } = useGlobalState()

  const [, listHasCards] = findCardsByListId(listId)

  const saveCardChanges = useCallback(
    async (cardId: string, listId: string, update: { [key: string]: any }) => {
      await clientRequest
        .updateCard(update, { listId, cardId })
        .then(res => updateCardsState(res.data))
        .catch(err =>
          notify({
            description: err.message,
            placement: "top",
          })
        )
    },
    [notify, updateCardsState]
  )

  return (
    <ListCardContext.Provider
      value={{
        listIndex,
        listHasCards,
        listId,
        list,
        saveCardChanges,
      }}
    >
      {children}
    </ListCardContext.Provider>
  )
}

export interface IListCardsContextProps {
  listHasCards: boolean
  listIndex?: number
  listId: string
  list: IListItem
  saveCardChanges: (
    cardId: string,
    listId: string,
    update: { [key: string]: any }
  ) => void
}

const ListCardContext = createContext({} as IListCardsContextProps)
export const useListCardsContext = () => useContext(ListCardContext)

export { ListCardsContextProvider }
