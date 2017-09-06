'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var _UserBadge = require('./UserBadge');

var _UserBadge2 = _interopRequireDefault(_UserBadge);

var _SharedUserEntry = require('./SharedUserEntry');

var _SharedUserEntry2 = _interopRequireDefault(_SharedUserEntry);

var _mainActionButton = require('../main/ActionButton');

var _mainActionButton2 = _interopRequireDefault(_mainActionButton);

var _mainCard = require('../main/Card');

var _mainCard2 = _interopRequireDefault(_mainCard);

var React = require('react');

var Pydio = require('pydio');

var _Pydio$requireLib = Pydio.requireLib('components');

var UsersCompleter = _Pydio$requireLib.UsersCompleter;

var _require = require('material-ui');

var Paper = _require.Paper;

var SharedUsers = React.createClass({
    displayName: 'SharedUsers',

    propTypes: {
        pydio: React.PropTypes.instanceOf(Pydio),
        users: React.PropTypes.array.isRequired,
        userObjects: React.PropTypes.object.isRequired,
        onUserUpdate: React.PropTypes.func.isRequired,
        saveSelectionAsTeam: React.PropTypes.func,
        sendInvitations: React.PropTypes.func,
        showTitle: React.PropTypes.bool
    },
    sendInvitationToAllUsers: function sendInvitationToAllUsers() {
        this.props.sendInvitations(this.props.userObjects);
    },
    clearAllUsers: function clearAllUsers() {
        this.props.users.map((function (entry) {
            this.props.onUserUpdate('remove', entry.ID, entry);
        }).bind(this));
    },
    valueSelected: function valueSelected(userObject) {
        var newEntry = {
            ID: userObject.getId(),
            RIGHT: 'r',
            LABEL: userObject.getLabel(),
            TYPE: userObject.getGroup() ? 'group' : 'user'
        };
        this.props.onUserUpdate('add', newEntry.ID, newEntry);
    },
    completerRenderSuggestion: function completerRenderSuggestion(userObject) {
        var type = userObject.getType() === 'team' || userObject.getId().indexOf('/AJXP_TEAM/') === 0 ? 'team' : userObject.getGroup() ? 'group' : userObject.getTemporary() ? 'temporary' : userObject.getExternal() ? 'tmp_user' : 'user';

        return React.createElement(_UserBadge2['default'], {
            label: userObject.getExtendedLabel() || userObject.getLabel(),
            avatar: userObject.getAvatar(),
            type: type
        });
    },

    render: function render() {
        // sort by group/user then by ID;
        var userEntries = this.props.users.sort(function (a, b) {
            return b.TYPE === 'group' || b.TYPE === 'team' ? 1 : a.TYPE === 'group' || a.TYPE === 'team' ? -1 : a.ID > b.ID ? 1 : b.ID > a.ID ? -1 : 0;
        }).map((function (u) {
            return React.createElement(_SharedUserEntry2['default'], {
                userEntry: u,
                userObject: this.props.userObjects[u.ID],
                key: u.ID,
                shareModel: this.props.shareModel,
                onUserUpdate: this.props.onUserUpdate,
                sendInvitations: this.props.sendInvitations
            });
        }).bind(this));
        var actionLinks = [];
        if (this.props.users.length && !this.props.isReadonly()) {
            actionLinks.push(React.createElement(_mainActionButton2['default'], { key: 'clear', callback: this.clearAllUsers, mdiIcon: 'delete', messageId: '180' }));
        }
        if (this.props.sendInvitations && this.props.users.length) {
            actionLinks.push(React.createElement(_mainActionButton2['default'], { key: 'invite', callback: this.sendInvitationToAllUsers, mdiIcon: 'email-outline', messageId: '45' }));
        }
        if (this.props.saveSelectionAsTeam && this.props.users.length > 1 && !this.props.isReadonly()) {
            actionLinks.push(React.createElement(_mainActionButton2['default'], { key: 'team', callback: this.props.saveSelectionAsTeam, mdiIcon: 'account-multiple-plus', messageId: '509', messageCoreNamespace: true }));
        }
        var rwHeader = undefined,
            usersInput = undefined;
        if (this.props.users.length) {
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
        if (!this.props.isReadonly()) {
            var excludes = this.props.users.map(function (u) {
                return u.ID;
            });
            usersInput = React.createElement(UsersCompleter, {
                className: 'share-form-users',
                fieldLabel: this.props.getMessage('34'),
                renderSuggestion: this.completerRenderSuggestion,
                onValueSelected: this.valueSelected,
                excludes: excludes,
                pydio: this.props.pydio,
                showAddressBook: true,
                usersFrom: 'local'
            });
        }
        return React.createElement(
            _mainCard2['default'],
            {
                title: this.props.showTitle ? this.props.getMessage('217') : null,
                actions: actionLinks
            },
            React.createElement(
                'div',
                { style: userEntries.length ? { margin: '-20px 8px 16px' } : { marginTop: -20 } },
                usersInput
            ),
            rwHeader,
            React.createElement(
                'div',
                null,
                userEntries
            ),
            !userEntries.length && React.createElement(
                'div',
                { style: { color: 'rgba(0,0,0,0.43)' } },
                this.props.getMessage('182')
            )
        );
    }
});

exports['default'] = SharedUsers = (0, _ShareContextConsumer2['default'])(SharedUsers);
exports['default'] = SharedUsers;
module.exports = exports['default'];
