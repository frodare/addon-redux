export const ADDON_ID = 'storybook/addon-redux'

export const STATE_ID_HISTORY = `${ADDON_ID}/useState/history`
export const STATE_ID_STORE = `${ADDON_ID}/useState/store`

export const PANEL_ID_HISTORY = `${ADDON_ID}/panel/history`
export const PANEL_ID_STORE = `${ADDON_ID}/panel/store`

export const ACTIONS_TYPES = {
  MERGE_STATE_TYPE: '@@WITH_REDUX_MERGE_STATE',
  SET_STATE_TYPE: '@@WITH_REDUX_SET_STATE'
}

export const EVENTS = {
  INIT: `${ADDON_ID}/init`,
  ON_DISPATCH: `${ADDON_ID}/on_dispatch`,
  SET_STATE: `${ADDON_ID}/set_state`,
  DISPATCH: `${ADDON_ID}/dispatch`
}
