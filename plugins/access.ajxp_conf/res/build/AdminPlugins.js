(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var _corePluginsList = require('../core/PluginsList');

var _corePluginsList2 = _interopRequireDefault(_corePluginsList);

var _corePluginEditor = require('../core/PluginEditor');

var _corePluginEditor2 = _interopRequireDefault(_corePluginEditor);

var AuthenticationPluginsDashboard = React.createClass({
    displayName: 'AuthenticationPluginsDashboard',

    mixins: [AdminComponents.MessagesConsumerMixin],

    openSelection: function openSelection(node) {
        this.props.openRightPane({
            COMPONENT: _corePluginEditor2['default'],
            PROPS: {
                rootNode: node,
                docAsAdditionalPane: true,
                className: "vertical edit-plugin-inpane",
                closeEditor: this.props.closeRightPane
            },
            CHILDREN: null
        });
    },

    getInitialState: function getInitialState() {
        return { authfrontNode: new AjxpNode('/plugins/manager/authfront') };
    },

    render: function render() {
        var pluginsList = React.createElement(_corePluginsList2['default'], {
            title: this.context.getMessage('plugtype.title.authfront', ''),
            dataModel: this.props.dataModel,
            node: this.state.authfrontNode,
            rootNode: this.state.authfrontNode,
            openSelection: this.openSelection
        });
        return React.createElement(_corePluginEditor2['default'], _extends({}, this.props, {
            style: _extends({}, this.props.style, { backgroundColor: '#f4f4f4' }),
            additionalPanes: { top: [pluginsList], bottom: [] },
            tabs: [{ label: this.context.getMessage('plugins.1'), groups: [0, 1, 2, 6] }, // general
            { label: this.context.getMessage('plugins.2'), groups: [3] }, // master driver
            { label: this.context.getMessage('plugins.3'), groups: [4, 5] } // secondary driver
            ]
        }));
    }

});

exports['default'] = AuthenticationPluginsDashboard;
module.exports = exports['default'];

},{"../core/PluginEditor":5,"../core/PluginsList":6}],2:[function(require,module,exports){
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _corePluginEditor = require('../core/PluginEditor');

var _corePluginEditor2 = _interopRequireDefault(_corePluginEditor);

var _require = require('react-chartjs');

var Doughnut = _require.Doughnut;

var CacheServerDashboard = _react2['default'].createClass({
    displayName: 'CacheServerDashboard',

    mixins: [AdminComponents.MessagesConsumerMixin],

    getInitialState: function getInitialState() {
        return { cacheStatuses: [], loading: false };
    },

    componentDidMount: function componentDidMount() {
        this.checkCacheStats();
    },

    clearCache: function clearCache(namespace) {
        PydioApi.getClient().request({ get_action: 'cache_service_clear_cache', namespace: namespace }, (function (transp) {
            this.checkCacheStats();
        }).bind(this));
    },

    checkCacheStats: function checkCacheStats() {
        this.setState({ loading: true });
        PydioApi.getClient().request({ get_action: 'cache_service_expose_stats' }, (function (transp) {
            this.setState({ loading: false });
            if (!this.isMounted()) return;
            var response = transp.responseJSON;
            this.setState({ cacheStatuses: response });
            setTimeout(this.checkCacheStats.bind(this), 4000);
        }).bind(this));
    },

    formatUptime: function formatUptime(time) {
        var sec_num = parseInt(time, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - hours * 3600) / 60);
        var seconds = sec_num - hours * 3600 - minutes * 60;

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return hours + ':' + minutes + ':' + seconds;
    },

    renderCachePane: function renderCachePane(cacheData) {
        var healthPercent = parseInt(100 * cacheData.misses / cacheData.hits);
        var health = undefined;
        if (healthPercent < 5) {
            health = '< 5%';
        } else if (healthPercent < 20) {
            health = '< 20%';
        } else if (healthPercent < 40) {
            health = '< 40%';
        } else if (healthPercent < 60) {
            health = '> 40%';
        } else {
            health = '> 60%';
        }
        var memoryUsage = undefined;
        if (cacheData.memory_available) {
            memoryUsage = _react2['default'].createElement(
                'div',
                { className: 'doughnut-chart' },
                _react2['default'].createElement(
                    'h5',
                    null,
                    'Memory Usage'
                ),
                _react2['default'].createElement(Doughnut, {
                    data: [{
                        value: cacheData.memory_usage,
                        color: "rgba(247, 70, 74, 0.51)",
                        highlight: "#FF5A5E",
                        label: "Memory Used"
                    }, {
                        value: cacheData.memory_available - cacheData.memory_usage,
                        color: "rgba(70, 191, 189, 0.59)",
                        highlight: "#5AD3D1",
                        label: "Memory Available"
                    }],
                    options: {},
                    width: 150
                }),
                _react2['default'].createElement(
                    'span',
                    { className: 'figure' },
                    parseInt(100 * cacheData.memory_usage / cacheData.memory_available),
                    '%'
                )
            );
        } else {
            memoryUsage = _react2['default'].createElement(
                'div',
                { className: 'doughnut-chart' },
                _react2['default'].createElement(
                    'h5',
                    null,
                    'Memory Usage'
                ),
                _react2['default'].createElement(
                    'div',
                    { className: 'figure', style: { top: 'auto' } },
                    PathUtils.roundFileSize(cacheData.memory_usage)
                )
            );
        }

        return _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
                'h4',
                null,
                'Namespace \'',
                cacheData.namespace,
                '\''
            ),
            _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'div',
                    { style: { width: '50%', float: 'left' } },
                    memoryUsage
                ),
                _react2['default'].createElement(
                    'div',
                    { style: { width: '50%', float: 'left' } },
                    _react2['default'].createElement(
                        'div',
                        { className: 'doughnut-chart' },
                        _react2['default'].createElement(
                            'h5',
                            null,
                            'Cache Health'
                        ),
                        _react2['default'].createElement(Doughnut, {
                            data: [{
                                value: cacheData.misses,
                                color: "rgba(247, 70, 74, 0.51)",
                                highlight: "#FF5A5E",
                                label: "Missed"
                            }, {
                                value: cacheData.hits,
                                color: "rgba(70, 191, 189, 0.59)",
                                highlight: "#5AD3D1",
                                label: "Hits"
                            }],
                            options: {},
                            width: 150
                        }),
                        _react2['default'].createElement(
                            'span',
                            { className: 'figure' },
                            health
                        )
                    )
                )
            ),
            _react2['default'].createElement(
                'div',
                null,
                'Uptime: ',
                this.formatUptime(cacheData.uptime)
            )
        );
    },

    renderClearButton: function renderClearButton(cacheData) {
        return _react2['default'].createElement(
            'div',
            { style: { paddingBottom: 10 } },
            _react2['default'].createElement(_materialUi.RaisedButton, {
                label: "Clear " + cacheData.namespace + " cache",
                onTouchTap: this.clearCache.bind(this, cacheData.namespace)
            })
        );
    },

    renderStatusPane: function renderStatusPane() {
        var overall = this.state.cacheStatuses.length ? this.renderCachePane(this.state.cacheStatuses[0]) : null;
        return _react2['default'].createElement(
            'div',
            { style: { padding: '0 20px' } },
            _react2['default'].createElement(
                'h3',
                null,
                'Status'
            ),
            _react2['default'].createElement(
                'div',
                null,
                overall
            ),
            _react2['default'].createElement(
                'h3',
                null,
                'Cache Control'
            ),
            _react2['default'].createElement(
                'div',
                null,
                this.state.cacheStatuses.map(this.renderClearButton.bind(this))
            )
        );
    },

    render: function render() {
        var pane = this.renderStatusPane();
        return _react2['default'].createElement(
            'div',
            { className: 'cache-server-panel', style: { height: '100%' } },
            _react2['default'].createElement(_corePluginEditor2['default'], _extends({}, this.props, {
                additionalPanes: { top: [], bottom: [pane] }
            }))
        );
    }

});

