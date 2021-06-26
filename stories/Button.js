import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import './button.css'
// import ObjectEditor from '../dist/esm/components/ObjectEditor'

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary, backgroundColor, size, label, ...props }) => {
  const dispatch = useDispatch()
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary'
  const className = ['storybook-button', `storybook-button--${size}`, mode].join(' ')
  const count = useSelector(state => state.counter)
  const mesg = `${label} (${count})`
  const onClick = () => dispatch({ type: 'increment' })

  return (
    <>
      <button type='button' className={className} onClick={onClick}>
        {mesg}
      </button>
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
  label: PropTypes.string.isRequired,
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
