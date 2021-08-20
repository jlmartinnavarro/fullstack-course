import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
const Toggle = React.forwardRef((props,ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = { display: visible ? 'none' : '' }
  const toggleNonVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(ref,() => {
    return{
      toggleVisibility
    }
  })
  return (
    <div>
      <div style={toggleVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={toggleNonVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Toggle.displayName = 'Toggle'

Toggle.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
export default Toggle