(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
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

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Editor = (function (_Component) {
    _inherits(Editor, _Component);

    _createClass(Editor, null, [{
        key: "styles",
        get: function get() {
            return {
                iframe: {
                    border: 0,
                    flex: 1
                }
            };
        }
    }]);

    function Editor(props) {
        _classCallCheck(this, Editor);

        _get(Object.getPrototypeOf(Editor.prototype), "constructor", this).call(this, props);

        this.state = {
            frameSrc: null
        };
    }

    _createClass(Editor, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _props = this.props;
            var pydio = _props.pydio;
            var node = _props.node;

            var configs = pydio.getPluginConfigs("editor.browser");

            if (node.getAjxpMime() == "url" || node.getAjxpMime() == "website") {
                this.openBookmark(node, configs);
            } else {
                this.openNode(node, configs);
            }
        }
    }, {
        key: "openBookmark",
        value: function openBookmark(node, configs) {
            var _this = this;

            var alwaysOpenLinksInBrowser = configs.get('OPEN_LINK_IN_TAB') === 'browser';

            PydioApi.getClient().request({
                get_action: 'get_content',
                file: node.getPath()
            }, function (_ref) {
                var url = _ref.responseText;

                if (url.indexOf('URL=') !== -1) {
                    url = url.split('URL=')[1];
                    if (url.indexOf('\n') !== -1) {
                        url = url.split('\n')[0];
                    }
                }
                _this._openURL(url, alwaysOpenLinksInBrowser, true);
            });
        }
    }, {
        key: "openNode",
        value: function openNode(node, configs) {
            var pydio = this.props.pydio;

            var repo = pydio.user.getActiveRepository();
            var loc = document.location.href.split('?').shift().split('#').shift();
            var url = loc.substring(0, loc.lastIndexOf('/'));
            if (document.getElementsByTagName('base').length) {
                url = document.getElementsByTagName('base')[0].href;
                if (url.substr(-1) == '/') url = url.substr(0, url.length - 1);
            }
            url = LangUtils.trimRight(url, "\/");
            var ajxpServerAccess = pydio.Parameters.get('ajxpServerAccess');
            var path = encodeURIComponent(node.getPath());
            var open_file_url = url + "/" + ajxpServerAccess + "&get_action=open_file&repository_id=" + repo + "&file=" + path;
            var alwaysOpenDocsInBrowser = configs.get('OPEN_DOCS_IN_TAB') === "browser";

            this._openURL(open_file_url, alwaysOpenDocsInBrowser, false);
        }
    }, {
        key: "_openURL",
        value: function _openURL(url) {
            var modal = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
            var updateTitle = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            if (modal) {
                global.open(url, '', "location=yes,menubar=yes,resizable=yes,scrollbars=yes,toolbar=yes,status=yes");
                if (this.props.onRequestTabClose) {
                    this.props.onRequestTabClose();
                }
            } else {
                if (updateTitle && this.props.onRequestTabTitleUpdate) {
                    this.props.onRequestTabTitleUpdate(url);
                }
                this.setState({ frameSrc: url });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _react2["default"].createElement("iframe", { style: Editor.styles.iframe, src: this.state.frameSrc });
        }
    }]);

    return Editor;
})(_react.Component);

