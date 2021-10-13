import Link from "next/link"
import { MouseEvent, ReactNode } from "react"

const NextLink = ({
  className,
  href,
  id,
  children,
  onClick,
}: {
  className?: string
  href?: string
  id?: string
  children: string | ReactNode
  onClick?: (ev: MouseEvent) => void
}) => {
  return (
    <Link href={href}>
      <a className={className} id={id} onClick={onClick}>
        {children}
      </a>
    </Link>
  )
}

export { NextLink }
