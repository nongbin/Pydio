'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var _TargetedUsers = require('./TargetedUsers');

var _TargetedUsers2 = _interopRequireDefault(_TargetedUsers);

var _mainActionButton = require('../main/ActionButton');

var _mainActionButton2 = _interopRequireDefault(_mainActionButton);

var React = require('react');

var _require = require('material-ui');

var RaisedButton = _require.RaisedButton;
var FloatingActionButton = _require.FloatingActionButton;
var TextField = _require.TextField;
var Paper = _require.Paper;

var ShareModel = require('pydio').requireLib('ReactModelShare');
var QRCode = require('qrcode.react');
var Clipboard = require('clipboard');

var PathUtils = require('pydio/util/path');
var LangUtils = require('pydio/util/lang');

var PublicLinkField = React.createClass({
    displayName: 'PublicLinkField',

    propTypes: {
        linkData: React.PropTypes.object.isRequired,
        shareModel: React.PropTypes.instanceOf(ShareModel),
        editAllowed: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        showMailer: React.PropTypes.func
    },
    getInitialState: function getInitialState() {
        return { editLink: false, copyMessage: '', showQRCode: false };
    },
    toggleEditMode: function toggleEditMode() {
        if (this.state.editLink && this.state.customLink) {
            this.props.shareModel.updateCustomLink(this.props.linkData.hash, this.state.customLink);
        }
        this.setState({ editLink: !this.state.editLink });
    },
    changeLink: function changeLink(event) {
        var value = event.target.value;
        value = LangUtils.computeStringSlug(value);
        this.setState({ customLink: value });
    },
    clearCopyMessage: function clearCopyMessage() {
        global.setTimeout((function () {
            this.setState({ copyMessage: '' });
        }).bind(this), 5000);
    },

    attachClipboard: function attachClipboard() {
        this.detachClipboard();
        if (this.refs['copy-button']) {
            this._clip = new Clipboard(this.refs['copy-button'], {
                text: (function (trigger) {
                    return this.props.linkData['public_link'];
                }).bind(this)
            });
            this._clip.on('success', (function () {
                this.setState({ copyMessage: this.props.getMessage('192') }, this.clearCopyMessage);
            }).bind(this));
            this._clip.on('error', (function () {
                var copyMessage = undefined;
                if (global.navigator.platform.indexOf("Mac") === 0) {
                    copyMessage = this.props.getMessage('144');
                } else {
                    copyMessage = this.props.getMessage('143');
                }
                this.refs['public-link-field'].focus();
                this.setState({ copyMessage: copyMessage }, this.clearCopyMessage);
            }).bind(this));
        }
    },
    detachClipboard: function detachClipboard() {
        if (this._clip) {
            this._clip.destroy();
        }
    },

    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
        this.attachClipboard();
    },

    componentDidMount: function componentDidMount() {
        this.attachClipboard();
    },

    componentWillUnmount: function componentWillUnmount() {
        this.detachClipboard();
    },

    openMailer: function openMailer() {
        var mailData = this.props.shareModel.prepareEmail("link", this.props.linkData.hash);
        this.props.showMailer(mailData.subject, mailData.message, [], this.props.linkData.hash);
    },

    toggleQRCode: function toggleQRCode() {
        this.setState({ showQRCode: !this.state.showQRCode });
    },

    render: function render() {
        var publicLink = this.props.linkData['public_link'];
        var editAllowed = this.props.editAllowed && !this.props.linkData['hash_is_shorten'] && !this.props.isReadonly() && this.props.shareModel.currentIsOwner();
        if (this.state.editLink && editAllowed) {
            return React.createElement(
                Paper,
                { zDepth: 0, rounded: false, className: "public-link-container edit-link" },
                React.createElement(
                    'div',
                    { style: { display: 'flex', alignItems: 'center' } },
                    React.createElement(
                        'span',
                        { style: { fontSize: 16, color: 'rgba(0,0,0,0.4)', display: 'inline-block', maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } },
                        PathUtils.getDirname(publicLink) + '/ '
                    ),
                    React.createElement(TextField, { style: { flex: 1, marginRight: 10, marginLeft: 10 }, onChange: this.changeLink, value: this.state.customLink !== undefined ? this.state.customLink : this.props.linkData['hash'] }),
                    React.createElement(FloatingActionButton, { mini: true, iconClassName: 'mdi mdi-check', onTouchTap: this.toggleEditMode })
                ),
                React.createElement(
                    'div',
                    { className: 'section-legend' },
                    this.props.getMessage('194')
                )
            );
        } else {
            var copyButton = React.createElement('span', { ref: 'copy-button', className: 'copy-link-button mdi mdi-content-copy', title: this.props.getMessage('191') });
            var setHtml = (function () {
                return { __html: this.state.copyMessage };
            }).bind(this);
            var _focus = function _focus(e) {
                e.target.select();
            };
            var actionLinks = [],
                qrCode = undefined;
            if (this.props.showMailer) {
                actionLinks.push(React.createElement(_mainActionButton2['default'], { key: 'outline', callback: this.openMailer, mdiIcon: 'email-outline', messageId: '45' }));
            }
            if (editAllowed) {
                actionLinks.push(React.createElement(_mainActionButton2['default'], { key: 'pencil', callback: this.toggleEditMode, mdiIcon: 'pencil', messageId: "193" }));
            }
            if (ShareModel.qrcodeEnabled()) {
                actionLinks.push(React.createElement(_mainActionButton2['default'], { key: 'qrcode', callback: this.toggleQRCode, mdiIcon: 'qrcode', messageId: '94' }));
            }
            if (actionLinks.length) {
                actionLinks = React.createElement(
                    'div',
                    { className: 'additional-actions-links' },
                    actionLinks
                );
            } else {
                actionLinks = null;
            }
            if (this.state.showQRCode) {
                qrCode = React.createElement(
                    'div',
                    { className: 'qrCode' },
                    React.createElement(QRCode, { size: 128, value: publicLink, level: 'Q' })
                );
            }
            return React.createElement(
                Paper,
                { zDepth: 0, rounded: false, className: 'public-link-container' },
                React.createElement(
                    'div',
                    { style: { position: 'relative' } },
                    React.createElement(TextField, {
                        className: "public-link" + (this.props.linkData['is_expired'] ? ' link-expired' : ''),
                        type: 'text',
                        name: 'Link',
                        ref: 'public-link-field',
                        value: publicLink,
                        onFocus: _focus,
                        fullWidth: true
                    }),
                    ' ',
                    copyButton
                ),
                React.createElement('div', { style: { textAlign: 'center' }, className: 'section-legend', dangerouslySetInnerHTML: setHtml() }),
                this.props.linkData.target_users && React.createElement(_TargetedUsers2['default'], this.props),
                actionLinks,
                qrCode
            );
        }
    }
});

exports['default'] = PublicLinkField = (0, _ShareContextConsumer2['default'])(PublicLinkField);
exports['default'] = PublicLinkField;
module.exports = exports['default'];
