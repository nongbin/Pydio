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

var NotificationPanel = React.createClass({
    displayName: 'NotificationPanel',

    dropDownChange: function dropDownChange(event, index, value) {
        this.props.shareModel.setGlobal('watch', value !== 'no_watch');
    },

    render: function render() {
        var menuItems = [React.createElement(MenuItem, { value: 'no_watch', primaryText: this.props.getMessage('187') }), React.createElement(MenuItem, { value: 'watch_read', primaryText: this.props.getMessage('184') })];

        var selectedIndex = this.props.shareModel.getGlobal('watch') ? 'watch_read' : 'no_watch';

        var unusedLegend = React.createElement(
            'div',
            { className: 'form-legend' },
            this.props.getMessage('188')
        );
        return React.createElement(
            'div',
            { style: this.props.style },
            React.createElement(
                SelectField,
                {
                    disabled: this.props.isReadonly(),
                    fullWidth: true,
                    value: selectedIndex,
                    onChange: this.dropDownChange,
                    floatingLabelText: this.props.getMessage('218')
                },
                menuItems
            )
        );
    }
});

NotificationPanel = (0, _ShareContextConsumer2['default'])(NotificationPanel);
exports['default'] = NotificationPanel;
module.exports = exports['default'];
