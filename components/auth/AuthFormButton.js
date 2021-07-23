import PropTypes from "prop-types"

import { Button, Spinner } from "react-bootstrap"

const AuthFormButton = ({
  buttonText,
  formId,
  onClick,
  className,
  variant,
  loading,
  spinner,
  ...rest
}) => (
  <Button
    className={`auth-form-button ${className || ""}`}
    form={formId}
    onClick={onClick}
    variant={variant}
    {...rest}
  >
    {loading ? (
      <Spinner
        className="auth-form-button-spinner"
        size="sm"
        animation="border"
        role="status"
      />
    ) : (
      buttonText
    )}
  </Button>
)

AuthFormButton.defaultProps = {
  className: "",
  formId: "",
  variant: "primary",
  onClick: () => {},
  spinner: false,
  loading: false,
}

AuthFormButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  className: PropTypes.string,
  formId: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  spinner: PropTypes.bool,
  loading: PropTypes.bool,
}

export default AuthFormButton
