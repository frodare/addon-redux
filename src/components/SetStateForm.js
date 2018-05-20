import React from 'react'
import PropTypes from 'prop-types'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import * as events from '../events'

export const StatePanel = ({ json, state, saveJson, onChange }) =>
  <div>
    <textarea value={json || JSON.stringify(state, null, 2)} onChange={onChange} />
    <button onClick={saveJson}>Save</button>
  </div>

StatePanel.propTypes = {
  json: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  saveJson: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

const buildHandlers = ({
  saveJson: ({ json, channel }) => () => channel.emit(events.SET_STATE, JSON.parse(json)),
  onChange: ({ setJson }) => event => setJson(event.target.value)
})

const enhance = compose(
  withState('json', 'setJson', ''),
  withHandlers(buildHandlers)
)

export default enhance(StatePanel)
