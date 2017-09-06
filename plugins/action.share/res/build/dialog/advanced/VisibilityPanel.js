'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var _mainCard = require('../main/Card');

var _mainCard2 = _interopRequireDefault(_mainCard);

var React = require('react');

var _require = require('material-ui');

var Checkbox = _require.Checkbox;
var RaisedButton = _require.RaisedButton;
var TextField = _require.TextField;

var VisibilityPanel = React.createClass({
    displayName: 'VisibilityPanel',

    toggleVisibility: function toggleVisibility() {
        this.props.shareModel.toggleVisibility();
    },
    transferOwnership: function transferOwnership() {
        this.props.shareModel.setNewShareOwner(this.refs['newOwner'].getValue());
    },
    render: function render() {
        var currentIsOwner = this.props.shareModel.currentIsOwner();

        var legend;
        if (this.props.shareModel.isPublic()) {
            if (currentIsOwner) {
                legend = this.props.getMessage('201');
            } else {
                legend = this.props.getMessage('202');
            }
        } else {
            legend = this.props.getMessage('206');
        }
        var showToggle = React.createElement(
            'div',
            null,
            React.createElement(Checkbox, { type: 'checkbox',
                name: 'share_visibility',
                disabled: !currentIsOwner || this.props.isReadonly(),
                onCheck: this.toggleVisibility,
                checked: this.props.shareModel.isPublic(),
                label: this.props.getMessage('200')
            }),
            React.createElement(
                'div',
                { className: 'section-legend' },
                legend
            )
        );
        if (this.props.shareModel.isPublic() && currentIsOwner && !this.props.isReadonly()) {
            var showTransfer = React.createElement(
                'div',
                { className: 'ownership-form' },
                React.createElement(
                    'h4',
                    null,
                    this.props.getMessage('203')
                ),
                React.createElement(
                    'div',
                    { className: 'section-legend' },
                    this.props.getMessage('204')
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(TextField, { ref: 'newOwner', floatingLabelText: this.props.getMessage('205') }),
                    React.createElement(RaisedButton, { label: this.props.getMessage('203b'), onClick: this.transferOwnership })
                )
            );
        }
        return React.createElement(
            _mainCard2['default'],
            { style: this.props.style, title: this.props.getMessage('199') },
            showToggle,
            showTransfer
        );
    }
});

VisibilityPanel = (0, _ShareContextConsumer2['default'])(VisibilityPanel);
exports['default'] = VisibilityPanel;
module.exports = exports['default'];