exports['default'] = CacheServerDashboard;
module.exports = exports['default'];

},{"../core/PluginEditor":5,"material-ui":"material-ui","react":"react","react-chartjs":"react-chartjs"}],3:[function(require,module,exports){
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

var _PluginsList = require('./PluginsList');

var _PluginsList2 = _interopRequireDefault(_PluginsList);

var _PluginEditor = require('./PluginEditor');

var _PluginEditor2 = _interopRequireDefault(_PluginEditor);

var CoreAndPluginsDashboard = React.createClass({
    displayName: 'CoreAndPluginsDashboard',

    render: function render() {
        var coreId = PathUtils.getBasename(this.props.rootNode.getPath());
        if (coreId.indexOf("core.") !== 0) coreId = "core." + coreId;
        var fakeNode = new AjxpNode('/' + coreId);
        var pluginsList = React.createElement(_PluginsList2['default'], _extends({}, this.props, { title: this.props.rootNode.getLabel() }));
        return React.createElement(_PluginEditor2['default'], {
            rootNode: fakeNode,
            additionalPanes: { top: [], bottom: [pluginsList] }
        });
    }

});

exports['default'] = CoreAndPluginsDashboard;
module.exports = exports['default'];

},{"./PluginEditor":5,"./PluginsList":6}],4:[function(require,module,exports){
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

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _PluginsList = require('./PluginsList');

var _PluginsList2 = _interopRequireDefault(_PluginsList);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var PluginsManager = _react2['default'].createClass({
    displayName: 'PluginsManager',

    mixins: [AdminComponents.MessagesConsumerMixin],

    clearCache: function clearCache() {
        PydioApi.getClient().request({
            get_action: 'clear_plugins_cache'
        }, (function (transp) {
            this.refs.list.reload();
            global.pydio.fire("admin_clear_plugins_cache");
        }).bind(this));
    },

    render: function render() {
        return _react2['default'].createElement(
            'div',
            { style: { height: '100%' }, className: 'vertical-layout' },
            _react2['default'].createElement(
                'span',
                { style: { position: 'absolute', marginTop: 10, marginLeft: 10 } },
                _react2['default'].createElement(_materialUi.RaisedButton, {
                    label: this.context.getMessage('129', 'ajxp_conf'),
                    onTouchTap: this.clearCache
                })
            ),
            _react2['default'].createElement(_PluginsList2['default'], _extends({}, this.props, { ref: 'list' }))
        );
    }

});

exports['default'] = PluginsManager;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./PluginsList":6,"material-ui":"material-ui","react":"react"}],5:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

/**
 * Editor for a given plugin. By default, displays documentation in a left column panel,
 * and plugin parameters as form cards on the right.
 * May take additionalPanes to be appended to the form cards.
 */
var PluginEditor = _react2['default'].createClass({
    displayName: 'PluginEditor',

    mixins: [AdminComponents.MessagesConsumerMixin],

    propTypes: {
        rootNode: _react2['default'].PropTypes.instanceOf(AjxpNode).isRequired,
        close: _react2['default'].PropTypes.func,
        style: _react2['default'].PropTypes.string,
        className: _react2['default'].PropTypes.string,
        additionalPanes: _react2['default'].PropTypes.shape({
            top: _react2['default'].PropTypes.array,
            bottom: _react2['default'].PropTypes.array
        }),
        docAsAdditionalPane: _react2['default'].PropTypes.bool,
        additionalDescription: _react2['default'].PropTypes.string,
        registerCloseCallback: _react2['default'].PropTypes.func,
        onBeforeSave: _react2['default'].PropTypes.func,
        onAfterSave: _react2['default'].PropTypes.func,
        onRevert: _react2['default'].PropTypes.func,
        onDirtyChange: _react2['default'].PropTypes.func
    },

    loadPluginData: function loadPluginData(plugId) {

        PydioApi.getClient().request({
            get_action: 'get_plugin_manifest',
            plugin_id: plugId
        }, (function (transport) {

            var xmlData = transport.responseXML;
            var params = PydioForm.Manager.parseParameters(xmlData, "//global_param");
            var xmlValues = XMLUtils.XPathSelectNodes(xmlData, "//plugin_settings_values/param");
            var documentation = XMLUtils.XPathSelectSingleNode(xmlData, "//plugin_doc");
            var enabledAlways = false;
            var rootNode = XMLUtils.XPathSelectSingleNode(xmlData, "admin_data");
            var label = rootNode.firstChild.attributes.getNamedItem("label").value;
            var description = rootNode.firstChild.attributes.getNamedItem("description").value;
            try {
                enabledAlways = rootNode.firstChild.attributes.getNamedItem("enabled").value === 'always';
            } catch (e) {}

            var paramsValues = {};
            xmlValues.forEach(function (child) {
                if (child.nodeName != 'param') return;
                var valueParamName = child.getAttribute("name");
                if (child.getAttribute("cdatavalue")) {
                    paramsValues[valueParamName] = child.firstChild.nodeValue;
                } else {
                    paramsValues[valueParamName] = child.getAttribute('value');
                }
                var cType = null;
                params.map(function (def) {
                    if (def.name == valueParamName) cType = def.type;
                });
                if (cType == 'boolean') paramsValues[valueParamName] = paramsValues[valueParamName] == "true";else if (cType == 'integer') paramsValues[valueParamName] = parseInt(paramsValues[valueParamName]);
            });

            this.setState({
                loaded: true,
                parameters: params,
                values: paramsValues,
                originalValues: LangUtils.deepCopy(paramsValues),
                documentation: documentation,
                enabledAlways: enabledAlways,
                dirty: false,
                label: label,
                description: description,
                pluginId: plugId
            });

            if (this.props.registerCloseCallback) {
                this.props.registerCloseCallback((function () {
                    if (this.state && this.state.dirty && !confirm(this.context.getMessage('19', 'role_editor'))) {
                        return false;
                    }
                }).bind(this));
            }
        }).bind(this));
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.rootNode.getPath() != this.props.rootNode.getPath()) {
            this.loadPluginData(PathUtils.getBasename(nextProps.rootNode.getPath()));
            this.setState({ values: {} });
        }
    },

    getInitialState: function getInitialState() {

        var plugId = PathUtils.getBasename(this.props.rootNode.getPath());
        this.loadPluginData(plugId);

        return {
            loaded: false,
            parameters: [],
            values: {},
            documentation: '',
            dirty: false,
            label: '',
            docOpen: false
        };
    },

    externalSetDirty: function externalSetDirty() {
        this.setState({ dirty: true });
    },

    onChange: function onChange(formValues, dirty) {
        this.setState({ dirty: dirty, values: formValues });
        if (this.props.onDirtyChange) {
            this.props.onDirtyChange(dirty, formValues);
        }
    },

    save: function save() {
        var clientParams = {
            get_action: "edit",
            sub_action: "edit_plugin_options",
            plugin_id: this.state.pluginId
        };
        var postParams = this.refs['formPanel'].getValuesForPOST(this.state.values);
        if (postParams['DRIVER_OPTION_AJXP_PLUGIN_ENABLED']) {
            postParams['DRIVER_OPTION_AJXP_PLUGIN_ENABLED_ajxptype'] = "boolean";
        }
        clientParams = LangUtils.mergeObjectsRecursive(clientParams, postParams);
        if (this.props.onBeforeSave) {
            this.props.onBeforeSave(clientParams);
        }
        PydioApi.getClient().request(clientParams, (function (transport) {
            this.setState({ dirty: false });
            if (this.props.onAfterSave) {
                this.props.onAfterSave(transport);
            }
        }).bind(this));
    },

    revert: function revert() {
        this.setState({ dirty: false, values: this.state.originalValues });
        if (this.props.onRevert) {
            this.props.onRevert(this.state.originalValues);
        }
    },

    parameterHasHelper: function parameterHasHelper(paramName, testPluginId) {
        paramName = paramName.split('/').pop();
        var h = PydioForm.Manager.hasHelper(PathUtils.getBasename(this.props.rootNode.getPath()), paramName);
        if (!h && testPluginId) {
            h = PydioForm.Manager.hasHelper(testPluginId, paramName);
        }
        return h;
    },

    showHelper: function showHelper(helperData, testPluginId) {
        if (helperData) {
            var plugId = PathUtils.getBasename(this.props.rootNode.getPath());
            if (testPluginId && !PydioForm.Manager.hasHelper(plugId, helperData['name'])) {
                helperData['pluginId'] = testPluginId;
            } else {
                helperData['pluginId'] = plugId;
            }
            helperData['updateCallback'] = this.helperUpdateValues.bind(this);
        }
        this.setState({ helperData: helperData });
    },

    closeHelper: function closeHelper() {
        this.setState({ helperData: null });
    },

    /**
     * External helper can pass a full set of values and update them
     * @param newValues
     */
    helperUpdateValues: function helperUpdateValues(newValues) {
        this.onChange(newValues, true);
    },

    toggleDocPane: function toggleDocPane() {
        this.setState({ docOpen: !this.state.docOpen });
    },

    monitorMainPaneScrolling: function monitorMainPaneScrolling(event) {
        if (event.target.className.indexOf('pydio-form-panel') === -1) {
            return;
        }
        var scroll = event.target.scrollTop;
        var newState = scroll > 5;
        var currentScrolledState = this.state && this.state.mainPaneScrolled;
        if (newState != currentScrolledState) {
            this.setState({ mainPaneScrolled: newState });
        }
    },

    render: function render() {

        var addPanes = { top: [], bottom: [] };
        if (this.props.additionalPanes) {
            addPanes.top = this.props.additionalPanes.top.slice();
            addPanes.bottom = this.props.additionalPanes.bottom.slice();
        }
        var closeButton;
        if (this.props.closeEditor) {
            closeButton = _react2['default'].createElement(_materialUi.RaisedButton, { label: this.context.getMessage('86', ''), onTouchTap: this.props.closeEditor });
        }

        var doc = this.state.documentation;
        if (doc && this.props.docAsAdditionalPane) {
            doc = doc.firstChild.nodeValue.replace('<p><ul', '<ul').replace('</ul></p>', '</ul>').replace('<p></p>', '');
            doc = doc.replace('<img src="', '<img style="width:90%;" src="plugins/' + this.state.pluginId + '/');
            var readDoc = function readDoc() {
                return { __html: doc };
            };
            var docPane = _react2['default'].createElement(
                'div',
                { className: "plugin-doc" + (this.state.docOpen ? ' plugin-doc-open' : '') },
                _react2['default'].createElement(
                    'h3',
                    null,
                    'Documentation'
                ),
                _react2['default'].createElement('div', { className: 'plugin-doc-pane', dangerouslySetInnerHTML: readDoc() })
            );
            addPanes.top.push(docPane);
        }

        var scrollingClassName = '';
        if (this.state && this.state.mainPaneScrolled) {
            scrollingClassName = ' main-pane-scrolled';
        }
        // Building  a form
        return _react2['default'].createElement(
            'div',
            { className: (this.props.className ? this.props.className + " " : "") + "main-layout-nav-to-stack vertical-layout plugin-board" + scrollingClassName, style: this.props.style },
            _react2['default'].createElement(
                ReactMUI.Paper,
                { className: 'left-nav', zDepth: 0 },
                _react2['default'].createElement(
                    'h1',
                    { className: 'admin-panel-title' },
                    this.state.label
                ),
                _react2['default'].createElement(
                    'div',
                    { className: 'buttons-cont', style: { padding: 16 } },
                    _react2['default'].createElement(_materialUi.FlatButton, { secondary: true, disabled: !this.state.dirty, label: this.context.getMessage('plugins.6'), onTouchTap: this.revert }),
                    '  ',
                    _react2['default'].createElement(_materialUi.FlatButton, { secondary: true, disabled: !this.state.dirty, label: this.context.getMessage('plugins.5'), onTouchTap: this.save }),
                    '   ',
                    closeButton
                ),
                _react2['default'].createElement(
                    'div',
                    { className: "plugin-doc-pane" },
                    this.state.description,
                    ' ',
                    this.props.additionalDescription
                )
            ),
            _react2['default'].createElement(PydioForm.FormPanel, {
                ref: 'formPanel',
                className: 'row-flex',
                parameters: this.state.parameters,
                values: this.state.values,
                onChange: this.onChange,
                disabled: false,
                additionalPanes: addPanes,
                tabs: this.props.tabs,
                setHelperData: this.showHelper,
                checkHasHelper: this.parameterHasHelper,
                onScrollCallback: this.monitorMainPaneScrolling
            }),
            _react2['default'].createElement(PydioForm.PydioHelper, {
                helperData: this.state ? this.state.helperData : null,
                close: this.closeHelper
            })
        );
    }
});

exports['default'] = PluginEditor;
module.exports = exports['default'];

},{"material-ui":"material-ui","react":"react"}],6:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _PluginEditor = require('./PluginEditor');

