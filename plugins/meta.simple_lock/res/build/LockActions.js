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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (global) {

    var pydio = global.pydio;
    var MessageHash = global.pydio.MessageHash;

    var Callbacks = (function () {
        function Callbacks() {
            _classCallCheck(this, Callbacks);
        }

        _createClass(Callbacks, null, [{
            key: "toggleLock",
            value: function toggleLock(manager, args) {

                var conn = new Connexion();
                conn.addParameter("get_action", "sl_lock");
                var n = pydio.getUserSelection().getUniqueNode();
                conn.addParameter("file", n.getPath());
                if (n.getMetadata().get("sl_locked")) {
                    conn.addParameter("unlock", "true");
                }
                conn.onComplete = function (transport) {
                    PydioApi.getClient().parseXmlMessage(transport.responseXML);
                };
                conn.sendAsync();
            }
        }]);

        return Callbacks;
    })();

    var Listeners = (function () {
        function Listeners() {
            _classCallCheck(this, Listeners);
        }

        _createClass(Listeners, null, [{
            key: "selectionChange",
            value: function selectionChange() {

                var action = pydio.getController().getActionByName("sl_lock");
                var n = pydio.getUserSelection().getUniqueNode();
                if (action && n) {
                    action.selectionContext.allowedMimes = [];
                    if (n.getMetadata().get("sl_locked")) {
                        action.setIconClassName('icon-unlock');
                        action.setLabel('meta.simple_lock.3');
                        if (!n.getMetadata().get("sl_mylock")) {
                            action.selectionContext.allowedMimes = ["fake_extension_that_never_exists"];
                        }
                    } else {
                        action.setIconClassName('icon-lock');
                        action.setLabel('meta.simple_lock.1');
                    }
                }
            }
        }]);

        return Listeners;
    })();

    global.LockActions = {
        Callbacks: Callbacks,
        Listeners: Listeners
    };
})(window);
