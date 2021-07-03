
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Text = () => {
  const dispatch = useDispatch()

  const value = useSelector(state => state.text) || ''

  const onChange = ev => dispatch({
    type: 'setText',
    value: ev.target.value
  })

  return <input value={value} onChange={onChange} />
}

export default Text
