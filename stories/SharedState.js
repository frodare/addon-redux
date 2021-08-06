import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export const SharedStateManager = ({ showButton }) => {
    const counter = useSelector(state => state.counters[0].count)
    const dispatch = useDispatch()
  
    if (showButton) {
      return (
        <>
          <button
            type='button'
            className="storybook-button--primary"
            onClick={() => dispatch({ type: 'increment', id: 0 })}
          >
            Increment counter
          </button>
          <br /><br />
          {counter}
        </>
      );
    } else {
      return (
        <>
            The state shown in this counter should be reset to its initial value
            Even if its value in the Redux state was incremented by the Writer story
            <br /><br />
            {counter}
        </>
        );
    }
  }
  