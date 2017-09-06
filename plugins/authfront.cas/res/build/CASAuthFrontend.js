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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (global) {

    var pydio = global.pydio;

    var LoginDialogModifier = (function (_PydioReactUI$AbstractDialogModifier) {
        _inherits(LoginDialogModifier, _PydioReactUI$AbstractDialogModifier);

        function LoginDialogModifier() {
            _classCallCheck(this, LoginDialogModifier);

            _get(Object.getPrototypeOf(LoginDialogModifier.prototype), 'constructor', this).call(this);
            this._modifyLoginScreen = pydio.getPluginConfigs('authfront.cas').get('MODIFY_LOGIN_SCREEN');

            // String for login page
            this._auth_cas_msg = "Use CAS Credential";
            this._auth_pyd_msg = "Use Pydio Credential";
            this._auth_button_msg = "Click here";

            if (pydio.getPluginConfigs("authfront.cas").has("AUTH_CAS_MESS_STRING")) {
                this._auth_cas_msg = pydio.getPluginConfigs("authfront.cas").get("AUTH_CAS_MESS_STRING");
            }
            if (pydio.getPluginConfigs("authfront.cas").has("AUTH_PYD_MESS_STRING")) {
                this._auth_pyd_msg = pydio.getPluginConfigs("authfront.cas").get("AUTH_PYD_MESS_STRING");
            }
            if (pydio.getPluginConfigs("authfront.cas").has("AUTH_CLICK_MESS_STRING")) {
                this._auth_button_msg = pydio.getPluginConfigs("authfront.cas").get("AUTH_CLICK_MESS_STRING");
            }
        }

        _createClass(LoginDialogModifier, [{
            key: 'renderAdditionalComponents',
            value: function renderAdditionalComponents(props, state, accumulator) {
                var _this = this;

                if (!this._modifyLoginScreen) {
                    return;
                }

                accumulator.top.push(React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { style: { display: 'flex', alignItems: 'center', marginBottom: 30 } },
                        React.createElement(
                            'div',
                            { style: { flex: 1, fontWeight: 500 } },
                            this._auth_cas_msg
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(MaterialUI.RaisedButton, { label: this._auth_button_msg, onTouchTap: function (e) {
                                    _this._hiddenForm.submit();
                                } })
                        )
                    ),
                    React.createElement(
                        'div',
                        { style: { marginBottom: -10, fontWeight: 500 } },
                        this._auth_pyd_msg
                    ),
                    React.createElement(
                        'div',
                        { style: { display: 'none' } },
                        React.createElement(
                            'form',
                            { ref: function (f) {
                                    _this._hiddenForm = f;
                                }, id: 'enableredirecttocas', method: 'post', action: '' },
                            React.createElement('input', { type: 'hidden', name: 'put_action_enable_redirect', value: 'yes' })
                        )
                    )
                ));
            }
        }]);

        return LoginDialogModifier;
    })(PydioReactUI.AbstractDialogModifier);

    global.CASAuthFrontend = {
        LoginDialogModifier: LoginDialogModifier
    };
})(window);
