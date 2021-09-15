import { createContext, ReactNode, useContext, useEffect } from "react"

import { ICardItem, IListItem } from "../../components/board/canvas/ListItem"
import { useGlobalState } from "."

export interface IBoard {
  lists?: IListItem[]
  cards?: ICardItem[]
  title?: string
  id?: string
  activeBg?: "image" | "color"
  prefs?: {
    color?: string
    image?: string
    starred: "true" | "false" | boolean
  }
  [key: string]: any
}

interface IProps {
  boardList?: IBoard[]
  children: ReactNode
}

const HomeContextProvider = ({ children, boardList }: IProps) => {
  const { updateBoardsState } = useGlobalState()

  useEffect(() => {
    if (!boardList) return
    updateBoardsState(boardList)
  }, [boardList, updateBoardsState])

  return <HomeContext.Provider value={{}}>{children}</HomeContext.Provider>
}

interface IHomeContext {}

export const HomeContext = createContext<IHomeContext>({} as IHomeContext)
export const useHomeContext = () => useContext(HomeContext)

export { HomeContextProvider }
