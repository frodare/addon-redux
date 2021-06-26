'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jsondiffpatch = require('jsondiffpatch');

var _events = require('./lib/events');

var events = _interopRequireWildcard(_events);

var _enhancer = require('./enhancer');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nextId = 0;
var initialized = false;

exports.default = function (addons) {
  return function (_ref) {
    var Provider = _ref.Provider,
        store = _ref.store,
        state = _ref.state,
        actions = _ref.actions;

    var channel = addons.getChannel();

    if (!store) throw new Error('withRedux: store is required');
    if (!Provider) throw new Error('withRedux: Provider is required as of v1.0.0');

    if (!initialized) {
      channel.on(events.SET_STATE, function (state) {
        return store.dispatch((0, _enhancer.setStateAction)(state));
      });
      channel.on(events.DISPATCH, function (action) {
        return store.dispatch(action);
      });
    }

    initialized = true;

    var onDispatchListener = function onDispatchListener(action, prev, next) {
      var diff = (0, _jsondiffpatch.diff)(prev, next);
      var date = new Date();
      channel.emit(events.ON_DISPATCH, { id: nextId++, date: date, action: action, diff: diff, prev: prev, next: next });
    };

    return function (story) {
      if (!store[_enhancer.WITH_REDUX_ENABLED]) throw new Error('withRedux enhancer is not enabled in the store');

      store[_enhancer.WITH_REDUX_ENABLED].listenToStateChange(onDispatchListener);
      channel.emit(events.INIT, { state: store.getState(), actions: actions });
      store.dispatch((0, _enhancer.mergeStateAction)(state));

      return _react2.default.createElement(
        Provider,
        { store: store },
        story()
      );
    };
  };
};