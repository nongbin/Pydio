(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.UserAccount = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
var ResourcesManager = require('pydio/http/resources-manager');

exports['default'] = function (pydio) {

    return {

        openDashboard: function openDashboard() {
            ResourcesManager.loadClassesAndApply(['PydioForm'], function () {
                pydio.UI.openComponentInModal('UserAccount', 'ModalDashboard');
            });
        },

        openAddressBook: function openAddressBook() {
            ResourcesManager.loadClassesAndApply(['PydioForm', 'PydioComponents'], function () {
                pydio.UI.openComponentInModal('UserAccount', 'ModalAddressBook');
            });
        }

    };
};

module.exports = exports['default'];

},{"pydio/http/resources-manager":"pydio/http/resources-manager"}],2:[function(require,module,exports){
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
var XMLUtils = require('pydio/util/xml');

exports['default'] = {

    getAccountTabs: function getAccountTabs(pydio) {

        return XMLUtils.XPathSelectNodes(pydio.getXmlRegistry(), 'client_configs/component_config[@component="UserAccountTabs"]/additional_tab').map(function (node) {
            return {
                id: node.getAttribute("id"),
                tabInfo: JSON.parse(node.getAttribute('tabInfo')),
                paneInfo: JSON.parse(node.getAttribute('paneInfo'))
            };
        });
    }

};
module.exports = exports['default'];

},{"pydio/util/xml":"pydio/util/xml"}],3:[function(require,module,exports){
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
var PropTypes = _require.PropTypes;

var _require2 = require('material-ui');

var Toggle = _require2.Toggle;
var Subheader = _require2.Subheader;
var MenuItem = _require2.MenuItem;
var SelectField = _require2.SelectField;
var TextField = _require2.TextField;
var TimePicker = _require2.TimePicker;

var EmailPanel = (function (_Component) {
    _inherits(EmailPanel, _Component);

    function EmailPanel() {
        _classCallCheck(this, EmailPanel);

        _get(Object.getPrototypeOf(EmailPanel.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(EmailPanel, [{
        key: 'onChange',
        value: function onChange(partialValues) {
            var _props = this.props;
            var values = _props.values;
            var onChange = _props.onChange;

            onChange(_extends({}, values, partialValues), true);
        }
    }, {
        key: 'onFrequencyChange',
        value: function onFrequencyChange(value) {
            var partial = { NOTIFICATIONS_EMAIL_FREQUENCY: value };
            var newUserValue = undefined;
            switch (value) {
                case 'M':
                    newUserValue = '5';
                    break;
                case 'H':
                    newUserValue = '2';
                    break;
                case 'D1':
                    newUserValue = '03';
                    break;
                case 'D2':
                    newUserValue = '09,14';
                    break;
                case 'W1':
                    newUserValue = 'Monday';
                    break;
            }
            partial.NOTIFICATIONS_EMAIL_FREQUENCY_USER = newUserValue;
            this.onChange(partial);
        }
    }, {
        key: 'onPickDate',
        value: function onPickDate(position, event, date) {
            var NOTIFICATIONS_EMAIL_FREQUENCY_USER = this.props.values.NOTIFICATIONS_EMAIL_FREQUENCY_USER;

            var hours = NOTIFICATIONS_EMAIL_FREQUENCY_USER.split(',');
            var newHours = [];
            if (position === 'first') newHours = [date.getHours(), hours[1] ? hours[1] : '00'];
            if (position === 'last') newHours = [hours[0] ? hours[0] : '00', date.getHours()];
            this.onChange({ NOTIFICATIONS_EMAIL_FREQUENCY_USER: newHours.join(',') });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            var _props2 = this.props;
            var definitions = _props2.definitions;
            var values = _props2.values;
            var pydio = _props2.pydio;

            var message = function message(id) {
                return pydio.MessageHash['user_dash.' + id];
            };
            var NOTIFICATIONS_EMAIL_GET = values.NOTIFICATIONS_EMAIL_GET;
            var NOTIFICATIONS_EMAIL_FREQUENCY = values.NOTIFICATIONS_EMAIL_FREQUENCY;
            var NOTIFICATIONS_EMAIL_FREQUENCY_USER = values.NOTIFICATIONS_EMAIL_FREQUENCY_USER;
            var NOTIFICATIONS_EMAIL = values.NOTIFICATIONS_EMAIL;
            var NOTIFICATIONS_EMAIL_SEND_HTML = values.NOTIFICATIONS_EMAIL_SEND_HTML;

            var mailActive = NOTIFICATIONS_EMAIL_GET === 'true';
            var frequencyTypes = new Map();
            var frequencyMenus = [];
            definitions[1]['choices'].split(',').map(function (e) {
                var d = e.split('|');
                frequencyTypes.set(d[0], d[1]);
                frequencyMenus.push(React.createElement(MenuItem, { primaryText: d[1], value: d[0] }));
            });
            var userFrequencyComponent = undefined;
            if (mailActive) {
                switch (NOTIFICATIONS_EMAIL_FREQUENCY) {
                    case 'M':
                    case 'H':
                        userFrequencyComponent = React.createElement(TextField, {
                            fullWidth: true,
                            floatingLabelText: NOTIFICATIONS_EMAIL_FREQUENCY === 'M' ? message(62) : message(63),
                            value: NOTIFICATIONS_EMAIL_FREQUENCY_USER,
                            onChange: function (e, v) {
                                _this.onChange({ NOTIFICATIONS_EMAIL_FREQUENCY_USER: v });
                            }
                        });
                        break;
                    case 'D1':
                        var d = new Date();
                        d.setHours(NOTIFICATIONS_EMAIL_FREQUENCY_USER);d.setMinutes(0);
                        userFrequencyComponent = React.createElement(TimePicker, {
                            format: 'ampm',
                            hintText: message(64),
                            value: d,
                            onChange: function (e, date) {
                                _this.onChange({ NOTIFICATIONS_EMAIL_FREQUENCY_USER: date.getHours() });
                            },
                            autoOk: true,
                            textFieldStyle: { width: '100%' }
                        });
                        break;
                    case 'D2':
                        var hours = NOTIFICATIONS_EMAIL_FREQUENCY_USER + '';
                        if (!hours) hours = '09,14';
                        hours = hours.split(',');
                        var d1 = new Date();
                        var d2 = new Date();d2.setMinutes(0);
                        d1.setHours(hours[0]);d1.setMinutes(0);
                        if (hours[1]) {
                            d2.setHours(hours[1]);
                        }
                        userFrequencyComponent = React.createElement(
                            'div',
                            { style: { display: 'flex' } },
                            React.createElement(TimePicker, {
                                format: 'ampm',
                                hintText: message(65),
                                value: d1,
                                onChange: this.onPickDate.bind(this, 'first'),
                                textFieldStyle: { width: 100, marginRight: 5 }
                            }),
                            React.createElement(TimePicker, {
                                format: 'ampm',
                                hintText: message(66),
                                value: d2,
                                onChange: this.onPickDate.bind(this, 'last'),
                                textFieldStyle: { width: 100, marginLeft: 5 }
                            })
                        );
                        break;
                    case 'W1':
                        userFrequencyComponent = React.createElement(
                            SelectField,
                            {
                                floatingLabelText: message(67),
                                fullWidth: true,
                                value: NOTIFICATIONS_EMAIL_FREQUENCY_USER,
                                onChange: function (e, i, v) {
                                    _this.onChange({ NOTIFICATIONS_EMAIL_FREQUENCY_USER: v });
                                }
                            },
                            React.createElement(MenuItem, { primaryText: message(68), value: 'Monday' }),
                            React.createElement(MenuItem, { primaryText: message(69), value: 'Tuesday' }),
                            React.createElement(MenuItem, { primaryText: message(70), value: 'Wednesday' }),
                            React.createElement(MenuItem, { primaryText: message(71), value: 'Thursday' }),
                            React.createElement(MenuItem, { primaryText: message(72), value: 'Friday' }),
                            React.createElement(MenuItem, { primaryText: message(73), value: 'Saturday' }),
                            React.createElement(MenuItem, { primaryText: message(74), value: 'Sunday' })
                        );
                        break;
                }
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    Subheader,
                    { style: { paddingLeft: 20 } },
                    message(61)
                ),
                React.createElement(
                    'div',
                    { style: { padding: '0 20px 20px' } },
                    React.createElement(Toggle, {
                        label: definitions[0]['label'],
                        toggled: NOTIFICATIONS_EMAIL_GET === 'true',
                        onToggle: function (e, v) {
                            _this.onChange({ NOTIFICATIONS_EMAIL_GET: v ? 'true' : 'false' });
                        }
                    }),
                    mailActive && React.createElement(
                        'div',
                        { style: { paddingBottom: 16 } },
                        React.createElement(
                            'div',
                            { style: { padding: '16px 0' } },
                            React.createElement(Toggle, {
                                label: definitions[4]['label'],
                                toggled: NOTIFICATIONS_EMAIL_SEND_HTML === 'true',
                                onToggle: function (e, v) {
                                    _this.onChange({ NOTIFICATIONS_EMAIL_SEND_HTML: v ? 'true' : 'false' });
                                }
                            })
                        ),
                        React.createElement(
                            SelectField,
                            {
                                fullWidth: true,
                                floatingLabelText: definitions[1]['label'],
                                value: NOTIFICATIONS_EMAIL_FREQUENCY,
                                onChange: function (e, k, p) {
                                    _this.onFrequencyChange(p);
                                }
                            },
                            frequencyMenus
                        ),
                        userFrequencyComponent
                    )
                )
            );
        }
    }]);

    return EmailPanel;
})(Component);

EmailPanel.propTypes = {

    definitions: PropTypes.object,
    values: PropTypes.object,
    onChange: PropTypes.func

};

exports['default'] = EmailPanel;
module.exports = exports['default'];

},{"material-ui":"material-ui","react":"react"}],4:[function(require,module,exports){
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

var React = require('react');
var Pydio = require('pydio');

var _Pydio$requireLib = Pydio.requireLib('boot');

var ActionDialogMixin = _Pydio$requireLib.ActionDialogMixin;

var _Pydio$requireLib2 = Pydio.requireLib('components');

var ModalAppBar = _Pydio$requireLib2.ModalAppBar;
var AddressBook = _Pydio$requireLib2.AddressBook;

var ModalAddressBook = React.createClass({
    displayName: 'ModalAddressBook',

    mixins: [ActionDialogMixin],

    getDefaultProps: function getDefaultProps() {
        return {
            dialogTitle: '',
            dialogSize: 'xl',
            dialogPadding: false,
            dialogIsModal: false,
            dialogScrollBody: true
        };
    },

    submit: function submit() {
        this.dismiss();
    },

    render: function render() {
        var _this = this;

        return React.createElement(
            'div',
            { style: { width: '100%', display: 'flex', flexDirection: 'column' } },
            React.createElement(ModalAppBar, {
                title: this.props.pydio.MessageHash['user_dash.1'],
                showMenuIconButton: false,
                iconClassNameRight: 'mdi mdi-close',
                onRightIconButtonTouchTap: function () {
                    _this.dismiss();
                }
            }),
            React.createElement(AddressBook, _extends({
                mode: 'book'
            }, this.props, {
                style: { width: '100%', flexGrow: 1, height: 'auto' }
            }))
        );
    }

});

exports['default'] = ModalAddressBook;
module.exports = exports['default'];

},{"pydio":"pydio","react":"react"}],5:[function(require,module,exports){
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

var _ProfilePane = require('./ProfilePane');

var _ProfilePane2 = _interopRequireDefault(_ProfilePane);

var _ComponentConfigParser = require('./ComponentConfigParser');

var _ComponentConfigParser2 = _interopRequireDefault(_ComponentConfigParser);

var React = require('react');
var Pydio = require('pydio');

var _Pydio$requireLib = Pydio.requireLib('boot');

var ActionDialogMixin = _Pydio$requireLib.ActionDialogMixin;
var SubmitButtonProviderMixin = _Pydio$requireLib.SubmitButtonProviderMixin;
var AsyncComponent = _Pydio$requireLib.AsyncComponent;

var _require = require('material-ui');

var Tabs = _require.Tabs;
var Tab = _require.Tab;
var FontIcon = _require.FontIcon;
var FlatButton = _require.FlatButton;

var ModalDashboard = React.createClass({
    displayName: 'ModalDashboard',

    mixins: [ActionDialogMixin, SubmitButtonProviderMixin],

    getDefaultProps: function getDefaultProps() {
        return {
            dialogTitle: '',
            dialogSize: 'md',
            dialogPadding: false,
            dialogIsModal: false,
            dialogScrollBody: false
        };
    },

    submit: function submit() {
        this.dismiss();
    },

    getDefaultButtons: function getDefaultButtons() {
        return [React.createElement(FlatButton, { label: this.props.pydio.MessageHash[86], onTouchTap: this.props.onDismiss })];
    },

    getButtons: function getButtons(updater) {
        this._updater = updater;
        if (this.refs['profile']) {
            return this.refs['profile'].getButtons(this._updater);
        } else {
            return this.getDefaultButtons();
        }
    },

    onTabChange: function onTabChange(value) {
        if (!this._updater) return;
        if (value && this.refs[value] && this.refs[value].getButtons) {
            this._updater(this.refs[value].getButtons(this._updater));
        } else {
            this._updater(this.getDefaultButtons());
        }
    },

    render: function render() {

        var buttonStyle = {
            textTransform: 'none'
        };
        var tabs = [React.createElement(
            Tab,
            { key: 'account', label: this.props.pydio.MessageHash['user_dash.43'], icon: React.createElement(FontIcon, { className: 'mdi mdi-account' }), buttonStyle: buttonStyle, value: 'profile' },
            React.createElement(_ProfilePane2['default'], _extends({}, this.props, { ref: 'profile' }))
        )];

        _ComponentConfigParser2['default'].getAccountTabs(this.props.pydio).map((function (tab) {
            tabs.push(React.createElement(
                Tab,
                { key: tab.id, label: this.props.pydio.MessageHash[tab.tabInfo.label], icon: React.createElement(FontIcon, { className: tab.tabInfo.icon }), buttonStyle: buttonStyle, value: tab.id },
                React.createElement(AsyncComponent, _extends({
                    ref: tab.id
                }, this.props, tab.paneInfo))
            ));
        }).bind(this));

        return React.createElement(
            Tabs,
            {
                style: { display: 'flex', flexDirection: 'column', width: '100%' },
                tabItemContainerStyle: { minHeight: 72 },
                contentContainerStyle: { overflowY: 'auto', minHeight: 350 },
                onChange: this.onTabChange
            },
            tabs
        );
    }

});

exports['default'] = ModalDashboard;
module.exports = exports['default'];

},{"./ComponentConfigParser":2,"./ProfilePane":8,"material-ui":"material-ui","pydio":"pydio","react":"react"}],6:[function(require,module,exports){
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
var Pydio = require('pydio');

var _Pydio$requireLib = Pydio.requireLib('boot');

var ActionDialogMixin = _Pydio$requireLib.ActionDialogMixin;

var _require = require('material-ui');

var AppBar = _require.AppBar;

var _Pydio$requireLib2 = Pydio.requireLib('form');

var ValidPassword = _Pydio$requireLib2.ValidPassword;

var PasswordForm = React.createClass({
    displayName: 'PasswordForm',

    getInitialState: function getInitialState() {
        return { error: null, old: '', newPass: '' };
    },

    getMessage: function getMessage(id) {
        return this.props.pydio.MessageHash[id];
    },

    update: function update(value, field) {
        var _this = this;

        var newStatus = {};
        newStatus[field] = value;
        this.setState(newStatus, function () {
            var status = _this.validate();
            if (_this.props.onValidStatusChange) {
                _this.props.onValidStatusChange(status);
            }
        });
    },

    validate: function validate() {
        if (!this.refs.newpass.isValid()) {
            return false;
        }
        var _state = this.state;
        var oldPass = _state.oldPass;
        var newPass = _state.newPass;

        if (!oldPass || !newPass) {
            this.setState({ error: this.getMessage(239) });
            return false;
        }
        if (newPass.length < parseInt(this.props.pydio.getPluginConfigs("core.auth").get("PASSWORD_MINLENGTH"))) {
            this.setState({ error: this.getMessage(378) });
            return false;
        }
        this.setState({ error: null });
        return true;
    },

    post: function post(callback) {
        var _state2 = this.state;
        var oldPass = _state2.oldPass;
        var newPass = _state2.newPass;

        var logoutString = '';
        if (this.props.pydio.user.lock) {
            logoutString = ' ' + this.getMessage(445);
        }
        PydioApi.getClient().request({
            get_action: 'pass_change',
            old_pass: oldPass,
            new_pass: newPass,
            pass_seed: '-1'
        }, (function (transport) {

            if (transport.responseText === 'PASS_ERROR') {

                this.setState({ error: this.getMessage(240) });
                callback(false);
            } else if (transport.responseText === 'SUCCESS') {

                this.props.pydio.displayMessage('SUCCESS', this.getMessage(197) + logoutString);
                callback(true);
                if (logoutString) {
                    this.props.pydio.getController().fireAction('logout');
                }
            }
        }).bind(this));
    },

    render: function render() {
        var _this2 = this;

        var messages = this.props.pydio.MessageHash;
        var legend = undefined;
        if (this.state.error) {
            legend = React.createElement(
                'div',
                { className: 'error' },
                this.state.error
            );
        } else if (this.props.pydio.user.lock) {
            legend = React.createElement(
                'div',
                null,
                messages[444]
            );
        }
        var oldChange = function oldChange(event, newV) {
            _this2.update(newV, 'oldPass');
        };
        var newChange = function newChange(newV, oldV) {
            _this2.update(newV, 'newPass');
        };
        return React.createElement(
            'div',
            { style: this.props.style },
            legend,
            React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { autoComplete: 'off' },
                    React.createElement(MaterialUI.TextField, {
                        onChange: oldChange,
                        type: 'password',
                        value: this.state.oldPass,
                        ref: 'old',
                        floatingLabelText: messages[237],
                        autoComplete: 'off'
                    })
                )
            ),
            React.createElement(
                'div',
                { style: { width: 250 } },
                React.createElement(ValidPassword, {
                    onChange: newChange,
                    attributes: { name: 'pass', label: messages[198] },
                    value: this.state.newPass,
                    name: 'newpassword',
                    ref: 'newpass'
                })
            )
        );
    }

});

exports['default'] = PasswordForm;
module.exports = exports['default'];

},{"material-ui":"material-ui","pydio":"pydio","react":"react"}],7:[function(require,module,exports){
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

var _PasswordForm = require('./PasswordForm');

var _PasswordForm2 = _interopRequireDefault(_PasswordForm);

var React = require('react');

var _require = require('material-ui');

var FlatButton = _require.FlatButton;
var RaisedButton = _require.RaisedButton;
var Popover = _require.Popover;
var Divider = _require.Divider;

var Pydio = require('pydio');

var PasswordPopover = (function (_React$Component) {
    _inherits(PasswordPopover, _React$Component);

    function PasswordPopover(props, context) {
        _classCallCheck(this, PasswordPopover);

        _get(Object.getPrototypeOf(PasswordPopover.prototype), 'constructor', this).call(this, props, context);
        this.state = { passOpen: false, passValid: false, passAnchor: null };
    }

    _createClass(PasswordPopover, [{
        key: 'passOpenPopover',
        value: function passOpenPopover(event) {
            this.setState({ passOpen: true, passAnchor: event.currentTarget });
        }
    }, {
        key: 'passClosePopover',
        value: function passClosePopover() {
            this.setState({ passOpen: false });
        }
    }, {
        key: 'passValidStatusChange',
        value: function passValidStatusChange(status) {
            this.setState({ passValid: status });
        }
    }, {
        key: 'passSubmit',
        value: function passSubmit() {
            this.refs.passwordForm.post((function (value) {
                if (value) this.passClosePopover();
            }).bind(this));
        }
    }, {
        key: 'render',
        value: function render() {
            var pydio = this.props.pydio;
            var _state = this.state;
            var passOpen = _state.passOpen;
            var passAnchor = _state.passAnchor;
            var passValid = _state.passValid;

            return React.createElement(
                'div',
                { style: { marginLeft: 8 } },
                React.createElement(RaisedButton, {
                    onTouchTap: this.passOpenPopover.bind(this),
                    label: pydio.MessageHash[194],
                    primary: true
                }),
                React.createElement(
                    Popover,
                    {
                        open: passOpen,
                        anchorEl: passAnchor,
                        anchorOrigin: { horizontal: 'left', vertical: 'top' },
                        targetOrigin: { horizontal: 'left', vertical: 'bottom' },
                        onRequestClose: this.passClosePopover.bind(this)
                    },
                    React.createElement(
                        'div',
                        null,
                        React.createElement(_PasswordForm2['default'], {
                            style: { padding: 10, backgroundColor: '#fafafa' },
                            pydio: pydio,
                            ref: 'passwordForm',
                            onValidStatusChange: this.passValidStatusChange.bind(this)
                        }),
                        React.createElement(Divider, null),
                        React.createElement(
                            'div',
                            { style: { textAlign: 'right', padding: '8px 0' } },
                            React.createElement(FlatButton, { label: this.props.pydio.MessageHash[49], onTouchTap: this.passClosePopover.bind(this) }),
                            React.createElement(FlatButton, { disabled: !passValid, label: 'Ok', onTouchTap: this.passSubmit.bind(this) })
                        )
                    )
                )
            );
        }
    }]);

    return PasswordPopover;
})(React.Component);

exports['default'] = PasswordPopover;
module.exports = exports['default'];

},{"./PasswordForm":6,"material-ui":"material-ui","pydio":"pydio","react":"react"}],8:[function(require,module,exports){
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

var _PasswordPopover = require('./PasswordPopover');

var _PasswordPopover2 = _interopRequireDefault(_PasswordPopover);

var _EmailPanel = require('./EmailPanel');

var _EmailPanel2 = _interopRequireDefault(_EmailPanel);

var React = require('react');
var LangUtils = require('pydio/util/lang');

var _require = require('material-ui');

var FlatButton = _require.FlatButton;
var Divider = _require.Divider;

var Pydio = require('pydio');

var _Pydio$requireLib = Pydio.requireLib('form');

var Manager = _Pydio$requireLib.Manager;
var FormPanel = _Pydio$requireLib.FormPanel;

var FORM_CSS = ' \n.react-mui-context .current-user-edit.pydio-form-panel > .pydio-form-group:first-of-type {\n  margin-top: 220px;\n  overflow-y: hidden;\n}\n.react-mui-context .current-user-edit.pydio-form-panel > .pydio-form-group div.form-entry-image {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 200px;\n  background-color: #eceff1;\n}\n.react-mui-context .current-user-edit.pydio-form-panel > .pydio-form-group div.form-entry-image .image-label,\n.react-mui-context .current-user-edit.pydio-form-panel > .pydio-form-group div.form-entry-image .form-legend {\n  display: none;\n}\n.react-mui-context .current-user-edit.pydio-form-panel > .pydio-form-group div.form-entry-image .file-dropzone {\n  border-radius: 50%;\n  width: 160px !important;\n  height: 160px !important;\n  margin: 20px auto;\n}\n.react-mui-context .current-user-edit.pydio-form-panel > .pydio-form-group div.form-entry-image .binary-remove-button {\n  position: absolute;\n  bottom: 5px;\n  right: 0;\n}\n\n';

var ProfilePane = React.createClass({
    displayName: 'ProfilePane',

    getInitialState: function getInitialState() {
        var objValues = {},
            mailValues = {};
        var pydio = this.props.pydio;
        if (pydio.user) {
            pydio.user.preferences.forEach(function (v, k) {
                if (k === 'gui_preferences') return;
                objValues[k] = v;
            });
        }
        return {
            definitions: Manager.parseParameters(pydio.getXmlRegistry(), "user/preferences/pref[@exposed='true']|//param[contains(@scope,'user') and @expose='true' and not(contains(@name, 'NOTIFICATIONS_EMAIL'))]"),
            mailDefinitions: Manager.parseParameters(pydio.getXmlRegistry(), "user/preferences/pref[@exposed='true']|//param[contains(@scope,'user') and @expose='true' and contains(@name, 'NOTIFICATIONS_EMAIL')]"),
            values: objValues,
            originalValues: LangUtils.deepCopy(objValues),
            dirty: false
        };
    },

    onFormChange: function onFormChange(newValues, dirty, removeValues) {
        var _this = this;

        this.setState({ dirty: dirty, values: newValues }, function () {
            if (_this._updater) _this._updater(_this.getButtons());
            if (_this.props.saveOnChange) _this.saveForm();
        });
    },

    getButtons: function getButtons() {
        var updater = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

        if (updater) this._updater = updater;
        var button = undefined,
            revert = undefined;
        if (this.state.dirty) {
            revert = React.createElement(FlatButton, { label: this.props.pydio.MessageHash[628], onTouchTap: this.revert });
            button = React.createElement(FlatButton, { label: this.props.pydio.MessageHash[53], secondary: true, onTouchTap: this.saveForm });
        } else {
            button = React.createElement(FlatButton, { label: this.props.pydio.MessageHash[86], onTouchTap: this.props.onDismiss });
        }
        if (this.props.pydio.Controller.getActionByName('pass_change')) {
            return [React.createElement(
                'div',
                { style: { display: 'flex', width: '100%' } },
                React.createElement(_PasswordPopover2['default'], this.props),
                React.createElement('span', { style: { flex: 1 } }),
                revert,
                button
            )];
        } else {
            return [button];
        }
    },

    getButton: function getButton(actionName, messageId) {
        var pydio = this.props.pydio;
        if (!pydio.Controller.getActionByName(actionName)) {
            return null;
        }
        var func = function func() {
            pydio.Controller.fireAction(actionName);
        };
        return React.createElement(ReactMUI.RaisedButton, { label: pydio.MessageHash[messageId], onClick: func });
    },

    revert: function revert() {
        var _this2 = this;

        this.setState({
            values: _extends({}, this.state.originalValues),
            dirty: false
        }, function () {
            if (_this2._updater) _this2._updater(_this2.getButtons());
        });
    },

    saveForm: function saveForm() {
        if (!this.state.dirty) {
            this.setState({ dirty: false });
            return;
        }
        var pydio = this.props.pydio;
        var _state = this.state;
        var definitions = _state.definitions;
        var values = _state.values;

        var postValues = Manager.getValuesForPOST(definitions, values, 'PREFERENCES_');
        postValues['get_action'] = 'custom_data_edit';
        PydioApi.getClient().request(postValues, (function (transport) {
            var _this3 = this;

            PydioApi.getClient().parseXmlMessage(transport.responseXML);
            pydio.observeOnce('user_logged', function (userObject) {
                if (values.avatar && userObject.getPreference('avatar') !== values.avatar) {
                    _this3.setState({ values: _extends({}, values, { avatar: userObject.getPreference('avatar') }) });
                }
            });
            pydio.refreshUserData();
            this.setState({ dirty: false }, function () {
                if (_this3._updater) _this3._updater(_this3.getButtons());
            });
        }).bind(this));
    },

    render: function render() {
        var _props = this.props;
        var pydio = _props.pydio;
        var miniDisplay = _props.miniDisplay;

        if (!pydio.user) return null;
        var _state2 = this.state;
        var definitions = _state2.definitions;
        var values = _state2.values;

        if (miniDisplay) {
            definitions = definitions.filter(function (o) {
                return ['avatar'].indexOf(o.name) !== -1;
            });
        }
        return React.createElement(
            'div',
            null,
            React.createElement(FormPanel, {
                className: 'current-user-edit',
                parameters: definitions,
                values: values,
                depth: -1,
                binary_context: "user_id=" + pydio.user.id,
                onChange: this.onFormChange
            }),
            !miniDisplay && React.createElement(Divider, null),
            !miniDisplay && React.createElement(_EmailPanel2['default'], { pydio: this.props.pydio, definitions: this.state.mailDefinitions, values: values, onChange: this.onFormChange }),
            React.createElement('style', { type: 'text/css', dangerouslySetInnerHTML: { __html: FORM_CSS } })
        );
    }

});

exports['default'] = ProfilePane;
module.exports = exports['default'];

},{"./EmailPanel":3,"./PasswordPopover":7,"material-ui":"material-ui","pydio":"pydio","pydio/util/lang":"pydio/util/lang","react":"react"}],9:[function(require,module,exports){
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

var Toggle = _require.Toggle;
var Divider = _require.Divider;
var TextField = _require.TextField;
var RaisedButton = _require.RaisedButton;

var _require$requireLib = require('pydio').requireLib('components');

var ClipboardTextField = _require$requireLib.ClipboardTextField;

var WebDAVPane = React.createClass({
    displayName: 'WebDAVPane',

    componentDidMount: function componentDidMount() {
        this.loadPrefs();
    },
    getMessage: function getMessage(id) {
        return this.props.pydio.MessageHash[id];
    },
    onToggleChange: function onToggleChange(event, newValue) {
        PydioApi.getClient().request({
            get_action: 'webdav_preferences',
            activate: newValue ? "true" : "false"
        }, (function (t) {
            this.setState({ preferences: t.responseJSON });
            this.props.pydio.displayMessage("SUCCESS", this.props.pydio.MessageHash[newValue ? 408 : 409]);
        }).bind(this));
    },
    savePassword: function savePassword(event) {
        PydioApi.getClient().request({
            get_action: 'webdav_preferences',
            webdav_pass: this.refs['passfield'].getValue()
        }, (function (t) {
            this.setState({ preferences: t.responseJSON });
            this.props.pydio.displayMessage("SUCCESS", this.props.pydio.MessageHash[410]);
        }).bind(this));
    },
    loadPrefs: function loadPrefs() {
        if (!this.isMounted()) return;
        PydioApi.getClient().request({
            get_action: 'webdav_preferences'
        }, (function (t) {
            this.setState({ preferences: t.responseJSON });
        }).bind(this));
    },

    renderPasswordField: function renderPasswordField() {

        if (this.state.preferences.digest_set || !this.state.preferences.webdav_force_basic) {
            return null;
        }
        return React.createElement(
            'div',
            null,
            React.createElement(Divider, null),
            React.createElement(
                'div',
                { style: { padding: 16 } },
                React.createElement(
                    'div',
                    null,
                    this.getMessage(407)
                ),
                React.createElement(
                    'div',
                    { style: { display: 'flex', alignItems: 'baseline' } },
                    React.createElement(TextField, {
                        type: 'password',
                        floatingLabelText: this.getMessage(523),
                        ref: 'passfield',
                        style: { flex: 1, marginRight: 10 }
                    }),
                    React.createElement(RaisedButton, {
                        label: 'Save',
                        onClick: this.savePassword
                    })
                )
            ),
            React.createElement(Divider, null)
        );
    },

    renderUrls: function renderUrls() {
        var _this = this;

        var base = this.state.preferences.webdav_base_url;
        var otherUrls = [];
        var toggler = !!this.state.toggler;
        var pydio = this.props.pydio;
        var preferences = this.state.preferences;

        if (toggler) {
            (function () {
                var userRepos = pydio.user.getRepositoriesList();
                var webdavRepos = preferences.webdav_repositories;
                userRepos.forEach((function (repo, key) {
                    if (!webdavRepos[key]) return;
                    otherUrls.push(React.createElement(ClipboardTextField, { key: key, floatingLabelText: repo.getLabel(), inputValue: webdavRepos[key], getMessage: this.getMessage }));
                }).bind(_this));
            })();
        }

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { style: { padding: 20 } },
                React.createElement(
                    'div',
                    null,
                    this.getMessage(405)
                ),
                React.createElement(ClipboardTextField, { floatingLabelText: this.getMessage(468), inputValue: base, getMessage: this.getMessage })
            ),
            toggler && React.createElement(Divider, null),
            React.createElement(
                'div',
                { style: { padding: 20 } },
                React.createElement(Toggle, { labelPosition: 'right', label: this.getMessage(465), onToggle: function () {
                        _this.setState({ toggler: !toggler });
                    }, toggled: toggler }),
                otherUrls
            )
        );
    },

    render: function render() {
        var webdavActive = this.state && this.state.preferences.webdav_active;
        return React.createElement(
            'div',
            { style: { fontSize: 14 } },
            React.createElement(
                'div',
                { style: { padding: 20 } },
                React.createElement(Toggle, {
                    labelPosition: 'right',
                    label: this.getMessage(406),
                    toggled: webdavActive,
                    onToggle: this.onToggleChange }),
                !webdavActive && React.createElement(
                    'div',
                    { style: { paddingTop: 20 } },
                    this.getMessage(404)
                )
            ),
            webdavActive && React.createElement(
                'div',
                null,
                React.createElement(Divider, null),
                this.renderPasswordField(),
                this.renderUrls()
            )
        );
    }

});

