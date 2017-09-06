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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _require = require('react');

var Component = _require.Component;

var _require2 = require('material-ui');

var MenuItem = _require2.MenuItem;
var Divider = _require2.Divider;
var Subheader = _require2.Subheader;
var FontIcon = _require2.FontIcon;

var DOMUtils = require('pydio/util/dom');

function renderItem(palette, node) {
    var text = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var icon = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    var iconStyle = {
        fontSize: 20,
        lineHeight: '20px',
        color: palette.primary1Color,
        padding: 2
    };
    var flagStyle = {
        display: 'inline',
        backgroundColor: palette.accent1Color,
        color: 'white',
        height: 22,
        borderRadius: 10,
        padding: '0 5px',
        marginLeft: 5
    };

    var label = text || node.getLabel();
    if (node.getMetadata().get('flag')) {
        label = React.createElement(
            'span',
            null,
            node.getLabel(),
            ' ',
            React.createElement(
                'span',
                { style: flagStyle },
                node.getMetadata().get('flag')
            ),
            ' '
        );
    }

    return React.createElement(MenuItem, {
        value: node,
        primaryText: label,
        rightIcon: React.createElement(FontIcon, { className: icon || node.getMetadata().get('icon_class'), style: iconStyle })
    });
}

var NavigationHelper = (function () {
    function NavigationHelper() {
        _classCallCheck(this, NavigationHelper);
    }

    _createClass(NavigationHelper, null, [{
        key: 'buildNavigationItems',
        value: function buildNavigationItems(pydio, rootNode, palette) {

            var items = [];

            if (rootNode.getMetadata().get('component')) {
                items.push(renderItem(palette, rootNode, pydio.MessageHash['ajxp_admin.menu.0']));
            }
            rootNode.getChildren().forEach(function (header) {
                if (!header.getChildren().size && header.getMetadata().get('component')) {
                    items.push(renderItem(palette, header));
                } else {
                    if (header.getLabel()) {
                        items.push(React.createElement(Divider, null));
                        items.push(React.createElement(
                            Subheader,
                            { style: { transition: DOMUtils.getBeziersTransition() }, className: 'hideable-subheader' },
                            header.getLabel()
                        ));
                    }
                    header.getChildren().forEach(function (child) {
                        if (!child.getLabel()) return;
                        items.push(renderItem(palette, child));
                    });
                }
            });

            return items;
        }
    }]);

    return NavigationHelper;
})();

exports['default'] = NavigationHelper;
module.exports = exports['default'];
