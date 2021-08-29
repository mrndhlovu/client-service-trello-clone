import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import update from "immutability-helper"

import { ICardItem } from "../../components/board/canvas/ListItem"
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

const dndPropsInitialState: IDndProps = {}

const ListCardsContextProvider = ({ children, listId, listIndex }: IProps) => {
  const { board, findCardsByListId } = useBoard()

  const [cards, setCards] = useState<ICardItem[] | null>()
  const [dragForeignCard, setDragForeignCard] = useState<boolean>(false)
  const [dndProps, setDndProps] = useState<IDndProps>(dndPropsInitialState)

  const [, listHasCards] = findCardsByListId(listId)

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      if (dragIndex === undefined || hoverIndex === undefined) return
      const dragCard = cards[dragIndex]

      const updatedCards = update(cards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      })

      setCards(updatedCards)
    },
    [cards]
  )

  useEffect(() => {
    setCards(board.cards.filter((card: ICardItem) => card.listId === listId))
  }, [board.cards])

  return (
    <CardContext.Provider
      value={{
        cards,
        dndProps,
        dragForeignCard,
        listHasCards,
        listId,
        listIndex,
        moveCard,
        setDndProps,
        setDragForeignCard,
      }}
    >
      {children}
    </CardContext.Provider>
  )
}

export interface IListCardsContextProps {
  cards: ICardItem[]
  listHasCards: boolean
  dragForeignCard?: boolean

  setDragForeignCard?: (dragForeignCard: boolean) => void
  listIndex?: number
  listId: string
  moveCard: (
    dragIndex: number,
    hoverIndex: number,
    sourceListId?: string,
    hasCards?: boolean
  ) => void
  dndProps: IDndProps
  setDndProps: (data: IDndProps) => void
}

export const CardContext = createContext({} as IListCardsContextProps)
export const useListCardsContext = () => useContext(CardContext)

export { ListCardsContextProvider }
