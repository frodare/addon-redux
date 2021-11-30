import React, { FC } from 'react'
import { State, OnDispatchEvent, OnInitEvent } from '../typings'
import ObjectEditor, { ChangeHandler } from './ObjectEditor'
import { EVENTS, STATE_ID_STORE } from '../constants'
import { useAddonState, useChannel } from '@storybook/api'
import useSyncReduxArgs from '../util/useSyncReduxArgs'
import useSetStateFromParameter from '../util/useSetStateFromParameter'
import { parse } from '../util/jsonHelper'
import { STORY_CHANGED } from '@storybook/core-events'
import { AnyAction } from 'redux'

const ObjectEditorWrapper: FC<{ state: any, onChange: (value: any) => void }> = ({ state, onChange }) => {
  useSetStateFromParameter()
  useSyncReduxArgs(state)
  return <ObjectEditor value={state} onChange={onChange} />
}

const StateView: FC<{}> = () => {
  const [state, setState] = useAddonState<State>(STATE_ID_STORE)

  /*
   * We need to wait until after addon-redux is initialized
   * Otherwise, we will receive the story args before the store is created
   * If the store is loaded asynchronously
   */
  const [initialized, setInitialized] = React.useState<boolean>(false)

  const emit = useChannel({
    [EVENTS.ON_DISPATCH]: (ev: OnDispatchEvent) => setState(parse(ev.state)),
    [EVENTS.INIT]: (ev: OnInitEvent) => {
      setInitialized(true)
      return setState(parse(ev.state))
    },
    [STORY_CHANGED]: (_action: AnyAction) => {
      setInitialized(false)
    }
  })

  const onChange: ChangeHandler = React.useCallback(value => {
    emit(EVENTS.SET_STATE, JSON.stringify(value))
  }, [])

  if (!initialized) {
    return <>Loading...</>
  } else {
    return <ObjectEditorWrapper state={state} onChange={onChange} />
  }
}

export default StateView
