import { connect } from 'react-redux'

const Notification = ({notifications}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <>
      {notifications.map(({content, id}) => <div key={id} style={style}>{content}</div>)}
    </>
  )
}

export default connect(
  (state) => {return {notifications: state.notifications}},
  null
)(Notification)