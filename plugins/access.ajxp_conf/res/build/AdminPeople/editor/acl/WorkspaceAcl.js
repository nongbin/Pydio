/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilMessagesMixin = require('../util/MessagesMixin');

var _RightsSelector = require('./RightsSelector');

var _RightsSelector2 = _interopRequireDefault(_RightsSelector);

exports['default'] = React.createClass({
    displayName: 'WorkspaceAcl',

    mixins: [_utilMessagesMixin.RoleMessagesConsumerMixin],

    propTypes: {
        id: React.PropTypes.string,
        label: React.PropTypes.string,
        role: React.PropTypes.object,
        roleParent: React.PropTypes.object,
        pluginsFilter: React.PropTypes.func,
        paramsFilter: React.PropTypes.func,
        toggleEdit: React.PropTypes.func,
        editMode: React.PropTypes.bool,
        titleOnly: React.PropTypes.bool,
        editOnly: React.PropTypes.bool,
        noParamsListEdit: React.PropTypes.bool,
        uniqueScope: React.PropTypes.bool,
        showModal: React.PropTypes.func,
        hideModal: React.PropTypes.func,
        Controller: React.PropTypes.object,
        showPermissionMask: React.PropTypes.bool,
        supportsFolderBrowsing: React.PropTypes.bool
    },

    onAclChange: function onAclChange(newValue, oldValue) {
        this.props.Controller.updateAcl(this.props.id, newValue);
    },

    onMaskChange: function onMaskChange(values) {
        this.props.Controller.updateMask(this.props.id, values);
    },

    getInitialState: function getInitialState() {
        return { displayMask: false };
    },

    toggleDisplayMask: function toggleDisplayMask() {
        this.setState({ displayMask: !this.state.displayMask });
    },

    render: function render() {
        var wsId = this.props.id;
        var parentAcls = this.props.roleParent && this.props.roleParent.ACL ? this.props.roleParent.ACL : {};
        var acls = this.props.role && this.props.role.ACL ? this.props.role.ACL : {};
        var label = this.props.label;
        var inherited = false;
        if (!acls[wsId] && parentAcls[wsId]) {
            label += ' (' + this.context.getPydioRoleMessage('38') + ')';
            inherited = true;
        }
        var secondLine, action;
        var aclString = acls[wsId] || parentAcls[wsId];
        if (!aclString) aclString = "";
        action = React.createElement(_RightsSelector2['default'], {
            acl: aclString,
            onChange: this.onAclChange,
            hideLabels: true
        });
        if (this.props.showPermissionMask && (aclString.indexOf('r') != -1 || aclString.indexOf('w') != -1)) {

            var toggleButton = React.createElement(ReactMUI.FontIcon, {
                className: "icon-" + (this.state.displayMask ? "minus" : "plus"),
                onClick: this.toggleDisplayMask,
                style: { cursor: 'pointer', padding: '0 8px' }
            });
            label = React.createElement(
                'div',
                null,
                label,
                ' ',
                toggleButton
            );
            if (this.state.displayMask) {
                var parentMask = this.props.roleParent.MASKS && this.props.roleParent.MASKS[wsId] ? this.props.roleParent.MASKS[wsId] : {};
                var mask = this.props.role.MASKS && this.props.role.MASKS[wsId] ? this.props.role.MASKS[wsId] : {};
                action = null;
                var aclObject;
                if (aclString) {
                    aclObject = {
                        read: aclString.indexOf('r') != -1,
                        write: aclString.indexOf('w') != -1
                    };
                }

                if (this.props.supportsFolderBrowsing) {
                    secondLine = React.createElement(
                        ReactMUI.Paper,
                        { zDepth: 1, style: { margin: '8px 20px', backgroundColor: 'white', color: 'rgba(0,0,0,0.87)' } },
                        React.createElement(EnterpriseComponents.PermissionMaskEditor, {
                            workspaceId: wsId,
                            parentMask: parentMask,
                            mask: mask,
                            onMaskChange: this.onMaskChange,
                            showModal: this.props.showModal,
                            hideModal: this.props.hideModal,
                            globalWorkspacePermissions: aclObject
                        })
                    );
                } else {
                    secondLine = React.createElement(
                        ReactMUI.Paper,
                        { zDepth: 1, style: { margin: '8px 20px', backgroundColor: 'white', color: 'rgba(0,0,0,0.87)' } },
                        React.createElement(EnterpriseComponents.PermissionMaskEditorFree, {
                            workspaceId: wsId,
                            parentMask: parentMask,
                            mask: mask,
                            onMaskChange: this.onMaskChange,
                            showModal: this.props.showModal,
                            hideModal: this.props.hideModal,
                            globalWorkspacePermissions: aclObject
                        })
                    );
                }
            }
        }

        return React.createElement(PydioComponents.ListEntry, {
            className: (inherited ? "workspace-acl-entry-inherited " : "") + "workspace-acl-entry",
            firstLine: label,
            secondLine: secondLine,
            actions: action
        });
    }

});
module.exports = exports['default'];
