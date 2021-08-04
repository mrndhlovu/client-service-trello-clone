import router from "next/router"
import { ReactChildren, useCallback, useState } from "react"

import { AuthContext } from "../hooks/context"
import { ROUTES } from "../../util/constants"
import { signupUser, loginUser, logoutUser, refreshAuthToken } from "../../api"

export interface IUser {
  [key: string]: any
}

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<IUser>()

  const rehydrateUser = useCallback((newUser?: IUser) => {
    const authenticated = Boolean(newUser?.email)

    setUser(newUser)
    setIsAuthenticated(authenticated)

    if (!authenticated) return router.push(ROUTES.login)
  }, [])

  const signup = useCallback(
    async (formData, callback) => {
      setLoading(true)

      await signupUser(formData)
        .then(res => {
          rehydrateUser(res?.data)
          setLoading(false)
        })
        .catch(error => {
          callback?.(error?.response?.data)
          setLoading(false)
        })
    },
    [rehydrateUser]
  )

  const login = useCallback(
    async (formData, callback) => {
      setLoading(true)

      await loginUser(formData)
        .then(res => {
          router.push(ROUTES.home)
          rehydrateUser(res?.data)
          setLoading(false)
        })
        .catch(error => {
          callback?.(error?.response?.data)
          setLoading(false)
        })
    },
    [rehydrateUser]
  )

  const refreshToken = useCallback(async () => {
    await refreshAuthToken()
      .then(res => res.data)
      .catch(() => rehydrateUser())
  }, [rehydrateUser])

  const logout = useCallback(
    async callback => {
      setLoading(true)

      await logoutUser()
        .then(() => {
          rehydrateUser()
          setLoading(false)
        })
        .catch(error => {
          callback?.(error?.response?.data)
          rehydrateUser()
          setLoading(false)
        })
    },
    [rehydrateUser]
  )

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        rehydrateUser,
        logout,
        login,
        signup,
        loading,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider }
