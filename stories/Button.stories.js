import React from 'react'
import { Button } from './Button'
import { PARAM_REDUX_MERGE_STATE } from '../src/constants'

export default {
  title: 'Example/Button',
  component: Button,
  parameters: {
    [PARAM_REDUX_MERGE_STATE]: { fooo: { bar: 'baz' }, tz: '2021-01-04T17:49:03.343Z' }
  }
}

const Template = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Button'
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Button'
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'Button'
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'Button'
}
