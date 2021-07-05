import { StoryFn as StoryFunction, useChannel, DecoratorFunction } from '@storybook/addons'

import React from 'react'
import { AnyAction } from 'redux'
import { diff as differ } from 'jsondiffpatch'
import { EVENTS } from './constants'
import { AddonReduxStore, OnDispatchEvent, State, StoreListener } from './typings'
import { mergeStateAction, setStateAction } from './actionCreators'

let nextId = 0

interface Args {
  UserProvider: any
  store: AddonReduxStore
  state: State
  actions: any
}

export default ({ UserProvider, store, state, actions }: Args): DecoratorFunction => {
  return (story: StoryFunction) => {
    const emit = useChannel({
      [EVENTS.SET_STATE]: (stateJson: string) => store.dispatch(setStateAction(JSON.parse(stateJson))),
      [EVENTS.MERGE_STATE]: (stateJson: string) => store.dispatch(mergeStateAction(JSON.parse(stateJson))),
      [EVENTS.DISPATCH]: (action: AnyAction) => store.dispatch(action)
    })

    const onDispatchListener: StoreListener = (action, prev, next): void => {
      const diff = differ(prev, next)
      const date = new Date()
      const event: OnDispatchEvent = { id: nextId++, date, action, diff, prev, next, state: JSON.stringify(next) }
      emit(EVENTS.ON_DISPATCH, event)
    }

    if (store.__WITH_REDUX_ENABLED__ === undefined) throw new Error('withRedux enhancer is not enabled in the store')

    store.__WITH_REDUX_ENABLED__?.listenToStateChange(onDispatchListener)

    return (<UserProvider store={store}> {story()} </UserProvider>)
  }
}
