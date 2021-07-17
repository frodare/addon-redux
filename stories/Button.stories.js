import React from 'react'
import { Button } from './Button'
import { PARAM_REDUX_MERGE_STATE, ARG_REDUX_PATH } from '../src/constants'

export default {
  title: 'Example/Button',
  component: Button,
  parameters: {
    [PARAM_REDUX_MERGE_STATE]: {
      counters: [
        { name: 'First Button', count: 0 },
        { name: 'Second Button', count: 10 },
        { name: 'Third Button', count: 20 }
      ]
    }
  },
  argTypes: {
    name1: {
      control: { type: 'text' },
      [ARG_REDUX_PATH]: 'counters.0.name'
    },
    count1: {
      control: { type: 'number' },
      [ARG_REDUX_PATH]: 'counters.0.count'
    },
    name2: {
      control: { type: 'text' },
      [ARG_REDUX_PATH]: 'counters.1.name'
    },
    count2: {
      control: { type: 'number' },
      [ARG_REDUX_PATH]: 'counters.1.count'
    }
  }
}

const Template = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  name1: 'Arg 1',
  count1: 22
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Button',
  foo: 125
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'Button',
  foo: 0
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'Button'
}
