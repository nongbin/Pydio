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

var _corePluginEditor = require('../core/PluginEditor');

var _corePluginEditor2 = _interopRequireDefault(_corePluginEditor);

var _materialUi = require('material-ui');

var UpdaterDashboard = _react2['default'].createClass({
    displayName: 'UpdaterDashboard',

    mixins: [AdminComponents.MessagesConsumerMixin],

    getInitialState: function getInitialState() {
        return { checks: -1 };
    },

    componentDidMount: function componentDidMount() {
        this.checkForUpgrade();
    },

    checkForUpgrade: function checkForUpgrade() {
        this.setState({ loading: true });
        PydioApi.getClient().request({ get_action: 'get_upgrade_path' }, (function (transp) {
            this.setState({ loading: false });
            if (!this.isMounted()) return;
            var response = transp.responseJSON;
            var length = 0;
            if (response && response.packages.length) {
                length = response.packages.length;
                this.setState({ packages: response.packages });
                if (response.latest_note) {
                    var latest = response.latest_note;
                    latest = pydio.Parameters.get('ajxpServerAccess') + "&get_action=display_upgrade_note&url=" + encodeURIComponent(latest);
                    this.setState({ src: latest });
                }
            } else {
                this.setState({ no_upgrade: true });
            }

            var node = pydio.getContextNode();
            node.getMetadata().set('flag', length);
            AdminComponents.MenuItemListener.getInstance().notify("item_changed");
        }).bind(this));
    },

    performUpgrade: function performUpgrade() {
        if (this.state.checks < 0) {
            alert('Please select at least one package!');
            return;
        }
        if (confirm(this.context.getMessage('15', 'updater'))) {
            var client = PydioApi.getClient();
            this.setState({ src: '' }, (function () {
                this.setState({ src: client._baseUrl + '?secure_token=' + pydio.Parameters.get("SECURE_TOKEN") + '&get_action=perform_upgrade&package_index=' + this.state.checks });
            }).bind(this));
        }
    },

    onCheckStateChange: function onCheckStateChange(index, value) {
        if (value) this.setState({ checks: index });else this.setState({ checks: index - 1 });
    },

    render: function render() {
        var _this = this;

        var list = null;
        var _state = this.state;
        var packages = _state.packages;
        var checks = _state.checks;
        var loading = _state.loading;

        if (packages) {
            list = _react2['default'].createElement(
                'div',
                { style: { paddingBottom: 30, paddingRight: 5 } },
                _react2['default'].createElement(
                    'span',
                    { style: { float: 'right' } },
                    _react2['default'].createElement(_materialUi.RaisedButton, { primary: true, label: this.context.getMessage('4', 'updater'), onTouchTap: this.performUpgrade })
                ),
                this.context.getMessage('16', 'updater'),
                _react2['default'].createElement(
                    'div',
                    { style: { paddingLeft: 30 } },
                    packages.map(function (p, index) {
                        return _react2['default'].createElement(
                            'div',
                            null,
                            _react2['default'].createElement(_materialUi.Checkbox, { style: { listStyle: 'inherit' }, key: p, label: PathUtils.getBasename(p), onCheck: function (e, v) {
                                    return _this.onCheckStateChange(index, v);
                                }, checked: index <= checks })
                        );
                    })
                ),
                _react2['default'].createElement('br', null),
                this.context.getMessage('3', 'updater')
            );
        } else if (this.state && this.state.loading) {
            list = _react2['default'].createElement(
                'div',
                null,
                this.context.getMessage('17', 'updater')
            );
        } else {
            list = _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'span',
                    { style: { float: 'right' } },
                    _react2['default'].createElement(_materialUi.RaisedButton, { secondary: true, label: this.context.getMessage('20', 'updater'), onTouchTap: this.checkForUpgrade })
                ),
                this.state && this.state.no_upgrade ? this.context.getMessage('18', 'updater') : this.context.getMessage('19', 'updater')
            );
        }

        var updateCheckPane = _react2['default'].createElement(
            'div',
            { style: { padding: '0 20px' } },
            _react2['default'].createElement(
                'h3',
                null,
                this.context.getMessage('2', 'updater')
            ),
            _react2['default'].createElement(
                'div',
                { style: { paddingBottom: 20, paddingRight: 5 } },
                list
            ),
            _react2['default'].createElement('iframe', {
                ref: 'iframe',
                style: { width: '100%', height: 400, border: '1px solid #ccc' },
                src: this.state ? this.state.src : ''
            })
        );
        var version = pydio.Parameters.get("ajxpVersion");
        var additionalDescription = undefined;
        if (version == '##VERSION_NUMBER##') {
            additionalDescription = this.context.getMessage('21', 'updater');
        } else {
            additionalDescription = this.context.getMessage('22', 'updater').replace('%1', version).replace('%2', pydio.Parameters.get("ajxpVersionDate"));
        }
        return _react2['default'].createElement(
            'div',
            { className: 'update-checker', style: { height: '100%' } },
            _react2['default'].createElement(_corePluginEditor2['default'], _extends({}, this.props, {
                additionalDescription: additionalDescription,
                additionalPanes: { top: [updateCheckPane], bottom: [] }
            }))
        );
    }

});

exports['default'] = UpdaterDashboard;
module.exports = exports['default'];