exports['default'] = WebDAVPane;
module.exports = exports['default'];

},{"material-ui":"material-ui","pydio":"pydio","react":"react"}],10:[function(require,module,exports){
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

var _ProfilePane = require('./ProfilePane');

var _ProfilePane2 = _interopRequireDefault(_ProfilePane);

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var _materialUi = require('material-ui');

var _Pydio$requireLib = _pydio2['default'].requireLib('boot');

var ActionDialogMixin = _Pydio$requireLib.ActionDialogMixin;
var CancelButtonProviderMixin = _Pydio$requireLib.CancelButtonProviderMixin;
var SubmitButtonProviderMixin = _Pydio$requireLib.SubmitButtonProviderMixin;

/**
 * Sample Dialog class used for reference only, ready to be
 * copy/pasted :-)
 */
exports['default'] = _react2['default'].createClass({
    displayName: 'WelcomeModal',

    mixins: [ActionDialogMixin, CancelButtonProviderMixin],

    getDefaultProps: function getDefaultProps() {
        return {
            dialogTitle: '',
            dialogIsModal: true,
            dialogSize: 'sm',
            dialogPadding: 0
        };
    },
    close: function close(skip) {

        if (this.props.onRequestStart) {
            this.props.onRequestStart(skip);
        }
        this.props.onDismiss();
    },
    getMessage: function getMessage(id) {
        return this.props.pydio.MessageHash['ajax_gui.tour.welcomemodal.' + id];
    },
    getButtons: function getButtons() {
        var _this = this;

        return [_react2['default'].createElement(_materialUi.FlatButton, { label: this.getMessage('skip'), onTouchTap: function () {
                _this.close(true);
            } }), _react2['default'].createElement(_materialUi.FlatButton, { label: this.getMessage('start'), primary: true, onTouchTap: function () {
                return _this.close(false);
            } })];
    },
    render: function render() {
        return _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
                'div',
                { style: { position: 'relative', width: '100%', height: 205, overflow: 'hidden', backgroundColor: '#eceff1' } },
                _react2['default'].createElement(_ProfilePane2['default'], _extends({ miniDisplay: true }, this.props, { saveOnChange: true }))
            ),
            _react2['default'].createElement(_materialUi.CardTitle, { title: this.getMessage('title'), subtitle: this.getMessage('subtitle') })
        );
    }

});
module.exports = exports['default'];

},{"./ProfilePane":8,"material-ui":"material-ui","pydio":"pydio","react":"react"}],11:[function(require,module,exports){
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

var _Callbacks = require('./Callbacks');

var _Callbacks2 = _interopRequireDefault(_Callbacks);

var _ModalDashboard = require('./ModalDashboard');

var _ModalDashboard2 = _interopRequireDefault(_ModalDashboard);

var _ModalAddressBook = require('./ModalAddressBook');

var _ModalAddressBook2 = _interopRequireDefault(_ModalAddressBook);

var _WebdavPane = require('./WebdavPane');

var _WebdavPane2 = _interopRequireDefault(_WebdavPane);

var _WelcomeModal = require('./WelcomeModal');

var _WelcomeModal2 = _interopRequireDefault(_WelcomeModal);

var _PasswordForm = require('./PasswordForm');

var _PasswordForm2 = _interopRequireDefault(_PasswordForm);

var Callbacks = (0, _Callbacks2['default'])(window.pydio);

exports.Callbacks = Callbacks;
exports.ModalDashboard = _ModalDashboard2['default'];
exports.ModalAddressBook = _ModalAddressBook2['default'];
exports.WebDAVPane = _WebdavPane2['default'];
exports.WelcomeModal = _WelcomeModal2['default'];
exports.PasswordForm = _PasswordForm2['default'];

},{"./Callbacks":1,"./ModalAddressBook":4,"./ModalDashboard":5,"./PasswordForm":6,"./WebdavPane":9,"./WelcomeModal":10}]},{},[11])(11)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJyZXMvYnVpbGQvQ2FsbGJhY2tzLmpzIiwicmVzL2J1aWxkL0NvbXBvbmVudENvbmZpZ1BhcnNlci5qcyIsInJlcy9idWlsZC9FbWFpbFBhbmVsLmpzIiwicmVzL2J1aWxkL01vZGFsQWRkcmVzc0Jvb2suanMiLCJyZXMvYnVpbGQvTW9kYWxEYXNoYm9hcmQuanMiLCJyZXMvYnVpbGQvUGFzc3dvcmRGb3JtLmpzIiwicmVzL2J1aWxkL1Bhc3N3b3JkUG9wb3Zlci5qcyIsInJlcy9idWlsZC9Qcm9maWxlUGFuZS5qcyIsInJlcy9idWlsZC9XZWJkYXZQYW5lLmpzIiwicmVzL2J1aWxkL1dlbGNvbWVNb2RhbC5qcyIsInJlcy9idWlsZC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gKiBDb3B5cmlnaHQgMjAwNy0yMDE3IENoYXJsZXMgZHUgSmV1IC0gQWJzdHJpdW0gU0FTIDx0ZWFtIChhdCkgcHlkLmlvPlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgUHlkaW8uXG4gKlxuICogUHlkaW8gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBQeWRpbyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBQeWRpby4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqXG4gKiBUaGUgbGF0ZXN0IGNvZGUgY2FuIGJlIGZvdW5kIGF0IDxodHRwczovL3B5ZGlvLmNvbT4uXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xudmFyIFJlc291cmNlc01hbmFnZXIgPSByZXF1aXJlKCdweWRpby9odHRwL3Jlc291cmNlcy1tYW5hZ2VyJyk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGZ1bmN0aW9uIChweWRpbykge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBvcGVuRGFzaGJvYXJkOiBmdW5jdGlvbiBvcGVuRGFzaGJvYXJkKCkge1xuICAgICAgICAgICAgUmVzb3VyY2VzTWFuYWdlci5sb2FkQ2xhc3Nlc0FuZEFwcGx5KFsnUHlkaW9Gb3JtJ10sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBweWRpby5VSS5vcGVuQ29tcG9uZW50SW5Nb2RhbCgnVXNlckFjY291bnQnLCAnTW9kYWxEYXNoYm9hcmQnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9wZW5BZGRyZXNzQm9vazogZnVuY3Rpb24gb3BlbkFkZHJlc3NCb29rKCkge1xuICAgICAgICAgICAgUmVzb3VyY2VzTWFuYWdlci5sb2FkQ2xhc3Nlc0FuZEFwcGx5KFsnUHlkaW9Gb3JtJywgJ1B5ZGlvQ29tcG9uZW50cyddLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcHlkaW8uVUkub3BlbkNvbXBvbmVudEluTW9kYWwoJ1VzZXJBY2NvdW50JywgJ01vZGFsQWRkcmVzc0Jvb2snKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4iLCIvKlxuICogQ29weXJpZ2h0IDIwMDctMjAxNyBDaGFybGVzIGR1IEpldSAtIEFic3RyaXVtIFNBUyA8dGVhbSAoYXQpIHB5ZC5pbz5cbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFB5ZGlvLlxuICpcbiAqIFB5ZGlvIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogUHlkaW8gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggUHlkaW8uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVGhlIGxhdGVzdCBjb2RlIGNhbiBiZSBmb3VuZCBhdCA8aHR0cHM6Ly9weWRpby5jb20+LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbnZhciBYTUxVdGlscyA9IHJlcXVpcmUoJ3B5ZGlvL3V0aWwveG1sJyk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHtcblxuICAgIGdldEFjY291bnRUYWJzOiBmdW5jdGlvbiBnZXRBY2NvdW50VGFicyhweWRpbykge1xuXG4gICAgICAgIHJldHVybiBYTUxVdGlscy5YUGF0aFNlbGVjdE5vZGVzKHB5ZGlvLmdldFhtbFJlZ2lzdHJ5KCksICdjbGllbnRfY29uZmlncy9jb21wb25lbnRfY29uZmlnW0Bjb21wb25lbnQ9XCJVc2VyQWNjb3VudFRhYnNcIl0vYWRkaXRpb25hbF90YWInKS5tYXAoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQ6IG5vZGUuZ2V0QXR0cmlidXRlKFwiaWRcIiksXG4gICAgICAgICAgICAgICAgdGFiSW5mbzogSlNPTi5wYXJzZShub2RlLmdldEF0dHJpYnV0ZSgndGFiSW5mbycpKSxcbiAgICAgICAgICAgICAgICBwYW5lSW5mbzogSlNPTi5wYXJzZShub2RlLmdldEF0dHJpYnV0ZSgncGFuZUluZm8nKSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxufTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuIiwiLypcbiAqIENvcHlyaWdodCAyMDA3LTIwMTcgQ2hhcmxlcyBkdSBKZXUgLSBBYnN0cml1bSBTQVMgPHRlYW0gKGF0KSBweWQuaW8+XG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBQeWRpby5cbiAqXG4gKiBQeWRpbyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFB5ZGlvIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIFB5ZGlvLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICpcbiAqIFRoZSBsYXRlc3QgY29kZSBjYW4gYmUgZm91bmQgYXQgPGh0dHBzOi8vcHlkaW8uY29tPi5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGRlc2MgPSBwYXJlbnQgPSB1bmRlZmluZWQ7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBDb21wb25lbnQgPSBfcmVxdWlyZS5Db21wb25lbnQ7XG52YXIgUHJvcFR5cGVzID0gX3JlcXVpcmUuUHJvcFR5cGVzO1xuXG52YXIgX3JlcXVpcmUyID0gcmVxdWlyZSgnbWF0ZXJpYWwtdWknKTtcblxudmFyIFRvZ2dsZSA9IF9yZXF1aXJlMi5Ub2dnbGU7XG52YXIgU3ViaGVhZGVyID0gX3JlcXVpcmUyLlN1YmhlYWRlcjtcbnZhciBNZW51SXRlbSA9IF9yZXF1aXJlMi5NZW51SXRlbTtcbnZhciBTZWxlY3RGaWVsZCA9IF9yZXF1aXJlMi5TZWxlY3RGaWVsZDtcbnZhciBUZXh0RmllbGQgPSBfcmVxdWlyZTIuVGV4dEZpZWxkO1xudmFyIFRpbWVQaWNrZXIgPSBfcmVxdWlyZTIuVGltZVBpY2tlcjtcblxudmFyIEVtYWlsUGFuZWwgPSAoZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoRW1haWxQYW5lbCwgX0NvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBFbWFpbFBhbmVsKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRW1haWxQYW5lbCk7XG5cbiAgICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoRW1haWxQYW5lbC5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhFbWFpbFBhbmVsLCBbe1xuICAgICAgICBrZXk6ICdvbkNoYW5nZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNoYW5nZShwYXJ0aWFsVmFsdWVzKSB7XG4gICAgICAgICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBfcHJvcHMudmFsdWVzO1xuICAgICAgICAgICAgdmFyIG9uQ2hhbmdlID0gX3Byb3BzLm9uQ2hhbmdlO1xuXG4gICAgICAgICAgICBvbkNoYW5nZShfZXh0ZW5kcyh7fSwgdmFsdWVzLCBwYXJ0aWFsVmFsdWVzKSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ29uRnJlcXVlbmN5Q2hhbmdlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uRnJlcXVlbmN5Q2hhbmdlKHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcGFydGlhbCA9IHsgTk9USUZJQ0FUSU9OU19FTUFJTF9GUkVRVUVOQ1k6IHZhbHVlIH07XG4gICAgICAgICAgICB2YXIgbmV3VXNlclZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgICAgICAgICBuZXdVc2VyVmFsdWUgPSAnNSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0gnOlxuICAgICAgICAgICAgICAgICAgICBuZXdVc2VyVmFsdWUgPSAnMic7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0QxJzpcbiAgICAgICAgICAgICAgICAgICAgbmV3VXNlclZhbHVlID0gJzAzJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRDInOlxuICAgICAgICAgICAgICAgICAgICBuZXdVc2VyVmFsdWUgPSAnMDksMTQnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdXMSc6XG4gICAgICAgICAgICAgICAgICAgIG5ld1VzZXJWYWx1ZSA9ICdNb25kYXknO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcnRpYWwuTk9USUZJQ0FUSU9OU19FTUFJTF9GUkVRVUVOQ1lfVVNFUiA9IG5ld1VzZXJWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UocGFydGlhbCk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ29uUGlja0RhdGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gb25QaWNrRGF0ZShwb3NpdGlvbiwgZXZlbnQsIGRhdGUpIHtcbiAgICAgICAgICAgIHZhciBOT1RJRklDQVRJT05TX0VNQUlMX0ZSRVFVRU5DWV9VU0VSID0gdGhpcy5wcm9wcy52YWx1ZXMuTk9USUZJQ0FUSU9OU19FTUFJTF9GUkVRVUVOQ1lfVVNFUjtcblxuICAgICAgICAgICAgdmFyIGhvdXJzID0gTk9USUZJQ0FUSU9OU19FTUFJTF9GUkVRVUVOQ1lfVVNFUi5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgdmFyIG5ld0hvdXJzID0gW107XG4gICAgICAgICAgICBpZiAocG9zaXRpb24gPT09ICdmaXJzdCcpIG5ld0hvdXJzID0gW2RhdGUuZ2V0SG91cnMoKSwgaG91cnNbMV0gPyBob3Vyc1sxXSA6ICcwMCddO1xuICAgICAgICAgICAgaWYgKHBvc2l0aW9uID09PSAnbGFzdCcpIG5ld0hvdXJzID0gW2hvdXJzWzBdID8gaG91cnNbMF0gOiAnMDAnLCBkYXRlLmdldEhvdXJzKCldO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh7IE5PVElGSUNBVElPTlNfRU1BSUxfRlJFUVVFTkNZX1VTRVI6IG5ld0hvdXJzLmpvaW4oJywnKSB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcztcbiAgICAgICAgICAgIHZhciBkZWZpbml0aW9ucyA9IF9wcm9wczIuZGVmaW5pdGlvbnM7XG4gICAgICAgICAgICB2YXIgdmFsdWVzID0gX3Byb3BzMi52YWx1ZXM7XG4gICAgICAgICAgICB2YXIgcHlkaW8gPSBfcHJvcHMyLnB5ZGlvO1xuXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGZ1bmN0aW9uIG1lc3NhZ2UoaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHlkaW8uTWVzc2FnZUhhc2hbJ3VzZXJfZGFzaC4nICsgaWRdO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBOT1RJRklDQVRJT05TX0VNQUlMX0dFVCA9IHZhbHVlcy5OT1RJRklDQVRJT05TX0VNQUlMX0dFVDtcbiAgICAgICAgICAgIHZhciBOT1RJRklDQVRJT05TX0VNQUlMX0ZSRVFVRU5DWSA9IHZhbHVlcy5OT1RJRklDQVRJT05TX0VNQUlMX0ZSRVFVRU5DWTtcbiAgICAgICAgICAgIHZhciBOT1RJRklDQVRJT05TX0VNQUlMX0ZSRVFVRU5DWV9VU0VSID0gdmFsdWVzLk5PVElGSUNBVElPTlNfRU1BSUxfRlJFUVVFTkNZX1VTRVI7XG4gICAgICAgICAgICB2YXIgTk9USUZJQ0FUSU9OU19FTUFJTCA9IHZhbHVlcy5OT1RJRklDQVRJT05TX0VNQUlMO1xuICAgICAgICAgICAgdmFyIE5PVElGSUNBVElPTlNfRU1BSUxfU0VORF9IVE1MID0gdmFsdWVzLk5PVElGSUNBVElPTlNfRU1BSUxfU0VORF9IVE1MO1xuXG4gICAgICAgICAgICB2YXIgbWFpbEFjdGl2ZSA9IE5PVElGSUNBVElPTlNfRU1BSUxfR0VUID09PSAndHJ1ZSc7XG4gICAgICAgICAgICB2YXIgZnJlcXVlbmN5VHlwZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICB2YXIgZnJlcXVlbmN5TWVudXMgPSBbXTtcbiAgICAgICAgICAgIGRlZmluaXRpb25zWzFdWydjaG9pY2VzJ10uc3BsaXQoJywnKS5tYXAoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZCA9IGUuc3BsaXQoJ3wnKTtcbiAgICAgICAgICAgICAgICBmcmVxdWVuY3lUeXBlcy5zZXQoZFswXSwgZFsxXSk7XG4gICAgICAgICAgICAgICAgZnJlcXVlbmN5TWVudXMucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KE1lbnVJdGVtLCB7IHByaW1hcnlUZXh0OiBkWzFdLCB2YWx1ZTogZFswXSB9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciB1c2VyRnJlcXVlbmN5Q29tcG9uZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKG1haWxBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKE5PVElGSUNBVElPTlNfRU1BSUxfRlJFUVVFTkNZKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdIJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJGcmVxdWVuY3lDb21wb25lbnQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRGaWVsZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbG9hdGluZ0xhYmVsVGV4dDogTk9USUZJQ0FUSU9OU19FTUFJTF9GUkVRVUVOQ1kgPT09ICdNJyA/IG1lc3NhZ2UoNjIpIDogbWVzc2FnZSg2MyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IE5PVElGSUNBVElPTlNfRU1BSUxfRlJFUVVFTkNZX1VTRVIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChlLCB2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9uQ2hhbmdlKHsgTk9USUZJQ0FUSU9OU19FTUFJTF9GUkVRVUVOQ1lfVVNFUjogdiB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdEMSc6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkLnNldEhvdXJzKE5PVElGSUNBVElPTlNfRU1BSUxfRlJFUVVFTkNZX1VTRVIpO2Quc2V0TWludXRlcygwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJGcmVxdWVuY3lDb21wb25lbnQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFRpbWVQaWNrZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICdhbXBtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaW50VGV4dDogbWVzc2FnZSg2NCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChlLCBkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9uQ2hhbmdlKHsgTk9USUZJQ0FUSU9OU19FTUFJTF9GUkVRVUVOQ1lfVVNFUjogZGF0ZS5nZXRIb3VycygpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b09rOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRGaWVsZFN0eWxlOiB7IHdpZHRoOiAnMTAwJScgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnRDInOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhvdXJzID0gTk9USUZJQ0FUSU9OU19FTUFJTF9GUkVRVUVOQ1lfVVNFUiArICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFob3VycykgaG91cnMgPSAnMDksMTQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgaG91cnMgPSBob3Vycy5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGQxID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkMiA9IG5ldyBEYXRlKCk7ZDIuc2V0TWludXRlcygwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQxLnNldEhvdXJzKGhvdXJzWzBdKTtkMS5zZXRNaW51dGVzKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhvdXJzWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZDIuc2V0SG91cnMoaG91cnNbMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlckZyZXF1ZW5jeUNvbXBvbmVudCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGltZVBpY2tlciwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICdhbXBtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGludFRleHQ6IG1lc3NhZ2UoNjUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uUGlja0RhdGUuYmluZCh0aGlzLCAnZmlyc3QnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEZpZWxkU3R5bGU6IHsgd2lkdGg6IDEwMCwgbWFyZ2luUmlnaHQ6IDUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGltZVBpY2tlciwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICdhbXBtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGludFRleHQ6IG1lc3NhZ2UoNjYpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZDIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uUGlja0RhdGUuYmluZCh0aGlzLCAnbGFzdCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RmllbGRTdHlsZTogeyB3aWR0aDogMTAwLCBtYXJnaW5MZWZ0OiA1IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdXMSc6XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyRnJlcXVlbmN5Q29tcG9uZW50ID0gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZWxlY3RGaWVsZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0OiBtZXNzYWdlKDY3KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogTk9USUZJQ0FUSU9OU19FTUFJTF9GUkVRVUVOQ1lfVVNFUixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChlLCBpLCB2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vbkNoYW5nZSh7IE5PVElGSUNBVElPTlNfRU1BSUxfRlJFUVVFTkNZX1VTRVI6IHYgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVudUl0ZW0sIHsgcHJpbWFyeVRleHQ6IG1lc3NhZ2UoNjgpLCB2YWx1ZTogJ01vbmRheScgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNZW51SXRlbSwgeyBwcmltYXJ5VGV4dDogbWVzc2FnZSg2OSksIHZhbHVlOiAnVHVlc2RheScgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNZW51SXRlbSwgeyBwcmltYXJ5VGV4dDogbWVzc2FnZSg3MCksIHZhbHVlOiAnV2VkbmVzZGF5JyB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1lbnVJdGVtLCB7IHByaW1hcnlUZXh0OiBtZXNzYWdlKDcxKSwgdmFsdWU6ICdUaHVyc2RheScgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNZW51SXRlbSwgeyBwcmltYXJ5VGV4dDogbWVzc2FnZSg3MiksIHZhbHVlOiAnRnJpZGF5JyB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1lbnVJdGVtLCB7IHByaW1hcnlUZXh0OiBtZXNzYWdlKDczKSwgdmFsdWU6ICdTYXR1cmRheScgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNZW51SXRlbSwgeyBwcmltYXJ5VGV4dDogbWVzc2FnZSg3NCksIHZhbHVlOiAnU3VuZGF5JyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICBTdWJoZWFkZXIsXG4gICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgcGFkZGluZ0xlZnQ6IDIwIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSg2MSlcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IHBhZGRpbmc6ICcwIDIwcHggMjBweCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRvZ2dsZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGRlZmluaXRpb25zWzBdWydsYWJlbCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlZDogTk9USUZJQ0FUSU9OU19FTUFJTF9HRVQgPT09ICd0cnVlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVG9nZ2xlOiBmdW5jdGlvbiAoZSwgdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9uQ2hhbmdlKHsgTk9USUZJQ0FUSU9OU19FTUFJTF9HRVQ6IHYgPyAndHJ1ZScgOiAnZmFsc2UnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgbWFpbEFjdGl2ZSAmJiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IHBhZGRpbmdCb3R0b206IDE2IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogeyBwYWRkaW5nOiAnMTZweCAwJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUb2dnbGUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGRlZmluaXRpb25zWzRdWydsYWJlbCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVkOiBOT1RJRklDQVRJT05TX0VNQUlMX1NFTkRfSFRNTCA9PT0gJ3RydWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblRvZ2dsZTogZnVuY3Rpb24gKGUsIHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9uQ2hhbmdlKHsgTk9USUZJQ0FUSU9OU19FTUFJTF9TRU5EX0hUTUw6IHYgPyAndHJ1ZScgOiAnZmFsc2UnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdEZpZWxkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbG9hdGluZ0xhYmVsVGV4dDogZGVmaW5pdGlvbnNbMV1bJ2xhYmVsJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBOT1RJRklDQVRJT05TX0VNQUlMX0ZSRVFVRU5DWSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChlLCBrLCBwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vbkZyZXF1ZW5jeUNoYW5nZShwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5TWVudXNcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyRnJlcXVlbmN5Q29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEVtYWlsUGFuZWw7XG59KShDb21wb25lbnQpO1xuXG5FbWFpbFBhbmVsLnByb3BUeXBlcyA9IHtcblxuICAgIGRlZmluaXRpb25zOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHZhbHVlczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmNcblxufTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gRW1haWxQYW5lbDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuIiwiLypcbiAqIENvcHlyaWdodCAyMDA3LTIwMTcgQ2hhcmxlcyBkdSBKZXUgLSBBYnN0cml1bSBTQVMgPHRlYW0gKGF0KSBweWQuaW8+XG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBQeWRpby5cbiAqXG4gKiBQeWRpbyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFB5ZGlvIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIFB5ZGlvLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICpcbiAqIFRoZSBsYXRlc3QgY29kZSBjYW4gYmUgZm91bmQgYXQgPGh0dHBzOi8vcHlkaW8uY29tPi5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUHlkaW8gPSByZXF1aXJlKCdweWRpbycpO1xuXG52YXIgX1B5ZGlvJHJlcXVpcmVMaWIgPSBQeWRpby5yZXF1aXJlTGliKCdib290Jyk7XG5cbnZhciBBY3Rpb25EaWFsb2dNaXhpbiA9IF9QeWRpbyRyZXF1aXJlTGliLkFjdGlvbkRpYWxvZ01peGluO1xuXG52YXIgX1B5ZGlvJHJlcXVpcmVMaWIyID0gUHlkaW8ucmVxdWlyZUxpYignY29tcG9uZW50cycpO1xuXG52YXIgTW9kYWxBcHBCYXIgPSBfUHlkaW8kcmVxdWlyZUxpYjIuTW9kYWxBcHBCYXI7XG52YXIgQWRkcmVzc0Jvb2sgPSBfUHlkaW8kcmVxdWlyZUxpYjIuQWRkcmVzc0Jvb2s7XG5cbnZhciBNb2RhbEFkZHJlc3NCb29rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnTW9kYWxBZGRyZXNzQm9vaycsXG5cbiAgICBtaXhpbnM6IFtBY3Rpb25EaWFsb2dNaXhpbl0sXG5cbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpYWxvZ1RpdGxlOiAnJyxcbiAgICAgICAgICAgIGRpYWxvZ1NpemU6ICd4bCcsXG4gICAgICAgICAgICBkaWFsb2dQYWRkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIGRpYWxvZ0lzTW9kYWw6IGZhbHNlLFxuICAgICAgICAgICAgZGlhbG9nU2Nyb2xsQm9keTogdHJ1ZVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBzdWJtaXQ6IGZ1bmN0aW9uIHN1Ym1pdCgpIHtcbiAgICAgICAgdGhpcy5kaXNtaXNzKCk7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICB7IHN0eWxlOiB7IHdpZHRoOiAnMTAwJScsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicgfSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbEFwcEJhciwge1xuICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnB5ZGlvLk1lc3NhZ2VIYXNoWyd1c2VyX2Rhc2guMSddLFxuICAgICAgICAgICAgICAgIHNob3dNZW51SWNvbkJ1dHRvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgaWNvbkNsYXNzTmFtZVJpZ2h0OiAnbWRpIG1kaS1jbG9zZScsXG4gICAgICAgICAgICAgICAgb25SaWdodEljb25CdXR0b25Ub3VjaFRhcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5kaXNtaXNzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEFkZHJlc3NCb29rLCBfZXh0ZW5kcyh7XG4gICAgICAgICAgICAgICAgbW9kZTogJ2Jvb2snXG4gICAgICAgICAgICB9LCB0aGlzLnByb3BzLCB7XG4gICAgICAgICAgICAgICAgc3R5bGU6IHsgd2lkdGg6ICcxMDAlJywgZmxleEdyb3c6IDEsIGhlaWdodDogJ2F1dG8nIH1cbiAgICAgICAgICAgIH0pKVxuICAgICAgICApO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IE1vZGFsQWRkcmVzc0Jvb2s7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbiIsIi8qXG4gKiBDb3B5cmlnaHQgMjAwNy0yMDE3IENoYXJsZXMgZHUgSmV1IC0gQWJzdHJpdW0gU0FTIDx0ZWFtIChhdCkgcHlkLmlvPlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgUHlkaW8uXG4gKlxuICogUHlkaW8gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBQeWRpbyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBQeWRpby4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqXG4gKiBUaGUgbGF0ZXN0IGNvZGUgY2FuIGJlIGZvdW5kIGF0IDxodHRwczovL3B5ZGlvLmNvbT4uXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfUHJvZmlsZVBhbmUgPSByZXF1aXJlKCcuL1Byb2ZpbGVQYW5lJyk7XG5cbnZhciBfUHJvZmlsZVBhbmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUHJvZmlsZVBhbmUpO1xuXG52YXIgX0NvbXBvbmVudENvbmZpZ1BhcnNlciA9IHJlcXVpcmUoJy4vQ29tcG9uZW50Q29uZmlnUGFyc2VyJyk7XG5cbnZhciBfQ29tcG9uZW50Q29uZmlnUGFyc2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbXBvbmVudENvbmZpZ1BhcnNlcik7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUHlkaW8gPSByZXF1aXJlKCdweWRpbycpO1xuXG52YXIgX1B5ZGlvJHJlcXVpcmVMaWIgPSBQeWRpby5yZXF1aXJlTGliKCdib290Jyk7XG5cbnZhciBBY3Rpb25EaWFsb2dNaXhpbiA9IF9QeWRpbyRyZXF1aXJlTGliLkFjdGlvbkRpYWxvZ01peGluO1xudmFyIFN1Ym1pdEJ1dHRvblByb3ZpZGVyTWl4aW4gPSBfUHlkaW8kcmVxdWlyZUxpYi5TdWJtaXRCdXR0b25Qcm92aWRlck1peGluO1xudmFyIEFzeW5jQ29tcG9uZW50ID0gX1B5ZGlvJHJlcXVpcmVMaWIuQXN5bmNDb21wb25lbnQ7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJ21hdGVyaWFsLXVpJyk7XG5cbnZhciBUYWJzID0gX3JlcXVpcmUuVGFicztcbnZhciBUYWIgPSBfcmVxdWlyZS5UYWI7XG52YXIgRm9udEljb24gPSBfcmVxdWlyZS5Gb250SWNvbjtcbnZhciBGbGF0QnV0dG9uID0gX3JlcXVpcmUuRmxhdEJ1dHRvbjtcblxudmFyIE1vZGFsRGFzaGJvYXJkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnTW9kYWxEYXNoYm9hcmQnLFxuXG4gICAgbWl4aW5zOiBbQWN0aW9uRGlhbG9nTWl4aW4sIFN1Ym1pdEJ1dHRvblByb3ZpZGVyTWl4aW5dLFxuXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaWFsb2dUaXRsZTogJycsXG4gICAgICAgICAgICBkaWFsb2dTaXplOiAnbWQnLFxuICAgICAgICAgICAgZGlhbG9nUGFkZGluZzogZmFsc2UsXG4gICAgICAgICAgICBkaWFsb2dJc01vZGFsOiBmYWxzZSxcbiAgICAgICAgICAgIGRpYWxvZ1Njcm9sbEJvZHk6IGZhbHNlXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIHN1Ym1pdDogZnVuY3Rpb24gc3VibWl0KCkge1xuICAgICAgICB0aGlzLmRpc21pc3MoKTtcbiAgICB9LFxuXG4gICAgZ2V0RGVmYXVsdEJ1dHRvbnM6IGZ1bmN0aW9uIGdldERlZmF1bHRCdXR0b25zKCkge1xuICAgICAgICByZXR1cm4gW1JlYWN0LmNyZWF0ZUVsZW1lbnQoRmxhdEJ1dHRvbiwgeyBsYWJlbDogdGhpcy5wcm9wcy5weWRpby5NZXNzYWdlSGFzaFs4Nl0sIG9uVG91Y2hUYXA6IHRoaXMucHJvcHMub25EaXNtaXNzIH0pXTtcbiAgICB9LFxuXG4gICAgZ2V0QnV0dG9uczogZnVuY3Rpb24gZ2V0QnV0dG9ucyh1cGRhdGVyKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZXIgPSB1cGRhdGVyO1xuICAgICAgICBpZiAodGhpcy5yZWZzWydwcm9maWxlJ10pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZnNbJ3Byb2ZpbGUnXS5nZXRCdXR0b25zKHRoaXMuX3VwZGF0ZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGVmYXVsdEJ1dHRvbnMoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvblRhYkNoYW5nZTogZnVuY3Rpb24gb25UYWJDaGFuZ2UodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLl91cGRhdGVyKSByZXR1cm47XG4gICAgICAgIGlmICh2YWx1ZSAmJiB0aGlzLnJlZnNbdmFsdWVdICYmIHRoaXMucmVmc1t2YWx1ZV0uZ2V0QnV0dG9ucykge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlcih0aGlzLnJlZnNbdmFsdWVdLmdldEJ1dHRvbnModGhpcy5fdXBkYXRlcikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlcih0aGlzLmdldERlZmF1bHRCdXR0b25zKCkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuXG4gICAgICAgIHZhciBidXR0b25TdHlsZSA9IHtcbiAgICAgICAgICAgIHRleHRUcmFuc2Zvcm06ICdub25lJ1xuICAgICAgICB9O1xuICAgICAgICB2YXIgdGFicyA9IFtSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgVGFiLFxuICAgICAgICAgICAgeyBrZXk6ICdhY2NvdW50JywgbGFiZWw6IHRoaXMucHJvcHMucHlkaW8uTWVzc2FnZUhhc2hbJ3VzZXJfZGFzaC40MyddLCBpY29uOiBSZWFjdC5jcmVhdGVFbGVtZW50KEZvbnRJY29uLCB7IGNsYXNzTmFtZTogJ21kaSBtZGktYWNjb3VudCcgfSksIGJ1dHRvblN0eWxlOiBidXR0b25TdHlsZSwgdmFsdWU6ICdwcm9maWxlJyB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChfUHJvZmlsZVBhbmUyWydkZWZhdWx0J10sIF9leHRlbmRzKHt9LCB0aGlzLnByb3BzLCB7IHJlZjogJ3Byb2ZpbGUnIH0pKVxuICAgICAgICApXTtcblxuICAgICAgICBfQ29tcG9uZW50Q29uZmlnUGFyc2VyMlsnZGVmYXVsdCddLmdldEFjY291bnRUYWJzKHRoaXMucHJvcHMucHlkaW8pLm1hcCgoZnVuY3Rpb24gKHRhYikge1xuICAgICAgICAgICAgdGFicy5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgVGFiLFxuICAgICAgICAgICAgICAgIHsga2V5OiB0YWIuaWQsIGxhYmVsOiB0aGlzLnByb3BzLnB5ZGlvLk1lc3NhZ2VIYXNoW3RhYi50YWJJbmZvLmxhYmVsXSwgaWNvbjogUmVhY3QuY3JlYXRlRWxlbWVudChGb250SWNvbiwgeyBjbGFzc05hbWU6IHRhYi50YWJJbmZvLmljb24gfSksIGJ1dHRvblN0eWxlOiBidXR0b25TdHlsZSwgdmFsdWU6IHRhYi5pZCB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQXN5bmNDb21wb25lbnQsIF9leHRlbmRzKHtcbiAgICAgICAgICAgICAgICAgICAgcmVmOiB0YWIuaWRcbiAgICAgICAgICAgICAgICB9LCB0aGlzLnByb3BzLCB0YWIucGFuZUluZm8pKVxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH0pLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgVGFicyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCB3aWR0aDogJzEwMCUnIH0sXG4gICAgICAgICAgICAgICAgdGFiSXRlbUNvbnRhaW5lclN0eWxlOiB7IG1pbkhlaWdodDogNzIgfSxcbiAgICAgICAgICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU6IHsgb3ZlcmZsb3dZOiAnYXV0bycsIG1pbkhlaWdodDogMzUwIH0sXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25UYWJDaGFuZ2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWJzXG4gICAgICAgICk7XG4gICAgfVxuXG59KTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gTW9kYWxEYXNoYm9hcmQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbiIsIi8qXG4gKiBDb3B5cmlnaHQgMjAwNy0yMDE3IENoYXJsZXMgZHUgSmV1IC0gQWJzdHJpdW0gU0FTIDx0ZWFtIChhdCkgcHlkLmlvPlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgUHlkaW8uXG4gKlxuICogUHlkaW8gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBQeWRpbyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBQeWRpby4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqXG4gKiBUaGUgbGF0ZXN0IGNvZGUgY2FuIGJlIGZvdW5kIGF0IDxodHRwczovL3B5ZGlvLmNvbT4uXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBQeWRpbyA9IHJlcXVpcmUoJ3B5ZGlvJyk7XG5cbnZhciBfUHlkaW8kcmVxdWlyZUxpYiA9IFB5ZGlvLnJlcXVpcmVMaWIoJ2Jvb3QnKTtcblxudmFyIEFjdGlvbkRpYWxvZ01peGluID0gX1B5ZGlvJHJlcXVpcmVMaWIuQWN0aW9uRGlhbG9nTWl4aW47XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJ21hdGVyaWFsLXVpJyk7XG5cbnZhciBBcHBCYXIgPSBfcmVxdWlyZS5BcHBCYXI7XG5cbnZhciBfUHlkaW8kcmVxdWlyZUxpYjIgPSBQeWRpby5yZXF1aXJlTGliKCdmb3JtJyk7XG5cbnZhciBWYWxpZFBhc3N3b3JkID0gX1B5ZGlvJHJlcXVpcmVMaWIyLlZhbGlkUGFzc3dvcmQ7XG5cbnZhciBQYXNzd29yZEZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdQYXNzd29yZEZvcm0nLFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7IGVycm9yOiBudWxsLCBvbGQ6ICcnLCBuZXdQYXNzOiAnJyB9O1xuICAgIH0sXG5cbiAgICBnZXRNZXNzYWdlOiBmdW5jdGlvbiBnZXRNZXNzYWdlKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnB5ZGlvLk1lc3NhZ2VIYXNoW2lkXTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUodmFsdWUsIGZpZWxkKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIG5ld1N0YXR1cyA9IHt9O1xuICAgICAgICBuZXdTdGF0dXNbZmllbGRdID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdHVzLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gX3RoaXMudmFsaWRhdGUoKTtcbiAgICAgICAgICAgIGlmIChfdGhpcy5wcm9wcy5vblZhbGlkU3RhdHVzQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucHJvcHMub25WYWxpZFN0YXR1c0NoYW5nZShzdGF0dXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgdmFsaWRhdGU6IGZ1bmN0aW9uIHZhbGlkYXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMucmVmcy5uZXdwYXNzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICB2YXIgb2xkUGFzcyA9IF9zdGF0ZS5vbGRQYXNzO1xuICAgICAgICB2YXIgbmV3UGFzcyA9IF9zdGF0ZS5uZXdQYXNzO1xuXG4gICAgICAgIGlmICghb2xkUGFzcyB8fCAhbmV3UGFzcykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGVycm9yOiB0aGlzLmdldE1lc3NhZ2UoMjM5KSB9KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3UGFzcy5sZW5ndGggPCBwYXJzZUludCh0aGlzLnByb3BzLnB5ZGlvLmdldFBsdWdpbkNvbmZpZ3MoXCJjb3JlLmF1dGhcIikuZ2V0KFwiUEFTU1dPUkRfTUlOTEVOR1RIXCIpKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGVycm9yOiB0aGlzLmdldE1lc3NhZ2UoMzc4KSB9KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZXJyb3I6IG51bGwgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBwb3N0OiBmdW5jdGlvbiBwb3N0KGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBfc3RhdGUyID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgdmFyIG9sZFBhc3MgPSBfc3RhdGUyLm9sZFBhc3M7XG4gICAgICAgIHZhciBuZXdQYXNzID0gX3N0YXRlMi5uZXdQYXNzO1xuXG4gICAgICAgIHZhciBsb2dvdXRTdHJpbmcgPSAnJztcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucHlkaW8udXNlci5sb2NrKSB7XG4gICAgICAgICAgICBsb2dvdXRTdHJpbmcgPSAnICcgKyB0aGlzLmdldE1lc3NhZ2UoNDQ1KTtcbiAgICAgICAgfVxuICAgICAgICBQeWRpb0FwaS5nZXRDbGllbnQoKS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIGdldF9hY3Rpb246ICdwYXNzX2NoYW5nZScsXG4gICAgICAgICAgICBvbGRfcGFzczogb2xkUGFzcyxcbiAgICAgICAgICAgIG5ld19wYXNzOiBuZXdQYXNzLFxuICAgICAgICAgICAgcGFzc19zZWVkOiAnLTEnXG4gICAgICAgIH0sIChmdW5jdGlvbiAodHJhbnNwb3J0KSB7XG5cbiAgICAgICAgICAgIGlmICh0cmFuc3BvcnQucmVzcG9uc2VUZXh0ID09PSAnUEFTU19FUlJPUicpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBlcnJvcjogdGhpcy5nZXRNZXNzYWdlKDI0MCkgfSk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0cmFuc3BvcnQucmVzcG9uc2VUZXh0ID09PSAnU1VDQ0VTUycpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucHlkaW8uZGlzcGxheU1lc3NhZ2UoJ1NVQ0NFU1MnLCB0aGlzLmdldE1lc3NhZ2UoMTk3KSArIGxvZ291dFN0cmluZyk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodHJ1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKGxvZ291dFN0cmluZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnB5ZGlvLmdldENvbnRyb2xsZXIoKS5maXJlQWN0aW9uKCdsb2dvdXQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmJpbmQodGhpcykpO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgdmFyIG1lc3NhZ2VzID0gdGhpcy5wcm9wcy5weWRpby5NZXNzYWdlSGFzaDtcbiAgICAgICAgdmFyIGxlZ2VuZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZXJyb3IpIHtcbiAgICAgICAgICAgIGxlZ2VuZCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdlcnJvcicgfSxcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmVycm9yXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMucHlkaW8udXNlci5sb2NrKSB7XG4gICAgICAgICAgICBsZWdlbmQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXNbNDQ0XVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb2xkQ2hhbmdlID0gZnVuY3Rpb24gb2xkQ2hhbmdlKGV2ZW50LCBuZXdWKSB7XG4gICAgICAgICAgICBfdGhpczIudXBkYXRlKG5ld1YsICdvbGRQYXNzJyk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBuZXdDaGFuZ2UgPSBmdW5jdGlvbiBuZXdDaGFuZ2UobmV3Viwgb2xkVikge1xuICAgICAgICAgICAgX3RoaXMyLnVwZGF0ZShuZXdWLCAnbmV3UGFzcycpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgeyBzdHlsZTogdGhpcy5wcm9wcy5zdHlsZSB9LFxuICAgICAgICAgICAgbGVnZW5kLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdmb3JtJyxcbiAgICAgICAgICAgICAgICAgICAgeyBhdXRvQ29tcGxldGU6ICdvZmYnIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWF0ZXJpYWxVSS5UZXh0RmllbGQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBvbGRDaGFuZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGFzc3dvcmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUub2xkUGFzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogJ29sZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBmbG9hdGluZ0xhYmVsVGV4dDogbWVzc2FnZXNbMjM3XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9Db21wbGV0ZTogJ29mZidcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IHdpZHRoOiAyNTAgfSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVmFsaWRQYXNzd29yZCwge1xuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogbmV3Q2hhbmdlLFxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7IG5hbWU6ICdwYXNzJywgbGFiZWw6IG1lc3NhZ2VzWzE5OF0gfSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUubmV3UGFzcyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ25ld3Bhc3N3b3JkJyxcbiAgICAgICAgICAgICAgICAgICAgcmVmOiAnbmV3cGFzcydcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFBhc3N3b3JkRm9ybTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuIiwiLypcbiAqIENvcHlyaWdodCAyMDA3LTIwMTcgQ2hhcmxlcyBkdSBKZXUgLSBBYnN0cml1bSBTQVMgPHRlYW0gKGF0KSBweWQuaW8+XG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBQeWRpby5cbiAqXG4gKiBQeWRpbyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFB5ZGlvIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIFB5ZGlvLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICpcbiAqIFRoZSBsYXRlc3QgY29kZSBjYW4gYmUgZm91bmQgYXQgPGh0dHBzOi8vcHlkaW8uY29tPi5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGRlc2MgPSBwYXJlbnQgPSB1bmRlZmluZWQ7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9QYXNzd29yZEZvcm0gPSByZXF1aXJlKCcuL1Bhc3N3b3JkRm9ybScpO1xuXG52YXIgX1Bhc3N3b3JkRm9ybTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9QYXNzd29yZEZvcm0pO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCdtYXRlcmlhbC11aScpO1xuXG52YXIgRmxhdEJ1dHRvbiA9IF9yZXF1aXJlLkZsYXRCdXR0b247XG52YXIgUmFpc2VkQnV0dG9uID0gX3JlcXVpcmUuUmFpc2VkQnV0dG9uO1xudmFyIFBvcG92ZXIgPSBfcmVxdWlyZS5Qb3BvdmVyO1xudmFyIERpdmlkZXIgPSBfcmVxdWlyZS5EaXZpZGVyO1xuXG52YXIgUHlkaW8gPSByZXF1aXJlKCdweWRpbycpO1xuXG52YXIgUGFzc3dvcmRQb3BvdmVyID0gKGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKFBhc3N3b3JkUG9wb3ZlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBQYXNzd29yZFBvcG92ZXIocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFBhc3N3b3JkUG9wb3Zlcik7XG5cbiAgICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoUGFzc3dvcmRQb3BvdmVyLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpO1xuICAgICAgICB0aGlzLnN0YXRlID0geyBwYXNzT3BlbjogZmFsc2UsIHBhc3NWYWxpZDogZmFsc2UsIHBhc3NBbmNob3I6IG51bGwgfTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoUGFzc3dvcmRQb3BvdmVyLCBbe1xuICAgICAgICBrZXk6ICdwYXNzT3BlblBvcG92ZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcGFzc09wZW5Qb3BvdmVyKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcGFzc09wZW46IHRydWUsIHBhc3NBbmNob3I6IGV2ZW50LmN1cnJlbnRUYXJnZXQgfSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3Bhc3NDbG9zZVBvcG92ZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcGFzc0Nsb3NlUG9wb3ZlcigpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwYXNzT3BlbjogZmFsc2UgfSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3Bhc3NWYWxpZFN0YXR1c0NoYW5nZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwYXNzVmFsaWRTdGF0dXNDaGFuZ2Uoc3RhdHVzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcGFzc1ZhbGlkOiBzdGF0dXMgfSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3Bhc3NTdWJtaXQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcGFzc1N1Ym1pdCgpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcy5wYXNzd29yZEZvcm0ucG9zdCgoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB0aGlzLnBhc3NDbG9zZVBvcG92ZXIoKTtcbiAgICAgICAgICAgIH0pLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIHB5ZGlvID0gdGhpcy5wcm9wcy5weWRpbztcbiAgICAgICAgICAgIHZhciBfc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICAgICAgdmFyIHBhc3NPcGVuID0gX3N0YXRlLnBhc3NPcGVuO1xuICAgICAgICAgICAgdmFyIHBhc3NBbmNob3IgPSBfc3RhdGUucGFzc0FuY2hvcjtcbiAgICAgICAgICAgIHZhciBwYXNzVmFsaWQgPSBfc3RhdGUucGFzc1ZhbGlkO1xuXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IG1hcmdpbkxlZnQ6IDggfSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmFpc2VkQnV0dG9uLCB7XG4gICAgICAgICAgICAgICAgICAgIG9uVG91Y2hUYXA6IHRoaXMucGFzc09wZW5Qb3BvdmVyLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBweWRpby5NZXNzYWdlSGFzaFsxOTRdLFxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgUG9wb3ZlcixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlbjogcGFzc09wZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmNob3JFbDogcGFzc0FuY2hvcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuY2hvck9yaWdpbjogeyBob3Jpem9udGFsOiAnbGVmdCcsIHZlcnRpY2FsOiAndG9wJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0T3JpZ2luOiB7IGhvcml6b250YWw6ICdsZWZ0JywgdmVydGljYWw6ICdib3R0b20nIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvblJlcXVlc3RDbG9zZTogdGhpcy5wYXNzQ2xvc2VQb3BvdmVyLmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoX1Bhc3N3b3JkRm9ybTJbJ2RlZmF1bHQnXSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7IHBhZGRpbmc6IDEwLCBiYWNrZ3JvdW5kQ29sb3I6ICcjZmFmYWZhJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB5ZGlvOiBweWRpbyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6ICdwYXNzd29yZEZvcm0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVmFsaWRTdGF0dXNDaGFuZ2U6IHRoaXMucGFzc1ZhbGlkU3RhdHVzQ2hhbmdlLmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEaXZpZGVyLCBudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogeyB0ZXh0QWxpZ246ICdyaWdodCcsIHBhZGRpbmc6ICc4cHggMCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmxhdEJ1dHRvbiwgeyBsYWJlbDogdGhpcy5wcm9wcy5weWRpby5NZXNzYWdlSGFzaFs0OV0sIG9uVG91Y2hUYXA6IHRoaXMucGFzc0Nsb3NlUG9wb3Zlci5iaW5kKHRoaXMpIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmxhdEJ1dHRvbiwgeyBkaXNhYmxlZDogIXBhc3NWYWxpZCwgbGFiZWw6ICdPaycsIG9uVG91Y2hUYXA6IHRoaXMucGFzc1N1Ym1pdC5iaW5kKHRoaXMpIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFBhc3N3b3JkUG9wb3Zlcjtcbn0pKFJlYWN0LkNvbXBvbmVudCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFBhc3N3b3JkUG9wb3Zlcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuIiwiLypcbiAqIENvcHlyaWdodCAyMDA3LTIwMTcgQ2hhcmxlcyBkdSBKZXUgLSBBYnN0cml1bSBTQVMgPHRlYW0gKGF0KSBweWQuaW8+XG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBQeWRpby5cbiAqXG4gKiBQeWRpbyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFB5ZGlvIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIFB5ZGlvLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICpcbiAqIFRoZSBsYXRlc3QgY29kZSBjYW4gYmUgZm91bmQgYXQgPGh0dHBzOi8vcHlkaW8uY29tPi5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9QYXNzd29yZFBvcG92ZXIgPSByZXF1aXJlKCcuL1Bhc3N3b3JkUG9wb3ZlcicpO1xuXG52YXIgX1Bhc3N3b3JkUG9wb3ZlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9QYXNzd29yZFBvcG92ZXIpO1xuXG52YXIgX0VtYWlsUGFuZWwgPSByZXF1aXJlKCcuL0VtYWlsUGFuZWwnKTtcblxudmFyIF9FbWFpbFBhbmVsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0VtYWlsUGFuZWwpO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIExhbmdVdGlscyA9IHJlcXVpcmUoJ3B5ZGlvL3V0aWwvbGFuZycpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCdtYXRlcmlhbC11aScpO1xuXG52YXIgRmxhdEJ1dHRvbiA9IF9yZXF1aXJlLkZsYXRCdXR0b247XG52YXIgRGl2aWRlciA9IF9yZXF1aXJlLkRpdmlkZXI7XG5cbnZhciBQeWRpbyA9IHJlcXVpcmUoJ3B5ZGlvJyk7XG5cbnZhciBfUHlkaW8kcmVxdWlyZUxpYiA9IFB5ZGlvLnJlcXVpcmVMaWIoJ2Zvcm0nKTtcblxudmFyIE1hbmFnZXIgPSBfUHlkaW8kcmVxdWlyZUxpYi5NYW5hZ2VyO1xudmFyIEZvcm1QYW5lbCA9IF9QeWRpbyRyZXF1aXJlTGliLkZvcm1QYW5lbDtcblxudmFyIEZPUk1fQ1NTID0gJyBcXG4ucmVhY3QtbXVpLWNvbnRleHQgLmN1cnJlbnQtdXNlci1lZGl0LnB5ZGlvLWZvcm0tcGFuZWwgPiAucHlkaW8tZm9ybS1ncm91cDpmaXJzdC1vZi10eXBlIHtcXG4gIG1hcmdpbi10b3A6IDIyMHB4O1xcbiAgb3ZlcmZsb3cteTogaGlkZGVuO1xcbn1cXG4ucmVhY3QtbXVpLWNvbnRleHQgLmN1cnJlbnQtdXNlci1lZGl0LnB5ZGlvLWZvcm0tcGFuZWwgPiAucHlkaW8tZm9ybS1ncm91cCBkaXYuZm9ybS1lbnRyeS1pbWFnZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBoZWlnaHQ6IDIwMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VjZWZmMTtcXG59XFxuLnJlYWN0LW11aS1jb250ZXh0IC5jdXJyZW50LXVzZXItZWRpdC5weWRpby1mb3JtLXBhbmVsID4gLnB5ZGlvLWZvcm0tZ3JvdXAgZGl2LmZvcm0tZW50cnktaW1hZ2UgLmltYWdlLWxhYmVsLFxcbi5yZWFjdC1tdWktY29udGV4dCAuY3VycmVudC11c2VyLWVkaXQucHlkaW8tZm9ybS1wYW5lbCA+IC5weWRpby1mb3JtLWdyb3VwIGRpdi5mb3JtLWVudHJ5LWltYWdlIC5mb3JtLWxlZ2VuZCB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG4ucmVhY3QtbXVpLWNvbnRleHQgLmN1cnJlbnQtdXNlci1lZGl0LnB5ZGlvLWZvcm0tcGFuZWwgPiAucHlkaW8tZm9ybS1ncm91cCBkaXYuZm9ybS1lbnRyeS1pbWFnZSAuZmlsZS1kcm9wem9uZSB7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICB3aWR0aDogMTYwcHggIWltcG9ydGFudDtcXG4gIGhlaWdodDogMTYwcHggIWltcG9ydGFudDtcXG4gIG1hcmdpbjogMjBweCBhdXRvO1xcbn1cXG4ucmVhY3QtbXVpLWNvbnRleHQgLmN1cnJlbnQtdXNlci1lZGl0LnB5ZGlvLWZvcm0tcGFuZWwgPiAucHlkaW8tZm9ybS1ncm91cCBkaXYuZm9ybS1lbnRyeS1pbWFnZSAuYmluYXJ5LXJlbW92ZS1idXR0b24ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiA1cHg7XFxuICByaWdodDogMDtcXG59XFxuXFxuJztcblxudmFyIFByb2ZpbGVQYW5lID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnUHJvZmlsZVBhbmUnLFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHZhciBvYmpWYWx1ZXMgPSB7fSxcbiAgICAgICAgICAgIG1haWxWYWx1ZXMgPSB7fTtcbiAgICAgICAgdmFyIHB5ZGlvID0gdGhpcy5wcm9wcy5weWRpbztcbiAgICAgICAgaWYgKHB5ZGlvLnVzZXIpIHtcbiAgICAgICAgICAgIHB5ZGlvLnVzZXIucHJlZmVyZW5jZXMuZm9yRWFjaChmdW5jdGlvbiAodiwgaykge1xuICAgICAgICAgICAgICAgIGlmIChrID09PSAnZ3VpX3ByZWZlcmVuY2VzJykgcmV0dXJuO1xuICAgICAgICAgICAgICAgIG9ialZhbHVlc1trXSA9IHY7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGVmaW5pdGlvbnM6IE1hbmFnZXIucGFyc2VQYXJhbWV0ZXJzKHB5ZGlvLmdldFhtbFJlZ2lzdHJ5KCksIFwidXNlci9wcmVmZXJlbmNlcy9wcmVmW0BleHBvc2VkPSd0cnVlJ118Ly9wYXJhbVtjb250YWlucyhAc2NvcGUsJ3VzZXInKSBhbmQgQGV4cG9zZT0ndHJ1ZScgYW5kIG5vdChjb250YWlucyhAbmFtZSwgJ05PVElGSUNBVElPTlNfRU1BSUwnKSldXCIpLFxuICAgICAgICAgICAgbWFpbERlZmluaXRpb25zOiBNYW5hZ2VyLnBhcnNlUGFyYW1ldGVycyhweWRpby5nZXRYbWxSZWdpc3RyeSgpLCBcInVzZXIvcHJlZmVyZW5jZXMvcHJlZltAZXhwb3NlZD0ndHJ1ZSddfC8vcGFyYW1bY29udGFpbnMoQHNjb3BlLCd1c2VyJykgYW5kIEBleHBvc2U9J3RydWUnIGFuZCBjb250YWlucyhAbmFtZSwgJ05PVElGSUNBVElPTlNfRU1BSUwnKV1cIiksXG4gICAgICAgICAgICB2YWx1ZXM6IG9ialZhbHVlcyxcbiAgICAgICAgICAgIG9yaWdpbmFsVmFsdWVzOiBMYW5nVXRpbHMuZGVlcENvcHkob2JqVmFsdWVzKSxcbiAgICAgICAgICAgIGRpcnR5OiBmYWxzZVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBvbkZvcm1DaGFuZ2U6IGZ1bmN0aW9uIG9uRm9ybUNoYW5nZShuZXdWYWx1ZXMsIGRpcnR5LCByZW1vdmVWYWx1ZXMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGlydHk6IGRpcnR5LCB2YWx1ZXM6IG5ld1ZhbHVlcyB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMuX3VwZGF0ZXIpIF90aGlzLl91cGRhdGVyKF90aGlzLmdldEJ1dHRvbnMoKSk7XG4gICAgICAgICAgICBpZiAoX3RoaXMucHJvcHMuc2F2ZU9uQ2hhbmdlKSBfdGhpcy5zYXZlRm9ybSgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgZ2V0QnV0dG9uczogZnVuY3Rpb24gZ2V0QnV0dG9ucygpIHtcbiAgICAgICAgdmFyIHVwZGF0ZXIgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyBudWxsIDogYXJndW1lbnRzWzBdO1xuXG4gICAgICAgIGlmICh1cGRhdGVyKSB0aGlzLl91cGRhdGVyID0gdXBkYXRlcjtcbiAgICAgICAgdmFyIGJ1dHRvbiA9IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHJldmVydCA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGlydHkpIHtcbiAgICAgICAgICAgIHJldmVydCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmxhdEJ1dHRvbiwgeyBsYWJlbDogdGhpcy5wcm9wcy5weWRpby5NZXNzYWdlSGFzaFs2MjhdLCBvblRvdWNoVGFwOiB0aGlzLnJldmVydCB9KTtcbiAgICAgICAgICAgIGJ1dHRvbiA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmxhdEJ1dHRvbiwgeyBsYWJlbDogdGhpcy5wcm9wcy5weWRpby5NZXNzYWdlSGFzaFs1M10sIHNlY29uZGFyeTogdHJ1ZSwgb25Ub3VjaFRhcDogdGhpcy5zYXZlRm9ybSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJ1dHRvbiA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmxhdEJ1dHRvbiwgeyBsYWJlbDogdGhpcy5wcm9wcy5weWRpby5NZXNzYWdlSGFzaFs4Nl0sIG9uVG91Y2hUYXA6IHRoaXMucHJvcHMub25EaXNtaXNzIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnB5ZGlvLkNvbnRyb2xsZXIuZ2V0QWN0aW9uQnlOYW1lKCdwYXNzX2NoYW5nZScpKSB7XG4gICAgICAgICAgICByZXR1cm4gW1JlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIHdpZHRoOiAnMTAwJScgfSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoX1Bhc3N3b3JkUG9wb3ZlcjJbJ2RlZmF1bHQnXSwgdGhpcy5wcm9wcyksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgZmxleDogMSB9IH0pLFxuICAgICAgICAgICAgICAgIHJldmVydCxcbiAgICAgICAgICAgICAgICBidXR0b25cbiAgICAgICAgICAgICldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFtidXR0b25dO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldEJ1dHRvbjogZnVuY3Rpb24gZ2V0QnV0dG9uKGFjdGlvbk5hbWUsIG1lc3NhZ2VJZCkge1xuICAgICAgICB2YXIgcHlkaW8gPSB0aGlzLnByb3BzLnB5ZGlvO1xuICAgICAgICBpZiAoIXB5ZGlvLkNvbnRyb2xsZXIuZ2V0QWN0aW9uQnlOYW1lKGFjdGlvbk5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZnVuYyA9IGZ1bmN0aW9uIGZ1bmMoKSB7XG4gICAgICAgICAgICBweWRpby5Db250cm9sbGVyLmZpcmVBY3Rpb24oYWN0aW9uTmFtZSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0TVVJLlJhaXNlZEJ1dHRvbiwgeyBsYWJlbDogcHlkaW8uTWVzc2FnZUhhc2hbbWVzc2FnZUlkXSwgb25DbGljazogZnVuYyB9KTtcbiAgICB9LFxuXG4gICAgcmV2ZXJ0OiBmdW5jdGlvbiByZXZlcnQoKSB7XG4gICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdmFsdWVzOiBfZXh0ZW5kcyh7fSwgdGhpcy5zdGF0ZS5vcmlnaW5hbFZhbHVlcyksXG4gICAgICAgICAgICBkaXJ0eTogZmFsc2VcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKF90aGlzMi5fdXBkYXRlcikgX3RoaXMyLl91cGRhdGVyKF90aGlzMi5nZXRCdXR0b25zKCkpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgc2F2ZUZvcm06IGZ1bmN0aW9uIHNhdmVGb3JtKCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuZGlydHkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBkaXJ0eTogZmFsc2UgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHB5ZGlvID0gdGhpcy5wcm9wcy5weWRpbztcbiAgICAgICAgdmFyIF9zdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIHZhciBkZWZpbml0aW9ucyA9IF9zdGF0ZS5kZWZpbml0aW9ucztcbiAgICAgICAgdmFyIHZhbHVlcyA9IF9zdGF0ZS52YWx1ZXM7XG5cbiAgICAgICAgdmFyIHBvc3RWYWx1ZXMgPSBNYW5hZ2VyLmdldFZhbHVlc0ZvclBPU1QoZGVmaW5pdGlvbnMsIHZhbHVlcywgJ1BSRUZFUkVOQ0VTXycpO1xuICAgICAgICBwb3N0VmFsdWVzWydnZXRfYWN0aW9uJ10gPSAnY3VzdG9tX2RhdGFfZWRpdCc7XG4gICAgICAgIFB5ZGlvQXBpLmdldENsaWVudCgpLnJlcXVlc3QocG9zdFZhbHVlcywgKGZ1bmN0aW9uICh0cmFuc3BvcnQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAgICAgICBQeWRpb0FwaS5nZXRDbGllbnQoKS5wYXJzZVhtbE1lc3NhZ2UodHJhbnNwb3J0LnJlc3BvbnNlWE1MKTtcbiAgICAgICAgICAgIHB5ZGlvLm9ic2VydmVPbmNlKCd1c2VyX2xvZ2dlZCcsIGZ1bmN0aW9uICh1c2VyT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlcy5hdmF0YXIgJiYgdXNlck9iamVjdC5nZXRQcmVmZXJlbmNlKCdhdmF0YXInKSAhPT0gdmFsdWVzLmF2YXRhcikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczMuc2V0U3RhdGUoeyB2YWx1ZXM6IF9leHRlbmRzKHt9LCB2YWx1ZXMsIHsgYXZhdGFyOiB1c2VyT2JqZWN0LmdldFByZWZlcmVuY2UoJ2F2YXRhcicpIH0pIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcHlkaW8ucmVmcmVzaFVzZXJEYXRhKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGlydHk6IGZhbHNlIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMzLl91cGRhdGVyKSBfdGhpczMuX3VwZGF0ZXIoX3RoaXMzLmdldEJ1dHRvbnMoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuYmluZCh0aGlzKSk7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgICAgdmFyIHB5ZGlvID0gX3Byb3BzLnB5ZGlvO1xuICAgICAgICB2YXIgbWluaURpc3BsYXkgPSBfcHJvcHMubWluaURpc3BsYXk7XG5cbiAgICAgICAgaWYgKCFweWRpby51c2VyKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdmFyIF9zdGF0ZTIgPSB0aGlzLnN0YXRlO1xuICAgICAgICB2YXIgZGVmaW5pdGlvbnMgPSBfc3RhdGUyLmRlZmluaXRpb25zO1xuICAgICAgICB2YXIgdmFsdWVzID0gX3N0YXRlMi52YWx1ZXM7XG5cbiAgICAgICAgaWYgKG1pbmlEaXNwbGF5KSB7XG4gICAgICAgICAgICBkZWZpbml0aW9ucyA9IGRlZmluaXRpb25zLmZpbHRlcihmdW5jdGlvbiAobykge1xuICAgICAgICAgICAgICAgIHJldHVybiBbJ2F2YXRhciddLmluZGV4T2Yoby5uYW1lKSAhPT0gLTE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybVBhbmVsLCB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnY3VycmVudC11c2VyLWVkaXQnLFxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IGRlZmluaXRpb25zLFxuICAgICAgICAgICAgICAgIHZhbHVlczogdmFsdWVzLFxuICAgICAgICAgICAgICAgIGRlcHRoOiAtMSxcbiAgICAgICAgICAgICAgICBiaW5hcnlfY29udGV4dDogXCJ1c2VyX2lkPVwiICsgcHlkaW8udXNlci5pZCxcbiAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkZvcm1DaGFuZ2VcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgIW1pbmlEaXNwbGF5ICYmIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGl2aWRlciwgbnVsbCksXG4gICAgICAgICAgICAhbWluaURpc3BsYXkgJiYgUmVhY3QuY3JlYXRlRWxlbWVudChfRW1haWxQYW5lbDJbJ2RlZmF1bHQnXSwgeyBweWRpbzogdGhpcy5wcm9wcy5weWRpbywgZGVmaW5pdGlvbnM6IHRoaXMuc3RhdGUubWFpbERlZmluaXRpb25zLCB2YWx1ZXM6IHZhbHVlcywgb25DaGFuZ2U6IHRoaXMub25Gb3JtQ2hhbmdlIH0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3R5bGUnLCB7IHR5cGU6ICd0ZXh0L2NzcycsIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7IF9faHRtbDogRk9STV9DU1MgfSB9KVxuICAgICAgICApO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFByb2ZpbGVQYW5lO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4iLCIvKlxuICogQ29weXJpZ2h0IDIwMDctMjAxNyBDaGFybGVzIGR1IEpldSAtIEFic3RyaXVtIFNBUyA8dGVhbSAoYXQpIHB5ZC5pbz5cbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFB5ZGlvLlxuICpcbiAqIFB5ZGlvIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogUHlkaW8gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggUHlkaW8uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVGhlIGxhdGVzdCBjb2RlIGNhbiBiZSBmb3VuZCBhdCA8aHR0cHM6Ly9weWRpby5jb20+LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJ21hdGVyaWFsLXVpJyk7XG5cbnZhciBUb2dnbGUgPSBfcmVxdWlyZS5Ub2dnbGU7XG52YXIgRGl2aWRlciA9IF9yZXF1aXJlLkRpdmlkZXI7XG52YXIgVGV4dEZpZWxkID0gX3JlcXVpcmUuVGV4dEZpZWxkO1xudmFyIFJhaXNlZEJ1dHRvbiA9IF9yZXF1aXJlLlJhaXNlZEJ1dHRvbjtcblxudmFyIF9yZXF1aXJlJHJlcXVpcmVMaWIgPSByZXF1aXJlKCdweWRpbycpLnJlcXVpcmVMaWIoJ2NvbXBvbmVudHMnKTtcblxudmFyIENsaXBib2FyZFRleHRGaWVsZCA9IF9yZXF1aXJlJHJlcXVpcmVMaWIuQ2xpcGJvYXJkVGV4dEZpZWxkO1xuXG52YXIgV2ViREFWUGFuZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ1dlYkRBVlBhbmUnLFxuXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmxvYWRQcmVmcygpO1xuICAgIH0sXG4gICAgZ2V0TWVzc2FnZTogZnVuY3Rpb24gZ2V0TWVzc2FnZShpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5weWRpby5NZXNzYWdlSGFzaFtpZF07XG4gICAgfSxcbiAgICBvblRvZ2dsZUNoYW5nZTogZnVuY3Rpb24gb25Ub2dnbGVDaGFuZ2UoZXZlbnQsIG5ld1ZhbHVlKSB7XG4gICAgICAgIFB5ZGlvQXBpLmdldENsaWVudCgpLnJlcXVlc3Qoe1xuICAgICAgICAgICAgZ2V0X2FjdGlvbjogJ3dlYmRhdl9wcmVmZXJlbmNlcycsXG4gICAgICAgICAgICBhY3RpdmF0ZTogbmV3VmFsdWUgPyBcInRydWVcIiA6IFwiZmFsc2VcIlxuICAgICAgICB9LCAoZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwcmVmZXJlbmNlczogdC5yZXNwb25zZUpTT04gfSk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnB5ZGlvLmRpc3BsYXlNZXNzYWdlKFwiU1VDQ0VTU1wiLCB0aGlzLnByb3BzLnB5ZGlvLk1lc3NhZ2VIYXNoW25ld1ZhbHVlID8gNDA4IDogNDA5XSk7XG4gICAgICAgIH0pLmJpbmQodGhpcykpO1xuICAgIH0sXG4gICAgc2F2ZVBhc3N3b3JkOiBmdW5jdGlvbiBzYXZlUGFzc3dvcmQoZXZlbnQpIHtcbiAgICAgICAgUHlkaW9BcGkuZ2V0Q2xpZW50KCkucmVxdWVzdCh7XG4gICAgICAgICAgICBnZXRfYWN0aW9uOiAnd2ViZGF2X3ByZWZlcmVuY2VzJyxcbiAgICAgICAgICAgIHdlYmRhdl9wYXNzOiB0aGlzLnJlZnNbJ3Bhc3NmaWVsZCddLmdldFZhbHVlKClcbiAgICAgICAgfSwgKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHJlZmVyZW5jZXM6IHQucmVzcG9uc2VKU09OIH0pO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5weWRpby5kaXNwbGF5TWVzc2FnZShcIlNVQ0NFU1NcIiwgdGhpcy5wcm9wcy5weWRpby5NZXNzYWdlSGFzaFs0MTBdKTtcbiAgICAgICAgfSkuYmluZCh0aGlzKSk7XG4gICAgfSxcbiAgICBsb2FkUHJlZnM6IGZ1bmN0aW9uIGxvYWRQcmVmcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzTW91bnRlZCgpKSByZXR1cm47XG4gICAgICAgIFB5ZGlvQXBpLmdldENsaWVudCgpLnJlcXVlc3Qoe1xuICAgICAgICAgICAgZ2V0X2FjdGlvbjogJ3dlYmRhdl9wcmVmZXJlbmNlcydcbiAgICAgICAgfSwgKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHJlZmVyZW5jZXM6IHQucmVzcG9uc2VKU09OIH0pO1xuICAgICAgICB9KS5iaW5kKHRoaXMpKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyUGFzc3dvcmRGaWVsZDogZnVuY3Rpb24gcmVuZGVyUGFzc3dvcmRGaWVsZCgpIHtcblxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5wcmVmZXJlbmNlcy5kaWdlc3Rfc2V0IHx8ICF0aGlzLnN0YXRlLnByZWZlcmVuY2VzLndlYmRhdl9mb3JjZV9iYXNpYykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERpdmlkZXIsIG51bGwpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IHBhZGRpbmc6IDE2IH0gfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNZXNzYWdlKDQwNylcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2Jhc2VsaW5lJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEZpZWxkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGFzc3dvcmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmxvYXRpbmdMYWJlbFRleHQ6IHRoaXMuZ2V0TWVzc2FnZSg1MjMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAncGFzc2ZpZWxkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7IGZsZXg6IDEsIG1hcmdpblJpZ2h0OiAxMCB9XG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJhaXNlZEJ1dHRvbiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdTYXZlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuc2F2ZVBhc3N3b3JkXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGl2aWRlciwgbnVsbClcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyVXJsczogZnVuY3Rpb24gcmVuZGVyVXJscygpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICB2YXIgYmFzZSA9IHRoaXMuc3RhdGUucHJlZmVyZW5jZXMud2ViZGF2X2Jhc2VfdXJsO1xuICAgICAgICB2YXIgb3RoZXJVcmxzID0gW107XG4gICAgICAgIHZhciB0b2dnbGVyID0gISF0aGlzLnN0YXRlLnRvZ2dsZXI7XG4gICAgICAgIHZhciBweWRpbyA9IHRoaXMucHJvcHMucHlkaW87XG4gICAgICAgIHZhciBwcmVmZXJlbmNlcyA9IHRoaXMuc3RhdGUucHJlZmVyZW5jZXM7XG5cbiAgICAgICAgaWYgKHRvZ2dsZXIpIHtcbiAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHVzZXJSZXBvcyA9IHB5ZGlvLnVzZXIuZ2V0UmVwb3NpdG9yaWVzTGlzdCgpO1xuICAgICAgICAgICAgICAgIHZhciB3ZWJkYXZSZXBvcyA9IHByZWZlcmVuY2VzLndlYmRhdl9yZXBvc2l0b3JpZXM7XG4gICAgICAgICAgICAgICAgdXNlclJlcG9zLmZvckVhY2goKGZ1bmN0aW9uIChyZXBvLCBrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF3ZWJkYXZSZXBvc1trZXldKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIG90aGVyVXJscy5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ2xpcGJvYXJkVGV4dEZpZWxkLCB7IGtleToga2V5LCBmbG9hdGluZ0xhYmVsVGV4dDogcmVwby5nZXRMYWJlbCgpLCBpbnB1dFZhbHVlOiB3ZWJkYXZSZXBvc1trZXldLCBnZXRNZXNzYWdlOiB0aGlzLmdldE1lc3NhZ2UgfSkpO1xuICAgICAgICAgICAgICAgIH0pLmJpbmQoX3RoaXMpKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBzdHlsZTogeyBwYWRkaW5nOiAyMCB9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TWVzc2FnZSg0MDUpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENsaXBib2FyZFRleHRGaWVsZCwgeyBmbG9hdGluZ0xhYmVsVGV4dDogdGhpcy5nZXRNZXNzYWdlKDQ2OCksIGlucHV0VmFsdWU6IGJhc2UsIGdldE1lc3NhZ2U6IHRoaXMuZ2V0TWVzc2FnZSB9KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRvZ2dsZXIgJiYgUmVhY3QuY3JlYXRlRWxlbWVudChEaXZpZGVyLCBudWxsKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBzdHlsZTogeyBwYWRkaW5nOiAyMCB9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUb2dnbGUsIHsgbGFiZWxQb3NpdGlvbjogJ3JpZ2h0JywgbGFiZWw6IHRoaXMuZ2V0TWVzc2FnZSg0NjUpLCBvblRvZ2dsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoeyB0b2dnbGVyOiAhdG9nZ2xlciB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdG9nZ2xlZDogdG9nZ2xlciB9KSxcbiAgICAgICAgICAgICAgICBvdGhlclVybHNcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHZhciB3ZWJkYXZBY3RpdmUgPSB0aGlzLnN0YXRlICYmIHRoaXMuc3RhdGUucHJlZmVyZW5jZXMud2ViZGF2X2FjdGl2ZTtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgIHsgc3R5bGU6IHsgZm9udFNpemU6IDE0IH0gfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBzdHlsZTogeyBwYWRkaW5nOiAyMCB9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUb2dnbGUsIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxQb3NpdGlvbjogJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMuZ2V0TWVzc2FnZSg0MDYpLFxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVkOiB3ZWJkYXZBY3RpdmUsXG4gICAgICAgICAgICAgICAgICAgIG9uVG9nZ2xlOiB0aGlzLm9uVG9nZ2xlQ2hhbmdlIH0pLFxuICAgICAgICAgICAgICAgICF3ZWJkYXZBY3RpdmUgJiYgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgcGFkZGluZ1RvcDogMjAgfSB9LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE1lc3NhZ2UoNDA0KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB3ZWJkYXZBY3RpdmUgJiYgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGl2aWRlciwgbnVsbCksXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJQYXNzd29yZEZpZWxkKCksXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJVcmxzKClcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbn0pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBXZWJEQVZQYW5lO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4iLCIvKlxuICogQ29weXJpZ2h0IDIwMDctMjAxNyBDaGFybGVzIGR1IEpldSAtIEFic3RyaXVtIFNBUyA8dGVhbSAoYXQpIHB5ZC5pbz5cbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFB5ZGlvLlxuICpcbiAqIFB5ZGlvIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogUHlkaW8gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggUHlkaW8uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVGhlIGxhdGVzdCBjb2RlIGNhbiBiZSBmb3VuZCBhdCA8aHR0cHM6Ly9weWRpby5jb20+LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfUHJvZmlsZVBhbmUgPSByZXF1aXJlKCcuL1Byb2ZpbGVQYW5lJyk7XG5cbnZhciBfUHJvZmlsZVBhbmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUHJvZmlsZVBhbmUpO1xuXG52YXIgX3B5ZGlvID0gcmVxdWlyZSgncHlkaW8nKTtcblxudmFyIF9weWRpbzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9weWRpbyk7XG5cbnZhciBfbWF0ZXJpYWxVaSA9IHJlcXVpcmUoJ21hdGVyaWFsLXVpJyk7XG5cbnZhciBfUHlkaW8kcmVxdWlyZUxpYiA9IF9weWRpbzJbJ2RlZmF1bHQnXS5yZXF1aXJlTGliKCdib290Jyk7XG5cbnZhciBBY3Rpb25EaWFsb2dNaXhpbiA9IF9QeWRpbyRyZXF1aXJlTGliLkFjdGlvbkRpYWxvZ01peGluO1xudmFyIENhbmNlbEJ1dHRvblByb3ZpZGVyTWl4aW4gPSBfUHlkaW8kcmVxdWlyZUxpYi5DYW5jZWxCdXR0b25Qcm92aWRlck1peGluO1xudmFyIFN1Ym1pdEJ1dHRvblByb3ZpZGVyTWl4aW4gPSBfUHlkaW8kcmVxdWlyZUxpYi5TdWJtaXRCdXR0b25Qcm92aWRlck1peGluO1xuXG4vKipcbiAqIFNhbXBsZSBEaWFsb2cgY2xhc3MgdXNlZCBmb3IgcmVmZXJlbmNlIG9ubHksIHJlYWR5IHRvIGJlXG4gKiBjb3B5L3Bhc3RlZCA6LSlcbiAqL1xuZXhwb3J0c1snZGVmYXVsdCddID0gX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ1dlbGNvbWVNb2RhbCcsXG5cbiAgICBtaXhpbnM6IFtBY3Rpb25EaWFsb2dNaXhpbiwgQ2FuY2VsQnV0dG9uUHJvdmlkZXJNaXhpbl0sXG5cbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpYWxvZ1RpdGxlOiAnJyxcbiAgICAgICAgICAgIGRpYWxvZ0lzTW9kYWw6IHRydWUsXG4gICAgICAgICAgICBkaWFsb2dTaXplOiAnc20nLFxuICAgICAgICAgICAgZGlhbG9nUGFkZGluZzogMFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKHNraXApIHtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vblJlcXVlc3RTdGFydCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblJlcXVlc3RTdGFydChza2lwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLm9uRGlzbWlzcygpO1xuICAgIH0sXG4gICAgZ2V0TWVzc2FnZTogZnVuY3Rpb24gZ2V0TWVzc2FnZShpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5weWRpby5NZXNzYWdlSGFzaFsnYWpheF9ndWkudG91ci53ZWxjb21lbW9kYWwuJyArIGlkXTtcbiAgICB9LFxuICAgIGdldEJ1dHRvbnM6IGZ1bmN0aW9uIGdldEJ1dHRvbnMoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIFtfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChfbWF0ZXJpYWxVaS5GbGF0QnV0dG9uLCB7IGxhYmVsOiB0aGlzLmdldE1lc3NhZ2UoJ3NraXAnKSwgb25Ub3VjaFRhcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlKHRydWUpO1xuICAgICAgICAgICAgfSB9KSwgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoX21hdGVyaWFsVWkuRmxhdEJ1dHRvbiwgeyBsYWJlbDogdGhpcy5nZXRNZXNzYWdlKCdzdGFydCcpLCBwcmltYXJ5OiB0cnVlLCBvblRvdWNoVGFwOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmNsb3NlKGZhbHNlKTtcbiAgICAgICAgICAgIH0gfSldO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgcG9zaXRpb246ICdyZWxhdGl2ZScsIHdpZHRoOiAnMTAwJScsIGhlaWdodDogMjA1LCBvdmVyZmxvdzogJ2hpZGRlbicsIGJhY2tncm91bmRDb2xvcjogJyNlY2VmZjEnIH0gfSxcbiAgICAgICAgICAgICAgICBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChfUHJvZmlsZVBhbmUyWydkZWZhdWx0J10sIF9leHRlbmRzKHsgbWluaURpc3BsYXk6IHRydWUgfSwgdGhpcy5wcm9wcywgeyBzYXZlT25DaGFuZ2U6IHRydWUgfSkpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoX21hdGVyaWFsVWkuQ2FyZFRpdGxlLCB7IHRpdGxlOiB0aGlzLmdldE1lc3NhZ2UoJ3RpdGxlJyksIHN1YnRpdGxlOiB0aGlzLmdldE1lc3NhZ2UoJ3N1YnRpdGxlJykgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4iLCIvKlxuICogQ29weXJpZ2h0IDIwMDctMjAxNyBDaGFybGVzIGR1IEpldSAtIEFic3RyaXVtIFNBUyA8dGVhbSAoYXQpIHB5ZC5pbz5cbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFB5ZGlvLlxuICpcbiAqIFB5ZGlvIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogUHlkaW8gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggUHlkaW8uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVGhlIGxhdGVzdCBjb2RlIGNhbiBiZSBmb3VuZCBhdCA8aHR0cHM6Ly9weWRpby5jb20+LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9DYWxsYmFja3MgPSByZXF1aXJlKCcuL0NhbGxiYWNrcycpO1xuXG52YXIgX0NhbGxiYWNrczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9DYWxsYmFja3MpO1xuXG52YXIgX01vZGFsRGFzaGJvYXJkID0gcmVxdWlyZSgnLi9Nb2RhbERhc2hib2FyZCcpO1xuXG52YXIgX01vZGFsRGFzaGJvYXJkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX01vZGFsRGFzaGJvYXJkKTtcblxudmFyIF9Nb2RhbEFkZHJlc3NCb29rID0gcmVxdWlyZSgnLi9Nb2RhbEFkZHJlc3NCb29rJyk7XG5cbnZhciBfTW9kYWxBZGRyZXNzQm9vazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Nb2RhbEFkZHJlc3NCb29rKTtcblxudmFyIF9XZWJkYXZQYW5lID0gcmVxdWlyZSgnLi9XZWJkYXZQYW5lJyk7XG5cbnZhciBfV2ViZGF2UGFuZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9XZWJkYXZQYW5lKTtcblxudmFyIF9XZWxjb21lTW9kYWwgPSByZXF1aXJlKCcuL1dlbGNvbWVNb2RhbCcpO1xuXG52YXIgX1dlbGNvbWVNb2RhbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9XZWxjb21lTW9kYWwpO1xuXG52YXIgX1Bhc3N3b3JkRm9ybSA9IHJlcXVpcmUoJy4vUGFzc3dvcmRGb3JtJyk7XG5cbnZhciBfUGFzc3dvcmRGb3JtMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1Bhc3N3b3JkRm9ybSk7XG5cbnZhciBDYWxsYmFja3MgPSAoMCwgX0NhbGxiYWNrczJbJ2RlZmF1bHQnXSkod2luZG93LnB5ZGlvKTtcblxuZXhwb3J0cy5DYWxsYmFja3MgPSBDYWxsYmFja3M7XG5leHBvcnRzLk1vZGFsRGFzaGJvYXJkID0gX01vZGFsRGFzaGJvYXJkMlsnZGVmYXVsdCddO1xuZXhwb3J0cy5Nb2RhbEFkZHJlc3NCb29rID0gX01vZGFsQWRkcmVzc0Jvb2syWydkZWZhdWx0J107XG5leHBvcnRzLldlYkRBVlBhbmUgPSBfV2ViZGF2UGFuZTJbJ2RlZmF1bHQnXTtcbmV4cG9ydHMuV2VsY29tZU1vZGFsID0gX1dlbGNvbWVNb2RhbDJbJ2RlZmF1bHQnXTtcbmV4cG9ydHMuUGFzc3dvcmRGb3JtID0gX1Bhc3N3b3JkRm9ybTJbJ2RlZmF1bHQnXTtcbiJdfQ==
