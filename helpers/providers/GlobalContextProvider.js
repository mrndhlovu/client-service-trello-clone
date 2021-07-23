import { useCallback, useState } from "react"
import { uniqueId } from "lodash"

import { GlobalContext } from "../hooks/context"
import { getAlertString } from "../../util"

const GlobalContextProvider = ({ children }) => {
  const [lightMode, setLightMode] = useState(false)
  const [notifications, setNotifications] = useState()

  const handleModeChange = () => setLightMode(prev => !prev)

  const dismissNotification = useCallback(id => {
    const shouldClearAllNotifications = id < 1
    if (shouldClearAllNotifications) {
      return setNotifications(notificationsInitialState)
    }
    setNotifications(prev => ({
      ...prev,
      list: [...prev.list.filter(message => message?.id !== id)],
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
        lightMode,
        notifications,
        notify,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export { GlobalContextProvider }
