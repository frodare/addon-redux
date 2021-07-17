import React, { FC } from 'react'
import { State, OnDispatchEvent, OnInitEvent } from '../typings'
import ObjectEditor, { ChangeHandler } from './ObjectEditor'
import { EVENTS, STATE_ID_STORE } from '../constants'
import { useAddonState, useChannel } from '@storybook/api'
import useSyncReduxArgs from '../util/useSyncReduxArgs'
import useSetStateFromParameter from '../util/useSetStateFromParameter'

const StateView: FC<{}> = () => {
  const [state, setState] = useAddonState<State>(STATE_ID_STORE)

  useSetStateFromParameter()
  useSyncReduxArgs()

  const emit = useChannel({
    [EVENTS.ON_DISPATCH]: (ev: OnDispatchEvent) => setState(JSON.parse(ev.state)),
    [EVENTS.INIT]: (ev: OnInitEvent) => setState(JSON.parse(ev.state))
  })

  const onChange: ChangeHandler = value => {
    emit(EVENTS.SET_STATE, JSON.stringify(value))
  }

  return <ObjectEditor value={state} onChange={onChange} />
}

export default StateView
