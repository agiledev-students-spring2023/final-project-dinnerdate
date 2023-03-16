import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './button.css'

const Button = ( props ) => {
  return (
    <button
      onClick={props.onClick}
      className='btn'
    >
      {props.link ? <Link to={props.link}>{props.text}</Link> : props.text}
    </button>
  )
}

Button.defaultProps = {
  text: "button",
  onClick: () => { console.log("clicked") },
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button