import { createContext, useContext } from "react"
import { ICardItem } from "../../components/board/canvas/ListItem"

const CardContextProvider = ({
  card,
  children,
  cardIndex,
  listId,
  listIndex,
}) => {
  return (
    <CardContext.Provider
      value={{ card, cardId: card.id, cardIndex, listId, listIndex }}
    >
      {children}
    </CardContext.Provider>
  )
}

interface ICardContext {
  card: ICardItem
  cardId: string
  listId: string
  listIndex: number
  cardIndex: number
}

export const CardContext = createContext<ICardContext>({} as ICardContext)
export const useCardContext = () => useContext(CardContext)

export { CardContextProvider }
