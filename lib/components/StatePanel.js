'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatePanel = undefined;

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

var _Json = require('./Json');

var _events = require('../events');

var events = _interopRequireWildcard(_events);

var _SetStateForm = require('./SetStateForm');

var _SetStateForm2 = _interopRequireDefault(_SetStateForm);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StatePanel = exports.StatePanel = function StatePanel(props) {
  if (!props.active) return null;
  if (!props.enabled) return _react2.default.createElement(
    'div',
    { className: 'addon-redux-disabled' },
    'withRedux Not Enabled'
  );
  return _react2.default.createElement(
    'div',
    { className: 'addon-redux' },
    props.mode === 'edit' ? _react2.default.createElement(EditMode, props) : _react2.default.createElement(ViewMode, props)
  );
};

StatePanel.propTypes = {
  enabled: _propTypes2.default.bool.isRequired,
  active: _propTypes2.default.bool.isRequired,
  state: _propTypes2.default.object.isRequired,
  channel: _propTypes2.default.object.isRequired,
  api: _propTypes2.default.object.isRequired,
  mode: _propTypes2.default.string.isRequired,
  actions: _propTypes2.default.array.isRequired
};

var EditMode = function EditMode(props) {
  return _react2.default.createElement(_SetStateForm2.default, props);
};

var ActionButton = function ActionButton(_ref) {
  var name = _ref.name,
      action = _ref.action,
      dispatch = _ref.dispatch;
  return _react2.default.createElement(
    'button',
    { key: name, onClick: dispatch, title: JSON.stringify(action, null, 2) },
    name
  );
};

ActionButton.propTypes = {
  name: _propTypes2.default.string.isRequired,
  action: _propTypes2.default.object.isRequired,
  dispatch: _propTypes2.default.func.isRequired
};

var ViewMode = function ViewMode(_ref2) {
  var state = _ref2.state,
      setEditMode = _ref2.setEditMode,
      actions = _ref2.actions;
  return _react2.default.createElement(
    'div',
    { className: 'addon-redux-state-panel' },
    _react2.default.createElement(
      'div',
      { className: 'addon-redux-button-bar' },
      _react2.default.createElement(
        'button',
        { onClick: setEditMode },
        'Edit State'
      ),
      actions.length ? actions.map(ActionButton) : _react2.default.createElement(
        'span',
        { className: 'addon-redux-no-actions' },
        'NO CANNED ACTIONS'
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'redux-addon-state-json' },
      _react2.default.createElement(_Json.CustomizedJsonTree, { data: state })
    )
  );
};

ViewMode.propTypes = {
  state: _propTypes2.default.object.isRequired,
  setEditMode: _propTypes2.default.func.isRequired,
  actions: _propTypes2.default.array.isRequired
};

var buildHandlers = {
  onInit: function onInit(_ref3) {
    var setState = _ref3.setState,
        setEnabled = _ref3.setEnabled,
        setActions = _ref3.setActions,
        channel = _ref3.channel;
    return function (_ref4) {
      var _ref4$state = _ref4.state,
          state = _ref4$state === undefined ? {} : _ref4$state,
          _ref4$actions = _ref4.actions,
          actions = _ref4$actions === undefined ? [] : _ref4$actions;

      setState(state);
      actions = actions.map(function (action) {
        return _extends({}, action, { dispatch: function dispatch() {
            return channel.emit(events.DISPATCH, action.action);
          } });
      });
      setActions(actions);
      setEnabled(true);
    };
  },
  onDispatch: function onDispatch(_ref5) {
    var setState = _ref5.setState,
        state = _ref5.state;
    return function (_ref6) {
      var action = _ref6.action,
          diff = _ref6.diff,
          prev = _ref6.prev,
          next = _ref6.next;

      setState(next);
    };
  },
  setViewMode: function setViewMode(_ref7) {
    var setMode = _ref7.setMode;
    return function () {
      return setMode('view');
    };
  },
  setEditMode: function setEditMode(_ref8) {
    var setMode = _ref8.setMode;
    return function () {
      return setMode('edit');
    };
  }
};

var lifecycleHandlers = {
  componentDidMount: function componentDidMount() {
    var _this = this;

    var channel = this.props.channel;

    channel.on(events.INIT, this.props.onInit);
    channel.on(events.ON_DISPATCH, this.props.onDispatch);
    this.stopListeningOnStory = this.props.api.on(_coreEvents.STORY_CHANGED, function () {
      _this.props.onInit({});
      _this.props.setEnabled(false);
    });
  },
  componentWillUnmount: function componentWillUnmount() {
    var channel = this.props.channel;

    channel.removeListener(events.INIT, this.props.onInit);
    channel.removeListener(events.ON_DISPATCH, this.props.onDispatch);
  }
};

var enhance = (0, _compose2.default)((0, _withState2.default)('state', 'setState', {}), (0, _withState2.default)('actions', 'setActions', []), (0, _withState2.default)('mode', 'setMode', 'view'), (0, _withState2.default)('enabled', 'setEnabled', false), (0, _withHandlers2.default)(buildHandlers), (0, _lifecycle2.default)(lifecycleHandlers));

exports.default = enhance(StatePanel);