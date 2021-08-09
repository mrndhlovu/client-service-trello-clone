import { useRouter } from "next/router"
import { useEffect } from "react"

const AccountVerificationPage = ({ isVerified }) => {
  const router = useRouter()
  const { token } = router.query

  useEffect(() => {
    if (!token) return
    router.replace({ pathname: router.pathname })
  }, [])

  return <div>AccountVerificationPage</div>
}

export default AccountVerificationPage
