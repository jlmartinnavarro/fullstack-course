const Notification = ({ message, classs}) => {
    if (message === null || message === '') {
      return null
    }
  
    return (
      <div className={classs}>
        {message}
      </div>
    )
  }

  
export default Notification