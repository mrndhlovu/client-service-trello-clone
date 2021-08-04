import { createContext, useContext } from "react"
import { ILoginCredentials, ISignupCredentials } from "../../api"
import { IBoard, IUIRequestError, IUser, NotificationProps } from "../providers"

interface IDefaultGlobalState {
  lightMode: boolean
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
  rehydrateUser: (newUser?: IUser) => void | IUser
  logout: (callback?: (data?: IUIRequestError) => {} | IUIRequestError) => {}
  login: (
    formData: ILoginCredentials,
    callback?: (err?: IUIRequestError, user?: IUser) => IUIRequestError | IUser
  ) => IUIRequestError | IUser
  signup: (
    formData: ISignupCredentials,
    callback?: (err?: IUIRequestError) => IUIRequestError
  ) => IUIRequestError | IUser
  refreshToken: () => {} | void | null
}

export const GlobalContext = createContext<IDefaultGlobalState>(
  {} as IDefaultGlobalState
)

export const ThemeContext = createContext(null)
export const HomeContext = createContext({})
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
