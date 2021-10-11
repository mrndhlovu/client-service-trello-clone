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

export interface Workspace {
  boards: string[]
  createdAt: string
  id: string
  name: string
  owner: string
  updatedAt: string
  category: string
  iconColor: string
}

interface IProps {
  data?: { boards: IBoard[]; workspaces: Workspace[] }
  children: ReactNode
}

const HomeContextProvider = ({ children, data }: IProps) => {
  const { updateBoardsState } = useGlobalState()

  useEffect(() => {
    updateBoardsState(data)
  }, [])

  return <HomeContext.Provider value={{}}>{children}</HomeContext.Provider>
}

interface IHomeContext {}

export const HomeContext = createContext<IHomeContext>({} as IHomeContext)
export const useHomeContext = () => useContext(HomeContext)

export { HomeContextProvider }
