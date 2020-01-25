import React from 'react'
import PropTypes from 'prop-types'
import { STORY_CHANGED } from '@storybook/core-events';
import lifecycle from 'recompose/lifecycle'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import * as events from '../events'
import StateChange from './StateChange'
import { setStateAction } from '../../enhancer'
import * as types from '../actionTypes'

const mapSateChange = (change, i) => <StateChange {...change} key={change.id} />

export const HistoryPanel = ({ changes, enabled, active, actionFilter, diffFilter, onDiffFilter, onActionFilter, changeIsVisible, reset }) => {
  if (!active) return null
  if (!enabled) return <div className='addon-redux-disabled'>withRedux Not Enabled</div>
  return (
    <table className='addon-redux addon-redux-history-panel'>
      <thead>
        <tr>
          <th>Time</th>
          <th><input value={actionFilter} onChange={onActionFilter} placeholder='ACTION (filter)' /></th>
          <th><input value={diffFilter} onChange={onDiffFilter} placeholder='STATE DIFF (filter)' /></th>
          <th>Previous State</th>
          <th>Next State</th>
          <th><button onClick={reset}>RESET</button></th>
        </tr>
      </thead>
      <tbody>
        {changes.filter(changeIsVisible).map(mapSateChange)}
      </tbody>
    </table>
  )
}

HistoryPanel.propTypes = {
  changes: PropTypes.array.isRequired,
  enabled: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  actionFilter: PropTypes.string.isRequired,
  diffFilter: PropTypes.string.isRequired,
  onDiffFilter: PropTypes.func.isRequired,
  onActionFilter: PropTypes.func.isRequired,
  changeIsVisible: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
}

const isWithReduxChange = change => change.action && Object.values(types).includes(change.action.type)

const buildHandlers = ({
  onInit: ({ setChanges, setEnabled }) => () => {
    setChanges([])
    setEnabled(true)
  },
  onDispatch: ({ setChanges, changes, setEnabled, channel }) => change => {
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
  },
  onActionFilter: ({ setActionFilter }) => ev => setActionFilter(ev.target.value),
  onDiffFilter: ({ setDiffFilter }) => ev => setDiffFilter(ev.target.value),
  changeIsVisible: ({ actionFilter, diffFilter }) => change => {
    if (!actionFilter && !diffFilter) return true
    if (actionFilter && matches(actionFilter, change.action)) return true
    if (diffFilter && matches(diffFilter, change.diff)) return true
    return false
  },
  reset: ({ setChanges }) => () => setChanges([])
})

const matches = (filter, obj) => {
  const re = new RegExp('.*?' + filter + '.*', 'i')
  return JSON.stringify(obj).match(re) !== null
}

const lifecycleHandlers = ({
  componentDidMount () {
    const { channel } = this.props
    channel.on(events.INIT, this.props.onInit)
    channel.on(events.ON_DISPATCH, this.props.onDispatch)
    this.stopListeningOnStory = this.props.api.on(STORY_CHANGED, () => {
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
  withState('actionFilter', 'setActionFilter', ''),
  withState('diffFilter', 'setDiffFilter', ''),
  withHandlers(buildHandlers),
  lifecycle(lifecycleHandlers)
)

export default enhance(HistoryPanel)
