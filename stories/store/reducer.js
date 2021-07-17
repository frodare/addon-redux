
const initalState = {
  counters: [{
    name: 'test',
    count: 0
  }],
  text: '2021-01-04T17:49:03.343Z'
}

const reducer = (state = initalState, action) => {
  if (action.type === 'increment') {
    const counters = [...state.counters]
    counters[action.id] = { ...counters[action.id], count: counters[action.id].count + 1 }
    return {
      ...state,
      counters
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
