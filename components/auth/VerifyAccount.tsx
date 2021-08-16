import { useState } from "react"
import { useRouter } from "next/router"

import { Alert, AlertDescription, AlertTitle } from "@chakra-ui/react"

import { requestNewVerificationLink } from "../../api"
import EmailConfirmation from "./EmailConfirmation"

const VerifyAccount = () => {
  const [submitted, setSubmitted] = useState<boolean>(false)
  const router = useRouter()
  const isNew = Boolean(router.query?.new === "true")
  console.log(
    "🚀 ~ file: VerifyAccount.tsx ~ line 12 ~ VerifyAccount ~ isNew",
    isNew
  )

  const handleClick = async (formData: { email: string }) => {
    await requestNewVerificationLink(formData)
      .then(res => {
        setSubmitted(true)
      })
      .catch(err => {
        console.log(
          "🚀 ~ file: VerifyAccount.tsx ~ line 16 ~ awaitrequestNewVerificationLink ~ err",
          err
        )
      })
  }

  return (
    <Alert
      status="info"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="350px"
      className="verification-alert"
    >
      <AlertTitle className="title" mt={4} mb={1} fontSize="lg">
        Please verify your account with link sent to your email.
      </AlertTitle>
      {submitted && (
        <AlertDescription className="desc" maxWidth="sm">
          Verification link sent.
        </AlertDescription>
      )}

      {!isNew && (
        <AlertDescription className="desc" maxWidth="sm">
          <strong>OR</strong>
          <div> Request a new verification link.</div>
          <EmailConfirmation
            buttonText="Request new link"
            handleClick={handleClick}
          />
        </AlertDescription>
      )}
    </Alert>
  )
}

export default VerifyAccount
