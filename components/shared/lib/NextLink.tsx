import Link from "next/link"

const NextLink = ({ href, linkText }: { href: string; linkText: string }) => {
  return (
    <Link href={href}>
      <a href="/">{linkText}</a>
    </Link>
  )
}

export default NextLink
