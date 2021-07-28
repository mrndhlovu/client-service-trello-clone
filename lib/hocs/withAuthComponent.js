import { useEffect } from "react"

import { useAuth } from "../hooks/context"

export const withAuthComponent = Component => {
  return ({ currentUser, data }) => {
    const { rehydrateUser } = useAuth()

    useEffect(() => {
      rehydrateUser(currentUser)
    }, [])

    return <Component data={data} />
  }
}
