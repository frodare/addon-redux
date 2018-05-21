import React from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'recompose/lifecycle'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import JSONTree from 'react-json-tree'
import * as events from '../events'
import SetStateForm from './SetStateForm'

const theme = {
  scheme: 'bright',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#000000',
  base01: '#303030',
  base02: '#505050',
  base03: '#b0b0b0',
  base04: '#d0d0d0',
  base05: '#e0e0e0',
  base06: '#f5f5f5',
  base07: '#ffffff',
  base08: '#fb0120',
  base09: '#fc6d24',
  base0A: '#fda331',
  base0B: '#a1c659',
  base0C: '#76c7b7',
  base0D: '#6fb3d2',
  base0E: '#d381c3',
  base0F: '#be643c'
}

export const StatePanel = props =>
  <div>
    {props.mode === 'edit' ? <EditMode {...props} /> : <ViewMode {...props} />}
  </div>

StatePanel.propTypes = {
  state: PropTypes.object.isRequired,
  channel: PropTypes.object.isRequired,
  api: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
}

const EditMode = props => <SetStateForm {...props} />

const ViewMode = ({ state, setEditMode }) =>
  <div>
    <button onClick={setEditMode}>Edit</button>
    <JSONTree hideRoot Boolean theme={theme} data={state} />
  </div>

ViewMode.propTypes = {
  state: PropTypes.object.isRequired,
  setEditMode: PropTypes.func.isRequired
}

const buildHandlers = ({
  onInit: ({ setState }) => state => setState(state),
  onDispatch: ({ setState, state }) => ({action, diff, prev, next}) => console.log('heard dispatch from state panel', diff, prev, next) || setState(next),
  setViewMode: ({ setMode }) => () => setMode('view'),
  setEditMode: ({ setMode }) => () => setMode('edit')
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
  withState('mode', 'setMode', 'view'),
  withHandlers(buildHandlers),
  lifecycle(lifecycleHandlers)
)

export default enhance(StatePanel)
