export const MERGE_STATE_TYPE = '@@MERGE_STATE'
export const SET_STATE_TYPE = '@@SET_STATE'
export const WITH_REDUX_ENABLED = '__WITH_REDUX_ENABLED__'

export const mergeStateAction = state => ({
  type: MERGE_STATE_TYPE,
  state
})

export const setStateAction = state => ({
  type: SET_STATE_TYPE,
  state
})

const reducer = (state, action) => {
  switch (action.type) {
    case MERGE_STATE_TYPE: return {...state, ...action.state}
    case SET_STATE_TYPE: return {...action.state}
    default: return state
  }
}

const reducerRunner = action => (state, reducer) => reducer(state, action)

const compoundReducer = (reducers, state, action) => reducers.reduce(reducerRunner(action), state)

const addReducer = mainReducer => (state, action) => compoundReducer([reducer, mainReducer], state, action)

export default createStore => (reducer, state, enhancer) => {
  const store = createStore(addReducer(reducer), state, enhancer)
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
