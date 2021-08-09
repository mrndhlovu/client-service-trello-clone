import { useCallback, useState } from "react"
import { uniqueId } from "lodash"

import { GlobalContext } from "../hooks/context"
import { getAlertString } from "../../util"
import { useLocalStorage } from "../hooks"

export interface IUIRequestError {
  errors: [
    {
      [key: string]: {
        message: string
      }
    }
  ]
}

export interface NotificationMessage {
  id: number
  severity: string
  text: string
}

export type NotificationProps = {
  list: NotificationMessage[]
  placement:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center"
}

export const notificationsInitialState: NotificationProps = {
  list: [],
  placement: "top-left",
}

export interface IThemeMode {
  darkMode: boolean
}

const GlobalContextProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<string, IThemeMode>("theme", {
    darkMode: false,
  })
  const [notifications, setNotifications] = useState<NotificationProps>(
    notificationsInitialState
  )

  const handleModeChange = () => {
    return setTheme((prev: IThemeMode) => {
      return { ...prev, darkMode: !prev?.darkMode }
    })
  }

  const dismissNotification = useCallback(id => {
    const shouldClearAllNotifications = id < 1
    if (shouldClearAllNotifications) {
      return setNotifications(notificationsInitialState)
    }
    setNotifications(prev => ({
      ...prev,
      list: [
        ...prev.list.filter(
          (message: NotificationMessage) => message?.id !== id
        ),
      ],
    }))
  }, [])

  const handleAlert = useCallback((newState, placement) => {
    setNotifications(prevState => ({
      ...prevState,
      placement: placement ? placement : prevState?.placement,
      list: [
        ...prevState.list,
        {
          ...newState,
          text: getAlertString(newState.text),
          id: parseInt(uniqueId(), 10),
        },
      ],
    }))
  }, [])

  const notify = useCallback(
    (text, severity, placement = "top-center") =>
      handleAlert(
        {
          severity,
          text,
        },
        placement
      ),
    [handleAlert]
  )

  return (
    <GlobalContext.Provider
      value={{
        dismissNotification,
        handleModeChange,
        darkMode: theme?.darkMode,
        notifications,
        notify,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export { GlobalContextProvider }