var _PluginEditor2 = _interopRequireDefault(_PluginEditor);

var _materialUi = require('material-ui');

var PluginsList = React.createClass({
    displayName: 'PluginsList',

    mixins: [AdminComponents.MessagesConsumerMixin],

    togglePluginEnable: function togglePluginEnable(node, toggled) {
        var nodeId = PathUtils.getBasename(node.getPath());
        var params = {
            get_action: "edit",
            sub_action: "edit_plugin_options",
            plugin_id: nodeId,
            DRIVER_OPTION_AJXP_PLUGIN_ENABLED: toggled ? "true" : "false",
            DRIVER_OPTION_AJXP_PLUGIN_ENABLED_ajxptype: "boolean"
        };
        PydioApi.getClient().request(params, (function (transport) {
            node.getMetadata().set("enabled", this.context.getMessage(toggled ? '440' : '441', ''));
            this.forceUpdate();
            pydio.fire("admin_clear_plugins_cache");
        }).bind(this));
        return true;
    },

    renderListIcon: function renderListIcon(node) {
        if (!node.isLeaf()) {
            return React.createElement(
                'div',
                null,
                React.createElement('div', { className: 'icon-folder-open', style: { fontSize: 24, color: 'rgba(0,0,0,0.63)', padding: '20px 25px', display: 'block' } })
            );
        }
        var onToggle = (function (e, toggled) {
            e.stopPropagation();
            var res = this.togglePluginEnable(node, toggled);
            if (!res) {}
        }).bind(this);

        return React.createElement(
            'div',
            { style: { margin: '24px 8px' }, onClick: function (e) {
                    e.stopPropagation();
                } },
            React.createElement(_materialUi.Toggle, {
                ref: 'toggle',
                className: 'plugin-enable-toggle',
                name: 'plugin_toggle',
                value: 'plugin_enabled',
                defaultToggled: node.getMetadata().get("enabled") == this.context.getMessage('440', ''),
                toggled: node.getMetadata().get("enabled") == this.context.getMessage('440', ''),
                onToggle: onToggle
            })
        );
    },

    renderSecondLine: function renderSecondLine(node) {
        return node.getMetadata().get('plugin_description');
    },

    renderActions: function renderActions(node) {
        if (!node.isLeaf()) {
            return null;
        }
        var edit = (function () {
            if (this.props.openRightPane) {
                this.props.openRightPane({
                    COMPONENT: _PluginEditor2['default'],
                    PROPS: {
                        rootNode: node,
                        docAsAdditionalPane: true,
                        className: "vertical edit-plugin-inpane",
                        closeEditor: this.props.closeRightPane
                    },
                    CHILDREN: null
                });
            }
        }).bind(this);
        return React.createElement(
            'div',
            { className: 'plugins-list-actions' },
            React.createElement(_materialUi.IconButton, { iconStyle: { color: 'rgba(0,0,0,0.33)', fontSize: 21 }, style: { padding: 6 }, iconClassName: 'mdi mdi-pencil', onClick: edit })
        );
    },

    reload: function reload() {
        this.refs.list.reload();
    },

    render: function render() {

        return React.createElement(PydioComponents.SimpleList, {
            ref: 'list',
            node: this.props.currentNode || this.props.rootNode,
            dataModel: this.props.dataModel,
            className: 'plugins-list',
            actionBarGroups: [],
            entryRenderIcon: this.renderListIcon,
            entryRenderActions: this.renderActions,
            entryRenderSecondLine: this.renderSecondLine,
            openEditor: this.props.openSelection,
            infineSliceCount: 1000,
            filterNodes: null,
            listTitle: this.props.title,
            elementHeight: PydioComponents.SimpleList.HEIGHT_TWO_LINES
        });
    }

});

