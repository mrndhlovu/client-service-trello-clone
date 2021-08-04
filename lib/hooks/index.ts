import { useEffect, useState } from "react"

import { isBrowser } from "../../util"

export const useLocalStorage = (key: string, defaultValue: any) => {
  const [storageValue, setStorageValue] = useState(() => {
    if (!isBrowser) return defaultValue

    const storedValue = localStorage.getItem(key)
    return storedValue === null ? defaultValue : JSON.parse(storedValue)
  })

  const handleStorage = (newValue: (newValue: any) => void | string) => {
    setStorageValue((prevState: any) => {
      const result =
        typeof newValue === "function" ? newValue(prevState) : newValue

      localStorage.setItem(key, JSON.stringify(result))

      return result
    })
  }

  useEffect(() => {
    const listener = ev => {
      const isLocalStorageEvent = ev?.storageArea === localStorage
      const keyFoundInLocalStorage = ev?.key === key

      if (isLocalStorageEvent && keyFoundInLocalStorage) {
        setStorageValue(JSON.parse(ev.newValue))
      }
    }

    window.addEventListener("storage", listener)

    return () => {
      window.removeEventListener("storage", listener)
    }
  }, [key])

  return [storageValue, handleStorage]
}
