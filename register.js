'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _HistoryPanel = require('./lib/components/HistoryPanel');

var _HistoryPanel2 = _interopRequireDefault(_HistoryPanel);

var _StatePanel = require('./lib/components/StatePanel');

var _StatePanel2 = _interopRequireDefault(_StatePanel);

require('./lib/style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (addons) {
  addons.register('storybook/with_redux', function (api) {
    var channel = addons.getChannel();
    var apiProps = { channel: channel, api: api };

    addons.addPanel('storybook/with_redux/state', {
      title: 'Redux State',
      render: function render() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { active: false },
            active = _ref.active;

        return _react2.default.createElement(_StatePanel2.default, _extends({ key: 'Redux State Panel' }, apiProps, { active: active }));
      }
    });

    addons.addPanel('storybook/with_redux/history', {
      title: 'Redux History',
      render: function render() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { active: false },
            active = _ref2.active;

        return _react2.default.createElement(_HistoryPanel2.default, _extends({ key: 'Redux History Panel' }, apiProps, { active: active }));
      }
    });
  });
};