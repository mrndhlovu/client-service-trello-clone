import { useRouter } from "next/router"
import { useEffect } from "react"
import { Button } from "@chakra-ui/react"
import Link from "next/link"

import { ROUTES } from "../../util/constants"

interface IProps {
  isVerified: boolean | undefined
}

const AccountVerification = ({ isVerified }: IProps) => {
  const router = useRouter()
  const { token } = router.query

  useEffect(() => {
    if (!token) return
    router.push({ pathname: router.pathname, query: {} }, router.pathname, {
      shallow: true,
    })
  }, [])

  return (
    <div>
      <p>
        {
          <h1>{`Account verification ${
            isVerified ? "successful" : "failed"
          }`}</h1>
        }
        {isVerified && (
          <Link href={`/${ROUTES.login}`}>
            <a>
              <Button size="sm" colorScheme="twitter">
                Go to login
              </Button>
            </a>
          </Link>
        )}
      </p>
    </div>
  )
}

export default AccountVerification
