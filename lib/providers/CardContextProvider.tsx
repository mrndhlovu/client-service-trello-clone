import { createContext, useContext } from "react"
import { ICardItem } from "../../components/board/canvas/ListItem"

const CardContextProvider = ({ card, children, cardIndex }) => {
  return (
    <CardContext.Provider value={{ card, cardId: card.id, cardIndex }}>
      {children}
    </CardContext.Provider>
  )
}

interface ICardContext {
  // handleStarBoard: (board?: IBoard) => void
  card: ICardItem
  cardId: string
  cardIndex: number
}

export const CardContext = createContext<ICardContext>({} as ICardContext)
export const useCardContext = () => useContext(CardContext)

export { CardContextProvider }
