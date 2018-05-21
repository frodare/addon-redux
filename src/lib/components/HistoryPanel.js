import React from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'recompose/lifecycle'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import * as events from '../events'
import StateChange from './StateChange'

export const HistoryPanel = ({ changes }) =>
  <table style={{fontSize: '14px', width: '100%'}}>
    <tr>
      <th>Date</th>
      <th>Action Name</th>
      <th>Action</th>
      <th>State Diff</th>
      <th>Previous State</th>
      <th>Next State</th>
      <th />
    </tr>
    {changes.map((change, i) => <StateChange {...change} key={change.date.valueOf()} />)}
  </table>

HistoryPanel.propTypes = {
  changes: PropTypes.array.isRequired
}

const buildHandlers = ({
  onInit: ({ setChanges }) => () => setChanges([]),
  onDispatch: ({ setChanges, changes }) => change => {
    if (!change) {
      setChanges([])
    } else {
      setChanges([change, ...changes.slice(0, 10)])
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
  withHandlers(buildHandlers),
  lifecycle(lifecycleHandlers)
)

export default enhance(HistoryPanel)
