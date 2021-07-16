import { useRef, useEffect } from 'react'
import { stringify } from '../util/jsonHelper'
import { EVENTS, PARAM_REDUX_MERGE_STATE } from '../constants'
import { useChannel, useParameter } from '@storybook/api'
import useStoryChanged from '../util/useStoryChanged'

const useSetStateFromParameter = (): void => {
  const emit = useChannel({})
  const mergeStateRef = useRef<string>('')
  const mergeState = useParameter<any>(PARAM_REDUX_MERGE_STATE, '')
  const storyChanged = useStoryChanged()

  useEffect(() => {
    const mergeStateChanged = mergeState !== mergeStateRef.current

    mergeStateRef.current = mergeState

    if (mergeState !== '' && (storyChanged || mergeStateChanged)) {
      emit(EVENTS.MERGE_STATE, stringify(mergeState))
    }
  }, [mergeState, storyChanged])
}

export default useSetStateFromParameter
