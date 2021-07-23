import { Form } from "react-bootstrap"

const FormFeedback = ({ errorMsg }) => {
  return (
    <Form.Control.Feedback type="invalid" className="field-feedback-text">
      {errorMsg}
    </Form.Control.Feedback>
  )
}

export default FormFeedback
