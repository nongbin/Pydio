'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _Permissions = require('./Permissions');

var _Permissions2 = _interopRequireDefault(_Permissions);

var _SecureOptions = require('./SecureOptions');

var _SecureOptions2 = _interopRequireDefault(_SecureOptions);

var _mainCard = require('../main/Card');

var _mainCard2 = _interopRequireDefault(_mainCard);

var React = require('react');

var _require$requireLib = require('pydio').requireLib('form');

var ValidPassword = _require$requireLib.ValidPassword;

var _require = require('material-ui');

var RaisedButton = _require.RaisedButton;
var Checkbox = _require.Checkbox;
var Divider = _require.Divider;

var PublicLinkPanel = React.createClass({
    displayName: 'PublicLinkPanel',

    propTypes: {
        linkData: React.PropTypes.object,
        pydio: React.PropTypes.instanceOf(Pydio),
        shareModel: React.PropTypes.instanceOf(ReactModel.Share),
        authorizations: React.PropTypes.object,
        showMailer: React.PropTypes.func
    },

    disableSave: function disableSave() {
        this.setState({ disabled: true });
    },
    enableSave: function enableSave() {
        this.setState({ disabled: false });
    },
    componentDidMount: function componentDidMount() {
        this.props.shareModel.observe('saving', this.disableSave);
        this.props.shareModel.observe('saved', this.enableSave);
    },
    componendWillUnmount: function componendWillUnmount() {
        this.props.shareModel.stopObserving('saving', this.disableSave);
        this.props.shareModel.stopObserving('saved', this.enableSave);
    },

    toggleLink: function toggleLink() {
        var publicLinks = this.props.shareModel.getPublicLinks();
        if (this.state.showTemporaryPassword) {
            this.setState({ showTemporaryPassword: false, temporaryPassword: null });
        } else if (!publicLinks.length && ReactModel.Share.getAuthorizations(this.props.pydio).password_mandatory) {
            this.setState({ showTemporaryPassword: true, temporaryPassword: '' });
        } else {
            this.props.shareModel.togglePublicLink();
        }
    },

    getInitialState: function getInitialState() {
        return { showTemporaryPassword: false, temporaryPassword: null, disabled: false };
    },

    updateTemporaryPassword: function updateTemporaryPassword(value, event) {
        if (value == undefined) value = event.currentTarget.getValue();
        this.setState({ temporaryPassword: value });
    },

    enableLinkWithPassword: function enableLinkWithPassword() {
        this.props.shareModel.enablePublicLinkWithPassword(this.state.temporaryPassword);
        this.setState({ showTemporaryPassword: false, temporaryPassword: null });
    },

    render: function render() {

        var publicLinkPanes = undefined,
            publicLinkField = undefined;
        if (this.props.linkData) {
            publicLinkField = React.createElement(_Field2['default'], {
                showMailer: this.props.showMailer,
                linkData: this.props.linkData,
                shareModel: this.props.shareModel,
                editAllowed: this.props.authorizations.editable_hash,
                key: 'public-link'
            });
            publicLinkPanes = [React.createElement(_Permissions2['default'], {
                linkData: this.props.linkData,
                shareModel: this.props.shareModel,
                key: 'public-perm'
            }), React.createElement(_SecureOptions2['default'], {
                linkData: this.props.linkData,
                shareModel: this.props.shareModel,
                pydio: this.props.pydio,
                key: 'public-secure'
            })];
        } else if (this.state.showTemporaryPassword) {
            publicLinkField = React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'section-legend', style: { marginTop: 20 } },
                    this.props.getMessage('215')
                ),
                React.createElement(
                    'div',
                    { style: { display: 'flex', alignItems: 'baseline' } },
                    React.createElement(
                        'div',
                        { style: { flex: 1 } },
                        React.createElement(ValidPassword, {
                            attributes: { label: this.props.getMessage('23') },
                            value: this.state.temporaryPassword,
                            onChange: this.updateTemporaryPassword
                        })
                    ),
                    React.createElement(
                        'div',
                        { style: { marginLeft: 7, marginTop: 26 } },
                        React.createElement(RaisedButton, { label: this.props.getMessage('92'), secondary: true, onClick: this.enableLinkWithPassword })
                    )
                )
            );
        } else {
            publicLinkField = React.createElement(
                'div',
                { className: 'section-legend', style: { paddingBottom: 16, paddingTop: 16 } },
                this.props.getMessage('190')
            );
        }
        var checked = !!this.props.linkData;
        var disableForNotOwner = false;
        if (checked && !this.props.shareModel.currentIsOwner()) {
            disableForNotOwner = true;
        }
        return React.createElement(
            'div',
            { style: this.props.style },
            React.createElement(
                _mainCard2['default'],
                null,
                React.createElement(Checkbox, {
                    disabled: this.props.isReadonly() || disableForNotOwner || this.state.disabled,
                    onCheck: this.toggleLink,
                    checked: !!this.props.linkData || this.state.showTemporaryPassword,
                    label: this.props.getMessage('189'),
                    labelStyle: { fontSize: 18 }
                }),
                publicLinkField
            ),
            publicLinkPanes
        );
    }
});

exports['default'] = PublicLinkPanel = (0, _ShareContextConsumer2['default'])(PublicLinkPanel);
exports['default'] = PublicLinkPanel;
module.exports = exports['default'];
