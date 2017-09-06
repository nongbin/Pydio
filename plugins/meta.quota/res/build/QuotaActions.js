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
    var MessageHash = global.pydio.MessageHash;

    var Model = (function () {
        function Model() {
            _classCallCheck(this, Model);

            this.usage = '';
            this.total = '';
            this.startListening();

            pydio.observe('repository_list_refreshed', (function () {
                if (!this.quotaEnabled() && this._pe) {
                    this._pe.stop();
                } else {
                    this.loadQuota();
                }
            }).bind(this));
        }

        _createClass(Model, [{
            key: 'quotaEnabled',
            value: function quotaEnabled() {
                return !!pydio.getController().getActionByName('monitor_quota');
            }
        }, {
            key: 'getText',
            value: function getText() {
                if (!this.usage || !this.quotaEnabled()) {
                    return '';
                }
                return PathUtils.roundFileSize(this.usage, MessageHash["byte_unit_symbol"]) + "/" + PathUtils.roundFileSize(this.total, MessageHash["byte_unit_symbol"]);
            }
        }, {
            key: 'getUsage',
            value: function getUsage() {
                return this.usage;
            }
        }, {
            key: 'getTotal',
            value: function getTotal() {
                return this.total;
            }
        }, {
            key: 'loadQuota',
            value: function loadQuota() {
                if (!this.quotaEnabled()) return;
                PydioApi.getClient().request({ get_action: 'monitor_quota' }, (function (transport) {
                    if (!this.quotaEnabled()) return;
                    var data = transport.responseJSON;
                    this.usage = data.USAGE;
                    this.total = data.TOTAL;
                }).bind(this));
            }
        }, {
            key: 'startListening',
            value: function startListening() {
                var configs = pydio.getPluginConfigs("mq");
                if (configs) {
                    pydio.observe("server_message", function (event) {
                        var newValue = XMLUtils.XPathSelectSingleNode(event, "/tree/metaquota");
                        if (newValue) {
                            this.usage = parseInt(newValue.getAttribute("usage"));
                            this.total = parseInt(newValue.getAttribute("total"));
                        }
                    });
                } else {
                    this._pe = new PeriodicalExecuter(function (pe) {
                        if (!this.quotaEnabled()) {
                            pe.stop();
                            return;
                        }
                        this.loadQuota();
                    }, 20);
                }
                this.loadQuota();
            }
        }], [{
            key: 'getInstance',
            value: function getInstance() {
                if (!Model._INSTANCE) {
                    Model._INSTANCE = new Model();
                }
                return Model._INSTANCE;
            }
        }]);

        return Model;
    })();

    var Callbacks = (function () {
        function Callbacks() {
            _classCallCheck(this, Callbacks);
        }

        _createClass(Callbacks, null, [{
            key: 'computeQuota',
            value: function computeQuota(manager, args) {}
        }]);

        return Callbacks;
    })();

    var Listeners = (function () {
        function Listeners() {
            _classCallCheck(this, Listeners);
        }

        _createClass(Listeners, null, [{
            key: 'init',
            value: function init() {
                Model.getInstance();
            }
        }]);

        return Listeners;
    })();

    var QuotaPanel = React.createClass({
        displayName: 'QuotaPanel',

        render: function render() {
            var model = Model.getInstance();
            return React.createElement(
                PydioWorkspaces.InfoPanelCard,
                { title: this.props.pydio.MessageHash['meta.quota.4'], icon: 'speedometer', iconColor: '#1565c0' },
                React.createElement(
                    'div',
                    null,
                    model.getText()
                ),
                React.createElement(
                    'div',
                    { style: { paddingBottom: 20 } },
                    React.createElement(MaterialUI.LinearProgress, { mode: 'determinate', min: 0, max: model.getTotal(), value: model.getUsage() })
                )
            );
        }

    });

    global.QuotaActions = {
        Callbacks: Callbacks,
        Listeners: Listeners,
        Model: Model,
        QuotaPanel: QuotaPanel
    };
})(window);
