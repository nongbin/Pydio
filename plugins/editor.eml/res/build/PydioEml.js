(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PydioEml = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _PydioHOCs = PydioHOCs;
var SelectionControls = _PydioHOCs.SelectionControls;
exports.SelectionControls = SelectionControls;

},{}],2:[function(require,module,exports){
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

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _PydioHOCs = PydioHOCs;
var withSelection = _PydioHOCs.withSelection;

var styles = {
    chip: {
        margin: 4
    },
    container: {
        height: '100%',
        width: '100%',
        flexDirection: 'column'
    },
    headers: {
        maxHeight: 44,
        overflowY: 'scroll',
        paddingLeft: 20,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        color: '#757575'
    },
    headerName: {
        width: 50,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    headerTitleAttribute: {
        fontSize: '14px',
        fontWeight: 'bold'
    },
    title: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        subject: {
            flex: 1,
            fontWeight: 'bold',
            fontSize: 18,
            color: '#A9A9A9'
        },
        date: {
            fontWeight: 'light',
            color: '#A9A9A9'
        }
    },
    body: {
        height: '100%',
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        overflowY: 'scroll'
    },
    popover: {
        zIndex: 100000
    },
    attachments: {
        display: 'flex',
        overflowX: 'scroll',
        width: '100%',
        maxHeight: 150,
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        paddingTop: 4,
        paddingBottom: 4
    },
    attachment: {
        marginLeft: 8
    }
};

var EmailBody = function EmailBody(_ref) {
    var isHtml = _ref.isHtml;
    var body = _ref.body;

    if (isHtml) {
        return _react2['default'].createElement('div', { style: styles.body, dangerouslySetInnerHTML: { __html: body } });
    } else {
        return _react2['default'].createElement(
            'p',
            null,
            body
        );
    }
};

var ContactChip = function ContactChip(_ref2) {
    var contact = _ref2.contact;

    return _react2['default'].createElement(
        MaterialUI.Chip,
        { style: styles.chip },
        _react2['default'].createElement(
            MaterialUI.Avatar,
            { size: 32 },
            contact[0]
        ),
        contact
    );
};

var HeaderField = (function (_React$Component) {
    _inherits(HeaderField, _React$Component);

    function HeaderField(props) {
        _classCallCheck(this, HeaderField);

        _get(Object.getPrototypeOf(HeaderField.prototype), 'constructor', this).call(this, props);
    }

    _createClass(HeaderField, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var headerName = _props.headerName;
            var headerValue = _props.headerValue;

            var emails = null;
            if (headerValue) {
                emails = headerValue.split(',').map(function (email) {
                    return _react2['default'].createElement(ContactChip, { contact: email });
                });
            } else {
                return _react2['default'].createElement('div', null);
            }
            var hName = undefined;
            switch (headerName) {
                case 'From':
                    hName = pydio.MessageHash['editor.eml.1'];break;
                case 'To':
                    hName = pydio.MessageHash['editor.eml.2'];break;
                case 'Cc':
                    hName = pydio.MessageHash['editor.eml.12'];break;
                default:
                    hName = 'unexpected header';break;
            }
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'div',
                    { style: styles.headers },
                    _react2['default'].createElement(
                        'div',
                        { style: styles.headerName },
                        _react2['default'].createElement(
                            'p',
                            { style: { fontSize: '14px', fontWeight: 'bold', color: '#9f9f9f' } },
                            hName,
                            ': '
                        )
                    ),
                    emails
                ),
                _react2['default'].createElement(MaterialUI.Divider, null)
            );
        }
    }]);

    return HeaderField;
})(_react2['default'].Component);

