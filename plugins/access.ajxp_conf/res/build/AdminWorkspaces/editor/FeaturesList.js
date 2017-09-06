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

var _metaMetaList = require('../meta/MetaList');

var _metaMetaList2 = _interopRequireDefault(_metaMetaList);

var _modelWorkspace = require('../model/Workspace');

var _modelWorkspace2 = _interopRequireDefault(_modelWorkspace);

exports['default'] = React.createClass({
    displayName: 'FeaturesList',

    mixins: [AdminComponents.MessagesConsumerMixin],

    propTypes: {
        onSelectionChange: React.PropTypes.func.isRequired,
        metaSourceProvider: React.PropTypes.object.isRequired,
        driverLabel: React.PropTypes.string,
        driverDescription: React.PropTypes.string,
        currentSelection: React.PropTypes.string,
        model: React.PropTypes.instanceOf(_modelWorkspace2['default']),
        tplFieldsComponent: React.PropTypes.object
    },

    setEditState: function setEditState(key) {
        this.props.onSelectionChange(key);
    },

    closeCurrent: function closeCurrent(event) {
        event.stopPropagation();
        this.setEditState('activity');
    },

    render: function render() {

        var firstSections = [];
        if (!this.props.model.isTemplate()) {
            firstSections.push(React.createElement(PydioComponents.PaperEditorNavEntry, { keyName: 'shares', key: 'shares', selectedKey: this.props.currentSelection, label: this.context.getMessage('ws.25'), onClick: this.setEditState }));
        }
        var driverTabLabel = this.context.getMessage('ws.9') + ": " + this.props.driverLabel;
        var additionalFeatures;
        if (this.props.model.isTemplateChild()) {
            driverTabLabel = this.context.getMessage('ws.13');
        } else {
            var plusButton;
            if (this.props.model.isEditable()) {
                plusButton = React.createElement(
                    'span',
                    { className: 'metasource-add', onClick: this.props.metaSourceProvider.showMetaSourceForm.bind(this.props.metaSourceProvider) },
                    '+'
                );
            }
            additionalFeatures = React.createElement(
                'div',
                { key: 'additional-k' },
                React.createElement(
                    PydioComponents.PaperEditorNavHeader,
                    { label: this.context.getMessage('ws.27') },
                    plusButton
                ),
                React.createElement(_metaMetaList2['default'], {
                    metaSourceProvider: this.props.metaSourceProvider,
                    currentMetas: this.props.model.getOption('META_SOURCES'),
                    edit: this.props.currentSelection,
                    closeCurrent: this.closeCurrent,
                    setEditState: this.setEditState,
                    featuresEditable: this.props.model.isEditable()
                })
            );
        }

        return React.createElement(
            'div',
            null,
            React.createElement(PydioComponents.PaperEditorNavHeader, { key: 'parameters-k', label: this.context.getMessage('ws.29') }),
            React.createElement(PydioComponents.PaperEditorNavEntry, { keyName: 'general', key: 'general', selectedKey: this.props.currentSelection, label: this.context.getMessage('ws.30'), onClick: this.setEditState }),
            React.createElement(
                PydioComponents.PaperEditorNavEntry,
                { keyName: 'driver', key: 'driver', selectedKey: this.props.currentSelection, onClick: this.setEditState },
                driverTabLabel
            ),
            firstSections,
            this.props.tplFieldsComponent,
            additionalFeatures
        );
    }

});
module.exports = exports['default'];