exports['default'] = PluginsList;
module.exports = exports['default'];

},{"./PluginEditor":5,"material-ui":"material-ui"}],7:[function(require,module,exports){
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var _require = require('material-ui');

var List = _require.List;
var ListItem = _require.ListItem;
var FlatButton = _require.FlatButton;
var Paper = _require.Paper;
var Divider = _require.Divider;

var PydioApi = require('pydio/http/api');

var _require$requireLib = require('pydio').requireLib('boot');

var Loader = _require$requireLib.Loader;
var PydioContextConsumer = _require$requireLib.PydioContextConsumer;

var _require$requireLib2 = require('pydio').requireLib('components');

var ClipboardTextField = _require$requireLib2.ClipboardTextField;

var DiagnosticDashboard = (function (_React$Component) {
    _inherits(DiagnosticDashboard, _React$Component);

    function DiagnosticDashboard(props, context) {
        _classCallCheck(this, DiagnosticDashboard);

        _get(Object.getPrototypeOf(DiagnosticDashboard.prototype), 'constructor', this).call(this, props, context);
        this.state = { loaded: false, entries: {}, copy: false };
    }

    _createClass(DiagnosticDashboard, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this = this;

            if (this.state.loaded) return;
            this.setState({ loading: true });
            PydioApi.getClient().request({
                get_action: 'ls',
                dir: this.props.access || '/admin/diagnostic',
                format: 'json'
            }, function (transport) {
                var resp = transport.responseJSON;
                if (!resp || !resp.children) return;
                _this.setState({ loaded: true, loading: false, entries: resp.children });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state;
            var entries = _state.entries;
            var loading = _state.loading;
            var copy = _state.copy;

            var content = undefined,
                copyPanel = undefined,
                copyContent = '';
            if (loading) {
                content = React.createElement(Loader, null);
            } else {
                (function () {
                    var listItems = [];
                    Object.keys(entries).forEach(function (k) {
                        var entry = entries[k];
                        var data = entry.data;
                        if (typeof data === 'boolean') {
                            data = data ? 'Yes' : 'No';
                        }
                        listItems.push(React.createElement(Divider, null));
                        listItems.push(React.createElement(ListItem, {
                            key: k,
                            primaryText: entry.label,
                            secondaryText: data,
                            disabled: true

                        }));
                        copyContent += entry.label + ' : ' + data + '\n';
                    });
                    content = React.createElement(
                        List,
                        { style: { flex: 1, overflowY: 'auto' } },
                        listItems
                    );
                })();
            }

            if (copy) {
                copyPanel = React.createElement(
                    Paper,
                    { zDepth: 2, style: { position: 'absolute', top: '15%', left: '20%', width: '60%', padding: '20px 20px 0', height: 370, overflowY: 'auto', zIndex: 2 } },
                    React.createElement(
                        'div',
                        { style: { fontSize: 20 } },
                        'Copy Diagnostic'
                    ),
                    React.createElement(ClipboardTextField, { rows: 5, rowsMax: 10, multiLine: true, inputValue: copyContent, floatingLabelText: this.props.getMessage('5', 'ajxp_conf'), getMessage: this.props.getMessage }),
                    React.createElement(
                        'div',
                        { style: { textAlign: 'right' } },
                        React.createElement(FlatButton, { label: 'Close', onTouchTap: function () {
                                _this2.setState({ copy: false });
                            }, secondary: true })
                    )
                );
            }

            return React.createElement(
                'div',
                { style: { height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' } },
                copyPanel,
                React.createElement(
                    'div',
                    { style: { display: 'flex', alignItems: 'center' } },
                    this.props.displayMode === 'card' && React.createElement(
                        'h3',
                        { style: { margin: '0 20px 20px', flex: 1 } },
                        this.props.getMessage('5', 'ajxp_conf')
                    ),
                    !this.props.displayMode && React.createElement(
                        'h1',
                        { style: { margin: 12, flex: 1 } },
                        this.props.getMessage('5', 'ajxp_conf')
                    ),
                    React.createElement(FlatButton, { label: 'Copy', onTouchTap: function () {
                            _this2.setState({ copy: true });
                        }, secondary: true, style: { marginRight: 16 } })
                ),
                content
            );
        }
    }]);

    return DiagnosticDashboard;
})(React.Component);

exports['default'] = DiagnosticDashboard = PydioContextConsumer(DiagnosticDashboard);
exports['default'] = DiagnosticDashboard;
module.exports = exports['default'];

},{"material-ui":"material-ui","pydio":"pydio","pydio/http/api":"pydio/http/api","react":"react"}],8:[function(require,module,exports){
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

var _require = require('react');

var Component = _require.Component;

var _require2 = require('material-ui');

var List = _require2.List;
var ListItem = _require2.ListItem;
var Paper = _require2.Paper;
var CardTitle = _require2.CardTitle;
var Divider = _require2.Divider;
var Subheader = _require2.Subheader;
var TextField = _require2.TextField;
var Table = _require2.Table;
var TableHeader = _require2.TableHeader;
var TableRow = _require2.TableRow;
var TableBody = _require2.TableBody;
var TableHeaderColumn = _require2.TableHeaderColumn;
var TableRowColumn = _require2.TableRowColumn;

var PathUtils = require('pydio/util/path');

var JSDocsPanel = (function (_Component) {
    _inherits(JSDocsPanel, _Component);

    function JSDocsPanel(props, context) {
        _classCallCheck(this, JSDocsPanel);

        _get(Object.getPrototypeOf(JSDocsPanel.prototype), 'constructor', this).call(this, props, context);
        this.state = { data: {}, selection: null, search: '' };
    }

    _createClass(JSDocsPanel, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this = this;

            PydioApi.getClient().loadFile('plugins/gui.ajax/docgen.json', function (transp) {
                if (!transp.responseJSON || !transp.responseJSON['gui.ajax']) {
                    _this.setState({ error: 'Docs are not loaded, you probably have to run \'grunt docgen\' command inside the gui.ajax plugin.' });
                    return;
                }
                var data = transp.responseJSON['gui.ajax'];
                Object.keys(transp.responseJSON).forEach(function (pluginId) {
                    if (pluginId === 'gui.ajax') return;
                    var comps = transp.responseJSON[pluginId];
                    Object.keys(comps).forEach(function (compName) {
                        data[pluginId + '/' + compName] = comps[compName];
                    });
                });
                _this.setState({ data: data });
            });
        }
    }, {
        key: 'onSearch',
        value: function onSearch(event, value) {
            this.setState({ search: value });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state;
            var data = _state.data;
            var selection = _state.selection;
            var search = _state.search;
            var error = _state.error;

            var items = [];
            var classPathes = {};
            Object.keys(data).forEach(function (key) {

                var parts = key.split('/');
                var classPath = parts.shift();
                var title = parts.pop().replace('.js', '').replace('.es6', '');
                if (search && title.indexOf(search) === -1) {
                    return;
                } else if (search && title.indexOf(search) > -1) {
                    var _parts = [];
                    var startIndex = title.indexOf(search);
                    var endIndex = startIndex + search.length;
                    if (startIndex > 0) _parts.push(title.substr(0, startIndex));
                    _parts.push(React.createElement(
                        'span',
                        { style: { color: '#E64A19' } },
                        title.substr(startIndex, search.length)
                    ));
                    if (endIndex < title.length - 1) _parts.push(title.substr(endIndex));
                    title = React.createElement(
                        'span',
                        null,
                        _parts
                    );
                }
                var secondary = parts.join('/');
                if (!classPathes[classPath]) {
                    classPathes[classPath] = classPath;
                    items.push(React.createElement(Divider, { key: key + '-div' }));
                    items.push(React.createElement(
                        Subheader,
                        { key: key + '-sub' },
                        classPath
                    ));
                }
                items.push(React.createElement(ListItem, {
                    key: key,
                    primaryText: title,
                    onTouchTap: function () {
                        _this2.setState({ selection: key });
                    }
                }));
            });
            return React.createElement(
                'div',
                { style: { width: '100%', height: '100%', display: 'flex' } },
                React.createElement(
                    Paper,
                    { zDepth: 1, style: { width: 256, overflowY: 'scroll', display: 'flex', flexDirection: 'column' } },
                    React.createElement(
                        'div',
                        { style: { padding: 16, paddingBottom: 0 } },
                        React.createElement(TextField, { fullWidth: true, value: search, onChange: this.onSearch.bind(this), hintText: 'Search for a class...', underlineShow: false })
                    ),
                    error && React.createElement(
                        'div',
                        { style: { padding: 16 } },
                        error
                    ),
                    React.createElement(
                        List,
                        { style: { flex: 1 } },
                        items
                    )
                ),
                React.createElement(
                    'div',
                    { style: { flex: 1, overflowY: 'scroll' } },
                    selection && React.createElement(ClassPanel, { path: selection, data: data[selection][0] })
                )
            );
        }
    }]);

    return JSDocsPanel;
})(Component);