var Attachment = (function (_React$Component2) {
    _inherits(Attachment, _React$Component2);

    function Attachment(props) {
        _classCallCheck(this, Attachment);

        _get(Object.getPrototypeOf(Attachment.prototype), 'constructor', this).call(this, props);

        this.state = {
            open: false
        };
    }

    _createClass(Attachment, [{
        key: 'downloadAttachment',
        value: function downloadAttachment() {
            var _props2 = this.props;
            var pydio = _props2.pydio;
            var node = _props2.node;

            this.props.pydio.ApiClient.downloadSelection(null, 'eml_dl_attachment', { file: node.getPath(), attachment_id: this.props.attachment.id });
        }
    }, {
        key: 'copyAttachment',
        value: function copyAttachment() {
            var _props3 = this.props;
            var pydio = _props3.pydio;
            var node = _props3.node;
            var attachment = _props3.attachment;

            var submit = function submit(path) {
                var wsId = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

                pydio.ApiClient.request({
                    get_action: 'eml_cp_attachment',
                    file: node.getPath(),
                    attachment_id: attachment.id,
                    destination: path
                }, function (transport) {
                    console.log(transport.responseXML);
                });
            };

            pydio.UI.openComponentInModal('FSActions', 'TreeDialog', {
                isMove: false,
                dialogTitle: MessageHash[159],
                submitValue: submit
            });
        }
    }, {
        key: 'handleTouchTap',
        value: function handleTouchTap(event) {
            // This prevents ghost click.
            event.preventDefault();

            this.setState({
                open: true,
                anchorEl: event.currentTarget
            });
        }
    }, {
        key: 'handleRequestClose',
        value: function handleRequestClose() {
            this.setState({
                open: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props4 = this.props;
            var pydio = _props4.pydio;
            var attachment = _props4.attachment;

            return _react2['default'].createElement(
                MaterialUI.Paper,
                {
                    style: styles.attachment
                },
                _react2['default'].createElement(MaterialUI.IconButton, { iconClassName: 'mdi mdi-file', disabled: true }),
                attachment.fileName,
                _react2['default'].createElement(
                    MaterialUI.IconButton,
                    {
                        iconClassName: 'mdi mdi-dots-vertical',
                        onTouchTap: this.handleTouchTap.bind(this)
                    },
                    _react2['default'].createElement(
                        MaterialUI.Popover,
                        {
                            useLayerForClickAway: false,
                            style: { zIndex: 100000 },
                            open: this.state.open,
                            anchorEl: this.state.anchorEl,
                            anchorOrigin: { horizontal: 'right', vertical: 'top' },
                            targetOrigin: { horizontal: 'right', vertical: 'bottom' },
                            onRequestClose: this.handleRequestClose.bind(this)
                        },
                        _react2['default'].createElement(
                            MaterialUI.Menu,
                            {
                                style: { zIndex: 100000 }
                            },
                            _react2['default'].createElement(MaterialUI.MenuItem, {
                                primaryText: pydio.MessageHash['editor.eml.10'],
                                onTouchTap: this.downloadAttachment.bind(this)
                            }),
                            _react2['default'].createElement(MaterialUI.MenuItem, {
                                primaryText: pydio.MessageHash['editor.eml.11'],
                                onTouchTap: this.copyAttachment.bind(this)
                            })
                        )
                    )
                )
            );
        }
    }]);

    return Attachment;
})(_react2['default'].Component);

var Editor = (function (_React$Component3) {
    _inherits(Editor, _React$Component3);

    function Editor(props) {
        _classCallCheck(this, Editor);

        _get(Object.getPrototypeOf(Editor.prototype), 'constructor', this).call(this, props);

        this.state = { headers: [], isHtml: false, body: '', attachments: [] };
    }

    _createClass(Editor, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.loadFileContent(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.node !== this.props.node) {
                this.loadFileContent(nextProps);
            }
        }
    }, {
        key: 'loadFileContent',
        value: function loadFileContent(props) {
            var pydio = props.pydio;
            var node = props.node;
            var onLoad = props.onLoad;

            pydio.ApiClient.request({
                get_action: 'eml_get_xml_structure',
                file: node.getPath()
            }, (function (transport) {
                this.parseHeaders(transport.responseXML);
                this.parseAttachments(transport.responseXML);
            }).bind(this));

            pydio.ApiClient.request({
                get_action: 'eml_get_bodies',
                file: node.getPath()
            }, (function (transport) {
                this.parseBody(transport.responseXML);
            }).bind(this));
        }
    }, {
        key: 'parseBody',
        value: function parseBody(xmlDoc) {
            var body = XMLUtils.XPathSelectSingleNode(xmlDoc, 'email_body/mimepart[@type="html"]').firstChild.nodeValue;
            var isHtml = true;
            if (!body) {
                body = XMLUtils.XPathSelectSingleNode(xmlDoc, 'email_body/mimepart[@type="plain"]').firstChild.nodeValue;
                ishtml = false;
            }
            this.setState({ body: body });
            this.setState({ isHtml: isHtml });
        }
    }, {
        key: 'parseHeaders',
        value: function parseHeaders(xmlDoc) {
            var headers = XMLUtils.XPathSelectNodes(xmlDoc, 'email/header');
            var searchedHeaders = {};

            headers.forEach(function (value) {
                var hName = XMLUtils.XPathGetSingleNodeText(value, 'headername');
                var hValue = XMLUtils.XPathGetSingleNodeText(value, 'headervalue');
                searchedHeaders[hName] = hValue;
            });
            this.setState({ headers: searchedHeaders });
        }
    }, {
        key: 'parseAttachments',
        value: function parseAttachments(xmlDoc) {
            var allHeaders = XMLUtils.XPathSelectNodes(xmlDoc, '//header');
            // let attachments = {};
            var attachments = [];
            var id = 0;
            allHeaders.forEach(function (el) {
                var hName = XMLUtils.XPathGetSingleNodeText(el, 'headername');
                var hValue = XMLUtils.XPathGetSingleNodeText(el, 'headervalue');
                if (hName != 'Content-Disposition' || hValue != 'attachment') return;
                var mimepart = el.parentNode;
                var filename = '';

                var params = XMLUtils.XPathSelectNodes(el, 'parameter');
                params.forEach(function (c) {
                    if (XMLUtils.XPathGetSingleNodeText(c, "paramname") == "filename") {
                        filename = XMLUtils.XPathGetSingleNodeText(c, "paramvalue");
                    }
                });

                var foundId = false;
                allHeaders.forEach(function (h) {
                    if (h.parentNode != mimepart) return;
                    var siblingName = XMLUtils.XPathGetSingleNodeText(h, "headername");
                    if (siblingName == "X-Attachment-Id") {
                        id = XMLUtils.XPathGetSingleNodeText(h, "headervalue");
                        foundId = true;
                    }
                });
                // attachments[id] = filename;
                attachments.push({ id: id, fileName: filename });
                if (!foundId) {
                    id = id + 1;
                }
            });
            this.setState({ attachments: attachments });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            return _react2['default'].createElement(
                MaterialUI.Paper,
                { zDepth: 1, style: styles.container },
                ["From", "To", "Cc"].map(function (id) {
                    return _react2['default'].createElement(HeaderField, _extends({}, _this.props, { key: id, headerName: id, headerValue: _this.state.headers[id] }));
                }),
                _react2['default'].createElement(
                    'div',
                    { style: styles.title },
                    _react2['default'].createElement(
                        'div',
                        { style: styles.title.subject },
                        _react2['default'].createElement(
                            'p',
                            { style: { fontSize: 18, color: '#9f9f9f' } },
                            this.state.headers['Subject']
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        { style: styles.title.date },
                        _react2['default'].createElement(
                            'p',
                            { style: { fontSize: 14, color: '#9f9f9f', opacity: 0.8 } },
                            this.state.headers['Date']
                        )
                    )
                ),
                _react2['default'].createElement(EmailBody, { isHtml: this.state.isHtml, body: this.state.body }),
                _react2['default'].createElement(
                    'div',
                    { style: styles.attachments },
                    Object.values(this.state.attachments).map(function (a) {
                        return _react2['default'].createElement(Attachment, _extends({}, _this.props, { attachment: a }));
                    })
                )
            );
        }
    }]);

    return Editor;
})(_react2['default'].Component);

