import { useRef } from 'react'
import { useArgTypes, ArgTypes, ArgType } from '@storybook/api'

import { ARG_REDUX_SET_STATE } from '../constants'
import { ArgSyncSetEntry } from '../typings'

const syncEnabled = ([name, data]: [string, ArgType]): boolean => data[ARG_REDUX_SET_STATE]

const useSyncMap = (): ArgSyncSetEntry[] => {
  const types = useArgTypes()
  const syncMapRef = useRef<ArgSyncSetEntry[]>([])
  const typesRef = useRef<ArgTypes>()

  const typesChanged = typesRef.current !== types
  if (typesRef.current !== types) {
    typesRef.current = types
  }

  if (typesChanged) {
    syncMapRef.current = Object.entries(types)
      .filter(syncEnabled)
      .map(([name, data]) => ({ name, setter: data[ARG_REDUX_SET_STATE] })) // check if function
  }

  return syncMapRef.current
}

export default useSyncMap
