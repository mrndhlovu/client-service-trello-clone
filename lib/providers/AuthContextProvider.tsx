import router from "next/router"
import { useCallback, useEffect, useState } from "react"

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

export interface IAccountFields {
  expired?: boolean
  expiresAt?: string
  id: string
  isTrial: boolean
  isVerified: boolean
  plan: string
  status: string
  email?: string
}

interface IUserBoardRoles {
  [key: string]: string[]
}

export interface IUser {
  avatar?: string
  bio?: string
  email: string
  firstname?: string
  initials?: string
  lastname?: string
  loginTypes?: "email" | "username"
  account: IAccountFields
  boardIds: string[]
  roles: IUserBoardRoles[]
  starred?: string[]
  username: string
  viewedRecent?: string[]
  multiFactorAuth: boolean
  permissionFlag: number
  id: string
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

  const signup = useCallback(async formData => {
    setLoading(true)

    await signupUser(formData)
      .then(() => router.push(`/${ROUTES.verify}?new=true`))
      .catch(error => {
        setAuthError(error?.response?.data)
        setLoading(false)
      })
  }, [])

  const verifyUserPassword = async (formData: IPasswordConfirmation) => {
    const body = {
      ...formData,
      identifier: user.email,
    }
    return (await verifyUserCredentials(body)
      .then(res => res.status)
      .catch(() => null)) as number | null
  }

  const login = useCallback(async formData => {
    setLoading(true)

    await loginUser(formData)
      .then(res => {
        if (res.data.multiFactorAuth) {
          return router.push(`/${ROUTES.mfa}`)
        }
        router.push(ROUTES.home)
      })
      .catch(error => {
        setAuthError(error?.response?.data)
        setLoading(false)
      })
  }, [])

  const fetchUser = useCallback(async () => {
    await getCurrentUser()
      .then(res => rehydrateUser(res.data))
      .catch(() => null)
  }, [rehydrateUser])

  const verifyLogin = useCallback(async formData => {
    setLoading(true)

    await verifyMfaCode(formData)
      .then(() => {
        return router.push(ROUTES.home)
      })
      .catch(error => {
        setAuthError(error?.response?.data)
        setLoading(false)
      })
  }, [])

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
        return router.push(`/${ROUTES.login}`)
      })
      .catch(error => {
        setAuthError(error?.response?.data)
        rehydrateUser()
        setLoading(false)
      })
  }, [rehydrateUser])

  useEffect(() => {
    return () => {
      return setLoading(false)
    }
  }, [])

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
