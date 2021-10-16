import { isEmpty } from "lodash"
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
import { useBoard, useListsContext } from "."

import {
  IChecklist,
  ITaskItem,
} from "../../components/board/canvas/cardActions/AddChecklist"
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
  const { updateCardsState } = useListsContext()
  const { attachments } = useBoard()

  const [cardItem, setCardItem] = useState<ICardItem>()
  const [checklists, setChecklists] = useState<IChecklist[]>([])
  const [preview, setPreview] = useState<IPreview | undefined>()
  const [tasks, setTasks] = useState<ITaskItem[]>([])

  const hasAttachments = !isEmpty(
    attachments.find(attachment => attachment.cardId === card?.id)
  )

  const [openCardModalId, setOpenCardModalId] = useLocalStorage(
    "CARD_OPEN_ID",
    ""
  )

  const showCardCover =
    (cardItem?.colorCover ||
      cardItem?.imageCover?.active ||
      cardItem?.coverUrl?.active) !== undefined

  const imageCover = cardItem?.imageCover?.active
    ? cardItem?.imageCover
    : cardItem?.coverUrl?.active
    ? cardItem?.coverUrl
    : undefined

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
        cardIsOpen: openCardModalId === card?.id,
        checklists,
        colorCover: cardItem?.colorCover,
        listId,
        listIndex,
        preview,
        previewModalIsOpen,
        setChecklists,
        setTasks,
        showCardCover,
        tasks,
        toggleCardIsOpen,
        togglePreviewModal,
        updateCardState,
        hasAttachments,
      }}
    >
      {children}
    </CardContext.Provider>
  )
}

export interface ICardContext {
  card: ICardItem
  cardId: string
  cardIndex: number
  checklists: IChecklist[]
  colorCover?: string
  coverSize?: { width: string; height: string }
  coverUrl?: string
  edgeColor?: string
  imageCover?: string
  listId: string
  hasAttachments: boolean
  previewModalIsOpen: boolean
  preview?: IPreview
  togglePreviewModal: (ev?: MouseEvent) => void
  cardIsOpen: boolean
  toggleCardIsOpen: (ev?: MouseEvent, id?: string) => void
  listIndex: number
  setChecklists: Dispatch<SetStateAction<IChecklist[]>>
  setTasks: Dispatch<SetStateAction<ITaskItem[]>>
  showCardCover: boolean
  tasks: ITaskItem[]
  updateCardState: (card: ICardItem) => void
}

export const CardContext = createContext<ICardContext>({} as ICardContext)
export const useCardContext = () => useContext(CardContext)

export { CardContextProvider }
