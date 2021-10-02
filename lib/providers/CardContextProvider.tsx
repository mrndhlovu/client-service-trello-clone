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
import { IAttachment } from "../../components/board/canvas/cardActions/ChangeCover"
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
  const [attachments, setAttachments] = useState<IAttachment[]>([])

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

  const fetchAndUpdateActions = (attachmentIds: string) => {
    clientRequest
      .getActionByAttachmentId(boardId, attachmentIds)
      .then(res => {
        setActivities(prev => [...prev, ...res.data])
      })
      .catch(() => null)
  }

  const fetchAndUpdateAttachments = (attachmentId: string) => {
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
    if (!cardItem?.id) return
    const getData = () => {
      clientRequest
        .getCardAttachments(cardItem?.id)
        .then(res => setAttachments(res.data))
        .catch(() => {})
    }

    getData()
  }, [cardItem?.id])

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
        activities: sortedList,
        attachments,
        colorCover: cardItem?.colorCover,
        fetchAndUpdateActions,
        fetchAndUpdateAttachments,
        listId,
        listIndex,
        setActivities,
        setAttachments,
        showCardCover,
        updateActionsList,
        updateCardState,
      }}
    >
      {children}
    </CardContext.Provider>
  )
}

export interface ICardContext {
  activities: IAction[]
  attachments: IAttachment[]
  card: ICardItem
  cardId: string
  cardIndex: number
  colorCover?: string
  coverUrl?: string
  coverSize?: { width: string; height: string }
  edgeColor?: string
  fetchAndUpdateActions: (attachmentId: string) => void
  fetchAndUpdateAttachments: (attachmentId: string) => void
  imageCover?: string
  listId: string
  listIndex: number
  setActivities: Dispatch<SetStateAction<IAction[]>>
  setAttachments: Dispatch<SetStateAction<IAttachment[]>>
  showCardCover: string
  updateActionsList: (data: IAction, options?: { edited: false }) => void
  updateCardState: (card: ICardItem) => void
}

export const CardContext = createContext<ICardContext>({} as ICardContext)
export const useCardContext = () => useContext(CardContext)

export { CardContextProvider }
