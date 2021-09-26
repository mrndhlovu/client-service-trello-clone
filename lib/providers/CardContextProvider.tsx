import { useRouter } from "next/router"
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { useBoard, useListContext } from "."
import { clientRequest } from "../../api"
import { IAction } from "../../components/board/canvas/card/Activities"
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
  const { boardId } = useBoard()

  const [cardItem, setCardItem] = useState<ICardItem>()
  const [activities, setActivities] = useState<IAction[]>([])

  const sortedList = activities?.sort((a, b) => {
    return new Date(b?.createdAt)?.getTime() - new Date(a?.createdAt)?.getTime()
  })

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

  const updateActionsList = (data: IAction, options?: { edited: false }) => {
    if (options?.edited) {
      setActivities(prev => [
        ...prev.map(item => (item.id === data.id ? data : item)),
      ])
      return
    }

    setActivities(prev => [...prev, data])
  }

  const fetchAndUpdateActions = (attachmentId: string) => {
    clientRequest
      .getActionByAttachmentId(boardId, attachmentId)
      .then(res => {
        updateActionsList(res.data)
      })
      .catch(() => null)
  }

  useEffect(() => {
    setCardItem(card)
  }, [card])

  useEffect(() => {
    const getData = () => {
      clientRequest
        .getActions(boardId)
        .then(res => setActivities(res.data))
        .catch(() => {})
    }

    getData()
  }, [])

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
        activities: sortedList,
        updateActionsList,
        setActivities,
        fetchAndUpdateActions,
      }}
    >
      {children}
    </CardContext.Provider>
  )
}

export interface ICardContext {
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
  fetchAndUpdateActions: (attachmentId: string) => void
  setActivities: Dispatch<SetStateAction<IAction[]>>
  updateActionsList: (data: IAction, options?: { edited: false }) => void
  activities: IAction[]
  coverSize?: {
    width: string
    height: string
  }
}

export const CardContext = createContext<ICardContext>({} as ICardContext)
export const useCardContext = () => useContext(CardContext)

export { CardContextProvider }
