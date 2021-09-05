import { AxiosPromise, AxiosResponse } from "axios"
import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import { IAxiosInterceptorError } from "../../api"

import { isBrowser } from "../../util"

export const useLocalStorage = <T extends string, Y>(
  key: T,
  defaultValue: Y
) => {
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

export const useFetch = () => {
  const requestHandler = useCallback(
    async <T extends AxiosPromise>(requestHandler: T) => {
      return await requestHandler
        .then((res: AxiosResponse) => {
          return [res.data]
        })
        .catch((err: IAxiosInterceptorError) => [, err.message])
    },
    []
  )

  return [requestHandler]
}

export interface IntersectionObserverOptions {
  rootMargin?: IntersectionObserver["rootMargin"]
  threshold?: number
  thresholds?: number[]
}

export const useOnScreen = (options: IntersectionObserverOptions) => {
  const [ref, setRef] = useState<HTMLElement>()
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      options
    )

    if (ref) {
      observer.observe(ref)
    }

    return () => {
      if (ref) {
        observer.unobserve(ref)
      }
    }
  }, [options, ref])

  return [setRef, isVisible]
}
