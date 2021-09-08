import { useRouter } from "next/router"
import { createContext, useContext } from "react"
import { ICardItem } from "../../components/board/canvas/ListItem"
import { ROUTES } from "../../util/constants"
import { useBoard } from "./BoardContextProvider"

const CardContextProvider = ({
  card,
  children,
  cardIndex,
  listId,
  listIndex,
}) => {
  const { boardId } = useBoard()

  const { replace } = useRouter()

  const closeCardModal = () => {
    replace(`/${ROUTES.board}/${boardId}`)
  }

  return (
    <CardContext.Provider
      value={{
        card,
        cardId: card.id,
        cardIndex,
        listId,
        listIndex,
        closeCardModal,
      }}
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
  closeCardModal: () => void
}

export const CardContext = createContext<ICardContext>({} as ICardContext)
export const useCardContext = () => useContext(CardContext)

export { CardContextProvider }
