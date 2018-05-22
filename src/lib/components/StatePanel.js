import React from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'recompose/lifecycle'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import Json from './Json'
import * as events from '../events'
import SetStateForm from './SetStateForm'

export const StatePanel = props => {
  if (!props.enabled) return <h5>withRedux Not Enabled</h5>
  return (
    <div>
      {props.mode === 'edit' ? <EditMode {...props} /> : <ViewMode {...props} />}
    </div>
  )
}

StatePanel.propTypes = {
  enabled: PropTypes.bool.isRequired,
  state: PropTypes.object.isRequired,
  channel: PropTypes.object.isRequired,
  api: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  actions: PropTypes.array.isRequired
}

const EditMode = props => <SetStateForm {...props} />

const ActionButton = ({ name, action, dispatch }) =>
  <button onClick={dispatch} title={JSON.stringify(action, null, 2)}>{name}</button>

ActionButton.propTypes = {
  name: PropTypes.string.isRequired,
  action: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

const ViewMode = ({ state, setEditMode, actions }) =>
  <div>
    <button onClick={setEditMode}>Edit</button>
    {actions.map(ActionButton)}
    <Json data={state} />
  </div>

ViewMode.propTypes = {
  state: PropTypes.object.isRequired,
  setEditMode: PropTypes.func.isRequired,
  actions: PropTypes.array.isRequired
}

const buildHandlers = ({
  onInit: ({ setState, setEnabled, setActions, channel }) => ({ state = {}, actions = [] }) => {
    setState(state)
    actions = actions.map(action => ({...action, dispatch: () => channel.emit(events.DISPATCH, action.action)}))
    setActions(actions)
    setEnabled(true)
  },
  onDispatch: ({ setState, state, setEnabled }) => ({ action, diff, prev, next }) => {
    setState(next)
    setEnabled(true)
  },
  setViewMode: ({ setMode }) => () => setMode('view'),
  setEditMode: ({ setMode }) => () => setMode('edit')
})

const lifecycleHandlers = ({
  componentDidMount () {
    const { channel } = this.props
    channel.on(events.INIT, this.props.onInit)
    channel.on(events.ON_DISPATCH, this.props.onDispatch)
    this.stopListeningOnStory = this.props.api.onStory((kind, story) => {
      this.props.onInit({})
      this.props.setEnabled(false)
    })
  },
  componentWillUnmount () {
    const { channel } = this.props
    channel.removeListener(events.INIT, this.props.onInit)
    channel.removeListener(events.ON_DISPATCH, this.props.onDispatch)
  }
})

const enhance = compose(
  withState('state', 'setState', {}),
  withState('actions', 'setActions', []),
  withState('mode', 'setMode', 'view'),
  withState('enabled', 'setEnabled', false),
  withHandlers(buildHandlers),
  lifecycle(lifecycleHandlers)
)

export default enhance(StatePanel)
