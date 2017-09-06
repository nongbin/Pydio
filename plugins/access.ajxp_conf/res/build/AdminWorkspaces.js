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

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _modelWorkspace = require('../model/Workspace');

var _modelWorkspace2 = _interopRequireDefault(_modelWorkspace);

var _editorWorkspaceEditor = require('../editor/WorkspaceEditor');

var _editorWorkspaceEditor2 = _interopRequireDefault(_editorWorkspaceEditor);

var _editorWorkspaceCreator = require('../editor/WorkspaceCreator');

var _editorWorkspaceCreator2 = _interopRequireDefault(_editorWorkspaceCreator);

var _WorkspaceList = require('./WorkspaceList');

var _WorkspaceList2 = _interopRequireDefault(_WorkspaceList);

exports['default'] = _react2['default'].createClass({
    displayName: 'Dashboard',

    mixins: [AdminComponents.MessagesConsumerMixin],

    propTypes: {
        dataModel: _react2['default'].PropTypes.instanceOf(PydioDataModel).isRequired,
        rootNode: _react2['default'].PropTypes.instanceOf(AjxpNode).isRequired,
        currentNode: _react2['default'].PropTypes.instanceOf(AjxpNode).isRequired,
        openEditor: _react2['default'].PropTypes.func.isRequired,
        openRightPane: _react2['default'].PropTypes.func.isRequired,
        closeRightPane: _react2['default'].PropTypes.func.isRequired
    },

    getInitialState: function getInitialState() {
        return { selectedNode: null, filter: 'workspaces' };
    },

    openWorkspace: function openWorkspace(node) {
        if (this.refs.editor && this.refs.editor.isDirty()) {
            if (!window.confirm(global.pydio.MessageHash["role_editor.19"])) {
                return false;
            }
        }

        var editor = _editorWorkspaceEditor2['default'];
        var editorNode = XMLUtils.XPathSelectSingleNode(this.props.pydio.getXmlRegistry(), '//client_configs/component_config[@component="AdminWorkspaces.Dashboard"]/editor');
        if (editorNode) {
            editor = editorNode.getAttribute('namespace') + '.' + editorNode.getAttribute('component');
        }
        var editorData = {
            COMPONENT: editor,
            PROPS: {
                ref: "editor",
                node: node,
                closeEditor: this.closeWorkspace,
                deleteWorkspace: this.deleteWorkspace,
                saveWorkspace: this.updateWorkspace
            }
        };
        this.props.openRightPane(editorData);
    },

    closeWorkspace: function closeWorkspace() {
        if (this.refs.editor && this.refs.editor.isDirty()) {
            if (!window.confirm(global.pydio.MessageHash["role_editor.19"])) {
                return false;
            }
        }
        //this.setState({selectedNode:null, showCreator:null});
        this.props.closeRightPane();
    },

    toggleWorkspacesFilter: function toggleWorkspacesFilter() {
        this.setState({ filter: this.state.filter == 'workspaces' ? 'templates' : 'workspaces' });
    },

    showWorkspaceCreator: function showWorkspaceCreator(type) {
        if (typeof type != "string") type = "workspace";
        var editorData = {
            COMPONENT: _editorWorkspaceCreator2['default'],
            PROPS: {
                ref: "editor",
                type: type,
                save: this.createWorkspace,
                closeEditor: this.closeWorkspace
            }
        };
        this.props.openRightPane(editorData);
    },

    showTplCreator: function showTplCreator() {
        this.showWorkspaceCreator('template');
    },

    createWorkspace: function createWorkspace(type, creatorState) {
        var driver;
        if (!creatorState.selectedDriver && creatorState.selectedTemplate) {
            driver = "ajxp_template_" + creatorState.selectedTemplate;
            // Move drivers options inside the values['driver'] instead of values['general']
            var tplDef = _modelWorkspace2['default'].TEMPLATES.get(creatorState.selectedTemplate);
            var driverDefs = _modelWorkspace2['default'].DRIVERS.get(tplDef.type).params;
            var newDriversValues = {};
            Object.keys(creatorState.values['general']).map(function (k) {
                driverDefs.map(function (param) {
                    if (param['name'] === k) {
                        newDriversValues[k] = creatorState.values['general'][k];
                        delete creatorState.values['general'][k];
                    }
                });
            });
            creatorState.values['driver'] = newDriversValues;
        } else {
            driver = creatorState.selectedDriver;
        }
        if (creatorState.values['general']['DISPLAY']) {
            var displayValues = { DISPLAY: creatorState.values['general']['DISPLAY'] };
            delete creatorState.values['general']['DISPLAY'];
        }
        var generalValues = creatorState.values['general'];

        var saveData = LangUtils.objectMerge({
            DRIVER: driver,
            DRIVER_OPTIONS: LangUtils.objectMerge(creatorState.values['general'], creatorState.values['driver'])
        }, displayValues);

        var parameters = {
            get_action: 'create_repository',
            json_data: JSON.stringify(saveData)
        };
        if (type == 'template') {
            parameters['sf_checkboxes_active'] = 'true';
        }
        PydioApi.getClient().request(parameters, (function (transport) {
            // Reload list & Open Editor
            this.refs.workspacesList.reload();
            var newId = XMLUtils.XPathGetSingleNodeText(transport.responseXML, "tree/reload_instruction/@file");
            var fakeNode = new AjxpNode('/fake/path/' + newId);
            fakeNode.getMetadata().set("ajxp_mime", "repository_editable");
            this.openWorkspace(fakeNode, 'driver');
        }).bind(this));
    },

    deleteWorkspace: function deleteWorkspace(workspaceId) {
        if (window.confirm(this.context.getMessage('35', 'ajxp_conf'))) {
            this.closeWorkspace();
            PydioApi.getClient().request({
                get_action: 'delete',
                data_type: 'repository',
                data_id: workspaceId
            }, (function (transport) {
                this.refs.workspacesList.reload();
            }).bind(this));
        }
    },

    /**
     *
     * @param workspaceModel Workspace
     * @param postData Object
     * @param editorData Object
     */
    updateWorkspace: function updateWorkspace(workspaceModel, postData, editorData) {
        var workspaceId = workspaceModel.wsId;
        if (workspaceModel.isTemplate()) {
            var formDefs = [],
                formValues = {},
                templateAllFormDefs = [];
            if (!editorData["general"]) {
                workspaceModel.buildEditor("general", formDefs, formValues, {}, templateAllFormDefs);
                var generalPostValues = PydioForm.Manager.getValuesForPOST(formDefs, formValues);
                postData = LangUtils.objectMerge(postData, generalPostValues);
            }
            if (!editorData["driver"]) {
                workspaceModel.buildEditor("driver", formDefs, formValues, {}, templateAllFormDefs);
                var driverPostValues = PydioForm.Manager.getValuesForPOST(formDefs, formValues);
                postData = LangUtils.objectMerge(postData, driverPostValues);
            }
        }

        if (editorData['permission-mask']) {
            postData['permission_mask'] = JSON.stringify(editorData['permission-mask']);
        }
        var mainSave = (function () {
            PydioApi.getClient().request(LangUtils.objectMerge({
                get_action: 'edit',
                sub_action: 'edit_repository_data',
                repository_id: workspaceId
            }, postData), (function (transport) {
                this.refs['workspacesList'].reload();
            }).bind(this));
        }).bind(this);

        var metaSources = editorData['META_SOURCES'];
        if (Object.keys(metaSources["delete"]).length || Object.keys(metaSources["add"]).length || Object.keys(metaSources["edit"]).length) {
            PydioApi.getClient().request(LangUtils.objectMerge({
                get_action: 'edit',
                sub_action: 'meta_source_edit',
                repository_id: workspaceId,
                bulk_data: JSON.stringify(metaSources)
            }), (function (transport) {
                if (this.refs['editor']) {
                    this.refs['editor'].clearMetaSourceDiff();
                }
                mainSave();
            }).bind(this));
        } else {
            mainSave();
        }
    },

    reloadWorkspaceList: function reloadWorkspaceList() {
        this.refs.workspacesList.reload();
    },

    render: function render() {
        var buttonContainer;
        if (this.state.filter == 'workspaces') {
            buttonContainer = _react2['default'].createElement(
                'div',
                { className: 'button-container' },
                _react2['default'].createElement(_materialUi.FlatButton, { primary: true, label: this.context.getMessage('ws.3'), onTouchTap: this.showWorkspaceCreator }),
                _react2['default'].createElement(_materialUi.FlatButton, { onTouchTap: this.toggleWorkspacesFilter, secondary: true, label: this.context.getMessage('ws.1') })
            );
        } else {
            buttonContainer = _react2['default'].createElement(
                'div',
                { className: 'button-container' },
                _react2['default'].createElement(_materialUi.FlatButton, { primary: true, label: this.context.getMessage('ws.4'), onTouchTap: this.showTplCreator }),
                _react2['default'].createElement(_materialUi.FlatButton, { onTouchTap: this.toggleWorkspacesFilter, secondary: true, label: this.context.getMessage('ws.2') })
            );
        }
        buttonContainer = _react2['default'].createElement(
            'div',
            { style: { marginRight: 20 } },
            _react2['default'].createElement(
                'div',
                { style: { float: 'left' } },
                buttonContainer
            ),
            _react2['default'].createElement(
                'div',
                { style: { float: 'right' } },
                _react2['default'].createElement(ReactMUI.IconButton, { className: 'small-icon-button', iconClassName: 'icon-refresh', onClick: this.reloadWorkspaceList })
            )
        );
        return _react2['default'].createElement(
            'div',
            { className: 'main-layout-nav-to-stack workspaces-board' },
            _react2['default'].createElement(
                'div',
                { className: 'left-nav vertical-layout', style: { width: '100%' } },
                _react2['default'].createElement(
                    ReactMUI.Paper,
                    { zDepth: 0, className: 'vertical-layout layout-fill' },
                    _react2['default'].createElement(
                        'div',
                        { className: 'vertical-layout workspaces-list layout-fill' },
                        _react2['default'].createElement(
                            'h1',
                            { className: 'admin-panel-title hide-on-vertical-layout' },
                            this.context.getMessage('3', 'ajxp_conf')
                        ),
                        buttonContainer,
                        _react2['default'].createElement(_WorkspaceList2['default'], {
                            ref: 'workspacesList',
                            dataModel: this.props.dataModel,
                            rootNode: this.props.rootNode,
                            currentNode: this.props.rootNode,
                            openSelection: this.openWorkspace,
                            filter: this.state.filter
                        })
                    )
                )
            )
        );
    }

});
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../editor/WorkspaceCreator":7,"../editor/WorkspaceEditor":8,"../model/Workspace":12,"./WorkspaceList":2,"material-ui":"material-ui","react":"react"}],2:[function(require,module,exports){
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
exports["default"] = React.createClass({
    displayName: "WorkspaceList",

    mixins: [AdminComponents.MessagesConsumerMixin],

    propTypes: {
        dataModel: React.PropTypes.instanceOf(PydioDataModel).isRequired,
        rootNode: React.PropTypes.instanceOf(AjxpNode).isRequired,
        currentNode: React.PropTypes.instanceOf(AjxpNode).isRequired,
        openSelection: React.PropTypes.func,
        filter: React.PropTypes.string
    },

    reload: function reload() {
        this.refs.list.reload();
    },

    renderListIcon: function renderListIcon(node) {
        var letters = node.getLabel().split(" ").map(function (word) {
            return word.substr(0, 1);
        }).join("");
        return React.createElement(
            "span",
            { className: "letter_badge" },
            letters
        );
    },

    renderSecondLine: function renderSecondLine(node) {
        if (!node.getMetadata().get("template_name")) {
            return this.context.getMessage('ws.5') + ": " + node.getMetadata().get("slug") + " / " + node.getMetadata().get("accessLabel");
        } else {
            return this.context.getMessage('ws.5') + ": " + node.getMetadata().get("slug") + " / Template " + node.getMetadata().get("template_name");
        }
    },

    filterNodes: function filterNodes(node) {
        if (!this.props.filter) return true;
        if (['ajxp_conf', 'ajxp_home', 'admin'].indexOf(node.getMetadata().get('accessType')) !== -1) {
            return false;
        }
        if (this.props.filter == 'workspaces') {
            return !(node.getMetadata().get('is_template') == 'true');
        } else if (this.props.filter == 'templates') {
            return node.getMetadata().get('is_template') == 'true';
        }
        return true;
    },

    render: function render() {
        return React.createElement(PydioComponents.SimpleList, {
            ref: "list",
            node: this.props.currentNode,
            dataModel: this.props.dataModel,
            className: "workspaces-list",
            actionBarGroups: [],
            entryRenderIcon: this.renderListIcon,
            entryRenderSecondLine: this.renderSecondLine,
            openEditor: this.props.openSelection,
            infineSliceCount: 1000,
            filterNodes: this.filterNodes,
            elementHeight: PydioComponents.SimpleList.HEIGHT_TWO_LINES
        });
    }

});
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
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