var ClassPanel = (function (_Component2) {
    _inherits(ClassPanel, _Component2);

    function ClassPanel() {
        _classCallCheck(this, ClassPanel);

        _get(Object.getPrototypeOf(ClassPanel.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(ClassPanel, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var path = _props.path;
            var data = _props.data;

            var title = PathUtils.getBasename(path);
            var classPath = PathUtils.getDirname(path);
            var largeColumn = { width: '35%' };

            var props = [],
                methods = [];
            if (data.props && path.indexOf('core/') !== 0) {
                Object.keys(data.props).forEach(function (pName) {
                    var pData = data.props[pName];
                    props.push(React.createElement(
                        TableRow,
                        { key: pName },
                        React.createElement(
                            TableRowColumn,
                            { style: { fontSize: 16 } },
                            pName
                        ),
                        React.createElement(
                            TableRowColumn,
                            { style: largeColumn },
                            pData.description
                        ),
                        React.createElement(
                            TableRowColumn,
                            null,
                            pData.type && pData.type.raw && pData.type.raw.replace('React.PropTypes.', '').replace('.isRequired', '')
                        ),
                        React.createElement(
                            TableRowColumn,
                            null,
                            pData.required || pData.type && pData.type.raw && pData.type.raw.indexOf('.isRequired') > -1 ? 'true' : ''
                        )
                    ));
                });
            }

            if (data.methods) {
                methods = data.methods.map(function (mData) {
                    var params = mData.params.map(function (p) {
                        return React.createElement(
                            'div',
                            null,
                            p.name + (p.type ? ' (' + p.type.name + ') ' : '') + (p.description ? ': ' + p.description : '')
                        );
                    });
                    return React.createElement(
                        TableRow,
                        { key: mData.name },
                        React.createElement(
                            TableRowColumn,
                            { style: { fontSize: 16 } },
                            mData.name
                        ),
                        React.createElement(
                            TableRowColumn,
                            { style: largeColumn },
                            mData.description
                        ),
                        React.createElement(
                            TableRowColumn,
                            null,
                            params
                        ),
                        React.createElement(
                            TableRowColumn,
                            null,
                            mData.returns && mData.returns.type ? mData.returns.type.name : ''
                        )
                    );
                });
            }
            var dStyle = { padding: '0 16px 16px' };

            return React.createElement(
                'div',
                null,
                React.createElement(CardTitle, { title: title, subtitle: classPath }),
                React.createElement(
                    'div',
                    { style: dStyle },
                    data.description
                ),
                data.require && React.createElement(
                    'div',
                    { style: dStyle },
                    React.createElement(
                        'em',
                        null,
                        'Usage: '
                    ),
                    ' ',
                    React.createElement(
                        'code',
                        null,
                        data.require
                    )
                ),
                React.createElement(CardTitle, { title: 'Props' }),
                props.length > 0 && React.createElement(
                    'div',
                    { style: dStyle },
                    React.createElement(
                        Table,
                        null,
                        React.createElement(
                            TableHeader,
                            { displaySelectAll: false, adjustForCheckbox: false },
                            React.createElement(
                                TableRow,
                                null,
                                React.createElement(
                                    TableHeaderColumn,
                                    null,
                                    'Name'
                                ),
                                React.createElement(
                                    TableHeaderColumn,
                                    { style: largeColumn },
                                    'Description'
                                ),
                                React.createElement(
                                    TableHeaderColumn,
                                    null,
                                    'Type'
                                ),
                                React.createElement(
                                    TableHeaderColumn,
                                    null,
                                    'Required'
                                )
                            )
                        ),
                        React.createElement(
                            TableBody,
                            { displayRowCheckbox: false },
                            props
                        )
                    )
                ),
                !props.length && React.createElement(
                    'div',
                    { style: _extends({}, dStyle, { color: 'rgba(0,0,0,0.33)' }) },
                    'No Props documented'
                ),
                React.createElement(CardTitle, { title: 'Methods' }),
                methods.length > 0 && React.createElement(
                    'div',
                    { style: dStyle },
                    React.createElement(
                        Table,
                        null,
                        React.createElement(
                            TableHeader,
                            { displaySelectAll: false, adjustForCheckbox: false },
                            React.createElement(
                                TableRow,
                                null,
                                React.createElement(
                                    TableHeaderColumn,
                                    null,
                                    'Name'
                                ),
                                React.createElement(
                                    TableHeaderColumn,
                                    { style: largeColumn },
                                    'Description'
                                ),
                                React.createElement(
                                    TableHeaderColumn,
                                    null,
                                    'Parameters'
                                ),
                                React.createElement(
                                    TableHeaderColumn,
                                    null,
                                    'Return'
                                )
                            )
                        ),
                        React.createElement(
                            TableBody,
                            { displayRowCheckbox: false },
                            methods
                        )
                    )
                ),
                !methods.length && React.createElement(
                    'div',
                    { style: _extends({}, dStyle, { color: 'rgba(0,0,0,0.33)' }) },
                    'No Methods documented'
                )
            );
        }
    }]);

    return ClassPanel;
})(Component);

