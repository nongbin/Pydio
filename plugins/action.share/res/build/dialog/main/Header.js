'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var React = require('react');

var _require = require('react-textfit');

var Textfit = _require.Textfit;

var _require2 = require('material-ui/styles');

var muiThemeable = _require2.muiThemeable;

var PathUtils = require('pydio/util/path');

var HeaderPanel = React.createClass({
    displayName: 'HeaderPanel',

    render: function render() {

        if (this.props.noModal) {
            return null;
        }
        var nodePath = this.props.shareModel.getNode().getPath();
        return React.createElement(
            'div',
            { className: 'headerPanel', style: { backgroundColor: this.props.muiTheme.palette.primary1Color } },
            React.createElement(
                Textfit,
                { mode: 'single', max: 30 },
                this.props.getMessage('44').replace('%s', PathUtils.getBasename(nodePath))
            )
        );
    }
});

exports['default'] = HeaderPanel = (0, _ShareContextConsumer2['default'])(HeaderPanel);
exports['default'] = HeaderPanel = muiThemeable()(HeaderPanel);

exports['default'] = HeaderPanel;
module.exports = exports['default'];
