const Provider = require('react-redux').Provider
const store = require('../stories/store').default
const withRedux = require('../dist/esm/withRedux').default

const withReduxSettings = {
  UserProvider: Provider,
  store,
  state: {
    counter: 15
  }
}

const withReduxDecorator = withRedux(withReduxSettings)

module.exports = {
  decorators: [withReduxDecorator]
};
