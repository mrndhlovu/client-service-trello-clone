import { createContext, useContext, MouseEvent } from "react"
import {
  ILoginCredentials,
  IPasswordConfirmation,
  ISignupCredentials,
} from "../../api"
import { IListItem } from "../../components/board/canvas/ListItem"
import { IDndItem } from "../../components/board/dnd/DraggableList"
import {
  IBoard,
  IStripeInvoice,
  IStripeProduct,
  IToastProps,
  IUIRequestError,
  IUser,
} from "../providers"

interface IDefaultGlobalState {
  darkMode: boolean
  handleModeChange: () => void
  notify: (option: IToastProps) => void
}

interface IDefaultBoardContext {
  handleCreateBoard: () => void
  handleStarBoard: (board?: IBoard) => void
  boards?: IBoard[]
  board?: IBoard
  handleDeleteBoard: () => void
  drawerOpen: boolean
  isStarred: boolean
  toggleDrawerMenu: () => void
  closeBoard: () => void
  setActiveBoard: (board?: IBoard) => void
  handleUpdateBoard: (
    boardUpdate: { [key: string]: any },
    boardId?: string
  ) => void
}

interface IDefaultAuthContext {
  loading: boolean
  user?: IUser
  isAuthenticated: boolean
  rehydrateUser: (newUser?: IUser) => void
  logout: () => {} | void | null
  login: (formData: ILoginCredentials) => Promise<void>
  dismissAuthError: () => void
  signup: (formData: ISignupCredentials) => Promise<void>
  refreshToken: () => {} | void | null
  fetchUser: () => Promise<void>
  authError: undefined | IUIRequestError
  verifyLogin: (formData: { token: string }) => Promise<void>
  verifyUserPassword: (data: IPasswordConfirmation) => Promise<number | null>
}

export interface ICardDetails {
  productId?: string
  priceId?: string
  source?: string
  currency?: "usd" | "eur"
  customerId?: string
  amount?: string
  paymentMethodId?: string
  plan?: string
}

export interface IListContextProps {
  updateBoardLists: (newListItem: IListItem) => void
  sourceIndex?: number

  onMoveList: (
    dragIndex: number,
    hoverIndex: number,
    isActive?: boolean
  ) => void
  saveChanges: (dragItem: IDndItem) => void
  handleUpdateList: (listId: string, update: { [key: string]: any }) => void
}

export interface ICardContextProps {
  // updateBoardLists: (newListItem: IListItem) => void

  onMoveCard: (dragIndex: number, hoverIndex: number) => void
  saveCardChanges: (dragItem: IDndItem) => void
  // handleUpdateList: (listId: string, update: { [key: string]: any }) => void
}

interface IStripeContext {
  createSubscription: (cardData: ICardDetails) => any
  products?: IStripeProduct[]
  invoices?: IStripeInvoice[]
}

export const GlobalContext = createContext<IDefaultGlobalState>(
  {} as IDefaultGlobalState
)

export const ThemeContext = createContext(null)
export const HomeContext = createContext({})
export const StripeContext = createContext<IStripeContext>({} as IStripeContext)
export const AuthContext = createContext<IDefaultAuthContext>(
  {} as IDefaultAuthContext
)
export const ListContext = createContext({} as IListContextProps)
export const CardContext = createContext({} as ICardContextProps)
export const BoardContext = createContext<IDefaultBoardContext>(
  {} as IDefaultBoardContext
)

export const useGlobalState = () => useContext(GlobalContext)
export const useHomeContext = () => useContext(HomeContext)
export const useAuth = () => useContext(AuthContext)
export const useBoard = () => useContext(BoardContext)
export const useListContext = () => useContext(ListContext)
export const useCardContext = () => useContext(CardContext)
export const useStripeContext = () => useContext(StripeContext)
