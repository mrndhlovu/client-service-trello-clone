import { isEmpty } from "lodash"
import {
  forwardRef,
  ReactChild,
  ReactElement,
  useLayoutEffect,
  useState,
  useRef,
} from "react"
import router from "next/router"
import styled from "styled-components"

import { isBrowser } from "../../util"
import { LoadingSpinner, UIForm } from "../shared"
import { refreshAuthToken } from "../../api"
import { ROUTES } from "../../util/constants"
import { useAuth } from "../../lib/hooks/context"
import AuthFormButton from "./AuthFormButton"
import AuthOptionLink from "./AuthOptionLink"
import FormFeedback from "./FormFeedback"

interface IProps {
  buttonText: string
  children: ReactChild
  footerRedirectText: string
  handleSubmit: (data: any) => void
  heading: string
  initialState: { [key: string]: any }
  redirect: string
  redirectTo: string
  validationSchema: { [key: string]: any }
  formId: string
}

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
    background-color: ${props => props.theme.colors.bgLight};
    border-radius: 3px;
    box-shadow: ${props => props.theme.colors.darkBoxShadowBorder};
    color: ${props => props.theme.colors.border};
    display: flex;
    flex-direction: column;
  }

  h5 {
    color: ${props => props.theme.colors.border};
  }

  .auth-form-link-option {
    color: ${props => props.theme.colors.twitter};
    padding-top: 16px;
    margin-top: 15px;
    border-top: 1px solid ${props => props.theme.colors.border};
    font-size: 14px;
    text-align: center;
    line-height: 20px;

    li {
      list-style: none;
    }
  }

  .auth-form-button-wrapper {
    margin-top: 36px;
  }

  .auth-form-feedback {
    color: ${props => props.theme.colors.error};
    padding-top: 16px;
    margin-top: 16px;
    border-top: 1px solid ${props => props.theme.colors.border};
    font-size: 14px;
    text-align: left;
    line-height: 20px;
  }

  .auth-form-button {
    position: relative;
    width: 100%;
  }

  .auth-form-header {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    margin-bottom: 16px;
    color: ${props => props.theme.colors.border};
    font-size: 16px;
  }
`

const AuthFormWrapper = forwardRef<HTMLInputElement, IProps>(
  (
    {
      buttonText,
      children,
      footerRedirectText,
      handleSubmit,
      heading,
      initialState,
      redirect,
      validationSchema,
      formId,
    },
    ref
  ): ReactElement => {
    if (!isBrowser) return null
    const { isAuthenticated, authError, loading } = useAuth()

    const attemptedRefresh = useRef<boolean>(false)
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
    const hasFormFeedback = !isEmpty(authError?.errors)

    useLayoutEffect(() => {
      if (!isAuthenticated && !attemptedRefresh.current) {
        attemptedRefresh.current === true
        const refreshToken = async () => {
          setIsRefreshing(true)
          const response = await refreshAuthToken()
            .then(res => res)
            .catch(() => {
              setIsRefreshing(false)
              return null
            })

          setTimeout(() => {
            if (response?.status === 200) {
              router.push(ROUTES.home)
            }
          }, 2000)
        }

        // refreshToken()
      }

      return () => {
        setIsRefreshing(false)
      }
    }, [])

    return isRefreshing ? (
      <LoadingSpinner />
    ) : (
      <Container className="auth-form-wrapper">
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

            <div className="auth-form-button-wrapper">
              <AuthFormButton
                formId={formId}
                onClick={handleSubmit}
                buttonText={buttonText}
                disabled={loading}
                loading={loading}
                variant="twitter"
              />
            </div>
          </UIForm>
          <AuthOptionLink linkText={footerRedirectText} href={redirect} />
          {hasFormFeedback && <FormFeedback feedback={authError.errors} />}
        </section>
      </Container>
    )
  }
)

export default AuthFormWrapper
