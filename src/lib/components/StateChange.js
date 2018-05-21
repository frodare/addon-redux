import React from 'react'
import PropTypes from 'prop-types'
import Json from './Json'

export const StateChange = ({ date, action, diff, prev, next }) =>
  <tr>
    <td>{date}</td>
    <td>{action.type}</td>
    <td><Json data={action} /></td>
    <td><Json data={diff} /></td>
    <td><Json data={prev} /></td>
    <td><Json data={next} /></td>
    <td><button>Load</button></td>
  </tr>

StateChange.propTypes = {
  date: PropTypes.object.isRequired,
  action: PropTypes.object.isRequired,
  diff: PropTypes.object.isRequired,
  prev: PropTypes.object.isRequired,
  next: PropTypes.object.isRequired
}

export default StateChange
