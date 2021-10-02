import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
  MouseEvent,
} from "react"
import { useBoard, useListContext } from "."
import { clientRequest } from "../../api"
import { IAction } from "../../components/board/canvas/card/Activities"
import {
  IChecklist,
  ITaskItem,
} from "../../components/board/canvas/cardActions/AddChecklist"
import { IAttachment } from "../../components/board/canvas/cardActions/ChangeCover"
import { ICardItem } from "../../components/board/canvas/ListItem"
import { mergeTasks } from "../../util"
import { useLocalStorage } from "../hooks"

interface IProps {
  card: ICardItem
  children: ReactNode
  cardIndex: number
  listId: string
  listIndex: number
}

interface IPreview {
  url: string
  id: string
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

  const [activities, setActivities] = useState<IAction[]>([])
  const [attachments, setAttachments] = useState<IAttachment[]>([])
  const [cardItem, setCardItem] = useState<ICardItem>()
  const [checklists, setChecklists] = useState<IChecklist[]>([])
  const [preview, setPreview] = useState<IPreview | undefined>()
  const [tasks, setTasks] = useState<ITaskItem[]>([])

  const [openCardModalId, setOpenCardModalId] = useLocalStorage(
    "CARD_OPEN_ID",
    ""
  )

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

  const previewModalIsOpen = preview !== undefined

  const toggleCardIsOpen = useCallback(
    (ev?: MouseEvent, id?: string) => {
      const cardId = id ? id : ev?.currentTarget?.id

      setOpenCardModalId(cardId)
    },
    [setOpenCardModalId]
  )

  const togglePreviewModal = (ev?: MouseEvent) => {
    if (!ev?.currentTarget.id) return setPreview(undefined)

    const [url, previewId] = ev?.currentTarget?.id.split("|")
    setPreview({ url, id: previewId })
  }

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

  useEffect(() => {
    setCardItem(card)
    setChecklists(card?.checklists)
    const taskList = mergeTasks(card?.checklists)

    setTasks(taskList)
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
        cardIsOpen: openCardModalId === card.id,
        checklists,
        colorCover: cardItem?.colorCover,
        fetchAndUpdateActions,
        fetchAndUpdateAttachments,
        listId,
        listIndex,
        preview,
        previewModalIsOpen,
        setActivities,
        setAttachments,
        setChecklists,
        setTasks,
        showCardCover,
        tasks,
        toggleCardIsOpen,
        togglePreviewModal,
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
  checklists: IChecklist[]
  colorCover?: string
  coverSize?: { width: string; height: string }
  coverUrl?: string
  edgeColor?: string
  fetchAndUpdateActions: (attachmentId: string) => void
  fetchAndUpdateAttachments: (attachmentId: string) => void
  imageCover?: string
  listId: string
  previewModalIsOpen: boolean
  preview?: IPreview
  togglePreviewModal: (ev?: MouseEvent) => void
  cardIsOpen: boolean
  toggleCardIsOpen: (ev?: MouseEvent, id?: string) => void
  listIndex: number
  setActivities: Dispatch<SetStateAction<IAction[]>>
  setAttachments: Dispatch<SetStateAction<IAttachment[]>>
  setChecklists: Dispatch<SetStateAction<IChecklist[]>>
  setTasks: Dispatch<SetStateAction<ITaskItem[]>>
  showCardCover: string
  tasks: ITaskItem[]
  updateActionsList: (data: IAction, options?: { edited: false }) => void
  updateCardState: (card: ICardItem) => void
}

export const CardContext = createContext<ICardContext>({} as ICardContext)
export const useCardContext = () => useContext(CardContext)

export { CardContextProvider }
