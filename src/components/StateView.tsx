import React, { FC } from 'react'
import { State, OnDispatchEvent } from 'src/typings'
import ObjectEditor, { ChangeHandler } from './ObjectEditor'
import { EVENTS, STATE_ID_STORE } from '../constants'
import { useAddonState, useChannel } from '@storybook/api'

const StateView: FC<{}> = () => {
  const [state, setState] = useAddonState<State>(STATE_ID_STORE)

  const emit = useChannel({
    [EVENTS.ON_DISPATCH]: (ev: OnDispatchEvent) => setState(ev.next)
  })

  const onChange: ChangeHandler = value => {
    emit(EVENTS.SET_STATE, value)
  }

  return <ObjectEditor value={state} onChange={onChange} />
}

export default StateView
