import { useEffect, ComponentType } from "react"

import { useAuth } from "../hooks/context"

interface IProps {
  data: any
  currentUser: any
}

export const withAuthComponent = <T extends IProps>(
  Component: ComponentType<T>
) => {
  return (props: IProps) => {
    const { rehydrateUser } = useAuth()

    useEffect(() => {
      rehydrateUser(props?.currentUser)
    }, [])

    return <Component {...(props as T)} />
  }
}
