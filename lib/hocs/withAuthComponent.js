import { useEffect } from "react"

import { useAuth } from "../hooks/context"

export const withAuthComponent = Component => {
  return ({ currentUser, data }) => {
    const { rehydrateUser, isAuthenticated, loading, user } = useAuth()

    useEffect(() => {
      rehydrateUser(currentUser)
    }, [])

    return <Component data={data} />
  }
}
