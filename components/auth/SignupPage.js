import { useRef, useState } from "react"

import { FORM_VALIDATION } from "../../util/formhelpers"
import { ROUTES } from "../../util/constants"
import { UIForm } from "../shared"
import { useAuth } from "../../helpers/hooks/context"
import AuthFormWrapper from "./AuthFormWrapper"

const initialState = {
  username: "",
  email: "",
  password: "",
}

const SignupPage = () => {
  const { signup } = useAuth()
  const formRef = useRef()
  const [formFeedback, setFormFeedback] = useState()

  const handleSubmit = async ev => {
    ev.preventDefault()
    await signup(formRef.current.values, err => {
      if (err) {
        return setFormFeedback(err?.errors)
      }
    })
  }

  return (
    <AuthFormWrapper
      buttonText="Submit"
      footerRedirectText="Already have an account?"
      formFeedback={formFeedback}
      formId="signup-form"
      handleSubmit={handleSubmit}
      heading="Signup for an account"
      initialState={initialState}
      redirect={ROUTES.login}
      ref={formRef}
      validationSchema={FORM_VALIDATION.REGISTER}
    >
      <UIForm.Group className="mb-3">
        <UIForm.Input required placeholder="Username" name="username" />
        <UIForm.Input required placeholder="Email" name="email" />
        <UIForm.Input
          type="password"
          required
          placeholder="Password"
          name="password"
        />
      </UIForm.Group>
    </AuthFormWrapper>
  )
}

export default SignupPage
