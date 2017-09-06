'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('react');

var Component = _require.Component;

var _require2 = require('material-ui');

var Paper = _require2.Paper;

var Card = (function (_Component) {
    _inherits(Card, _Component);

    function Card() {
        _classCallCheck(this, Card);

        _get(Object.getPrototypeOf(Card.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Card, [{
        key: 'render',
        value: function render() {

            var style = {
                panel: _extends({
                    padding: 16,
                    margin: 10
                }, this.props.style),
                title: _extends({
                    paddingTop: 0,
                    fontSize: 18
                }, this.props.titleStyle)
            };

            return React.createElement(
                Paper,
                { zDepth: 1, rounded: false, style: style.panel },
                this.props.title && React.createElement(
                    'h3',
                    { style: style.title },
                    this.props.title
                ),
                this.props.children,
                this.props.actions && React.createElement(
                    'div',
                    { style: { textAlign: 'center', clear: 'both', position: 'relative', padding: '10px 0' } },
                    this.props.actions
                )
            );
        }
    }]);

    return Card;
})(Component);

exports['default'] = Card;
module.exports = exports['default'];
