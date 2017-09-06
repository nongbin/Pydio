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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var Dashboard = _react2['default'].createClass({
    displayName: 'Dashboard',

    mixins: [AdminComponents.MessagesConsumerMixin],

    keys: {
        'label': { label: 'Label', message: 'action.scheduler.12' },
        'schedule': { label: 'Schedule', message: 'action.scheduler.2' },
        'action_name': { label: 'Action', message: 'action.scheduler.1' },
        'repository_id': { label: 'Workspace', message: 'action.scheduler.4s' },
        'user_id': { label: 'User(s)', message: 'action.scheduler.17' },
        'NEXT_EXECUTION': { label: 'Next Execution', message: 'action.scheduler.3' },
        'LAST_EXECUTION': { label: 'Last Execution', message: 'action.scheduler.14' },
        'STATUS': { label: 'Status', message: 'action.scheduler.13' }
    },

    refreshTasks: function refreshTasks() {
        FuncUtils.bufferCallback('reload_task_list', 500, (function () {
            if (this.refs && this.refs.list) {
                this.refs.list.reload();
            }
        }).bind(this));
    },

    statics: {
        getInstance: function getInstance() {
            return Dashboard.__INSTANCE__;
        }
    },

    componentDidMount: function componentDidMount() {
        PydioTasks.Store.getInstance().observe("tasks_updated", this.refreshTasks.bind(this));
        PydioApi.getClient().request({ get_action: 'scheduler_checkConfig' }, (function (t) {
            if (this.isMounted()) this.setState({ config_ok: t.responseJSON['OK'] });
        }).bind(this));
        Dashboard.__INSTANCE__ = this;
    },

    componentWillUnmount: function componentWillUnmount() {
        PydioTasks.Store.getInstance().stopObserving("tasks_updated");
        Dashboard.__INSTANCE__ = null;
    },

    showTaskCreator: function showTaskCreator() {
        pydio.Controller.fireAction("scheduler_addTask");
    },

    runAllTasks: function runAllTasks() {
        pydio.Controller.fireAction("scheduler_runAll");
    },

    showCronExpression: function showCronExpression() {
        pydio.Controller.fireAction("scheduler_generateCronExpression");
    },

    render: function render() {

        var error = null;
        if (this.state && this.state['config_ok'] !== undefined && this.state.config_ok === false) {
            var eLink = _react2['default'].createElement(
                'a',
                { onClick: function () {
                        pydio.goTo('/parameters/core');
                    } },
                this.context.getMessage('scheduler.3', 'ajxp_admin')
            );
            var messageParts = this.context.getMessage('scheduler.2', 'ajxp_admin').split('%1');
            error = _react2['default'].createElement(
                'div',
                { className: 'plugin-doc-error' },
                _react2['default'].createElement('span', { className: 'icon-warning-sign' }),
                ' ',
                messageParts[0],
                eLink,
                messageParts[1]
            );
        }

        return _react2['default'].createElement(
            'div',
            { className: 'main-layout-nav-to-stack workspaces-board' },
            _react2['default'].createElement(
                'div',
                { className: 'left-nav vertical-layout', style: { width: '100%', backgroundColor: 'white' } },
                _react2['default'].createElement(
                    ReactMUI.Paper,
                    { zDepth: 0, className: 'vertical-layout layout-fill' },
                    _react2['default'].createElement(
                        'div',
                        { className: 'vertical-layout workspaces-list layout-fill' },
                        _react2['default'].createElement(
                            'h1',
                            { className: 'admin-panel-title hide-on-vertical-layout' },
                            this.context.getMessage('18', 'action.scheduler')
                        ),
                        error,
                        _react2['default'].createElement(
                            'div',
                            { className: 'plugin-doc-pane' },
                            this.context.getMessage('scheduler.1', 'ajxp_admin')
                        ),
                        _react2['default'].createElement(
                            'div',
                            { className: 'button-container' },
                            _react2['default'].createElement(_materialUi.FlatButton, { primary: true, label: '+ ' + this.context.getMessage('8', 'action.scheduler'), onTouchTap: this.showTaskCreator }),
                            _react2['default'].createElement(_materialUi.FlatButton, { secondary: true, label: this.context.getMessage('15', 'action.scheduler'), onTouchTap: this.runAllTasks }),
                            _react2['default'].createElement(_materialUi.FlatButton, { secondary: true, label: this.context.getMessage('20', 'action.scheduler'), onTouchTap: this.showCronExpression })
                        ),
                        _react2['default'].createElement(PydioComponents.SimpleList, {
                            ref: 'list',
                            node: this.props.currentNode,
                            dataModel: this.props.dataModel,
                            className: 'scheduler-list layout-fill',
                            actionBarGroups: ['get'],
                            infineSliceCount: 1000,
                            tableKeys: this.keys,
                            computeActionsForNode: true,
                            elementHeight: {
                                "max-width:480px": 201,
                                "(min-width:480px) and (max-width:760px)": 80,
                                "min-width:760px": PydioComponents.SimpleList.HEIGHT_ONE_LINE
                            }
                        })
                    )
                )
            )
        );
    }

});

