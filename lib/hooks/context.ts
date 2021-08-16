import { createContext, useContext } from "react"
import {
  ILoginCredentials,
  IPasswordConfirmation,
  ISignupCredentials,
} from "../../api"
import {
  IBoard,
  IStripeInvoice,
  IStripeProduct,
  IUIRequestError,
  IUser,
  NotificationProps,
} from "../providers"

interface IDefaultGlobalState {
  darkMode: boolean
  handleModeChange: () => void
  notifications: NotificationProps
  dismissNotification: (messageId: number) => void
  notify: (
    notificationStringOrObject: string | object,
    severity?: "success" | "primary" | "danger",
    notificationPlacement?:
      | "top-right"
      | "top-center"
      | "top-left"
      | "bottom-left"
      | "bottom-right"
      | "bottom-center"
  ) => void
}

interface IDefaultBoardContext {
  handleCreateBoard: () => void
  handleStarBoard: (ev: any, board: IBoard) => void
  boards: IBoard[]
  activeBoard: IBoard | undefined | null
}

interface IDefaultAuthContext {
  loading: boolean
  user?: IUser
  isAuthenticated: boolean
  rehydrateUser: (newUser?: IUser) => void
  logout: () => {} | void | null
  login: (formData: ILoginCredentials) => Promise<void>
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

export const BoardContext = createContext<IDefaultBoardContext>(
  {} as IDefaultBoardContext
)

export const useGlobalState = () => useContext(GlobalContext)
export const useHomeContext = () => useContext(HomeContext)
export const useAuth = () => useContext(AuthContext)
export const useBoard = () => useContext(BoardContext)
export const useStripeContext = () => useContext(StripeContext)
