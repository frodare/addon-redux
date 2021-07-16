
if ((module?.hot?.decline) != null) {
  module.hot.decline()
}

export { default as enhancer } from './enhancer'
export { default as withRedux } from './withRedux'
export { PARAM_REDUX_MERGE_STATE, ARG_REDUX_PATH } from './constants'

// make it work with --isolatedModules
export default {}
