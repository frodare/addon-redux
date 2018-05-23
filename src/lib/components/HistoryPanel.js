import React from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'recompose/lifecycle'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import * as events from '../events'
import StateChange from './StateChange'
import { setStateAction } from '../../enhancer'
import * as types from '../actionTypes'

const mapSateChange = (change, i) => <StateChange {...change} key={change.date.valueOf()} />

export const HistoryPanel = ({ changes, enabled }) => {
  if (!enabled) return <div className='addon-redux-disabled'>withRedux Not Enabled</div>
  return (
    <table className='addon-redux addon-redux-history-panel'>
      <thead>
        <tr>
          <th>Time</th>
          <th><input placeholder='ACTION (filter)' /></th>
          <th><input placeholder='STATE DIFF (filter)' /></th>
          <th>Previous State</th>
          <th>Next State</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {changes.map(mapSateChange)}
      </tbody>
    </table>
  )
}

HistoryPanel.propTypes = {
  changes: PropTypes.array.isRequired,
  enabled: PropTypes.bool.isRequired
}

const isWithReduxChange = change => change.action && Object.values(types).includes(change.action.type)

const buildHandlers = ({
  onInit: ({ setChanges, setEnabled }) => () => {
    setChanges([])
    setEnabled(true)
  },
  onDispatch: ({ setChanges, changes, setEnabled, channel }) => change => {
    console.log('running! ', types)
    if (!change) {
      setEnabled(false)
      setChanges([])
    } else if (!isWithReduxChange(change)) {
      change = {
        ...change,
        dispatchSetState: () => channel.emit(events.DISPATCH, setStateAction(change.next))
      }
      setChanges([change, ...changes.slice(0, 100)])
      setEnabled(true)
    }
  }
})

const lifecycleHandlers = ({
  componentDidMount () {
    const { channel } = this.props
    channel.on(events.INIT, this.props.onInit)
    channel.on(events.ON_DISPATCH, this.props.onDispatch)
    this.stopListeningOnStory = this.props.api.onStory(() => {
      this.props.onDispatch()
    })
  },
  componentWillUnmount () {
    const { channel } = this.props
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory()
    }
    channel.removeListener(events.INIT, this.props.onInit)
    channel.removeListener(events.ON_DISPATCH, this.props.onDispatch)
  }
})

const enhance = compose(
  withState('changes', 'setChanges', []),
  withState('enabled', 'setEnabled', false),
  withHandlers(buildHandlers),
  lifecycle(lifecycleHandlers)
)

export default enhance(HistoryPanel)
