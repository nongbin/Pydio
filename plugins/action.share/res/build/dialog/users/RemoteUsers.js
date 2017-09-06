'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var _RemoteUserEntry = require('./RemoteUserEntry');

var _RemoteUserEntry2 = _interopRequireDefault(_RemoteUserEntry);

var _mainCard = require('../main/Card');

var _mainCard2 = _interopRequireDefault(_mainCard);

var _mainActionButton = require('../main/ActionButton');

var _mainActionButton2 = _interopRequireDefault(_mainActionButton);

var React = require('react');

var _require = require('material-ui');

var TextField = _require.TextField;
var IconButton = _require.IconButton;
var Paper = _require.Paper;

var Pydio = require('pydio');

var _Pydio$requireLib = Pydio.requireLib('ReactModelShare');

var ReactModelShare = _Pydio$requireLib.ReactModelShare;

var _Pydio$requireLib2 = Pydio.requireLib('components');

var AddressBook = _Pydio$requireLib2.AddressBook;

var RemoteUsers = React.createClass({
    displayName: 'RemoteUsers',

    propTypes: {
        shareModel: React.PropTypes.instanceOf(ReactModelShare),
        onUserUpdate: React.PropTypes.func.isRequired,
        pydio: React.PropTypes.instanceOf(Pydio)
    },

    getInitialState: function getInitialState() {
        return { addDisabled: true, showUserForm: false };
    },

    addUser: function addUser() {
        var h = this.refs["host"].getValue();
        var u = this.refs["user"].getValue();
        this.props.shareModel.createRemoteLink(h, u);
    },

    removeUser: function removeUser(linkId) {
        this.props.shareModel.removeRemoteLink(linkId);
    },

    monitorInput: function monitorInput() {
        var h = this.refs["host"].getValue();
        var u = this.refs["user"].getValue();
        this.setState({ addDisabled: !(h && u) });
    },

    onAddressBookItemSelected: function onAddressBookItemSelected(uObject, parent) {
        var trustedServerId = uObject.trustedServerId;

        var userId = uObject.getId();
        this.props.shareModel.createRemoteLink('trusted://' + trustedServerId, userId);
    },

    getActions: function getActions() {
        var _this = this;

        var ocsRemotes = this.props.pydio.getPluginConfigs('core.ocs').get('TRUSTED_SERVERS');
        var hasTrusted = ocsRemotes && ocsRemotes.length;

        return [React.createElement(_mainActionButton2['default'], { key: 'manual', mdiIcon: 'account-plus', messageId: '45', onTouchTap: function () {
                _this.setState({ showUserForm: true });
            } }), React.createElement(AddressBook, {
            key: 'addressbook',
            mode: 'popover',
            pydio: this.props.pydio,
            onItemSelected: this.onAddressBookItemSelected,
            usersFrom: 'remote',
            disableSearch: true,
            popoverButton: React.createElement(_mainActionButton2['default'], { mdiIcon: 'server-network', messageId: '45' })
        })];
    },

    renderUserForm: function renderUserForm() {
        var _this2 = this;

        if (this.props.isReadonly()) {
            return null;
        }
        return React.createElement(
            Paper,
            { zDepth: 0, style: { padding: '0 16px', backgroundColor: '#FAFAFA', marginTop: 10 } },
            React.createElement(
                'div',
                null,
                React.createElement(TextField, { fullWidth: true, ref: 'host', floatingLabelText: this.props.getMessage('209'), onChange: this.monitorInput }),
                React.createElement(TextField, { fullWidth: true, ref: 'user', type: 'text', floatingLabelText: this.props.getMessage('210'), onChange: this.monitorInput })
            ),
            React.createElement(
                'div',
                { style: { textAlign: 'right' } },
                React.createElement(IconButton, { tooltip: 'Cancel', iconClassName: 'mdi mdi-undo', onClick: function () {
                        _this2.setState({ showUserForm: false });
                    } }),
                React.createElement(IconButton, { tooltip: this.props.getMessage('45'), iconClassName: 'icon-plus-sign', onClick: this.addUser, disabled: this.state.addDisabled })
            )
        );
    },

    render: function render() {
        var ocsLinks = this.props.shareModel.getOcsLinksByStatus(),
            inv,
            rwHeader,
            hasActiveOcsLink = false;

        inv = ocsLinks.map((function (link) {
            hasActiveOcsLink = !hasActiveOcsLink && link && link.invitation && link.invitation.STATUS == 2 ? true : hasActiveOcsLink;

            return React.createElement(_RemoteUserEntry2['default'], {
                shareModel: this.props.shareModel,
                linkData: link,
                onRemoveUser: this.removeUser,
                onUserUpdate: this.props.onUserUpdate
            });
        }).bind(this));

        if (hasActiveOcsLink) {
            rwHeader = React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'shared-users-rights-header' },
                    React.createElement(
                        'span',
                        { className: 'read' },
                        this.props.getMessage('361', '')
                    ),
                    React.createElement(
                        'span',
                        { className: 'read' },
                        this.props.getMessage('181')
                    )
                )
            );
        }

        return React.createElement(
            _mainCard2['default'],
            { title: this.props.getMessage('207'), actions: this.getActions() },
            !ocsLinks.length && React.createElement(
                'div',
                { style: { color: 'rgba(0,0,0,0.43)', paddingBottom: 16 } },
                this.props.getMessage('208')
            ),
            React.createElement(
                'div',
                null,
                rwHeader,
                inv
            ),
            this.state.showUserForm && this.renderUserForm()
        );
    }
});

exports['default'] = RemoteUsers = (0, _ShareContextConsumer2['default'])(RemoteUsers);
exports['default'] = RemoteUsers;
module.exports = exports['default'];
