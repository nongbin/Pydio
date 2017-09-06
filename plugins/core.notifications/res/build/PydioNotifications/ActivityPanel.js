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