window.PydioBrowserEditor = {
    Editor: Editor
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"react":"react"}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJyZXMvYnVpbGQvUHlkaW9Ccm93c2VyRWRpdG9yLmJhYmVsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxuICogQ29weXJpZ2h0IDIwMDctMjAxNyBDaGFybGVzIGR1IEpldSAtIEFic3RyaXVtIFNBUyA8dGVhbSAoYXQpIHB5ZC5pbz5cbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFB5ZGlvLlxuICpcbiAqIFB5ZGlvIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogUHlkaW8gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggUHlkaW8uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVGhlIGxhdGVzdCBjb2RlIGNhbiBiZSBmb3VuZCBhdCA8aHR0cHM6Ly9weWRpby5jb20+LlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94MywgX3g0LCBfeDUpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gzLCBwcm9wZXJ0eSA9IF94NCwgcmVjZWl2ZXIgPSBfeDU7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3gzID0gcGFyZW50OyBfeDQgPSBwcm9wZXJ0eTsgX3g1ID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGRlc2MgPSBwYXJlbnQgPSB1bmRlZmluZWQ7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIEVkaXRvciA9IChmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhFZGl0b3IsIF9Db21wb25lbnQpO1xuXG4gICAgX2NyZWF0ZUNsYXNzKEVkaXRvciwgbnVsbCwgW3tcbiAgICAgICAga2V5OiBcInN0eWxlc1wiLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWZyYW1lOiB7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMCxcbiAgICAgICAgICAgICAgICAgICAgZmxleDogMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICBmdW5jdGlvbiBFZGl0b3IocHJvcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEVkaXRvcik7XG5cbiAgICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoRWRpdG9yLnByb3RvdHlwZSksIFwiY29uc3RydWN0b3JcIiwgdGhpcykuY2FsbCh0aGlzLCBwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGZyYW1lU3JjOiBudWxsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEVkaXRvciwgW3tcbiAgICAgICAga2V5OiBcImNvbXBvbmVudERpZE1vdW50XCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgICAgICAgdmFyIHB5ZGlvID0gX3Byb3BzLnB5ZGlvO1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBfcHJvcHMubm9kZTtcblxuICAgICAgICAgICAgdmFyIGNvbmZpZ3MgPSBweWRpby5nZXRQbHVnaW5Db25maWdzKFwiZWRpdG9yLmJyb3dzZXJcIik7XG5cbiAgICAgICAgICAgIGlmIChub2RlLmdldEFqeHBNaW1lKCkgPT0gXCJ1cmxcIiB8fCBub2RlLmdldEFqeHBNaW1lKCkgPT0gXCJ3ZWJzaXRlXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5Cb29rbWFyayhub2RlLCBjb25maWdzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuTm9kZShub2RlLCBjb25maWdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcIm9wZW5Cb29rbWFya1wiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gb3BlbkJvb2ttYXJrKG5vZGUsIGNvbmZpZ3MpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBhbHdheXNPcGVuTGlua3NJbkJyb3dzZXIgPSBjb25maWdzLmdldCgnT1BFTl9MSU5LX0lOX1RBQicpID09PSAnYnJvd3Nlcic7XG5cbiAgICAgICAgICAgIFB5ZGlvQXBpLmdldENsaWVudCgpLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIGdldF9hY3Rpb246ICdnZXRfY29udGVudCcsXG4gICAgICAgICAgICAgICAgZmlsZTogbm9kZS5nZXRQYXRoKClcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIHVybCA9IF9yZWYucmVzcG9uc2VUZXh0O1xuXG4gICAgICAgICAgICAgICAgaWYgKHVybC5pbmRleE9mKCdVUkw9JykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHVybCA9IHVybC5zcGxpdCgnVVJMPScpWzFdO1xuICAgICAgICAgICAgICAgICAgICBpZiAodXJsLmluZGV4T2YoJ1xcbicpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gdXJsLnNwbGl0KCdcXG4nKVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdGhpcy5fb3BlblVSTCh1cmwsIGFsd2F5c09wZW5MaW5rc0luQnJvd3NlciwgdHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcIm9wZW5Ob2RlXCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvcGVuTm9kZShub2RlLCBjb25maWdzKSB7XG4gICAgICAgICAgICB2YXIgcHlkaW8gPSB0aGlzLnByb3BzLnB5ZGlvO1xuXG4gICAgICAgICAgICB2YXIgcmVwbyA9IHB5ZGlvLnVzZXIuZ2V0QWN0aXZlUmVwb3NpdG9yeSgpO1xuICAgICAgICAgICAgdmFyIGxvYyA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYuc3BsaXQoJz8nKS5zaGlmdCgpLnNwbGl0KCcjJykuc2hpZnQoKTtcbiAgICAgICAgICAgIHZhciB1cmwgPSBsb2Muc3Vic3RyaW5nKDAsIGxvYy5sYXN0SW5kZXhPZignLycpKTtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYmFzZScpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHVybCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdiYXNlJylbMF0uaHJlZjtcbiAgICAgICAgICAgICAgICBpZiAodXJsLnN1YnN0cigtMSkgPT0gJy8nKSB1cmwgPSB1cmwuc3Vic3RyKDAsIHVybC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVybCA9IExhbmdVdGlscy50cmltUmlnaHQodXJsLCBcIlxcL1wiKTtcbiAgICAgICAgICAgIHZhciBhanhwU2VydmVyQWNjZXNzID0gcHlkaW8uUGFyYW1ldGVycy5nZXQoJ2FqeHBTZXJ2ZXJBY2Nlc3MnKTtcbiAgICAgICAgICAgIHZhciBwYXRoID0gZW5jb2RlVVJJQ29tcG9uZW50KG5vZGUuZ2V0UGF0aCgpKTtcbiAgICAgICAgICAgIHZhciBvcGVuX2ZpbGVfdXJsID0gdXJsICsgXCIvXCIgKyBhanhwU2VydmVyQWNjZXNzICsgXCImZ2V0X2FjdGlvbj1vcGVuX2ZpbGUmcmVwb3NpdG9yeV9pZD1cIiArIHJlcG8gKyBcIiZmaWxlPVwiICsgcGF0aDtcbiAgICAgICAgICAgIHZhciBhbHdheXNPcGVuRG9jc0luQnJvd3NlciA9IGNvbmZpZ3MuZ2V0KCdPUEVOX0RPQ1NfSU5fVEFCJykgPT09IFwiYnJvd3NlclwiO1xuXG4gICAgICAgICAgICB0aGlzLl9vcGVuVVJMKG9wZW5fZmlsZV91cmwsIGFsd2F5c09wZW5Eb2NzSW5Ccm93c2VyLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogXCJfb3BlblVSTFwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX29wZW5VUkwodXJsKSB7XG4gICAgICAgICAgICB2YXIgbW9kYWwgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgIHZhciB1cGRhdGVUaXRsZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogYXJndW1lbnRzWzJdO1xuXG4gICAgICAgICAgICBpZiAobW9kYWwpIHtcbiAgICAgICAgICAgICAgICBnbG9iYWwub3Blbih1cmwsICcnLCBcImxvY2F0aW9uPXllcyxtZW51YmFyPXllcyxyZXNpemFibGU9eWVzLHNjcm9sbGJhcnM9eWVzLHRvb2xiYXI9eWVzLHN0YXR1cz15ZXNcIik7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMub25SZXF1ZXN0VGFiQ2xvc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vblJlcXVlc3RUYWJDbG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHVwZGF0ZVRpdGxlICYmIHRoaXMucHJvcHMub25SZXF1ZXN0VGFiVGl0bGVVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vblJlcXVlc3RUYWJUaXRsZVVwZGF0ZSh1cmwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZnJhbWVTcmM6IHVybCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcInJlbmRlclwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9yZWFjdDJbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIiwgeyBzdHlsZTogRWRpdG9yLnN0eWxlcy5pZnJhbWUsIHNyYzogdGhpcy5zdGF0ZS5mcmFtZVNyYyB9KTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBFZGl0b3I7XG59KShfcmVhY3QuQ29tcG9uZW50KTtcblxud2luZG93LlB5ZGlvQnJvd3NlckVkaXRvciA9IHtcbiAgICBFZGl0b3I6IEVkaXRvclxufTtcbiJdfQ==
