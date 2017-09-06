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
var SelectField = _require.SelectField;
var MenuItem = _require.MenuItem;

var PublicLinkTemplate = React.createClass({
    displayName: 'PublicLinkTemplate',

    propTypes: {
        linkData: React.PropTypes.object
    },

    onDropDownChange: function onDropDownChange(event, index, value) {
        this.props.shareModel.setTemplate(this.props.linkData.hash, value);
    },

    render: function render() {
        var crtLabel = undefined;
        var selected = this.props.shareModel.getTemplate(this.props.linkData.hash);
        var menuItems = this.props.layoutData.map(function (l) {
            if (selected && l.LAYOUT_ELEMENT === selected) {
                crtLabel = l.LAYOUT_LABEL;
            }
            if (!selected && !crtLabel) {
                selected = l.LAYOUT_ELEMENT, crtLabel = l.LAYOUT_LABEL;
            }
            return React.createElement(MenuItem, { key: l.LAYOUT_ELEMENT, value: l.LAYOUT_ELEMENT, primaryText: l.LAYOUT_LABEL });
        });
        var unusedLegend = React.createElement(
            'div',
            { className: 'form-legend' },
            this.props.getMessage('198')
        );
        return React.createElement(
            'div',
            { style: this.props.style },
            React.createElement(
                SelectField,
                {
                    fullWidth: true,
                    value: selected,
                    onChange: this.onDropDownChange,
                    disabled: this.props.isReadonly(),
                    floatingLabelText: this.props.getMessage('151')
                },
                menuItems
            )
        );
    }
});

PublicLinkTemplate = (0, _ShareContextConsumer2['default'])(PublicLinkTemplate);
exports['default'] = PublicLinkTemplate;
module.exports = exports['default'];
