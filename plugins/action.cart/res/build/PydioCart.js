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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (global) {

    var pydio = global.pydio;
    var MessageHash = pydio.MessageHash;

    var LocalNodeProvider = (function () {
        function LocalNodeProvider() {
            _classCallCheck(this, LocalNodeProvider);
        }

        _createClass(LocalNodeProvider, [{
            key: "loadNode",

            /**
             *
             * @param node AjxpNode
             * @param nodeCallback Function
             * @param childCallback Function
             */
            value: function loadNode(node, nodeCallback, childCallback) {
                node.setLoaded(true);
                nodeCallback(node);
                if (childCallback) {
                    node.getChildren().forEach(function (n) {
                        childCallback(n);
                    });
                }
            }
        }, {
            key: "loadLeafNodeSync",
            value: function loadLeafNodeSync(node, callback) {}
        }]);

        return LocalNodeProvider;
    })();

    var Model = (function (_Observable) {
        _inherits(Model, _Observable);

        function Model() {
            _classCallCheck(this, Model);

            _get(Object.getPrototypeOf(Model.prototype), "constructor", this).call(this);
            var provider = new LocalNodeProvider();
            this.dm = new PydioDataModel(true);
            this.dm.setAjxpNodeProvider(provider);
            this.root = new AjxpNode("/", false, "Cart", "folder.png", provider);
            this.dm.setRootNode(this.root);
            this.__maxChildren = 100;
        }

        _createClass(Model, [{
            key: "localNodeFromRemoteNode",
            value: function localNodeFromRemoteNode(n) {

                if (this.root.findChildByPath(n.getPath())) return;
                var newNode = new AjxpNode(n.getPath(), n.isLeaf(), n.getLabel(), n.getIcon());
                var mapCopy = new Map();
                n.getMetadata().forEach(function (v, k) {
                    mapCopy.set(k, v);
                });
                newNode.setMetadata(mapCopy);
                this.root.addChild(newNode);
                this.notify("update");
            }
        }, {
            key: "recurseLeafs",
            value: function recurseLeafs(node) {

                if (this.root.getChildren().size > this.__maxChildren) {
                    pydio.displayMessage('ERROR', 'Stopping recursion: please do not select more than ' + this.__maxChildren + ' at once!');
                    throw $break;
                }

                if (node.isLoaded()) {
                    node.getChildren().forEach((function (n) {
                        if (n.isLeaf()) {
                            this.localNodeFromRemoteNode(n);
                        } else {
                            this.recurseLeafs(n);
                        }
                    }).bind(this));
                } else {
                    node.observeOnce("loaded", (function () {
                        this.recurseLeafs(node);
                    }).bind(this));
                    node.load();
                }
            }
        }, {
            key: "buildSelection",
            value: function buildSelection() {
                var sel = {},
                    i = 0;
                this.root.getChildren().forEach(function (n) {
                    var key = "file_" + i;
                    sel[key] = n.getPath();
                    i++;
                });
                return sel;
            }
        }, {
            key: "buildZipName",
            value: function buildZipName() {
                var zipName = global.prompt(MessageHash['action.cart.14'], 'Cart.zip');
                if (!zipName) return null;
                var index = 1;
                var buff = zipName;
                while (pydio.getContextHolder().fileNameExists(zipName + ".zip", true, pydio.getContextHolder().getRootNode())) {
                    zipName = buff + "-" + index;index++;
                }
                return zipName;
            }
        }, {
            key: "clearContent",
            value: function clearContent() {
                this.root.clear();
                this.notify("update");
            }
        }, {
            key: "removeNode",
            value: function removeNode(node) {
                this.root.removeChild(node);
                this.notify("update");
            }
        }, {
            key: "downloadContent",
            value: function downloadContent() {
                var sel = this.buildSelection();
                if (!Object.keys(sel).length) return;
                var params = _extends({}, sel, { dir: '__AJXP_ZIP_FLAT__/', archive_name: 'Cart.zip' });
                PydioApi.getClient().downloadSelection(null, 'download', params);
            }
        }, {
            key: "compressContentAndShare",
            value: function compressContentAndShare() {
                var sel = this.buildSelection();
                if (!Object.keys(sel).length) return;
                var zipName = this.buildZipName();
                if (!zipName) return;
                var params = _extends({}, sel, { get_action: 'compress', compress_flat: 'true', dir: '/', archive_name: zipName });
                PydioApi.getClient().request(params, function (transport) {
                    var success = PydioApi.getClient().parseXmlMessage(transport.responseXML);
                    if (success) {
                        var contextHolder = pydio.getContextHolder();
                        contextHolder.setPendingSelection(zipName);
                        contextHolder.requireContextChange(contextHolder.getRootNode());
                    }
                });
            }
        }, {
            key: "getDataModel",
            value: function getDataModel() {
                return this.dm;
            }
        }], [{
            key: "getInstance",
            value: function getInstance() {
                if (!Model._INSTANCE) {
                    Model._INSTANCE = new Model();
                }
                return Model._INSTANCE;
            }
        }]);

        return Model;
    })(Observable);

    var CartPanel = React.createClass({
        displayName: "CartPanel",

        clearContent: function clearContent() {
            Model.getInstance().clearContent();
        },

        download: function download() {
            Model.getInstance().downloadContent();
        },

        zipAndShare: function zipAndShare() {
            Model.getInstance().compressContentAndShare();
        },

        renderActions: function renderActions(node) {
            return React.createElement(MaterialUI.IconButton, {
                first: true,
                iconClassName: "mdi mdi-close",
                iconStyle: { color: 'rgba(0,0,0,0.23)', iconHoverColor: 'rgba(0,0,0,0.53)', fontSize: 18 },
                tooltip: MessageHash['action.cart.16'],
                tooltipPosition: "bottom-left",
                onTouchTap: function () {
                    Model.getInstance().removeNode(node);
                }
            });
        },

        renderIcon: function renderIcon(node) {
            return React.createElement(PydioWorkspaces.FilePreview, { rounded: true, roundedSize: 36, style: { margin: '8px 15px' }, node: node, loadThumbnail: true, richPreview: false });
        },

        render: function render() {

            var dataModel = Model.getInstance().getDataModel();
            var disabled = false;
            if (!dataModel.getRootNode().getChildren().size) {
                disabled = true;
            }
            var iconStyle = {
                color: 'rgba(255,255,255,.83)',
                iconHoverColor: 'rgba(255,255,255,1)'
            };

            return React.createElement(
                "div",
                { style: { width: 320, height: 400 }, className: "vertical_layout" },
                React.createElement(
                    MaterialUI.Toolbar,
                    null,
                    React.createElement(
                        MaterialUI.ToolbarGroup,
                        { firstChild: true },
                        React.createElement(MaterialUI.IconButton, { iconClassName: "mdi mdi-file-plus", iconStyle: iconStyle, disabled: pydio.getContextHolder().isEmpty(), tooltipPosition: "bottom-right", tooltip: MessageHash['action.cart.2'], onTouchTap: Callbacks.addCurrentSelection }),
                        React.createElement(MaterialUI.IconButton, { iconClassName: "mdi mdi-delete", iconStyle: iconStyle, disabled: disabled, tooltip: MessageHash['action.cart.3'], onTouchTap: this.clearContent })
                    ),
                    React.createElement("span", { style: { flex: 1 } }),
                    React.createElement(
                        MaterialUI.ToolbarGroup,
                        { lastChild: true },
                        React.createElement(MaterialUI.IconButton, { iconClassName: "mdi mdi-download", iconStyle: iconStyle, disabled: disabled, tooltip: MessageHash['action.cart.7'], onTouchTap: this.download }),
                        React.createElement(MaterialUI.IconButton, { iconClassName: "mdi mdi-archive", iconStyle: iconStyle, disabled: disabled, tooltip: MessageHash['action.cart.11'], tooltipPosition: "bottom-left", onTouchTap: this.zipAndShare })
                    )
                ),
                React.createElement(PydioComponents.NodeListCustomProvider, {
                    presetDataModel: dataModel,
                    actionBarGroups: [],
                    elementHeight: PydioComponents.SimpleList.HEIGHT_ONE_LINE,
                    hideToolbar: true,
                    entryRenderActions: this.renderActions,
                    entryRenderIcon: this.renderIcon,
                    emptyStateProps: {
                        iconClassName: 'mdi mdi-file-plus',
                        primaryTextId: 'action.cart.17',
                        secondaryTextId: 'action.cart.18'
                    }
                })
            );
        }
    });

    if (global.ReactDND) {
        var FakeDndBackend = function FakeDndBackend() {
            return {
                setup: function setup() {},
                teardown: function teardown() {},
                connectDragSource: function connectDragSource() {},
                connectDragPreview: function connectDragPreview() {},
                connectDropTarget: function connectDropTarget() {}
            };
        };
        CartPanel = ReactDND.DragDropContext(FakeDndBackend)(CartPanel);
    }

    var CartMounter = React.createClass({
        displayName: "CartMounter",

        componentDidMount: function componentDidMount() {
            this.updateActions();
            Model.getInstance().observe('update', this.updateActions);
        },

        componentWillUnmount: function componentWillUnmount() {
            this.getPydioActions(true).map((function (key) {
                pydio.getController().deleteFromGuiActions(key);
            }).bind(this));
            Model.getInstance().stopObserving('update', this.updateActions);
        },

        updateActions: function updateActions() {
            pydio.getController().updateGuiActions(this.getPydioActions());
            pydio.getController().notify("actions_refreshed");
        },

        getInitialState: function getInitialState() {
            return { panel: React.createElement(CartPanel, null) };
        },

        getPydioActions: function getPydioActions() {
            var keysOnly = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            if (keysOnly) {
                return ['openCartPanel'];
            }
            var size = Model.getInstance().getDataModel().getRootNode().getChildren().size;
            var openCartPanel = new Action({
                name: 'openCartPanel',
                icon_class: size ? 'mdi mdi-cart' : 'mdi mdi-cart-outline',
                text_id: 'action.cart.10',
                title_id: 'action.cart.10',
                text: MessageHash['action.cart.10'],
                title: MessageHash['action.cart.10'],
                hasAccessKey: false,
                subMenu: true,
                subMenuUpdateImage: true
            }, {
                selection: false,
                dir: true,
                actionBar: true,
                actionBarGroup: 'display_toolbar',
                contextMenu: false,
                infoPanel: false
            }, {}, {}, {
                popoverContent: this.state.panel
            });
            var buttons = new Map();
            buttons.set('openCartPanel', openCartPanel);
            return buttons;
        },

        render: function render() {
            return null;
        }

    });

    var Callbacks = (function () {
        function Callbacks() {
            _classCallCheck(this, Callbacks);
        }

        _createClass(Callbacks, null, [{
            key: "addCurrentSelection",
            value: function addCurrentSelection() {

                var model = Model.getInstance();
                pydio.getContextHolder().getSelectedNodes().map(function (n) {
                    if (n.isLeaf()) {
                        model.localNodeFromRemoteNode(n);
                    } else {
                        model.recurseLeafs(n);
                    }
                });
            }
        }]);

        return Callbacks;
    })();

    global.PydioCart = {
        Callbacks: Callbacks,
        CartPanel: CartPanel,
        CartMounter: CartMounter
    };
})(window);
