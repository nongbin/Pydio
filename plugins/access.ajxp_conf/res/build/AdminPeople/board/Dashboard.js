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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _editorEditor = require('../editor/Editor');

var _editorEditor2 = _interopRequireDefault(_editorEditor);

var React = require('react');

var _require = require('material-ui');

var IconButton = _require.IconButton;
var Paper = _require.Paper;
var BottomNavigation = _require.BottomNavigation;
var BottomNavigationItem = _require.BottomNavigationItem;
var FontIcon = _require.FontIcon;
var FlatButton = _require.FlatButton;
var TextField = _require.TextField;

var PydioDataModel = require('pydio/model/data-model');

var _require2 = require('material-ui/styles');

var muiThemeable = _require2.muiThemeable;

var Dashboard = React.createClass({
    displayName: 'Dashboard',

    mixins: [AdminComponents.MessagesConsumerMixin],

    propTypes: {
        dataModel: React.PropTypes.instanceOf(PydioDataModel).isRequired,
        rootNode: React.PropTypes.instanceOf(AjxpNode).isRequired,
        currentNode: React.PropTypes.instanceOf(AjxpNode).isRequired,
        openEditor: React.PropTypes.func.isRequired
    },

    getInitialState: function getInitialState() {
        // find roles node
        var siblings = this.props.rootNode.getParent().getChildren();
        var roleNode;
        siblings.forEach(function (s) {
            if (s.getPath() == '/data/roles') {
                roleNode = s;
            }
        });
        if (!roleNode) {
            roleNode = new AjxpNode('/data/roles');
        }
        return {
            searchResultData: false,
            currentNode: this.props.currentNode,
            dataModel: this.props.dataModel,
            roleNode: roleNode
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        if (!this.state.searchResultData) {
            this.setState({
                currentNode: newProps.currentNode,
                dataModel: newProps.dataModel
            });
        }
    },

    _extractMergedRole: function _extractMergedRole(node) {
        if (!node.getMetadata().get('merged_role') && node.getMetadata().get('json_merged_role')) {
            node.getMetadata().set('merged_role', JSON.parse(node.getMetadata().get('json_merged_role')));
            node.getMetadata()['delete']('json_merged_role');
        }
        return node.getMetadata().get('merged_role');
    },

    renderListUserAvatar: function renderListUserAvatar(node) {
        if (node.getMetadata().get("shared_user")) {
            return React.createElement('div', { className: 'sub-entry-icon' });
        }
        var role = this._extractMergedRole(node);
        if (role) {
            try {
                var avatar = role.PARAMETERS.AJXP_REPO_SCOPE_ALL['core.conf'].avatar;
            } catch (e) {}
            if (avatar) {
                var imgSrc = pydio.Parameters.get("ajxpServerAccess") + "&get_action=get_binary_param&user_id=" + PathUtils.getBasename(node.getPath()) + "&binary_id=" + avatar;
                return React.createElement('img', { src: imgSrc, style: { borderRadius: 30, width: 33 } });
            }
        }
        var iconClass = node.getMetadata().get("icon_class") ? node.getMetadata().get("icon_class") : node.isLeaf() ? "icon-file-alt" : "icon-folder-close";
        return React.createElement(ReactMUI.FontIcon, { className: iconClass });
    },

    renderListEntryFirstLine: function renderListEntryFirstLine(node) {
        if (node.getMetadata().get("shared_user")) {
            return node.getLabel() + " [" + this.context.getMessage('user.13') + "]";
        } else if (node.getMetadata().get("isAdmin") == pydio.MessageHash['ajxp_conf.14']) {
            return React.createElement(
                'span',
                null,
                node.getLabel(),
                ' ',
                React.createElement('span', { className: 'icon-lock', style: { display: 'inline-block', marginRight: 5 } })
            );
        } else {
            return node.getLabel();
        }
    },

    renderListEntrySecondLine: function renderListEntrySecondLine(node) {
        if (node.isLeaf()) {
            if (node.getPath() == '/data/users') {
                // This is the Root Group
                return this.context.getMessage('user.8');
            }
            var strings = [];
            if (node.getMetadata().get("last_connection_readable")) {
                strings.push(this.context.getMessage('user.9') + ' ' + node.getMetadata().get("last_connection_readable"));
            }
            var role = this._extractMergedRole(node);
            if (role) {
                strings.push(this.context.getMessage('user.10').replace("%i", Object.keys(role.ACL).length));
            }
            var roles = node.getMetadata().get('ajxp_roles');
            if (roles && roles.split(',').length) {
                strings.push(this.context.getMessage('user.11').replace("%i", roles.split(',').length));
            }
            return strings.join(" - ");
        } else {
            return this.context.getMessage('user.12') + ': ' + node.getPath().replace('/data/users', '');
        }
    },

    renderListEntrySelector: function renderListEntrySelector(node) {
        if (node.getPath() == '/data/users') return false;
        return node.isLeaf();
    },

    displaySearchResults: function displaySearchResults(searchTerm, searchDataModel) {
        this.setState({
            searchResultTerm: searchTerm,
            searchResultData: {
                term: searchTerm,
                toggleState: this.hideSearchResults
            },
            currentNode: searchDataModel.getContextNode(),
            dataModel: searchDataModel
        });
    },

    hideSearchResults: function hideSearchResults() {
        this.setState({
            searchResultData: false,
            currentNode: this.props.currentNode,
            dataModel: this.props.dataModel
        });
    },

    createUserAction: function createUserAction() {
        pydio.UI.openComponentInModal('AdminPeople', 'CreateUserForm', { dataModel: this.props.dataModel, openRoleEditor: this.openRoleEditor.bind(this) });
    },

    createGroupAction: function createGroupAction() {
        pydio.UI.openComponentInModal('AdminPeople', 'CreateRoleOrGroupForm', { type: 'group', openRoleEditor: this.openRoleEditor.bind(this) });
    },

    createRoleAction: function createRoleAction() {
        pydio.UI.openComponentInModal('AdminPeople', 'CreateRoleOrGroupForm', { type: 'role', roleNode: this.state.roleNode, openRoleEditor: this.openRoleEditor.bind(this) });
    },

    openUsersImporter: function openUsersImporter() {
        pydio.UI.openComponentInModal('EnterprisePeople', 'UsersImportDialog', { dataModel: this.props.dataModel });
    },

    toggleStateShowRoles: function toggleStateShowRoles() {
        this.setState({ showRolesActions: !this.state.showRolesActions });
    },

    openRoleEditor: function openRoleEditor(node) {
        var initialSection = arguments.length <= 1 || arguments[1] === undefined ? 'activity' : arguments[1];

        if (this.refs.editor && this.refs.editor.isDirty()) {
            if (!window.confirm(this.props.pydio.MessageHash["role_editor.19"])) {
                return false;
            }
        }
        var editor = _editorEditor2['default'];
        var editorNode = XMLUtils.XPathSelectSingleNode(this.props.pydio.getXmlRegistry(), '//client_configs/component_config[@component="AdminPeople.Dashboard"]/editor');
        if (editorNode) {
            editor = editorNode.getAttribute('namespace') + '.' + editorNode.getAttribute('component');
        }
        var editorData = {
            COMPONENT: editor,
            PROPS: {
                ref: "editor",
                node: node,
                pydio: this.props.pydio,
                initialEditSection: initialSection,
                onRequestTabClose: this.closeRoleEditor
            }
        };
        this.props.openRightPane(editorData);
    },

    closeRoleEditor: function closeRoleEditor() {
        if (this.refs.editor && this.refs.editor.isDirty()) {
            if (!window.confirm(this.props.pydio.MessageHash["role_editor.19"])) {
                return false;
            }
        }
        //this.setState({selectedNode:null, showCreator:null});
        this.props.closeRightPane();
    },

    deleteAction: function deleteAction(node) {
        var dm = new PydioDataModel();
        dm.setSelectedNodes([node]);
        ResourcesManager.loadClassesAndApply(['AdminActions'], function () {
            AdminActions.Callbacks.deleteAction(null, [dm]);
        });
    },

    renderNodeActions: function renderNodeActions(node) {
        var _this = this;

        var mime = node.getAjxpMime();
        var iconStyle = {
            color: 'rgba(0,0,0,0.3)',
            fontSize: 20
        };
        var actions = [];
        if (mime === 'user_editable' || mime === 'group' || mime === 'role' || mime === 'role_editable') {
            actions.push(React.createElement(IconButton, { key: 'edit', iconClassName: 'mdi mdi-pencil', onTouchTap: function () {
                    _this.openRoleEditor(node);
                }, onClick: function (e) {
                    e.stopPropagation();
                }, iconStyle: iconStyle }));
            actions.push(React.createElement(IconButton, { key: 'delete', iconClassName: 'mdi mdi-delete', onTouchTap: function () {
                    _this.deleteAction(node);
                }, onClick: function (e) {
                    e.stopPropagation();
                }, iconStyle: iconStyle }));
        } else if (mime === 'user') {
            actions.push(React.createElement(IconButton, { key: 'edit', iconClassName: 'mdi mdi-pencil', onTouchTap: function () {
                    _this.openRoleEditor(node);
                }, onClick: function (e) {
                    e.stopPropagation();
                }, iconStyle: iconStyle }));
        }
        return React.createElement(
            'div',
            null,
            actions
        );
    },

    toggleRoleSearch: function toggleRoleSearch() {
        if (this.state.showRolesSearch) {
            this.setState({ showRolesSearch: false, searchRoleString: '' });
        } else {
            this.setState({ showRolesSearch: true });
        }
    },

    filterRoleNodes: function filterRoleNodes(node) {
        return node.getLabel().toLowerCase().indexOf(this.state.searchRoleString.toLowerCase()) !== -1;
    },

    render: function render() {
        var _this2 = this;

        var fontIconStyle = {
            style: {
                backgroundColor: this.props.muiTheme.palette.accent2Color,
                borderRadius: '50%',
                width: 36,
                height: 36,
                padding: 8,
                marginRight: 10
            },
            iconStyle: {
                color: 'white',
                fontSize: 20
            }
        };
        var emptyToolbar = React.createElement('div', null);
        var importButton = React.createElement(IconButton, _extends({}, fontIconStyle, { iconClassName: 'mdi mdi-file-excel', primary: false, tooltip: this.context.getMessage('171', 'ajxp_conf'), onTouchTap: this.openUsersImporter }));
        if (!ResourcesManager.moduleIsAvailable('EnterprisePeople')) {
            var disabled = { style: _extends({}, fontIconStyle.style), iconStyle: _extends({}, fontIconStyle.iconStyle) };
            disabled.style.backgroundColor = 'rgba(0,0,0,0.23)';
            importButton = React.createElement(IconButton, _extends({}, disabled, { iconClassName: 'mdi mdi-file-excel', primary: false, tooltip: this.context.getMessage('171', 'ajxp_conf'), disabled: true }));
        }
        var leftPanelIndex = this.state.leftPanelIndex || 0;

        return React.createElement(
            'div',
            { className: "main-layout-nav-to-stack vertical-layout people-dashboard" },
            React.createElement(
                'div',
                { className: 'people-title horizontal-layout' },
                React.createElement(
                    'div',
                    { style: { display: 'flex', width: '100%', alignItems: 'top' } },
                    React.createElement(
                        'div',
                        { style: { display: 'flex', flex: 1, alignItems: 'center' } },
                        React.createElement(
                            'h1',
                            { className: 'admin-panel-title' },
                            this.context.getMessage('2', 'ajxp_conf')
                        ),
                        React.createElement(
                            'div',
                            { style: { flex: 1, paddingTop: 8 } },
                            React.createElement(IconButton, _extends({ primary: true }, fontIconStyle, { iconClassName: 'mdi mdi-account-plus', tooltip: this.context.getMessage("user.1"), onTouchTap: this.createUserAction })),
                            React.createElement(IconButton, _extends({ primary: true }, fontIconStyle, { iconClassName: 'mdi mdi-account-multiple-plus', tooltip: this.context.getMessage("user.2"), onTouchTap: this.createGroupAction })),
                            importButton
                        )
                    ),
                    React.createElement(PydioComponents.SearchBox, {
                        displayResults: this.displaySearchResults,
                        displayResultsState: this.state.searchResultData,
                        hideResults: this.hideSearchResults,
                        className: 'search-box layout-fill',
                        parameters: { get_action: 'admin_search_users', dir: this.props.dataModel.getContextNode().getPath() },
                        queryParameterName: 'query',
                        limit: 50,
                        textLabel: this.context.getMessage('user.7')
                    })
                )
            ),
            React.createElement(
                'div',
                { className: 'container horizontal-layout layout-fill' },
                React.createElement(
                    'div',
                    { className: 'hide-on-vertical-layout vertical-layout tab-vertical-layout people-tree', style: { flex: 'none' } },
                    React.createElement(
                        BottomNavigation,
                        { selectedIndex: leftPanelIndex, style: { backgroundColor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' } },
                        React.createElement(BottomNavigationItem, { label: this.context.getMessage("user.3"), icon: React.createElement(FontIcon, { className: 'mdi mdi-file-tree' }), onTouchTap: function () {
                                _this2.setState({ leftPanelIndex: 0 });
                            } }),
                        React.createElement(BottomNavigationItem, { label: this.context.getMessage("user.4"), icon: React.createElement(FontIcon, { className: 'mdi mdi-ticket-account' }), onTouchTap: function () {
                                _this2.setState({ leftPanelIndex: 1 });
                            } })
                    ),
                    leftPanelIndex === 0 && React.createElement(
                        'div',
                        { style: { marginLeft: 8, flex: 1 } },
                        React.createElement(PydioComponents.DNDTreeView, {
                            showRoot: true,
                            rootLabel: this.context.getMessage("user.5"),
                            node: this.props.rootNode,
                            dataModel: this.props.dataModel,
                            className: 'users-groups-tree'
                        })
                    ),
                    leftPanelIndex === 1 && React.createElement(
                        'div',
                        { className: 'layout-fill vertical-layout' },
                        React.createElement(PydioComponents.SimpleList, {
                            style: { flex: 1 },
                            key: 2,
                            node: this.state.roleNode,
                            observeNodeReload: true,
                            dataModel: this.state.dataModel,
                            className: "display-as-menu" + (this.state.showRolesActions ? '' : ' hideActions'),
                            openEditor: this.openRoleEditor,
                            skipParentNavigation: true,
                            customToolbar: emptyToolbar,
                            entryRenderIcon: function (node) {
                                return null;
                            },
                            entryRenderActions: this.renderNodeActions,
                            elementHeight: PydioComponents.SimpleList.HEIGHT_ONE_LINE,
                            filterNodes: this.state.searchRoleString ? this.filterRoleNodes.bind(this) : null
                        }),
                        this.state.showRolesSearch && React.createElement(
                            'div',
                            { style: { height: 48, padding: '0px 16px', backgroundColor: 'rgba(247, 247, 247, 0.4)', borderTop: '1px solid #E0E0E0', borderBottom: '1px solid #EEEEEE' } },
                            React.createElement(TextField, { fullWidth: true, underlineShow: false, hintText: this.context.getMessage('47', 'role_editor') + '...', value: this.state.searchRoleString || '', onChange: function (e, v) {
                                    return _this2.setState({ searchRoleString: v });
                                } })
                        ),
                        React.createElement(
                            'div',
                            { style: { height: 48, padding: '8px 12px', backgroundColor: 'rgb(247,247,247)', boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.23)', display: 'flex', alignItems: 'center' } },
                            React.createElement(FlatButton, { secondary: true, label: this.context.getMessage("user.6"), onClick: this.createRoleAction }),
                            React.createElement(FlatButton, { secondary: true, onTouchTap: this.toggleStateShowRoles, label: this.context.getMessage('93', 'ajxp_conf') }),
                            React.createElement(IconButton, { secondary: true, iconClassName: this.state.showRolesSearch ? "mdi mdi-close" : "mdi mdi-magnify", tooltipPosition: 'top-left', iconStyle: { color: '#757575' }, tooltip: this.context.getMessage('47', 'role_editor'), onTouchTap: this.toggleRoleSearch.bind(this) })
                        )
                    )
                ),
                React.createElement(
                    ReactMUI.Paper,
                    { zDepth: 0, className: 'layout-fill vertical-layout people-list' },
                    React.createElement(PydioComponents.SimpleList, {
                        ref: 'mainlist',
                        pydio: this.props.pydio,
                        node: this.state.currentNode,
                        dataModel: this.state.dataModel,
                        openEditor: this.openRoleEditor,
                        clearSelectionOnReload: false,
                        entryRenderIcon: this.renderListUserAvatar,
                        entryRenderFirstLine: this.renderListEntryFirstLine,
                        entryRenderSecondLine: this.renderListEntrySecondLine,
                        entryEnableSelector: this.renderListEntrySelector,
                        entryRenderActions: this.renderNodeActions,
                        searchResultData: this.state.searchResultData,
                        elementHeight: PydioComponents.SimpleList.HEIGHT_TWO_LINES,
                        hideToolbar: false,
                        multipleActions: [this.props.pydio.Controller.getActionByName('delete')]
                    })
                )
            )
        );
    }

});

exports['default'] = Dashboard = muiThemeable()(Dashboard);
exports['default'] = Dashboard;
module.exports = exports['default'];
