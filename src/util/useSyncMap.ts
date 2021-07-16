import { useRef } from 'react'
import { useArgTypes, ArgTypes, ArgType } from '@storybook/api'

import { ARG_REDUX_PATH } from '../constants'
import { SyncEntry } from '../typings'

const syncEnabled = ([name, data]: [string, ArgType]): boolean => data[ARG_REDUX_PATH]

const toString = (o: any): string => o == null ? '' : o.toString()

const useSyncMap = (): SyncEntry[] => {
  const types = useArgTypes()
  const syncMapRef = useRef<SyncEntry[]>([])
  const typesRef = useRef<ArgTypes>()

  const typesChanged = typesRef.current !== types
  if (typesRef.current !== types) {
    typesRef.current = types
  }

  if (typesChanged) {
    syncMapRef.current = Object.entries(types)
      .filter(syncEnabled)
      .map(([name, data]) => ({ name, path: toString(data[ARG_REDUX_PATH]) }))
  }

  return syncMapRef.current
}

export default useSyncMap
