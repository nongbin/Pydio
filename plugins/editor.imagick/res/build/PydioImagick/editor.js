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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _components = require('./components');

var _pydioHttpApi = require('pydio/http/api');

var _pydioHttpApi2 = _interopRequireDefault(_pydioHttpApi);

var conf = pydio.getPluginConfigs('editor.diaporama');
var sizes = conf && conf.get("PREVIEWER_LOWRES_SIZES").split(",") || [300, 700, 1000, 1300];

var _PydioHOCs = PydioHOCs;
var SizeProviders = _PydioHOCs.SizeProviders;
var URLProvider = _PydioHOCs.URLProvider;
var withResolution = _PydioHOCs.withResolution;
var withSelection = _PydioHOCs.withSelection;
var withResize = _PydioHOCs.withResize;
var ImageSizeProvider = SizeProviders.ImageSizeProvider;
var ContainerSizeProvider = SizeProviders.ContainerSizeProvider;

var ExtendedImageContainer = withResize(_components.ImageContainer);

var Editor = (function (_PureComponent) {
    _inherits(Editor, _PureComponent);

    function Editor() {
        _classCallCheck(this, Editor);

        _get(Object.getPrototypeOf(Editor.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Editor, [{
        key: 'componentWillUnmount',

        /*static getCoveringBackgroundSource(ajxpNode) {
            return this.getThumbnailSource(ajxpNode);
        }
         static getThumbnailSource(ajxpNode) {
            var repoString = "";
            if(pydio.repositoryId && ajxpNode.getMetadata().get("repository_id") && ajxpNode.getMetadata().get("repository_id") != pydio.repositoryId){
                repoString = "&tmp_repository_id=" + ajxpNode.getMetadata().get("repository_id");
            }
            var mtimeString = ajxpNode.buildRandomSeed();
            return pydio.Parameters.get('ajxpServerAccess') + repoString + mtimeString + "&get_action=preview_data_proxy&get_thumb=true&file="+encodeURIComponent(ajxpNode.getPath());
        }
         static getOriginalSource(ajxpNode) {
            return pydio.Parameters.get('ajxpServerAccess')+'&action=preview_data_proxy'+ajxpNode.buildRandomSeed()+'&file='+encodeURIComponent(ajxpNode.getPath());
        }
         static getSharedPreviewTemplate(node, link) {
            // Return string
            return '<img src="' + link + '"/>';
        }
         static getRESTPreviewLinks(node) {
            return {
                "Original image": "",
                "Thumbnail (200px)": "&get_thumb=true&dimension=200"
            };
        }*/

        value: function componentWillUnmount() {
            var selection = this.props.selection;

            var node = selection && selection.first();

            if (!node) {
                return;
            }

            var fileId = node.getMetadata().get('thumb_file_id').replace("-0.jpg", "").replace(".jpg", "");
            _pydioHttpApi2['default'].getClient().request({ get_action: 'delete_imagick_data', file: fileId });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.selectionPlaying !== nextProps.selectionPlaying) {
                if (nextProps.selectionPlaying) {
                    this.pe = new PeriodicalExecuter(nextProps.onRequestSelectionPlay, 3);
                } else {
                    this.pe && this.pe.stop();
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var node = _props.node;
            var src = _props.src;
            var editorData = _props.editorData;
            var scale = _props.scale;

            if (!node) return null;

            return _react2['default'].createElement(
                ContainerSizeProvider,
                null,
                function (_ref) {
                    var containerWidth = _ref.containerWidth;
                    var containerHeight = _ref.containerHeight;
                    return _react2['default'].createElement(
                        ImageSizeProvider,
                        { url: src, node: node },
                        function (_ref2) {
                            var imgWidth = _ref2.imgWidth;
                            var imgHeight = _ref2.imgHeight;
                            return _react2['default'].createElement(ExtendedImageContainer, {
                                editorData: editorData,
                                node: node,
                                src: src,
                                width: imgWidth,
                                height: imgHeight,
                                containerWidth: containerWidth,
                                containerHeight: containerHeight
                            });
                        }
                    );
                }
            );
        }
    }], [{
        key: 'propTypes',
        get: function get() {
            return {
                node: _react2['default'].PropTypes.instanceOf(AjxpNode).isRequired,
                pydio: _react2['default'].PropTypes.instanceOf(Pydio).isRequired
            };
        }
    }]);

    return Editor;
})(_react.PureComponent);

var getSelection = function getSelection(node) {
    var path = node.getPath();
    var label = node.getLabel();

    return new Promise(function (resolve, reject) {
        _pydioHttpApi2['default'].getClient().request({
            get_action: 'imagick_data_proxy',
            all: 'true',
            file: path
        }, function (_ref3) {
            var responseJSON = _ref3.responseJSON;

            resolve({
                selection: responseJSON.map(function (_ref4, page) {
                    var width = _ref4.width;
                    var height = _ref4.height;
                    var file = _ref4.file;

                    var node = new AjxpNode(path, true, label + ' (' + (page + 1) + ')');

                    node.getMetadata().set('image_width', width);
                    node.getMetadata().set('image_height', height);
                    node.getMetadata().set('thumb_file_id', file);

                    return node;
                }),
                currentIndex: 0
            });
        }, reject);
    });
};

var getThumbnailURL = function getThumbnailURL(node) {
    var baseURL = pydio.Parameters.get('ajxpServerAccess');
    var path = encodeURIComponent(node.getPath());
    var file = encodeURIComponent(node.getMetadata().get('thumb_file_id'));

    return baseURL + '&get_action=get_extracted_page&file=' + file + '&src_file=' + path;
};

exports['default'] = (0, _redux.compose)(withSelection(getSelection), withResolution(sizes, function (node) {
    return getThumbnailURL(node);
}, function (node) {
    return getThumbnailURL(node);
}))(Editor);
module.exports = exports['default'];
