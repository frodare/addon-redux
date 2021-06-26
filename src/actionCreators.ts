import { ActionCreator } from 'redux'
import { ACTIONS_TYPES } from './constants'
import { State } from './typings'

export const mergeStateAction: ActionCreator<State> = state => ({
  type: ACTIONS_TYPES.MERGE_STATE_TYPE,
  state
})

export const setStateAction: ActionCreator<State> = state => ({
  type: ACTIONS_TYPES.SET_STATE_TYPE,
  state
})
