(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PydioNotifications = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var _Pydio$requireLib = _pydio2['default'].requireLib('components');

var NodeListCustomProvider = _Pydio$requireLib.NodeListCustomProvider;

var _Pydio$requireLib2 = _pydio2['default'].requireLib('workspaces');

var InfoPanelCard = _Pydio$requireLib2.InfoPanelCard;
var FilePreview = _Pydio$requireLib2.FilePreview;

var _Pydio$requireLib3 = _pydio2['default'].requireLib('hoc');

var Animations = _Pydio$requireLib3.Animations;

var _Pydio$requireLib4 = _pydio2['default'].requireLib('boot');

var PydioContextConsumer = _Pydio$requireLib4.PydioContextConsumer;

var Template = Animations.makeTransition({ opacity: 0.3 }, { opacity: 1 })(function (props) {
    return _react2['default'].createElement('div', _extends({}, props, { style: { padding: 0 } }));
});

var ActivityPanel = (function (_React$Component) {
    _inherits(ActivityPanel, _React$Component);

    _createClass(ActivityPanel, null, [{
        key: 'EventsIcons',
        get: function get() {
            return {
                'add': 'folder-plus',
                'add-file': 'folder-upload',
                'delete': 'delete',
                'change': 'pencil',
                'rename': 'rename-box',
                'view': 'eye',
                'copy': 'content-copy',
                'move': 'folder-move',
                'copy_to': 'folder-move',
                'copy_from': 'folder-move',
                'move_from': 'folder-move',
                'move_to': 'folder-move'
            };
        }
    }, {
        key: 'styles',
        get: function get() {
            return {
                roundedIconContainer: {
                    borderRadius: "50%",
                    margin: 15,
                    height: 40,
                    width: 40,
                    lineHeight: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                roundedIconMimeFont: {
                    fontSize: 24,
                    textAlign: "center"
                },
                timeline: {
                    position: 'absolute',
                    top: 0,
                    left: 33,
                    bottom: 0,
                    width: 4,
                    backgroundColor: '#eceff1'
                }
            };
        }
    }]);

    function ActivityPanel(props) {
        _classCallCheck(this, ActivityPanel);

        _get(Object.getPrototypeOf(ActivityPanel.prototype), 'constructor', this).call(this, props);
        if (props.pydio && !props.pydio.user || props.pydio.user.activeRepository === 'inbox') {
            this.state = { empty: true };
        } else {
            this.state = {
                empty: true,
                dataModel: this.initDataModel(this.props.node)
            };
        }
    }

    _createClass(ActivityPanel, [{
        key: 'initDataModel',
        value: function initDataModel(node) {
            var _this = this;

            var dataModel = PydioDataModel.RemoteDataModelFactory(this.getProviderProperties(node), "Activity");
            dataModel.getRootNode().observe('loaded', function () {
                _this.setState({ empty: !dataModel.getRootNode().getChildren().size });
            });
            dataModel.getRootNode().load();
            return dataModel;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            if (nextProps.node !== this.props.node) {
                if (nextProps.pydio && nextProps.pydio.user && nextProps.pydio.user.activeRepository === 'inbox') {
                    this.setState({ empty: true });
                    return;
                }
                this.setState({
                    dataModel: this.initDataModel(nextProps.node)
                }, function () {
                    if (_this2.refs.provider) _this2.refs.provider.reload();
                });
            }
        }
    }, {
        key: 'getProviderProperties',
        value: function getProviderProperties(node) {

            return {
                "get_action": "get_my_feed",
                "connexion_discrete": true,
                "format": "xml",
                "current_repository": "true",
                "feed_type": "notif",
                "limit": node.isLeaf() || node.isRoot() ? 18 : 4,
                "path": node.isLeaf() || node.isRoot() ? node.getPath() : node.getPath() + '/',
                "merge_description": "true",
                "description_as_label": node.isLeaf() ? "true" : "false",
                "cache_service": {
                    "metaStreamName": "files.activity" + node.getPath(),
                    "expirationPolicy": MetaCacheService.EXPIRATION_MANUAL_TRIGGER
                }
            };
        }
    }, {
        key: 'renderIconFile',
        value: function renderIconFile(node) {
            var fileNode = new AjxpNode(node.getMetadata().get('real_path'), node.isLeaf(), node.getLabel());
            fileNode.setMetadata(node.getMetadata());
            return _react2['default'].createElement(
                'div',
                { style: { position: 'relative' } },
                _react2['default'].createElement('div', { style: _extends({}, ActivityPanel.styles.timeline, { bottom: -1 }) }),
                _react2['default'].createElement(FilePreview, {
                    node: fileNode,
                    style: ActivityPanel.styles.roundedIconContainer,
                    mimeFontStyle: ActivityPanel.styles.roundedIconMimeFont,
                    loadThumbnail: true
                })
            );
        }
    }, {
        key: 'renderTimelineEntry',
        value: function renderTimelineEntry(props) {
            var node = props.node;
            var isFirst = props.isFirst;

            var action = node.getMetadata().get('event_action');
            if (action === 'add' && node.isLeaf()) {
                action = 'add-file';
            }

            var timeline = ActivityPanel.styles.timeline;

            if (isFirst) {
                timeline['top'] = 34;
            }

            return _react2['default'].createElement(
                'div',
                { className: 'ajxp_node_leaf material-list-entry material-list-entry-2-lines', style: { borderBottom: 0 } },
                _react2['default'].createElement(
                    'div',
                    { style: { position: 'relative' }, className: 'material-list-icon' },
                    _react2['default'].createElement('div', { style: timeline }),
                    _react2['default'].createElement(FilePreview, {
                        node: node,
                        style: ActivityPanel.styles.roundedIconContainer,
                        mimeClassName: "mimefont mdi mdi-" + ActivityPanel.EventsIcons[action],
                        mimeFontStyle: ActivityPanel.styles.roundedIconMimeFont,
                        loadThumbnail: false
                    })
                ),
                _react2['default'].createElement(
                    'div',
                    { className: 'material-list-text' },
                    _react2['default'].createElement(
                        'div',
                        { className: 'material-list-line-1', style: { whiteSpace: 'normal', lineHeight: '24px' } },
                        node.getMetadata().get('event_description')
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: 'material-list-line-2' },
                        node.getMetadata().get('short_date')
                    )
                )
            );
        }
    }, {
        key: 'renderFirstLineLeaf',
        value: function renderFirstLineLeaf(node) {
            return _react2['default'].createElement(
                'div',
                { style: { whiteSpace: 'normal', lineHeight: '24px' } },
                node.getMetadata().get('event_description')
            );
        }
    }, {
        key: 'renderSecondLine',
        value: function renderSecondLine(node) {
            return _react2['default'].createElement(
                'div',
                { style: { whiteSpace: 'normal' } },
                node.getMetadata().get('event_description')
            );
        }
    }, {
        key: 'renderActions',
        value: function renderActions(node) {
            var pydio = this.props.pydio;

            var open = function open() {
                pydio.goTo(node.getMetadata().get('real_path'));
            };
            return _react2['default'].createElement(MaterialUI.IconButton, {
                iconClassName: 'mdi mdi-arrow-right',
                onTouchTap: open,
                iconStyle: { color: 'rgba(0,0,0,0.23)', iconHoverColor: 'rgba(0,0,0,0.63)' } });
        }
    }, {
        key: 'render',
        value: function render() {

            if (this.state.empty) {
                return null;
            }
            var _props = this.props;
            var pydio = _props.pydio;
            var node = _props.node;
            var getMessage = _props.getMessage;

            var renderIcon = this.renderIconFile;
            var renderFirstLine = null;
            var renderCustomEntry = null;
            var renderSecondLine = this.renderSecondLine;
            var nodeClicked = function nodeClicked(node) {
                pydio.goTo(node.getMetadata().get('real_path'));
            };
            if (node.isLeaf()) {
                renderCustomEntry = this.renderTimelineEntry;
                renderFirstLine = null;
                renderSecondLine = null;
                renderIcon = null;
                nodeClicked = function () {};
            }

            var label = node.isLeaf() ? getMessage('notification_center.11') : getMessage('notification_center.10');
            var root = false;
            if (node === pydio.getContextHolder().getRootNode()) {
                label = getMessage('notification_center.9');
                root = true;
            }

            return _react2['default'].createElement(
                InfoPanelCard,
                { title: label, icon: 'pulse', iconColor: '#F57C00', style: this.props.style },
                _react2['default'].createElement(
                    Template,
                    null,
                    _react2['default'].createElement(NodeListCustomProvider, {
                        pydio: pydio,
                        className: 'files-list',
                        elementHeight: PydioComponents.SimpleList.HEIGHT_TWO_LINES + 2,
                        heightAutoWithMax: root ? 420 : 320,
                        presetDataModel: this.state.dataModel,
                        actionBarGroups: [],
                        ref: 'provider',
                        hideToolbar: true,
                        renderCustomEntry: renderCustomEntry,
                        entryRenderIcon: renderIcon,
                        entryRenderFirstLine: renderFirstLine,
                        entryRenderSecondLine: renderSecondLine,
                        nodeClicked: nodeClicked,
                        defaultSortingInfo: { attribute: 'event_time', sortType: 'number', direction: 'desc' },
                        verticalScroller: true
                    })
                )
            );
        }
    }]);

    return ActivityPanel;
})(_react2['default'].Component);

exports['default'] = ActivityPanel = PydioContextConsumer(ActivityPanel);
exports['default'] = ActivityPanel;
module.exports = exports['default'];

},{"pydio":"pydio","react":"react"}],2:[function(require,module,exports){
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotificationsPanel = (function (_React$Component) {
    _inherits(NotificationsPanel, _React$Component);

    function NotificationsPanel(props) {
        _classCallCheck(this, NotificationsPanel);

        _get(Object.getPrototypeOf(NotificationsPanel.prototype), "constructor", this).call(this, props);

        var providerProperties = {
            get_action: "get_my_feed",
            connexion_discrete: true,
            format: "xml",
            feed_type: "alert",
            merge_description: "false"
        };
        var repositoryScope = 'all';
        if (!(pydio && pydio.user && pydio.user.activeRepository === 'ajxp_home')) {
            providerProperties['current_repository'] = 'true';
            repositoryScope = pydio.user.activeRepository;
        }
        var dataModel = PydioDataModel.RemoteDataModelFactory(providerProperties, 'Notifications');
        var rNode = dataModel.getRootNode();
        rNode.observe("loaded", (function () {
            var unread = parseInt(rNode.getMetadata().get('unread_notifications_count')) || 0;
            this.setState({ unreadStatus: unread }, this.onStatusChange.bind(this));
        }).bind(this));
        rNode.load();

        if (repositoryScope === 'all') {
            this._pe = new PeriodicalExecuter(function () {
                rNode.reload(null, true);
            }, 8);
        } else {
            this._smObs = (function (event) {
                if (XMLUtils.XPathSelectSingleNode(event, 'tree/reload_user_feed')) {
                    rNode.reload(null, true);
                }
            }).bind(this);
        }
        this.props.pydio.observe("server_message", this._smObs);

        this.state = {
            open: false,
            dataModel: dataModel,
            repositoryScope: repositoryScope,
            unreadStatus: 0
        };
    }

    _createClass(NotificationsPanel, [{
        key: "onStatusChange",
        value: function onStatusChange() {
            if (this.props.onUnreadStatusChange) {
                this.props.onUnreadStatusChange(this.state.unreadStatus);
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            if (this._smObs) {
                this.props.pydio.stopObserving("server_message", this._smObs);
            } else if (this._pe) {
                this._pe.stop();
            }
        }
    }, {
        key: "handleTouchTap",
        value: function handleTouchTap(event) {
            // This prevents ghost click.
            event.preventDefault();
            if (this.state.unreadStatus) {
                this.updateAlertsLastRead();
            }
            this.setState({
                open: true,
                anchorEl: event.currentTarget,
                unreadStatus: 0
            }, this.onStatusChange.bind(this));
        }
    }, {
        key: "handleRequestClose",
        value: function handleRequestClose() {
            this.setState({
                open: false
            });
        }
    }, {
        key: "renderIcon",
        value: function renderIcon(node) {
            return React.createElement(PydioWorkspaces.FilePreview, {
                loadThumbnail: true,
                node: node,
                pydio: this.props.pydio,
                rounded: true
            });
        }
    }, {
        key: "renderSecondLine",
        value: function renderSecondLine(node) {
            return node.getMetadata().get('event_description');
        }
    }, {
        key: "renderActions",
        value: function renderActions(node) {
            var touchTap = (function (event) {
                event.stopPropagation();
                this.dismissAlert(node);
            }).bind(this);
            return React.createElement(MaterialUI.IconButton, {
                iconClassName: "mdi mdi-close",
                onClick: touchTap,
                style: { width: 36, height: 36, padding: 6 },
                iconStyle: { color: 'rgba(0,0,0,.23)', hoverColor: 'rgba(0,0,0,.73)' }
            });
        }
    }, {
        key: "entryClicked",
        value: function entryClicked(node) {
            this.handleRequestClose();
            this.props.pydio.goTo(node);
        }
    }, {
        key: "dismissAlert",
        value: function dismissAlert(node) {
            var alertId = node.getMetadata().get('alert_id');
            var occurences = node.getMetadata().get('event_occurence');
            PydioApi.getClient().request({
                get_action: 'dismiss_user_alert',
                alert_id: alertId,
                // Warning, occurrences parameter expects 2 'r'
                occurrences: occurences
            }, (function (t) {
                this.refs.list.reload();
                this.setState({ unreadStatus: 0 }, this.onStatusChange.bind(this));
            }).bind(this));
        }
    }, {
        key: "updateAlertsLastRead",
        value: function updateAlertsLastRead() {
            var _this = this;

            PydioApi.getClient().request({
                get_action: 'update_alerts_last_read',
                repository_scope: this.state.repositoryScope
            }, function (transp) {
                _this.setState({ unreadStatus: 0 }, _this.onStatusChange.bind(_this));
            });
        }
    }, {
        key: "render",
        value: function render() {

            var LIST = React.createElement(PydioComponents.NodeListCustomProvider, {
                ref: "list",
                className: 'files-list ' + (this.props.listClassName || ''),
                hideToolbar: true,
                pydio: this.props.pydio,
                elementHeight: PydioComponents.SimpleList.HEIGHT_TWO_LINES + 2,
                heightAutoWithMax: this.props.listOnly ? null : 500,
                presetDataModel: this.state.dataModel,
                reloadAtCursor: true,
                actionBarGroups: [],
                entryRenderIcon: this.renderIcon.bind(this),
                entryRenderSecondLine: this.renderSecondLine.bind(this),
                entryRenderActions: this.renderActions.bind(this),
                nodeClicked: this.entryClicked.bind(this),
                emptyStateProps: _extends({
                    style: { paddingTop: 20, paddingBottom: 20 },
                    iconClassName: 'mdi mdi-bell-off',
                    primaryTextId: 'notification_center.14',
                    secondaryTextId: 'notification_center.15'
                }, this.props.emptyStateProps)
            });

            if (this.props.listOnly) {
                return LIST;
            }

            return React.createElement(
                "span",
                null,
                React.createElement(
                    MaterialUI.Badge,
                    {
                        badgeContent: this.state.unreadStatus,
                        secondary: true,
                        style: this.state.unreadStatus ? { padding: '0 24px 0 0' } : { padding: 0 },
                        badgeStyle: !this.state.unreadStatus ? { display: 'none' } : null
                    },
                    React.createElement(MaterialUI.IconButton, {
                        onTouchTap: this.handleTouchTap.bind(this),
                        iconClassName: this.props.iconClassName || "icon-bell",
                        tooltip: this.props.pydio.MessageHash['notification_center.4'],
                        className: "userActionButton alertsButton"
                    })
                ),
                React.createElement(
                    MaterialUI.Popover,
                    {
                        open: this.state.open,
                        anchorEl: this.state.anchorEl,
                        anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
                        targetOrigin: { horizontal: 'left', vertical: 'top' },
                        onRequestClose: this.handleRequestClose.bind(this),
                        style: { width: 320 },
                        zDepth: 2

                    },
                    LIST
                )
            );
        }
    }]);

    return NotificationsPanel;
})(React.Component);

exports["default"] = NotificationsPanel;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
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

function _interopRequire(obj) { return obj && obj.__esModule ? obj["default"] : obj; }

var _Panel = require("./Panel");

exports.Panel = _interopRequire(_Panel);

var _ActivityPanel = require("./ActivityPanel");

exports.ActivityPanel = _interopRequire(_ActivityPanel);

},{"./ActivityPanel":1,"./Panel":2}]},{},[3])(3)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJyZXMvYnVpbGQvUHlkaW9Ob3RpZmljYXRpb25zL0FjdGl2aXR5UGFuZWwuanMiLCJyZXMvYnVpbGQvUHlkaW9Ob3RpZmljYXRpb25zL1BhbmVsLmpzIiwicmVzL2J1aWxkL1B5ZGlvTm90aWZpY2F0aW9ucy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gKiBDb3B5cmlnaHQgMjAwNy0yMDE3IENoYXJsZXMgZHUgSmV1IC0gQWJzdHJpdW0gU0FTIDx0ZWFtIChhdCkgcHlkLmlvPlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgUHlkaW8uXG4gKlxuICogUHlkaW8gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBQeWRpbyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBQeWRpby4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqXG4gKiBUaGUgbGF0ZXN0IGNvZGUgY2FuIGJlIGZvdW5kIGF0IDxodHRwczovL3B5ZGlvLmNvbT4uXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBkZXNjID0gcGFyZW50ID0gdW5kZWZpbmVkOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9weWRpbyA9IHJlcXVpcmUoJ3B5ZGlvJyk7XG5cbnZhciBfcHlkaW8yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHlkaW8pO1xuXG52YXIgX1B5ZGlvJHJlcXVpcmVMaWIgPSBfcHlkaW8yWydkZWZhdWx0J10ucmVxdWlyZUxpYignY29tcG9uZW50cycpO1xuXG52YXIgTm9kZUxpc3RDdXN0b21Qcm92aWRlciA9IF9QeWRpbyRyZXF1aXJlTGliLk5vZGVMaXN0Q3VzdG9tUHJvdmlkZXI7XG5cbnZhciBfUHlkaW8kcmVxdWlyZUxpYjIgPSBfcHlkaW8yWydkZWZhdWx0J10ucmVxdWlyZUxpYignd29ya3NwYWNlcycpO1xuXG52YXIgSW5mb1BhbmVsQ2FyZCA9IF9QeWRpbyRyZXF1aXJlTGliMi5JbmZvUGFuZWxDYXJkO1xudmFyIEZpbGVQcmV2aWV3ID0gX1B5ZGlvJHJlcXVpcmVMaWIyLkZpbGVQcmV2aWV3O1xuXG52YXIgX1B5ZGlvJHJlcXVpcmVMaWIzID0gX3B5ZGlvMlsnZGVmYXVsdCddLnJlcXVpcmVMaWIoJ2hvYycpO1xuXG52YXIgQW5pbWF0aW9ucyA9IF9QeWRpbyRyZXF1aXJlTGliMy5BbmltYXRpb25zO1xuXG52YXIgX1B5ZGlvJHJlcXVpcmVMaWI0ID0gX3B5ZGlvMlsnZGVmYXVsdCddLnJlcXVpcmVMaWIoJ2Jvb3QnKTtcblxudmFyIFB5ZGlvQ29udGV4dENvbnN1bWVyID0gX1B5ZGlvJHJlcXVpcmVMaWI0LlB5ZGlvQ29udGV4dENvbnN1bWVyO1xuXG52YXIgVGVtcGxhdGUgPSBBbmltYXRpb25zLm1ha2VUcmFuc2l0aW9uKHsgb3BhY2l0eTogMC4zIH0sIHsgb3BhY2l0eTogMSB9KShmdW5jdGlvbiAocHJvcHMpIHtcbiAgICByZXR1cm4gX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIF9leHRlbmRzKHt9LCBwcm9wcywgeyBzdHlsZTogeyBwYWRkaW5nOiAwIH0gfSkpO1xufSk7XG5cbnZhciBBY3Rpdml0eVBhbmVsID0gKGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKEFjdGl2aXR5UGFuZWwsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gICAgX2NyZWF0ZUNsYXNzKEFjdGl2aXR5UGFuZWwsIG51bGwsIFt7XG4gICAgICAgIGtleTogJ0V2ZW50c0ljb25zJyxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICdhZGQnOiAnZm9sZGVyLXBsdXMnLFxuICAgICAgICAgICAgICAgICdhZGQtZmlsZSc6ICdmb2xkZXItdXBsb2FkJyxcbiAgICAgICAgICAgICAgICAnZGVsZXRlJzogJ2RlbGV0ZScsXG4gICAgICAgICAgICAgICAgJ2NoYW5nZSc6ICdwZW5jaWwnLFxuICAgICAgICAgICAgICAgICdyZW5hbWUnOiAncmVuYW1lLWJveCcsXG4gICAgICAgICAgICAgICAgJ3ZpZXcnOiAnZXllJyxcbiAgICAgICAgICAgICAgICAnY29weSc6ICdjb250ZW50LWNvcHknLFxuICAgICAgICAgICAgICAgICdtb3ZlJzogJ2ZvbGRlci1tb3ZlJyxcbiAgICAgICAgICAgICAgICAnY29weV90byc6ICdmb2xkZXItbW92ZScsXG4gICAgICAgICAgICAgICAgJ2NvcHlfZnJvbSc6ICdmb2xkZXItbW92ZScsXG4gICAgICAgICAgICAgICAgJ21vdmVfZnJvbSc6ICdmb2xkZXItbW92ZScsXG4gICAgICAgICAgICAgICAgJ21vdmVfdG8nOiAnZm9sZGVyLW1vdmUnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzdHlsZXMnLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcm91bmRlZEljb25Db250YWluZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjUwJVwiLFxuICAgICAgICAgICAgICAgICAgICBtYXJnaW46IDE1LFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDQwLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDAsXG4gICAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICc0MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByb3VuZGVkSWNvbk1pbWVGb250OiB7XG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAyNCxcbiAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiBcImNlbnRlclwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0aW1lbGluZToge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAzMyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNCxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2VjZWZmMSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgZnVuY3Rpb24gQWN0aXZpdHlQYW5lbChwcm9wcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQWN0aXZpdHlQYW5lbCk7XG5cbiAgICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoQWN0aXZpdHlQYW5lbC5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIHByb3BzKTtcbiAgICAgICAgaWYgKHByb3BzLnB5ZGlvICYmICFwcm9wcy5weWRpby51c2VyIHx8IHByb3BzLnB5ZGlvLnVzZXIuYWN0aXZlUmVwb3NpdG9yeSA9PT0gJ2luYm94Jykge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHsgZW1wdHk6IHRydWUgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgZW1wdHk6IHRydWUsXG4gICAgICAgICAgICAgICAgZGF0YU1vZGVsOiB0aGlzLmluaXREYXRhTW9kZWwodGhpcy5wcm9wcy5ub2RlKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhBY3Rpdml0eVBhbmVsLCBbe1xuICAgICAgICBrZXk6ICdpbml0RGF0YU1vZGVsJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGluaXREYXRhTW9kZWwobm9kZSkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIGRhdGFNb2RlbCA9IFB5ZGlvRGF0YU1vZGVsLlJlbW90ZURhdGFNb2RlbEZhY3RvcnkodGhpcy5nZXRQcm92aWRlclByb3BlcnRpZXMobm9kZSksIFwiQWN0aXZpdHlcIik7XG4gICAgICAgICAgICBkYXRhTW9kZWwuZ2V0Um9vdE5vZGUoKS5vYnNlcnZlKCdsb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoeyBlbXB0eTogIWRhdGFNb2RlbC5nZXRSb290Tm9kZSgpLmdldENoaWxkcmVuKCkuc2l6ZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGF0YU1vZGVsLmdldFJvb3ROb2RlKCkubG9hZCgpO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGFNb2RlbDtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmIChuZXh0UHJvcHMubm9kZSAhPT0gdGhpcy5wcm9wcy5ub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRQcm9wcy5weWRpbyAmJiBuZXh0UHJvcHMucHlkaW8udXNlciAmJiBuZXh0UHJvcHMucHlkaW8udXNlci5hY3RpdmVSZXBvc2l0b3J5ID09PSAnaW5ib3gnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBlbXB0eTogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YU1vZGVsOiB0aGlzLmluaXREYXRhTW9kZWwobmV4dFByb3BzLm5vZGUpXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMyLnJlZnMucHJvdmlkZXIpIF90aGlzMi5yZWZzLnByb3ZpZGVyLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRQcm92aWRlclByb3BlcnRpZXMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0UHJvdmlkZXJQcm9wZXJ0aWVzKG5vZGUpIHtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBcImdldF9hY3Rpb25cIjogXCJnZXRfbXlfZmVlZFwiLFxuICAgICAgICAgICAgICAgIFwiY29ubmV4aW9uX2Rpc2NyZXRlXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRcIjogXCJ4bWxcIixcbiAgICAgICAgICAgICAgICBcImN1cnJlbnRfcmVwb3NpdG9yeVwiOiBcInRydWVcIixcbiAgICAgICAgICAgICAgICBcImZlZWRfdHlwZVwiOiBcIm5vdGlmXCIsXG4gICAgICAgICAgICAgICAgXCJsaW1pdFwiOiBub2RlLmlzTGVhZigpIHx8IG5vZGUuaXNSb290KCkgPyAxOCA6IDQsXG4gICAgICAgICAgICAgICAgXCJwYXRoXCI6IG5vZGUuaXNMZWFmKCkgfHwgbm9kZS5pc1Jvb3QoKSA/IG5vZGUuZ2V0UGF0aCgpIDogbm9kZS5nZXRQYXRoKCkgKyAnLycsXG4gICAgICAgICAgICAgICAgXCJtZXJnZV9kZXNjcmlwdGlvblwiOiBcInRydWVcIixcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uX2FzX2xhYmVsXCI6IG5vZGUuaXNMZWFmKCkgPyBcInRydWVcIiA6IFwiZmFsc2VcIixcbiAgICAgICAgICAgICAgICBcImNhY2hlX3NlcnZpY2VcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIm1ldGFTdHJlYW1OYW1lXCI6IFwiZmlsZXMuYWN0aXZpdHlcIiArIG5vZGUuZ2V0UGF0aCgpLFxuICAgICAgICAgICAgICAgICAgICBcImV4cGlyYXRpb25Qb2xpY3lcIjogTWV0YUNhY2hlU2VydmljZS5FWFBJUkFUSU9OX01BTlVBTF9UUklHR0VSXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVySWNvbkZpbGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVySWNvbkZpbGUobm9kZSkge1xuICAgICAgICAgICAgdmFyIGZpbGVOb2RlID0gbmV3IEFqeHBOb2RlKG5vZGUuZ2V0TWV0YWRhdGEoKS5nZXQoJ3JlYWxfcGF0aCcpLCBub2RlLmlzTGVhZigpLCBub2RlLmdldExhYmVsKCkpO1xuICAgICAgICAgICAgZmlsZU5vZGUuc2V0TWV0YWRhdGEobm9kZS5nZXRNZXRhZGF0YSgpKTtcbiAgICAgICAgICAgIHJldHVybiBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH0gfSxcbiAgICAgICAgICAgICAgICBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogX2V4dGVuZHMoe30sIEFjdGl2aXR5UGFuZWwuc3R5bGVzLnRpbWVsaW5lLCB7IGJvdHRvbTogLTEgfSkgfSksXG4gICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoRmlsZVByZXZpZXcsIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZTogZmlsZU5vZGUsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiBBY3Rpdml0eVBhbmVsLnN0eWxlcy5yb3VuZGVkSWNvbkNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICAgICAgbWltZUZvbnRTdHlsZTogQWN0aXZpdHlQYW5lbC5zdHlsZXMucm91bmRlZEljb25NaW1lRm9udCxcbiAgICAgICAgICAgICAgICAgICAgbG9hZFRodW1ibmFpbDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXJUaW1lbGluZUVudHJ5JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlclRpbWVsaW5lRW50cnkocHJvcHMpIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gcHJvcHMubm9kZTtcbiAgICAgICAgICAgIHZhciBpc0ZpcnN0ID0gcHJvcHMuaXNGaXJzdDtcblxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IG5vZGUuZ2V0TWV0YWRhdGEoKS5nZXQoJ2V2ZW50X2FjdGlvbicpO1xuICAgICAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2FkZCcgJiYgbm9kZS5pc0xlYWYoKSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbiA9ICdhZGQtZmlsZSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB0aW1lbGluZSA9IEFjdGl2aXR5UGFuZWwuc3R5bGVzLnRpbWVsaW5lO1xuXG4gICAgICAgICAgICBpZiAoaXNGaXJzdCkge1xuICAgICAgICAgICAgICAgIHRpbWVsaW5lWyd0b3AnXSA9IDM0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdhanhwX25vZGVfbGVhZiBtYXRlcmlhbC1saXN0LWVudHJ5IG1hdGVyaWFsLWxpc3QtZW50cnktMi1saW5lcycsIHN0eWxlOiB7IGJvcmRlckJvdHRvbTogMCB9IH0sXG4gICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH0sIGNsYXNzTmFtZTogJ21hdGVyaWFsLWxpc3QtaWNvbicgfSxcbiAgICAgICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHRpbWVsaW5lIH0pLFxuICAgICAgICAgICAgICAgICAgICBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChGaWxlUHJldmlldywge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZTogbm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBBY3Rpdml0eVBhbmVsLnN0eWxlcy5yb3VuZGVkSWNvbkNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbWVDbGFzc05hbWU6IFwibWltZWZvbnQgbWRpIG1kaS1cIiArIEFjdGl2aXR5UGFuZWwuRXZlbnRzSWNvbnNbYWN0aW9uXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbWVGb250U3R5bGU6IEFjdGl2aXR5UGFuZWwuc3R5bGVzLnJvdW5kZWRJY29uTWltZUZvbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkVGh1bWJuYWlsOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ21hdGVyaWFsLWxpc3QtdGV4dCcgfSxcbiAgICAgICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnbWF0ZXJpYWwtbGlzdC1saW5lLTEnLCBzdHlsZTogeyB3aGl0ZVNwYWNlOiAnbm9ybWFsJywgbGluZUhlaWdodDogJzI0cHgnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0TWV0YWRhdGEoKS5nZXQoJ2V2ZW50X2Rlc2NyaXB0aW9uJylcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnbWF0ZXJpYWwtbGlzdC1saW5lLTInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldE1ldGFkYXRhKCkuZ2V0KCdzaG9ydF9kYXRlJylcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlckZpcnN0TGluZUxlYWYnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyRmlyc3RMaW5lTGVhZihub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBzdHlsZTogeyB3aGl0ZVNwYWNlOiAnbm9ybWFsJywgbGluZUhlaWdodDogJzI0cHgnIH0gfSxcbiAgICAgICAgICAgICAgICBub2RlLmdldE1ldGFkYXRhKCkuZ2V0KCdldmVudF9kZXNjcmlwdGlvbicpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXJTZWNvbmRMaW5lJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlclNlY29uZExpbmUobm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgd2hpdGVTcGFjZTogJ25vcm1hbCcgfSB9LFxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0TWV0YWRhdGEoKS5nZXQoJ2V2ZW50X2Rlc2NyaXB0aW9uJylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlckFjdGlvbnMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyQWN0aW9ucyhub2RlKSB7XG4gICAgICAgICAgICB2YXIgcHlkaW8gPSB0aGlzLnByb3BzLnB5ZGlvO1xuXG4gICAgICAgICAgICB2YXIgb3BlbiA9IGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgICAgICAgICAgICAgcHlkaW8uZ29Ubyhub2RlLmdldE1ldGFkYXRhKCkuZ2V0KCdyZWFsX3BhdGgnKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KE1hdGVyaWFsVUkuSWNvbkJ1dHRvbiwge1xuICAgICAgICAgICAgICAgIGljb25DbGFzc05hbWU6ICdtZGkgbWRpLWFycm93LXJpZ2h0JyxcbiAgICAgICAgICAgICAgICBvblRvdWNoVGFwOiBvcGVuLFxuICAgICAgICAgICAgICAgIGljb25TdHlsZTogeyBjb2xvcjogJ3JnYmEoMCwwLDAsMC4yMyknLCBpY29uSG92ZXJDb2xvcjogJ3JnYmEoMCwwLDAsMC42MyknIH0gfSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmVtcHR5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgICAgICAgIHZhciBweWRpbyA9IF9wcm9wcy5weWRpbztcbiAgICAgICAgICAgIHZhciBub2RlID0gX3Byb3BzLm5vZGU7XG4gICAgICAgICAgICB2YXIgZ2V0TWVzc2FnZSA9IF9wcm9wcy5nZXRNZXNzYWdlO1xuXG4gICAgICAgICAgICB2YXIgcmVuZGVySWNvbiA9IHRoaXMucmVuZGVySWNvbkZpbGU7XG4gICAgICAgICAgICB2YXIgcmVuZGVyRmlyc3RMaW5lID0gbnVsbDtcbiAgICAgICAgICAgIHZhciByZW5kZXJDdXN0b21FbnRyeSA9IG51bGw7XG4gICAgICAgICAgICB2YXIgcmVuZGVyU2Vjb25kTGluZSA9IHRoaXMucmVuZGVyU2Vjb25kTGluZTtcbiAgICAgICAgICAgIHZhciBub2RlQ2xpY2tlZCA9IGZ1bmN0aW9uIG5vZGVDbGlja2VkKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBweWRpby5nb1RvKG5vZGUuZ2V0TWV0YWRhdGEoKS5nZXQoJ3JlYWxfcGF0aCcpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAobm9kZS5pc0xlYWYoKSkge1xuICAgICAgICAgICAgICAgIHJlbmRlckN1c3RvbUVudHJ5ID0gdGhpcy5yZW5kZXJUaW1lbGluZUVudHJ5O1xuICAgICAgICAgICAgICAgIHJlbmRlckZpcnN0TGluZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmVuZGVyU2Vjb25kTGluZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmVuZGVySWNvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgbm9kZUNsaWNrZWQgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGxhYmVsID0gbm9kZS5pc0xlYWYoKSA/IGdldE1lc3NhZ2UoJ25vdGlmaWNhdGlvbl9jZW50ZXIuMTEnKSA6IGdldE1lc3NhZ2UoJ25vdGlmaWNhdGlvbl9jZW50ZXIuMTAnKTtcbiAgICAgICAgICAgIHZhciByb290ID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAobm9kZSA9PT0gcHlkaW8uZ2V0Q29udGV4dEhvbGRlcigpLmdldFJvb3ROb2RlKCkpIHtcbiAgICAgICAgICAgICAgICBsYWJlbCA9IGdldE1lc3NhZ2UoJ25vdGlmaWNhdGlvbl9jZW50ZXIuOScpO1xuICAgICAgICAgICAgICAgIHJvb3QgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgSW5mb1BhbmVsQ2FyZCxcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiBsYWJlbCwgaWNvbjogJ3B1bHNlJywgaWNvbkNvbG9yOiAnI0Y1N0MwMCcsIHN0eWxlOiB0aGlzLnByb3BzLnN0eWxlIH0sXG4gICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgIFRlbXBsYXRlLFxuICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChOb2RlTGlzdEN1c3RvbVByb3ZpZGVyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBweWRpbzogcHlkaW8sXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdmaWxlcy1saXN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRIZWlnaHQ6IFB5ZGlvQ29tcG9uZW50cy5TaW1wbGVMaXN0LkhFSUdIVF9UV09fTElORVMgKyAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0QXV0b1dpdGhNYXg6IHJvb3QgPyA0MjAgOiAzMjAsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVzZXREYXRhTW9kZWw6IHRoaXMuc3RhdGUuZGF0YU1vZGVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uQmFyR3JvdXBzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogJ3Byb3ZpZGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVUb29sYmFyOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyQ3VzdG9tRW50cnk6IHJlbmRlckN1c3RvbUVudHJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgZW50cnlSZW5kZXJJY29uOiByZW5kZXJJY29uLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW50cnlSZW5kZXJGaXJzdExpbmU6IHJlbmRlckZpcnN0TGluZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5UmVuZGVyU2Vjb25kTGluZTogcmVuZGVyU2Vjb25kTGluZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVDbGlja2VkOiBub2RlQ2xpY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTb3J0aW5nSW5mbzogeyBhdHRyaWJ1dGU6ICdldmVudF90aW1lJywgc29ydFR5cGU6ICdudW1iZXInLCBkaXJlY3Rpb246ICdkZXNjJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWxTY3JvbGxlcjogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gQWN0aXZpdHlQYW5lbDtcbn0pKF9yZWFjdDJbJ2RlZmF1bHQnXS5Db21wb25lbnQpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBBY3Rpdml0eVBhbmVsID0gUHlkaW9Db250ZXh0Q29uc3VtZXIoQWN0aXZpdHlQYW5lbCk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBBY3Rpdml0eVBhbmVsO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4iLCIvKlxuICogQ29weXJpZ2h0IDIwMDctMjAxNyBDaGFybGVzIGR1IEpldSAtIEFic3RyaXVtIFNBUyA8dGVhbSAoYXQpIHB5ZC5pbz5cbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFB5ZGlvLlxuICpcbiAqIFB5ZGlvIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogUHlkaW8gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggUHlkaW8uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVGhlIGxhdGVzdCBjb2RlIGNhbiBiZSBmb3VuZCBhdCA8aHR0cHM6Ly9weWRpby5jb20+LlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgZGVzYyA9IHBhcmVudCA9IHVuZGVmaW5lZDsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoXCJ2YWx1ZVwiIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgTm90aWZpY2F0aW9uc1BhbmVsID0gKGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKE5vdGlmaWNhdGlvbnNQYW5lbCwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBOb3RpZmljYXRpb25zUGFuZWwocHJvcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE5vdGlmaWNhdGlvbnNQYW5lbCk7XG5cbiAgICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoTm90aWZpY2F0aW9uc1BhbmVsLnByb3RvdHlwZSksIFwiY29uc3RydWN0b3JcIiwgdGhpcykuY2FsbCh0aGlzLCBwcm9wcyk7XG5cbiAgICAgICAgdmFyIHByb3ZpZGVyUHJvcGVydGllcyA9IHtcbiAgICAgICAgICAgIGdldF9hY3Rpb246IFwiZ2V0X215X2ZlZWRcIixcbiAgICAgICAgICAgIGNvbm5leGlvbl9kaXNjcmV0ZTogdHJ1ZSxcbiAgICAgICAgICAgIGZvcm1hdDogXCJ4bWxcIixcbiAgICAgICAgICAgIGZlZWRfdHlwZTogXCJhbGVydFwiLFxuICAgICAgICAgICAgbWVyZ2VfZGVzY3JpcHRpb246IFwiZmFsc2VcIlxuICAgICAgICB9O1xuICAgICAgICB2YXIgcmVwb3NpdG9yeVNjb3BlID0gJ2FsbCc7XG4gICAgICAgIGlmICghKHB5ZGlvICYmIHB5ZGlvLnVzZXIgJiYgcHlkaW8udXNlci5hY3RpdmVSZXBvc2l0b3J5ID09PSAnYWp4cF9ob21lJykpIHtcbiAgICAgICAgICAgIHByb3ZpZGVyUHJvcGVydGllc1snY3VycmVudF9yZXBvc2l0b3J5J10gPSAndHJ1ZSc7XG4gICAgICAgICAgICByZXBvc2l0b3J5U2NvcGUgPSBweWRpby51c2VyLmFjdGl2ZVJlcG9zaXRvcnk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRhdGFNb2RlbCA9IFB5ZGlvRGF0YU1vZGVsLlJlbW90ZURhdGFNb2RlbEZhY3RvcnkocHJvdmlkZXJQcm9wZXJ0aWVzLCAnTm90aWZpY2F0aW9ucycpO1xuICAgICAgICB2YXIgck5vZGUgPSBkYXRhTW9kZWwuZ2V0Um9vdE5vZGUoKTtcbiAgICAgICAgck5vZGUub2JzZXJ2ZShcImxvYWRlZFwiLCAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHVucmVhZCA9IHBhcnNlSW50KHJOb2RlLmdldE1ldGFkYXRhKCkuZ2V0KCd1bnJlYWRfbm90aWZpY2F0aW9uc19jb3VudCcpKSB8fCAwO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHVucmVhZFN0YXR1czogdW5yZWFkIH0sIHRoaXMub25TdGF0dXNDaGFuZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgIH0pLmJpbmQodGhpcykpO1xuICAgICAgICByTm9kZS5sb2FkKCk7XG5cbiAgICAgICAgaWYgKHJlcG9zaXRvcnlTY29wZSA9PT0gJ2FsbCcpIHtcbiAgICAgICAgICAgIHRoaXMuX3BlID0gbmV3IFBlcmlvZGljYWxFeGVjdXRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgck5vZGUucmVsb2FkKG51bGwsIHRydWUpO1xuICAgICAgICAgICAgfSwgOCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zbU9icyA9IChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoWE1MVXRpbHMuWFBhdGhTZWxlY3RTaW5nbGVOb2RlKGV2ZW50LCAndHJlZS9yZWxvYWRfdXNlcl9mZWVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgck5vZGUucmVsb2FkKG51bGwsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmJpbmQodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5weWRpby5vYnNlcnZlKFwic2VydmVyX21lc3NhZ2VcIiwgdGhpcy5fc21PYnMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBvcGVuOiBmYWxzZSxcbiAgICAgICAgICAgIGRhdGFNb2RlbDogZGF0YU1vZGVsLFxuICAgICAgICAgICAgcmVwb3NpdG9yeVNjb3BlOiByZXBvc2l0b3J5U2NvcGUsXG4gICAgICAgICAgICB1bnJlYWRTdGF0dXM6IDBcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoTm90aWZpY2F0aW9uc1BhbmVsLCBbe1xuICAgICAgICBrZXk6IFwib25TdGF0dXNDaGFuZ2VcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uU3RhdHVzQ2hhbmdlKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMub25VbnJlYWRTdGF0dXNDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uVW5yZWFkU3RhdHVzQ2hhbmdlKHRoaXMuc3RhdGUudW5yZWFkU3RhdHVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcImNvbXBvbmVudFdpbGxVbm1vdW50XCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zbU9icykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucHlkaW8uc3RvcE9ic2VydmluZyhcInNlcnZlcl9tZXNzYWdlXCIsIHRoaXMuX3NtT2JzKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fcGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wZS5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogXCJoYW5kbGVUb3VjaFRhcFwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlVG91Y2hUYXAoZXZlbnQpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgcHJldmVudHMgZ2hvc3QgY2xpY2suXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUudW5yZWFkU3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVBbGVydHNMYXN0UmVhZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgb3BlbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhbmNob3JFbDogZXZlbnQuY3VycmVudFRhcmdldCxcbiAgICAgICAgICAgICAgICB1bnJlYWRTdGF0dXM6IDBcbiAgICAgICAgICAgIH0sIHRoaXMub25TdGF0dXNDaGFuZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogXCJoYW5kbGVSZXF1ZXN0Q2xvc2VcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVJlcXVlc3RDbG9zZSgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIG9wZW46IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcInJlbmRlckljb25cIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckljb24obm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUHlkaW9Xb3Jrc3BhY2VzLkZpbGVQcmV2aWV3LCB7XG4gICAgICAgICAgICAgICAgbG9hZFRodW1ibmFpbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBub2RlOiBub2RlLFxuICAgICAgICAgICAgICAgIHB5ZGlvOiB0aGlzLnByb3BzLnB5ZGlvLFxuICAgICAgICAgICAgICAgIHJvdW5kZWQ6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6IFwicmVuZGVyU2Vjb25kTGluZVwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyU2Vjb25kTGluZShub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZS5nZXRNZXRhZGF0YSgpLmdldCgnZXZlbnRfZGVzY3JpcHRpb24nKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcInJlbmRlckFjdGlvbnNcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckFjdGlvbnMobm9kZSkge1xuICAgICAgICAgICAgdmFyIHRvdWNoVGFwID0gKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzbWlzc0FsZXJ0KG5vZGUpO1xuICAgICAgICAgICAgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE1hdGVyaWFsVUkuSWNvbkJ1dHRvbiwge1xuICAgICAgICAgICAgICAgIGljb25DbGFzc05hbWU6IFwibWRpIG1kaS1jbG9zZVwiLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRvdWNoVGFwLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7IHdpZHRoOiAzNiwgaGVpZ2h0OiAzNiwgcGFkZGluZzogNiB9LFxuICAgICAgICAgICAgICAgIGljb25TdHlsZTogeyBjb2xvcjogJ3JnYmEoMCwwLDAsLjIzKScsIGhvdmVyQ29sb3I6ICdyZ2JhKDAsMCwwLC43MyknIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6IFwiZW50cnlDbGlja2VkXCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBlbnRyeUNsaWNrZWQobm9kZSkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVSZXF1ZXN0Q2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMucHlkaW8uZ29Ubyhub2RlKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcImRpc21pc3NBbGVydFwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGlzbWlzc0FsZXJ0KG5vZGUpIHtcbiAgICAgICAgICAgIHZhciBhbGVydElkID0gbm9kZS5nZXRNZXRhZGF0YSgpLmdldCgnYWxlcnRfaWQnKTtcbiAgICAgICAgICAgIHZhciBvY2N1cmVuY2VzID0gbm9kZS5nZXRNZXRhZGF0YSgpLmdldCgnZXZlbnRfb2NjdXJlbmNlJyk7XG4gICAgICAgICAgICBQeWRpb0FwaS5nZXRDbGllbnQoKS5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBnZXRfYWN0aW9uOiAnZGlzbWlzc191c2VyX2FsZXJ0JyxcbiAgICAgICAgICAgICAgICBhbGVydF9pZDogYWxlcnRJZCxcbiAgICAgICAgICAgICAgICAvLyBXYXJuaW5nLCBvY2N1cnJlbmNlcyBwYXJhbWV0ZXIgZXhwZWN0cyAyICdyJ1xuICAgICAgICAgICAgICAgIG9jY3VycmVuY2VzOiBvY2N1cmVuY2VzXG4gICAgICAgICAgICB9LCAoZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnMubGlzdC5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdW5yZWFkU3RhdHVzOiAwIH0sIHRoaXMub25TdGF0dXNDaGFuZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9KS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcInVwZGF0ZUFsZXJ0c0xhc3RSZWFkXCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVBbGVydHNMYXN0UmVhZCgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIFB5ZGlvQXBpLmdldENsaWVudCgpLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIGdldF9hY3Rpb246ICd1cGRhdGVfYWxlcnRzX2xhc3RfcmVhZCcsXG4gICAgICAgICAgICAgICAgcmVwb3NpdG9yeV9zY29wZTogdGhpcy5zdGF0ZS5yZXBvc2l0b3J5U2NvcGVcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh0cmFuc3ApIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7IHVucmVhZFN0YXR1czogMCB9LCBfdGhpcy5vblN0YXR1c0NoYW5nZS5iaW5kKF90aGlzKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcInJlbmRlclwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuXG4gICAgICAgICAgICB2YXIgTElTVCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoUHlkaW9Db21wb25lbnRzLk5vZGVMaXN0Q3VzdG9tUHJvdmlkZXIsIHtcbiAgICAgICAgICAgICAgICByZWY6IFwibGlzdFwiLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2ZpbGVzLWxpc3QgJyArICh0aGlzLnByb3BzLmxpc3RDbGFzc05hbWUgfHwgJycpLFxuICAgICAgICAgICAgICAgIGhpZGVUb29sYmFyOiB0cnVlLFxuICAgICAgICAgICAgICAgIHB5ZGlvOiB0aGlzLnByb3BzLnB5ZGlvLFxuICAgICAgICAgICAgICAgIGVsZW1lbnRIZWlnaHQ6IFB5ZGlvQ29tcG9uZW50cy5TaW1wbGVMaXN0LkhFSUdIVF9UV09fTElORVMgKyAyLFxuICAgICAgICAgICAgICAgIGhlaWdodEF1dG9XaXRoTWF4OiB0aGlzLnByb3BzLmxpc3RPbmx5ID8gbnVsbCA6IDUwMCxcbiAgICAgICAgICAgICAgICBwcmVzZXREYXRhTW9kZWw6IHRoaXMuc3RhdGUuZGF0YU1vZGVsLFxuICAgICAgICAgICAgICAgIHJlbG9hZEF0Q3Vyc29yOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFjdGlvbkJhckdyb3VwczogW10sXG4gICAgICAgICAgICAgICAgZW50cnlSZW5kZXJJY29uOiB0aGlzLnJlbmRlckljb24uYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICBlbnRyeVJlbmRlclNlY29uZExpbmU6IHRoaXMucmVuZGVyU2Vjb25kTGluZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgIGVudHJ5UmVuZGVyQWN0aW9uczogdGhpcy5yZW5kZXJBY3Rpb25zLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgbm9kZUNsaWNrZWQ6IHRoaXMuZW50cnlDbGlja2VkLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgZW1wdHlTdGF0ZVByb3BzOiBfZXh0ZW5kcyh7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7IHBhZGRpbmdUb3A6IDIwLCBwYWRkaW5nQm90dG9tOiAyMCB9LFxuICAgICAgICAgICAgICAgICAgICBpY29uQ2xhc3NOYW1lOiAnbWRpIG1kaS1iZWxsLW9mZicsXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnlUZXh0SWQ6ICdub3RpZmljYXRpb25fY2VudGVyLjE0JyxcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5VGV4dElkOiAnbm90aWZpY2F0aW9uX2NlbnRlci4xNSdcbiAgICAgICAgICAgICAgICB9LCB0aGlzLnByb3BzLmVtcHR5U3RhdGVQcm9wcylcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5saXN0T25seSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBMSVNUO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgIE1hdGVyaWFsVUkuQmFkZ2UsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhZGdlQ29udGVudDogdGhpcy5zdGF0ZS51bnJlYWRTdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogdGhpcy5zdGF0ZS51bnJlYWRTdGF0dXMgPyB7IHBhZGRpbmc6ICcwIDI0cHggMCAwJyB9IDogeyBwYWRkaW5nOiAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWRnZVN0eWxlOiAhdGhpcy5zdGF0ZS51bnJlYWRTdGF0dXMgPyB7IGRpc3BsYXk6ICdub25lJyB9IDogbnVsbFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1hdGVyaWFsVUkuSWNvbkJ1dHRvbiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25Ub3VjaFRhcDogdGhpcy5oYW5kbGVUb3VjaFRhcC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbkNsYXNzTmFtZTogdGhpcy5wcm9wcy5pY29uQ2xhc3NOYW1lIHx8IFwiaWNvbi1iZWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiB0aGlzLnByb3BzLnB5ZGlvLk1lc3NhZ2VIYXNoWydub3RpZmljYXRpb25fY2VudGVyLjQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1c2VyQWN0aW9uQnV0dG9uIGFsZXJ0c0J1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICBNYXRlcmlhbFVJLlBvcG92ZXIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46IHRoaXMuc3RhdGUub3BlbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuY2hvckVsOiB0aGlzLnN0YXRlLmFuY2hvckVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW5jaG9yT3JpZ2luOiB7IGhvcml6b250YWw6ICdsZWZ0JywgdmVydGljYWw6ICdib3R0b20nIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRPcmlnaW46IHsgaG9yaXpvbnRhbDogJ2xlZnQnLCB2ZXJ0aWNhbDogJ3RvcCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVxdWVzdENsb3NlOiB0aGlzLmhhbmRsZVJlcXVlc3RDbG9zZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHsgd2lkdGg6IDMyMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgekRlcHRoOiAyXG5cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgTElTVFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gTm90aWZpY2F0aW9uc1BhbmVsO1xufSkoUmVhY3QuQ29tcG9uZW50KTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBOb3RpZmljYXRpb25zUGFuZWw7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuIiwiLypcbiAqIENvcHlyaWdodCAyMDA3LTIwMTcgQ2hhcmxlcyBkdSBKZXUgLSBBYnN0cml1bSBTQVMgPHRlYW0gKGF0KSBweWQuaW8+XG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBQeWRpby5cbiAqXG4gKiBQeWRpbyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFB5ZGlvIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIFB5ZGlvLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICpcbiAqIFRoZSBsYXRlc3QgY29kZSBjYW4gYmUgZm91bmQgYXQgPGh0dHBzOi8vcHlkaW8uY29tPi5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlKG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iajsgfVxuXG52YXIgX1BhbmVsID0gcmVxdWlyZShcIi4vUGFuZWxcIik7XG5cbmV4cG9ydHMuUGFuZWwgPSBfaW50ZXJvcFJlcXVpcmUoX1BhbmVsKTtcblxudmFyIF9BY3Rpdml0eVBhbmVsID0gcmVxdWlyZShcIi4vQWN0aXZpdHlQYW5lbFwiKTtcblxuZXhwb3J0cy5BY3Rpdml0eVBhbmVsID0gX2ludGVyb3BSZXF1aXJlKF9BY3Rpdml0eVBhbmVsKTtcbiJdfQ==
