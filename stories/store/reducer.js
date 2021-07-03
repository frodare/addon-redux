
const initalState = {
  counter: 0,
  text: '2021-01-04T17:49:03.343Z'
}

const reducer = (state = initalState, action) => {
  if (action.type === 'increment') {
    return {
      ...state,
      counter: state.counter + 1
    }
  }

  if (action.type === 'setText') {
    return {
      ...state,
      text: action.value
    }
  }

  return state
}

export default reducer
