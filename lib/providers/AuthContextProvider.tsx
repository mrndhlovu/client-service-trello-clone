import router from "next/router"
import { useCallback, useState } from "react"

import { AuthContext } from "../hooks/context"
import { ROUTES } from "../../util/constants"
import {
  signupUser,
  verifyMfaCode,
  loginUser,
  logoutUser,
  refreshAuthToken,
  verifyUserCredentials,
  IPasswordConfirmation,
  getCurrentUser,
} from "../../api"
import { IUIRequestError } from "./GlobalContextProvider"

export interface IUser {
  [key: string]: any
}

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<IUser>()

  const [authError, setAuthError] = useState<IUIRequestError | undefined>()

  const rehydrateUser = useCallback((newUser?: IUser) => {
    const authenticated = Boolean(newUser?.email)

    setUser(newUser)
    setIsAuthenticated(authenticated)

    if (!authenticated) return router.push(ROUTES.login)
  }, [])

  const signup = useCallback(
    async formData => {
      setLoading(true)

      await signupUser(formData)
        .then(res => {
          rehydrateUser(res?.data)
          setLoading(false)
        })
        .catch(error => {
          setAuthError(error?.response?.data)
          setLoading(false)
        })
    },
    [rehydrateUser]
  )

  const verifyUserPassword = async (formData: IPasswordConfirmation) => {
    const body = {
      ...formData,
      identifier: user.email,
    }
    return (await verifyUserCredentials(body)
      .then(res => res.status)
      .catch(() => null)) as number | null
  }

  const login = useCallback(
    async formData => {
      setLoading(true)

      await loginUser(formData)
        .then(res => {
          setLoading(false)
          if (res.data.multiFactorAuth) {
            return router.push(`/${ROUTES.mfa}`)
          }

          router.push(ROUTES.home)
          rehydrateUser(res?.data)
        })
        .catch(error => {
          setAuthError(error?.response?.data)
          setLoading(false)
        })
    },
    [rehydrateUser]
  )

  const fetchUser = useCallback(async () => {
    await getCurrentUser()
      .then(res => rehydrateUser(res.data))
      .catch(() => null)
  }, [rehydrateUser])

  const verifyLogin = useCallback(
    async formData => {
      setLoading(true)

      await verifyMfaCode(formData)
        .then(res => {
          setLoading(false)

          router.push(ROUTES.home)
          rehydrateUser(res?.data)
        })
        .catch(error => {
          setAuthError(error?.response?.data)
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

  const logout = useCallback(async () => {
    setLoading(true)

    await logoutUser()
      .then(() => {
        rehydrateUser()
        setLoading(false)
      })
      .catch(error => {
        setAuthError(error?.response?.data)
        rehydrateUser()
        setLoading(false)
      })
  }, [rehydrateUser])

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
        verifyLogin,
        authError,
        verifyUserPassword,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider }
