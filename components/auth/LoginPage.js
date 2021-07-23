import { useRef, useState } from "react"

import { FORM_VALIDATION } from "../../util/formhelpers"
import { ROUTES } from "../../util/constants"
import { UIForm } from "../shared"
import { useAuth } from "../../helpers/hooks/context"
import AuthFormWrapper from "./AuthFormWrapper"

const initialState = {
  identifier: "",
  password: "",
}

const LoginPage = () => {
  const { login, loading } = useAuth()
  console.log(
    "🚀 ~ file: LoginPage.js ~ line 16 ~ LoginPage ~ loading",
    loading
  )
  const formRef = useRef()
  const [formFeedback, setFormFeedback] = useState()

  const handleSubmit = async ev => {
    ev.preventDefault()

    const formData = {
      identifier: formRef.current?.values?.identifier,
      password: formRef.current?.values?.password,
    }

    await login(formData, err => {
      if (err) {
        return setFormFeedback(err?.errors)
      }
    })
  }

  return (
    <AuthFormWrapper
      buttonText="Login"
      footerRedirectText="Sign up for an account"
      formFeedback={formFeedback}
      formId="login-form"
      handleSubmit={handleSubmit}
      heading="Login to your account"
      initialState={initialState}
      redirect={ROUTES.signup}
      ref={formRef}
      validationSchema={FORM_VALIDATION.LOGIN}
    >
      <UIForm.Group className="mb-3">
        <UIForm.Input
          required
          placeholder="Username or Email"
          name="identifier"
        />
        <UIForm.Input
          name="password"
          required
          placeholder="Password"
          type="password"
        />
      </UIForm.Group>
    </AuthFormWrapper>
  )
}

export default LoginPage
