import React from 'react'
import { addons, types } from '@storybook/addons'
import { AddonPanel } from '@storybook/components'

import StateView from '../components/StateView'
import { PanelComponent } from '../typings'
import { color } from '@storybook/theming'
import { ADDON_ID, PANEL_ID_HISTORY, PANEL_ID_STORE } from '../constants'
import HistoryView from '../components/HistoryView'

const injectCss = (): void => {
  var css = `
  .addon-redux-editor .jsoneditor {
    border: none;
  }

  .addon-redux-editor .jsoneditor-menu {
    background-color: ${color.secondary};
    border-bottom: none;
    border-top: none;
  }

  .addon-redux-editor .jsoneditor-contextmenu .jsoneditor-menu {
    background: #ffffff;
  }

  .jsoneditor-modal .pico-modal-header {
    background: ${color.secondary};
  }
  `
  var head = document.getElementsByTagName('head')[0]
  var style = document.createElement('style')
  head.appendChild(style)
  style.appendChild(document.createTextNode(css))
}

const StorePanel: PanelComponent = (props) =>
  <AddonPanel {...props}>
    <StateView />
  </AddonPanel>

const HistoryPanel: PanelComponent = (props) =>
  <AddonPanel {...props}>
    <HistoryView />
  </AddonPanel>

addons.register(ADDON_ID, () => {
  injectCss()
  addons.add(PANEL_ID_STORE, {
    type: types.PANEL,
    title: 'Redux Store',
    match: ({ viewMode }) => viewMode === 'story',
    render: StorePanel
  })
  addons.add(PANEL_ID_HISTORY, {
    type: types.PANEL,
    title: 'Redux History',
    match: ({ viewMode }) => viewMode === 'story',
    render: HistoryPanel
  })
})
