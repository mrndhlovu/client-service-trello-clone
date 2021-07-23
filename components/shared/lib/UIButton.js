import PropTypes from "prop-types"

import { Button } from "react-bootstrap"

const UIButton = ({
  buttonText,
  formId,
  onClick,
  className,
  variant,
  ...rest
}) => (
  <Button
    className={`${className || ""}`}
    form={formId}
    onClick={onClick}
    variant={variant}
    {...rest}
  >
    {buttonText}
  </Button>
)

UIButton.defaultProps = {
  className: "",
  formId: "",
  variant: "primary",
  onClick: () => {},
}

UIButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  className: PropTypes.string,
  formId: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
}

export { UIButton }
