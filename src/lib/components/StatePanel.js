import React from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'recompose/lifecycle'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import * as events from '../events'
import SetStateForm from './SetStateForm'

export const StatePanel = ({ state, channel }) =>
  <div>
    <pre>{JSON.stringify(state, null, 2)}</pre>
    <SetStateForm state={state} channel={channel} />
  </div>

StatePanel.propTypes = {
  state: PropTypes.object.isRequired,
  channel: PropTypes.object.isRequired
}

const buildHandlers = ({
  onInit: ({ setState }) => state => setState(state),
  onDispatch: ({ setState, state }) => ({action, diff}) => setState(state)
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
  withState('state', 'setState', {}),
  withHandlers(buildHandlers),
  lifecycle(lifecycleHandlers)
)

export default enhance(StatePanel)
