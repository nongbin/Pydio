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
