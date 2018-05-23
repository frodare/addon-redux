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
      render: () => <StatePanel {...apiProps} />
    })

    addons.addPanel('storybook/with_redux/history', {
      title: 'Redux History',
      render: () => <HistoryPanel {...apiProps} />
    })
  })
}
