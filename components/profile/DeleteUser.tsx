import { useState } from "react"

import { Button } from "@chakra-ui/react"

import { deleteUser, IPasswordConfirmation } from "../../api"
import { useAuth } from "../../lib/hooks/context"
import PasswordConfirmation from "../auth/PasswordConfirmation"

const DeleteUser = () => {
  const { rehydrateUser, verifyUserPassword } = useAuth()

  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState<boolean>(false)

  const handleDelete = async (formData: IPasswordConfirmation) => {
    const response = await verifyUserPassword(formData)

    if (!response) return

    deleteUser()
      .then(() => rehydrateUser())
      .catch(err => {})
  }

  const handleOnClick = () => setShowPasswordConfirmation(prev => !prev)

  return (
    <div className="option-container">
      <p>Delete Account</p>
      <p>You will not be able to recover your account.</p>
      {showPasswordConfirmation ? (
        <PasswordConfirmation
          handleClick={handleDelete}
          buttonText="Yes delete my account"
        />
      ) : (
        <div>
          <Button onClick={handleOnClick}>Delete</Button>
        </div>
      )}
    </div>
  )
}

export default DeleteUser
