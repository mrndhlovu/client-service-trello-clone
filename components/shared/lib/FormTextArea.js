import { useField } from "formik"

import { Form, InputGroup } from "react-bootstrap"

import FormFeedback from "./FormFeedback"

const FormTextArea = props => {
  const [field, meta] = useField(props)
  const hasError = meta?.touched && meta?.error !== undefined

  return (
    <InputGroup hasValidation>
      <Form.Label htmlFor={`contact-form-${field?.name}`}>
        <span> {props?.label}</span>
        {props?.required && <span>*</span>}
      </Form.Label>
      <Form.Control
        data-testid={props?.dataTestId}
        required={props?.required}
        id={`form-${field?.name}`}
        rows={6}
        {...field}
      />

      {hasError && (
        <FormFeedback
          message={meta?.error || props?.message}
          type={meta?.error ? "error" : "message"}
        />
      )}
    </InputGroup>
  )
}

export default FormTextArea