exports['default'] = JSDocsPanel;
module.exports = exports['default'];

},{"material-ui":"material-ui","pydio/util/path":"pydio/util/path","react":"react"}],9:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _corePluginsList = require('../core/PluginsList');

var _corePluginsList2 = _interopRequireDefault(_corePluginsList);

var EditorsDashboard = React.createClass({
    displayName: "EditorsDashboard",

    mixins: [AdminComponents.MessagesConsumerMixin],

    render: function render() {
        return React.createElement(
            "div",
            { className: "main-layout-nav-to-stack vertical-layout", style: this.props.style },
            React.createElement(
                ReactMUI.Paper,
                { className: "left-nav vertical-layout", zDepth: 0 },
                React.createElement(
                    "h1",
                    { className: "admin-panel-title" },
                    this.context.getMessage('plugtype.title.editor', '')
                ),
                React.createElement(
                    "div",
                    { style: { padding: '0 20px' }, className: "layout-fill-scroll-y" },
                    this.context.getMessage('plugins.4')
                )
            ),
            React.createElement(_corePluginsList2["default"], this.props)
        );
    }

});

exports["default"] = EditorsDashboard;
module.exports = exports["default"];

},{"../core/PluginsList":6}],10:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _coreManager = require('./core/Manager');

var _coreManager2 = _interopRequireDefault(_coreManager);

