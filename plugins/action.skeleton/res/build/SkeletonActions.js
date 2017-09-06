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
    var _require$requireLib = require('pydio').requireLib('boot');

    var ActionDialogMixin = _require$requireLib.ActionDialogMixin;
    var CancelButtonProviderMixin = _require$requireLib.CancelButtonProviderMixin;
    var SubmitButtonProviderMixin = _require$requireLib.SubmitButtonProviderMixin;
    var Loader = _require$requireLib.Loader;

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
            key: 'alertButton',
            value: function alertButton() {
                var confs = pydio.getPluginConfigs("ajxp_plugin[@name='skeleton']");
                var target = confs.get('CUSTOM_BUTTON_TARGET');
                if (window.confirm(MessageHash['skeleton.3'].replace('%s', target))) {
                    window.open(target, "my_popup");
                }
            }
        }, {
            key: 'frameButton',
            value: function frameButton() {
                pydio.UI.openComponentInModal('SkeletonActions', 'Dialog');
            }
        }]);

        return Callbacks;
    })();

    var SkeletonDialog = React.createClass({
        displayName: 'SkeletonDialog',

        mixins: [ActionDialogMixin, CancelButtonProviderMixin, SubmitButtonProviderMixin],

        getDefaultProps: function getDefaultProps() {
            return {
                dialogTitle: "Demonstration Dialog",
                dialogIsModal: true
            };
        },
        submit: function submit() {
            this.dismiss();
        },
        componentDidMount: function componentDidMount() {
            var _this = this;

            PydioApi.getClient().request({ get_action: 'my_skeleton_button_frame' }, function (transport) {
                _this.setState({ content: transport.responseText });
            });
        },
        render: function render() {

            if (!this.state || !this.state.content) {
                return React.createElement(Loader, null);
            }
            return React.createElement('div', { dangerouslySetInnerHTML: { __html: this.state.content } });
        }

    });

    var Footer = React.createClass({
        displayName: 'Footer',

        render: function render() {
            return React.createElement(
                'div',
                { style: { zIndex: 1500, position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10, backgroundColor: 'white' } },
                'Test Content'
            );
        }

    });

    global.SkeletonActions = {
        Callbacks: Callbacks,
        Dialog: SkeletonDialog,
        Template: Footer
    };
})(window);
