import { FormHelperText } from "@chakra-ui/react"

interface IProps {
  errorMsg: string
}

const FormFeedback = ({ errorMsg }: IProps) => {
  return (
    <FormHelperText type="invalid" className="field-feedback-text">
      {errorMsg}
    </FormHelperText>
  )
}

export default FormFeedback
