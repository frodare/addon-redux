import React from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'recompose/lifecycle'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import * as events from '../events'

export const HistoryPanel = ({ changes }) =>
  <div>
    {changes.map((change, i) => <div key={i}><pre>{JSON.stringify(change, null, 2)}</pre></div>)}
  </div>

HistoryPanel.propTypes = {
  changes: PropTypes.array.isRequired
}

const buildHandlers = ({
  onInit: ({ setChanges }) => () => setChanges([]),
  onDispatch: ({ setChanges, changes }) => ({action, diff}) => {
    setChanges([...changes, {action, diff}])
  }
})

const lifecycleHandlers = ({
  componentDidMount () {
    const { channel } = this.props
    channel.on(events.INIT, this.props.onInit)
    channel.on(events.ON_DISPATCH, this.props.onDispatch)
  },
  componentWillUnmount () {
    const { channel } = this.props
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