var _corePluginsList = require('./core/PluginsList');

var _corePluginsList2 = _interopRequireDefault(_corePluginsList);

var _corePluginEditor = require('./core/PluginEditor');

var _corePluginEditor2 = _interopRequireDefault(_corePluginEditor);

var _coreCoreAndPluginsDashboard = require('./core/CoreAndPluginsDashboard');

var _coreCoreAndPluginsDashboard2 = _interopRequireDefault(_coreCoreAndPluginsDashboard);

var _authAuthenticationPluginsDashboard = require('./auth/AuthenticationPluginsDashboard');

var _authAuthenticationPluginsDashboard2 = _interopRequireDefault(_authAuthenticationPluginsDashboard);

var _editorsEditorsDashboard = require('./editors/EditorsDashboard');

var _editorsEditorsDashboard2 = _interopRequireDefault(_editorsEditorsDashboard);

var _updaterUpdaterDashboard = require('./updater/UpdaterDashboard');

var _updaterUpdaterDashboard2 = _interopRequireDefault(_updaterUpdaterDashboard);

var _cacheCacheServerDashboard = require('./cache/CacheServerDashboard');

var _cacheCacheServerDashboard2 = _interopRequireDefault(_cacheCacheServerDashboard);

var _diagnosticDiagnosticDashboard = require('./diagnostic/DiagnosticDashboard');

var _diagnosticDiagnosticDashboard2 = _interopRequireDefault(_diagnosticDiagnosticDashboard);

var _docsJSDocsDashboard = require('./docs/JSDocsDashboard');

var _docsJSDocsDashboard2 = _interopRequireDefault(_docsJSDocsDashboard);

