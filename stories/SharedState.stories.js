import React from 'react'
import { PARAM_REDUX_MERGE_STATE, ARG_REDUX_PATH } from '../src/constants'
import { SharedStateManager } from './SharedState';
  
export default {
  title: 'Example/SharedState',
  component: SharedStateManager,
  parameters: {
    [PARAM_REDUX_MERGE_STATE]: {
      // note: even though Redux state is reset, the text in the store still gets updated
      // since PARAM_REDUX_MERGE_STATE happens after the state is reset
      text: 'this does not get reset'
    }
  }
}

const Template = (args) => <SharedStateManager {...args} />

export const Reader = Template.bind({})
Reader.args = {
  showButton: false,
}

export const Writer = Template.bind({})
Writer.args = {
  showButton: true,
}
Writer.parameters = {
  [PARAM_REDUX_MERGE_STATE]: {
    // note: even though Redux state is reset, the UI still shows 20 as the starting value
    // since PARAM_REDUX_MERGE_STATE happens after the state is reset
    counters: [
      { name: 'test', count: 20 }
    ]
  }
}
