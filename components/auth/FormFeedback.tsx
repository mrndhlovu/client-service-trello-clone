interface IProps {
  feedback: string[]
}

const FormFeedback = ({ feedback }: IProps) => {
  return (
    <div className="auth-form-feedback">
      <ul>
        {feedback?.map((message, index) => {
          return <li key={index}>{message}</li>
        })}
      </ul>
    </div>
  )
}

export default FormFeedback
