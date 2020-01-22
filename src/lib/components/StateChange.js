import React from 'react'
import PropTypes from 'prop-types'
import Json from './Json'
import { format } from 'date-fns'

export const StateChange = ({ date, action, diff, prev, next, dispatchSetState }) =>
  <tr>
    <td>{format(date, 'HH:mm:ss.SSS')}</td>
    <td><Json data={action} /></td>
    <td><Json data={diff} length={20} /></td>
    <td><Json data={prev} length={20} /></td>
    <td><Json data={next} length={20} /></td>
    <td><button onClick={dispatchSetState}>Load</button></td>
  </tr>

StateChange.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  action: PropTypes.object.isRequired,
  diff: PropTypes.object,
  prev: PropTypes.object.isRequired,
  next: PropTypes.object.isRequired,
  dispatchSetState: PropTypes.func.isRequired
}

export default StateChange
