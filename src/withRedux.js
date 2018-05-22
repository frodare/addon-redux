import React from 'react'
import { Provider } from 'react-redux'
import { diff as differ } from 'jsondiffpatch'
import * as events from './lib/events'
import { mergeStateAction, setStateAction, WITH_REDUX_ENABLED } from './enhancer'

export default addons => ({store, state, actions}) => {
  const channel = addons.getChannel()

  channel.on(events.SET_STATE, state => store.dispatch(setStateAction(state)))

  const onDispatchListener = (action, prev, next) => {
    const diff = differ(prev, next)
    const date = new Date()
    channel.emit(events.ON_DISPATCH, {date, action, diff, prev, next})
  }

  channel.on(events.DISPATCH, action => store.dispatch(action))

  return story => {
    if (!store[WITH_REDUX_ENABLED]) throw new Error('withRedux enhancer is not enabled in the store')

    store[WITH_REDUX_ENABLED].listenToStateChange(onDispatchListener)
    channel.emit(events.INIT, {state: store.getState(), actions})
    store.dispatch(mergeStateAction(state))

    return <Provider store={store}>{story()}</Provider>
  }
}
