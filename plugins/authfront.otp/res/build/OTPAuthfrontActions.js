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
            this._modifyLoginScreen = pydio.getPluginConfigs('authfront.otp').get('MODIFY_LOGIN_SCREEN');
        }

        _createClass(LoginDialogModifier, [{
            key: 'enrichSubmitParameters',
            value: function enrichSubmitParameters(props, state, refs, params) {

                if (this._modifyLoginScreen) {
                    params['otp_code'] = refs.otp_code.getValue();
                }
            }
        }, {
            key: 'renderAdditionalComponents',
            value: function renderAdditionalComponents(props, state, accumulator) {

                if (this._modifyLoginScreen) {
                    accumulator.bottom.push(React.createElement(MaterialUI.TextField, { ref: 'otp_code', floatingLabelText: pydio.MessageHash['authfront.otp.10'] }));
                } else {
                    accumulator.bottom.push(React.createElement(
                        'div',
                        null,
                        React.createElement('span', { className: 'mdi mdi-alert' }),
                        ' ',
                        pydio.MessageHash['authfront.otp.9']
                    ));
                }
            }
        }]);

        return LoginDialogModifier;
    })(PydioReactUI.AbstractDialogModifier);

    var OTPSetupScreen = React.createClass({
        displayName: 'OTPSetupScreen',

        mixins: [PydioReactUI.ActionDialogMixin, PydioReactUI.SubmitButtonProviderMixin],

        submit: function submit() {

            if (!this.refs.verification.getValue()) {
                pydio.displayMessage('ERROR', 'Please set up verification code');
                return false;
            }
            PydioApi.getClient().request({
                get_action: "otp_show_setup_screen",
                step: "verify",
                otp: this.refs.verification.getValue()
            }, function (t) {
                if (t.responseJSON && t.responseJSON.RESULT === "OK") {
                    location.reload();
                }
            });
        },

        getInitialState: function getInitialState() {
            return { loaded: false };
        },

        componentWillReceiveProps: function componentWillReceiveProps() {
            PydioApi.getClient().request({
                get_action: 'otp_show_setup_screen'
            }, (function (t) {
                if (!t.responseJSON) return;
                this.setState({
                    qrCode: t.responseJSON.qrcode,
                    otpKey: t.responseJSON.key,
                    loaded: true
                });
            }).bind(this));
        },

        render: function render() {
            var messages = pydio.MessageHash;
            var codes = undefined;
            if (this.state.loaded) {
                codes = React.createElement(
                    'div',
                    { 'class': 'codes' },
                    React.createElement(
                        'div',
                        { style: { textAlign: "center" } },
                        React.createElement(ReactQRCode, { size: 100, value: this.state.qrCode, level: 'L' })
                    ),
                    React.createElement(MaterialUI.TextField, { fullWidth: true, floatingLabelText: 'Google Key', ref: 'google_otp', defaultValue: this.state.otpKey })
                );
            }

            return React.createElement(
                'div',
                { id: 'otp_setup_screen' },
                React.createElement(
                    'p',
                    null,
                    messages['authfront.otp.2']
                ),
                React.createElement(
                    'p',
                    null,
                    React.createElement(
                        'big',
                        null,
                        '1.'
                    ),
                    ' ',
                    messages['authfront.otp.3']
                ),
                React.createElement(
                    'p',
                    null,
                    React.createElement(
                        'big',
                        null,
                        '2.'
                    ),
                    ' ',
                    messages['authfront.otp.4']
                ),
                codes,
                React.createElement(
                    'p',
                    { style: { paddingBottom: 0, marginBottom: 0 } },
                    React.createElement(
                        'big',
                        null,
                        '3.'
                    ),
                    ' ',
                    messages['authfront.otp.5']
                ),
                React.createElement(MaterialUI.TextField, {
                    fullWidth: true,
                    floatingLabelText: 'Code',
                    ref: 'verification'
                })
            );
        }

    });

    var Callbacks = (function () {
        function Callbacks() {
            _classCallCheck(this, Callbacks);
        }

        _createClass(Callbacks, null, [{
            key: 'setupScreen',
            value: function setupScreen() {

                pydio.UI.openComponentInModal('OTPAuthfrontActions', 'OTPSetupScreen');
            }
        }]);

        return Callbacks;
    })();

    global.OTPAuthfrontActions = {
        Callbacks: Callbacks,
        LoginDialogModifier: LoginDialogModifier,
        OTPSetupScreen: OTPSetupScreen
    };
})(window);
