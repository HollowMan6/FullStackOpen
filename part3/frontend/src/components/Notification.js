const Notification = ({ message, errorMessage }) => {
  const additionalClass = errorMessage ? 'error' : ''
  if (message === null && errorMessage === null) {
    return null
  }

  return (
    <div className={`base ${additionalClass}`}>
      {message} {errorMessage}
    </div>
  )
}

export default Notification