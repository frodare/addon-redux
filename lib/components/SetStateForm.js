'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatePanel = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withHandlers = require('recompose/withHandlers');

var _withHandlers2 = _interopRequireDefault(_withHandlers);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _withState = require('recompose/withState');

var _withState2 = _interopRequireDefault(_withState);

var _events = require('../events');

var events = _interopRequireWildcard(_events);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StatePanel = exports.StatePanel = function StatePanel(_ref) {
  var json = _ref.json,
      state = _ref.state,
      saveJson = _ref.saveJson,
      onChange = _ref.onChange,
      setViewMode = _ref.setViewMode;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement('textarea', { value: json || JSON.stringify(state, null, 2), onChange: onChange }),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'button',
        { onClick: setViewMode },
        'Cancel'
      ),
      _react2.default.createElement(
        'button',
        { onClick: saveJson },
        'Save'
      )
    )
  );
};

StatePanel.propTypes = {
  json: _propTypes2.default.string.isRequired,
  state: _propTypes2.default.object.isRequired,
  saveJson: _propTypes2.default.func.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  setViewMode: _propTypes2.default.func.isRequired
};

var buildHandlers = {
  saveJson: function saveJson(_ref2) {
    var json = _ref2.json,
        channel = _ref2.channel,
        setViewMode = _ref2.setViewMode;
    return function () {
      channel.emit(events.SET_STATE, JSON.parse(json));
      setViewMode();
    };
  },
  onChange: function onChange(_ref3) {
    var setJson = _ref3.setJson;
    return function (event) {
      return setJson(event.target.value);
    };
  }
};

var enhance = (0, _compose2.default)((0, _withState2.default)('json', 'setJson', ''), (0, _withHandlers2.default)(buildHandlers));

exports.default = enhance(StatePanel);