var _metaMetaList = require('../meta/MetaList');

var _metaMetaList2 = _interopRequireDefault(_metaMetaList);

var _modelWorkspace = require('../model/Workspace');

var _modelWorkspace2 = _interopRequireDefault(_modelWorkspace);

exports['default'] = React.createClass({
    displayName: 'FeaturesList',

    mixins: [AdminComponents.MessagesConsumerMixin],

    propTypes: {
        onSelectionChange: React.PropTypes.func.isRequired,
        metaSourceProvider: React.PropTypes.object.isRequired,
        driverLabel: React.PropTypes.string,
        driverDescription: React.PropTypes.string,
        currentSelection: React.PropTypes.string,
        model: React.PropTypes.instanceOf(_modelWorkspace2['default']),
        tplFieldsComponent: React.PropTypes.object
    },

    setEditState: function setEditState(key) {
        this.props.onSelectionChange(key);
    },

    closeCurrent: function closeCurrent(event) {
        event.stopPropagation();
        this.setEditState('activity');
    },

    render: function render() {

        var firstSections = [];
        if (!this.props.model.isTemplate()) {
            firstSections.push(React.createElement(PydioComponents.PaperEditorNavEntry, { keyName: 'shares', key: 'shares', selectedKey: this.props.currentSelection, label: this.context.getMessage('ws.25'), onClick: this.setEditState }));
        }
        var driverTabLabel = this.context.getMessage('ws.9') + ": " + this.props.driverLabel;
        var additionalFeatures;
        if (this.props.model.isTemplateChild()) {
            driverTabLabel = this.context.getMessage('ws.13');
        } else {
            var plusButton;
            if (this.props.model.isEditable()) {
                plusButton = React.createElement(
                    'span',
                    { className: 'metasource-add', onClick: this.props.metaSourceProvider.showMetaSourceForm.bind(this.props.metaSourceProvider) },
                    '+'
                );
            }
            additionalFeatures = React.createElement(
                'div',
                { key: 'additional-k' },
                React.createElement(
                    PydioComponents.PaperEditorNavHeader,
                    { label: this.context.getMessage('ws.27') },
                    plusButton
                ),
                React.createElement(_metaMetaList2['default'], {
                    metaSourceProvider: this.props.metaSourceProvider,
                    currentMetas: this.props.model.getOption('META_SOURCES'),
                    edit: this.props.currentSelection,
                    closeCurrent: this.closeCurrent,
                    setEditState: this.setEditState,
                    featuresEditable: this.props.model.isEditable()
                })
            );
        }

        return React.createElement(
            'div',
            null,
            React.createElement(PydioComponents.PaperEditorNavHeader, { key: 'parameters-k', label: this.context.getMessage('ws.29') }),
            React.createElement(PydioComponents.PaperEditorNavEntry, { keyName: 'general', key: 'general', selectedKey: this.props.currentSelection, label: this.context.getMessage('ws.30'), onClick: this.setEditState }),
            React.createElement(
                PydioComponents.PaperEditorNavEntry,
                { keyName: 'driver', key: 'driver', selectedKey: this.props.currentSelection, onClick: this.setEditState },
                driverTabLabel
            ),
            firstSections,
            this.props.tplFieldsComponent,
            additionalFeatures
        );
    }

});
module.exports = exports['default'];

},{"../meta/MetaList":10,"../model/Workspace":12}],4:[function(require,module,exports){
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

var _modelWorkspace = require('../model/Workspace');

var _modelWorkspace2 = _interopRequireDefault(_modelWorkspace);

exports['default'] = _react2['default'].createClass({
    displayName: 'FeaturesListWizard',

    mixins: [AdminComponents.MessagesConsumerMixin],

    propTypes: {
        onSelectionChange: _react2['default'].PropTypes.func.isRequired,
        driverLabel: _react2['default'].PropTypes.string,
        driverDescription: _react2['default'].PropTypes.string,
        currentSelection: _react2['default'].PropTypes.string,
        wizardType: _react2['default'].PropTypes.string,
        driversLoaded: _react2['default'].PropTypes.bool,
        additionalComponents: _react2['default'].PropTypes.object,
        disableCreateButton: _react2['default'].PropTypes.bool
    },

    getInitialState: function getInitialState() {
        return {
            edit: this.props.wizardType == 'workspace' ? 'template' : 'general',
            step: 1,
            subStep1: 'template'
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        if (newProps.currentSelection) {
            this.setState({ edit: newProps.currentSelection });
        }
    },

    setEditState: function setEditState(key) {
        this.props.onSelectionChange(key);
        this.setState({ edit: key });
    },

    closeCurrent: function closeCurrent(event) {
        event.stopPropagation();
    },

    dropDownChange: function dropDownChange(item) {
        if (item.payload.name) {
            this.setState({ step: 3 });
        }
        this.setState({ edit: 'driver', selectedDriver: item.payload.name });
        this.props.onSelectionChange('driver', item.payload.name);
    },

    dropChangeDriverOrTemplate: function dropChangeDriverOrTemplate(event, item) {
        if (item == 'template') {
            this.setState({ step: 1, subStep1: item });
        } else {
            this.setState({ step: 2, subStep1: 'driver' });
            this.setEditState('general');
        }
    },

    dropDownChangeTpl: function dropDownChangeTpl(item) {
        if (item.payload != -1) {
            var tpl = item.payload == "0" ? "0" : item.payload.name;
            this.setState({
                edit: 'general',
                selectedTemplate: tpl == "0" ? null : tpl,
                step: 2
            });
            this.props.onSelectionChange('general', null, tpl);
        }
    },

    render: function render() {

        var step1, step2, step3;

        if (this.props.wizardType == 'workspace') {

            // TEMPLATES SELECTOR
            var driverOrTemplate = _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    ReactMUI.RadioButtonGroup,
                    { name: 'driv_or_tpl', onChange: this.dropChangeDriverOrTemplate, defaultSelected: this.state.subStep1 },
                    _react2['default'].createElement(ReactMUI.RadioButton, { value: 'template', label: this.context.getMessage('ws.8') }),
                    _react2['default'].createElement(ReactMUI.RadioButton, { value: 'driver', label: this.context.getMessage('ws.9') })
                )
            );

            var templateSelector = null;
            if (this.state.step == 1 && this.state.subStep1 == "template") {
                templateSelector = _react2['default'].createElement(PydioComponents.PaperEditorNavEntry, {
                    label: this.context.getMessage('ws.10'),
                    selectedKey: this.state.edit,
                    keyName: 'template',
                    onClick: this.setEditState,
                    dropDown: true,
                    dropDownData: this.props.driversLoaded ? _modelWorkspace2['default'].TEMPLATES : null,
                    dropDownChange: this.dropDownChangeTpl,
                    dropDownDefaultItems: []
                });
            }

            step1 = _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(PydioComponents.PaperEditorNavHeader, { key: 'tpl-k', label: "1 - " + this.context.getMessage('ws.11') }),
                driverOrTemplate,
                templateSelector
            );
        }

        // DRIVER SELECTOR STEP
        if (this.state.step > 1 || this.props.wizardType == 'template') {

            if (this.props.wizardType == 'workspace' && this.state.selectedTemplate) {

                // Display remaining template options instead of generic + driver
                var tplLabel = _modelWorkspace2['default'].TEMPLATES.get(this.state.selectedTemplate).label;
                step2 = _react2['default'].createElement(
                    'div',
                    null,
                    _react2['default'].createElement(PydioComponents.PaperEditorNavHeader, { key: 'parameters-k', label: "2 - " + this.context.getMessage('ws.12').replace('%s', tplLabel) }),
                    _react2['default'].createElement(PydioComponents.PaperEditorNavEntry, { keyName: 'general', key: 'general', selectedKey: this.state.edit, label: this.context.getMessage('ws.13'), onClick: this.setEditState })
                );
            } else {

                step2 = _react2['default'].createElement(
                    'div',
                    null,
                    _react2['default'].createElement(PydioComponents.PaperEditorNavHeader, { key: 'parameters-k', label: "2 - " + this.context.getMessage('ws.14') }),
                    _react2['default'].createElement(PydioComponents.PaperEditorNavEntry, { keyName: 'general', key: 'general', selectedKey: this.state.edit, label: this.context.getMessage('ws.15'), onClick: this.setEditState }),
                    _react2['default'].createElement(PydioComponents.PaperEditorNavHeader, { key: 'driver-k', label: "3 - " + this.context.getMessage('ws.16') }),
                    _react2['default'].createElement(PydioComponents.PaperEditorNavEntry, {
                        label: this.context.getMessage(this.props.driversLoaded ? 'ws.17' : 'ws.18'),
                        selectedKey: this.state.edit,
                        keyName: 'driver',
                        onClick: this.setEditState,
                        dropDown: true,
                        dropDownData: this.props.driversLoaded ? _modelWorkspace2['default'].DRIVERS : null,
                        dropDownChange: this.dropDownChange
                    })
                );
            }
        }

        // SAVE / CANCEL BUTTONS
        if (this.state.step > 2 || this.state.step > 1 && this.props.wizardType == 'workspace' && this.state.selectedTemplate) {
            var stepNumber = 4;
            if (this.state.selectedTemplate) stepNumber = 3;
            step3 = _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(PydioComponents.PaperEditorNavHeader, { key: 'save-k', label: stepNumber + " - " + this.context.getMessage('ws.19') }),
                _react2['default'].createElement(
                    'div',
                    { style: { textAlign: 'center' } },
                    _react2['default'].createElement(_materialUi.RaisedButton, { primary: false, label: this.context.getMessage('54', ''), onTouchTap: this.props.close }),
                    '   ',
                    _react2['default'].createElement(_materialUi.RaisedButton, { primary: true, label: this.context.getMessage('ws.20'), onTouchTap: this.props.save, disabled: this.props.disableCreateButton })
                )
            );
        } else {

            step3 = _react2['default'].createElement(
                'div',
                { style: { textAlign: 'center', marginTop: 50 } },
                _react2['default'].createElement(_materialUi.RaisedButton, { primary: false, label: this.context.getMessage('54', ''), onTouchTap: this.props.close })
            );
        }

        return _react2['default'].createElement(
            'div',
            null,
            step1,
            step2,
            this.props.additionalComponents,
            step3
        );
    }

});
module.exports = exports['default'];

},{"../model/Workspace":12,"material-ui":"material-ui","react":"react"}],5:[function(require,module,exports){
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

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _modelWorkspace = require('../model/Workspace');

var _modelWorkspace2 = _interopRequireDefault(_modelWorkspace);

var _require = require('react');

var Component = _require.Component;
var PropTypes = _require.PropTypes;

var _require2 = require('material-ui');

var Stepper = _require2.Stepper;
var Step = _require2.Step;
var StepLabel = _require2.StepLabel;
var StepContent = _require2.StepContent;
var Divider = _require2.Divider;
var RaisedButton = _require2.RaisedButton;
var FlatButton = _require2.FlatButton;
var RadioButtonGroup = _require2.RadioButtonGroup;
var RadioButton = _require2.RadioButton;
var SelectField = _require2.SelectField;
var Menu = _require2.Menu;
var MenuItem = _require2.MenuItem;

var TplOrDriverPicker = (function (_Component) {
    _inherits(TplOrDriverPicker, _Component);

    function TplOrDriverPicker() {
        _classCallCheck(this, TplOrDriverPicker);

        _get(Object.getPrototypeOf(TplOrDriverPicker.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(TplOrDriverPicker, [{
        key: 'render',
        value: function render() {
            var _this = this;

            var onChange = this.props.onChange;

            var localChange = function localChange(e, v) {
                var newLabel = v === 'driver' ? _this.context.getMessage('ws.70') : _this.context.getMessage('ws.69');
                var data = v === 'driver' ? { general: true } : null;
                onChange(v, newLabel, null);
            };
            return React.createElement(
                RadioButtonGroup,
                { name: 'driv_or_tpl', onChange: localChange, valueSelected: this.props.value },
                React.createElement(RadioButton, { value: 'driver', label: this.context.getMessage('ws.9'), style: { paddingTop: 10, paddingBottom: 10 } }),
                React.createElement(RadioButton, { value: 'template', label: this.context.getMessage('ws.8'), style: { paddingTop: 5, paddingBottom: 5 } })
            );
        }
    }]);

    return TplOrDriverPicker;
})(Component);

TplOrDriverPicker.contextTypes = { getMessage: PropTypes.func };

var DriverPicker = (function (_Component2) {
    _inherits(DriverPicker, _Component2);

    function DriverPicker() {
        _classCallCheck(this, DriverPicker);

        _get(Object.getPrototypeOf(DriverPicker.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(DriverPicker, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var onChange = _props.onChange;
            var driversLoaded = _props.driversLoaded;
            var value = _props.value;

            if (!driversLoaded) return React.createElement(
                'div',
                null,
                'Loading...'
            );
            var drivers = _modelWorkspace2['default'].DRIVERS;
            var items = [];
            drivers.forEach(function (d) {
                items.push(React.createElement(MenuItem, { key: d.name, primaryText: d.label, value: d.name }));
            });
            var localChange = function localChange(e, i, v) {
                onChange(v, _this2.context.getMessage('ws.9') + ': ' + drivers.get(v).label, { driver: v });
            };
            return React.createElement(
                SelectField,
                { autoWidth: true, hintText: this.context.getMessage('ws.17'), fullWidth: true, value: value, onChange: localChange },
                items
            );
        }
    }]);

    return DriverPicker;
})(Component);

DriverPicker.contextTypes = { getMessage: PropTypes.func };

var TemplatePicker = (function (_Component3) {
    _inherits(TemplatePicker, _Component3);

    function TemplatePicker() {
        _classCallCheck(this, TemplatePicker);

        _get(Object.getPrototypeOf(TemplatePicker.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(TemplatePicker, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props2 = this.props;
            var onChange = _props2.onChange;
            var driversLoaded = _props2.driversLoaded;
            var value = _props2.value;

            if (!driversLoaded) return React.createElement(
                'div',
                null,
                'Loading...'
            );
            var drivers = _modelWorkspace2['default'].TEMPLATES;
            var items = [];
            drivers.forEach(function (d) {
                items.push(React.createElement(MenuItem, { key: d.name, primaryText: d.label, value: d.name }));
            });
            var localChange = function localChange(e, i, v) {
                onChange(v, _this3.context.getMessage('ws.12').replace('%s', ': ' + drivers.get(v).label), { template: v });
            };
            return React.createElement(
                SelectField,
                { autoWidth: true, hintText: this.context.getMessage('ws.10'), fullWidth: true, value: value, onChange: localChange },
                items
            );
        }
    }]);

    return TemplatePicker;
})(Component);

TemplatePicker.contextTypes = { getMessage: PropTypes.func };

var FeaturesStepper = (function (_Component4) {
    _inherits(FeaturesStepper, _Component4);

    function FeaturesStepper(props, context) {
        _classCallCheck(this, FeaturesStepper);

        _get(Object.getPrototypeOf(FeaturesStepper.prototype), 'constructor', this).call(this, props, context);
        this.state = { step: 0 };
    }

    _createClass(FeaturesStepper, [{
        key: 'pathBranchToSteps',
        value: function pathBranchToSteps(branch) {
            var _this4 = this;

            var steps = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            var values = this.state;

            branch.forEach(function (v) {
                var stepData = {
                    id: v.id,
                    label: values[v.id + '-label'] || v.label
                };
                if (v.component || v.additionalComponent) {
                    if (v.component) {
                        var onChange = function onChange(newValue, newLabel, data) {
                            _this4.onStepValueChange(v.id, newValue, newLabel, data);
                        };
                        stepData.component = React.createElement(v.component, _extends({}, _this4.props, { value: values[v.id], onChange: onChange }));
                    } else {
                        stepData.component = _this4.props.additionalComponent;
                        stepData.additional = true;
                    }
                    if (values[v.id]) stepData.value = values[v.id];
                    steps.push(stepData);
                    if (v.choices && values[v.id] && v.choices[values[v.id]]) {
                        _this4.pathBranchToSteps(v.choices[values[v.id]], steps);
                    }
                } else {
                    steps.push(_extends({}, stepData, {
                        form: v.edit,
                        valid: _this4.props.formIsValid || false,
                        component: null
                    }));
                }
            });

            if (steps.length === 1) {
                steps.push({
                    id: 'next',
                    label: this.context.getMessage('ws.73')
                });
            }

            return steps;
        }
    }, {
        key: 'onStepValueChange',
        value: function onStepValueChange(stepId, newValue) {
            var newLabel = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
            var data = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

            var obj = {};
            obj[stepId] = newValue;
            if (newLabel) {
                obj[stepId + '-label'] = newLabel;
            }
            this.setState(obj);
            if (data) {
                if (data.general) {
                    this.props.onSelectionChange('general');
                } else if (data.driver) {
                    this.props.onSelectionChange('driver', data.driver);
                } else if (data.template) {
                    this.props.onSelectionChange('general', null, data.template);
                }
            }
            this.setState({ step: this.state.step + 1 });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var mess = this.context.getMessage;
            var PATH = {
                workspace: [{
                    id: 'ws_tpl_or_driver_picker',
                    label: mess('ws.11'),
                    component: TplOrDriverPicker,
                    choices: {
                        template: [{ id: 'ws_template_picker', label: mess('ws.12').replace('%s', ':'), component: TemplatePicker }, { id: 'ws_template_options', label: mess('ws.13'), edit: 'template' }],
                        driver: [{ id: 'ws_driver_picker', label: mess('ws.16') + ': ', component: DriverPicker }, { id: 'ws_driver_options', label: mess('41', 'ajxp_conf'), edit: 'driver' }, { id: 'ws_general', label: mess('ws.14'), edit: 'general' }]
                    }
                }],
                template: [{ id: 'tpl_general_options', label: mess('ws.13'), edit: 'general' }, { id: 'tpl_driver_picker', label: mess('ws.16'), component: DriverPicker }, { id: 'tpl_driver_options', label: mess('41', 'ajxp_conf'), additionalComponent: true, edit: 'driver' }]
            };

            var _props3 = this.props;
            var onSelectionChange = _props3.onSelectionChange;
            var wizardType = _props3.wizardType;
            var save = _props3.save;
            var close = _props3.close;

            var mainState = PATH[wizardType];
            var steps = this.pathBranchToSteps(mainState);
            var active = this.state.step;

            var activeStep = steps[active];

            var saveEnabled = active === steps.length - 1 && (activeStep.value || activeStep.valid || activeStep.additional);

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { style: { padding: '16px 16px 0px', color: '#b6b6b6', fontSize: 14, fontWeight: 500 } },
                    this.context.getMessage('ws.71')
                ),
                React.createElement(
                    Stepper,
                    { activeStep: active, orientation: 'vertical' },
                    steps.map(function (step, index) {
                        var nextStepForm = undefined,
                            nextCallback = undefined;
                        if (index < steps.length - 1) {
                            nextStepForm = steps[index + 1].form;
                            nextCallback = function () {
                                if (nextStepForm) onSelectionChange(nextStepForm);
                                _this5.setState({ step: _this5.state.step + 1 });
                            };
                        }
                        return React.createElement(
                            Step,
                            { key: 'step-' + index },
                            React.createElement(
                                StepLabel,
                                null,
                                step.label
                            ),
                            React.createElement(
                                StepContent,
                                null,
                                React.createElement(
                                    'div',
                                    null,
                                    step.component,
                                    step.form && !step.valid && React.createElement(
                                        'div',
                                        { style: { paddingBottom: 10, color: '#f44336' } },
                                        _this5.context.getMessage('ws.72')
                                    ),
                                    (step.form || step.additional) && nextCallback && React.createElement(
                                        'div',
                                        { style: { textAlign: 'right', padding: 3 } },
                                        React.createElement(RaisedButton, {
                                            disabled: !step.value && !step.valid && !step.additional,
                                            label: index < steps.length - 1 ? "next" : "save",
                                            onTouchTap: nextCallback
                                        })
                                    )
                                )
                            )
                        );
                    })
                ),
                React.createElement(
                    'div',
                    { style: { textAlign: 'right', padding: 16 } },
                    React.createElement(FlatButton, { primary: false, label: this.context.getMessage('54', ''), onTouchTap: close, style: { marginRight: 6 } }),
                    React.createElement(RaisedButton, { secondary: true, label: this.context.getMessage('ws.20'), onTouchTap: save, disabled: !saveEnabled })
                )
            );
        }
    }]);

    return FeaturesStepper;
})(Component);

;

FeaturesStepper.contextTypes = {
    getMessage: PropTypes.func
};

exports['default'] = FeaturesStepper;
module.exports = exports['default'];

},{"../model/Workspace":12,"material-ui":"material-ui","react":"react"}],6:[function(require,module,exports){
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

var _require = require('material-ui');

var Checkbox = _require.Checkbox;
exports['default'] = React.createClass({
    displayName: 'TplFieldsChooser',

    propTypes: {
        driverName: React.PropTypes.string,
        driverFields: React.PropTypes.array,
        selectedFields: React.PropTypes.array,
        onToggleField: React.PropTypes.func
    },

    toggleField: function toggleField(name, e) {
        this.props.onToggleField(name, e.currentTarget.checked, this.props.selectedFields);
    },

    render: function render() {
        var fields = this.props.driverFields.map((function (f) {
            return React.createElement(
                'div',
                { key: this.props.driverName + '-' + f.name, style: { paddingTop: 6, paddingBottom: 6 } },
                React.createElement(Checkbox, {
                    label: f.label,
                    checked: this.props.selectedFields.indexOf(f.name) !== -1,
                    onCheck: this.toggleField.bind(this, f.name)
                })
            );
        }).bind(this));
        return React.createElement(
            'div',
            { style: this.props.style },
            fields
        );
    }

});
module.exports = exports['default'];

},{"material-ui":"material-ui"}],7:[function(require,module,exports){
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

var _modelWorkspace = require('../model/Workspace');

var _modelWorkspace2 = _interopRequireDefault(_modelWorkspace);

var _FeaturesListWizard = require('./FeaturesListWizard');

var _FeaturesListWizard2 = _interopRequireDefault(_FeaturesListWizard);

var _FeaturesStepper = require('./FeaturesStepper');

var _FeaturesStepper2 = _interopRequireDefault(_FeaturesStepper);

var _TplFieldsChooser = require('./TplFieldsChooser');

var _TplFieldsChooser2 = _interopRequireDefault(_TplFieldsChooser);

exports['default'] = React.createClass({
    displayName: 'WorkspaceCreator',

    mixins: [AdminComponents.MessagesConsumerMixin],

    propTypes: {
        type: React.PropTypes.oneOf(['template', 'workspace']),
        save: React.PropTypes.func,
        closeEditor: React.PropTypes.func,
        className: React.PropTypes.string
    },

    getInitialState: function getInitialState() {
        return {
            newName: this.context.getMessage(this.props.type == 'workspace' ? 'ws.6' : 'ws.7'),
            edit: this.props.type == 'workspace' ? 'template' : 'general',
            driversLoaded: false,
            values: { template: {}, general: {}, driver: {} },
            templateSelectedFields: [],
            fieldStates: null
        };
    },

    isDirty: function isDirty() {
        return false;
    },

    componentDidMount: function componentDidMount() {
        if (!_modelWorkspace2['default'].DRIVERS) {
            _modelWorkspace2['default'].loadAvailableDrivers((function () {
                this.setState({ driversLoaded: true });
            }).bind(this));
        } else {
            this.setState({ driversLoaded: true });
        }
    },

    selectionChange: function selectionChange(editMeta, driver, template) {
        if (driver || template == '0') {
            if (driver && this.state.selectedDriver && this.state.selectedDriver != driver) {
                this.setState({ templateSelectedFields: [] });
            }
            this.setState({
                edit: editMeta,
                selectedDriver: driver,
                selectedTemplate: null,
                fieldStates: null
            });
        } else if (template) {
            this.setState({
                edit: editMeta,
                selectedDriver: null,
                selectedTemplate: template,
                fieldStates: null
            });
        } else {
            this.setState({
                edit: editMeta,
                fieldStates: null
            });
        }
    },

    onFormParameterChange: function onFormParameterChange(paramName, newValue, oldValue) {

        if (this.state.selectedDriver === 'fs' && paramName === 'PATH') {
            FuncUtils.bufferCallback('validate-parameter', 1000, (function () {
                this.validateDriverParameter(paramName, newValue);
            }).bind(this));
        }
    },

    validateDriverParameter: function validateDriverParameter(paramName, paramValue) {
        var fieldStates = this.state.fieldStates || {};
        fieldStates[paramName] = { msg: 'Validating value ... ' };
        this.setState({ fieldStates: fieldStates });

        PydioApi.getClient().request({
            get_action: 'validate_driver_field',
            name: paramName,
            value: paramValue,
            driver: this.state.selectedDriver
        }, (function (transport) {
            var r = transport.responseJSON;
            if (r.error) {
                fieldStates[paramName] = { error: r.error };
            } else if (r.msg) {
                fieldStates[paramName] = { msg: r.msg };
            } else if (fieldStates[paramName]) {
                delete fieldStates[paramName];
            }
            this.setState({ fieldStates: fieldStates });
        }).bind(this));
    },

    onFormChange: function onFormChange(newValues) {
        if (newValues['DISPLAY']) this.setState({ newName: newValues['DISPLAY'] });else if (newValues['DISPLAY']) this.setState({ newName: newValues['DISPLAY'] });
        var allValues = this.state.values;
        allValues[this.state.edit] = newValues;
        this.setState({ values: allValues });
    },

    save: function save() {
        this.props.save(this.props.type, this.state);
    },

    toggleTemplateSelectedField: function toggleTemplateSelectedField(name, value) {
        var selected = this.state.templateSelectedFields;
        if (value && selected.indexOf(name) == -1) {
            selected.push(name);
        } else if (!value && selected.indexOf(name) !== -1) {
            selected = LangUtils.arrayWithout(selected, selected.indexOf(name));
        }
        this.setState({ templateSelectedFields: selected });
    },

    updateValidStatus: function updateValidStatus(newStatus) {
        var validRecord = this.state.valid || {};
        validRecord[this.state.edit] = newStatus;
        this.setState({ valid: validRecord });
    },

    render: function render() {
        var _this = this;

        var editor,
            rightFill = false,
            additionalFeatureComponents;
        if (this.state.edit && this.state.driversLoaded) {
            var formDefs = [],
                formValues = this.state.values[this.state.edit];
            var params;
            if (this.state.edit == 'general') {
                if (this.state.selectedTemplate) {
                    var tplDef = _modelWorkspace2['default'].TEMPLATES.get(this.state.selectedTemplate);
                    var tplOptions = tplDef.options;
                    var driverDefs = _modelWorkspace2['default'].DRIVERS.get(tplDef.type).params;
                    params = [];
                    driverDefs.map(function (p) {
                        if (tplOptions.indexOf(p.name) === -1) {
                            params.push(p);
                        }
                    });
                } else {
                    params = _modelWorkspace2['default'].DRIVERS.get('fs').params;
                }
            } else if (this.state.selectedDriver) {
                params = _modelWorkspace2['default'].DRIVERS.get(this.state.selectedDriver).params;
                if (this.props.type == 'template') {
                    // Filter parameters and build the left-column parameter list.
                    var filteredParams = [],
                        selectedParams = [];
                    _modelWorkspace2['default'].buildEditorStatic(params, filteredParams, {}, 'driver', true);
                    additionalFeatureComponents = React.createElement(_TplFieldsChooser2['default'], {
                        driverName: this.state.selectedDriver,
                        driverFields: filteredParams,
                        selectedFields: this.state.templateSelectedFields,
                        onToggleField: this.toggleTemplateSelectedField
                    });
                    var selected = this.state.templateSelectedFields;
                    filteredParams.map(function (p) {
                        if (p['group'] != 'Template Options' && selected.indexOf(p.name) !== -1) selectedParams.push(p);
                    });
                    params = selectedParams;
                }
            }
            if (params) {
                editor = _modelWorkspace2['default'].buildEditorStatic(params, formDefs, formValues, this.state.selectedTemplate && this.state.edit == 'general' ? 'mixed' : this.state.edit, this.props.type == 'template');
                if (this.state.fieldStates) {
                    (function () {
                        var fieldStates = _this.state.fieldStates;
                        formDefs.map(function (f) {
                            if (fieldStates[f.name] && fieldStates[f.name]['error']) {
                                f.errorText = fieldStates[f.name]['error'];
                            } else if (f.errorText) {
                                delete f['errorText'];
                            }
                            if (fieldStates[f.name] && fieldStates[f.name]['msg']) {
                                // Replace orginal description
                                f.warningText = fieldStates[f.name]['msg'];
                            } else {
                                delete f['warningText'];
                            }
                        });
                    })();
                }
                if (!formDefs.length) {
                    editor = React.createElement(
                        'div',
                        null,
                        pydio.MessageHash['ajxp_admin.ws.68']
                    );
                } else {
                    editor = React.createElement(PydioForm.FormPanel, {
                        parameters: formDefs,
                        values: formValues,
                        className: 'full-width',
                        onChange: this.onFormChange,
                        onParameterChange: this.onFormParameterChange,
                        onValidStatusChange: this.updateValidStatus,
                        depth: -2
                    });
                }
            }
        }

        var currentValid = true;
        if (this.state.valid) {
            LangUtils.objectValues(this.state.valid).map(function (v) {
                currentValid = currentValid && v;
            });
        }
        if (this.state.fieldStates) {
            LangUtils.objectValues(this.state.fieldStates).map(function (v) {
                if (v.error) currentValid = false;
            });
        }

        var oldWizard = React.createElement(_FeaturesListWizard2['default'], {
            onSelectionChange: this.selectionChange,
            driversLoaded: this.state.driversLoaded,
            save: this.save,
            close: this.props.closeEditor,
            wizardType: this.props.type,
            additionalComponents: additionalFeatureComponents,
            disableCreateButton: !currentValid
        });
        var leftNav = React.createElement(_FeaturesStepper2['default'], {
            onSelectionChange: this.selectionChange,
            driversLoaded: this.state.driversLoaded,
            wizardType: this.props.type,
            formIsValid: currentValid,
            save: this.save,
            close: this.props.closeEditor,
            additionalComponent: additionalFeatureComponents
        });

        return React.createElement(
            PydioComponents.PaperEditorLayout,
            {
                title: this.state.newName,
                leftNav: leftNav,
                contentFill: rightFill
            },
            editor
        );
    }

});
module.exports = exports['default'];

},{"../model/Workspace":12,"./FeaturesListWizard":4,"./FeaturesStepper":5,"./TplFieldsChooser":6}],8:[function(require,module,exports){
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

var _materialUi = require('material-ui');

var _modelWorkspace = require('../model/Workspace');

var _modelWorkspace2 = _interopRequireDefault(_modelWorkspace);

var _panelSharesList = require('../panel/SharesList');

var _panelSharesList2 = _interopRequireDefault(_panelSharesList);

var _TplFieldsChooser = require('./TplFieldsChooser');

var _TplFieldsChooser2 = _interopRequireDefault(_TplFieldsChooser);

var _FeaturesList = require('./FeaturesList');

var _FeaturesList2 = _interopRequireDefault(_FeaturesList);

var WorkspaceEditor = (function (_React$Component) {
    _inherits(WorkspaceEditor, _React$Component);

    function WorkspaceEditor(props, context) {
        _classCallCheck(this, WorkspaceEditor);

        _get(Object.getPrototypeOf(WorkspaceEditor.prototype), 'constructor', this).call(this, props, context);
        this.state = {
            dirty: false,
            model: new _modelWorkspace2['default'](this.getWsId(), this.props.node.getAjxpMime() == "repository_editable"),
            edit: this.props.initialEditSection || 'general',
            saveData: {},
            saveMetaSourceData: { "delete": {}, "add": {}, "edit": {} }
        };
    }

    _createClass(WorkspaceEditor, [{
        key: 'getWsId',
        value: function getWsId() {
            return PathUtils.getBasename(this.props.node.getPath());
        }
    }, {
        key: 'getMetaSourceLabel',
        value: function getMetaSourceLabel(metaKey) {
            return this.state.model.getMetaSourceLabel(metaKey);
        }
    }, {
        key: 'getMetaSourceDescription',
        value: function getMetaSourceDescription(metaKey) {
            return this.state.model.getMetaSourceDescription(metaKey);
        }
    }, {
        key: 'clearMetaSourceDiff',
        value: function clearMetaSourceDiff() {
            this.setState({ saveMetaSourceData: { "delete": {}, "add": {}, "edit": {} } });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (!this.state.model.loaded) this.loadModel();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (!this.state.model.loaded) this.loadModel();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            if (this.props.node.getPath() != newProps.node.getPath()) {
                var initState = {
                    dirty: false,
                    model: new _modelWorkspace2['default'](PathUtils.getBasename(newProps.node.getPath()), newProps.node.getAjxpMime() == "repository_editable"),
                    edit: this.props.initialEditSection || 'general',
                    saveData: {},
                    saveMetaSourceData: { "delete": {}, "add": {}, "edit": {} }
                };
                this.setState(initState);
            }
        }
    }, {
        key: 'showMetaSourceForm',
        value: function showMetaSourceForm() {
            pydio.UI.openComponentInModal('AdminWorkspaces', 'MetaSourceForm', {
                model: this.state.model,
                editor: this
            });
        }
    }, {
        key: 'addMetaSource',
        value: function addMetaSource(metaKey) {
            this.state.model.addMetaSource(metaKey);
            var newMetas = this.state.model.getOption("META_SOURCES", true);
            var saveData = this.state.saveData || {};
            saveData[metaKey] = newMetas[metaKey];
            var saveMS = this.state.saveMetaSourceData;
            saveMS['add'][metaKey] = newMetas[metaKey];
            this.setState({
                saveData: saveData,
                saveMetaSourceData: saveMS,
                edit: metaKey,
                dirty: true
            });
        }
    }, {
        key: 'removeMetaSource',
        value: function removeMetaSource(metaKey) {

            this.state.model.removeMetaSource(metaKey);
            // Do something with this?
            var saveData = this.state.saveData || {};
            if (saveData[metaKey]) delete saveData[metaKey];
            var saveMS = this.state.saveMetaSourceData;
            saveMS['delete'][metaKey] = metaKey;
            if (saveMS['add'][metaKey]) delete saveMS['add'][metaKey];
            if (saveMS['edit'][metaKey]) delete saveMS['edit'][metaKey];
            var currentValid = this.state.valid || {};
            if (currentValid[metaKey]) delete currentValid[metaKey];
            this.setState({
                saveData: saveData,
                saveMetaSourceData: saveMS,
                dirty: true,
                edit: 'activity',
                valid: currentValid
            });
        }
    }, {
        key: 'isDirty',
        value: function isDirty() {
            return this.state.dirty;
        }
    }, {
        key: 'loadModel',
        value: function loadModel() {
            this.state.model.load((function (model) {
                if (model.isTemplate() && this.state.edit == 'activity') {
                    this.setState({ edit: 'tpl_children' });
                }
                this.setState({
                    model: model
                });
                if (this.props.registerCloseCallback) {
                    this.props.registerCloseCallback((function () {
                        if (this.isDirty() && !confirm(pydio.MessageHash["role_editor.19"])) {
                            return false;
                        }
                    }).bind(this));
                }
            }).bind(this));
        }
    }, {
        key: 'editMeta',
        value: function editMeta(metaKey) {
            this.setState({ edit: metaKey });
        }
    }, {
        key: 'onFormChange',
        value: function onFormChange(values) {
            var saveData = this.state.saveData || {};
            var saveMS = this.state.saveMetaSourceData;
            var metaKey = this.state.edit;
            if (this.refs.form) {
                if (metaKey == 'driver' || metaKey == 'general') {
                    saveData[metaKey + '_POST'] = this.refs.form.getValuesForPOST(values);
                } else {
                    saveMS['edit'][metaKey] = values;
                    if (saveMS['delete'][metaKey]) delete saveMS['delete'][metaKey];
                }
            }
            saveData[metaKey] = values;
            this.setState({
                dirty: true,
                saveData: saveData
            });
        }
    }, {
        key: 'updateValidStatus',
        value: function updateValidStatus(newStatus) {
            var validRecord = this.state.valid || {};
            validRecord[this.state.edit] = newStatus;
            this.setState({ valid: validRecord });
        }
    }, {
        key: 'onMaskChange',
        value: function onMaskChange(maskValues) {
            var saveData = this.state.saveData || {};
            saveData['permission-mask'] = maskValues;
            this.setState({ saveData: saveData, dirty: true });
        }
    }, {
        key: 'saveWorkspace',
        value: function saveWorkspace() {
            var dPost = this.state.saveData['driver_POST'] || {};
            var gPost = this.state.saveData['general_POST'] || {};
            this.props.saveWorkspace(this.state.model, LangUtils.mergeObjectsRecursive(gPost, dPost), LangUtils.mergeObjectsRecursive(this.state.saveData, { META_SOURCES: this.state.saveMetaSourceData }));
            this.setState({ dirty: false, valid: {} });
        }
    }, {
        key: 'deleteWorkspace',
        value: function deleteWorkspace() {
            this.props.deleteWorkspace(this.getWsId());
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.state.model.resetFromXml();
            this.setState({
                dirty: false,
                saveData: null,
                edit: 'activity',
                valid: {}
            });
        }
    }, {
        key: 'toggleTemplateField',
        value: function toggleTemplateField(name, value, oldSelectedFields) {
            var values = this.state.saveData ? this.state.saveData[this.state.edit] ? this.state.saveData[this.state.edit] : null : null;
            if (!values) {
                values = this.refs.form.getValues();
            }
            var selectedFields = {};
            oldSelectedFields.map(function (f) {
                selectedFields[f] = '';
            });
            values = LangUtils.mergeObjectsRecursive(selectedFields, values);
            if (value) {
                this.state.model.options.set(name, '');
                values[name] = '';
            } else if (this.state.model.options.has(name)) {
                this.state.model.options['delete'](name);
                if (values[name] !== undefined) {
                    delete values[name];
                }
            }
            this.onFormChange(values);
            this.setState({
                model: this.state.model
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var editor, rightFill, tplFieldsComponent, h1, readonlyPanel;
            var workspaceLabel = this.context.getMessage('home.6'),
                driverLabel,
                driverDescription,
                featuresList = _react2['default'].createElement('div', { className: 'workspace-editor-left' });
            if (this.state.model.loaded) {

                switch (this.state.edit) {

                    case 'shares':

                        rightFill = true;
                        editor = _react2['default'].createElement(_panelSharesList2['default'], { model: this.state.model });

                        break;

                    default:

                        var formDefs = [],
                            formValues = {},
                            templateAllFormDefs = [];
                        editor = this.state.model.buildEditor(this.state.edit, formDefs, formValues, this.state.saveData, templateAllFormDefs);

                        if (!formDefs.length) {
                            editor = _react2['default'].createElement(
                                'div',
                                null,
                                this.context.getMessage('ws.68')
                            );
                            break;
                        }

                        editor = _react2['default'].createElement(PydioForm.FormPanel, {
                            ref: 'form',
                            parameters: formDefs,
                            values: formValues,
                            className: 'full-width',
                            onChange: this.onFormChange.bind(this),
                            onValidStatusChange: this.updateValidStatus.bind(this),
                            depth: -2,
                            disabled: !this.state.model.isEditable()
                        });

                        if (!this.state.model.isEditable()) {
                            readonlyPanel = _react2['default'].createElement(
                                'div',
                                { className: 'workspace-readonly-label' },
                                this.context.getMessage('ws.48')
                            );
                        }

                        if (this.state.edit == 'driver' && this.state.model.isTemplate()) {
                            var selectedFields = formDefs.map(function (p) {
                                return p.name;
                            });
                            tplFieldsComponent = _react2['default'].createElement(_TplFieldsChooser2['default'], {
                                driverName: this.state.model.getDriverLabel(),
                                driverFields: templateAllFormDefs,
                                selectedFields: selectedFields,
                                onToggleField: this.toggleTemplateField.bind(this),
                                style: { padding: '0 16px' }
                            });
                        } else if (this.state.edit == 'general') {
                            if (this.state.model.isTemplate()) {
                                h1 = _react2['default'].createElement(
                                    'h1',
                                    { className: 'workspace-general-h1' },
                                    this.context.getMessage('ws.21')
                                );
                            } else {
                                h1 = _react2['default'].createElement(
                                    'h1',
                                    { className: 'workspace-general-h1' },
                                    this.context.getMessage('ws.22')
                                );
                            }
                        }

                        break;
                }

                driverLabel = this.state.model.getDriverLabel();
                driverDescription = this.state.model.getDriverDescription();
                workspaceLabel = this.state.model.getOption('display');

                featuresList = _react2['default'].createElement(_FeaturesList2['default'], {
                    onSelectionChange: this.editMeta.bind(this),
                    currentSelection: this.state.edit,
                    model: this.state.model,
                    driverLabel: driverLabel,
                    driverDescription: driverDescription,
                    metaSourceProvider: this,
                    tplFieldsComponent: tplFieldsComponent
                });
            }

            var currentValid = true;
            if (this.state.valid) {
                LangUtils.objectValues(this.state.valid).map(function (v) {
                    currentValid = currentValid && v;
                });
            }

            var titleActionBarButtons = [];
            if (this.state.model && this.state.model.isEditable()) {
                titleActionBarButtons.push(_react2['default'].createElement(_materialUi.FlatButton, { key: 'delete', label: this.context.getMessage('ws.23'), secondary: true, onTouchTap: this.deleteWorkspace.bind(this) }));
                titleActionBarButtons.push(_react2['default'].createElement('div', { className: 'separator', key: 'separator' }));
            }
            titleActionBarButtons.push(_react2['default'].createElement(_materialUi.FlatButton, { key: 'reset', label: this.context.getMessage('plugins.6'), onTouchTap: this.reset.bind(this), secondary: true, disabled: !this.state.dirty }));
            titleActionBarButtons.push(_react2['default'].createElement(_materialUi.FlatButton, { key: 'save', label: this.context.getMessage('53', ''), onTouchTap: this.saveWorkspace.bind(this), secondary: true, disabled: !this.state.dirty || !currentValid }));
            titleActionBarButtons.push(_react2['default'].createElement(_materialUi.RaisedButton, { key: 'close', label: this.context.getMessage('86', ''), onTouchTap: this.props.closeEditor }));

            return _react2['default'].createElement(
                PydioComponents.PaperEditorLayout,
                {
                    title: workspaceLabel,
                    titleActionBar: titleActionBarButtons,
                    leftNav: featuresList,
                    className: 'workspace-editor',
                    contentFill: rightFill
                },
                readonlyPanel,
                h1,
                editor
            );
        }
    }]);

    return WorkspaceEditor;
})(_react2['default'].Component);

;

WorkspaceEditor.contextTypes = {
    messages: _react2['default'].PropTypes.object,
    getMessage: _react2['default'].PropTypes.func
};

WorkspaceEditor.propTypes = {
    node: _react2['default'].PropTypes.instanceOf(AjxpNode).isRequired,
    closeEditor: _react2['default'].PropTypes.func.isRequired,
    metaSourceProvider: _react2['default'].PropTypes.object,
    initialEditSection: _react2['default'].PropTypes.string,
    saveWorkspace: _react2['default'].PropTypes.func,
    deleteWorkspace: _react2['default'].PropTypes.func,
    registerCloseCallback: _react2['default'].PropTypes.func
};

exports['default'] = WorkspaceEditor;
module.exports = exports['default'];

},{"../model/Workspace":12,"../panel/SharesList":13,"./FeaturesList":3,"./TplFieldsChooser":6,"material-ui":"material-ui","react":"react"}],9:[function(require,module,exports){
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

var _metaMetaSourceForm = require('./meta/MetaSourceForm');

var _metaMetaSourceForm2 = _interopRequireDefault(_metaMetaSourceForm);

var _boardDashboard = require('./board/Dashboard');

var _boardDashboard2 = _interopRequireDefault(_boardDashboard);

var _modelWorkspace = require('./model/Workspace');

var _modelWorkspace2 = _interopRequireDefault(_modelWorkspace);

var _panelSharesList = require('./panel/SharesList');

var _panelSharesList2 = _interopRequireDefault(_panelSharesList);

var _editorTplFieldsChooser = require('./editor/TplFieldsChooser');

var _editorTplFieldsChooser2 = _interopRequireDefault(_editorTplFieldsChooser);

var _metaMetaList = require('./meta/MetaList');

var _metaMetaList2 = _interopRequireDefault(_metaMetaList);

var _panelWorkspaceSummary = require('./panel/WorkspaceSummary');

var _panelWorkspaceSummary2 = _interopRequireDefault(_panelWorkspaceSummary);

var _editorWorkspaceEditor = require('./editor/WorkspaceEditor');

var _editorWorkspaceEditor2 = _interopRequireDefault(_editorWorkspaceEditor);

window.AdminWorkspaces = {
  MetaSourceForm: _metaMetaSourceForm2['default'],
  Dashboard: _boardDashboard2['default'],
  Workspace: _modelWorkspace2['default'],
  SharesList: _panelSharesList2['default'],
  TplFieldsChooser: _editorTplFieldsChooser2['default'],
  MetaList: _metaMetaList2['default'],
  WorkspaceSummary: _panelWorkspaceSummary2['default'],
  WorkspaceEditor: _editorWorkspaceEditor2['default']
};

},{"./board/Dashboard":1,"./editor/TplFieldsChooser":6,"./editor/WorkspaceEditor":8,"./meta/MetaList":10,"./meta/MetaSourceForm":11,"./model/Workspace":12,"./panel/SharesList":13,"./panel/WorkspaceSummary":14}],10:[function(require,module,exports){
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

exports['default'] = _react2['default'].createClass({
    displayName: 'MetaList',

    mixins: [AdminComponents.MessagesConsumerMixin],

    propTypes: {
        currentMetas: _react2['default'].PropTypes.object,
        edit: _react2['default'].PropTypes.string,
        metaSourceProvider: _react2['default'].PropTypes.object,
        closeCurrent: _react2['default'].PropTypes.func,
        setEditState: _react2['default'].PropTypes.func,
        featuresEditable: _react2['default'].PropTypes.bool
    },

    render: function render() {
        var features = [];
        var metas = Object.keys(this.props.currentMetas);
        metas.sort(function (k1, k2) {
            var type1 = k1.split('.').shift();
            var type2 = k2.split('.').shift();
            if (type1 == 'metastore' || type2 == 'index') return -1;
            if (type1 == 'index' || type2 == 'metastore') return 1;
            return k1 > k2 ? 1 : -1;
        });
        if (metas) {
            features = metas.map((function (k) {
                var removeButton, description;
                if (this.props.edit == k && this.props.featuresEditable) {
                    var remove = (function (event) {
                        event.stopPropagation();
                        this.props.metaSourceProvider.removeMetaSource(k);
                    }).bind(this);
                    removeButton = _react2['default'].createElement(
                        'div',
                        { style: { textAlign: 'right' } },
                        _react2['default'].createElement(_materialUi.FlatButton, { label: this.context.getMessage('ws.31'), primary: true, onTouchTap: remove })
                    );
                }
                description = _react2['default'].createElement(
                    'div',
                    { className: 'legend' },
                    this.props.metaSourceProvider.getMetaSourceDescription(k)
                );
                return _react2['default'].createElement(
                    PydioComponents.PaperEditorNavEntry,
                    { key: k, keyName: k, selectedKey: this.props.edit, onClick: this.props.setEditState },
                    this.props.metaSourceProvider.getMetaSourceLabel(k),
                    description,
                    removeButton
                );
            }).bind(this));
        }
        if (this.props.featuresEditable) {
            features.push(_react2['default'].createElement(
                'div',
                { className: 'menu-entry', key: 'add-feature', onClick: this.props.metaSourceProvider.showMetaSourceForm.bind(this.props.metaSourceProvider) },
                '+ ',
                this.context.getMessage('ws.32')
            ));
        }

        return _react2['default'].createElement(
            'div',
            null,
            features
        );
    }

});
module.exports = exports['default'];

},{"material-ui":"material-ui","react":"react"}],11:[function(require,module,exports){
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
var React = require('react');

var _require = require('material-ui');

var MenuItem = _require.MenuItem;
var SelectField = _require.SelectField;

var _require$requireLib = require('pydio').requireLib('boot');

var ActionDialogMixin = _require$requireLib.ActionDialogMixin;
var CancelButtonProviderMixin = _require$requireLib.CancelButtonProviderMixin;
var SubmitButtonProviderMixin = _require$requireLib.SubmitButtonProviderMixin;
var _AdminComponents = AdminComponents;
var MessagesConsumerMixin = _AdminComponents.MessagesConsumerMixin;

var MetaSourceForm = React.createClass({
    displayName: 'MetaSourceForm',

    mixins: [MessagesConsumerMixin, ActionDialogMixin, CancelButtonProviderMixin, SubmitButtonProviderMixin],

    propTypes: {
        model: React.PropTypes.object,
        editor: React.PropTypes.object,
        modalData: React.PropTypes.object
    },

    getDefaultProps: function getDefaultProps() {
        return {
            dialogTitleId: 'ajxp_admin.ws.46',
            dialogSize: 'sm'
        };
    },

    getInitialState: function getInitialState() {
        return { step: 'chooser' };
    },

    setModal: function setModal(pydioModal) {
        this.setState({ modal: pydioModal });
    },

    submit: function submit() {
        if (this.state.pluginId && this.state.pluginId !== -1) {
            this.dismiss();
            this.props.editor.addMetaSource(this.state.pluginId);
        }
    },

    render: function render() {
        var model = this.props.model;
        var currentMetas = model.getOption("META_SOURCES", true);
        var allMetas = model.getAllMetaSources();

        var menuItems = [];
        allMetas.map(function (metaSource) {
            var id = metaSource['id'];
            var type = id.split('.').shift();
            if (type == 'metastore' || type == 'index') {
                var already = false;
                Object.keys(currentMetas).map(function (metaKey) {
                    if (metaKey.indexOf(type) === 0) already = true;
                });
                if (already) return;
            } else {
                if (currentMetas[id]) return;
            }
            menuItems.push(React.createElement(MenuItem, { value: metaSource['id'], primaryText: metaSource['label'] }));
        });
        var change = (function (event, index, value) {
            if (value !== -1) {
                this.setState({ pluginId: value });
            }
        }).bind(this);
        return React.createElement(
            'div',
            { style: { width: '100%' } },
            React.createElement(
                SelectField,
                { value: this.state.pluginId, fullWidth: true, onChange: change },
                menuItems
            )
        );
    }

});

exports['default'] = MetaSourceForm;
module.exports = exports['default'];

},{"material-ui":"material-ui","pydio":"pydio","react":"react"}],12:[function(require,module,exports){
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

var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Workspace = (function (_Observable) {
    _inherits(Workspace, _Observable);

    function Workspace(wsId) {
        var paramsEditable = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        _classCallCheck(this, Workspace);

        _get(Object.getPrototypeOf(Workspace.prototype), 'constructor', this).call(this);
        this.wsId = wsId;
        this.loaded = false;
        this.options = new Map();
        this.xmlData = null;
        this.tplParams = null;
        this.editable = paramsEditable;
    }

    _createClass(Workspace, [{
        key: 'isEditable',
        value: function isEditable() {
            return this.editable;
        }
    }, {
        key: 'getOption',
        value: function getOption(keyName) {
            var copyObject = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            if (copyObject) {
                return LangUtils.deepCopy(this.options.get(keyName));
            } else {
                return this.options.get(keyName);
            }
        }
    }, {
        key: 'getDriverLabel',
        value: function getDriverLabel() {
            return XMLUtils.XPathGetSingleNodeText(this.xmlData, "admin_data/ajxpdriver/@label");
        }
    }, {
        key: 'getDriverDescription',
        value: function getDriverDescription() {
            return XMLUtils.XPathGetSingleNodeText(this.xmlData, "admin_data/ajxpdriver/@description");
        }
    }, {
        key: 'getDriverIconClass',
        value: function getDriverIconClass() {
            var iClass = XMLUtils.XPathGetSingleNodeText(this.xmlData, "admin_data/ajxpdriver/@iconClass");
            return iClass ? iClass : 'icon-hdd';
        }
    }, {
        key: 'supportsFoldersBrowsing',
        value: function supportsFoldersBrowsing() {
            return !XMLUtils.XPathGetSingleNodeText(this.xmlData, "admin_data/repository/@securityScope");
        }
    }, {
        key: 'getDescriptionFromDriverTemplate',
        value: function getDescriptionFromDriverTemplate() {
            var tpl = XMLUtils.XPathGetSingleNodeText(this.xmlData, "admin_data/ajxpdriver/@description_template");
            if (!tpl) return "";
            var options = tpl.match(/{[a-zA-Z\-_]*}/g);
            var doptions = this.options;
            if (options) {
                options.map(function (o) {
                    var oName = o.replace('{', '').replace('}', '');
                    tpl = tpl.replace(o, doptions.get(oName) ? doptions.get(oName) : '');
                });
            }
            var vars = { AJXP_DATA_PATH: 'PYDIO_DATA', AJXP_USER: '[USERNAME]', AJXP_GROUP_PATH: '[GROUP PATH]', AJXP_GROUP_PATH_FLAT: '[GROUPNAME]' };
            for (var t in vars) {
                if (vars.hasOwnProperty(t)) tpl = tpl.replace(t, vars[t]);
            }
            return tpl;
        }
    }, {
        key: 'getPermissionMask',
        value: function getPermissionMask() {
            var node = XMLUtils.XPathSelectSingleNode(this.xmlData, "admin_data/additional_info/mask");
            if (node && node.firstChild && node.firstChild.nodeValue) {
                return JSON.parse(node.firstChild.nodeValue);
            } else {
                return {};
            }
        }
    }, {
        key: 'getSingleNodeTextFromXML',
        value: function getSingleNodeTextFromXML(xPath) {
            return XMLUtils.XPathGetSingleNodeText(this.xmlData, xPath);
        }
    }, {
        key: 'getMetaSourceLabel',
        value: function getMetaSourceLabel(metaKey) {
            return XMLUtils.XPathSelectSingleNode(this.xmlData, 'admin_data/metasources/meta[@id="' + metaKey + '"]/@label').nodeValue;
        }
    }, {
        key: 'getMetaSourceDescription',
        value: function getMetaSourceDescription(metaKey) {
            return XMLUtils.XPathSelectSingleNode(this.xmlData, 'admin_data/metasources/meta[@id="' + metaKey + '"]/@description').nodeValue;
        }
    }, {
        key: 'getAllMetaSources',
        value: function getAllMetaSources() {
            var choices = XMLUtils.XPathSelectNodes(this.xmlData, 'admin_data/metasources/meta');
            return Array.from(choices).map(function (cNode) {
                return { id: cNode.getAttribute('id'), label: cNode.getAttribute('label') };
            });
        }
    }, {
        key: 'addMetaSource',
        value: function addMetaSource(metaKey) {
            var sources = this.options.get('META_SOURCES');
            // Compute default values
            var values = {};
            var metaDefNodes = XMLUtils.XPathSelectNodes(this.xmlData, 'admin_data/metasources/meta[@id="' + metaKey + '"]/param');
            for (var i = 0; i < metaDefNodes.length; i++) {
                var param = PydioForm.Manager.parameterNodeToHash(metaDefNodes[i]);
                if (param['default']) {
                    values[param['name']] = param['default'];
                }
            }
            sources[metaKey] = values;
        }
    }, {
        key: 'removeMetaSource',
        value: function removeMetaSource(metaKey) {
            var sources = this.options.get('META_SOURCES');
            delete sources[metaKey];
        }
    }, {
        key: 'isTemplateChild',
        value: function isTemplateChild() {
            return this.tplParams !== null;
        }
    }, {
        key: 'isTemplate',
        value: function isTemplate() {
            return this.options.get("isTemplate") == "true";
        }
    }, {
        key: 'resetFromXml',
        value: function resetFromXml() {
            this.parseXml(null);
        }
    }, {
        key: 'parseXml',
        value: function parseXml(xmlData) {
            var callback = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            if (xmlData) {
                this.xmlData = xmlData;
            } else {
                xmlData = this.xmlData;
            }
            var repoNode = XMLUtils.XPathSelectSingleNode(xmlData, 'admin_data/repository');
            var options = new Map(),
                att;
            for (var i = 0; i < repoNode.attributes.length; i++) {
                att = repoNode.attributes.item(i);
                options.set(att.nodeName, att.nodeValue);
            }
            Array.from(repoNode.childNodes).map(function (child) {
                if (child.nodeName != 'param') return;
                if (child.firstChild) {
                    if (child.getAttribute("name") == "META_SOURCES") {
                        options.set(child.getAttribute("name"), JSON.parse(child.firstChild.nodeValue));
                    } else {
                        options.set(child.getAttribute("name"), child.firstChild.nodeValue);
                    }
                } else {
                    options.set(child.getAttribute('name'), child.getAttribute('value'));
                }
            });
            var tplParams = XMLUtils.XPathSelectNodes(this.xmlData, "admin_data/template/option");
            if (tplParams.length) {
                var tplParamNames = {};
                for (var k = 0; k < tplParams.length; k++) {
                    if (tplParams[k].getAttribute("name")) {
                        tplParamNames[tplParams[k].getAttribute("name")] = true;
                    }
                }
                this.tplParams = tplParamNames;
            }
            if (!options.get('META_SOURCES')) options.set('META_SOURCES', {});
            this.options = options;
            this.loaded = true;
            this.notify('loaded');
            if (callback) callback(this);
        }
    }, {
        key: 'load',
        value: function load(callback) {
            PydioApi.getClient().request({
                get_action: 'edit',
                sub_action: 'edit_repository',
                repository_id: this.wsId
            }, (function (transport) {
                this.parseXml(transport.responseXML, callback);
            }).bind(this));
        }
    }, {
        key: 'buildEditor',
        value: function buildEditor(type, formDefs, formValues, saveData, templateAllFormDefs) {
            //var formDefs = [], formValues = {};
            if (type == 'driver' || type == 'general') {
                var currentRepoIsTemplate = this.isTemplate();
                if (type == 'general') {
                    if (currentRepoIsTemplate) {
                        formDefs.push({ name: 'TEMPLATE_ID', type: 'string', label: 'Unique Identifier', description: 'Internal Identifier', readonly: true });
                        formDefs.push({ name: 'TEMPLATE_LABEL', type: 'string', label: 'Label', description: 'Human-readable label for this template', mandatory: true });
                        formValues['TEMPLATE_ID'] = this.wsId;
                        formValues['TEMPLATE_LABEL'] = this.getOption('display');
                    } else {
                        formDefs.push({ name: 'WORKSPACE_ID', type: 'string', label: 'Unique Identifier', description: 'Internal Identifier, can be used to build API calls, but the Alias should be preferred.', readonly: true });
                        formDefs.push({ name: 'WORKSPACE_LABEL', type: 'string', label: 'Label', description: 'Human-readable label for this template', mandatory: true });
                        formValues['WORKSPACE_ID'] = this.wsId;
                        formValues['WORKSPACE_LABEL'] = this.getOption('display');
                    }
                }
                var driverParams = XMLUtils.XPathSelectNodes(this.xmlData, "admin_data/ajxpdriver/param");
                for (var i = 0; i < driverParams.length; i++) {
                    var hashedParams = PydioForm.Manager.parameterNodeToHash(driverParams[i]);
                    var generalScope = hashedParams['no_templates'] || hashedParams['templates_only'];
                    if (type == 'general' && !generalScope) continue;
                    if (type == 'driver' && generalScope) continue;
                    if (this.tplParams && this.tplParams[hashedParams['name']]) continue;
                    if (currentRepoIsTemplate && hashedParams['no_templates'] == 'true') {
                        continue;
                    } else if (!currentRepoIsTemplate && hashedParams['templates_only'] == 'true') {
                        continue;
                    }

                    if (templateAllFormDefs) templateAllFormDefs.push(hashedParams);
                    if (currentRepoIsTemplate && type == 'driver' && !this.options.has(hashedParams['name'])) {
                        continue;
                    }

                    var paramName = hashedParams['name'];
                    if (this.options.get(paramName)) {
                        formValues[paramName] = this.options.get(paramName);
                    }
                    if (!generalScope && !hashedParams['group']) {
                        hashedParams['group'] = 'Driver Options';
                    } else if (generalScope) {
                        hashedParams['group'] = '';
                    }
                    formDefs.push(hashedParams);
                }
            } else {
                var metaLabel = this.getMetaSourceLabel(type);
                var metaDefNodes = XMLUtils.XPathSelectNodes(this.xmlData, 'admin_data/metasources/meta[@id="' + type + '"]/param');
                for (i = 0; i < metaDefNodes.length; i++) {
                    var param = PydioForm.Manager.parameterNodeToHash(metaDefNodes[i]);
                    param['group'] = metaLabel;
                    formDefs.push(param);
                }
                var values = this.options.get('META_SOURCES')[type];
                for (var key in values) {
                    if (values.hasOwnProperty(key)) {
                        formValues[key] = values[key];
                    }
                }
            }
            if (saveData && saveData[type]) {
                var saveValues = saveData[type];
                for (var skey in saveValues) {
                    if (saveValues.hasOwnProperty(skey)) {
                        formValues[skey] = saveValues[skey];
                    }
                }
            }
        }
    }, {
        key: 'loadWorkspaceInfo',
        value: function loadWorkspaceInfo(callback) {
            if (this.wsInfo) {
                callback(this.wsInfo);
                return;
            }
            PydioApi.getClient().request({
                get_action: 'load_repository_info',
                tmp_repository_id: this.wsId,
                collect: 'true'
            }, (function (transport) {
                this.wsInfo = transport.responseJSON;
                callback(transport.responseJSON);
            }).bind(this), { discrete: true });
        }
    }], [{
        key: 'loadAvailableDrivers',
        value: function loadAvailableDrivers(callback) {

            Workspace.DRIVERS = new Map();
            Workspace.TEMPLATES = new Map();

            PydioApi.getClient().request({ get_action: 'edit', sub_action: 'get_drivers_definition' }, (function (transport) {
                var xmlData = transport.responseXML;
                var root = XMLUtils.XPathSelectSingleNode(xmlData, "drivers");
                if (root.getAttribute("allowed") == "false") {
                    this.DRIVERS.NOT_ALLOWED = true;
                }
                var driverNodes = XMLUtils.XPathSelectNodes(xmlData, "drivers/ajxpdriver");
                for (var i = 0; i < driverNodes.length; i++) {
                    var driver = driverNodes[i];
                    var driverDef = {};
                    var driverLabel = XMLUtils.XPathGetSingleNodeText(driver, "@label");
                    var driverName = XMLUtils.XPathGetSingleNodeText(driver, "@name");
                    var driverParams = XMLUtils.XPathSelectNodes(driver, "param");

                    // Ignore "Pages" drivers
                    if (!driverName || driverName.startsWith('ajxp_')) continue;

                    driverDef['label'] = driverLabel;
                    driverDef['description'] = XMLUtils.XPathGetSingleNodeText(driver, "@description");
                    driverDef['name'] = driverName;
                    var driverParamsArray = [];
                    for (var j = 0; j < driverParams.length; j++) {
                        var paramNode = driverParams[j];
                        /*
                         if(this.currentCreateRepoType == "template" && paramNode.getAttribute('no_templates') == 'true'){
                         continue;
                         }else if(this.currentCreateRepoType == "repository" && paramNode.getAttribute('templates_only') == 'true'){
                         continue;
                         }
                         */
                        driverParamsArray.push(PydioForm.Manager.parameterNodeToHash(paramNode));
                    }
                    driverDef['params'] = driverParamsArray;
                    this.DRIVERS.set(driverName, driverDef);
                }
                PydioApi.getClient().request({ get_action: 'edit', sub_action: 'get_templates_definition' }, (function (transport) {
                    xmlData = transport.responseXML;
                    var driverNodes = XMLUtils.XPathSelectNodes(xmlData, "repository_templates/template");
                    for (var i = 0; i < driverNodes.length; i++) {
                        var driver = driverNodes[i];
                        var driverDef = {};
                        var driverName = XMLUtils.XPathGetSingleNodeText(driver, "@repository_id");
                        driverDef['label'] = XMLUtils.XPathGetSingleNodeText(driver, "@repository_label");
                        driverDef['type'] = XMLUtils.XPathGetSingleNodeText(driver, "@repository_type");
                        driverDef['name'] = driverName;
                        var driverParams = XMLUtils.XPathSelectNodes(driver, "option");
                        var optionsList = [];
                        for (var k = 0; k < driverParams.length; k++) {
                            optionsList.push(driverParams[k].getAttribute("name"));
                        }
                        driverDef['options'] = optionsList;
                        this.TEMPLATES.set(driverName, driverDef);
                    }
                    callback();
                }).bind(this));
            }).bind(Workspace));
        }
    }, {
        key: 'buildEditorStatic',
        value: function buildEditorStatic(driverParams, formDefs, formValues) {
            var type = arguments.length <= 3 || arguments[3] === undefined ? 'general' : arguments[3];
            var isTemplate = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

            if (type == 'general' || type == 'mixed') {
                var labelField;
                if (isTemplate) {
                    labelField = { name: 'DISPLAY', type: 'string', label: 'Label', description: 'The template label', mandatory: true };
                } else {
                    labelField = { name: 'DISPLAY', type: 'string', label: 'Label', description: 'The workspace label', mandatory: true };
                }
                formDefs.push(labelField);
            }

            for (var i = 0; i < driverParams.length; i++) {
                var hashedParams = LangUtils.deepCopy(driverParams[i]);
                var generalScope = hashedParams['no_templates'] || hashedParams['templates_only'];
                if (type == 'general' && !generalScope) continue;
                if (type == 'driver' && generalScope) continue;
                if (isTemplate && hashedParams['no_templates'] == 'true') {
                    continue;
                } else if (!isTemplate && hashedParams['templates_only'] == 'true') {
                    continue;
                }
                var paramName = hashedParams['name'];
                if (formValues[paramName] === undefined && hashedParams['default']) {
                    formValues[paramName] = hashedParams['default'];
                }
                if (!generalScope && !hashedParams['group']) {
                    hashedParams['group'] = 'Driver Options';
                } else if (generalScope) {
                    hashedParams['group'] = '';
                }
                formDefs.push(hashedParams);
            }
        }
    }]);

    return Workspace;
})(Observable);

exports['default'] = Workspace;
module.exports = exports['default'];

},{}],13:[function(require,module,exports){
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

var _modelWorkspace = require('../model/Workspace');

var _modelWorkspace2 = _interopRequireDefault(_modelWorkspace);

exports['default'] = _react2['default'].createClass({
    displayName: 'SharesList',

    mixins: [AdminComponents.MessagesConsumerMixin],

    propTypes: {
        model: _react2['default'].PropTypes.instanceOf(_modelWorkspace2['default']).isRequired
    },

    getInitialState: function getInitialState() {
        return { clearing: false };
    },

    clearBrokenLinks: function clearBrokenLinks() {
        this.setState({ clearing: true });
        PydioApi.getClient().request({
            get_action: "sharelist-load",
            parent_repository_id: this.props.model.wsId,
            user_context: "global",
            clear_broken_links: "true"
        }, (function (t) {
            var count = t.responseJSON["cleared_count"];
            if (count) {
                pydio.displayMessage('SUCCESS', 'Removed ' + count + ' broken links');
                this.refs.list.reload();
            } else {
                pydio.displayMessage('SUCCESS', 'Nothing to do');
            }
            this.setState({ clearing: false });
        }).bind(this));
    },

    render: function render() {

        return _react2['default'].createElement(
            'div',
            { className: 'layout-fill vertical-layout' },
            _react2['default'].createElement(
                'div',
                { style: { position: 'absolute', right: 20, top: 90 } },
                _react2['default'].createElement(_materialUi.RaisedButton, { label: this.state.clearing ? "Processing..." : "Clear broken links", disabled: this.state.clearing, onTouchTap: this.clearBrokenLinks })
            ),
            _react2['default'].createElement(
                'h1',
                { className: 'workspace-general-h1' },
                this.context.getMessage('ws.38')
            ),
            _react2['default'].createElement(
                ReactMUI.Paper,
                { zDepth: 1, className: 'workspace-activity-block layout-fill vertical-layout' },
                _react2['default'].createElement(PydioComponents.NodeListCustomProvider, {
                    ref: 'list',
                    title: this.context.getMessage('ws.25'),
                    nodeProviderProperties: {
                        get_action: "sharelist-load",
                        parent_repository_id: this.props.model.wsId,
                        user_context: "global"
                    },
                    tableKeys: {
                        owner: { label: this.context.getMessage('ws.39'), width: '20%' },
                        share_type_readable: { label: this.context.getMessage('ws.40'), width: '15%' },
                        original_path: { label: this.context.getMessage('ws.41'), width: '80%' }
                    },
                    actionBarGroups: ['share_list_toolbar-selection', 'share_list_toolbar'],
                    groupByFields: ['owner', 'share_type_readable'],
                    defaultGroupBy: 'share_type_readable',
                    elementHeight: PydioComponents.SimpleList.HEIGHT_ONE_LINE
                })
            )
        );
    }
});
module.exports = exports['default'];

},{"../model/Workspace":12,"material-ui":"material-ui","react":"react"}],14:[function(require,module,exports){
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

var _WorkspaceSummaryCard = require('./WorkspaceSummaryCard');

var _WorkspaceSummaryCard2 = _interopRequireDefault(_WorkspaceSummaryCard);

var _modelWorkspace = require('../model/Workspace');

var _modelWorkspace2 = _interopRequireDefault(_modelWorkspace);

exports['default'] = React.createClass({
    displayName: 'WorkspaceSummary',

    mixins: [AdminComponents.MessagesConsumerMixin],

    propTypes: {
        model: React.PropTypes.instanceOf(_modelWorkspace2['default']).isRequired
    },

    getInitialState: function getInitialState() {
        return { optionsLoaded: false, workspaceInfo: null };
    },

    loadInfo: function loadInfo(model) {
        var optionsLoadedFunc = (function () {
            this.setState({ optionsLoaded: true });
        }).bind(this);
        if (model.loaded) optionsLoadedFunc();else model.observe('loaded', optionsLoadedFunc);
    },

    componentDidMount: function componentDidMount() {
        this.loadInfo(this.props.model);
    },

    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        this.loadInfo(newProps.model);
    },

    render: function render() {
        var driverIcon = 'icon-hdd',
            driverName,
            driverDescription;
        var aclsTitle, aclsDescriptions;
        if (this.state.optionsLoaded) {
            driverIcon = this.props.model.getDriverIconClass();
            driverName = this.props.model.getDriverLabel();
            driverDescription = this.props.model.getDescriptionFromDriverTemplate();
            if (!driverDescription) driverDescription = React.createElement(
                'span',
                null,
                ' '
            );

            var totalUsers = this.props.model.getSingleNodeTextFromXML("admin_data/additional_info/users/@total");
            var sharedFolders = this.props.model.getSingleNodeTextFromXML("admin_data/additional_info/shares/@total");
            aclsTitle = React.createElement(
                'span',
                null,
                this.context.getMessage('ws.35').replace('%i', totalUsers)
            );
            aclsDescriptions = React.createElement(
                'span',
                null,
                this.context.getMessage('ws.36').replace('%i', sharedFolders)
            );
        }

        return React.createElement(
            'div',
            { className: 'workspace-cards-container' },
            React.createElement(
                _WorkspaceSummaryCard2['default'],
                { icon: driverIcon },
                React.createElement(
                    'h4',
                    null,
                    driverName
                ),
                React.createElement(
                    'h5',
                    null,
                    driverDescription ? driverDescription : "&nbsp;"
                )
            ),
            React.createElement(
                _WorkspaceSummaryCard2['default'],
                { icon: 'icon-group' },
                React.createElement(
                    'h4',
                    null,
                    aclsTitle
                ),
                React.createElement(
                    'h5',
                    null,
                    aclsDescriptions
                )
            ),
            React.createElement('span', { style: { clear: 'left' } })
        );
    }

});
module.exports = exports['default'];

},{"../model/Workspace":12,"./WorkspaceSummaryCard":15}],15:[function(require,module,exports){
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
exports['default'] = React.createClass({
    displayName: 'WorkspaceSummaryCard',

    render: function render() {
        return React.createElement(
            ReactMUI.Paper,
            { className: 'workspace-card', zDepth: 1 },
            React.createElement('div', { className: this.props.icon + ' icon-card' }),
            React.createElement(
                'div',
                { className: 'card-content' },
                this.props.children
            )
        );
    }

});
module.exports = exports['default'];

},{}]},{},[9]);
