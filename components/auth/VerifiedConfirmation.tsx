import Link from "next/link"

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
} from "@chakra-ui/react"

import { ROUTES } from "../../util/constants"

const VerifiedConfirmation = () => {
  return (
    <Alert
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="300px"
      className="verification-alert"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle className="title" mt={4} mb={1} fontSize="lg">
        Account verified! Thank you.
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        <Link href={`/${ROUTES.login}`}>
          <a>
            <Button size="sm" colorScheme="twitter">
              Go to login
            </Button>
          </a>
        </Link>
      </AlertDescription>
    </Alert>
  )
}

export default VerifiedConfirmation
