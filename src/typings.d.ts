import { Delta } from 'jsondiffpatch'
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

interface AddonReduxStore extends Store {
  __WITH_REDUX_ENABLED__?: AddonReduxEnabled
}

interface OnDispatchEvent {
  id: number
  date: Date
  action: AnyAction
  diff: Delta | undefined
  prev: State
  next: State
  state: string
}
