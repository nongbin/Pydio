'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var _RemoteUsers = require('./RemoteUsers');

var _RemoteUsers2 = _interopRequireDefault(_RemoteUsers);

var _SharedUsers = require('./SharedUsers');

var _SharedUsers2 = _interopRequireDefault(_SharedUsers);

var React = require('react');

var _require = require('material-ui');

var Divider = _require.Divider;

var ShareModel = require('pydio').requireLib('ReactModelShare');

var UsersPanel = React.createClass({
    displayName: 'UsersPanel',

    propTypes: {
        shareModel: React.PropTypes.instanceOf(ShareModel),
        showMailer: React.PropTypes.func
    },

    onUserUpdate: function onUserUpdate(operation, userId, userData) {
        this.props.shareModel.updateSharedUser(operation, userId, userData);
    },

    onSaveSelection: function onSaveSelection() {
        var label = window.prompt(this.props.getMessage(510, ''));
        if (!label) return;
        this.props.shareModel.saveSelectionAsTeam(label);
    },

    sendInvitations: function sendInvitations(userObjects) {
        try {
            var mailData = this.props.shareModel.prepareEmail("repository");
            this.props.showMailer(mailData.subject, mailData.message, userObjects);
        } catch (e) {
            global.alert(e.message);
        }
    },

    render: function render() {
        var currentUsers = this.props.shareModel.getSharedUsers();
        var federatedEnabled = ShareModel.federatedSharingEnabled();
        return React.createElement(
            'div',
            { style: this.props.style },
            React.createElement(_SharedUsers2['default'], {
                showTitle: federatedEnabled,
                users: currentUsers,
                userObjects: this.props.shareModel.getSharedUsersAsObjects(),
                sendInvitations: this.props.showMailer ? this.sendInvitations : null,
                onUserUpdate: this.onUserUpdate,
                saveSelectionAsTeam: PydioUsers.Client.saveSelectionSupported() ? this.onSaveSelection : null,
                pydio: this.props.pydio
            }),
            federatedEnabled && React.createElement(_RemoteUsers2['default'], {
                shareModel: this.props.shareModel,
                onUserUpdate: this.onUserUpdate,
                pydio: this.props.pydio
            })
        );
    }
});

exports['default'] = UsersPanel = (0, _ShareContextConsumer2['default'])(UsersPanel);
exports['default'] = UsersPanel;
module.exports = exports['default'];
