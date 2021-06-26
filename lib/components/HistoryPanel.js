'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HistoryPanel = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _coreEvents = require('@storybook/core-events');

var _lifecycle = require('recompose/lifecycle');

var _lifecycle2 = _interopRequireDefault(_lifecycle);

var _withHandlers = require('recompose/withHandlers');

var _withHandlers2 = _interopRequireDefault(_withHandlers);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _withState = require('recompose/withState');

var _withState2 = _interopRequireDefault(_withState);

var _events = require('../events');

var events = _interopRequireWildcard(_events);

var _StateChange = require('./StateChange');

var _StateChange2 = _interopRequireDefault(_StateChange);

var _enhancer = require('../../enhancer');

var _actionTypes = require('../actionTypes');

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var mapSateChange = function mapSateChange(change, i) {
  return _react2.default.createElement(_StateChange2.default, _extends({}, change, { key: change.id }));
};

var HistoryPanel = exports.HistoryPanel = function HistoryPanel(_ref) {
  var changes = _ref.changes,
      enabled = _ref.enabled,
      active = _ref.active,
      actionFilter = _ref.actionFilter,
      diffFilter = _ref.diffFilter,
      onDiffFilter = _ref.onDiffFilter,
      onActionFilter = _ref.onActionFilter,
      changeIsVisible = _ref.changeIsVisible,
      reset = _ref.reset;

  if (!active) return null;
  if (!enabled) return _react2.default.createElement(
    'div',
    { className: 'addon-redux-disabled' },
    'withRedux Not Enabled'
  );
  return _react2.default.createElement(
    'table',
    { className: 'addon-redux addon-redux-history-panel' },
    _react2.default.createElement(
      'thead',
      null,
      _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'th',
          null,
          'Time'
        ),
        _react2.default.createElement(
          'th',
          null,
          _react2.default.createElement('input', { value: actionFilter, onChange: onActionFilter, placeholder: 'ACTION (filter)' })
        ),
        _react2.default.createElement(
          'th',
          null,
          _react2.default.createElement('input', { value: diffFilter, onChange: onDiffFilter, placeholder: 'STATE DIFF (filter)' })
        ),
        _react2.default.createElement(
          'th',
          null,
          'Previous State'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Next State'
        ),
        _react2.default.createElement(
          'th',
          null,
          _react2.default.createElement(
            'button',
            { onClick: reset },
            'RESET'
          )
        )
      )
    ),
    _react2.default.createElement(
      'tbody',
      null,
      changes.filter(changeIsVisible).map(mapSateChange)
    )
  );
};

HistoryPanel.propTypes = {
  changes: _propTypes2.default.array.isRequired,
  enabled: _propTypes2.default.bool.isRequired,
  active: _propTypes2.default.bool.isRequired,
  actionFilter: _propTypes2.default.string.isRequired,
  diffFilter: _propTypes2.default.string.isRequired,
  onDiffFilter: _propTypes2.default.func.isRequired,
  onActionFilter: _propTypes2.default.func.isRequired,
  changeIsVisible: _propTypes2.default.func.isRequired,
  reset: _propTypes2.default.func.isRequired
};

var isWithReduxChange = function isWithReduxChange(change) {
  return change.action && Object.values(types).includes(change.action.type);
};

var buildHandlers = {
  onInit: function onInit(_ref2) {
    var setChanges = _ref2.setChanges,
        setEnabled = _ref2.setEnabled;
    return function () {
      setChanges([]);
      setEnabled(true);
    };
  },
  onDispatch: function onDispatch(_ref3) {
    var setChanges = _ref3.setChanges,
        changes = _ref3.changes,
        setEnabled = _ref3.setEnabled,
        channel = _ref3.channel;
    return function (change) {
      if (!change) {
        setEnabled(false);
        setChanges([]);
      } else if (!isWithReduxChange(change)) {
        change = _extends({}, change, {
          dispatchSetState: function dispatchSetState() {
            return channel.emit(events.DISPATCH, (0, _enhancer.setStateAction)(change.next));
          }
        });
        setChanges([change].concat(_toConsumableArray(changes.slice(0, 100))));
        setEnabled(true);
      }
    };
  },
  onActionFilter: function onActionFilter(_ref4) {
    var setActionFilter = _ref4.setActionFilter;
    return function (ev) {
      return setActionFilter(ev.target.value);
    };
  },
  onDiffFilter: function onDiffFilter(_ref5) {
    var setDiffFilter = _ref5.setDiffFilter;
    return function (ev) {
      return setDiffFilter(ev.target.value);
    };
  },
  changeIsVisible: function changeIsVisible(_ref6) {
    var actionFilter = _ref6.actionFilter,
        diffFilter = _ref6.diffFilter;
    return function (change) {
      if (!actionFilter && !diffFilter) return true;
      if (actionFilter && matches(actionFilter, change.action)) return true;
      if (diffFilter && matches(diffFilter, change.diff)) return true;
      return false;
    };
  },
  reset: function reset(_ref7) {
    var setChanges = _ref7.setChanges;
    return function () {
      return setChanges([]);
    };
  }
};

var matches = function matches(filter, obj) {
  var re = new RegExp('.*?' + filter + '.*', 'i');
  return JSON.stringify(obj).match(re) !== null;
};

var lifecycleHandlers = {
  componentDidMount: function componentDidMount() {
    var _this = this;

    var channel = this.props.channel;

    channel.on(events.INIT, this.props.onInit);
    channel.on(events.ON_DISPATCH, this.props.onDispatch);
    this.stopListeningOnStory = this.props.api.on(_coreEvents.STORY_CHANGED, function () {
      _this.props.onDispatch();
    });
  },
  componentWillUnmount: function componentWillUnmount() {
    var channel = this.props.channel;

    if (this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }
    channel.removeListener(events.INIT, this.props.onInit);
    channel.removeListener(events.ON_DISPATCH, this.props.onDispatch);
  }
};

var enhance = (0, _compose2.default)((0, _withState2.default)('changes', 'setChanges', []), (0, _withState2.default)('enabled', 'setEnabled', false), (0, _withState2.default)('actionFilter', 'setActionFilter', ''), (0, _withState2.default)('diffFilter', 'setDiffFilter', ''), (0, _withHandlers2.default)(buildHandlers), (0, _lifecycle2.default)(lifecycleHandlers));

exports.default = enhance(HistoryPanel);