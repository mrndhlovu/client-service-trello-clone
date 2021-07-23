import { useCallback, useState } from "react"

import { signupUser, loginUser, logoutUser } from "../../apiRequests"
import { AuthContext } from "../hooks/context"

const AuthContextProvider = ({ children, ssrAuthData }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => ssrAuthData?.isAuthenticated
  )
  const [loading, setLoading] = useState(() => ssrAuthData?.isLoading ?? false)

  const [user, setUser] = useState(() => ssrAuthData?.user)

  const rehydrateUser = useCallback(userData => {
    setUser(userData?.data)
  }, [])

  const signup = useCallback(async (formData, callback) => {
    setLoading(true)

    await signupUser(formData)
      .then(res => {
        callback(undefined, res?.data)
        setIsAuthenticated(true)
        setLoading(false)
      })
      .catch(error => {
        callback(error?.response?.data)
        setIsAuthenticated(false)
        setUser(undefined)
        setLoading(false)
      })
  }, [])

  const login = useCallback(async (formData, callback) => {
    setLoading(true)

    await loginUser(formData)
      .then(res => {
        callback(undefined, res?.data)
        setIsAuthenticated(true)
        setLoading(false)
      })
      .catch(error => {
        callback(error?.response?.data)
        setIsAuthenticated(false)
        setLoading(false)
      })
  }, [])

  const logout = useCallback(async callback => {
    setLoading(true)

    await logoutUser()
      .then(res => {
        setIsAuthenticated(false)
        callback?.(res?.data)
        setLoading(false)
      })
      .catch(error => {
        callback?.(error?.response?.data)
        setIsAuthenticated(false)
        setLoading(false)
      })
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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider }
