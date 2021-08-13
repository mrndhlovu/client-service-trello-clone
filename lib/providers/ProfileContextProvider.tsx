import { useState } from "react"

import { ProfileContext } from "../hooks/context"

const ProfileContextProvider = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const handleIndexChange = (index: number) => setActiveIndex(index)

  return (
    <ProfileContext.Provider value={{ activeIndex, handleIndexChange }}>
      {children}
    </ProfileContext.Provider>
  )
}

export { ProfileContextProvider }
