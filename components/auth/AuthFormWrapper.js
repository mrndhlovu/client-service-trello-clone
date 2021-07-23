import { isEmpty } from "lodash"
import { forwardRef, useEffect } from "react"
import router from "next/router"
import styled from "styled-components"

import { ROUTES } from "../../util/constants"
import { UIForm, UIButton } from "../shared"
import { useAuth } from "../../helpers/hooks/context"
import AuthOptionLink from "./AuthOptionLink"
import FormFeedback from "./FormFeedback"

const Container = styled.div`
  ${props => props.theme.mixins.flex("column")};
  justify-content: left;
  height: 100vh;
  width: 100vw;

  section {
    ${props => props.theme.styles.absoluteCenter};
    margin: 0px auto 24px;
    width: 400px;
    padding: 32px 40px;
    background: rgb(255, 255, 255);
    border-radius: 3px;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 10px;
    box-sizing: border-box;
    color: rgb(94, 108, 132);
  }

  h5 {
    color: ${props => props.theme.colors.bgDark};
  }

  .auth-form-link-option {
    color: rgb(107, 119, 140);
    padding-top: 16px;
    margin-top: 32px;
    border-top: 1px solid rgb(213, 216, 222);
    font-size: 14px;
    text-align: center;
    line-height: 20px;
  }

  .field-feedback-text {
    font-size: 0.7rem;
    font-weight: 600;
  }

  .form-input {
    position: relative;
  }

  .auth-form-header {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    margin-bottom: 16px;
    color: rgb(94, 108, 132);
    font-size: 16px;
  }
`

const AuthFormWrapper = (
  {
    buttonText,
    children,
    footerRedirectText,
    formFeedback,
    handleSubmit,
    heading,
    initialState,
    redirect,
    validationSchema,
    formId,
  },
  ref
) => {
  const { isAuthenticated } = useAuth()

  const hasFormFeedback = !isEmpty(formFeedback)

  useEffect(() => {
    if (isAuthenticated) return router.push(ROUTES.home)
  }, [isAuthenticated])

  return (
    <Container>
      <section>
        <div className="auth-form-header">
          <h5>{heading}</h5>
        </div>
        <UIForm
          id={formId}
          ref={ref}
          initialState={initialState}
          validationSchema={validationSchema}
        >
          {children}

          <UIForm.Group className="d-grid gap-2">
            <UIButton
              formId={formId}
              onClick={handleSubmit}
              buttonText={buttonText}
            />
          </UIForm.Group>
        </UIForm>
        <AuthOptionLink linkText={footerRedirectText} href={redirect} />
        {hasFormFeedback && <FormFeedback feedback={formFeedback} />}
      </section>
    </Container>
  )
}

export default forwardRef(AuthFormWrapper)
