'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateChange = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Json = require('./Json');

var _Json2 = _interopRequireDefault(_Json);

var _dateFns = require('date-fns');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StateChange = exports.StateChange = function StateChange(_ref) {
  var date = _ref.date,
      action = _ref.action,
      diff = _ref.diff,
      prev = _ref.prev,
      next = _ref.next,
      dispatchSetState = _ref.dispatchSetState;
  return _react2.default.createElement(
    'tr',
    null,
    _react2.default.createElement(
      'td',
      null,
      (0, _dateFns.format)(date, 'HH:mm:ss.SSS')
    ),
    _react2.default.createElement(
      'td',
      null,
      _react2.default.createElement(_Json2.default, { data: action })
    ),
    _react2.default.createElement(
      'td',
      null,
      _react2.default.createElement(_Json2.default, { data: diff, length: 20 })
    ),
    _react2.default.createElement(
      'td',
      null,
      _react2.default.createElement(_Json2.default, { data: prev, length: 20 })
    ),
    _react2.default.createElement(
      'td',
      null,
      _react2.default.createElement(_Json2.default, { data: next, length: 20 })
    ),
    _react2.default.createElement(
      'td',
      null,
      _react2.default.createElement(
        'button',
        { onClick: dispatchSetState },
        'Load'
      )
    )
  );
};

StateChange.propTypes = {
  date: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(Date)]).isRequired,
  action: _propTypes2.default.object.isRequired,
  diff: _propTypes2.default.object,
  prev: _propTypes2.default.object.isRequired,
  next: _propTypes2.default.object.isRequired,
  dispatchSetState: _propTypes2.default.func.isRequired
};

exports.default = StateChange;