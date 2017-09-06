'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _LabelDescriptionPanel = require('./LabelDescriptionPanel');

var _LabelDescriptionPanel2 = _interopRequireDefault(_LabelDescriptionPanel);

var _NotificationPanel = require('./NotificationPanel');

var _NotificationPanel2 = _interopRequireDefault(_NotificationPanel);

var _PublicLinkTemplate = require('./PublicLinkTemplate');

var _PublicLinkTemplate2 = _interopRequireDefault(_PublicLinkTemplate);

var _VisibilityPanel = require('./VisibilityPanel');

var _VisibilityPanel2 = _interopRequireDefault(_VisibilityPanel);

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var _mainCard = require('../main/Card');

var _mainCard2 = _interopRequireDefault(_mainCard);

var React = require('react');

var ShareModel = require('pydio').requireLib('ReactModelShare');

var _require = require('material-ui');

var Divider = _require.Divider;

var Panel = React.createClass({
    displayName: 'Panel',

    propTypes: {
        pydio: React.PropTypes.instanceOf(Pydio),
        shareModel: React.PropTypes.instanceOf(ShareModel)
    },

    render: function render() {

        var layoutData = ShareModel.compileLayoutData(this.props.pydio, this.props.shareModel.getNode());
        var layoutPane = undefined,
            visibilityPanel = undefined;
        var _props = this.props;
        var style = _props.style;

        var props = _objectWithoutProperties(_props, ['style']);

        if (!this.props.shareModel.getNode().isLeaf() && layoutData.length > 1 && this.props.shareModel.hasPublicLink()) {
            layoutPane = React.createElement(_PublicLinkTemplate2['default'], _extends({}, props, { linkData: this.props.shareModel.getPublicLinks()[0], layoutData: layoutData }));
        }
        if (!this.props.shareModel.currentRepoIsUserScope()) {
            visibilityPanel = React.createElement(_VisibilityPanel2['default'], _extends({}, props, { style: { paddingBottom: 16 } }));
        }
        return React.createElement(
            'div',
            null,
            React.createElement(
                _mainCard2['default'],
                { style: this.props.style, title: this.props.getMessage('486', '') },
                React.createElement(_LabelDescriptionPanel2['default'], _extends({}, props, { style: { marginTop: -10 } })),
                React.createElement(_NotificationPanel2['default'], props),
                layoutPane
            ),
            visibilityPanel
        );
    }
});

exports['default'] = Panel = (0, _ShareContextConsumer2['default'])(Panel);
exports['default'] = Panel;
module.exports = exports['default'];
