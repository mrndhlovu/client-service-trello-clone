import { IUIRequestError } from "../../lib/providers/GlobalContextProvider"

interface IProps {
  feedback: IUIRequestError["errors"]
}

const FormFeedback = ({ feedback }: IProps) => {
  return (
    <div className="auth-form-link-option">
      <ul>
        {feedback?.map((error, index) => {
          return <li key={index}>{error?.message}</li>
        })}
      </ul>
    </div>
  )
}

export default FormFeedback
