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

var TextField = _require.TextField;
var FlatButton = _require.FlatButton;

var Pydio = require('pydio');

var _Pydio$requireLib = Pydio.requireLib('boot');

var ActionDialogMixin = _Pydio$requireLib.ActionDialogMixin;
var CancelButtonProviderMixin = _Pydio$requireLib.CancelButtonProviderMixin;
var SubmitButtonProviderMixin = _Pydio$requireLib.SubmitButtonProviderMixin;
exports['default'] = React.createClass({
    displayName: 'UserPasswordDialog',

    mixins: [ActionDialogMixin, CancelButtonProviderMixin, SubmitButtonProviderMixin],

    propTypes: {
        pydio: React.PropTypes.instanceOf(Pydio),
        userId: React.PropTypes.string.isRequired
    },

    getDefaultProps: function getDefaultProps() {
        return {
            dialogTitle: global.pydio.MessageHash['role_editor.25'],
            dialogSize: 'sm'
        };
    },

    getInitialState: function getInitialState() {
        return { okEnabled: false };
    },

    onChange: function onChange(event, value) {
        var minLength = parseInt(global.pydio.getPluginConfigs("core.auth").get("PASSWORD_MINLENGTH"));

        var enabled = this.refs.pass.getValue() && this.refs.pass.getValue().length >= minLength && this.refs.pass.getValue() == this.refs.confirm.getValue();

        this.setState({ okEnabled: enabled });
    },

    submit: function submit() {

        if (!this.state.okEnabled) {
            return;
        }

        var value = this.refs.pass.getValue();
        PydioApi.getClient().request({
            get_action: "edit",
            sub_action: "update_user_pwd",
            user_id: this.props.userId,
            user_pwd: value
        }, (function () {
            this.dismiss();
        }).bind(this));
    },

    render: function render() {

        // This is passed via state, context is not working,
        // so we have to get the messages from the global.
        var getMessage = function getMessage(id) {
            var namespace = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

            return global.pydio.MessageHash[namespace + (namespace ? '.' : '') + id] || id;
        };
        return React.createElement(
            'div',
            { style: { width: '100%' } },
            React.createElement(TextField, { ref: 'pass', type: 'password', fullWidth: true,
                onChange: this.onChange,
                floatingLabelText: getMessage('523'),
                errorText: !this.state.okEnabled ? getMessage('378') : null
            }),
            React.createElement(TextField, { ref: 'confirm', type: 'password', fullWidth: true,
                onChange: this.onChange,
                floatingLabelText: getMessage('199') })
        );
    }

});
module.exports = exports['default'];
