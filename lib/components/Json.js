'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Json = exports.CustomizedJsonTree = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactJsonTree = require('react-json-tree');

var _reactJsonTree2 = _interopRequireDefault(_reactJsonTree);

var _recompose = require('recompose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var theme = {
  scheme: 'bright',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#000000',
  base01: '#303030',
  base02: '#505050',
  base03: '#b0b0b0',
  base04: '#d0d0d0',
  base05: '#e0e0e0',
  base06: '#f5f5f5',
  base07: '#ffffff',
  base08: '#fb0120',
  base09: '#fc6d24',
  base0A: '#fda331',
  base0B: '#a1c659',
  base0C: '#76c7b7',
  base0D: '#6fb3d2',
  base0E: '#d381c3',
  base0F: '#be643c'
};

var jsonPreview = function jsonPreview(data, length) {
  if (!data) return 'EMPTY';
  var json = JSON.stringify(data);
  if (json.length <= length) return json;
  return json.substring(0, length) + '...';
};

var CustomizedJsonTree = exports.CustomizedJsonTree = function CustomizedJsonTree(props) {
  return props.data ? _react2.default.createElement(_reactJsonTree2.default, _extends({ hideRoot: true, theme: theme }, props)) : 'null';
};

var Json = exports.Json = function Json(_ref) {
  var data = _ref.data,
      _ref$length = _ref.length,
      length = _ref$length === undefined ? 40 : _ref$length,
      expanded = _ref.expanded,
      toggle = _ref.toggle;
  return _react2.default.createElement(
    'div',
    { className: 'addon-redux-json' },
    _react2.default.createElement(
      'div',
      { onClick: toggle },
      jsonPreview(data, length)
    ),
    expanded ? _react2.default.createElement(CustomizedJsonTree, { data: data }) : null
  );
};

var handlers = {
  expand: function expand(_ref2) {
    var setExpanded = _ref2.setExpanded;
    return function () {
      return setExpanded(true);
    };
  },
  collapse: function collapse(_ref3) {
    var setExpanded = _ref3.setExpanded;
    return function () {
      return setExpanded(false);
    };
  },
  toggle: function toggle(_ref4) {
    var setExpanded = _ref4.setExpanded,
        expanded = _ref4.expanded;
    return function () {
      return setExpanded(!expanded);
    };
  }
};

var enhance = (0, _recompose.compose)((0, _recompose.withState)('expanded', 'setExpanded', false), (0, _recompose.withHandlers)(handlers));

Json.propTypes = {
  data: _propTypes2.default.object,
  length: _propTypes2.default.number,
  expanded: _propTypes2.default.bool.isRequired,
  toggle: _propTypes2.default.func.isRequired
};

CustomizedJsonTree.propTypes = {
  data: _propTypes2.default.object
};

exports.default = enhance(Json);