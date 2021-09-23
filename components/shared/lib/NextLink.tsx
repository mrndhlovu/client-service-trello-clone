import Link from "next/link"
import { MouseEvent } from "react"

const NextLink = ({
  href,
  linkText,
  onClick,
  id,
}: {
  onClick?: (ev: MouseEvent) => void
  href?: string
  linkText: string
  id?: string
}) => {
  return (
    <Link href={href}>
      <a id={id} onClick={onClick}>
        {linkText}
      </a>
    </Link>
  )
}

export default NextLink
