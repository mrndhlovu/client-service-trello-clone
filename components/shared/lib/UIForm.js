import { forwardRef } from "react"
import { Formik } from "formik"

import { Form } from "react-bootstrap"

import FormInput from "./FormInput"
import FormTextArea from "./FormTextArea"

const UIForm = forwardRef(
  (
    {
      children,
      dataTestId,
      id,
      initialState,
      submitHandler,
      validate,
      validationSchema,
    },
    ref
  ) => {
    return (
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
        innerRef={ref}
        validate={validate}
      >
        <Form id={id} data-testid={dataTestId}>
          {children}
        </Form>
      </Formik>
    )
  }
)

UIForm.Input = FormInput
UIForm.TextArea = FormTextArea
UIForm.Group = Form.Group

export { UIForm }
