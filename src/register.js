import React from 'react'
import HistoryPanel from './lib/components/HistoryPanel'
import StatePanel from './lib/components/StatePanel'
import './lib/style'

export default addons => {
  addons.register('storybook/with_redux', api => {
    const channel = addons.getChannel()
    const apiProps = {channel, api}

    addons.addPanel('storybook/with_redux/state', {
      title: 'Redux State',
      render: ({ active } = { active: false }) => <StatePanel key="Redux State Panel" {...apiProps} active={active} />
    })

    addons.addPanel('storybook/with_redux/history', {
      title: 'Redux History',
      render: ({ active } = { active: false }) => <HistoryPanel key="Redux History Panel" {...apiProps} active={active} />
    })
  })
}
