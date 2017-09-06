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

    var CompressionDialog = React.createClass({
        displayName: 'CompressionDialog',

        mixins: [PydioReactUI.ActionDialogMixin, PydioReactUI.CancelButtonProviderMixin, PydioReactUI.SubmitButtonProviderMixin],

        getDefaultProps: function getDefaultProps() {
            var formats = ['zip', 'tar', 'tar.gz', 'tar.bz2'];
            if (!global.pydio.Parameters.get('multipleFilesDownloadEnabled')) {
                formats.pop();
            }
            return {
                dialogTitleId: 313,
                legendId: 314,
                dialogIsModal: true,
                formats: formats
            };
        },

        getInitialState: function getInitialState() {

            var baseName = undefined;
            var userSelection = this.props.userSelection;

            if (userSelection.isUnique()) {
                baseName = PathUtils.getBasename(userSelection.getUniqueFileName());
                if (!userSelection.hasDir()) baseName = baseName.substr(0, baseName.lastIndexOf("\."));
            } else {
                baseName = PathUtils.getBasename(userSelection.getContextNode().getPath());
                if (baseName == "") baseName = "Archive";
            }
            var defaultCompression = this.props.formats[0];

            return {
                archiveBase: baseName,
                compression: defaultCompression,
                fileName: this.buildUniqueFileName(baseName, defaultCompression)
            };
        },

        buildUniqueFileName: function buildUniqueFileName(base, extension) {
            var index = 1;
            var result = base;
            var buff = base;
            while (this.props.userSelection.fileNameExists(result + '.' + extension, true)) {
                result = buff + "-" + index;index++;
            }
            return result;
        },

        textFieldChange: function textFieldChange(event, newValue) {
            this.setState({
                archiveBase: newValue,
                fileName: this.buildUniqueFileName(newValue, this.state.compression)
            });
        },

        selectFieldChange: function selectFieldChange(event, index, payload) {
            console.log(payload);
            this.setState({
                compression: payload,
                fileName: this.buildUniqueFileName(this.state.archiveBase, payload)
            });
        },

        submit: function submit() {
            var client = PydioApi.getClient();
            client.postSelectionWithAction(this.state.compression === 'zip' ? 'compress' : 'compression', (function (transp) {
                client.parseXmlMessage(transp.responseXML);
                this.dismiss();
            }).bind(this), this.props.userSelection, {
                type_archive: this.state.compression,
                archive_name: this.state.fileName + '.' + this.state.compression
            });
        },

        render: function render() {
            var formatMenus = this.props.formats.map(function (f) {
                return React.createElement(MaterialUI.MenuItem, { value: f, primaryText: '.' + f });
            });

            var messages = pydio.MessageHash;
            var _state = this.state;
            var compression = _state.compression;
            var fileName = _state.fileName;

            var flStyle = {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            };

            return React.createElement(
                'div',
                { style: { display: 'flex' } },
                React.createElement(MaterialUI.TextField, { style: { width: 210, marginRight: 10 }, onChange: this.textFieldChange, value: fileName, floatingLabelText: messages['compression.4'], floatingLabelStyle: flStyle }),
                React.createElement(
                    MaterialUI.SelectField,
                    { style: { width: 160 }, onChange: this.selectFieldChange, value: compression, floatingLabelText: messages['compression.3'], floatingLabelStyle: flStyle },
                    formatMenus
                )
            );
        }

    });

    var Callbacks = (function () {
        function Callbacks() {
            _classCallCheck(this, Callbacks);
        }

        _createClass(Callbacks, null, [{
            key: 'compressUI',
            value: function compressUI() {
                var userSelection = pydio.getUserSelection();
                if (!pydio.Parameters.get('multipleFilesDownloadEnabled')) {
                    return;
                }
                pydio.UI.openComponentInModal('CompressionActions', 'CompressionDialog', { userSelection: userSelection });
            }
        }, {
            key: 'extract',
            value: function extract() {
                var userSelection = pydio.getUserSelection();
                if (!userSelection.isEmpty()) {
                    PydioApi.getClient().postSelectionWithAction('extraction', function (transport) {
                        PydioApi.getClient().parseXmlMessage(transport.responseXML);
                    }, userSelection);
                }
            }
        }]);

        return Callbacks;
    })();

    global.CompressionActions = {
        CompressionDialog: CompressionDialog,
        Callbacks: Callbacks
    };
})(window);
