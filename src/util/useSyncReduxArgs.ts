import { useRef } from 'react'
import { EVENTS } from '../constants'
import { useChannel, useArgs } from '@storybook/api'
import useSyncMap from './useSyncMap'

interface Entries {
  [name: string]: any
}

const useSyncReduxArgs = (): void => {
  const emit = useChannel({})
  const [args] = useArgs()
  const ref = useRef<Entries>({})
  const syncMap = useSyncMap()

  syncMap.forEach(entry => {
    const value = args[entry.name]
    if (value !== ref.current[entry.name]) {
      ref.current[entry.name] = value
      setTimeout(() => emit(EVENTS.SET_STATE_AT_PATH, entry.path, value), 0)
    }
  })
}

export default useSyncReduxArgs
