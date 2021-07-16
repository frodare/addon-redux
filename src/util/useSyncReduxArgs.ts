import { useRef } from 'react'
import { EVENTS } from '../constants'
import { useChannel, useArgs } from '@storybook/api'
import set from '../util/set'
import useSyncMap from './useSyncMap'

const useSyncReduxArgs = (): void => {
  const emit = useChannel({})
  const [args] = useArgs()
  const ref = useRef<string>()
  const syncMap = useSyncMap()

  syncMap.forEach(entry => {
    const value = args[entry.name]
    const merge = set({}, entry.path, value)
    const mergeJson = JSON.stringify(merge)
    if (mergeJson !== ref.current) {
      ref.current = mergeJson
      emit(EVENTS.MERGE_STATE, mergeJson)
    }
  })
}

export default useSyncReduxArgs
