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
