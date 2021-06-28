
if ((module?.hot?.decline) != null) {
  module.hot.decline()
}

export { default as enhancer } from './enhancer'
export { default as withRedux } from './withRedux'

// make it work with --isolatedModules
export default {}
