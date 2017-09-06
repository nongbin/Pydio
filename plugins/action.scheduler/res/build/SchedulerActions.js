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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (global) {

    var pydio = global.pydio;

    var Callbacks = (function () {
        function Callbacks() {
            _classCallCheck(this, Callbacks);
        }

        /**
         * Sample Dialog class used for reference only, ready to be
         * copy/pasted :-)
         */

        _createClass(Callbacks, null, [{
            key: 'runAll',
            value: function runAll() {
                PydioApi.getClient().request({
                    get_action: 'scheduler_runAll'
                });
            }
        }, {
            key: 'generateCron',
            value: function generateCron() {

                pydio.UI.openComponentInModal('SchedulerActions', 'CronDialog');
            }
        }, {
            key: 'runTask',
            value: function runTask(manager, args) {

                var userSelection;
                if (args && args.length) {
                    userSelection = args[0];
                } else {
                    userSelection = pydio.getUserSelection();
                }
                var taskId = PathUtils.getBasename(userSelection.getUniqueNode().getPath());
                PydioApi.getClient().request({
                    get_action: 'scheduler_runTask',
                    task_id: taskId
                });
            }
        }, {
            key: 'removeTask',
            value: function removeTask(manager, args) {

                var userSelection;
                if (args && args.length) {
                    userSelection = args[0];
                } else {
                    userSelection = pydio.getUserSelection();
                }
                PydioApi.getClient().request({
                    get_action: 'scheduler_removeTask',
                    task_id: PathUtils.getBasename(userSelection.getUniqueNode().getPath())
                });
            }
        }, {
            key: 'stopTask',
            value: function stopTask(manager, args) {

                var userSelection;
                if (args && args.length) {
                    userSelection = args[0];
                } else {
                    userSelection = pydio.getUserSelection();
                }
                var taskId = userSelection.getUniqueNode().getMetadata().get("task_id");
                var task = new PydioTasks.Task({ id: taskId });
                task.stop();
            }
        }]);

        return Callbacks;
    })();

    var CronDialog = React.createClass({
        displayName: 'CronDialog',

        mixins: [PydioReactUI.ActionDialogMixin, PydioReactUI.CancelButtonProviderMixin],

        getDefaultProps: function getDefaultProps() {
            return {
                dialogTitle: "Cron Expression",
                dialogIsModal: false,
                dialogSize: 'md'
            };
        },

        componentDidMount: function componentDidMount() {
            var _this = this;

            PydioApi.getClient().request({ get_action: 'scheduler_generateCronExpression' }, function (transport) {
                _this.setState({ cronExpression: transport.responseText });
            });
        },

        submit: function submit() {
            this.dismiss();
        },
        render: function render() {
            var _PydioComponents = PydioComponents;
            var ClipboardTextField = _PydioComponents.ClipboardTextField;

            if (this.state && this.state.cronExpression) {
                return React.createElement(
                    'div',
                    { style: { width: '100%' } },
                    React.createElement(ClipboardTextField, {
                        fullWidth: true,
                        inputValue: this.state.cronExpression,
                        getMessage: function (id) {
                            return pydio.MessageHash[id];
                        },
                        multiLine: true,
                        maxRows: 5
                    })
                );
            } else {
                return React.createElement(
                    'div',
                    null,
                    'Loading...'
                );
            }
        }

    });

    global.SchedulerActions = {
        Callbacks: Callbacks,
        CronDialog: CronDialog
    };
})(window);
