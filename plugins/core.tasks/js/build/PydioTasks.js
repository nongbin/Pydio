'use strict';

var _get = function get(_x11, _x12, _x13) { var _again = true; _function: while (_again) { var object = _x11, property = _x12, receiver = _x13; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x11 = parent; _x12 = property; _x13 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (global) {
    var Task = (function () {
        function Task(data) {
            _classCallCheck(this, Task);

            this._internal = data;
        }

        _createClass(Task, [{
            key: 'getId',
            value: function getId() {
                return this._internal['id'];
            }
        }, {
            key: 'getUserId',
            value: function getUserId() {
                return this._internal['userId'];
            }
        }, {
            key: 'getWorkspaceId',
            value: function getWorkspaceId() {
                return this._internal['wsId'];
            }
        }, {
            key: 'isStoppable',
            value: function isStoppable() {
                return this._internal['flags'] & Task.FLAG_STOPPABLE;
            }
        }, {
            key: 'isResumable',
            value: function isResumable() {
                return this._internal['flags'] & Task.FLAG_RESUMABLE;
            }
        }, {
            key: 'hasProgress',
            value: function hasProgress() {
                return this._internal['flags'] & Task.FLAG_HAS_PROGRESS;
            }
        }, {
            key: 'getProgress',
            value: function getProgress() {
                return this._internal['progress'];
            }
        }, {
            key: 'getLabel',
            value: function getLabel() {
                return this._internal['label'];
            }
        }, {
            key: 'getStatus',
            value: function getStatus() {
                return this._internal['status'];
            }
        }, {
            key: 'getStatusMessage',
            value: function getStatusMessage() {
                return this._internal['statusMessage'];
            }
        }, {
            key: 'getClassName',
            value: function getClassName() {
                return this._internal['className'];
            }
        }, {
            key: 'getData',
            value: function getData() {
                return this._internal;
            }
        }, {
            key: 'pause',
            value: function pause() {
                TaskAPI.updateTaskStatus(this, Task.STATUS_INTERRUPT);
            }
        }, {
            key: 'stop',
            value: function stop() {
                TaskAPI.updateTaskStatus(this, Task.STATUS_COMPLETE);
            }
        }, {
            key: 'hasOpenablePane',
            value: function hasOpenablePane() {
                return false;
            }
        }, {
            key: 'openDetailPane',
            value: function openDetailPane() {}
        }]);

        return Task;
    })();

    Task.STATUS_PENDING = 1;
    Task.STATUS_RUNNING = 2;
    Task.STATUS_COMPLETE = 4;
    Task.STATUS_FAILED = 8;
    Task.STATUS_PAUSED = 16;
    Task.STATUS_INTERRUPT = 64;

    Task.FLAG_STOPPABLE = 1;
    Task.FLAG_RESUMABLE = 2;
    Task.FLAG_HAS_PROGRESS = 4;

    var AlertTask = (function (_Task) {
        _inherits(AlertTask, _Task);

        function AlertTask(label, statusMessage) {
            _classCallCheck(this, AlertTask);

            _get(Object.getPrototypeOf(AlertTask.prototype), 'constructor', this).call(this, {
                id: 'local-alert-task-' + Math.random(),
                userId: global.pydio.user.id,
                wsId: global.pydio.user.activeRepository,
                label: label,
                status: PydioTasks.Task.STATUS_PENDING,
                statusMessage: statusMessage,
                className: 'alert-task'
            });
        }

        _createClass(AlertTask, [{
            key: 'show',
            value: function show() {
                this._timer = global.setTimeout((function () {
                    this.updateStatus(PydioTasks.Task.STATUS_COMPLETE);
                }).bind(this), 7000);
                PydioTasks.Store.getInstance().enqueueLocalTask(this);
            }
        }, {
            key: 'updateStatus',
            value: function updateStatus(status) {
                var statusMessage = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

                this._internal['status'] = status;
                this._internal['statusMessage'] = statusMessage;
                this.notifyMainStore();
            }
        }, {
            key: 'notifyMainStore',
            value: function notifyMainStore() {
                PydioTasks.Store.getInstance().notify("tasks_updated");
            }
        }, {
            key: 'hasOpenablePane',
            value: function hasOpenablePane() {
                return true;
            }
        }, {
            key: 'openDetailPane',
            value: function openDetailPane() {
                AlertTask.close();
            }
        }], [{
            key: 'setCloser',
            value: function setCloser(click) {
                AlertTask.__CLOSER = click;
            }
        }, {
            key: 'close',
            value: function close() {
                AlertTask.__CLOSER();
            }
        }]);

        return AlertTask;
    })(Task);

    var TaskAPI = (function () {
        function TaskAPI() {
            _classCallCheck(this, TaskAPI);
        }

        _createClass(TaskAPI, null, [{
            key: 'createTask',
            value: function createTask(task) {
                var targetUsers = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
                var targetRepositories = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

                var params = {
                    "get_action": "task_create",
                    "task": JSON.stringify(task.getData())
                };
                if (targetUsers && targetRepositories) {
                    params['target-users'] = targetUsers;
                    params['target-repositories'] = targetRepositories;
                }
                PydioApi.getClient().request(params);
            }
        }, {
            key: 'loadTasks',
            value: function loadTasks(callback) {
                var params = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

                if (!global.pydio.user) {
                    callback([]);
                    return;
                }
                if (params) {
                    params['get_action'] = 'tasks_list';
                } else {
                    params = { get_action: 'tasks_list' };
                }
                PydioApi.getClient().request(params, (function (transport) {
                    if (transport.responseJSON) {
                        var tasks = transport.responseJSON.map(function (taskData) {
                            return new Task(taskData);
                        });
                        callback(tasks);
                    }
                }).bind(this), null, { discrete: true });
            }
        }, {
            key: 'loadAdminTasks',
            value: function loadAdminTasks(userScope, repoScope, callback) {
                if (userScope === undefined) userScope = null;
                if (repoScope === undefined) repoScope = null;

                var params = { get_action: "tasks_list" };
                if (userScope) {
                    params["scope"] = "user";
                    params["user_id"] = userScope;
                } else if (repoScope) {
                    params["scope"] = "repository";
                    params["repo_id"] = repoScope;
                } else {
                    params["scope"] = "global";
                }
                TaskAPI.loadTasks(callback, params);
            }
        }, {
            key: 'updateTaskStatus',
            value: function updateTaskStatus(task, status) {
                PydioApi.getClient().request({
                    "get_action": "task_toggle_status",
                    "taskId": task.getData()['id'],
                    "status": status
                });
            }
        }]);

        return TaskAPI;
    })();

    var STORE_INSTANCE = null;

    var TaskStore = (function (_Observable) {
        _inherits(TaskStore, _Observable);

        _createClass(TaskStore, null, [{
            key: 'getInstance',
            value: function getInstance() {
                if (!STORE_INSTANCE) STORE_INSTANCE = new TaskStore();
                return STORE_INSTANCE;
            }
        }]);

        function TaskStore() {
            _classCallCheck(this, TaskStore);

            _get(Object.getPrototypeOf(TaskStore.prototype), 'constructor', this).call(this);
            this._crtPoll = 10;

            this._quickPoll = 2;
            this._longPoll = 15;
            this._pollSteps = 1.4;
            // Start listening to server messages
            global.pydio.observe("server_message", (function (xml) {
                var _this = this;

                var task = XMLUtils.XPathSelectSingleNode(xml, 'tree/task');
                if (task) {
                    var data = task.getAttribute("data");
                    var t = JSON.parse(data);
                    if (t instanceof Object && t.id) {
                        var taskObject = new Task(t);
                        this._tasksList.set(t.id, taskObject);
                        this.notify("tasks_updated", taskObject);
                        global.pydio.notify("poller.frequency", { value: 2 });
                    }
                }
                var taskList = XMLUtils.XPathSelectSingleNode(xml, 'tree/taskList');
                if (taskList) {
                    var jsonData = taskList.firstChild.nodeValue; // CDATA
                    var tasks = JSON.parse(jsonData);
                    if (tasks instanceof Object) {
                        (function () {
                            var taskMap = new Map();
                            tasks.map(function (t) {
                                var task = new Task(t);
                                taskMap.set(task.getId(), task);
                            });
                            _this._tasksList = taskMap;
                            _this.notifyAndSetPollerSpeed(tasks);
                        })();
                    }
                }
            }).bind(this));

            global.pydio.observe("registry_loaded", (function () {

                this.getTasks(true);
            }).bind(this));
        }

        _createClass(TaskStore, [{
            key: 'getTasks',
            value: function getTasks() {
                var forceRefresh = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

                if (this._tasksList == undefined || forceRefresh) {
                    this._tasksList = new Map();
                    TaskAPI.loadTasks((function (tasks) {
                        var taskMap = new Map();
                        tasks.map(function (t) {
                            taskMap.set(t.getId(), t);
                        });
                        this._tasksList = taskMap;
                        this.notifyAndSetPollerSpeed(tasks);
                    }).bind(this));
                }
                // Add local tasks
                if (this._localTasks) {
                    this._localTasks.forEach((function (lT) {
                        this._tasksList.set(lT.getId(), lT);
                    }).bind(this));
                }
                return this._tasksList;
            }
        }, {
            key: 'notifyAndSetPollerSpeed',
            value: function notifyAndSetPollerSpeed(tasks) {
                this.notify("tasks_updated");
                if (tasks.length) {
                    this._crtPoll = this._quickPoll;
                    global.pydio.notify("poller.frequency", { value: this._quickPoll });
                } else {
                    this._crtPoll *= this._pollSteps;
                    if (this._crtPoll >= this._longPoll) {
                        global.pydio.notify("poller.frequency", {});
                    } else {
                        global.pydio.notify("poller.frequency", { value: this._crtPoll });
                    }
                }
            }
        }, {
            key: 'enqueueLocalTask',
            value: function enqueueLocalTask(task) {
                if (!this._localTasks) {
                    this._localTasks = new Map();
                }
                this._localTasks.set(task.getId(), task);
                this.notify("tasks_updated");
            }
        }], [{
            key: 'enqueueActionTask',
            value: function enqueueActionTask(label, action) {
                var parameters = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
                var nodes = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];
                var flags = arguments.length <= 4 || arguments[4] === undefined ? Task.FLAG_STOPPABLE : arguments[4];
                var targetUsers = arguments.length <= 5 || arguments[5] === undefined ? null : arguments[5];
                var targetRepositories = arguments.length <= 6 || arguments[6] === undefined ? null : arguments[6];

                var task = {
                    label: label,
                    flags: flags,
                    status: 1,
                    statusMessage: '',
                    action: action,
                    parameters: parameters,
                    nodes: nodes
                };
                TaskAPI.createTask(new Task(task), targetUsers, targetRepositories);
            }
        }]);

        return TaskStore;
    })(Observable);

    var TaskAction = React.createClass({
        displayName: 'TaskAction',

        getInitialState: function getInitialState() {
            return { showProgress: true };
        },

        showAction: function showAction() {
            this.setState({ showProgress: false });
        },

        showProgress: function showProgress() {
            this.setState({ showProgress: true });
        },

        render: function render() {
            var t = this.props.task;

            var actions = undefined;
            if (t.getStatus() === Task.STATUS_RUNNING && t.isStoppable()) {
                actions = React.createElement('span', { className: 'mdi mdi-stop', onClick: t.pause.bind(t) });
            } else {
                actions = React.createElement('span', { className: 'mdi mdi-close', onClick: t.stop.bind(t) });
            }
            if (this.state.showProgress && t.hasProgress() && t.getStatus() !== Task.STATUS_FAILED) {
                actions = React.createElement(MaterialUI.CircularProgress, { mode: 'determinate', value: t.getProgress(), size: 26, style: { marginTop: 8 } });
            }
            return React.createElement(
                'div',
                { className: 'task_actions', onMouseOver: this.showAction, onMouseOut: this.showProgress },
                actions
            );
        }

    });

    var TaskEntry = React.createClass({
        displayName: 'TaskEntry',

        propTypes: {
            task: React.PropTypes.instanceOf(Task),
            adminDisplayScope: React.PropTypes.bool,
            showFull: React.PropTypes.bool
        },

        render: function render() {
            var t = this.props.task;
            var scopeInfo = undefined;
            if (this.props['adminDisplayScope'] && this.props.adminDisplayScope === 'repository') {
                scopeInfo = "[" + this.props.task.getUserId() + "] ";
            }
            var click = undefined,
                clickStyle = undefined;
            if (this.props.task.hasOpenablePane()) {
                click = this.props.task.openDetailPane;
                clickStyle = { cursor: 'pointer' };
            }
            var customClassName = this.props.task.getClassName() || '';
            if (this.props.showFull) {
                customClassName += ' show-full';
            }
            return React.createElement(
                'div',
                { className: "task " + "task-status-" + this.props.task.getStatus() + " " + customClassName },
                React.createElement(
                    'div',
                    { className: 'task_texts', onClick: click, style: clickStyle },
                    React.createElement(
                        'div',
                        { className: 'task_label' },
                        scopeInfo,
                        t.getLabel()
                    ),
                    React.createElement(
                        'div',
                        { className: 'status_message', title: t.getStatusMessage() },
                        t.getStatusMessage()
                    )
                ),
                React.createElement(TaskAction, { task: t })
            );
        }
    });

    var TasksPanel = React.createClass({
        displayName: 'TasksPanel',

        refreshTasks: function refreshTasks() {
            if (!this.isMounted()) {
                return;
            }
            this.setState({
                tasks: TaskStore.getInstance().getTasks()
            });
        },

        getInitialState: function getInitialState() {
            return {
                tasks: TaskStore.getInstance().getTasks(),
                mouseOver: false
            };
        },

        componentDidMount: function componentDidMount() {
            TaskStore.getInstance().observe("tasks_updated", this.refreshTasks);
        },

        componentWillUnmount: function componentWillUnmount() {
            TaskStore.getInstance().stopObserving("tasks_updated");
        },

        onMouseOver: function onMouseOver() {
            this.setState({ mouseOver: true });
        },

        onMouseOut: function onMouseOut() {
            this.setState({ mouseOver: false });
        },

        render: function render() {
            var tasks = [];
            this.state.tasks.forEach((function (t) {
                if (t.getStatus() === Task.STATUS_COMPLETE) return;
                tasks.push(React.createElement(TaskEntry, { key: t.getId(), task: t, showFull: this.state.mouseOver }));
            }).bind(this));
            var className = "pydio-tasks-panel";
            var heightStyle = undefined;
            if (!tasks.length) {
                className += " invisible";
            } else {
                heightStyle = { height: this.state.mouseOver ? 'auto' : Math.min(tasks.length * 61, 180) };
            }
            return React.createElement(
                MaterialUI.Paper,
                { zDepth: 2, onMouseOver: this.onMouseOver, onMouseOut: this.onMouseOut, className: className, style: heightStyle },
                tasks
            );
        }
    });

    // Export TaskStore
    var ns = global.PydioTasks || {};
    ns.Store = TaskStore;
    ns.Task = Task;
    ns.AlertTask = AlertTask;
    ns.API = TaskAPI;
    ns.Panel = TasksPanel;
    ns.TaskEntry = TaskEntry;
    global.PydioTasks = ns;
})(window);
