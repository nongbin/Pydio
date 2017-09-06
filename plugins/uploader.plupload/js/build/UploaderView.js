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

(function (global) {

    var Uploader = React.createClass({
        displayName: "Uploader",

        getInitialState: function getInitialState() {
            return {
                dir: ajaxplorer.getContextNode().getPath(),
                submitting: false,
                currentURL: "",
                urls: []
            };
        },

        render: function render() {
            return React.createElement(
                "div",
                { id: "plupload_form", box_width: "550", box_padding: "0" },
                React.createElement(
                    "div",
                    { id: "pluploadscreen" },
                    React.createElement("iframe", { id: "pluploadframe", style: { width: '100%', height: 330, border: '0px none' }, frameborder: "0", src: window.ajxpServerAccessPath + '&get_action=plupload_tpl&encode=false' })
                )
            );
        }
    });

    var ns = global.PLUploaderView || {};
    ns.Uploader = Uploader;
    global.PLUploaderView = ns;
})(window);
