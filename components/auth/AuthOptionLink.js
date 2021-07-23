import Link from "next/link"

const AuthOptionLink = ({ href, linkText }) => {
  return (
    <div className="auth-form-link-option">
      <ul>
        <li>
          <Link href={`/${href}`}>{linkText}</Link>
        </li>
      </ul>
    </div>
  )
}

export default AuthOptionLink
