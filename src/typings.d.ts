import { AnyAction, Store } from 'redux'

declare module 'global'

type State = any

type Enhancer<T> = (a: T) => T

type Dispatcher = (action: AnyAction) => void

type PanelComponent = (props: AddonPanelProps) => JSX.Element

type StoreListener = null | ((action: AnyAction, prev: State, next: State) => void)

interface AddonReduxEnabled {
  listenToStateChange: (l: StoreListener) => void
}

/**
 * maps an arg name to a part of the redux store
 */
interface SyncEntry {
  name: string
  path: string
}

interface AddonReduxStore extends Store {
  __WITH_REDUX_ENABLED__?: AddonReduxEnabled
}

interface OnDispatchEvent {
  id: number
  date: Date
  action: AnyAction
  diff: string
  prev: string
  state: string
}

interface OnInitEvent {
  state: string
}
