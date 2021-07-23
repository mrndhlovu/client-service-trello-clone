import { forwardRef, useMemo } from "react"
import { useField } from "formik"

import { Form } from "react-bootstrap"

import FormFeedback from "./FormFeedback"

const FormInput = forwardRef((props, ref) => {
  const [field, meta] = useField(props?.name)

  const hasError = meta.touched && meta.error

  return useMemo(
    () => (
      <Form.Group className="mb-3 form-input">
        {props?.label && <Form.Label>{props?.label}*</Form.Label>}
        <Form.Control isInvalid={hasError} ref={ref} {...props} {...field} />

        {hasError && <FormFeedback errorMsg={meta?.error} />}
      </Form.Group>
    ),
    [props, field]
  )
})

export default FormInput
