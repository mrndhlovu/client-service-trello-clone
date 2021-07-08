import { ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
}

const HeaderButton = ({ children, className = "header-button" }: Props) => {
  return (
    <button className={className}>
      <span>{children}</span>
    </button>
  )
}

export default HeaderButton
