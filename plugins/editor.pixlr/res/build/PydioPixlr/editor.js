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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomIframe = (function (_React$Component) {
    _inherits(CustomIframe, _React$Component);

    function CustomIframe() {
        _classCallCheck(this, CustomIframe);

        _get(Object.getPrototypeOf(CustomIframe.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(CustomIframe, [{
        key: 'onUnload',
        value: function onUnload(e) {
            try {
                var href = this.myIframe.contentDocument.location.href;

                if (href && href.indexOf('image=') > -1) {
                    this.save(href);
                } else if (href && (href.indexOf('close_pixlr') > -1 || href.indexOf('error_pixlr') > -1)) {
                    // TODO: Close the editor
                }
            } catch (e) {}
        }
    }, {
        key: 'save',
        value: function save(pixlrUrl) {
            var _props = this.props;
            var pydio = _props.pydio;
            var node = _props.node;

            pydio.ApiClient.request({
                get_action: 'retrieve_pixlr_image',
                original_file: node.getPath(),
                new_url: pixlrUrl
            }, function (transport) {
                node.getParent().getMetadata().set('preview_seed', Math.round(Math.random() * new Date().getTime()));
                pydio.fireNodeRefresh(node);
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            try {
                this.myIframe.contentWindow.addEventListener("onbeforeunload", this.onUnload);
            } catch (e) {}
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            try {
                this.myIframe.contentWindow.removeEventListener("onbeforeunload", this.onUnload);
            } catch (e) {}
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            return React.createElement('iframe', {
                ref: function (element) {
                    _this.myIframe = element;
                },
                src: this.props.url,
                style: _extends({}, this.props.style, { border: 0, flex: 1 }),
                className: 'vertical_fit',
                onLoad: this.onUnload.bind(this)
            });
        }
    }]);

    return CustomIframe;
})(React.Component);

var Editor = (function (_React$Component2) {
    _inherits(Editor, _React$Component2);

    function Editor() {
        _classCallCheck(this, Editor);

        _get(Object.getPrototypeOf(Editor.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Editor, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadNode(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.node !== this.props.node) {
                this.loadNode(nextProps);
            }
        }
    }, {
        key: 'loadNode',
        value: function loadNode(props) {
            var pydio = props.pydio;
            var node = props.node;

            this.setState({ url: pydio.Parameters.get('ajxpServerAccess') + "&get_action=post_to_server&file=base64encoded:" + HasherUtils.base64_encode(node.getPath()) + "&parent_url=" + HasherUtils.base64_encode(DOMUtils.getUrlFromBase()) });
        }
    }, {
        key: 'render',
        value: function render() {
            if (!this.state) {
                return null;
            }
            return React.createElement(CustomIframe, _extends({}, this.props, {
                url: this.state.url
            }));
        }
    }]);

    return Editor;
})(React.Component);

exports['default'] = Editor;
module.exports = exports['default'];
