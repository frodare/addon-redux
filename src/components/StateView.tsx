import React, { FC, useRef, useEffect } from 'react'
import { State, OnDispatchEvent } from 'src/typings'
import ObjectEditor, { ChangeHandler } from './ObjectEditor'
import { EVENTS, STATE_ID_STORE, PARAM_REDUX_MERGE_STATE } from '../constants'
import { useAddonState, useChannel, useParameter, useStorybookApi } from '@storybook/api'

const s = (s: string | undefined): string => s === undefined ? '' : s

const useSetStateFromParameter = (storyId: string): void => {
  const emit = useChannel({})
  const storyIdRef = useRef<string>('')
  const mergeStateRef = useRef<string>('')
  const mergeState = useParameter<string>(PARAM_REDUX_MERGE_STATE, '')

  useEffect(() => {
    const storyChanged = storyId !== '' && storyIdRef.current !== storyId
    const mergeStateChanged = mergeState !== mergeStateRef.current
    storyIdRef.current = storyId
    mergeStateRef.current = mergeState
    if (mergeState !== '' && (storyChanged || mergeStateChanged)) {
      emit(EVENTS.MERGE_STATE, mergeState)
    }
  }, [mergeState, storyId, storyIdRef])
}

const StateView: FC<{}> = () => {
  const [state, setState] = useAddonState<State>(STATE_ID_STORE)
  const api = useStorybookApi()
  const storyId = s(api.getUrlState().storyId)

  useSetStateFromParameter(storyId)

  const emit = useChannel({
    [EVENTS.ON_DISPATCH]: (ev: OnDispatchEvent) => setState(JSON.parse(ev.state))
  })

  const onChange: ChangeHandler = value => {
    emit(EVENTS.SET_STATE, JSON.stringify(value))
  }

  return <ObjectEditor value={state} onChange={onChange} />
}

export default StateView
