import router from "next/router"
import { useCallback, useState } from "react"

import { signupUser, loginUser, logoutUser } from "../../api"
import { ROUTES } from "../../util/constants"
import { AuthContext } from "../hooks/context"

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState()

  const rehydrateUser = useCallback(newUser => {
    const authenticated = Boolean(newUser?.email)

    setUser(newUser)
    setIsAuthenticated(authenticated)
  }, [])

  const signup = useCallback(
    async (formData, callback) => {
      setLoading(true)

      await signupUser(formData)
        .then(res => {
          callback?.()
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
          callback?.()
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

  const logout = useCallback(
    async callback => {
      setLoading(true)

      await logoutUser()
        .then(() => {
          router.push(ROUTES.login)
          rehydrateUser()
          callback?.()
          setLoading(false)
        })
        .catch(error => {
          callback?.(error?.response?.data)
          rehydrateUser()
          setLoading(false)
          if (
            error.response.data.errors?.[0]?.message.indexOf(
              "Authorization"
            ) !== -1
          ) {
            router.push(ROUTES.login)
          }
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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider }
