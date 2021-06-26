'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setStateAction = exports.mergeStateAction = exports.WITH_REDUX_ENABLED = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actionTypes = require('./lib/actionTypes');

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WITH_REDUX_ENABLED = exports.WITH_REDUX_ENABLED = '__WITH_REDUX_ENABLED__';

var mergeStateAction = exports.mergeStateAction = function mergeStateAction(state) {
  return {
    type: types.MERGE_STATE_TYPE,
    state: state
  };
};

var setStateAction = exports.setStateAction = function setStateAction(state) {
  return {
    type: types.SET_STATE_TYPE,
    state: state
  };
};

var enhanceReducer = function enhanceReducer(mainReducer) {
  return function (state, action) {
    switch (action.type) {
      case types.MERGE_STATE_TYPE:
        return _extends({}, state, action.state);
      case types.SET_STATE_TYPE:
        return _extends({}, action.state);
      default:
        return mainReducer(state, action);
    }
  };
};

exports.default = function (createStore) {
  return function (reducer, state, enhancer) {
    var store = createStore(enhanceReducer(reducer), state, enhancer);
    var listener = null;

    var enhanceDispatch = function enhanceDispatch(dispatch) {
      return function (action) {
        var prev = store.getState();
        dispatch(action);
        var next = store.getState();
        if (listener) listener(action, prev, next);
      };
    };

    return _extends({}, store, _defineProperty({
      dispatch: enhanceDispatch(store.dispatch)
    }, WITH_REDUX_ENABLED, {
      listenToStateChange: function listenToStateChange(l) {
        return listener = l;
      }
    }));
  };
};