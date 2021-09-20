import { useRouter } from "next/router"
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { useListContext } from "."
import { ICardItem } from "../../components/board/canvas/ListItem"

interface IProps {
  card: ICardItem
  children: ReactNode
  cardIndex: number
  listId: string
  listIndex: number
}

const CardContextProvider = ({
  card,
  children,
  cardIndex,
  listId,
  listIndex,
}: IProps) => {
  const { updateCardsState } = useListContext()

  const [cardItem, setCardItem] = useState<ICardItem>()

  const showCardCover =
    cardItem?.colorCover ||
    cardItem?.imageCover?.active ||
    cardItem?.coverUrl?.active

  const imageCover = cardItem?.imageCover?.active
    ? cardItem?.imageCover
    : cardItem?.coverUrl?.active
    ? cardItem?.coverUrl
    : ""

  const edgeColor = cardItem?.imageCover?.active
    ? cardItem?.imageCover?.edgeColor
    : cardItem?.coverUrl?.edgeColor

  const updateCardState = useCallback((newCard: ICardItem) => {
    setCardItem(newCard)
    updateCardsState(newCard)
  }, [])

  useEffect(() => {
    setCardItem(card)
  }, [card])

  return (
    <CardContext.Provider
      value={{
        card: cardItem,
        cardId: cardItem?.id,
        imageCover: cardItem?.imageCover?.active
          ? cardItem?.imageCover?.url
          : "",
        coverUrl: cardItem?.coverUrl?.active ? cardItem?.coverUrl?.image : "",
        edgeColor,
        cardIndex,
        coverSize: {
          width: imageCover?.width,
          height: imageCover?.height || "200",
        },
        listId,
        listIndex,
        showCardCover,
        colorCover: cardItem?.colorCover,
        updateCardState,
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
  showCardCover: string
  imageCover?: string
  colorCover?: string
  coverUrl?: string
  edgeColor?: string
  updateCardState: (card: ICardItem) => void
  coverSize?: {
    width: string
    height: string
  }
}

export const CardContext = createContext<ICardContext>({} as ICardContext)
export const useCardContext = () => useContext(CardContext)

export { CardContextProvider }
