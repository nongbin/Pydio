(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"../editor/Editor":2,"material-ui":"material-ui","material-ui/styles":"material-ui/styles","pydio/model/data-model":"pydio/model/data-model","react":"react"}],2:[function(require,module,exports){
(function (global){
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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x7, _x8, _x9) { var _again = true; _function: while (_again) { var object = _x7, property = _x8, receiver = _x9; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x7 = parent; _x8 = property; _x9 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilEditorCache = require('./util/EditorCache');

var _utilEditorCache2 = _interopRequireDefault(_utilEditorCache);

var _userUserPasswordDialog = require('./user/UserPasswordDialog');

var _userUserPasswordDialog2 = _interopRequireDefault(_userUserPasswordDialog);

var _userUserRolesPicker = require('./user/UserRolesPicker');

var _userUserRolesPicker2 = _interopRequireDefault(_userUserRolesPicker);

var _panelWorkspacesList = require('./panel/WorkspacesList');

var _panelWorkspacesList2 = _interopRequireDefault(_panelWorkspacesList);

var _panelSharesList = require('./panel/SharesList');

var _panelSharesList2 = _interopRequireDefault(_panelSharesList);

var React = require('react');
var LangUtils = require('pydio/util/lang');
var PathUtils = require('pydio/util/path');

var _require$requireLib = require('pydio').requireLib('form');

var FormPanel = _require$requireLib.FormPanel;

var _require$requireLib2 = require('pydio').requireLib('components');

var PaperEditorLayout = _require$requireLib2.PaperEditorLayout;
var PaperEditorNavEntry = _require$requireLib2.PaperEditorNavEntry;
var PaperEditorNavHeader = _require$requireLib2.PaperEditorNavHeader;

var _require = require('material-ui');

var FlatButton = _require.FlatButton;
var RaisedButton = _require.RaisedButton;

var Editor = (function (_React$Component) {
    _inherits(Editor, _React$Component);

    function Editor(props, context) {
        _classCallCheck(this, Editor);

        _get(Object.getPrototypeOf(Editor.prototype), 'constructor', this).call(this, props, context);
        this.state = this._nodeToState(props.node);
    }

    _createClass(Editor, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var messages = this.context.pydio.MessageHash;
            return {
                messages: messages,
                getMessage: function getMessage(messageId) {
                    var namespace = arguments.length <= 1 || arguments[1] === undefined ? 'pydio_role' : arguments[1];

                    return messages[namespace + (namespace ? "." : "") + messageId] || messageId;
                },
                getPydioRoleMessage: function getPydioRoleMessage(messageId) {
                    return messages['role_editor.' + messageId] || messageId;
                },
                getRootMessage: function getRootMessage(messageId) {
                    return messages[messageId] || messageId;
                }
            };
        }
    }, {
        key: 'getMessage',
        value: function getMessage(messageId) {
            var namespace = arguments.length <= 1 || arguments[1] === undefined ? 'pydio_role' : arguments[1];

            return this.getChildContext().getMessage(messageId, namespace);
        }
    }, {
        key: 'getPydioRoleMessage',
        value: function getPydioRoleMessage(messageId) {
            return this.getChildContext().getMessage(messageId, 'role_editor');
        }
    }, {
        key: 'getRootMessage',
        value: function getRootMessage(messageId) {
            return this.getChildContext().getMessage(messageId, '');
        }
    }, {
        key: '_loadRoleData',
        value: function _loadRoleData(showLoader) {
            if (showLoader) {
                this.setState({ loadingMessage: this.getMessage('home.6', 'ajxp_admin') });
            }
            PydioApi.getClient().request({
                get_action: "edit",
                sub_action: "edit_role",
                role_id: this.state.roleId,
                format: 'json'
            }, (function (transport) {
                //if(!this.isMounted()) return;
                this._loadPluginsDataToCache((function () {
                    this.setState({ loadingMessage: null });
                    this._parseRoleResponse(transport.responseJSON);
                }).bind(this));
            }).bind(this));
        }
    }, {
        key: '_parsePluginsDataForCache',
        value: function _parsePluginsDataForCache(response) {
            var map = new Map();
            for (var pluginName in response.LIST) {
                if (!response.LIST.hasOwnProperty(pluginName)) continue;
                var pData = response.LIST[pluginName];
                var submap = new Map();
                for (var key in pData) {
                    if (!pData.hasOwnProperty(key)) continue;
                    var entry = pData[key];
                    if (entry['action']) submap.set(entry['action'], { label: entry['label'] });else if (entry['parameter']) submap.set(entry['parameter'], entry['attributes']);
                }
                map.set(pluginName, submap);
            }
            return map;
        }
    }, {
        key: '_loadPluginsDataToCache',
        value: function _loadPluginsDataToCache(callback) {
            var _this = this;

            if (_utilEditorCache2['default'].CACHE) {
                callback();
            } else {
                (function () {
                    var client = PydioApi.getClient();
                    _utilEditorCache2['default'].CACHE = {};
                    _this.setState({ loadingMessage: _this.getMessage('22') });
                    client.request({ get_action: 'list_all_plugins_actions' }, (function (transport1) {
                        _utilEditorCache2['default'].CACHE['ACTIONS'] = this._parsePluginsDataForCache(transport1.responseJSON);
                        this.setState({ loadingMessage: this.getMessage('23') });
                        client.request({ get_action: 'list_all_plugins_parameters' }, (function (transport2) {
                            _utilEditorCache2['default'].CACHE['PARAMETERS'] = this._parsePluginsDataForCache(transport2.responseJSON);
                            callback();
                        }).bind(this));
                    }).bind(_this));
                    global.pydio.observe("admin_clear_plugins_cache", function () {
                        _utilEditorCache2['default'].CACHE = null;
                    });
                })();
            }
        }
    }, {
        key: '_scopeParamsToScope',
        value: function _scopeParamsToScope(roleData, roleRead) {
            var SCOPE = {};
            for (var key in roleData.SCOPE_PARAMS) {
                if (!roleData.SCOPE_PARAMS.hasOwnProperty(key)) continue;
                var param = roleData.SCOPE_PARAMS[key];
                var nameParts = param.name.split('/');
                var repoScope = nameParts[0];
                var pluginName = nameParts[1];
                var paramName = nameParts[2];
                if (!SCOPE[repoScope]) SCOPE[repoScope] = {};
                if (!SCOPE[repoScope][pluginName]) SCOPE[repoScope][pluginName] = {};
                var value;
                if (roleRead['PARAMETERS'][repoScope] && roleRead['PARAMETERS'][repoScope][pluginName] && roleRead['PARAMETERS'][repoScope][pluginName][paramName] !== undefined) {
                    value = roleRead['PARAMETERS'][repoScope][pluginName][paramName];
                } else {
                    value = param['default'] !== undefined ? param['default'] : '';
                    if (param.type == 'boolean') value = value == "true" || value === true;else if (param.type == 'integer') value = parseInt(value);
                }
                SCOPE[repoScope][pluginName][paramName] = value;
            }
            return { ACL: {}, ACTIONS: {}, PARAMETERS: SCOPE };
        }
    }, {
        key: '_parseRoleResponse',
        value: function _parseRoleResponse(roleData) {

            LangUtils.forceJSONArrayToObject(roleData.ROLE, "ACL");
            LangUtils.forceJSONArrayToObject(roleData.ROLE, "ACTIONS");
            LangUtils.forceJSONArrayToObject(roleData.ROLE, "PARAMETERS");

            var roleWrite = LangUtils.deepCopy(roleData.ROLE);
            var roleParent = {};
            if (roleData.PARENT_ROLE) {
                roleParent = roleData.PARENT_ROLE;
                LangUtils.forceJSONArrayToObject(roleParent, "ACL");
                LangUtils.forceJSONArrayToObject(roleParent, "ACTIONS");
                LangUtils.forceJSONArrayToObject(roleParent, "PARAMETERS");
            }
            var roleRead = this._recomputeRoleRead(roleParent, roleWrite);
            roleData.SCOPE = this._scopeParamsToScope(roleData, roleRead);
            this.setState({
                roleData: roleData,
                roleScope: roleData.SCOPE,
                roleParent: roleParent,
                roleWrite: roleWrite,
                roleRead: roleRead,
                dirty: false
            });
        }
    }, {
        key: '_recomputeRoleRead',
        value: function _recomputeRoleRead(roleParent, roleMain) {
            var skipSetState = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

            var roleRead = roleMain;
            if (roleParent) {
                roleRead = LangUtils.mergeObjectsRecursive(roleParent, roleMain);
            }
            if (!skipSetState) {
                this.setState({ roleRead: roleRead });
            }
            return roleRead;
        }
    }, {
        key: '_nodeToState',
        value: function _nodeToState(node) {
            var mime = node.getAjxpMime();
            var scope = mime;
            var roleId = undefined;
            if (mime == "role") {
                roleId = node.getMetadata().get("role_id");
            } else if (mime == "group") {
                roleId = "AJXP_GRP_" + node.getPath().replace("/data/users", "");
            } else if (mime == "user" || mime == "user_editable") {
                roleId = "AJXP_USR_/" + PathUtils.getBasename(node.getPath());
                scope = "user";
            }
            return {
                roleId: roleId,
                roleLabel: PathUtils.getBasename(node.getPath()),
                roleType: scope,
                dirty: false,
                roleData: {},
                roleParent: {},
                roleWrite: {},
                roleRead: {},
                roleScope: {},
                localModalContent: {},
                currentPane: 'info',
                loadingMessage: this.getMessage('home.6', 'ajxp_admin'),
                Controller: this.getController()
            };
        }
    }, {
        key: '_toggleUserLock',
        value: function _toggleUserLock(userId, currentLock, buttonAction) {
            var reqParams = {
                get_action: "edit",
                sub_action: "user_set_lock",
                user_id: userId
            };
            if (buttonAction == "user_set_lock-lock") {
                reqParams["lock"] = currentLock.indexOf("logout") > -1 ? "false" : "true";
                reqParams["lock_type"] = "logout";
            } else {
                reqParams["lock"] = currentLock.indexOf("pass_change") > -1 ? "false" : "true";
                reqParams["lock_type"] = "pass_change";
            }
            PydioApi.getClient().request(reqParams, (function (transport) {
                this._loadRoleData();
            }).bind(this));
        }
    }, {
        key: 'setSelectedPane',
        value: function setSelectedPane(key) {
            this.setState({ currentPane: key });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            var oldN = this.props.node ? this.props.node.getPath() : 'EMPTY';
            var newN = newProps.node ? newProps.node.getPath() : 'EMPTY';
            if (newN != oldN) {
                this.setState(this._nodeToState(newProps.node), (function () {
                    this._loadRoleData(true);
                }).bind(this));
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._loadRoleData(true);
            if (this.props.registerCloseCallback) {
                this.props.registerCloseCallback((function () {
                    if (this.state && this.state.dirty && !global.confirm(this.getPydioRoleMessage('19'))) {
                        return false;
                    }
                }).bind(this));
            }
        }
    }, {
        key: 'showModal',
        value: function showModal(modal) {
            this.setState({ modal: modal });
        }
    }, {
        key: 'hideModal',
        value: function hideModal() {
            this.setState({ modal: null });
        }
    }, {
        key: 'updateRoleWrite',
        value: function updateRoleWrite(roleWrite) {
            var dirty = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

            var roleRead = this._recomputeRoleRead(this.state.roleParent, roleWrite);
            this.setState({
                dirty: dirty,
                roleWrite: roleWrite,
                roleRead: roleRead,
                roleScope: this._scopeParamsToScope(this.state.roleData, roleRead)
            });
        }
    }, {
        key: 'resetRoleChanges',
        value: function resetRoleChanges() {
            this.updateRoleWrite(LangUtils.deepCopy(this.state.roleData.ROLE), false);
        }
    }, {
        key: 'saveRoleChanges',
        value: function saveRoleChanges() {
            var reload = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            var jsonData = {
                ROLE: this.state.roleWrite,
                METADATA: this.state.parametersMetaData || {}
            };
            if (this.state.roleWrite.USER) {
                jsonData["USER"] = this.state.roleWrite.USER;
            } else if (this.state.roleWrite.GROUP && this.state.roleWrite.GROUP.LABEL) {
                jsonData["GROUP_LABEL"] = this.state.roleWrite.GROUP.LABEL;
            }

            PydioApi.getClient().request({
                get_action: 'edit',
                sub_action: 'post_json_role',
                role_id: this.state.roleId,
                json_data: JSON.stringify(jsonData)
            }, (function (transport) {
                this.logAction(this.getPydioRoleMessage('20'));
                if (reload) {
                    this._loadRoleData();
                } else {
                    this.setState({ dirty: false });
                }
                if (this.props.node.getParent()) {
                    this.props.node.getParent().reload();
                }
            }).bind(this));
        }
    }, {
        key: 'logAction',
        value: function logAction(message) {
            this.setState({ snackbar: message }, (function () {
                this.refs.snack.show();
            }).bind(this));
        }
    }, {
        key: 'hideSnackBar',
        value: function hideSnackBar() {
            this.setState({ snackbar: "" }, (function () {
                this.refs.snack.dismiss();
            }).bind(this));
        }
    }, {
        key: 'controllerUpdateParameter',
        value: function controllerUpdateParameter(type, crudAction, scope, pluginName, paramName, paramValue) {
            var additionalFormData = arguments.length <= 6 || arguments[6] === undefined ? null : arguments[6];

            var role = this.state.roleWrite;
            var metaData = this.state.parametersMetaData || { PARAMETERS: {}, ACTIONS: {} };
            var key = type == 'parameter' ? 'PARAMETERS' : 'ACTIONS';
            if (crudAction == 'add' || crudAction == 'update') {
                if (!role[key]) role[key] = {};
                if (!role[key][scope]) role[key][scope] = {};
                if (!role[key][scope][pluginName]) role[key][scope][pluginName] = {};
                role[key][scope][pluginName][paramName] = crudAction == 'add' ? paramValue !== undefined ? paramValue : '' : paramValue;
                if (additionalFormData) {
                    additionalFormData['ajxp_form_element'] = paramName;
                    if (!metaData[key][scope]) metaData[key][scope] = {};
                    if (!metaData[key][scope][pluginName]) metaData[key][scope][pluginName] = {};
                    metaData[key][scope][pluginName][paramName] = additionalFormData;
                    //this.setState({parametersMetaData:metaData});
                }
                this.updateRoleWrite(role);
            } else if (crudAction == 'delete') {
                try {
                    var _parent = role[key][scope][pluginName];
                    if (_parent) {
                        delete _parent[paramName];
                        this.updateRoleWrite(role);
                    }
                } catch (e) {}
            }
            if (additionalFormData && additionalFormData['type']) {
                // Trigger save now for uploaded images
                this.setState({ parametersMetaData: metaData }, (function () {
                    this.saveRoleChanges(true);
                }).bind(this));
            }
        }
    }, {
        key: 'controllerUpdateAcl',
        value: function controllerUpdateAcl(scope, acl) {
            var role = this.state.roleWrite;
            if (role.ACL) {
                role.ACL[scope] = acl;
                this.updateRoleWrite(role);
            }
        }
    }, {
        key: 'controllerUpdateMask',
        value: function controllerUpdateMask(wsId, mask) {
            var role = this.state.roleWrite;
            if (role['MASKS']) {
                role['MASKS'][wsId] = mask;
                this.updateRoleWrite(role);
            }
        }
    }, {
        key: 'controllerUpdateUserProfile',
        value: function controllerUpdateUserProfile(profile) {
            var role = this.state.roleWrite;
            if (!role.USER) role.USER = this.state.roleData.USER;
            role.USER.PROFILE = profile;
            this.updateRoleWrite(role);
        }
    }, {
        key: 'controllerOrderUserRoles',
        value: function controllerOrderUserRoles(roles) {

            var currentUserId = this.state.roleId.replace("AJXP_USR_/", "");
            var stateRoles = [];
            this.state.roleData.USER.ROLES.map(function (r) {
                if (r.startsWith('AJXP_USR_/') || r.startsWith('AJXP_GRP_/')) stateRoles.push(r);
            });
            stateRoles = stateRoles.concat(roles);
            this.state.roleData.USER.ROLES = stateRoles;
            PydioApi.getClient().request({
                get_action: "edit",
                sub_action: "user_reorder_roles",
                user_id: currentUserId,
                roles: JSON.stringify(roles)
            }, (function (transport) {
                this._loadRoleData();
            }).bind(this));
        }
    }, {
        key: 'controllerUpdateUserRoles',
        value: function controllerUpdateUserRoles(roles) {

            var currentUserId = this.state.roleId.replace("AJXP_USR_/", "");
            var previousRoles = this.state.roleData.USER.ROLES || [];
            var remove = previousRoles.slice(0),
                add = roles.slice(0);
            for (var i = 0; i < previousRoles.length; i++) {
                add = LangUtils.arrayWithout(add, add.indexOf(previousRoles[i]));
            }
            for (i = 0; i < roles.length; i++) {
                remove = LangUtils.arrayWithout(remove, remove.indexOf(roles[i]));
            }
            if (!add.length && !remove.length) return;

            var stateRoles = [];
            this.state.roleData.USER.ROLES.map(function (r) {
                if (r.startsWith('AJXP_USR_/') || r.startsWith('AJXP_GRP_/')) stateRoles.push(r);
            });
            stateRoles = stateRoles.concat(roles);
            this.state.roleData.USER.ROLES = stateRoles;

            var jsonData = { users: [currentUserId], roles: { add: add, remove: remove } };
            PydioApi.getClient().request({
                get_action: "edit",
                sub_action: "users_bulk_update_roles",
                json_data: JSON.stringify(jsonData)
            }, (function (transport) {
                this._loadRoleData();
            }).bind(this));
        }
    }, {
        key: 'controllerGetBinaryContext',
        value: function controllerGetBinaryContext() {
            if (this.state.roleType == "user") {
                return "user_id=" + this.state.roleId.replace("AJXP_USR_/", "");
            } else if (this.state.roleType == "group") {
                return "group_id=" + this.state.roleId.replace("AJXP_GRP_/", "");
            } else {
                return "role_id=" + this.state.roleId;
            }
        }
    }, {
        key: 'getController',
        value: function getController() {
            var controller = {};
            controller.updateParameter = this.controllerUpdateParameter.bind(this);
            controller.updateAcl = this.controllerUpdateAcl.bind(this);
            controller.updateMask = this.controllerUpdateMask.bind(this);
            controller.updateUserProfile = this.controllerUpdateUserProfile.bind(this);
            controller.updateUserRoles = this.controllerUpdateUserRoles.bind(this);
            controller.orderUserRoles = this.controllerOrderUserRoles.bind(this);
            controller.getBinaryContext = this.controllerGetBinaryContext.bind(this);
            return controller;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var filterPages = function filterPages(wsId, role) {
                return wsId.startsWith('ajxp_');
            };
            var filterNoPages = function filterNoPages(wsId, role) {
                return !wsId.startsWith('ajxp_');
            };

            var title = PathUtils.getBasename(this.props.node.getPath());
            var infoTitle = "";
            var infoMenuTitle = this.getMessage('24'); // user information
            var testTitle;
            var defs, values, otherForm, changeListener;
            if (this.state.roleType == 'user' && this.state.roleData && this.state.roleData.ALL) {

                try {
                    testTitle = this.state.roleRead['PARAMETERS']['AJXP_REPO_SCOPE_ALL']['core.conf']['USER_DISPLAY_NAME'];
                    if (testTitle) title = testTitle;
                } catch (e) {}
                var userId = PathUtils.getBasename(this.props.node.getPath());

                var locked = this.state.roleData.USER.LOCK || "";
                defs = [{ "name": "password", group: this.getMessage('24'), label: this.getPydioRoleMessage('25'), description: "", "type": "button", choices: "update_user_pwd" }, { "name": "lockout", group: this.getMessage('24'), label: this.getPydioRoleMessage(locked.indexOf('logout') > -1 ? '27' : '26'), description: "", "type": "button", choices: "user_set_lock-lock" }, { "name": "passchange", group: this.getMessage('24'), label: this.getPydioRoleMessage(locked.indexOf('pass_change') > -1 ? '28b' : '28'), description: "", "type": "button", choices: "user_set_lock-pass_change" }];
                values = {};
                var buttonCallback = (function (parameters, cb) {
                    var action = parameters['get_action'];
                    if (action == "update_user_pwd") {
                        this.props.pydio.UI.openComponentInModal('AdminPeople', 'UserPasswordDialog', { userId: userId });
                    } else {
                        this._toggleUserLock(userId, locked, action);
                    }
                }).bind(this);

                otherForm = React.createElement(FormPanel, {
                    key: 'form',
                    parameters: defs,
                    values: values,
                    applyButtonAction: buttonCallback,
                    depth: -2
                });
            } else if (this.state.roleType == 'group') {

                // GROUP MAIN INFO
                infoTitle = this.getMessage('26'); // group information
                infoMenuTitle = this.getMessage('27');
                try {
                    testTitle = this.state.roleWrite.GROUP && this.state.roleWrite.GROUP.LABEL ? this.state.roleWrite.GROUP.LABEL : this.state.roleData.GROUP.LABEL;
                    if (testTitle) title = testTitle;
                } catch (e) {}

                if (this.state.roleData.GROUP) {
                    defs = [{ "name": "groupPath", label: this.getPydioRoleMessage('34'), "type": "string", readonly: true }, { "name": "groupLabel", label: this.getPydioRoleMessage('35'), "type": "string" }];
                    var label = this.state.roleWrite.GROUP && this.state.roleWrite.GROUP.LABEL ? this.state.roleWrite.GROUP.LABEL : this.state.roleData.GROUP.LABEL;
                    values = {
                        groupPath: this.state.roleData.GROUP.PATH || "/",
                        groupLabel: label
                    };
                    changeListener = (function (paramName, newValue, oldValue) {
                        if (!this.state.roleWrite.GROUP) this.state.roleWrite.GROUP = {};
                        this.state.roleWrite.GROUP.LABEL = newValue;
                        this.updateRoleWrite(this.state.roleWrite);
                    }).bind(this);
                    otherForm = React.createElement(FormPanel, {
                        key: 'form',
                        parameters: defs,
                        onParameterChange: changeListener,
                        values: values,
                        depth: -2
                    });
                }
            } else if (this.state.roleType == 'role') {

                // ROLE MAIN INFO
                infoTitle = this.getMessage('28'); // role information
                infoMenuTitle = this.getMessage('29');
                try {
                    testTitle = this.state.roleRead['PARAMETERS']['AJXP_REPO_SCOPE_ALL']['core.conf']['ROLE_DISPLAY_NAME'];
                    if (testTitle) title = testTitle;
                } catch (e) {}

                if (this.state.roleData.ALL) {
                    defs = [{ "name": "roleId", label: this.getPydioRoleMessage('31'), "type": "string", readonly: true }, { "name": "applies", label: this.getPydioRoleMessage('33'), "type": "select", multiple: true, choices: this.state.roleData.ALL.PROFILES.join(",") }];
                    values = {
                        roleId: this.state.roleId,
                        applies: LangUtils.objectValues(this.state.roleRead.APPLIES)
                    };
                    changeListener = (function (paramName, newValue, oldValue) {
                        this.state.roleWrite.APPLIES = newValue.split(',');
                        this.updateRoleWrite(this.state.roleWrite);
                    }).bind(this);
                    otherForm = React.createElement(FormPanel, {
                        key: 'form',
                        parameters: defs,
                        onParameterChange: changeListener,
                        values: values,
                        depth: -2
                    });
                }
            }

            var crtPane = this.state.currentPane;
            var rolesPane, rolesPaneMenu;
            var shares, sharesMenu;
            if (this.state.roleType == 'user') {
                var filterUserId = PathUtils.getBasename(this.props.node.getPath());

                // PROFILES & ROLES PANE - SHARE PANE
                rolesPaneMenu = React.createElement(PydioComponents.PaperEditorNavEntry, { key: 'roles', keyName: 'roles', onClick: this.setSelectedPane.bind(this), label: this.getMessage('30'), selectedKey: this.state.currentPane });
                sharesMenu = React.createElement(PydioComponents.PaperEditorNavEntry, { key: 'shares', keyName: 'shares', onClick: this.setSelectedPane.bind(this), label: this.getMessage('49'), selectedKey: this.state.currentPane });
                if (this.state.roleData && this.state.roleData.ALL) {

                    var profilesChoices = this.state.roleData.ALL.PROFILES.join(",");
                    defs = [{ "name": "login", group: "User Profile", label: this.getPydioRoleMessage('21'), description: this.getMessage('31'), "type": "string", readonly: true }, { "name": "profile", group: "User Profile", label: this.getPydioRoleMessage('22'), description: this.getMessage('32'), "type": "select", choices: profilesChoices }];
                    values = {
                        login: filterUserId,
                        profile: this.state.roleData.USER.PROFILE
                    };
                    changeListener = (function (paramName, newValue, oldValue) {
                        var controller = this.state.Controller;
                        if (paramName == "profile") {
                            controller.updateUserProfile(newValue);
                        }
                    }).bind(this);

                    rolesPane = React.createElement(
                        'div',
                        null,
                        React.createElement(FormPanel, {
                            key: 'form',
                            parameters: defs,
                            onParameterChange: changeListener,
                            values: values,
                            applyButtonAction: buttonCallback,
                            depth: -2
                        }),
                        React.createElement(_userUserRolesPicker2['default'], {
                            availableRoles: this.state.roleData.ALL.ROLES,
                            rolesDetails: this.state.roleData.ALL.ROLES_DETAILS,
                            currentRoles: this.state.roleData.USER.ROLES,
                            controller: this.state.Controller,
                            loadingMessage: this.state.loadingMessage
                        })
                    );

                    if (this.state.currentPane === 'shares') {
                        shares = React.createElement(_panelSharesList2['default'], {
                            userId: filterUserId,
                            sharedWorkspaces: this.state.roleData.ALL.SHARED_REPOSITORIES,
                            workspacesDetails: this.state.roleData.ALL.REPOSITORIES_DETAILS
                        });
                    } else {
                        shares = React.createElement('div', null);
                    }
                }
            }

            var changes = !this.state.dirty;
            var save = (function () {
                this.saveRoleChanges();
            }).bind(this);
            var close = function close() {
                _this2.props.onRequestTabClose();
            };
            var rightButtons = React.createElement(
                'div',
                null,
                React.createElement(FlatButton, { key: 'undo', disabled: changes, secondary: true, label: this.getMessage('plugins.6', 'ajxp_admin'), onTouchTap: this.resetRoleChanges.bind(this) }),
                React.createElement(FlatButton, { key: 'save', disabled: changes, secondary: true, label: this.getRootMessage('53'), onTouchTap: save }),
                React.createElement(RaisedButton, { key: 'close', label: this.getMessage('33'), onTouchTap: close })
            );

            var leftNav = [React.createElement(PaperEditorNavHeader, { key: '1', label: this.getMessage('ws.28', 'ajxp_admin') }), React.createElement(PaperEditorNavEntry, { key: 'info', keyName: 'info', onClick: this.setSelectedPane.bind(this), label: infoMenuTitle, selectedKey: this.state.currentPane }), rolesPaneMenu, React.createElement(PaperEditorNavHeader, { key: '2', label: this.getMessage('34') }), React.createElement(PaperEditorNavEntry, { key: 'workspaces', keyName: 'workspaces', onClick: this.setSelectedPane.bind(this), label: this.getMessage('35'), selectedKey: this.state.currentPane }), React.createElement(PaperEditorNavEntry, { key: 'pages', keyName: 'pages', onClick: this.setSelectedPane.bind(this), label: this.getMessage('36'), selectedKey: this.state.currentPane }), sharesMenu, React.createElement(PaperEditorNavHeader, { key: '3', label: this.getMessage('37') }), React.createElement(PaperEditorNavEntry, { key: 'add-info', keyName: 'add-info', onClick: this.setSelectedPane.bind(this), label: this.getMessage('38'), selectedKey: this.state.currentPane }), React.createElement(PaperEditorNavEntry, { key: 'glob-params', keyName: 'global-params', onClick: this.setSelectedPane.bind(this), label: this.getMessage('39'), selectedKey: this.state.currentPane }), React.createElement(PaperEditorNavEntry, { key: 'ws-params', keyName: 'ws-params', onClick: this.setSelectedPane.bind(this), label: this.getMessage('40'), selectedKey: this.state.currentPane })];

            var panes = [];
            var classFor = function classFor(key) {
                return crtPane == key ? 'layout-fill' : '';
            };
            var styleFor = function styleFor(key) {
                return crtPane == key ? { overflow: 'auto' } : { height: 0, overflow: 'hidden' };
            };
            if (rolesPane) {
                panes.push(React.createElement(
                    'div',
                    { key: 'roles', className: classFor('roles'), style: styleFor('roles') },
                    rolesPane
                ));
            }
            if (shares) {
                panes.push(React.createElement(
                    'div',
                    { key: 'shares', className: classFor('shares'), style: styleFor('shares') },
                    shares
                ));
            }
            panes.push(React.createElement(
                'div',
                { key: 'info', className: 'avatar-provider ' + classFor('info'), style: styleFor('info') },
                infoTitle && !this.state.loadingMessage ? React.createElement(
                    'h3',
                    { className: 'paper-right-title' },
                    infoTitle
                ) : null,
                otherForm,
                React.createElement(_panelWorkspacesList2['default'], {
                    key: 'global-scope',
                    roleRead: this.state.roleScope,
                    roleParent: this.state.roleParent,
                    roleType: this.state.roleType,
                    Controller: this.state.Controller,
                    showModal: this.showModal.bind(this),
                    hideModal: this.hideModal.bind(this),
                    globalData: this.state.roleData.ALL,
                    showGlobalScopes: { AJXP_REPO_SCOPE_ALL: this.getPydioRoleMessage('12d') },
                    globalScopesFilterType: 'global',
                    initialEditCard: 'AJXP_REPO_SCOPE_ALL',
                    noParamsListEdit: true,
                    editOnly: true,
                    displayFormPanel: true
                })
            ));
            panes.push(React.createElement(
                'div',
                { key: 'add-info', className: classFor('add-info'), style: styleFor('add-info') },
                React.createElement(
                    'h3',
                    { className: 'paper-right-title' },
                    this.getMessage('41'),
                    React.createElement(
                        'div',
                        { className: 'section-legend' },
                        this.getMessage('42')
                    )
                ),
                React.createElement(_panelWorkspacesList2['default'], _extends({}, this.state, {
                    key: 'global-all',
                    showModal: this.showModal.bind(this),
                    hideModal: this.hideModal.bind(this),
                    globalData: this.state.roleData.ALL,
                    showGlobalScopes: { AJXP_REPO_SCOPE_ALL: this.getPydioRoleMessage('12d') },
                    globalScopesFilterType: 'global-noscope',
                    initialEditCard: 'AJXP_REPO_SCOPE_ALL',
                    editOnly: true,
                    roleType: this.state.roleType
                }))
            ));
            panes.push(React.createElement(
                'div',
                { key: 'workspaces', className: classFor('workspaces'), style: styleFor('workspaces') },
                React.createElement(
                    'h3',
                    { className: 'paper-right-title' },
                    this.getRootMessage('250'),
                    React.createElement(
                        'div',
                        { className: 'section-legend' },
                        this.getMessage('43')
                    ),
                    React.createElement(
                        'div',
                        { className: 'read-write-header' },
                        React.createElement(
                            'span',
                            null,
                            'read'
                        ),
                        React.createElement(
                            'span',
                            null,
                            'write'
                        ),
                        React.createElement(
                            'span',
                            null,
                            'deny'
                        )
                    ),
                    React.createElement('br', null)
                ),
                React.createElement(_panelWorkspacesList2['default'], _extends({}, this.state, {
                    key: 'workspaces-list',
                    listType: 'acl',
                    roleType: this.state.roleType,
                    showModal: this.showModal.bind(this),
                    hideModal: this.hideModal.bind(this),
                    globalData: this.state.roleData.ALL,
                    filterCards: filterNoPages }))
            ));

            panes.push(React.createElement(
                'div',
                { key: 'pages', className: classFor('pages'), style: styleFor('pages') },
                React.createElement(
                    'h3',
                    { className: 'paper-right-title' },
                    this.getMessage('44'),
                    React.createElement(
                        'div',
                        { className: 'section-legend' },
                        this.getMessage('45')
                    ),
                    React.createElement(
                        'div',
                        { className: 'read-write-header' },
                        React.createElement(
                            'span',
                            null,
                            this.getMessage('react.5a', 'ajxp_admin')
                        ),
                        React.createElement(
                            'span',
                            null,
                            this.getMessage('react.5b', 'ajxp_admin')
                        ),
                        React.createElement(
                            'span',
                            null,
                            this.getMessage('react.5', 'ajxp_admin')
                        )
                    ),
                    React.createElement('br', null)
                ),
                React.createElement(_panelWorkspacesList2['default'], _extends({}, this.state, {
                    key: 'workspaces-pages',
                    listType: 'acl',
                    roleType: this.state.roleType,
                    showModal: this.showModal.bind(this),
                    hideModal: this.hideModal.bind(this),
                    globalData: this.state.roleData.ALL,
                    filterCards: filterPages }))
            ));
            panes.push(React.createElement(
                'div',
                { key: 'global-params', className: classFor('global-params'), style: styleFor('global-params') },
                React.createElement(
                    'h3',
                    { className: 'paper-right-title' },
                    this.getMessage('46'),
                    React.createElement(
                        'div',
                        { className: 'section-legend' },
                        this.getMessage('47')
                    )
                ),
                React.createElement(_panelWorkspacesList2['default'], _extends({}, this.state, {
                    key: 'workspaces-global',
                    roleType: this.state.roleType,
                    showModal: this.showModal.bind(this),
                    hideModal: this.hideModal.bind(this),
                    globalData: this.state.roleData.ALL,
                    showGlobalScopes: this.state.roleData.ALL ? { AJXP_REPO_SCOPE_ALL: this.getPydioRoleMessage('12d'), AJXP_REPO_SCOPE_SHARED: this.getPydioRoleMessage('12e') } : {},
                    globalScopesFilterType: 'workspace'
                }))
            ));
            panes.push(React.createElement(
                'div',
                { key: 'ws-param', className: classFor('ws-param'), style: styleFor('ws-params') },
                React.createElement(
                    'h3',
                    { className: 'paper-right-title' },
                    this.getMessage('40'),
                    React.createElement(
                        'div',
                        { className: 'section-legend' },
                        this.getMessage('48')
                    )
                ),
                React.createElement(_panelWorkspacesList2['default'], _extends({}, this.state, {
                    key: 'workspaces-list',
                    listType: 'parameters',
                    roleType: this.state.roleType,
                    showModal: this.showModal.bind(this),
                    hideModal: this.hideModal.bind(this),
                    globalData: this.state.roleData.ALL,
                    filterCards: filterNoPages }))
            ));

            var modal = this.state.modal || null;
            var loadingMessage = null;
            if (this.state.loadingMessage) {
                loadingMessage = React.createElement(
                    'div',
                    { className: 'loader-container layout-fill vertical-layout' },
                    React.createElement(
                        'div',
                        { className: 'loader-message', style: { margin: 'auto', color: 'rgba(0,0,0,0.33)', fontWeight: '500', fontSize: 16 } },
                        this.state.loadingMessage
                    )
                );
            }
            return React.createElement(
                PaperEditorLayout,
                {
                    title: title,
                    titleActionBar: rightButtons,
                    contentFill: true,
                    leftNav: leftNav,
                    className: "edit-object-" + this.state.roleType
                },
                React.createElement(ReactMUI.Snackbar, {
                    message: this.state.snackbar || "",
                    ref: 'snack',
                    action: 'Dismiss',
                    onActionTouchTap: this.hideSnackBar.bind(this)
                }),
                modal,
                loadingMessage,
                panes
            );
        }
    }]);

    return Editor;
})(React.Component);

Editor.contextTypes = {
    pydio: React.PropTypes.instanceOf(Pydio)
};

Editor.childContextTypes = {
    messages: React.PropTypes.object,
    getMessage: React.PropTypes.func,
    getPydioRoleMessage: React.PropTypes.func,
    getRootMessage: React.PropTypes.func
};

Editor.propTypes = {
    node: React.PropTypes.instanceOf(AjxpNode),
    closeEditor: React.PropTypes.func,
    registerCloseCallback: React.PropTypes.func
};

exports['default'] = Editor;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./panel/SharesList":5,"./panel/WorkspacesList":6,"./user/UserPasswordDialog":14,"./user/UserRolesPicker":15,"./util/EditorCache":16,"material-ui":"material-ui","pydio":"pydio","pydio/util/lang":"pydio/util/lang","pydio/util/path":"pydio/util/path","react":"react"}],3:[function(require,module,exports){
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

var _utilMessagesMixin = require('../util/MessagesMixin');

exports['default'] = React.createClass({
    displayName: 'RightsSelector',

    mixins: [_utilMessagesMixin.RoleMessagesConsumerMixin],

    propTypes: {
        acl: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        hideDeny: React.PropTypes.bool,
        hideLabels: React.PropTypes.bool,
        onChange: React.PropTypes.func
    },

    getInitialState: function getInitialState() {
        return { acl: this.props.acl };
    },

    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        if (this.refs.write) {
            var acl = newProps.acl || "";
            var r = acl != 'AJXP_VALUE_CLEAR' && acl.indexOf('r') != -1;
            var w = acl != 'AJXP_VALUE_CLEAR' && acl.indexOf('w') != -1;
            var cR = this.refs.read.isChecked();
            var cW = this.refs.write.isChecked();
            if (r != cR) this.refs.read.setChecked(r);
            if (w != cW) this.refs.write.setChecked(w);
            if (!newProps.hideDeny) {
                var d = acl == 'AJXP_VALUE_CLEAR';
                var cD = this.refs.deny.isChecked();
                if (d != cD) this.refs.deny.setChecked(d);
            }
        }

        this.setState({ acl: newProps.acl });
    },

    getAcl: function getAcl() {
        return this.state.acl;
    },

    updateAcl: function updateAcl() {

        if (this.props.disabled) return;

        var d = this.refs.deny.isChecked();
        var r = !d && this.refs.read.isChecked();
        var w = !d && this.refs.write.isChecked();
        var acl;
        if (!d) {
            acl = '' + (r ? 'r' : '') + (w ? 'w' : '');
            this.setState({ acl: acl });
        } else {
            this.refs.write.setChecked(false);
            this.refs.read.setChecked(false);
            acl = 'AJXP_VALUE_CLEAR';
            this.setState({ acl: acl });
        }
        if (this.props.onChange) {
            this.props.onChange(acl, this.props.acl);
        } else {
            this.setState({ acl: acl });
        }
    },

    render: function render() {
        var acl = this.state.acl || '';
        var deny, children;
        if (!this.props.hideDeny) {
            deny = React.createElement(
                'div',
                { key: 'd' },
                React.createElement(ReactMUI.Checkbox, { ref: 'deny', label: this.props.hideLabels ? "" : this.context.getMessage('react.5', 'ajxp_admin'), value: '-', disabled: this.props.disabled,
                    onCheck: this.updateAcl, defaultSwitched: acl.indexOf('AJXP_VALUE_CLEAR') != -1 })
            );
        }
        return React.createElement(
            'div',
            { className: 'rights-selector' },
            React.createElement(
                'div',
                { key: 'r' },
                React.createElement(ReactMUI.Checkbox, { ref: 'read', label: this.props.hideLabels ? "" : this.context.getMessage('react.5a', 'ajxp_admin'), value: 'r',
                    onCheck: this.updateAcl, disabled: this.props.disabled || acl == 'AJXP_VALUE_CLEAR',
                    defaultSwitched: acl != 'AJXP_VALUE_CLEAR' && acl.indexOf('r') != -1 })
            ),
            React.createElement(
                'div',
                { key: 'w' },
                React.createElement(ReactMUI.Checkbox, { ref: 'write', label: this.props.hideLabels ? "" : this.context.getMessage('react.5b', 'ajxp_admin'), value: 'w',
                    onCheck: this.updateAcl, disabled: this.props.disabled || acl == 'AJXP_VALUE_CLEAR',
                    defaultSwitched: acl != 'AJXP_VALUE_CLEAR' && acl.indexOf('w') != -1 })
            ),
            deny
        );
    }

});
module.exports = exports['default'];

},{"../util/MessagesMixin":17}],4:[function(require,module,exports){
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

},{"../util/MessagesMixin":17,"./RightsSelector":3}],5:[function(require,module,exports){
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

var _utilMessagesMixin = require('../util/MessagesMixin');

exports['default'] = React.createClass({
    displayName: 'SharesList',

    mixins: [_utilMessagesMixin.RoleMessagesConsumerMixin],

    propTypes: {
        userId: React.PropTypes.string.isRequired,
        sharedWorkspaces: React.PropTypes.object,
        workspacesDetails: React.PropTypes.object
    },

    render: function render() {
        return React.createElement(
            'div',
            { className: 'vertical-layout', style: { padding: 16, height: '100%' } },
            React.createElement(
                'h2',
                null,
                this.context.getMessage('52')
            ),
            React.createElement(
                ReactMUI.Paper,
                { zDepth: 1, className: 'workspace-activity-block layout-fill vertical-layout' },
                React.createElement(PydioComponents.NodeListCustomProvider, {
                    title: this.context.getMessage('ws.25', 'ajxp_admin'),
                    nodeProviderProperties: {
                        get_action: "sharelist-load",
                        user_id: this.props.userId,
                        user_context: "user"
                    },
                    tableKeys: {
                        shared_element_parent_repository_label: { label: this.context.getMessage('ws.39', 'ajxp_admin'), width: '20%' },
                        original_path: { label: this.context.getMessage('ws.41', 'ajxp_admin'), width: '80%' },
                        share_type_readable: { label: this.context.getMessage('ws.40', 'ajxp_admin'), width: '15%' }
                    },
                    actionBarGroups: ['share_list_toolbar-selection', 'share_list_toolbar'],
                    groupByFields: ['share_type_readable', 'shared_element_parent_repository_label'],
                    defaultGroupBy: 'shared_element_parent_repository_label',
                    elementHeight: PydioComponents.SimpleList.HEIGHT_ONE_LINE
                })
            )
        );
    }
});
module.exports = exports['default'];

},{"../util/MessagesMixin":17}],6:[function(require,module,exports){
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

var _parametersWorkspaceCard = require('../parameters/WorkspaceCard');

var _parametersWorkspaceCard2 = _interopRequireDefault(_parametersWorkspaceCard);

var _aclWorkspaceAcl = require('../acl/WorkspaceAcl');

var _aclWorkspaceAcl2 = _interopRequireDefault(_aclWorkspaceAcl);

var _parametersParamsMixins = require('../parameters/ParamsMixins');

var _parametersParamsMixins2 = _interopRequireDefault(_parametersParamsMixins);

exports['default'] = React.createClass({
    displayName: 'WorkspacesList',

    propTypes: {
        listType: React.PropTypes.oneOf(['acl', 'parameters']),
        roleType: React.PropTypes.oneOf(['user', 'group', 'role']),
        roleParent: React.PropTypes.object,
        roleWrite: React.PropTypes.object,
        roleRead: React.PropTypes.object,
        roleScope: React.PropTypes.object,
        globalData: React.PropTypes.object,
        filterCards: React.PropTypes.func,
        titleOnly: React.PropTypes.bool,
        showModal: React.PropTypes.func,
        hideModal: React.PropTypes.func,
        displayFormPanel: React.PropTypes.bool,
        showGlobalScopes: React.PropTypes.object,
        globalScopesFilterType: React.PropTypes.string,
        initialEditCard: React.PropTypes.string,
        Controller: React.PropTypes.object,
        aclShowPermissionsMask: React.PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
        return { listType: 'parameters' };
    },

    getInitialState: function getInitialState() {
        return {
            activeCard: this.props.initialEditCard ? this.props.initialEditCard : null
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        if (newProps.initialEditCard) {
            this.setState({ activeCard: newProps.initialEditCard ? newProps.initialEditCard : null });
        }
    },

    toggleEditMode: function toggleEditMode(wsId) {
        if (this.state.activeCard == wsId) {
            this.setState({ activeCard: null });
        } else {
            this.setState({ activeCard: wsId });
        }
    },

    render: function render() {
        var filterFunc = this.props.filterCards;
        var filter = function filter(wsId, role) {
            if (!filterFunc) return true;else return filterFunc(wsId, role);
        };
        var globalData = this.props.globalData || {};
        var pluginsFilter;

        var globalPluginsFilter = function globalPluginsFilter(pluginName) {
            if (!globalData.PLUGINS_SCOPES) {
                return true;
            }
            var isGlobal = false;
            if (globalData.PLUGINS_SCOPES.GLOBAL_TYPES) {
                globalData.PLUGINS_SCOPES.GLOBAL_TYPES.map(function (value) {
                    if (pluginName.indexOf(value + '.') === 0 || pluginName == 'core.' + value) {
                        isGlobal = true;
                    }
                });
                if (isGlobal) return false;
            }
            if (globalData.PLUGINS_SCOPES.GLOBAL_PLUGINS) {
                globalData.PLUGINS_SCOPES.GLOBAL_PLUGINS.map(function (p) {
                    if (pluginName == p) isGlobal = true;
                });
                if (isGlobal) return false;
            }
            return true;
        };

        if (!this.props.showGlobalScopes) {
            // FILTER OUT GLOBAL PLUGINS & CHECK ACTIVE ACCESS & META PLUGINS
            pluginsFilter = function (scopeId, pluginName, paramName) {
                if (!globalPluginsFilter(pluginName)) {
                    return false;
                }
                var parts = pluginName.split('.');
                var pType = parts[0];
                var pName = parts[1];
                if (globalData.REPOSITORIES_DETAILS && globalData.REPOSITORIES_DETAILS[scopeId]) {
                    var driver = globalData.REPOSITORIES_DETAILS[scopeId]['driver'];
                    if (pType == 'access' && pName != driver) {
                        // Not the correct access driver
                        return false;
                    }
                    var metas = globalData.REPOSITORIES_DETAILS[scopeId]['meta'];
                    if (['metastore', 'meta', 'index'].indexOf(pType) !== -1 && metas.indexOf(pluginName) === -1) {
                        // Meta not active on this workspace, ignore.
                        return false;
                    }
                }
                // Last step could check dependencies on all other plugins....
                return true;
            };
        } else {
            if (this.props.globalScopesFilterType == 'workspace') {
                // FILTER OUT JUST GLOBAL PLUGINS
                pluginsFilter = function (scopeId, pluginName, paramName) {
                    return globalPluginsFilter(pluginName);
                };
            } else if (this.props.globalScopesFilterType == 'global') {
                pluginsFilter = function (scopeId, pluginName, paramName) {
                    return !globalPluginsFilter(pluginName);
                };
            } else if (this.props.globalScopesFilterType == 'global-noscope') {
                var scopeParams = this.props.roleData.SCOPE_PARAMS;
                pluginsFilter = function (scopeId, pluginName, paramName) {
                    if (globalPluginsFilter(pluginName)) return false;
                    if (paramName) {
                        for (var key in scopeParams) {
                            if (!scopeParams.hasOwnProperty(key)) continue;
                            var parts = scopeParams[key].name.split('/');
                            if (pluginName == parts[1] && paramName == parts[2]) return false;
                        }
                    }
                    return true;
                };
            }
        }

        var workspaces = [],
            wsLabels,
            uniqueScope = false;
        if (this.props.showGlobalScopes) {
            wsLabels = this.props.showGlobalScopes;
            if (Object.keys(this.props.showGlobalScopes).length == 1) {
                uniqueScope = true;
            }
        } else {
            wsLabels = this.props.globalData ? this.props.globalData.REPOSITORIES : {};
        }
        for (var wsId in wsLabels) {
            if (!wsLabels.hasOwnProperty(wsId)) continue;
            if (!filter(wsId, this.props.roleRead)) continue;
            if (this.props.displayFormPanel) {

                // get parameters
                var params = [];
                var values = {};
                var nameToPlugin = {};
                _parametersParamsMixins2['default'].browseParams(this.props.roleRead ? this.props.roleRead.PARAMETERS : {}, this.props.roleParent ? this.props.roleParent.PARAMETERS : {}, wsId, (function (pluginName, paramName, paramValue, paramAttributes, inherited, type) {
                    this.push(paramAttributes);
                    values[paramName] = paramValue;
                    nameToPlugin[paramName] = pluginName;
                }).bind(params), pluginsFilter, 'parameter', true, true);

                var changeParameter = (function (paramName, newValue, oldValue) {
                    var additionalFormData = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

                    if (newValue == oldValue) return;
                    this.props.Controller.updateParameter('parameter', 'update', wsId, nameToPlugin[paramName], paramName, newValue, additionalFormData);
                }).bind(this);

                var fp = React.createElement(PydioForm.FormPanel, {
                    key: 'form',
                    parameters: params,
                    onParameterChange: changeParameter,
                    values: values,
                    binary_context: this.props.Controller.getBinaryContext(),
                    depth: -2
                });
                workspaces.push(fp);
            } else {
                if (this.props.listType == 'parameters') {
                    workspaces.push(React.createElement(_parametersWorkspaceCard2['default'], {
                        key: wsId,
                        id: wsId,
                        label: wsLabels[wsId],
                        titleOnly: this.props.titleOnly,
                        role: this.props.roleRead,
                        roleParent: this.props.roleParent,
                        roleType: this.props.roleType,
                        toggleEdit: this.toggleEditMode,
                        editMode: this.state.activeCard == wsId,
                        editOnly: this.props.editOnly,
                        pluginsFilter: pluginsFilter,
                        showModal: this.props.showModal,
                        hideModal: this.props.hideModal,
                        noParamsListEdit: this.props.noParamsListEdit,
                        uniqueScope: uniqueScope,
                        Controller: this.props.Controller
                    }));
                } else {
                    workspaces.push(React.createElement(_aclWorkspaceAcl2['default'], {
                        key: wsId,
                        id: wsId,
                        label: wsLabels[wsId],
                        titleOnly: this.props.titleOnly,
                        role: this.props.roleWrite,
                        roleParent: this.props.roleParent,
                        showPermissionMask: this.props.aclShowPermissionsMask,
                        supportsFolderBrowsing: !globalData.REPOSITORIES_DETAILS[wsId].scope,
                        pluginsFilter: pluginsFilter,
                        showModal: this.props.showModal,
                        hideModal: this.props.hideModal,
                        uniqueScope: uniqueScope,
                        Controller: this.props.Controller
                    }));
                }
            }
        }
        return React.createElement(
            'div',
            { className: this.props.displayFormPanel ? "" : "material-list" },
            workspaces
        );
    }

});
module.exports = exports['default'];

},{"../acl/WorkspaceAcl":4,"../parameters/ParamsMixins":12,"../parameters/WorkspaceCard":13}],7:[function(require,module,exports){
(function (global){
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

var _utilEditorCache = require('../util/EditorCache');

var _utilEditorCache2 = _interopRequireDefault(_utilEditorCache);

var _ParametersPicker = require('./ParametersPicker');

var _ParametersPicker2 = _interopRequireDefault(_ParametersPicker);

var React = require('react');

var _require = require('material-ui');

var TextField = _require.TextField;
var FlatButton = _require.FlatButton;

var Pydio = require('pydio');

var _Pydio$requireLib = Pydio.requireLib('boot');

var ActionDialogMixin = _Pydio$requireLib.ActionDialogMixin;
var CancelButtonProviderMixin = _Pydio$requireLib.CancelButtonProviderMixin;
exports['default'] = React.createClass({
    displayName: 'ParameterCreate',

    mixins: [ActionDialogMixin, CancelButtonProviderMixin],

    propTypes: {
        workspaceScope: React.PropTypes.string,
        showModal: React.PropTypes.func,
        hideModal: React.PropTypes.func,
        pluginsFilter: React.PropTypes.func,
        roleType: React.PropTypes.oneOf(['user', 'group', 'role']),
        createParameter: React.PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
        return {
            dialogPadding: 0,
            dialogTitle: '',
            dialogSize: 'md'
        };
    },

    getInitialState: function getInitialState() {
        return {
            step: 1,
            workspaceScope: this.props.workspaceScope,
            pluginName: null,
            paramName: null
        };
    },

    setSelection: function setSelection(plugin, type, param, attributes) {
        this.setState({ pluginName: plugin, type: type, paramName: param, attributes: attributes }, this.createParameter);
    },

    createParameter: function createParameter() {
        this.props.createParameter(this.state.type, this.state.pluginName, this.state.paramName, this.state.attributes);
        this.props.onDismiss();
    },

    render: function render() {

        // This is passed via state, context is not working,
        // so we have to get the messages from the global.
        var getMessage = function getMessage(id) {
            var namespace = arguments.length <= 1 || arguments[1] === undefined ? 'pydio_role' : arguments[1];

            return global.pydio.MessageHash[namespace + (namespace ? '.' : '') + id] || id;
        };

        var title, content, actions;
        var params = _utilEditorCache2['default'].CACHE['PARAMETERS'];
        if (!params) {
            return React.createElement(
                'div',
                null,
                'Oops: parameters cache is not loaded!'
            );
        }
        var scopeId = this.props.workspaceScope;
        var pluginsFilter = this.props.pluginsFilter || function () {
            return true;
        };

        var allParams = {};
        var currentRoleType = this.props.roleType;
        params.forEach(function (data, pluginName) {
            if (data.size && pluginsFilter(scopeId, pluginName)) {
                var pluginParams = [];
                data.forEach(function (aParam) {
                    aParam._type = 'parameter';
                    if (aParam.scope && aParam.scope.indexOf(currentRoleType) !== -1) {
                        //console.log('ignoring ' + aParam.label + '? Scope is ' + aParam.scope);
                        return;
                    }
                    pluginParams.push(aParam);
                });
                if (pluginParams.length) {
                    allParams[pluginName] = { name: pluginName, params: pluginParams };
                }
            }
        });

        var theActions = _utilEditorCache2['default'].CACHE['ACTIONS'];
        var allActions = {};
        theActions.forEach(function (value, pluginName) {
            if (value.size && pluginsFilter(scopeId, pluginName)) {
                var pluginActions = [];
                value.forEach(function (actionObject, actionName) {
                    pluginActions.push({ _type: 'action', name: actionName, label: actionObject.label ? actionObject.label : actionName });
                });
                allActions[pluginName] = { name: pluginName, actions: pluginActions };
            }
        });

        return React.createElement(
            'div',
            { className: 'picker-list' },
            React.createElement(
                'div',
                { className: 'color-dialog-title' },
                React.createElement(
                    'h3',
                    null,
                    getMessage('14')
                ),
                React.createElement(
                    'div',
                    { className: 'legend' },
                    getMessage('15')
                )
            ),
            React.createElement(_ParametersPicker2['default'], {
                allActions: allActions,
                allParameters: allParams,
                onSelection: this.setSelection,
                getMessage: getMessage
            })
        );
    }

});
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../util/EditorCache":16,"./ParametersPicker":10,"material-ui":"material-ui","pydio":"pydio","react":"react"}],8:[function(require,module,exports){
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

var _utilMessagesMixin = require('../util/MessagesMixin');

exports['default'] = React.createClass({
    displayName: 'ParameterEntry',

    mixins: [_utilMessagesMixin.RoleMessagesConsumerMixin],

    propTypes: {
        type: React.PropTypes.string,
        id: React.PropTypes.string,
        name: React.PropTypes.string,
        value: React.PropTypes.any,
        label: React.PropTypes.string,
        attributes: React.PropTypes.object,
        pluginName: React.PropTypes.string,
        inherited: React.PropTypes.bool,
        Controller: React.PropTypes.object
    },

    getInitialState: function getInitialState() {
        return { editMode: false };
    },

    onChangeParameter: function onChangeParameter(newValue, oldValue) {
        var additionalFormData = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

        if (newValue == oldValue) return;
        this.props.Controller.updateParameter(this.props.type, 'update', this.props.id, this.props.pluginName, this.props.name, newValue, additionalFormData);
    },

    deleteParameter: function deleteParameter() {
        this.props.Controller.updateParameter(this.props.type, 'delete', this.props.id, this.props.pluginName, this.props.name);
    },

    overrideParameter: function overrideParameter() {
        this.props.Controller.updateParameter(this.props.type, 'add', this.props.id, this.props.pluginName, this.props.name);
    },

    onInputEditMode: function onInputEditMode(editMode) {
        this.setState({ editMode: editMode });
    },

    toggleEditMode: function toggleEditMode() {
        if (this.refs.formElement) this.refs.formElement.toggleEditMode();
    },

    toggleActionStatus: function toggleActionStatus(event, status) {
        //if(status){
        this.props.Controller.updateParameter(this.props.type, 'add', this.props.id, this.props.pluginName, this.props.name, status);
        //}else{
        //    this.props.Controller.updateParameter(this.props.type, 'delete', this.props.id, this.props.pluginName, this.props.name);
        //}
    },

    render: function render() {
        var props = {
            ref: "formElement",
            attributes: this.props.attributes,
            name: this.props.name,
            value: this.props.value,
            onChange: this.onChangeParameter,
            disabled: this.props.inherited,
            binary_context: this.props.Controller.getBinaryContext(),
            onChangeEditMode: this.onInputEditMode,
            displayContext: 'grid'
        };
        var value;
        var type = this.props.type;
        if (type == 'parameter') {
            value = PydioForm.createFormElement(props);
        } else {
            value = React.createElement(
                'div',
                { className: 'role-action-toggle' },
                React.createElement(ReactMUI.Toggle, {
                    name: this.props.name,
                    onToggle: this.toggleActionStatus,
                    defaultToggled: !!this.props.value
                }),
                React.createElement(
                    'span',
                    { className: 'role-action-toggle-label' },
                    ' ',
                    this.context.getMessage(this.props.value ? '2' : '3')
                )
            );
        }

        var actions;
        if (type == 'parameter') {
            if (!this.state.editMode) {
                actions = React.createElement(ReactMUI.IconButton, { iconClassName: 'icon-remove', tooltip: this.context.getMessage('4'), onClick: this.deleteParameter });
                if (this.props.inherited) {
                    actions = React.createElement(ReactMUI.IconButton, { iconClassName: 'icon-copy', tooltip: this.context.getMessage('5'), onClick: this.overrideParameter });
                }
            } else {
                actions = React.createElement(ReactMUI.IconButton, { iconClassName: 'icon-save', tooltip: this.context.getMessage('6'), onClick: this.toggleEditMode });
            }
        } else if (!this.props.inherited) {
            actions = React.createElement(ReactMUI.IconButton, { iconClassName: 'icon-remove', tooltip: this.context.getMessage('4'), onClick: this.deleteParameter });
        }
        return React.createElement(
            'tr',
            { className: (this.props.inherited ? 'inherited' : '') + (this.state.editMode ? ' edit-mode' : '') },
            React.createElement(
                'td',
                { className: 'paramName' },
                React.createElement(
                    'span',
                    { className: 'label' },
                    this.props.inherited ? '[' + this.context.getPydioRoleMessage('38') + ']' : '',
                    ' ',
                    this.props.label
                )
            ),
            React.createElement(
                'td',
                { className: 'paramValue' },
                value
            ),
            React.createElement(
                'td',
                { className: 'paramActions' },
                actions
            )
        );
    }
});
module.exports = exports['default'];

},{"../util/MessagesMixin":17}],9:[function(require,module,exports){
(function (global){
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

var _ParamsMixins = require('./ParamsMixins');

var _ParamsMixins2 = _interopRequireDefault(_ParamsMixins);

var _utilMessagesMixin = require('../util/MessagesMixin');

var _ParameterEntry = require('./ParameterEntry');

var _ParameterEntry2 = _interopRequireDefault(_ParameterEntry);

exports['default'] = React.createClass({
    displayName: 'ParametersList',

    mixins: [_ParamsMixins2['default'], _utilMessagesMixin.RoleMessagesConsumerMixin],

    propTypes: {
        id: React.PropTypes.string,
        role: React.PropTypes.object,
        roleParent: React.PropTypes.object,
        pluginsFilter: React.PropTypes.func,
        paramsFilter: React.PropTypes.func,
        showInherited: React.PropTypes.bool,
        Controller: React.PropTypes.object
    },

    getInitialState: function getInitialState() {
        return { showInherited: this.props.showInherited !== undefined ? this.props.showInherited : true };
    },

    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        if (newProps.showInherited !== undefined) {
            this.setState({ showInherited: newProps.showInherited });
        }
    },

    toggleInherited: function toggleInherited() {
        this.setState({ showInherited: !this.state.showInherited });
    },

    render: function render() {

        var roleParent = this.props.roleParent;
        var showInherited = this.state.showInherited;
        var controller = this.props.Controller;
        var wsId = this.props.id;
        var oThis = this;
        var render = function render(pluginName, paramName, paramValue, paramAttributes, inherited, type) {
            if (inherited && !showInherited) {
                return null;
            }
            var label = paramAttributes['label'] || paramName;
            if (global.pydio && global.pydio.MessageHash && global.pydio.MessageHash[label]) {
                label = global.pydio.MessageHash[label];
            }
            if (type == 'action') {
                paramAttributes['type'] = 'boolean';
                label = oThis.context.getMessage('7').replace('%s', label);
            }
            return React.createElement(_ParameterEntry2['default'], {
                id: wsId,
                type: type,
                key: pluginName + "-" + paramName,
                name: paramName,
                label: label,
                value: paramValue,
                attributes: paramAttributes,
                inherited: inherited,
                pluginName: pluginName,
                Controller: controller
            });
        };

        var parameters = this.browseParams(this.props.role.PARAMETERS, this.props.roleParent.PARAMETERS, this.props.id, render, this.props.pluginsFilter, 'parameter', true, true);

        var actions = this.browseParams(this.props.role.ACTIONS, this.props.roleParent.ACTIONS, this.props.id, render, this.props.pluginsFilter, 'action', true, true);

        if (!parameters[0].length && !actions[0].length && !this.state.showInherited) {
            return React.createElement(
                'table',
                { className: 'parameters-list', style: { width: '100%' } },
                React.createElement(
                    'tbody',
                    null,
                    React.createElement(
                        'tr',
                        { colSpan: 3 },
                        React.createElement(
                            'td',
                            { className: 'empty-entry' },
                            this.context.getMessage('1')
                        )
                    )
                )
            );
        }

        return React.createElement(
            'table',
            { className: 'parameters-list', style: { width: '100%' } },
            React.createElement(
                'tbody',
                null,
                parameters[0],
                actions[0],
                parameters[1],
                actions[1]
            )
        );
    }

});
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../util/MessagesMixin":17,"./ParameterEntry":8,"./ParamsMixins":12}],10:[function(require,module,exports){
(function (global){
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
var React = require('react');
var LangUtils = require('pydio/util/lang');

var ParametersPicker = React.createClass({
    displayName: 'ParametersPicker',

    propTypes: {
        allParameters: React.PropTypes.object.isRequired,
        allActions: React.PropTypes.object.isRequired,
        onSelection: React.PropTypes.func.isRequired,
        getMessage: React.PropTypes.func,
        actionsPrefix: React.PropTypes.string,
        parametersPrefix: React.PropTypes.string,
        initialSelection: React.PropTypes.object
    },

    getDefaultProps: function getDefaultProps() {
        return { actionsPrefix: '[a] ', parametersPrefix: '' };
    },

    getInitialState: function getInitialState() {
        var s = { filter: null };
        if (this.props.initialSelection) {
            s = LangUtils.mergeObjectsRecursive({ filter: this.props.initialSelection.paramName }, this.props.initialSelection);
        }
        return s;
    },

    filter: function filter(event) {
        this.setState({ filter: event.target.value.toLowerCase() });
    },

    select: function select(plugin, type, param, attributes) {
        this.props.onSelection(plugin, type, param, attributes);
        this.setState({ pluginName: plugin, type: type, paramName: param });
    },

    render: function render() {

        var term = this.state.filter;

        var selection = this.state.paramName;
        var selectedPlugin = this.state.pluginName;
        var selectionType = this.state.type;

        var filter = function filter(name) {
            if (!term) return true;
            return name.toLowerCase().indexOf(term) !== -1;
        };

        var highlight = function highlight(name) {
            if (!term) return name;
            var pos = name.toLowerCase().indexOf(term);
            var start = name.substr(0, pos);
            var middle = name.substr(pos, term.length);
            var end = name.substr(pos + term.length);
            return React.createElement(
                'span',
                null,
                start,
                React.createElement(
                    'span',
                    { className: 'highlight' },
                    middle
                ),
                end
            );
        };

        var entries = [];
        var allData = LangUtils.objectValues(LangUtils.mergeObjectsRecursive(this.props.allParameters, this.props.allActions));
        allData.map((function (plugin) {
            var params = [];
            var pluginMatch = false;
            var pluginLabel = plugin.label || plugin.name;
            if (filter(pluginLabel) || filter(plugin.name)) {
                pluginMatch = true;
                if (filter(pluginLabel)) {
                    pluginLabel = highlight(pluginLabel);
                } else if (filter(plugin.name)) {
                    pluginLabel = React.createElement(
                        'span',
                        null,
                        pluginLabel,
                        ' (',
                        highlight(plugin.name),
                        ')'
                    );
                }
            }

            LangUtils.objectValues(plugin.params).concat(LangUtils.objectValues(plugin.actions)).map((function (param) {
                var label = param.label || param.name;
                var prefix = '';
                if (param._type == 'action') {
                    if (global.pydio.MessageHash[label]) label = global.pydio.MessageHash[label];
                    prefix = this.props.actionsPrefix;
                } else if (this.props.parametersPrefix) {
                    prefix = this.props.parametersPrefix;
                }
                var filterLabel = filter(label);
                var filterName = filter(param.name);
                if (filterLabel || filterName || pluginMatch) {
                    var click = (function () {
                        this.select(plugin.name, param._type, param.name, param);
                    }).bind(this);
                    var selected = (selectedPlugin === '*' || selectedPlugin === plugin.name) && param._type == selectionType && selection == param.name;
                    var highlighted = label;
                    if (filterLabel) {
                        highlighted = highlight(label);
                    } else if (filterName) {
                        highlighted = React.createElement(
                            'span',
                            null,
                            label,
                            ' (',
                            highlight(param.name),
                            ') '
                        );
                    }
                    params.push(React.createElement(
                        'li',
                        {
                            onClick: click,
                            className: (selected ? "selected " : "") + "parameters-param",
                            key: plugin.name + '-' + param._type + '-' + param.name },
                        prefix,
                        ' ',
                        highlighted
                    ));
                }
            }).bind(this));

            if (params.length) {
                entries.push(React.createElement(
                    'li',
                    { className: 'parameters-plugin', key: plugin.name },
                    pluginLabel,
                    React.createElement(
                        'ul',
                        null,
                        params
                    )
                ));
            }
        }).bind(this));

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'picker-search-container' },
                React.createElement(ReactMUI.TextField, { floatingLabelText: this.props.getMessage('13'), onChange: this.filter })
            ),
            React.createElement(
                'div',
                { className: 'parameters-tree-scroller' },
                React.createElement(
                    'ul',
                    { className: 'parameters-tree' },
                    entries
                )
            )
        );
    }

});

exports['default'] = ParametersPicker;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"pydio/util/lang":"pydio/util/lang","react":"react"}],11:[function(require,module,exports){
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

var _ParamsMixins = require('./ParamsMixins');

var _ParamsMixins2 = _interopRequireDefault(_ParamsMixins);

var _utilMessagesMixin = require('../util/MessagesMixin');

exports['default'] = React.createClass({
    displayName: 'ParametersSummary',

    mixins: [_ParamsMixins2['default'], _utilMessagesMixin.RoleMessagesConsumerMixin],

    render: function render() {
        var render = function render(pluginName, paramName, paramValue, paramAttributes, inherited, type) {
            if (type == 'action') {
                if (paramAttributes['label'] && pydio.MessageHash[paramAttributes['label']]) {
                    return pydio.MessageHash[paramAttributes['label']];
                } else {
                    return paramName;
                }
            } else {
                var displayValue = paramValue === '__AJXP_VALUE_SET__' ? '***********' : paramValue;
                return paramAttributes['label'] + ' ' + displayValue;
            }
        };
        var parameters = this.browseParams(this.props.role.PARAMETERS, this.props.roleParent.PARAMETERS, this.props.id, render, this.props.pluginsFilter, 'parameter', false, true);
        var actions = this.browseParams(this.props.role.ACTIONS, this.props.roleParent.ACTIONS, this.props.id, render, this.props.pluginsFilter, 'action', false, true);
        var strings = [];
        parameters = parameters[0].concat(parameters[1]);
        actions = actions[0].concat(actions[1]);
        if (parameters.length) {
            strings.push(this.context.getPydioRoleMessage('6') + ': ' + parameters.join(','));
        }
        if (actions.length) {
            strings.push(this.context.getPydioRoleMessage('46') + ': ' + actions.join(','));
        }
        return React.createElement(
            'span',
            { className: 'summary-parameters summary' + (strings.length ? '' : '-empty') },
            strings.length ? strings.join(' - ') : this.context.getMessage('1')
        );
    }
});
module.exports = exports['default'];

},{"../util/MessagesMixin":17,"./ParamsMixins":12}],12:[function(require,module,exports){
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

var _utilEditorCache = require('../util/EditorCache');

var _utilEditorCache2 = _interopRequireDefault(_utilEditorCache);

exports['default'] = {

    browseParams: function browseParams(roleData, parentData, wsId, render, filter) {
        var type = arguments.length <= 5 || arguments[5] === undefined ? 'parameter' : arguments[5];
        var includeGlobal = arguments.length <= 6 || arguments[6] === undefined ? false : arguments[6];
        var splitInherited = arguments.length <= 7 || arguments[7] === undefined ? false : arguments[7];

        var parameters = [];
        var inheritedParams = [];
        if (!roleData) {
            if (splitInherited) return [parameters, []];else return parameters;
        }
        var params = roleData[wsId] || {};
        var child = roleData[wsId] || {};
        if (includeGlobal && wsId.indexOf('AJXP_REPO_SCOPE_') == -1) {
            var global = roleData["AJXP_REPO_SCOPE_ALL"] || {};
            params = LangUtils.mergeObjectsRecursive(global, params);
        }
        for (var pluginName in params) {
            if (!params.hasOwnProperty(pluginName)) continue;
            if (filter && filter(wsId, pluginName, null) === false) continue;
            for (var paramName in params[pluginName]) {
                if (!params[pluginName].hasOwnProperty(paramName)) continue;
                if (filter && filter(wsId, pluginName, paramName) === false) continue;
                var paramAttributes = { label: paramName };
                var paramValue = params[pluginName][paramName];
                var inherited = true;
                try {
                    var attributes = _utilEditorCache2['default'].CACHE[type == 'parameter' ? 'PARAMETERS' : 'ACTIONS'].get(pluginName).get(paramName);
                    if (attributes) paramAttributes = attributes;
                } catch (e) {}
                try {
                    var inChild = child[pluginName][paramName] !== undefined;
                    if (inChild) {
                        inherited = false;
                    }
                } catch (e) {}
                if (!inherited) {
                    // Check in parentData
                    var inParent = inChild = false;
                    try {
                        inParent = parentData[wsId][pluginName][paramName] !== undefined;
                        if (inParent) {
                            var inParentValue = parentData[wsId][pluginName][paramName];
                            var inChildValue = roleData[wsId][pluginName][paramName];
                            if (inChildValue == inParentValue) {
                                inherited = true;
                            }
                        }
                    } catch (e) {}
                }
                if (inherited) {
                    // Ignore specific unique scopes
                    if (paramAttributes.scope && (paramAttributes.scope == "role" || paramAttributes.scope == "group")) continue;
                    inheritedParams.push(render(pluginName, paramName, params[pluginName][paramName], paramAttributes, inherited, type));
                } else {
                    parameters.push(render(pluginName, paramName, params[pluginName][paramName], paramAttributes, inherited, type));
                }
            }
        }
        if (splitInherited) return [parameters, inheritedParams];else return parameters.concat(inheritedParams);
    }

};
module.exports = exports['default'];

},{"../util/EditorCache":16}],13:[function(require,module,exports){
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

var _ParameterCreate = require('./ParameterCreate');

var _ParameterCreate2 = _interopRequireDefault(_ParameterCreate);

var _ParametersList = require('./ParametersList');

var _ParametersList2 = _interopRequireDefault(_ParametersList);

var _ParametersSummary = require('./ParametersSummary');

var _ParametersSummary2 = _interopRequireDefault(_ParametersSummary);

var _materialUi = require('material-ui');

var React = require('react');

var _require$requireLib = require('pydio').requireLib('boot');

var PydioContextConsumer = _require$requireLib.PydioContextConsumer;

var WorkspaceCard = React.createClass({
    displayName: 'WorkspaceCard',

    mixins: [_utilMessagesMixin.RoleMessagesConsumerMixin],

    propTypes: {
        id: React.PropTypes.string,
        label: React.PropTypes.string,
        role: React.PropTypes.object,
        roleParent: React.PropTypes.object,
        roleType: React.PropTypes.oneOf(['user', 'group', 'role']),
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
        Controller: React.PropTypes.object
    },

    toggleEdit: function toggleEdit() {
        this.props.toggleEdit(this.props.id);
    },

    toggleInherited: function toggleInherited() {
        if (this.refs.parameters_list) {
            this.refs.parameters_list.toggleInherited();
        }
    },

    onCreateParameter: function onCreateParameter(type, pluginName, paramName, attributes) {
        var controller = this.props.Controller;
        var value;
        if (type == 'parameter') {
            if (attributes['default']) value = attributes['default'];else if (attributes['type'] == 'boolean') value = false;
        } else if (type == 'action') {
            value = false;
        }
        controller.updateParameter(type, 'add', this.props.id, pluginName, paramName, value);
    },

    addParameter: function addParameter() {
        this.props.pydio.UI.openComponentInModal('AdminPeople', 'ParameterCreate', {
            pluginsFilter: this.props.pluginsFilter,
            workspaceScope: this.props.id,
            createParameter: this.onCreateParameter,
            roleType: this.props.roleType
        });
    },

    render: function render() {
        var wsId = this.props.id;
        if (this.props.editMode) {

            var rights, editButtons, scopeTitle, closeButton;
            if (!this.props.noParamsListEdit) {
                editButtons = React.createElement(
                    'div',
                    { style: { float: 'right' } },
                    React.createElement(ReactMUI.IconButton, { tooltip: this.context.getMessage('16'), iconClassName: 'icon-filter', onClick: this.toggleInherited }),
                    React.createElement(ReactMUI.IconButton, { tooltip: this.context.getMessage('17'), primary: true, iconClassName: 'icon-plus', onClick: this.addParameter })
                );
            }
            if (!this.props.uniqueScope) {
                scopeTitle = React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h4',
                        null,
                        this.props.label
                    ),
                    React.createElement('hr', null)
                );
            }
            if (!this.props.editOnly) {
                closeButton = React.createElement(
                    'div',
                    null,
                    React.createElement('hr', null),
                    React.createElement(
                        'div',
                        { style: { textAlign: 'right', padding: '10px 16px' } },
                        React.createElement(_materialUi.FlatButton, { onTouchTap: this.toggleEdit, primary: true, label: this.context.getRootMessage('86') })
                    )
                );
            }
            var content = React.createElement(
                ReactMUI.Paper,
                { zDepth: this.props.uniqueScope ? 0 : 1, className: '' },
                scopeTitle,
                React.createElement(
                    'div',
                    { className: 'card-content' },
                    rights,
                    React.createElement(
                        'div',
                        null,
                        editButtons,
                        React.createElement(
                            'h5',
                            { style: { float: 'left' } },
                            this.context.getMessage('18')
                        )
                    ),
                    React.createElement(
                        'div',
                        { style: { clear: 'both' } },
                        React.createElement(_ParametersList2['default'], {
                            Controller: this.props.Controller,
                            ref: 'parameters_list',
                            id: wsId,
                            role: this.props.role,
                            roleParent: this.props.roleParent,
                            pluginsFilter: this.props.pluginsFilter,
                            paramsFilter: this.props.paramsFilter
                        })
                    )
                ),
                closeButton,
                React.createElement('hr', null)
            );
            return React.createElement(PydioComponents.ListEntry, {
                className: "workspace-card-edit" + (this.props.uniqueScope ? ' unique-scope' : '') + (this.props.editOnly ? ' edit-only' : ''),
                firstLine: content,
                onClick: function () {}
            });
        } else {

            var secondLine, action;
            if (!this.props.titleOnly) {
                secondLine = React.createElement(_ParametersSummary2['default'], { id: wsId, role: this.props.role, roleParent: this.props.roleParent, pluginsFilter: this.props.pluginsFilter });
            }
            return React.createElement(PydioComponents.ListEntry, {
                className: 'ws-card',
                firstLine: this.props.label,
                secondLine: secondLine,
                actions: action,
                onClick: this.toggleEdit
            });
        }
    }

});

exports['default'] = WorkspaceCard = PydioContextConsumer(WorkspaceCard);
exports['default'] = WorkspaceCard;
module.exports = exports['default'];

},{"../util/MessagesMixin":17,"./ParameterCreate":7,"./ParametersList":9,"./ParametersSummary":11,"material-ui":"material-ui","pydio":"pydio","react":"react"}],14:[function(require,module,exports){
(function (global){
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
var React = require('react');

var _require = require('material-ui');

var TextField = _require.TextField;
var FlatButton = _require.FlatButton;

var Pydio = require('pydio');

var _Pydio$requireLib = Pydio.requireLib('boot');

var ActionDialogMixin = _Pydio$requireLib.ActionDialogMixin;
var CancelButtonProviderMixin = _Pydio$requireLib.CancelButtonProviderMixin;
var SubmitButtonProviderMixin = _Pydio$requireLib.SubmitButtonProviderMixin;
exports['default'] = React.createClass({
    displayName: 'UserPasswordDialog',

    mixins: [ActionDialogMixin, CancelButtonProviderMixin, SubmitButtonProviderMixin],

    propTypes: {
        pydio: React.PropTypes.instanceOf(Pydio),
        userId: React.PropTypes.string.isRequired
    },

    getDefaultProps: function getDefaultProps() {
        return {
            dialogTitle: global.pydio.MessageHash['role_editor.25'],
            dialogSize: 'sm'
        };
    },

    getInitialState: function getInitialState() {
        return { okEnabled: false };
    },

    onChange: function onChange(event, value) {
        var minLength = parseInt(global.pydio.getPluginConfigs("core.auth").get("PASSWORD_MINLENGTH"));

        var enabled = this.refs.pass.getValue() && this.refs.pass.getValue().length >= minLength && this.refs.pass.getValue() == this.refs.confirm.getValue();

        this.setState({ okEnabled: enabled });
    },

    submit: function submit() {

        if (!this.state.okEnabled) {
            return;
        }

        var value = this.refs.pass.getValue();
        PydioApi.getClient().request({
            get_action: "edit",
            sub_action: "update_user_pwd",
            user_id: this.props.userId,
            user_pwd: value
        }, (function () {
            this.dismiss();
        }).bind(this));
    },

    render: function render() {

        // This is passed via state, context is not working,
        // so we have to get the messages from the global.
        var getMessage = function getMessage(id) {
            var namespace = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

            return global.pydio.MessageHash[namespace + (namespace ? '.' : '') + id] || id;
        };
        return React.createElement(
            'div',
            { style: { width: '100%' } },
            React.createElement(TextField, { ref: 'pass', type: 'password', fullWidth: true,
                onChange: this.onChange,
                floatingLabelText: getMessage('523'),
                errorText: !this.state.okEnabled ? getMessage('378') : null
            }),
            React.createElement(TextField, { ref: 'confirm', type: 'password', fullWidth: true,
                onChange: this.onChange,
                floatingLabelText: getMessage('199') })
        );
    }

});
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"material-ui":"material-ui","pydio":"pydio","react":"react"}],15:[function(require,module,exports){
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

var _utilMessagesMixin = require('../util/MessagesMixin');

exports['default'] = React.createClass({
    displayName: 'UserRolesPicker',

    mixins: [_utilMessagesMixin.RoleMessagesConsumerMixin],

    propTypes: {
        availableRoles: React.PropTypes.array,
        rolesDetails: React.PropTypes.object,
        currentRoles: React.PropTypes.array,
        controller: React.PropTypes.object
    },

    onChange: function onChange(e, selectedIndex, menuItem) {
        var newRole = menuItem.payload;
        if (newRole == -1) return;
        var newRoles = this.props.currentRoles.slice();
        newRoles.push(newRole);
        this.props.controller.updateUserRoles(newRoles);
    },

    remove: function remove(roleId) {
        var newRoles = LangUtils.arrayWithout(this.props.currentRoles, this.props.currentRoles.indexOf(roleId));
        this.props.controller.updateUserRoles(newRoles);
    },

    orderUpdated: function orderUpdated(oldId, newId, currentValues) {
        var ordered = currentValues.map(function (o) {
            return o.payload;
        });
        this.props.controller.orderUserRoles(ordered);
    },

    render: function render() {

        var groups = [],
            manual = [],
            users = [];
        var currentRoles = this.props.currentRoles;
        var details = this.props.rolesDetails;
        currentRoles.map((function (r) {
            if (r.startsWith('AJXP_GRP_/')) {
                if (r == 'AJXP_GRP_/') {
                    groups.push('/ ' + this.context.getMessage('user.25', 'ajxp_admin'));
                } else {
                    groups.push(this.context.getMessage('user.26', 'ajxp_admin').replace('%s', r.substr('AJXP_GRP_'.length)));
                }
            } else if (r.startsWith('AJXP_USR_/')) {
                users.push(this.context.getMessage('user.27', 'ajxp_admin'));
            } else {
                if (!details[r]) {
                    return;
                }
                var label = details[r].label;
                if (details[r].sticky) label += ' [' + this.context.getMessage('19') + ']'; // always overrides
                manual.push({ payload: r, text: label });
            }
        }).bind(this));

        var addableRoles = [{ text: this.context.getMessage('20'), payload: -1 }];
        this.props.availableRoles.map(function (r) {
            if (currentRoles.indexOf(r) == -1) addableRoles.push({ text: details[r].label, payload: r });
        });

        return React.createElement(
            'div',
            { className: 'user-roles-picker' },
            React.createElement(
                'h1',
                null,
                'Manage roles ',
                this.props.loadingMessage ? ' (' + this.context.getMessage('21') + ')' : '',
                React.createElement(
                    'div',
                    { className: 'roles-picker-menu' },
                    React.createElement(ReactMUI.DropDownMenu, { menuItems: addableRoles, onChange: this.onChange, selectedIndex: 0 })
                )
            ),
            React.createElement(
                'div',
                { className: 'roles-list' },
                groups.map(function (g) {
                    return React.createElement(
                        ReactMUI.Paper,
                        { zDepth: 0, key: "group-" + g },
                        React.createElement(
                            'div',
                            { className: 'role-item role-item-group' },
                            g
                        )
                    );
                }),
                React.createElement(PydioComponents.SortableList, {
                    key: 'sortable',
                    values: manual,
                    removable: true,
                    onRemove: this.remove,
                    onOrderUpdated: this.orderUpdated,
                    itemClassName: 'role-item role-item-sortable'
                }),
                users.map(function (u) {
                    return React.createElement(
                        ReactMUI.Paper,
                        { zDepth: 0, key: "user-" + u },
                        React.createElement(
                            'div',
                            { className: 'role-item role-item-user' },
                            u
                        )
                    );
                })
            )
        );
    }

});
module.exports = exports['default'];

},{"../util/MessagesMixin":17}],16:[function(require,module,exports){
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

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
  CACHE: null
};
module.exports = exports["default"];

},{}],17:[function(require,module,exports){
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

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var RoleMessagesConsumerMixin = {
    contextTypes: {
        messages: React.PropTypes.object,
        getMessage: React.PropTypes.func,
        getPydioRoleMessage: React.PropTypes.func,
        getRootMessage: React.PropTypes.func
    }
};

var RoleMessagesProviderMixin = {

    childContextTypes: {
        messages: React.PropTypes.object,
        getMessage: React.PropTypes.func,
        getPydioRoleMessage: React.PropTypes.func,
        getRootMessage: React.PropTypes.func
    },

    getChildContext: function getChildContext() {
        var messages = this.context.pydio.MessageHash;
        return {
            messages: messages,
            getMessage: function getMessage(messageId) {
                var namespace = arguments.length <= 1 || arguments[1] === undefined ? 'pydio_role' : arguments[1];

                return messages[namespace + (namespace ? "." : "") + messageId] || messageId;
            },
            getPydioRoleMessage: function getPydioRoleMessage(messageId) {
                return messages['role_editor.' + messageId] || messageId;
            },
            getRootMessage: function getRootMessage(messageId) {
                return messages[messageId] || messageId;
            }
        };
    }

};

exports.RoleMessagesConsumerMixin = RoleMessagesConsumerMixin;
exports.RoleMessagesProviderMixin = RoleMessagesProviderMixin;

},{}],18:[function(require,module,exports){
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
var CreateRoleOrGroupForm = React.createClass({
    displayName: 'CreateRoleOrGroupForm',

    mixins: [AdminComponents.MessagesConsumerMixin, PydioReactUI.CancelButtonProviderMixin, PydioReactUI.SubmitButtonProviderMixin],

    propTypes: {
        type: React.PropTypes.oneOf(['group', 'user', 'role']),
        roleNode: React.PropTypes.instanceOf(AjxpNode),
        openRoleEditor: React.PropTypes.func
    },

    getTitle: function getTitle() {
        if (this.props.type == 'group') {
            return this.context.getMessage('ajxp_admin.user.15');
        } else {
            return this.context.getMessage('ajxp_admin.user.14');
        }
    },

    getPadding: function getPadding() {
        return true;
    },

    getSize: function getSize() {
        return 'sm';
    },

    dismiss: function dismiss() {
        return this.props.onDismiss();
    },

    submit: function submit() {
        var type = this.props.type;
        var parameters;
        var currentNode;
        if (type == "group") {
            var gId = this.refs.group_id.getValue();
            var gLabel = this.refs.group_label.getValue();
            if (!gId || !gLabel) {
                return;
            }
            if (pydio.getContextHolder().getSelectedNodes().length) {
                currentNode = pydio.getContextHolder().getSelectedNodes()[0];
            } else {
                currentNode = pydio.getContextNode();
            }
            parameters = { get_action: 'create_group', dir: currentNode.getPath(), group_name: gId, group_label: gLabel };
        } else if (type == "role") {
            currentNode = this.props.roleNode;
            parameters = { get_action: 'create_role', role_id: this.refs.role_id.getValue() };
        }

        PydioApi.getClient().request(parameters, (function () {
            this.dismiss();
            if (currentNode) currentNode.reload();
        }).bind(this));
    },

    render: function render() {
        if (this.props.type == 'group') {
            return React.createElement(
                'div',
                null,
                React.createElement(ReactMUI.TextField, {
                    ref: 'group_id',
                    floatingLabelText: this.context.getMessage('ajxp_admin.user.16')
                }),
                React.createElement('br', null),
                React.createElement(ReactMUI.TextField, {
                    ref: 'group_label',
                    floatingLabelText: this.context.getMessage('ajxp_admin.user.17')
                })
            );
        } else {
            return React.createElement(
                'div',
                null,
                React.createElement(ReactMUI.TextField, {
                    ref: 'role_id',
                    floatingLabelText: this.context.getMessage('ajxp_admin.user.18')
                }),
                React.createElement('br', null)
            );
        }
    }

});

exports['default'] = CreateRoleOrGroupForm;
module.exports = exports['default'];

},{}],19:[function(require,module,exports){
(function (global){
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
var CreateUserForm = React.createClass({
    displayName: 'CreateUserForm',

    propTypes: {
        dataModel: React.PropTypes.instanceOf(PydioDataModel),
        openRoleEditor: React.PropTypes.func
    },

    mixins: [AdminComponents.MessagesConsumerMixin, PydioReactUI.ActionDialogMixin, PydioReactUI.CancelButtonProviderMixin, PydioReactUI.SubmitButtonProviderMixin],

    getDefaultProps: function getDefaultProps() {
        return {
            dialogSize: 'sm',
            dialogTitleId: 'ajxp_admin.user.19'
        };
    },

    checkPassword: function checkPassword() {
        var value1 = this.refs.pass.getValue();
        var value2 = this.refs.passconf.getValue();
        var minLength = parseInt(global.pydio.getPluginConfigs("core.auth").get("PASSWORD_MINLENGTH"));
        if (value1 && value1.length < minLength) {
            this.refs.pass.setErrorText(this.context.getMessage('378'));
            return;
        }
        if (value1 && value2 && value2 != value1) {
            this.refs.passconf.setErrorText(this.context.getMessage('238'));
            return;
        }
        this.refs.pass.setErrorText(null);
        this.refs.passconf.setErrorText(null);
    },

    getInitialState: function getInitialState() {
        return {
            step: 1
        };
    },

    submit: function submit(dialog) {
        var parameters = {};
        var ctx = this.props.dataModel.getUniqueNode() || this.props.dataModel.getContextNode();
        parameters['get_action'] = 'create_user';
        parameters['new_user_login'] = this.refs.user_id.getValue();
        parameters['new_user_pwd'] = this.refs.pass.getValue();
        var currentPath = ctx.getPath();
        if (currentPath.startsWith("/data/users")) {
            parameters['group_path'] = currentPath.substr("/data/users".length);
        }
        PydioApi.getClient().request(parameters, (function (transport) {
            var xml = transport.responseXML;
            var message = XMLUtils.XPathSelectSingleNode(xml, "//reload_instruction");
            if (message) {
                var node = new AjxpNode(currentPath + "/" + parameters['new_user_login'], true);
                node.getMetadata().set("ajxp_mime", "user");
                //global.pydio.UI.openCurrentSelectionInEditor(node);
                this.props.openRoleEditor(node);
                var currentNode = global.pydio.getContextNode();
                if (global.pydio.getContextHolder().getSelectedNodes().length) {
                    currentNode = global.pydio.getContextHolder().getSelectedNodes()[0];
                }
                currentNode.reload();
            }
        }).bind(this));
        this.dismiss();
    },

    render: function render() {
        var ctx = this.props.dataModel.getUniqueNode() || this.props.dataModel.getContextNode();
        var currentPath = ctx.getPath();
        var path;
        if (currentPath.startsWith("/data/users")) {
            path = currentPath.substr("/data/users".length);
            if (path) {
                path = React.createElement(
                    'div',
                    null,
                    this.context.getMessage('ajxp_admin.user.20').replace('%s', path)
                );
            }
        }
        return React.createElement(
            'div',
            null,
            path,
            React.createElement(
                'div',
                null,
                React.createElement(ReactMUI.TextField, {
                    ref: 'user_id',
                    floatingLabelText: this.context.getMessage('ajxp_admin.user.21')
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement(ReactMUI.TextField, {
                    ref: 'pass',
                    type: 'password',
                    floatingLabelText: this.context.getMessage('ajxp_admin.user.22'),
                    onChange: this.checkPassword
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement(ReactMUI.TextField, {
                    ref: 'passconf',
                    type: 'password',
                    floatingLabelText: this.context.getMessage('ajxp_admin.user.23'),
                    onChange: this.checkPassword
                })
            )
        );
    }
});

exports['default'] = CreateUserForm;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],20:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _boardDashboard = require('./board/Dashboard');

var _boardDashboard2 = _interopRequireDefault(_boardDashboard);

var _formsCreateUserForm = require('./forms/CreateUserForm');

var _formsCreateUserForm2 = _interopRequireDefault(_formsCreateUserForm);

var _formsCreateRoleOrGroupForm = require('./forms/CreateRoleOrGroupForm');

var _formsCreateRoleOrGroupForm2 = _interopRequireDefault(_formsCreateRoleOrGroupForm);

var _editorEditor = require('./editor/Editor');

var _editorEditor2 = _interopRequireDefault(_editorEditor);

var _editorUserUserPasswordDialog = require('./editor/user/UserPasswordDialog');

var _editorUserUserPasswordDialog2 = _interopRequireDefault(_editorUserUserPasswordDialog);

var _editorUserUserRolesPicker = require('./editor/user/UserRolesPicker');

var _editorUserUserRolesPicker2 = _interopRequireDefault(_editorUserUserRolesPicker);

var _editorPanelWorkspacesList = require('./editor/panel/WorkspacesList');

var _editorPanelWorkspacesList2 = _interopRequireDefault(_editorPanelWorkspacesList);

var _editorPanelSharesList = require('./editor/panel/SharesList');

var _editorPanelSharesList2 = _interopRequireDefault(_editorPanelSharesList);

var _editorUtilMessagesMixin = require('./editor/util/MessagesMixin');

var _editorParametersParameterCreate = require('./editor/parameters/ParameterCreate');

var _editorParametersParameterCreate2 = _interopRequireDefault(_editorParametersParameterCreate);

window.AdminPeople = {
  RoleEditor: _editorEditor2['default'],
  RoleMessagesConsumerMixin: _editorUtilMessagesMixin.RoleMessagesConsumerMixin,
  UserPasswordDialog: _editorUserUserPasswordDialog2['default'],
  UserRolesPicker: _editorUserUserRolesPicker2['default'],
  WorkspacesList: _editorPanelWorkspacesList2['default'],
  SharesList: _editorPanelSharesList2['default'],
  CreateUserForm: _formsCreateUserForm2['default'],
  CreateRoleOrGroupForm: _formsCreateRoleOrGroupForm2['default'],
  ParameterCreate: _editorParametersParameterCreate2['default'],

  Dashboard: _boardDashboard2['default']
};

},{"./board/Dashboard":1,"./editor/Editor":2,"./editor/panel/SharesList":5,"./editor/panel/WorkspacesList":6,"./editor/parameters/ParameterCreate":7,"./editor/user/UserPasswordDialog":14,"./editor/user/UserRolesPicker":15,"./editor/util/MessagesMixin":17,"./forms/CreateRoleOrGroupForm":18,"./forms/CreateUserForm":19}]},{},[20]);
