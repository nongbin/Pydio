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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _metaMetaSourceForm = require('./meta/MetaSourceForm');

var _metaMetaSourceForm2 = _interopRequireDefault(_metaMetaSourceForm);

var _boardDashboard = require('./board/Dashboard');

var _boardDashboard2 = _interopRequireDefault(_boardDashboard);

var _modelWorkspace = require('./model/Workspace');

var _modelWorkspace2 = _interopRequireDefault(_modelWorkspace);

var _panelSharesList = require('./panel/SharesList');

var _panelSharesList2 = _interopRequireDefault(_panelSharesList);

var _editorTplFieldsChooser = require('./editor/TplFieldsChooser');

var _editorTplFieldsChooser2 = _interopRequireDefault(_editorTplFieldsChooser);

var _metaMetaList = require('./meta/MetaList');

var _metaMetaList2 = _interopRequireDefault(_metaMetaList);

var _panelWorkspaceSummary = require('./panel/WorkspaceSummary');

var _panelWorkspaceSummary2 = _interopRequireDefault(_panelWorkspaceSummary);

var _editorWorkspaceEditor = require('./editor/WorkspaceEditor');

var _editorWorkspaceEditor2 = _interopRequireDefault(_editorWorkspaceEditor);

window.AdminWorkspaces = {
  MetaSourceForm: _metaMetaSourceForm2['default'],
  Dashboard: _boardDashboard2['default'],
  Workspace: _modelWorkspace2['default'],
  SharesList: _panelSharesList2['default'],
  TplFieldsChooser: _editorTplFieldsChooser2['default'],
  MetaList: _metaMetaList2['default'],
  WorkspaceSummary: _panelWorkspaceSummary2['default'],
  WorkspaceEditor: _editorWorkspaceEditor2['default']
};
