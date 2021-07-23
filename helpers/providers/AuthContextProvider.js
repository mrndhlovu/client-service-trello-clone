import { useCallback, useState } from "react"

import { signupUser, loginUser, logoutUser } from "../../apiRequests"
import { AuthContext } from "../hooks/context"

const AuthContextProvider = ({ children, ssrAuthData }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    ssrAuthData?.isAuthenticated
  )

  const [user, setUser] = useState(ssrAuthData?.user)

  const rehydrateUser = useCallback(userData => {
    setUser(userData?.data)
  }, [])

  const signup = useCallback(async (formData, callback) => {
    await signupUser(formData)
      .then(res => {
        callback(undefined, res?.data)
        setIsAuthenticated(true)
      })
      .catch(error => {
        callback(error?.response?.data)
        setIsAuthenticated(false)
        setUser(undefined)
      })
  }, [])

  const login = useCallback(async (formData, callback) => {
    await loginUser(formData)
      .then(res => {
        callback(undefined, res?.data)
        setIsAuthenticated(true)
      })
      .catch(error => {
        callback(error?.response?.data)

        setIsAuthenticated(false)
      })
  }, [])

  const logout = useCallback(async callback => {
    await logoutUser()
      .then(res => {
        setIsAuthenticated(false)
        callback?.(res?.data)
      })
      .catch(error => {
        callback?.(error?.response?.data)
        setIsAuthenticated(false)
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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider }
