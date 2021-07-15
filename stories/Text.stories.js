import React from 'react'
import Text from './Text'
import { PARAM_REDUX_MERGE_STATE } from '../src/constants'

export default {
  title: 'Example/Text',
  component: Text,
  parameters: {
    [PARAM_REDUX_MERGE_STATE]: '{"asdf": "asdf"}'
  }
}

const Template = (args) => <Text {...args} />

export const Primary = Template.bind({})
Primary.args = {}
