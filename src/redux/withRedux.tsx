import React from 'react'
import { StoryFn as StoryFunction, DecoratorFunction, useChannel } from '@storybook/addons'
import { STORY_CHANGED } from '@storybook/core-events'
import { Provider } from 'react-redux'
import { AnyAction } from 'redux'
import { diff as differ } from 'jsondiffpatch'

import { parse } from '../util/jsonHelper'
import { EVENTS } from '../constants'
import { OnDispatchEvent, OnInitEvent, StoreListener } from '../typings'
import { resetStateAction, mergeStateAction, setStateAction, setStateAtPathAction } from './actionCreators'
import { getStore } from './enhancer'

let nextId = 0

export default (): DecoratorFunction => {
  return (story: StoryFunction) => {
    const store = getStore()

    const emit = useChannel({
      [EVENTS.SET_STATE]: (stateJson: string) => store.dispatch(setStateAction(parse(stateJson))),
      [EVENTS.SET_STATE_AT_PATH]: (path: string, value: any) => store.dispatch(setStateAtPathAction(path, value)),
      [EVENTS.MERGE_STATE]: (stateJson: string) => store.dispatch(mergeStateAction(parse(stateJson))),
      [EVENTS.DISPATCH]: (action: AnyAction) => store.dispatch(action),
      [STORY_CHANGED]: (_action: AnyAction) => store.dispatch(resetStateAction())
    })

    const onDispatchListener: StoreListener = (action, prev, state): void => {
      const diff = differ(prev, state)
      const date = new Date()
      const event: OnDispatchEvent = {
        id: nextId++,
        date,
        action,
        diff: JSON.stringify(diff),
        prev: JSON.stringify(prev),
        state: JSON.stringify(state)
      }
      emit(EVENTS.ON_DISPATCH, event)
    }

    const initEvent: OnInitEvent = { state: JSON.stringify(store.getState()) }
    emit(EVENTS.INIT, initEvent)

    if (store.__WITH_REDUX_ENABLED__ === undefined) throw new Error('withRedux enhancer is not enabled in the store')

    store.__WITH_REDUX_ENABLED__?.listenToStateChange(onDispatchListener)

    return (<Provider store={store}> {story()} </Provider>)
  }
}
