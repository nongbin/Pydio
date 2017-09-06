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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('./components');

var Preview = function Preview(_ref) {
    var node = _ref.node;

    var remainingProps = _objectWithoutProperties(_ref, ['node']);

    var repositoryId = node.getMetadata().get("repository_id");

    var repoString = "";
    if (typeof pydio !== "undefined" && repositoryId && repositoryId !== pydio.repositoryId) {
        repoString = "&tmp_repository_id=" + repositoryId;
    }

    var mtimeString = node.buildRandomSeed();

    return _react2['default'].createElement(_components.ImageContainer, _extends({}, remainingProps, {
        src: '' + pydio.Parameters.get('ajxpServerAccess') + repoString + mtimeString + '&action=preview_data_proxy&get_thumb=true&file=' + encodeURIComponent(node.getPath()),
        imgStyle: {
            width: "100%",
            height: "100%",
            flex: 1
        }
    }));
};

exports['default'] = Preview;
module.exports = exports['default'];
