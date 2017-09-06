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
var Paper = _require.Paper;

var ShareModel = require('pydio').requireLib('ReactModelShare');

var PublicLinkPermissions = React.createClass({
    displayName: 'PublicLinkPermissions',

    propTypes: {
        linkData: React.PropTypes.object.isRequired,
        shareModel: React.PropTypes.instanceOf(ShareModel),
        style: React.PropTypes.object
    },

    changePermission: function changePermission(event) {
        var name = event.target.name;
        var checked = event.target.checked;
        this.props.shareModel.setPublicLinkPermission(this.props.linkData.hash, name, checked);
    },

    render: function render() {
        var linkId = this.props.linkData.hash;
        var perms = [],
            previewWarning;
        var currentIsFolder = !this.props.shareModel.getNode().isLeaf();
        perms.push({
            NAME: 'read',
            LABEL: this.props.getMessage('72'),
            DISABLED: currentIsFolder && !this.props.shareModel.getPublicLinkPermission(linkId, 'write')
        });
        perms.push({
            NAME: 'download',
            LABEL: this.props.getMessage('73')
        });
        if (currentIsFolder) {
            perms.push({
                NAME: 'write',
                LABEL: this.props.getMessage('74')
            });
        } else if (this.props.shareModel.fileHasWriteableEditors()) {
            perms.push({
                NAME: 'write',
                LABEL: this.props.getMessage('74b')
            });
        }
        if (this.props.shareModel.isPublicLinkPreviewDisabled() && this.props.shareModel.getPublicLinkPermission(linkId, 'read')) {
            previewWarning = React.createElement(
                'div',
                null,
                this.props.getMessage('195')
            );
        }
        return React.createElement(
            _mainCard2['default'],
            { title: this.props.getMessage('71'), style: this.props.style },
            React.createElement(
                'div',
                { className: 'section-legend' },
                this.props.getMessage('70r')
            ),
            React.createElement(
                'div',
                { style: { margin: '10px 0 20px' }, className: 'ie_material_checkbox_fix' },
                perms.map((function (p) {
                    return React.createElement(
                        'div',
                        { key: p.NAME, style: { display: 'inline-block', width: '33%' } },
                        React.createElement(Checkbox, {
                            disabled: p.DISABLED || this.props.isReadonly(),
                            type: 'checkbox',
                            name: p.NAME,
                            label: p.LABEL,
                            onCheck: this.changePermission,
                            checked: this.props.shareModel.getPublicLinkPermission(linkId, p.NAME),
                            labelStyle: { whiteSpace: 'nowrap' }
                        })
                    );
                }).bind(this)),
                previewWarning
            )
        );
    }
});

exports['default'] = PublicLinkPermissions = (0, _ShareContextConsumer2['default'])(PublicLinkPermissions);
exports['default'] = PublicLinkPermissions;
module.exports = exports['default'];
