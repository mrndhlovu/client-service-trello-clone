const FormFeedback = ({ feedback }) => {
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
