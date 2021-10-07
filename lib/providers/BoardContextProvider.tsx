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
import { useRouter } from "next/router"
import { isEmpty } from "lodash"

import { clientRequest } from "../../api"
import { IBoard } from "./HomeContextProvider"
import { ICardItem, IListItem } from "../../components/board/canvas/ListItem"
import { ROUTES } from "../../util/constants"
import { useGlobalState } from "."
import { IAttachment } from "../../components/board/canvas/cardActions/ChangeCover"
import { IAction } from "../../components/board/canvas/card/Activities"

interface IProps {
  board?: IBoard
  children: ReactNode
}

interface IUpdateStateOptions {
  isNew?: boolean
}

const BoardContextProvider = ({ children, board }: IProps) => {
  const { notify, rehydrateBoardsList } = useGlobalState()
  const router = useRouter()

  const [activeBoard, setActiveBoard] = useState<IProps["board"]>()
  const [attachments, setAttachments] = useState<IAttachment[]>([])
  const [activities, setActivities] = useState<IAction[]>([])
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  const isStarred = Boolean(activeBoard?.prefs?.starred === "true")

  const imageCover = board.activeBg === "image" ? board?.prefs.image : ""
  const colorCover = board?.prefs?.color

  const sortedActionsList = activities?.sort((a, b) => {
    return new Date(b?.createdAt)?.getTime() - new Date(a?.createdAt)?.getTime()
  })

  const saveBoardChanges = useCallback(
    async (update: IBoard): Promise<IBoard | void | undefined> => {
      return await clientRequest
        .updateBoard(update, activeBoard.id)
        .then(res => res.data as IBoard)
        .catch(err => {
          notify({ description: err.message, status: "error" })
          return
        })
    },
    [activeBoard, notify]
  )

  const updateBoardState = (update: IBoard, options?: IUpdateStateOptions) => {
    if (options?.isNew) {
      return router.push(`/${ROUTES.board}/${update.id}`)
    }

    setActiveBoard(update)
  }

  const handleStarBoard = useCallback(async () => {
    const update = {
      "prefs.starred": !Boolean(activeBoard?.prefs!?.starred === "true"),
    }

    const response = await saveBoardChanges(update)
    if (!response) return

    setActiveBoard(prev => ({
      ...prev,
      prefs: {
        ...prev.prefs,
        starred: response?.prefs?.starred,
      },
    }))
    rehydrateBoardsList(response)
  }, [saveBoardChanges, rehydrateBoardsList])

  const handleDeleteBoard = async () => {
    await clientRequest
      .deleteBoard(activeBoard.id)
      .then(() => router.push(ROUTES.home))
      .catch(err => {
        notify({ description: err.message })
      })
  }

  const findCardsByListId = useCallback(
    (id: string): [ICardItem[], boolean] => {
      const cards = board.cards.filter((card: ICardItem) => card?.listId === id)
      const hasCards = !isEmpty(cards)
      return [cards, hasCards]
    },
    [board?.cards]
  )

  const findListById = useCallback(
    (id: string): [IListItem, boolean] => {
      const list = board.lists.find((list: IListItem) => list?.id === id)
      const hasCards = !isEmpty(list?.cards)
      return [list, hasCards]
    },
    [board?.lists]
  )

  const closeBoard = async () => {
    await clientRequest
      .updateBoard({ archived: "true" }, activeBoard.id)

      .then(() => router.push(ROUTES.home))
      .catch(err => {
        notify({ description: err.message })
      })
  }

  const fetchAndUpdateAttachments = (attachmentId: string) => {
    clientRequest
      .getActionByAttachmentId(board.id, attachmentId)
      .then(res => {
        updateActionsList(res.data)
      })
      .catch(() => null)
  }

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
      .getActionByAttachmentId(board.id, attachmentIds)
      .then(res => {
        setActivities(prev => [...prev, ...res.data])
      })
      .catch(() => null)
  }

  const toggleDrawerMenu = () => setDrawerOpen(prev => !prev)

  useEffect(() => {
    setActiveBoard(board)
  }, [])

  useEffect(() => {
    if (!board?.id) return
    const getData = async () => {
      const boardPromises = [
        clientRequest
          .getAttachments(board?.id)
          .then(res => res.data)
          .catch(res => undefined),
        clientRequest
          .getActions(board.id)
          .then(res => res.data)
          .catch(res => undefined),
      ]

      const response = await Promise.all(boardPromises)

      if (!response) return

      setAttachments(response?.[0])
      setActivities(response?.[1])
    }

    getData()
  }, [board?.id])

  return (
    <BoardContext.Provider
      value={{
        activities: sortedActionsList,
        attachments,
        board: activeBoard,
        boardId: board.id,
        closeBoard,
        colorCover,
        drawerOpen,
        fetchAndUpdateActions,
        fetchAndUpdateAttachments,
        findCardsByListId,
        findListById,
        handleDeleteBoard,
        handleStarBoard,
        imageCover,
        isStarred,
        saveBoardChanges,
        setActiveBoard,
        setActivities,
        setAttachments,
        toggleDrawerMenu,
        updateActionsList,
        updateBoardState,
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}

interface IBoardContext {
  activities: IAction[]
  attachments: IAttachment[]
  board?: IBoard
  boardId: string
  boards?: IBoard[]
  closeBoard: () => void
  colorCover: string
  drawerOpen: boolean
  fetchAndUpdateActions: (attachmentId: string) => void
  fetchAndUpdateAttachments: (attachmentId: string) => void
  findCardsByListId: (listId: string) => [IBoard["cards"]?, boolean?]
  findListById: (listId: string) => [IListItem?, boolean?]
  handleDeleteBoard: () => void
  handleStarBoard: (board?: IBoard) => void
  imageCover: string
  isStarred: boolean
  saveBoardChanges: (board?: IBoard) => Promise<IBoard | void>
  setActiveBoard: (board?: IBoard) => void
  setActivities: Dispatch<SetStateAction<IAction[]>>
  setAttachments: Dispatch<SetStateAction<IAttachment[]>>
  toggleDrawerMenu: () => void
  updateActionsList: (data: IAction, options?: { edited: false }) => void
  updateBoardState: (board?: IBoard) => void
}

export const BoardContext = createContext<IBoardContext>({} as IBoardContext)
export const useBoard = () => useContext(BoardContext)

export { BoardContextProvider }
