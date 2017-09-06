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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (global) {

    var pydio = global.pydio;

    var loadHistoryBrowser = function loadHistoryBrowser() {

        pydio.UI.openComponentInModal('PydioVersioning', 'HistoryDialog', { node: pydio.getContextHolder().getUniqueNode() });
    };

    var HistoryApi = (function () {
        function HistoryApi(node) {
            _classCallCheck(this, HistoryApi);

            this.node = node;
        }

        _createClass(HistoryApi, [{
            key: 'getDataModel',
            value: function getDataModel() {
                if (!this.versionsDm) {
                    var provider = new RemoteNodeProvider({ get_action: 'git_history', file: this.node.getPath() });
                    this.versionsDm = new PydioDataModel(true);
                    this.versionsDm.setAjxpNodeProvider(provider);
                    this.versionsRoot = new AjxpNode("/", false, "Versions", "folder.png", provider);
                    this.versionsDm.setRootNode(this.versionsRoot);
                }
                return this.versionsDm;
            }
        }, {
            key: 'openVersion',
            value: function openVersion(file, commit_id) {
                var download = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

                if (download) {
                    PydioApi.getClient().downloadSelection(null, 'git_getfile', {
                        file: file,
                        commit_id: commit_id,
                        attach: 'download'
                    });
                } else {
                    var src = pydio.Parameters.get('ajxpServerAccess') + '&get_action=git_file&attach=inline' + '&file=' + encodeURIComponent(file) + '&commit_id=' + commit_id;
                    global.open(src);
                }
            }
        }, {
            key: 'revertToVersion',
            value: function revertToVersion(originalFilePath, file, commit_id) {
                var callback = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

                if (!global.confirm(pydio.MessageHash["meta.git.13"])) {
                    return;
                }
                PydioApi.getClient().request({
                    get_action: 'git_revertfile',
                    original_file: originalFilePath,
                    file: file,
                    commit_id: commit_id
                }, function (transport) {
                    PydioApi.getClient().parseXmlMessage(transport.responseXML);
                    if (callback) callback(transport);
                });
            }
        }]);

        return HistoryApi;
    })();

    var HistoryBrowser = React.createClass({
        displayName: 'HistoryBrowser',

        propTypes: {
            node: React.PropTypes.instanceOf(AjxpNode).isRequired,
            onRequestClose: React.PropTypes.func
        },

        propsToState: function propsToState(node) {
            var api = new HistoryApi(node);
            this._selectionObserver = (function () {
                if (api.getDataModel().isEmpty()) {
                    this.setState({ selectedNode: null });
                } else {
                    this.setState({ selectedNode: api.getDataModel().getUniqueNode() });
                }
            }).bind(this);
            api.getDataModel().observe('selection_changed', this._selectionObserver);
            return { api: api };
        },
        getInitialState: function getInitialState() {
            return this.propsToState(this.props.node);
        },
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            if (nextProps.node !== this.props.node) {
                if (this._selectionObserver) {
                    this.state.api.getDataModel().stopObserving('selection_changed', this._selectionObserver);
                }
                this.setState(this.propsToState(nextProps.node));
            }
        },
        nodeClicked: function nodeClicked(node, clickType, event) {
            this.state.api.getDataModel().setSelectedNodes([node]);
        },
        applyAction: function applyAction(action) {
            var file = this.state.selectedNode.getMetadata().get('FILE');
            var commitId = this.state.selectedNode.getMetadata().get('ID');
            var originalPath = this.props.node.getPath();
            switch (action) {
                case 'dl':
                    this.state.api.openVersion(file, commitId, true);
                    break;
                case 'open':
                    this.state.api.openVersion(file, commitId, false);
                    break;
                case 'revert':
                    this.state.api.revertToVersion(originalPath, file, commitId, (function () {
                        if (this.props.onRequestClose) this.props.onRequestClose();
                    }).bind(this));
                    break;
                default:
                    break;
            }
        },
        render: function render() {

            var mess = pydio.MessageHash;
            var tableKeys = {
                index: { label: mess['meta.git.9'], sortType: 'string', width: '5%' },
                ajxp_modiftime: { label: mess['meta.git.10'], sortType: 'string', width: '40%' },
                MESSAGE: { label: mess['meta.git.11'], sortType: 'string', width: '20%' },
                EVENT: { label: mess['meta.git.12'], sortType: 'string', width: '20%' }
            };

            var disabled = !this.state.selectedNode;
            return React.createElement(
                'div',
                null,
                React.createElement(
                    MaterialUI.Toolbar,
                    null,
                    React.createElement(
                        MaterialUI.ToolbarGroup,
                        { firstChild: true },
                        React.createElement(MaterialUI.FlatButton, { style: !disabled ? { color: 'white' } : {}, disabled: disabled, label: mess['meta.git.3'], tooltip: mess['meta.git.4'], onTouchTap: this.applyAction.bind(this, 'dl') }),
                        React.createElement(MaterialUI.FlatButton, { style: !disabled ? { color: 'white' } : {}, disabled: disabled, label: mess['meta.git.5'], tooltip: mess['meta.git.6'], onTouchTap: this.applyAction.bind(this, 'open') }),
                        React.createElement(MaterialUI.FlatButton, { style: !disabled ? { color: 'white' } : {}, disabled: disabled, label: mess['meta.git.7'], tooltip: mess['meta.git.8'], onTouchTap: this.applyAction.bind(this, 'revert') })
                    )
                ),
                React.createElement(PydioComponents.NodeListCustomProvider, {
                    presetDataModel: this.state.api.getDataModel(),
                    actionBarGroups: [],
                    elementHeight: PydioComponents.SimpleList.HEIGHT_ONE_LINE,
                    tableKeys: tableKeys,
                    entryHandleClicks: this.nodeClicked
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
        HistoryBrowser = ReactDND.DragDropContext(FakeDndBackend)(HistoryBrowser);
    }

    var HistoryDialog = React.createClass({
        displayName: 'HistoryDialog',

        mixins: [PydioReactUI.ActionDialogMixin, PydioReactUI.SubmitButtonProviderMixin],

        getDefaultProps: function getDefaultProps() {
            return {
                dialogTitle: '',
                dialogIsModal: false,
                dialogSize: 'lg',
                dialogPadding: false
            };
        },
        submit: function submit() {
            this.dismiss();
        },
        render: function render() {
            return React.createElement(
                'div',
                { style: { width: '100%' }, className: 'layout-fill vertical-layout' },
                React.createElement(HistoryBrowser, { node: this.props.node, onRequestClose: this.dismiss })
            );
        }

    });

    global.PydioVersioning = {
        loadHistoryBrowser: loadHistoryBrowser,
        HistoryDialog: HistoryDialog
    };
})(window);
