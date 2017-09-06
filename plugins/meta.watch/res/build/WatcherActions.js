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
            key: "toggleWatch",
            value: function toggleWatch(manager, args) {

                if (args) {

                    var node = pydio.getUserSelection().getUniqueNode();
                    var conn = new Connexion();
                    conn.setParameters({
                        get_action: "toggle_watch",
                        watch_action: args,
                        file: node.getPath()
                    });
                    conn.onComplete = function (transport) {
                        PydioApi.getClient().parseXmlMessage(transport.responseXML);
                    };
                    conn.sendAsync();
                }
            }
        }]);

        return Callbacks;
    })();

    var Listeners = (function () {
        function Listeners() {
            _classCallCheck(this, Listeners);
        }

        _createClass(Listeners, null, [{
            key: "dynamicBuilder",
            value: function dynamicBuilder(controller) {

                var n = pydio.getUserSelection().getUniqueNode();
                if (!n) return [];

                var builderMenuItems = [];
                var metaValue;
                if (n.getMetadata().get("meta_watched")) {
                    var metaValue = n.getMetadata().get("meta_watched");
                }
                builderMenuItems.push({
                    name: MessageHash["meta.watch.11"],
                    alt: MessageHash["meta.watch." + (n.isLeaf() ? "12" : "12b")],
                    isDefault: metaValue && metaValue == "META_WATCH_CHANGE",
                    image: ResourcesManager.resolveImageSource('meta.watch/ICON_SIZE/watch' + (metaValue && metaValue == "META_WATCH_CHANGE" ? '' : '_faded') + '.png', '', 22),
                    callback: (function (e) {
                        this.apply('watch_change');
                    }).bind(this)
                });
                builderMenuItems.push({
                    name: MessageHash["meta.watch.9"],
                    alt: MessageHash["meta.watch." + (n.isLeaf() ? "10" : "10b")],
                    isDefault: metaValue && metaValue == "META_WATCH_READ",
                    image: ResourcesManager.resolveImageSource('meta.watch/ICON_SIZE/watch' + (metaValue && metaValue == "META_WATCH_READ" ? '' : '_faded') + '.png', '', 22),
                    callback: (function (e) {
                        this.apply('watch_read');
                    }).bind(this)
                });
                builderMenuItems.push({
                    name: MessageHash["meta.watch.13"],
                    alt: MessageHash["meta.watch." + (n.isLeaf() ? "14" : "14b")],
                    isDefault: metaValue && metaValue == "META_WATCH_BOTH",
                    image: ResourcesManager.resolveImageSource('meta.watch/ICON_SIZE/watch' + (metaValue && metaValue == "META_WATCH_BOTH" ? '' : '_faded') + '.png', '', 22),
                    callback: (function (e) {
                        this.apply('watch_both');
                    }).bind(this)
                });
                if (metaValue) {
                    builderMenuItems.push({
                        separator: true
                    });
                    builderMenuItems.push({
                        name: MessageHash['meta.watch.3'],
                        alt: MessageHash["meta.watch." + (n.isLeaf() ? "8" : "4")],
                        isDefault: false,
                        image: ResourcesManager.resolveImageSource('meta.watch/ICON_SIZE/watch.png', '', 22),
                        callback: (function (e) {
                            this.apply('watch_stop');
                        }).bind(this)
                    });
                }

                return builderMenuItems;
            }
        }]);

        return Listeners;
    })();

    global.WatcherActions = {
        Callbacks: Callbacks,
        Listeners: Listeners
    };
})(window);
