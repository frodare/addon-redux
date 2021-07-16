import React from 'react'
import { Button } from './Button'
import { PARAM_REDUX_MERGE_STATE, ARG_REDUX_PATH } from '../src/constants'

export default {
  title: 'Example/Button',
  component: Button,
  parameters: {
    [PARAM_REDUX_MERGE_STATE]: { fooo: { bar: 'baz' }, tz: '2021-01-04T17:49:03.343Z' }
  },
  argTypes: {
    foo: {
      control: { type: 'number' },
      [ARG_REDUX_PATH]: 'counter'
    }
  }
}

const Template = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Button',
  foo: 12
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
