'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var _UserBadge = require('./UserBadge');

var _UserBadge2 = _interopRequireDefault(_UserBadge);

var React = require('react');

var RemoteUserEntry = React.createClass({
    displayName: 'RemoteUserEntry',

    propTypes: {
        shareModel: React.PropTypes.instanceOf(ReactModel.Share),
        linkData: React.PropTypes.object.isRequired,
        onRemoveUser: React.PropTypes.func.isRequired,
        onUserUpdate: React.PropTypes.func.isRequired
    },

    getInitialState: function getInitialState() {
        return {
            internalUser: this.props.shareModel.getSharedUser(this.props.linkData['internal_user_id'])
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps(newProps, oldProps) {
        this.setState({
            internalUser: newProps.shareModel.getSharedUser(newProps.linkData['internal_user_id'])
        });
    },

    getStatus: function getStatus() {
        var link = this.props.linkData;
        if (!link.invitation) return -1;else return link.invitation.STATUS;
    },

    getStatusString: function getStatusString() {
        var statuses = { 's-1': 214, 's1': 211, 's2': 212, 's4': 213 };
        return this.props.getMessage(statuses['s' + this.getStatus()]);
    },

    buildLabel: function buildLabel() {
        var link = this.props.linkData;
        var host = link.HOST || (link.invitation ? link.invitation.HOST : null);
        var user = link.USER || (link.invitation ? link.invitation.USER : null);
        if (!host || !user) return "Error";
        return user + " @ " + host;
    },

    removeUser: function removeUser() {
        this.props.onRemoveUser(this.props.linkData['hash']);
    },

    onUpdateRight: function onUpdateRight(event) {
        var target = event.target;
        this.props.onUserUpdate('update_right', this.state.internalUser.ID, { right: target.name, add: target.checked });
    },

    render: function render() {
        var menuItems = [];
        if (!this.props.isReadonly()) {
            menuItems = [{
                text: this.props.getMessage('257', ''),
                callback: this.removeUser
            }];
        }
        var status = this.getStatus();
        var additionalItem;
        if (status == 2) {
            additionalItem = React.createElement(
                'span',
                { className: 'user-badge-rights-container' },
                React.createElement('input', { type: 'checkbox', name: 'read', disabled: this.props.isReadonly(), checked: this.state.internalUser.RIGHT.indexOf('r') !== -1, onChange: this.onUpdateRight }),
                React.createElement('input', { type: 'checkbox', name: 'write', disabled: this.props.isReadonly(), checked: this.state.internalUser.RIGHT.indexOf('w') !== -1, onChange: this.onUpdateRight })
            );
        } else {
            additionalItem = React.createElement(
                'span',
                { className: 'user-badge-rights-container' },
                this.getStatusString()
            );
        }

        return React.createElement(
            _UserBadge2['default'],
            {
                label: this.buildLabel(),
                avatar: null,
                type: "remote_user",
                menus: menuItems
            },
            additionalItem
        );
    }

});

exports['default'] = RemoteUserEntry = (0, _ShareContextConsumer2['default'])(RemoteUserEntry);
exports['default'] = RemoteUserEntry;
module.exports = exports['default'];