var editors = pydio.Registry.getActiveExtensionByType("editor");
var conf = editors.filter(function (_ref3) {
    var id = _ref3.id;
    return id === 'editor.eml';
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

exports['default'] = (0, _redux.compose)(withSelection(getSelection), (0, _reactRedux.connect)())(Editor);
module.exports = exports['default'];

},{"react":"react","react-redux":"react-redux","redux":"redux"}],3:[function(require,module,exports){
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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _editor = require('./editor');

var _editor2 = _interopRequireDefault(_editor);

var _controls = require('./controls');

var Controls = _interopRequireWildcard(_controls);

exports.Editor = _editor2['default'];
exports.Controls = Controls;

},{"./controls":1,"./editor":2}]},{},[3])(3)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJyZXMvYnVpbGQvUHlkaW9FbWwvY29udHJvbHMuanMiLCJyZXMvYnVpbGQvUHlkaW9FbWwvZWRpdG9yLmpzIiwicmVzL2J1aWxkL1B5ZGlvRW1sL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdmdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gKiBDb3B5cmlnaHQgMjAwNy0yMDE3IENoYXJsZXMgZHUgSmV1IC0gQWJzdHJpdW0gU0FTIDx0ZWFtIChhdCkgcHlkLmlvPlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgUHlkaW8uXG4gKlxuICogUHlkaW8gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBQeWRpbyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBQeWRpby4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqXG4gKiBUaGUgbGF0ZXN0IGNvZGUgY2FuIGJlIGZvdW5kIGF0IDxodHRwczovL3B5ZGlvLmNvbT4uXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgX1B5ZGlvSE9DcyA9IFB5ZGlvSE9DcztcbnZhciBTZWxlY3Rpb25Db250cm9scyA9IF9QeWRpb0hPQ3MuU2VsZWN0aW9uQ29udHJvbHM7XG5leHBvcnRzLlNlbGVjdGlvbkNvbnRyb2xzID0gU2VsZWN0aW9uQ29udHJvbHM7XG4iLCIvKlxuICogQ29weXJpZ2h0IDIwMDctMjAxNyBDaGFybGVzIGR1IEpldSAtIEFic3RyaXVtIFNBUyA8dGVhbSAoYXQpIHB5ZC5pbz5cbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFB5ZGlvLlxuICpcbiAqIFB5ZGlvIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogUHlkaW8gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggUHlkaW8uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVGhlIGxhdGVzdCBjb2RlIGNhbiBiZSBmb3VuZCBhdCA8aHR0cHM6Ly9weWRpby5jb20+LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gyLCBfeDMsIF94NCkgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeDIsIHByb3BlcnR5ID0gX3gzLCByZWNlaXZlciA9IF94NDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeDIgPSBwYXJlbnQ7IF94MyA9IHByb3BlcnR5OyBfeDQgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgZGVzYyA9IHBhcmVudCA9IHVuZGVmaW5lZDsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RSZWR1eCA9IHJlcXVpcmUoJ3JlYWN0LXJlZHV4Jyk7XG5cbnZhciBfcmVkdXggPSByZXF1aXJlKCdyZWR1eCcpO1xuXG52YXIgX1B5ZGlvSE9DcyA9IFB5ZGlvSE9DcztcbnZhciB3aXRoU2VsZWN0aW9uID0gX1B5ZGlvSE9Dcy53aXRoU2VsZWN0aW9uO1xuXG52YXIgc3R5bGVzID0ge1xuICAgIGNoaXA6IHtcbiAgICAgICAgbWFyZ2luOiA0XG4gICAgfSxcbiAgICBjb250YWluZXI6IHtcbiAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nXG4gICAgfSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgIG1heEhlaWdodDogNDQsXG4gICAgICAgIG92ZXJmbG93WTogJ3Njcm9sbCcsXG4gICAgICAgIHBhZGRpbmdMZWZ0OiAyMCxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBmbGV4V3JhcDogJ3dyYXAnLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93JyxcbiAgICAgICAgY29sb3I6ICcjNzU3NTc1J1xuICAgIH0sXG4gICAgaGVhZGVyTmFtZToge1xuICAgICAgICB3aWR0aDogNTAsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcsXG4gICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInXG4gICAgfSxcbiAgICBoZWFkZXJUaXRsZUF0dHJpYnV0ZToge1xuICAgICAgICBmb250U2l6ZTogJzE0cHgnLFxuICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCdcbiAgICB9LFxuICAgIHRpdGxlOiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcsXG4gICAgICAgIG1hcmdpblRvcDogMjAsXG4gICAgICAgIG1hcmdpbkJvdHRvbTogMjAsXG4gICAgICAgIG1hcmdpbkxlZnQ6IDIwLFxuICAgICAgICBtYXJnaW5SaWdodDogMjAsXG4gICAgICAgIHN1YmplY3Q6IHtcbiAgICAgICAgICAgIGZsZXg6IDEsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICAgICAgICBmb250U2l6ZTogMTgsXG4gICAgICAgICAgICBjb2xvcjogJyNBOUE5QTknXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGU6IHtcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdsaWdodCcsXG4gICAgICAgICAgICBjb2xvcjogJyNBOUE5QTknXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGJvZHk6IHtcbiAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgIGZsZXg6IDEsXG4gICAgICAgIG1hcmdpbkxlZnQ6IDIwLFxuICAgICAgICBtYXJnaW5SaWdodDogMjAsXG4gICAgICAgIG92ZXJmbG93WTogJ3Njcm9sbCdcbiAgICB9LFxuICAgIHBvcG92ZXI6IHtcbiAgICAgICAgekluZGV4OiAxMDAwMDBcbiAgICB9LFxuICAgIGF0dGFjaG1lbnRzOiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgb3ZlcmZsb3dYOiAnc2Nyb2xsJyxcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgbWF4SGVpZ2h0OiAxNTAsXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICBwYWRkaW5nVG9wOiA0LFxuICAgICAgICBwYWRkaW5nQm90dG9tOiA0XG4gICAgfSxcbiAgICBhdHRhY2htZW50OiB7XG4gICAgICAgIG1hcmdpbkxlZnQ6IDhcbiAgICB9XG59O1xuXG52YXIgRW1haWxCb2R5ID0gZnVuY3Rpb24gRW1haWxCb2R5KF9yZWYpIHtcbiAgICB2YXIgaXNIdG1sID0gX3JlZi5pc0h0bWw7XG4gICAgdmFyIGJvZHkgPSBfcmVmLmJvZHk7XG5cbiAgICBpZiAoaXNIdG1sKSB7XG4gICAgICAgIHJldHVybiBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogc3R5bGVzLmJvZHksIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7IF9faHRtbDogYm9keSB9IH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICdwJyxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBib2R5XG4gICAgICAgICk7XG4gICAgfVxufTtcblxudmFyIENvbnRhY3RDaGlwID0gZnVuY3Rpb24gQ29udGFjdENoaXAoX3JlZjIpIHtcbiAgICB2YXIgY29udGFjdCA9IF9yZWYyLmNvbnRhY3Q7XG5cbiAgICByZXR1cm4gX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIE1hdGVyaWFsVUkuQ2hpcCxcbiAgICAgICAgeyBzdHlsZTogc3R5bGVzLmNoaXAgfSxcbiAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBNYXRlcmlhbFVJLkF2YXRhcixcbiAgICAgICAgICAgIHsgc2l6ZTogMzIgfSxcbiAgICAgICAgICAgIGNvbnRhY3RbMF1cbiAgICAgICAgKSxcbiAgICAgICAgY29udGFjdFxuICAgICk7XG59O1xuXG52YXIgSGVhZGVyRmllbGQgPSAoZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoSGVhZGVyRmllbGQsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gSGVhZGVyRmllbGQocHJvcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEhlYWRlckZpZWxkKTtcblxuICAgICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihIZWFkZXJGaWVsZC5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIHByb3BzKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoSGVhZGVyRmllbGQsIFt7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgICAgICAgIHZhciBoZWFkZXJOYW1lID0gX3Byb3BzLmhlYWRlck5hbWU7XG4gICAgICAgICAgICB2YXIgaGVhZGVyVmFsdWUgPSBfcHJvcHMuaGVhZGVyVmFsdWU7XG5cbiAgICAgICAgICAgIHZhciBlbWFpbHMgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGhlYWRlclZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZW1haWxzID0gaGVhZGVyVmFsdWUuc3BsaXQoJywnKS5tYXAoZnVuY3Rpb24gKGVtYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChDb250YWN0Q2hpcCwgeyBjb250YWN0OiBlbWFpbCB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KCdkaXYnLCBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBoTmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHN3aXRjaCAoaGVhZGVyTmFtZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Zyb20nOlxuICAgICAgICAgICAgICAgICAgICBoTmFtZSA9IHB5ZGlvLk1lc3NhZ2VIYXNoWydlZGl0b3IuZW1sLjEnXTticmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdUbyc6XG4gICAgICAgICAgICAgICAgICAgIGhOYW1lID0gcHlkaW8uTWVzc2FnZUhhc2hbJ2VkaXRvci5lbWwuMiddO2JyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0NjJzpcbiAgICAgICAgICAgICAgICAgICAgaE5hbWUgPSBweWRpby5NZXNzYWdlSGFzaFsnZWRpdG9yLmVtbC4xMiddO2JyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGhOYW1lID0gJ3VuZXhwZWN0ZWQgaGVhZGVyJzticmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLmhlYWRlcnMgfSxcbiAgICAgICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy5oZWFkZXJOYW1lIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogeyBmb250U2l6ZTogJzE0cHgnLCBmb250V2VpZ2h0OiAnYm9sZCcsIGNvbG9yOiAnIzlmOWY5ZicgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc6ICdcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWxzXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChNYXRlcmlhbFVJLkRpdmlkZXIsIG51bGwpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEhlYWRlckZpZWxkO1xufSkoX3JlYWN0MlsnZGVmYXVsdCddLkNvbXBvbmVudCk7XG5cbnZhciBBdHRhY2htZW50ID0gKGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50Mikge1xuICAgIF9pbmhlcml0cyhBdHRhY2htZW50LCBfUmVhY3QkQ29tcG9uZW50Mik7XG5cbiAgICBmdW5jdGlvbiBBdHRhY2htZW50KHByb3BzKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBdHRhY2htZW50KTtcblxuICAgICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihBdHRhY2htZW50LnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgcHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBvcGVuOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhBdHRhY2htZW50LCBbe1xuICAgICAgICBrZXk6ICdkb3dubG9hZEF0dGFjaG1lbnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZG93bmxvYWRBdHRhY2htZW50KCkge1xuICAgICAgICAgICAgdmFyIF9wcm9wczIgPSB0aGlzLnByb3BzO1xuICAgICAgICAgICAgdmFyIHB5ZGlvID0gX3Byb3BzMi5weWRpbztcbiAgICAgICAgICAgIHZhciBub2RlID0gX3Byb3BzMi5ub2RlO1xuXG4gICAgICAgICAgICB0aGlzLnByb3BzLnB5ZGlvLkFwaUNsaWVudC5kb3dubG9hZFNlbGVjdGlvbihudWxsLCAnZW1sX2RsX2F0dGFjaG1lbnQnLCB7IGZpbGU6IG5vZGUuZ2V0UGF0aCgpLCBhdHRhY2htZW50X2lkOiB0aGlzLnByb3BzLmF0dGFjaG1lbnQuaWQgfSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NvcHlBdHRhY2htZW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvcHlBdHRhY2htZW50KCkge1xuICAgICAgICAgICAgdmFyIF9wcm9wczMgPSB0aGlzLnByb3BzO1xuICAgICAgICAgICAgdmFyIHB5ZGlvID0gX3Byb3BzMy5weWRpbztcbiAgICAgICAgICAgIHZhciBub2RlID0gX3Byb3BzMy5ub2RlO1xuICAgICAgICAgICAgdmFyIGF0dGFjaG1lbnQgPSBfcHJvcHMzLmF0dGFjaG1lbnQ7XG5cbiAgICAgICAgICAgIHZhciBzdWJtaXQgPSBmdW5jdGlvbiBzdWJtaXQocGF0aCkge1xuICAgICAgICAgICAgICAgIHZhciB3c0lkID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICAgICAgICAgIHB5ZGlvLkFwaUNsaWVudC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0X2FjdGlvbjogJ2VtbF9jcF9hdHRhY2htZW50JyxcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogbm9kZS5nZXRQYXRoKCksXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnRfaWQ6IGF0dGFjaG1lbnQuaWQsXG4gICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uOiBwYXRoXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHRyYW5zcG9ydCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0cmFuc3BvcnQucmVzcG9uc2VYTUwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcHlkaW8uVUkub3BlbkNvbXBvbmVudEluTW9kYWwoJ0ZTQWN0aW9ucycsICdUcmVlRGlhbG9nJywge1xuICAgICAgICAgICAgICAgIGlzTW92ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZGlhbG9nVGl0bGU6IE1lc3NhZ2VIYXNoWzE1OV0sXG4gICAgICAgICAgICAgICAgc3VibWl0VmFsdWU6IHN1Ym1pdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2hhbmRsZVRvdWNoVGFwJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVRvdWNoVGFwKGV2ZW50KSB7XG4gICAgICAgICAgICAvLyBUaGlzIHByZXZlbnRzIGdob3N0IGNsaWNrLlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgb3BlbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhbmNob3JFbDogZXZlbnQuY3VycmVudFRhcmdldFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2hhbmRsZVJlcXVlc3RDbG9zZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVSZXF1ZXN0Q2xvc2UoKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBvcGVuOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICB2YXIgX3Byb3BzNCA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgICB2YXIgcHlkaW8gPSBfcHJvcHM0LnB5ZGlvO1xuICAgICAgICAgICAgdmFyIGF0dGFjaG1lbnQgPSBfcHJvcHM0LmF0dGFjaG1lbnQ7XG5cbiAgICAgICAgICAgIHJldHVybiBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBNYXRlcmlhbFVJLlBhcGVyLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHN0eWxlcy5hdHRhY2htZW50XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChNYXRlcmlhbFVJLkljb25CdXR0b24sIHsgaWNvbkNsYXNzTmFtZTogJ21kaSBtZGktZmlsZScsIGRpc2FibGVkOiB0cnVlIH0pLFxuICAgICAgICAgICAgICAgIGF0dGFjaG1lbnQuZmlsZU5hbWUsXG4gICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgIE1hdGVyaWFsVUkuSWNvbkJ1dHRvbixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbkNsYXNzTmFtZTogJ21kaSBtZGktZG90cy12ZXJ0aWNhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBvblRvdWNoVGFwOiB0aGlzLmhhbmRsZVRvdWNoVGFwLmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRlcmlhbFVJLlBvcG92ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlTGF5ZXJGb3JDbGlja0F3YXk6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7IHpJbmRleDogMTAwMDAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbjogdGhpcy5zdGF0ZS5vcGVuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuY2hvckVsOiB0aGlzLnN0YXRlLmFuY2hvckVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuY2hvck9yaWdpbjogeyBob3Jpem9udGFsOiAncmlnaHQnLCB2ZXJ0aWNhbDogJ3RvcCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRPcmlnaW46IHsgaG9yaXpvbnRhbDogJ3JpZ2h0JywgdmVydGljYWw6ICdib3R0b20nIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25SZXF1ZXN0Q2xvc2U6IHRoaXMuaGFuZGxlUmVxdWVzdENsb3NlLmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRlcmlhbFVJLk1lbnUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogeyB6SW5kZXg6IDEwMDAwMCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChNYXRlcmlhbFVJLk1lbnVJdGVtLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlUZXh0OiBweWRpby5NZXNzYWdlSGFzaFsnZWRpdG9yLmVtbC4xMCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblRvdWNoVGFwOiB0aGlzLmRvd25sb2FkQXR0YWNobWVudC5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoTWF0ZXJpYWxVSS5NZW51SXRlbSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5VGV4dDogcHlkaW8uTWVzc2FnZUhhc2hbJ2VkaXRvci5lbWwuMTEnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Ub3VjaFRhcDogdGhpcy5jb3B5QXR0YWNobWVudC5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gQXR0YWNobWVudDtcbn0pKF9yZWFjdDJbJ2RlZmF1bHQnXS5Db21wb25lbnQpO1xuXG52YXIgRWRpdG9yID0gKGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50Mykge1xuICAgIF9pbmhlcml0cyhFZGl0b3IsIF9SZWFjdCRDb21wb25lbnQzKTtcblxuICAgIGZ1bmN0aW9uIEVkaXRvcihwcm9wcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRWRpdG9yKTtcblxuICAgICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihFZGl0b3IucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsgaGVhZGVyczogW10sIGlzSHRtbDogZmFsc2UsIGJvZHk6ICcnLCBhdHRhY2htZW50czogW10gfTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoRWRpdG9yLCBbe1xuICAgICAgICBrZXk6ICdjb21wb25lbnRXaWxsTW91bnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkRmlsZUNvbnRlbnQodGhpcy5wcm9wcyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChuZXh0UHJvcHMubm9kZSAhPT0gdGhpcy5wcm9wcy5ub2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkRmlsZUNvbnRlbnQobmV4dFByb3BzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnbG9hZEZpbGVDb250ZW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGxvYWRGaWxlQ29udGVudChwcm9wcykge1xuICAgICAgICAgICAgdmFyIHB5ZGlvID0gcHJvcHMucHlkaW87XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHByb3BzLm5vZGU7XG4gICAgICAgICAgICB2YXIgb25Mb2FkID0gcHJvcHMub25Mb2FkO1xuXG4gICAgICAgICAgICBweWRpby5BcGlDbGllbnQucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgZ2V0X2FjdGlvbjogJ2VtbF9nZXRfeG1sX3N0cnVjdHVyZScsXG4gICAgICAgICAgICAgICAgZmlsZTogbm9kZS5nZXRQYXRoKClcbiAgICAgICAgICAgIH0sIChmdW5jdGlvbiAodHJhbnNwb3J0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZUhlYWRlcnModHJhbnNwb3J0LnJlc3BvbnNlWE1MKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlQXR0YWNobWVudHModHJhbnNwb3J0LnJlc3BvbnNlWE1MKTtcbiAgICAgICAgICAgIH0pLmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICBweWRpby5BcGlDbGllbnQucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgZ2V0X2FjdGlvbjogJ2VtbF9nZXRfYm9kaWVzJyxcbiAgICAgICAgICAgICAgICBmaWxlOiBub2RlLmdldFBhdGgoKVxuICAgICAgICAgICAgfSwgKGZ1bmN0aW9uICh0cmFuc3BvcnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlQm9keSh0cmFuc3BvcnQucmVzcG9uc2VYTUwpO1xuICAgICAgICAgICAgfSkuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3BhcnNlQm9keScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwYXJzZUJvZHkoeG1sRG9jKSB7XG4gICAgICAgICAgICB2YXIgYm9keSA9IFhNTFV0aWxzLlhQYXRoU2VsZWN0U2luZ2xlTm9kZSh4bWxEb2MsICdlbWFpbF9ib2R5L21pbWVwYXJ0W0B0eXBlPVwiaHRtbFwiXScpLmZpcnN0Q2hpbGQubm9kZVZhbHVlO1xuICAgICAgICAgICAgdmFyIGlzSHRtbCA9IHRydWU7XG4gICAgICAgICAgICBpZiAoIWJvZHkpIHtcbiAgICAgICAgICAgICAgICBib2R5ID0gWE1MVXRpbHMuWFBhdGhTZWxlY3RTaW5nbGVOb2RlKHhtbERvYywgJ2VtYWlsX2JvZHkvbWltZXBhcnRbQHR5cGU9XCJwbGFpblwiXScpLmZpcnN0Q2hpbGQubm9kZVZhbHVlO1xuICAgICAgICAgICAgICAgIGlzaHRtbCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGJvZHk6IGJvZHkgfSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNIdG1sOiBpc0h0bWwgfSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3BhcnNlSGVhZGVycycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwYXJzZUhlYWRlcnMoeG1sRG9jKSB7XG4gICAgICAgICAgICB2YXIgaGVhZGVycyA9IFhNTFV0aWxzLlhQYXRoU2VsZWN0Tm9kZXMoeG1sRG9jLCAnZW1haWwvaGVhZGVyJyk7XG4gICAgICAgICAgICB2YXIgc2VhcmNoZWRIZWFkZXJzID0ge307XG5cbiAgICAgICAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgaE5hbWUgPSBYTUxVdGlscy5YUGF0aEdldFNpbmdsZU5vZGVUZXh0KHZhbHVlLCAnaGVhZGVybmFtZScpO1xuICAgICAgICAgICAgICAgIHZhciBoVmFsdWUgPSBYTUxVdGlscy5YUGF0aEdldFNpbmdsZU5vZGVUZXh0KHZhbHVlLCAnaGVhZGVydmFsdWUnKTtcbiAgICAgICAgICAgICAgICBzZWFyY2hlZEhlYWRlcnNbaE5hbWVdID0gaFZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgaGVhZGVyczogc2VhcmNoZWRIZWFkZXJzIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdwYXJzZUF0dGFjaG1lbnRzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHBhcnNlQXR0YWNobWVudHMoeG1sRG9jKSB7XG4gICAgICAgICAgICB2YXIgYWxsSGVhZGVycyA9IFhNTFV0aWxzLlhQYXRoU2VsZWN0Tm9kZXMoeG1sRG9jLCAnLy9oZWFkZXInKTtcbiAgICAgICAgICAgIC8vIGxldCBhdHRhY2htZW50cyA9IHt9O1xuICAgICAgICAgICAgdmFyIGF0dGFjaG1lbnRzID0gW107XG4gICAgICAgICAgICB2YXIgaWQgPSAwO1xuICAgICAgICAgICAgYWxsSGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgIHZhciBoTmFtZSA9IFhNTFV0aWxzLlhQYXRoR2V0U2luZ2xlTm9kZVRleHQoZWwsICdoZWFkZXJuYW1lJyk7XG4gICAgICAgICAgICAgICAgdmFyIGhWYWx1ZSA9IFhNTFV0aWxzLlhQYXRoR2V0U2luZ2xlTm9kZVRleHQoZWwsICdoZWFkZXJ2YWx1ZScpO1xuICAgICAgICAgICAgICAgIGlmIChoTmFtZSAhPSAnQ29udGVudC1EaXNwb3NpdGlvbicgfHwgaFZhbHVlICE9ICdhdHRhY2htZW50JykgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHZhciBtaW1lcGFydCA9IGVsLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGVuYW1lID0gJyc7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGFyYW1zID0gWE1MVXRpbHMuWFBhdGhTZWxlY3ROb2RlcyhlbCwgJ3BhcmFtZXRlcicpO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChYTUxVdGlscy5YUGF0aEdldFNpbmdsZU5vZGVUZXh0KGMsIFwicGFyYW1uYW1lXCIpID09IFwiZmlsZW5hbWVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZW5hbWUgPSBYTUxVdGlscy5YUGF0aEdldFNpbmdsZU5vZGVUZXh0KGMsIFwicGFyYW12YWx1ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIGZvdW5kSWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBhbGxIZWFkZXJzLmZvckVhY2goZnVuY3Rpb24gKGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGgucGFyZW50Tm9kZSAhPSBtaW1lcGFydCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2libGluZ05hbWUgPSBYTUxVdGlscy5YUGF0aEdldFNpbmdsZU5vZGVUZXh0KGgsIFwiaGVhZGVybmFtZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpYmxpbmdOYW1lID09IFwiWC1BdHRhY2htZW50LUlkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gWE1MVXRpbHMuWFBhdGhHZXRTaW5nbGVOb2RlVGV4dChoLCBcImhlYWRlcnZhbHVlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRJZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyBhdHRhY2htZW50c1tpZF0gPSBmaWxlbmFtZTtcbiAgICAgICAgICAgICAgICBhdHRhY2htZW50cy5wdXNoKHsgaWQ6IGlkLCBmaWxlTmFtZTogZmlsZW5hbWUgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCFmb3VuZElkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkID0gaWQgKyAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBNYXRlcmlhbFVJLlBhcGVyLFxuICAgICAgICAgICAgICAgIHsgekRlcHRoOiAxLCBzdHlsZTogc3R5bGVzLmNvbnRhaW5lciB9LFxuICAgICAgICAgICAgICAgIFtcIkZyb21cIiwgXCJUb1wiLCBcIkNjXCJdLm1hcChmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KEhlYWRlckZpZWxkLCBfZXh0ZW5kcyh7fSwgX3RoaXMucHJvcHMsIHsga2V5OiBpZCwgaGVhZGVyTmFtZTogaWQsIGhlYWRlclZhbHVlOiBfdGhpcy5zdGF0ZS5oZWFkZXJzW2lkXSB9KSk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiBzdHlsZXMudGl0bGUgfSxcbiAgICAgICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy50aXRsZS5zdWJqZWN0IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogeyBmb250U2l6ZTogMTgsIGNvbG9yOiAnIzlmOWY5ZicgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuaGVhZGVyc1snU3ViamVjdCddXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiBzdHlsZXMudGl0bGUuZGF0ZSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3AnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgZm9udFNpemU6IDE0LCBjb2xvcjogJyM5ZjlmOWYnLCBvcGFjaXR5OiAwLjggfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuaGVhZGVyc1snRGF0ZSddXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KEVtYWlsQm9keSwgeyBpc0h0bWw6IHRoaXMuc3RhdGUuaXNIdG1sLCBib2R5OiB0aGlzLnN0YXRlLmJvZHkgfSksXG4gICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiBzdHlsZXMuYXR0YWNobWVudHMgfSxcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LnZhbHVlcyh0aGlzLnN0YXRlLmF0dGFjaG1lbnRzKS5tYXAoZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChBdHRhY2htZW50LCBfZXh0ZW5kcyh7fSwgX3RoaXMucHJvcHMsIHsgYXR0YWNobWVudDogYSB9KSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBFZGl0b3I7XG59KShfcmVhY3QyWydkZWZhdWx0J10uQ29tcG9uZW50KTtcblxudmFyIGVkaXRvcnMgPSBweWRpby5SZWdpc3RyeS5nZXRBY3RpdmVFeHRlbnNpb25CeVR5cGUoXCJlZGl0b3JcIik7XG52YXIgY29uZiA9IGVkaXRvcnMuZmlsdGVyKGZ1bmN0aW9uIChfcmVmMykge1xuICAgIHZhciBpZCA9IF9yZWYzLmlkO1xuICAgIHJldHVybiBpZCA9PT0gJ2VkaXRvci5lbWwnO1xufSlbMF07XG5cbnZhciBnZXRTZWxlY3Rpb25GaWx0ZXIgPSBmdW5jdGlvbiBnZXRTZWxlY3Rpb25GaWx0ZXIobm9kZSkge1xuICAgIHJldHVybiBjb25mLm1pbWVzLmluZGV4T2Yobm9kZS5nZXRBanhwTWltZSgpKSA+IC0xO1xufTtcblxudmFyIGdldFNlbGVjdGlvbiA9IGZ1bmN0aW9uIGdldFNlbGVjdGlvbihub2RlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHNlbGVjdGlvbiA9IFtdO1xuXG4gICAgICAgIG5vZGUuZ2V0UGFyZW50KCkuZ2V0Q2hpbGRyZW4oKS5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGlvbi5wdXNoKGNoaWxkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGVjdGlvbiA9IHNlbGVjdGlvbi5maWx0ZXIoZ2V0U2VsZWN0aW9uRmlsdGVyKTtcblxuICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIHNlbGVjdGlvbjogc2VsZWN0aW9uLFxuICAgICAgICAgICAgY3VycmVudEluZGV4OiBzZWxlY3Rpb24ucmVkdWNlKGZ1bmN0aW9uIChjdXJyZW50SW5kZXgsIGN1cnJlbnQsIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQgPT09IG5vZGUgJiYgaW5kZXggfHwgY3VycmVudEluZGV4O1xuICAgICAgICAgICAgfSwgMClcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSAoMCwgX3JlZHV4LmNvbXBvc2UpKHdpdGhTZWxlY3Rpb24oZ2V0U2VsZWN0aW9uKSwgKDAsIF9yZWFjdFJlZHV4LmNvbm5lY3QpKCkpKEVkaXRvcik7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbiIsIi8qXG4gKiBDb3B5cmlnaHQgMjAwNy0yMDE3IENoYXJsZXMgZHUgSmV1IC0gQWJzdHJpdW0gU0FTIDx0ZWFtIChhdCkgcHlkLmlvPlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgUHlkaW8uXG4gKlxuICogUHlkaW8gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBQeWRpbyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBQeWRpby4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqXG4gKiBUaGUgbGF0ZXN0IGNvZGUgY2FuIGJlIGZvdW5kIGF0IDxodHRwczovL3B5ZGlvLmNvbT4uXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09ialsnZGVmYXVsdCddID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX2VkaXRvciA9IHJlcXVpcmUoJy4vZWRpdG9yJyk7XG5cbnZhciBfZWRpdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2VkaXRvcik7XG5cbnZhciBfY29udHJvbHMgPSByZXF1aXJlKCcuL2NvbnRyb2xzJyk7XG5cbnZhciBDb250cm9scyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9jb250cm9scyk7XG5cbmV4cG9ydHMuRWRpdG9yID0gX2VkaXRvcjJbJ2RlZmF1bHQnXTtcbmV4cG9ydHMuQ29udHJvbHMgPSBDb250cm9scztcbiJdfQ==