window.AdminPlugins = {

  PluginsManager: _coreManager2['default'],
  PluginEditor: _corePluginEditor2['default'],
  PluginsList: _corePluginsList2['default'],
  CoreAndPluginsDashboard: _coreCoreAndPluginsDashboard2['default'],

  AuthenticationPluginsDashboard: _authAuthenticationPluginsDashboard2['default'],
  EditorsDashboard: _editorsEditorsDashboard2['default'],
  UpdaterDashboard: _updaterUpdaterDashboard2['default'],
  CacheServerDashboard: _cacheCacheServerDashboard2['default'],
  DiagnosticDashboard: _diagnosticDiagnosticDashboard2['default'],
  JSDocsDashboard: _docsJSDocsDashboard2['default']

};

},{"./auth/AuthenticationPluginsDashboard":1,"./cache/CacheServerDashboard":2,"./core/CoreAndPluginsDashboard":3,"./core/Manager":4,"./core/PluginEditor":5,"./core/PluginsList":6,"./diagnostic/DiagnosticDashboard":7,"./docs/JSDocsDashboard":8,"./editors/EditorsDashboard":9,"./updater/UpdaterDashboard":11}],11:[function(require,module,exports){
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _corePluginEditor = require('../core/PluginEditor');

var _corePluginEditor2 = _interopRequireDefault(_corePluginEditor);

var _materialUi = require('material-ui');

var UpdaterDashboard = _react2['default'].createClass({
    displayName: 'UpdaterDashboard',

    mixins: [AdminComponents.MessagesConsumerMixin],

    getInitialState: function getInitialState() {
        return { checks: -1 };
    },

    componentDidMount: function componentDidMount() {
        this.checkForUpgrade();
    },

    checkForUpgrade: function checkForUpgrade() {
        this.setState({ loading: true });
        PydioApi.getClient().request({ get_action: 'get_upgrade_path' }, (function (transp) {
            this.setState({ loading: false });
            if (!this.isMounted()) return;
            var response = transp.responseJSON;
            var length = 0;
            if (response && response.packages.length) {
                length = response.packages.length;
                this.setState({ packages: response.packages });
                if (response.latest_note) {
                    var latest = response.latest_note;
                    latest = pydio.Parameters.get('ajxpServerAccess') + "&get_action=display_upgrade_note&url=" + encodeURIComponent(latest);
                    this.setState({ src: latest });
                }
            } else {
                this.setState({ no_upgrade: true });
            }

            var node = pydio.getContextNode();
            node.getMetadata().set('flag', length);
            AdminComponents.MenuItemListener.getInstance().notify("item_changed");
        }).bind(this));
    },

    performUpgrade: function performUpgrade() {
        if (this.state.checks < 0) {
            alert('Please select at least one package!');
            return;
        }
        if (confirm(this.context.getMessage('15', 'updater'))) {
            var client = PydioApi.getClient();
            this.setState({ src: '' }, (function () {
                this.setState({ src: client._baseUrl + '?secure_token=' + pydio.Parameters.get("SECURE_TOKEN") + '&get_action=perform_upgrade&package_index=' + this.state.checks });
            }).bind(this));
        }
    },

    onCheckStateChange: function onCheckStateChange(index, value) {
        if (value) this.setState({ checks: index });else this.setState({ checks: index - 1 });
    },

    render: function render() {
        var _this = this;

        var list = null;
        var _state = this.state;
        var packages = _state.packages;
        var checks = _state.checks;
        var loading = _state.loading;

        if (packages) {
            list = _react2['default'].createElement(
                'div',
                { style: { paddingBottom: 30, paddingRight: 5 } },
                _react2['default'].createElement(
                    'span',
                    { style: { float: 'right' } },
                    _react2['default'].createElement(_materialUi.RaisedButton, { primary: true, label: this.context.getMessage('4', 'updater'), onTouchTap: this.performUpgrade })
                ),
                this.context.getMessage('16', 'updater'),
                _react2['default'].createElement(
                    'div',
                    { style: { paddingLeft: 30 } },
                    packages.map(function (p, index) {
                        return _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement(_materialUi.Checkbox, { style: { listStyle: 'inherit' }, key: p, label: PathUtils.getBasename(p), onCheck: function (e, v) {
                                    return _this.onCheckStateChange(index, v);
                                }, checked: index <= checks })
                        );
                    })
                ),
                _react2['default'].createElement('br', null),
                this.context.getMessage('3', 'updater')
            );
        } else if (this.state && this.state.loading) {
            list = _react2['default'].createElement(
                'div',
                null,
                this.context.getMessage('17', 'updater')
            );
        } else {
            list = _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'span',
                    { style: { float: 'right' } },
                    _react2['default'].createElement(_materialUi.RaisedButton, { secondary: true, label: this.context.getMessage('20', 'updater'), onTouchTap: this.checkForUpgrade })
                ),
                this.state && this.state.no_upgrade ? this.context.getMessage('18', 'updater') : this.context.getMessage('19', 'updater')
            );
        }

        var updateCheckPane = _react2['default'].createElement(
            'div',
            { style: { padding: '0 20px' } },
            _react2['default'].createElement(
                'h3',
                null,
                this.context.getMessage('2', 'updater')
            ),
            _react2['default'].createElement(
                'div',
                { style: { paddingBottom: 20, paddingRight: 5 } },
                list
            ),
            _react2['default'].createElement('iframe', {
                ref: 'iframe',
                style: { width: '100%', height: 400, border: '1px solid #ccc' },
                src: this.state ? this.state.src : ''
            })
        );
        var version = pydio.Parameters.get("ajxpVersion");
        var additionalDescription = undefined;
        if (version == '##VERSION_NUMBER##') {
            additionalDescription = this.context.getMessage('21', 'updater');
        } else {
            additionalDescription = this.context.getMessage('22', 'updater').replace('%1', version).replace('%2', pydio.Parameters.get("ajxpVersionDate"));
        }
        return _react2['default'].createElement(
            'div',
            { className: 'update-checker', style: { height: '100%' } },
            _react2['default'].createElement(_corePluginEditor2['default'], _extends({}, this.props, {
                additionalDescription: additionalDescription,
                additionalPanes: { top: [updateCheckPane], bottom: [] }
            }))
        );
    }

});

exports['default'] = UpdaterDashboard;
module.exports = exports['default'];

},{"../core/PluginEditor":5,"material-ui":"material-ui","react":"react"}]},{},[10]);
