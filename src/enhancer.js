import * as types from './lib/actionTypes'

export const WITH_REDUX_ENABLED = '__WITH_REDUX_ENABLED__'

export const mergeStateAction = state => ({
  type: types.MERGE_STATE_TYPE,
  state
})

export const setStateAction = state => ({
  type: types.SET_STATE_TYPE,
  state
})

const enhanceReducer = mainReducer => (state, action) => {
  switch (action.type) {
    case types.MERGE_STATE_TYPE: return {...state, ...action.state}
    case types.SET_STATE_TYPE: return {...action.state}
    default: return mainReducer(state, action)
  }
}

export default createStore => (reducer, state, enhancer) => {
  const store = createStore(enhanceReducer(reducer), state, enhancer)
  let listener = null

  const enhanceDispatch = dispatch => action => {
    const prev = store.getState()
    dispatch(action)
    const next = store.getState()
    if (listener) listener(action, prev, next)
  }

  return {
    ...store,
    dispatch: enhanceDispatch(store.dispatch),
    [WITH_REDUX_ENABLED]: {
      listenToStateChange: l => (listener = l)
    }
  }
}
