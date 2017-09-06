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

    var LeftPanel = React.createClass({
        displayName: 'LeftPanel',

        propTypes: {
            pydio: React.PropTypes.instanceOf(Pydio)
        },

        getInitialState: function getInitialState() {
            return { meta_filter: null };
        },

        handleChange: function handleChange(event) {
            var value = event.target.value;
            if (value) value += '*';
            document.getElementById('content_pane').ajxpPaneObject.addMetadataFilter('text', value);
        },

        filterByShareMetaType: function filterByShareMetaType(type, event) {
            if (type == '-1') {
                type = '';
            }
            this.setState({ meta_filter: type });
            document.getElementById('content_pane').ajxpPaneObject.addMetadataFilter('share_meta_type', type);
        },

        render: function render() {
            var messages = this.props.pydio.MessageHash;
            return React.createElement(
                'div',
                { className: 'inbox-left-panel' },
                React.createElement(
                    'h3',
                    { className: 'colorcode-folder' },
                    messages['inbox_driver.6']
                ),
                React.createElement(
                    'div',
                    null,
                    messages['inbox_driver.7']
                ),
                React.createElement(
                    'h4',
                    null,
                    messages['inbox_driver.8']
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h5',
                        null,
                        messages['inbox_driver.9']
                    ),
                    React.createElement('input', { type: 'text', placeholder: 'Filter...', onChange: this.handleChange })
                ),
                React.createElement(
                    'div',
                    { style: { paddingTop: 20 } },
                    React.createElement(
                        'h5',
                        null,
                        React.createElement(
                            'span',
                            { className: 'clear', onClick: this.filterByShareMetaType.bind(this, '-1') },
                            messages['inbox_driver.11']
                        ),
                        messages['inbox_driver.10']
                    ),
                    React.createElement(
                        'span',
                        { className: (this.state.meta_filter === '0' ? 'active' : '') + " share_meta_filter", onClick: this.filterByShareMetaType.bind(this, '0') },
                        messages['inbox_driver.1p']
                    ),
                    React.createElement(
                        'span',
                        { className: (this.state.meta_filter === '1' ? 'active' : '') + " share_meta_filter", onClick: this.filterByShareMetaType.bind(this, '1') },
                        messages['inbox_driver.2p']
                    ),
                    React.createElement(
                        'span',
                        { className: (this.state.meta_filter === '2' ? 'active' : '') + " share_meta_filter", onClick: this.filterByShareMetaType.bind(this, '2') },
                        messages['inbox_driver.3p']
                    )
                )
            );
        }

    });

    function filesListCellModifier(element, ajxpNode, type, metadataDef, ajxpNodeObject) {

        var messages = global.pydio.MessageHash;
        if (element != null) {
            var nodeMetaValue = ajxpNode.getMetadata().get('share_meta_type');
            var nodeMetaLabel;
            if (nodeMetaValue == "0") nodeMetaLabel = messages['inbox_driver.1'];else if (nodeMetaValue == "1") nodeMetaLabel = messages['inbox_driver.2'];else if (nodeMetaValue == "2") nodeMetaLabel = messages['inbox_driver.3'];
            if (element.down('.text_label')) {
                element.down('.text_label').update(nodeMetaLabel);
            }
            var mainElement;
            if (element.up('.ajxpNodeProvider')) {
                mainElement = element.up('.ajxpNodeProvider');
            } else if (ajxpNodeObject) {
                mainElement = ajxpNodeObject;
            } else {
                console.log(element, ajxpNodeObject);
            }
            if (mainElement) {
                mainElement.addClassName('share_meta_type_' + nodeMetaValue);
            }

            if (type == 'row') {
                element.writeAttribute("data-sorter_value", nodeMetaValue);
            } else {
                element.writeAttribute("data-" + metadataDef.attributeName + "-sorter_value", nodeMetaValue);
            }

            var obj = document.getElementById('content_pane').ajxpPaneObject;
            var colIndex;
            obj.columnsDef.map((function (c, index) {
                if (c.attributeName == "share_meta_type") {
                    colIndex = index;
                }
            }).bind(this));
            if (colIndex !== undefined) {
                obj._sortableTable.sort(colIndex, false);
                obj._sortableTable.updateHeaderArrows();
            }
        }
    }

    var pydio = global.pydio;

    var Callbacks = (function () {
        function Callbacks() {
            _classCallCheck(this, Callbacks);
        }

        _createClass(Callbacks, null, [{
            key: 'download',
            value: function download() {
                PydioApi.getClient().downloadSelection(pydio.getUserSelection(), 'download');
            }
        }, {
            key: 'copyInbox',
            value: function copyInbox() {
                var MessageHash = pydio.MessageHash;

                pydio.user.write = false;
                var selection = pydio.getUserSelection();
                var submit = function submit(path) {
                    var wsId = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

                    global.FSActions.Callbacks.applyCopyOrMove('copy', selection, path, wsId);
                };
                pydio.UI.openComponentInModal('FSActions', 'TreeDialog', {
                    isMove: false,
                    dialogTitle: MessageHash[159],
                    submitValue: submit
                });
            }
        }, {
            key: 'acceptInvitation',
            value: function acceptInvitation() {
                var remoteShareId = pydio.getUserSelection().getUniqueNode().getMetadata().get("remote_share_id");
                PydioApi.getClient().request({ get_action: 'accept_invitation', remote_share_id: remoteShareId }, function () {
                    pydio.fireContextRefresh();
                });
            }
        }, {
            key: 'rejectInvitation',
            value: function rejectInvitation() {
                var remoteShareId = pydio.getUserSelection().getUniqueNode().getMetadata().get("remote_share_id");
                PydioApi.getClient().request({ get_action: 'reject_invitation', remote_share_id: remoteShareId }, function () {
                    pydio.fireContextRefresh();
                });
            }
        }, {
            key: 'rejectRemoteShare',
            value: function rejectRemoteShare() {
                var remoteShareId = pydio.getUserSelection().getUniqueNode().getMetadata().get("remote_share_id");
                PydioApi.getClient().request({ get_action: 'reject_invitation', remote_share_id: remoteShareId }, function () {
                    pydio.fireContextRefresh();
                });
            }
        }, {
            key: 'copyContextListener',
            value: function copyContextListener() {
                this.rightsContext.write = true;
                var ajxpUser = pydio.user;
                if (ajxpUser && ajxpUser.canCrossRepositoryCopy() && ajxpUser.hasCrossRepositories()) {
                    this.rightsContext.write = false;
                    pydio.getController().defaultActions['delete']('ctrldragndrop');
                    pydio.getController().defaultActions['delete']('dragndrop');
                }
            }
        }]);

        return Callbacks;
    })();

    global.InboxWidgets = {
        filesListCellModifier: filesListCellModifier,
        LeftPanel: LeftPanel,
        Callbacks: Callbacks
    };
})(window);
