import React from "react"
import Link from "next/link"
import HeaderStyles from "./Styles"

const Header = () => {
  const activeBoardColor = ""
  return (
    <HeaderStyles activeBoardColor={activeBoardColor}>
      <h2>
        <Link href="/">
          <a>Home</a>
        </Link>
      </h2>
    </HeaderStyles>
  )
}

export default Header
