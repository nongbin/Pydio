'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var React = require('react');

var _require = require('material-ui');

var TextField = _require.TextField;
var Subheader = _require.Subheader;

var LabelDescriptionPanel = React.createClass({
    displayName: 'LabelDescriptionPanel',

    updateLabel: function updateLabel(event) {
        this.props.shareModel.setGlobal("label", event.currentTarget.value);
    },

    updateDescription: function updateDescription(event) {
        this.props.shareModel.setGlobal("description", event.currentTarget.value);
    },

    render: function render() {
        var label = undefined,
            labelLegend = undefined;
        if (!this.props.shareModel.getNode().isLeaf()) {
            label = React.createElement(TextField, {
                disabled: this.props.isReadonly(),
                floatingLabelText: this.props.getMessage('35') + ' ( ' + this.props.getMessage('146') + ' )',
                floatingLabelStyle: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
                name: 'label',
                onChange: this.updateLabel,
                value: this.props.shareModel.getGlobal('label') || '',
                fullWidth: true
            });
        }
        return React.createElement(
            'div',
            { style: this.props.style },
            label,
            React.createElement(TextField, {
                disabled: this.props.isReadonly(),
                floatingLabelText: this.props.getMessage('145') + ' ( ' + this.props.getMessage('197') + ' )',
                floatingLabelStyle: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
                name: 'description',
                onChange: this.updateDescription,
                value: this.props.shareModel.getGlobal('description') || '',
                fullWidth: true
            })
        );
    }
});

exports['default'] = LabelDescriptionPanel = (0, _ShareContextConsumer2['default'])(LabelDescriptionPanel);

exports['default'] = LabelDescriptionPanel;
module.exports = exports['default'];
