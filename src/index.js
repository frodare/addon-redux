import React from 'react'
import { mergeStateAction, setStateAction, WITH_REDUX_ENABLED } from './enhancer'
import { Provider } from 'react-redux'
import { diff as differ } from 'jsondiffpatch'
import * as events from './events'
import register from './register'

export default addons => (store, state) => {
  const channel = addons.getChannel()

  channel.on(events.SET_STATE, state => store.dispatch(setStateAction(state)))

  const onDispatchListener = (action, prev, next) => {
    const diff = differ(prev, next)
    channel.emit(events.ON_DISPATCH, {action, diff, prev, next})
  }

  return story => {
    if (!store[WITH_REDUX_ENABLED]) throw new Error('withRedux enhancer is not enabled in the store')

    store[WITH_REDUX_ENABLED].listenToStateChange(onDispatchListener)
    channel.emit(events.INIT, store.getState())
    store.dispatch(mergeStateAction(state))

    return <Provider store={store}>{story()}</Provider>
  }
}
