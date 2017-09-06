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
    var MessageHash = pydio.MessageHash;

    var Callbacks = (function () {
        function Callbacks() {
            _classCallCheck(this, Callbacks);
        }

        _createClass(Callbacks, null, [{
            key: 'getTimestamp',
            value: function getTimestamp() {

                var userSelection = pydio.getUserSelection();

                pydio.UI.openComponentInModal('PydioReactUI', 'ConfirmDialog', {
                    message: MessageHash['timestamp.5'],
                    dialogTitleId: 'timestamp.6',
                    validCallback: function validCallback() {
                        PydioApi.getClient().request({
                            get_action: 'get_timestamp',
                            file: userSelection.getUniqueNode().getPath()
                        }, function (transport) {
                            PydioApi.getClient().parseXmlMessage(transport.responseXML);
                        });
                    }
                });
            }
        }]);

        return Callbacks;
    })();

    global.TimestampActions = {
        Callbacks: Callbacks
    };
})(window);
