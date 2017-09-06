'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _UserBadge = require('./UserBadge');

var _UserBadge2 = _interopRequireDefault(_UserBadge);

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var React = require('react');

var SharedUserEntry = React.createClass({
    displayName: 'SharedUserEntry',

    propTypes: {
        userEntry: React.PropTypes.object.isRequired,
        userObject: React.PropTypes.instanceOf(PydioUsers.User).isRequired,
        onUserUpdate: React.PropTypes.func.isRequired,
        sendInvitations: React.PropTypes.func
    },
    onRemove: function onRemove() {
        this.props.onUserUpdate('remove', this.props.userEntry.ID, this.props.userEntry);
    },
    onToggleWatch: function onToggleWatch() {
        this.props.onUserUpdate('update_right', this.props.userEntry.ID, { right: 'watch', add: !this.props.userEntry['WATCH'] });
    },
    onInvite: function onInvite() {
        var targets = {};
        targets[this.props.userObject.getId()] = this.props.userObject;
        this.props.sendInvitations(targets);
    },
    onUpdateRight: function onUpdateRight(event) {
        var target = event.target;
        this.props.onUserUpdate('update_right', this.props.userEntry.ID, { right: target.name, add: target.checked });
    },
    render: function render() {
        var menuItems = [];
        if (this.props.userEntry.TYPE != 'group') {
            if (!this.props.isReadonly()) {
                // Toggle Notif
                menuItems.push({
                    text: this.props.getMessage('183'),
                    callback: this.onToggleWatch,
                    checked: this.props.userEntry.WATCH
                });
            }
            if (this.props.sendInvitations) {
                // Send invitation
                menuItems.push({
                    text: this.props.getMessage('45'),
                    callback: this.onInvite
                });
            }
        }
        if (!this.props.isReadonly()) {
            // Remove Entry
            menuItems.push({
                text: this.props.getMessage('257', ''),
                callback: this.onRemove
            });
        }
        return React.createElement(
            _UserBadge2['default'],
            {
                label: this.props.userEntry.LABEL || this.props.userEntry.ID,
                avatar: this.props.userEntry.AVATAR,
                type: this.props.userEntry.TYPE,
                menus: menuItems
            },
            React.createElement(
                'span',
                { className: 'user-badge-rights-container', style: !menuItems.length ? { marginRight: 48 } : {} },
                React.createElement('input', { type: 'checkbox', name: 'read', disabled: this.props.isReadonly(), checked: this.props.userEntry.RIGHT.indexOf('r') !== -1, onChange: this.onUpdateRight }),
                React.createElement('input', { type: 'checkbox', name: 'write', disabled: this.props.isReadonly(), checked: this.props.userEntry.RIGHT.indexOf('w') !== -1, onChange: this.onUpdateRight })
            )
        );
    }
});

exports['default'] = SharedUserEntry = (0, _ShareContextConsumer2['default'])(SharedUserEntry);
exports['default'] = SharedUserEntry;
module.exports = exports['default'];
