import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import './button.css'
// import ObjectEditor from '../dist/esm/components/ObjectEditor'

const ButtonCounter = ({ name, count, id, size, primary }) => {
  const dispatch = useDispatch()
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary'
  const className = ['storybook-button', `storybook-button--${size}`, mode].join(' ')
  const mesg = `${name || 'Button'} (${count})`
  return (
    <button type='button' className={className} onClick={() => dispatch({ type: 'increment', id })}>
      {mesg}
    </button>
  )
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary, backgroundColor, size, label, ...props }) => {
  const counters = useSelector(state => state.counters)
  return (
    <>
      {counters.map(({ count, name }, i) => <ButtonCounter key={i} name={name} count={count} id={i} size={size} primary={primary} />)}
    </>
  )
}

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  label: PropTypes.string,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func
}

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined
}
