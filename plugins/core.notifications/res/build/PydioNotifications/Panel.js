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
