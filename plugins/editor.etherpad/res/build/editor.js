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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pydioUtilPath = require('pydio/util/path');

var _pydioUtilPath2 = _interopRequireDefault(_pydioUtilPath);

var _pydioUtilPeriodicalExecuter = require('pydio/util/periodical-executer');

var _pydioUtilPeriodicalExecuter2 = _interopRequireDefault(_pydioUtilPeriodicalExecuter);

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _Pydio$requireLib = _pydio2['default'].requireLib('boot');

var Loader = _Pydio$requireLib.Loader;

var _Pydio$requireLib2 = _pydio2['default'].requireLib('hoc');

var EditorActions = _Pydio$requireLib2.EditorActions;

var Viewer = (function (_Component) {
    _inherits(Viewer, _Component);

    function Viewer() {
        _classCallCheck(this, Viewer);

        _get(Object.getPrototypeOf(Viewer.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Viewer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadNode(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.node && (!this.props.node || nextProps.node.getPath() !== this.props.node.getPath())) {
                this.loadNode(nextProps);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var _props = this.props;
            var pydio = _props.pydio;
            var node = _props.node;
            var tab = _props.tab;

            if (tab && tab.padID && tab.sessionID) {
                PydioApi.getClient().request({
                    get_action: 'etherpad_close',
                    file: node.getPath(),
                    pad_id: tab.padID,
                    session_id: tab.sessionID
                });
            }
            if (this.pe) {
                this.pe.stop();
            }
        }
    }, {
        key: 'observeChanges',
        value: function observeChanges(padID) {
            var _this = this;

            var _props2 = this.props;
            var pydio = _props2.pydio;
            var node = _props2.node;

            if (!padID || !node) return;
            PydioApi.getClient().request({
                get_action: 'etherpad_get_content',
                file: node.getPath(),
                pad_id: padID
            }, function (transport) {
                var content = transport.responseText;
                if (_this.previousContent && _this.previousContent != content) {
                    _this.setModified(true);
                }
                _this.previousContent = content;
            }, null, { discrete: true });
        }
    }, {
        key: 'setModified',
        value: function setModified(status) {
            var _props3 = this.props;
            var pydio = _props3.pydio;
            var node = _props3.node;
            var tab = _props3.tab;
            var dispatch = _props3.dispatch;
            var id = tab.id;

            dispatch(EditorActions.tabModify({ id: id, title: node.getLabel() + (status ? '*' : '') }));
        }
    }, {
        key: 'loadNode',
        value: function loadNode(props) {
            var _this2 = this;

            var pydio = props.pydio;
            var node = props.node;
            var dispatch = props.dispatch;
            var tab = props.tab;
            var id = tab.id;

            if (this.pe) this.pe.stop();

            var url = undefined;
            var base = DOMUtils.getUrlFromBase();
            var extension = _pydioUtilPath2['default'].getFileExtension(node.getPath());

            PydioApi.getClient().request({
                get_action: 'etherpad_create',
                file: node.getPath()
            }, function (transport) {
                var data = transport.responseJSON;
                dispatch(EditorActions.tabModify({ id: id, padID: data.padID, frameUrl: data.url, sessionID: data.sessionID }));

                if (extension !== "pad") {
                    _this2.observeChanges(data.padID);
                    if (_this2.pe) _this2.pe.stop();
                    _this2.pe = new _pydioUtilPeriodicalExecuter2['default'](function () {
                        return _this2.observeChanges(data.padID);
                    }, 5);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var tab = this.props.tab;
            var frameUrl = tab.frameUrl;

            if (!frameUrl) {
                return _react2['default'].createElement(Loader, null);
            }

            return _react2['default'].createElement('iframe', _extends({}, this.props, { style: { width: "100%", height: "100%", border: 0 }, src: frameUrl }));
        }
    }]);

    return Viewer;
})(_react.Component);

var editors = pydio.Registry.getActiveExtensionByType("editor");
var conf = editors.filter(function (_ref) {
    var id = _ref.id;
    return id === 'editor.etherpad';
})[0];

var getSelectionFilter = function getSelectionFilter(node) {
    return conf.mimes.indexOf(node.getAjxpMime()) > -1;
};

var getSelection = function getSelection(node) {
    return new Promise(function (resolve, reject) {
        var selection = [];

        node.getParent().getChildren().forEach(function (child) {
            return selection.push(child);
        });
        selection = selection.filter(getSelectionFilter);

        resolve({
            selection: selection,
            currentIndex: selection.reduce(function (currentIndex, current, index) {
                return current === node && index || currentIndex;
            }, 0)
        });
    });
};

var _PydioHOCs = PydioHOCs;
var withSelection = _PydioHOCs.withSelection;

var mapStateToProps = function mapStateToProps(state, props) {
    var tabs = state.tabs;

    var tab = tabs.filter(function (_ref2) {
        var editorData = _ref2.editorData;
        var node = _ref2.node;
        return (!editorData || editorData.id === props.editorData.id) && node.getPath() === props.node.getPath();
    })[0] || {};

    return _extends({
        id: tab.id,
        tab: tab
    }, props);
};

var Editor = (0, _redux.compose)(withSelection(getSelection), (0, _reactRedux.connect)(mapStateToProps))(Viewer);

exports['default'] = Editor;
module.exports = exports['default'];
