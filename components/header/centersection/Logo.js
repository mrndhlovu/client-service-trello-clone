import Link from "next/link"

import { BsFileCheck } from "react-icons/bs"

import { ROUTES, APP_NAME } from "../../../util/constants"

const Logo = () => {
  return (
    <div className="header-logo-content">
      <Link href={ROUTES.home}>
        <a className="header-logo-text">
          <span>
            <BsFileCheck />
          </span>
          {APP_NAME}
        </a>
      </Link>
    </div>
  )
}

export default Logo