exports['default'] = Dashboard;
module.exports = exports['default'];

},{"material-ui":"material-ui","react":"react"}],2:[function(require,module,exports){
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

var _boardDashboard = require('../board/Dashboard');

var _boardDashboard2 = _interopRequireDefault(_boardDashboard);

var React = require('react');

var _require = require('material-ui');

var FlatButton = _require.FlatButton;

var XMLUtils = require('pydio/util/xml');
var LangUtils = require('pydio/util/lang');
var AjxpNode = require('pydio/model/node');
var Pydio = require('pydio');

var _Pydio$requireLib = Pydio.requireLib('boot');

var ActionDialogMixin = _Pydio$requireLib.ActionDialogMixin;

var _Pydio$requireLib2 = Pydio.requireLib('form');

var Manager = _Pydio$requireLib2.Manager;
var MessagesConsumerMixin = window.AdminComponents.MessagesConsumerMixin;

var TaskEditor = React.createClass({
    displayName: 'TaskEditor',

    mixins: [MessagesConsumerMixin, ActionDialogMixin],

    propTypes: {
        pydio: React.PropTypes.instanceOf(Pydio).isRequired,
        node: React.PropTypes.instanceOf(AjxpNode)
    },

    getDefaultProps: function getDefaultProps() {
        return {
            dialogSize: 'md',
            dialogPadding: 0,
            dialogScrollBody: true
        };
    },

    getButtons: function getButtons() {
        var updater = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

        if (updater) this._buttonsUpdater = updater;
        return [React.createElement(FlatButton, { 'default': true, onTouchTap: this.dismiss, label: 'Close' }), this.previousButton(), this.nextSaveButton()];
    },

    updateActionDescription: function updateActionDescription(actionList, actionValue) {
        if (actionList.has(actionValue)) {
            this.setState({
                currentActionData: actionList.get(actionValue)
            });
        }
    },

    onParameterChange: function onParameterChange(paramName, newValue, oldValue, additionalFormData) {
        if (paramName === "schedule") {

            this.setState({ cron: newValue });
        } else if (paramName === "action_name") {
            if (this._actionsList) {
                this.updateActionDescription(this._actionsList, newValue);
            } else {
                PydioApi.getClient().request({ get_action: "list_all_plugins_actions" }, (function (t) {
                    if (!t.responseJSON || !t.responseJSON.LIST) return;
                    var _actionsList = new Map();
                    for (var plugin in t.responseJSON.LIST) {
                        if (!t.responseJSON.LIST.hasOwnProperty(plugin)) continue;
                        t.responseJSON.LIST[plugin].map(function (a) {
                            _actionsList.set(a.action, a);
                        });
                    }
                    this.updateActionDescription(_actionsList, newValue);
                    this._actionsList = _actionsList;
                }).bind(this));
            }
        }
    },

    onFormChange: function onFormChange(newValues, dirty, removeValues) {
        this.setState({ values: newValues });
    },

    save: function save() {
        var post = this.refs.formPanel.getValuesForPOST(this.state.values, '');
        post['get_action'] = 'scheduler_addTask';
        if (this.state.node) {
            post['task_id'] = this.state.node.getMetadata().get('task_id');
        }
        PydioApi.getClient().request(post, (function () {
            this.close();
            if (_boardDashboard2['default'].getInstance()) {
                _boardDashboard2['default'].getInstance().refreshTasks();
            }
        }).bind(this));
    },

    previousButton: function previousButton() {

        if (this.state.node || this.state.tab === 0) {
            return null;
        }

        var prevTab = (function () {
            var _this = this;

            this.setState({ tab: this.state.tab - 1 }, function () {
                _this.refs.formPanel.externallySelectTab(_this.state.tab);
                if (_this._buttonsUpdater) _this._buttonsUpdater(_this.getButtons());
            });
        }).bind(this);
        return React.createElement(FlatButton, { secondary: true, onTouchTap: prevTab, label: 'Previous' });
    },

    nextSaveButton: function nextSaveButton() {
        if (this.state.node || this.state.tab === 2) {
            return React.createElement(FlatButton, { secondary: true, onTouchTap: this.save, label: 'Save' });
        }
        var nextTab = (function () {
            var _this2 = this;

            this.setState({ tab: this.state.tab + 1 }, function () {
                _this2.refs.formPanel.externallySelectTab(_this2.state.tab);
                if (_this2._buttonsUpdater) _this2._buttonsUpdater(_this2.getButtons());
            });
        }).bind(this);
        return React.createElement(FlatButton, { secondary: true, onTouchTap: nextTab, label: 'Next' });
    },

    tabChange: function tabChange(tabIndex, tab) {
        var _this3 = this;

        this.setState({ tab: tabIndex }, function () {
            if (_this3._buttonsUpdater) _this3._buttonsUpdater(_this3.getButtons());
        });
    },

    getInitialState: function getInitialState() {
        var _this4 = this;

        if (!this.props.node) {
            return {
                tab: 0,
                values: {
                    schedule: '0 3 * * *',
                    repository_id: 'ajxp_conf',
                    user_id: this.props.pydio.user.id
                },
                cron: '0 3 * * *'
            };
        } else {
            var _ret = (function () {
                var values = _this4.props.node.getMetadata();
                var objValues = {};
                var parameters = undefined;
                values.forEach(function (v, k) {
                    if (k === 'parameters') {
                        parameters = JSON.parse(v);
                    } else {
                        objValues[k] = v;
                    }
                });
                if (parameters) {
                    var i = 0;
                    for (var k in parameters) {
                        if (!parameters.hasOwnProperty(k)) continue;
                        objValues['param_name' + (i > 0 ? '_' + i : '')] = k;
                        objValues['param_value' + (i > 0 ? '_' + i : '')] = parameters[k];
                        i++;
                    };
                }
                return {
                    v: { tab: 0, values: objValues, cron: values.get('schedule'), node: _this4.props.node }
                };
            })();

            if (typeof _ret === 'object') return _ret.v;
        }
    },

    getMessage: function getMessage(messId) {
        return this.props.pydio.MessageHash[messId];
    },

    close: function close() {
        this.props.onDismiss();
    },

    render: function render() {

        if (!this._params) {
            var definitionNode = XMLUtils.XPathSelectSingleNode(this.props.pydio.getXmlRegistry(), 'actions/action[@name="scheduler_addTask"]/processing/standardFormDefinition');
            this._params = Manager.parseParameters(definitionNode, "param");
        }
        var params = [];
        // Clone this._params
        this._params.map((function (o) {
            var _this5 = this;

            var copy = LangUtils.deepCopy(o);
            if (copy.name == 'action_name' && this.state.currentActionData) {
                if (this.state.currentActionData.parameters) {
                    (function () {
                        var actionParams = _this5.state.currentActionData.parameters;
                        var descParams = [];
                        actionParams.map(function (p) {
                            descParams.push((p.name === 'nodes' ? 'file' : p.name) + ' (' + p.description + ')');
                        });
                        copy.description = "Declared Parameters : " + descParams.join(', ');
                    })();
                } else {
                    copy.description = "No Declared Parameters";
                }
            }
            params.push(copy);
        }).bind(this));
        if (this.state.cron) {
            params.push({
                name: 'cron_legend',
                type: 'legend',
                group: this.getMessage('action.scheduler.2'),
                description: 'Current CRON: ' + Cronstrue.toString(this.state.cron)
            });
        }
        var tabs = [{ label: 'Schedule', groups: [1] }, { label: 'Action', groups: [2, 0] }, { label: 'Context', groups: [3] }];
        return React.createElement(
            'div',
            null,
            React.createElement(PydioForm.FormPanel, {
                ref: 'formPanel',
                parameters: params,
                values: this.state.values,
                depth: -1,
                tabs: tabs,
                onTabChange: this.tabChange,
                onChange: this.onFormChange,
                onParameterChange: this.onParameterChange
            })
        );
    }

});
exports['default'] = TaskEditor;
module.exports = exports['default'];

},{"../board/Dashboard":1,"material-ui":"material-ui","pydio":"pydio","pydio/model/node":"pydio/model/node","pydio/util/lang":"pydio/util/lang","pydio/util/xml":"pydio/util/xml","react":"react"}],3:[function(require,module,exports){
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

var _boardDashboard = require('./board/Dashboard');

var _boardDashboard2 = _interopRequireDefault(_boardDashboard);

var _editorTaskEditor = require('./editor/TaskEditor');

var _editorTaskEditor2 = _interopRequireDefault(_editorTaskEditor);

window.AdminScheduler = {
  Dashboard: _boardDashboard2['default'],
  TaskEditor: _editorTaskEditor2['default']
};

},{"./board/Dashboard":1,"./editor/TaskEditor":2}]},{},[3]);
