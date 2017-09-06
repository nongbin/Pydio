(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ShareDialog = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

exports['default'] = function (PydioComponent) {
    var ShareContextConsumer = (function (_React$Component) {
        _inherits(ShareContextConsumer, _React$Component);

        function ShareContextConsumer() {
            _classCallCheck(this, ShareContextConsumer);

            _get(Object.getPrototypeOf(ShareContextConsumer.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(ShareContextConsumer, [{
            key: 'render',
            value: function render() {
                var _context = this.context;
                var messages = _context.messages;
                var getMessage = _context.getMessage;
                var isReadonly = _context.isReadonly;

                var contextProps = { messages: messages, getMessage: getMessage, isReadonly: isReadonly };
                return React.createElement(PydioComponent, _extends({}, this.props, contextProps));
            }
        }]);

        return ShareContextConsumer;
    })(React.Component);

    ShareContextConsumer.contextTypes = {
        messages: React.PropTypes.object,
        getMessage: React.PropTypes.func,
        isReadonly: React.PropTypes.func
    };

    return ShareContextConsumer;
};

module.exports = exports['default'];

},{"react":"react"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var React = require('react');

var _require = require('material-ui');

var TextField = _require.TextField;
var Subheader = _require.Subheader;

var LabelDescriptionPanel = React.createClass({
    displayName: 'LabelDescriptionPanel',

    updateLabel: function updateLabel(event) {
        this.props.shareModel.setGlobal("label", event.currentTarget.value);
    },

    updateDescription: function updateDescription(event) {
        this.props.shareModel.setGlobal("description", event.currentTarget.value);
    },

    render: function render() {
        var label = undefined,
            labelLegend = undefined;
        if (!this.props.shareModel.getNode().isLeaf()) {
            label = React.createElement(TextField, {
                disabled: this.props.isReadonly(),
                floatingLabelText: this.props.getMessage('35') + ' ( ' + this.props.getMessage('146') + ' )',
                floatingLabelStyle: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
                name: 'label',
                onChange: this.updateLabel,
                value: this.props.shareModel.getGlobal('label') || '',
                fullWidth: true
            });
        }
        return React.createElement(
            'div',
            { style: this.props.style },
            label,
            React.createElement(TextField, {
                disabled: this.props.isReadonly(),
                floatingLabelText: this.props.getMessage('145') + ' ( ' + this.props.getMessage('197') + ' )',
                floatingLabelStyle: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
                name: 'description',
                onChange: this.updateDescription,
                value: this.props.shareModel.getGlobal('description') || '',
                fullWidth: true
            })
        );
    }
});

exports['default'] = LabelDescriptionPanel = (0, _ShareContextConsumer2['default'])(LabelDescriptionPanel);

exports['default'] = LabelDescriptionPanel;
module.exports = exports['default'];

},{"../ShareContextConsumer":1,"material-ui":"material-ui","react":"react"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var React = require('react');

var _require = require('material-ui');

var TextField = _require.TextField;
var SelectField = _require.SelectField;
var MenuItem = _require.MenuItem;

var NotificationPanel = React.createClass({
    displayName: 'NotificationPanel',

    dropDownChange: function dropDownChange(event, index, value) {
        this.props.shareModel.setGlobal('watch', value !== 'no_watch');
    },

    render: function render() {
        var menuItems = [React.createElement(MenuItem, { value: 'no_watch', primaryText: this.props.getMessage('187') }), React.createElement(MenuItem, { value: 'watch_read', primaryText: this.props.getMessage('184') })];

        var selectedIndex = this.props.shareModel.getGlobal('watch') ? 'watch_read' : 'no_watch';

        var unusedLegend = React.createElement(
            'div',
            { className: 'form-legend' },
            this.props.getMessage('188')
        );
        return React.createElement(
            'div',
            { style: this.props.style },
            React.createElement(
                SelectField,
                {
                    disabled: this.props.isReadonly(),
                    fullWidth: true,
                    value: selectedIndex,
                    onChange: this.dropDownChange,
                    floatingLabelText: this.props.getMessage('218')
                },
                menuItems
            )
        );
    }
});

NotificationPanel = (0, _ShareContextConsumer2['default'])(NotificationPanel);
exports['default'] = NotificationPanel;
module.exports = exports['default'];

},{"../ShareContextConsumer":1,"material-ui":"material-ui","react":"react"}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _LabelDescriptionPanel = require('./LabelDescriptionPanel');

var _LabelDescriptionPanel2 = _interopRequireDefault(_LabelDescriptionPanel);

var _NotificationPanel = require('./NotificationPanel');

var _NotificationPanel2 = _interopRequireDefault(_NotificationPanel);

var _PublicLinkTemplate = require('./PublicLinkTemplate');

var _PublicLinkTemplate2 = _interopRequireDefault(_PublicLinkTemplate);

var _VisibilityPanel = require('./VisibilityPanel');

var _VisibilityPanel2 = _interopRequireDefault(_VisibilityPanel);

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var _mainCard = require('../main/Card');

var _mainCard2 = _interopRequireDefault(_mainCard);

var React = require('react');

var ShareModel = require('pydio').requireLib('ReactModelShare');

var _require = require('material-ui');

var Divider = _require.Divider;

var Panel = React.createClass({
    displayName: 'Panel',

    propTypes: {
        pydio: React.PropTypes.instanceOf(Pydio),
        shareModel: React.PropTypes.instanceOf(ShareModel)
    },

    render: function render() {

        var layoutData = ShareModel.compileLayoutData(this.props.pydio, this.props.shareModel.getNode());
        var layoutPane = undefined,
            visibilityPanel = undefined;
        var _props = this.props;
        var style = _props.style;

        var props = _objectWithoutProperties(_props, ['style']);

        if (!this.props.shareModel.getNode().isLeaf() && layoutData.length > 1 && this.props.shareModel.hasPublicLink()) {
            layoutPane = React.createElement(_PublicLinkTemplate2['default'], _extends({}, props, { linkData: this.props.shareModel.getPublicLinks()[0], layoutData: layoutData }));
        }
        if (!this.props.shareModel.currentRepoIsUserScope()) {
            visibilityPanel = React.createElement(_VisibilityPanel2['default'], _extends({}, props, { style: { paddingBottom: 16 } }));
        }
        return React.createElement(
            'div',
            null,
            React.createElement(
                _mainCard2['default'],
                { style: this.props.style, title: this.props.getMessage('486', '') },
                React.createElement(_LabelDescriptionPanel2['default'], _extends({}, props, { style: { marginTop: -10 } })),
                React.createElement(_NotificationPanel2['default'], props),
                layoutPane
            ),
            visibilityPanel
        );
    }
});

exports['default'] = Panel = (0, _ShareContextConsumer2['default'])(Panel);
exports['default'] = Panel;
module.exports = exports['default'];

},{"../ShareContextConsumer":1,"../main/Card":10,"./LabelDescriptionPanel":2,"./NotificationPanel":3,"./PublicLinkTemplate":5,"./VisibilityPanel":6,"material-ui":"material-ui","pydio":"pydio","react":"react"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var React = require('react');

var _require = require('material-ui');

var TextField = _require.TextField;
var SelectField = _require.SelectField;
var MenuItem = _require.MenuItem;

var PublicLinkTemplate = React.createClass({
    displayName: 'PublicLinkTemplate',

    propTypes: {
        linkData: React.PropTypes.object
    },

    onDropDownChange: function onDropDownChange(event, index, value) {
        this.props.shareModel.setTemplate(this.props.linkData.hash, value);
    },

    render: function render() {
        var crtLabel = undefined;
        var selected = this.props.shareModel.getTemplate(this.props.linkData.hash);
        var menuItems = this.props.layoutData.map(function (l) {
            if (selected && l.LAYOUT_ELEMENT === selected) {
                crtLabel = l.LAYOUT_LABEL;
            }
            if (!selected && !crtLabel) {
                selected = l.LAYOUT_ELEMENT, crtLabel = l.LAYOUT_LABEL;
            }
            return React.createElement(MenuItem, { key: l.LAYOUT_ELEMENT, value: l.LAYOUT_ELEMENT, primaryText: l.LAYOUT_LABEL });
        });
        var unusedLegend = React.createElement(
            'div',
            { className: 'form-legend' },
            this.props.getMessage('198')
        );
        return React.createElement(
            'div',
            { style: this.props.style },
            React.createElement(
                SelectField,
                {
                    fullWidth: true,
                    value: selected,
                    onChange: this.onDropDownChange,
                    disabled: this.props.isReadonly(),
                    floatingLabelText: this.props.getMessage('151')
                },
                menuItems
            )
        );
    }
});

PublicLinkTemplate = (0, _ShareContextConsumer2['default'])(PublicLinkTemplate);
exports['default'] = PublicLinkTemplate;
module.exports = exports['default'];

},{"../ShareContextConsumer":1,"material-ui":"material-ui","react":"react"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var _mainCard = require('../main/Card');

var _mainCard2 = _interopRequireDefault(_mainCard);

var React = require('react');

var _require = require('material-ui');

var Checkbox = _require.Checkbox;
var RaisedButton = _require.RaisedButton;
var TextField = _require.TextField;

var VisibilityPanel = React.createClass({
    displayName: 'VisibilityPanel',

    toggleVisibility: function toggleVisibility() {
        this.props.shareModel.toggleVisibility();
    },
    transferOwnership: function transferOwnership() {
        this.props.shareModel.setNewShareOwner(this.refs['newOwner'].getValue());
    },
    render: function render() {
        var currentIsOwner = this.props.shareModel.currentIsOwner();

        var legend;
        if (this.props.shareModel.isPublic()) {
            if (currentIsOwner) {
                legend = this.props.getMessage('201');
            } else {
                legend = this.props.getMessage('202');
            }
        } else {
            legend = this.props.getMessage('206');
        }
        var showToggle = React.createElement(
            'div',
            null,
            React.createElement(Checkbox, { type: 'checkbox',
                name: 'share_visibility',
                disabled: !currentIsOwner || this.props.isReadonly(),
                onCheck: this.toggleVisibility,
                checked: this.props.shareModel.isPublic(),
                label: this.props.getMessage('200')
            }),
            React.createElement(
                'div',
                { className: 'section-legend' },
                legend
            )
        );
        if (this.props.shareModel.isPublic() && currentIsOwner && !this.props.isReadonly()) {
            var showTransfer = React.createElement(
                'div',
                { className: 'ownership-form' },
                React.createElement(
                    'h4',
                    null,
                    this.props.getMessage('203')
                ),
                React.createElement(
                    'div',
                    { className: 'section-legend' },
                    this.props.getMessage('204')
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(TextField, { ref: 'newOwner', floatingLabelText: this.props.getMessage('205') }),
                    React.createElement(RaisedButton, { label: this.props.getMessage('203b'), onClick: this.transferOwnership })
                )
            );
        }
        return React.createElement(
            _mainCard2['default'],
            { style: this.props.style, title: this.props.getMessage('199') },
            showToggle,
            showTransfer
        );
    }
});

VisibilityPanel = (0, _ShareContextConsumer2['default'])(VisibilityPanel);
exports['default'] = VisibilityPanel;
module.exports = exports['default'];

},{"../ShareContextConsumer":1,"../main/Card":10,"material-ui":"material-ui","react":"react"}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mainPanel = require('./main/Panel');

var _mainPanel2 = _interopRequireDefault(_mainPanel);

var _publicField = require('./public/Field');

var _publicField2 = _interopRequireDefault(_publicField);

var _publicPanel = require('./public/Panel');

var _publicPanel2 = _interopRequireDefault(_publicPanel);

exports.MainPanel = _mainPanel2['default'];
exports.PublicLinkField = _publicField2['default'];
exports.PublicLinkPanel = _publicPanel2['default'];

},{"./main/Panel":12,"./public/Field":13,"./public/Panel":14}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var _require = require('react');

var Component = _require.Component;
var PropTypes = _require.PropTypes;

var _require2 = require('material-ui');

var IconButton = _require2.IconButton;

var _require3 = require('material-ui/styles');

var muiThemeable = _require3.muiThemeable;

var ActionButton = (function (_Component) {
    _inherits(ActionButton, _Component);

    function ActionButton() {
        _classCallCheck(this, ActionButton);

        _get(Object.getPrototypeOf(ActionButton.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(ActionButton, [{
        key: 'render',
        value: function render() {
            var palette = this.props.muiTheme.palette;

            var style = {
                root: {
                    borderRadius: '50%',
                    backgroundColor: palette.primary1Color,
                    width: 36, height: 36,
                    padding: 8,
                    margin: '0 6px',
                    zIndex: 0
                },
                icon: {
                    color: 'white',
                    fontSize: 20,
                    lineHeight: '20px'
                }
            };

            return React.createElement(IconButton, {
                style: style.root,
                iconStyle: style.icon,
                onTouchTap: this.props.callback || this.props.onTouchTap,
                iconClassName: "mdi mdi-" + this.props.mdiIcon,
                tooltip: this.props.getMessage(this.props.messageId, this.props.messageCoreNamespace ? '' : undefined)
            });
        }
    }]);

    return ActionButton;
})(Component);

ActionButton.propTypes = {
    callback: PropTypes.func,
    onTouchTap: PropTypes.func,
    mdiIcon: PropTypes.string,
    messageId: PropTypes.string
};

ActionButton = (0, _ShareContextConsumer2['default'])(ActionButton);
ActionButton = muiThemeable()(ActionButton);

exports['default'] = ActionButton;
module.exports = exports['default'];

},{"../ShareContextConsumer":1,"material-ui":"material-ui","material-ui/styles":"material-ui/styles","react":"react"}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _require = require('material-ui');

var FlatButton = _require.FlatButton;
var IconButton = _require.IconButton;

var ButtonsComputer = (function () {
    function ButtonsComputer(pydio, shareModel, buttonsUpdater, dismissCallback, getMessage) {
        var useIconButtons = arguments.length <= 5 || arguments[5] === undefined ? false : arguments[5];

        _classCallCheck(this, ButtonsComputer);

        this.pydio = pydio;
        this._buttonsUpdater = buttonsUpdater;
        this._dismissCallback = dismissCallback;
        this._shareModel = shareModel;
        this._saveDisabled = false;
        this._getMessage = getMessage;
        this._iconButtons = useIconButtons;
    }

    _createClass(ButtonsComputer, [{
        key: 'enableSave',
        value: function enableSave() {
            this._saveDisabled = false;
            this.modelUpdated();
        }
    }, {
        key: 'disableSave',
        value: function disableSave() {
            this._saveDisabled = true;
            this.modelUpdated();
        }
    }, {
        key: 'triggerModelSave',
        value: function triggerModelSave() {
            this._shareModel.save();
        }
    }, {
        key: 'triggerModelRevert',
        value: function triggerModelRevert() {
            this._shareModel.revertChanges();
        }
    }, {
        key: 'disableAllShare',
        value: function disableAllShare() {
            this._shareModel.stopSharing(this._dismissCallback.bind(this));
        }
    }, {
        key: 'modelUpdated',
        value: function modelUpdated() {
            this._buttonsUpdater(this.getButtons());
        }
    }, {
        key: 'start',
        value: function start() {
            this._modelObserver = this.modelUpdated.bind(this);
            this._disableSaveObserver = this.disableSave.bind(this);
            this._enableSaveObserver = this.enableSave.bind(this);
            this._shareModel.observe("status_changed", this._modelObserver);
            this._shareModel.observe('saving', this._disableSaveObserver);
            this._shareModel.observe('saved', this._enableSaveObserver);
        }
    }, {
        key: 'stop',
        value: function stop() {
            this._shareModel.stopObserving("status_changed", this._modelObserver);
            this._shareModel.stopObserving('saving', this._disableSaveObserver);
            this._shareModel.stopObserving('saved', this._enableSaveObserver);
        }
    }, {
        key: 'getButtons',
        value: function getButtons() {
            var buttons = [];
            var ic = this._iconButtons;
            if (this._shareModel.getStatus() == 'modified') {
                if (ic) {
                    buttons.push(React.createElement(IconButton, { iconClassName: 'mdi mdi-undo-variant', onTouchTap: this.triggerModelRevert.bind(this), tooltip: this._getMessage('179') }));
                    buttons.push(React.createElement(IconButton, { iconClassName: 'mdi mdi-check', secondary: true, disabled: this._saveDisabled, tooltip: this._getMessage('53', ''), onTouchTap: this.triggerModelSave.bind(this) }));
                    buttons.push(React.createElement(IconButton, { iconClassName: 'mdi mdi-close', secondary: false, tooltip: this._getMessage('86', ''), onTouchTap: this._dismissCallback.bind(this) }));
                } else {
                    buttons.push(React.createElement(
                        'a',
                        { style: { cursor: 'pointer', color: 'rgba(0,0,0,0.53)' }, onClick: this.triggerModelRevert.bind(this) },
                        this._getMessage('179')
                    ));
                    buttons.push(React.createElement(FlatButton, { secondary: true, disabled: this._saveDisabled, label: this._getMessage('53', ''), onTouchTap: this.triggerModelSave.bind(this) }));
                    buttons.push(React.createElement(FlatButton, { secondary: false, label: this._getMessage('86', ''), onTouchTap: this._dismissCallback.bind(this) }));
                }
            } else {
                if (this._shareModel.hasActiveShares() && this._shareModel.currentIsOwner() || this._shareModel.getStatus() === 'error' || this.pydio.user.activeRepository === "ajxp_conf") {
                    if (ic) {
                        buttons.push(React.createElement(IconButton, { iconClassName: 'mdi mdi-cancel', disabled: this._saveDisabled, secondary: true, tooltip: this._getMessage('6'), onTouchTap: this.disableAllShare.bind(this) }));
                    } else {
                        buttons.push(React.createElement(FlatButton, { disabled: this._saveDisabled, secondary: true, label: this._getMessage('6'), onTouchTap: this.disableAllShare.bind(this) }));
                    }
                }
                if (ic) {
                    buttons.push(React.createElement(IconButton, { iconClassName: 'mdi mdi-close', secondary: false, tooltip: this._getMessage('86', ''), onTouchTap: this._dismissCallback.bind(this) }));
                } else {
                    buttons.push(React.createElement(FlatButton, { secondary: false, label: this._getMessage('86', ''), onTouchTap: this._dismissCallback.bind(this) }));
                }
            }
            return buttons;
        }
    }]);

    return ButtonsComputer;
})();

exports['default'] = ButtonsComputer;
module.exports = exports['default'];

},{"material-ui":"material-ui"}],10:[function(require,module,exports){
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

var _require2 = require('material-ui');

var Paper = _require2.Paper;

var Card = (function (_Component) {
    _inherits(Card, _Component);

    function Card() {
        _classCallCheck(this, Card);

        _get(Object.getPrototypeOf(Card.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Card, [{
        key: 'render',
        value: function render() {

            var style = {
                panel: _extends({
                    padding: 16,
                    margin: 10
                }, this.props.style),
                title: _extends({
                    paddingTop: 0,
                    fontSize: 18
                }, this.props.titleStyle)
            };

            return React.createElement(
                Paper,
                { zDepth: 1, rounded: false, style: style.panel },
                this.props.title && React.createElement(
                    'h3',
                    { style: style.title },
                    this.props.title
                ),
                this.props.children,
                this.props.actions && React.createElement(
                    'div',
                    { style: { textAlign: 'center', clear: 'both', position: 'relative', padding: '10px 0' } },
                    this.props.actions
                )
            );
        }
    }]);

    return Card;
})(Component);

exports['default'] = Card;
module.exports = exports['default'];

},{"material-ui":"material-ui","react":"react"}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var React = require('react');

var _require = require('react-textfit');

var Textfit = _require.Textfit;

var _require2 = require('material-ui/styles');

var muiThemeable = _require2.muiThemeable;

var PathUtils = require('pydio/util/path');

var HeaderPanel = React.createClass({
    displayName: 'HeaderPanel',

    render: function render() {

        if (this.props.noModal) {
            return null;
        }
        var nodePath = this.props.shareModel.getNode().getPath();
        return React.createElement(
            'div',
            { className: 'headerPanel', style: { backgroundColor: this.props.muiTheme.palette.primary1Color } },
            React.createElement(
                Textfit,
                { mode: 'single', max: 30 },
                this.props.getMessage('44').replace('%s', PathUtils.getBasename(nodePath))
            )
        );
    }
});

exports['default'] = HeaderPanel = (0, _ShareContextConsumer2['default'])(HeaderPanel);
exports['default'] = HeaderPanel = muiThemeable()(HeaderPanel);

exports['default'] = HeaderPanel;
module.exports = exports['default'];

},{"../ShareContextConsumer":1,"material-ui/styles":"material-ui/styles","pydio/util/path":"pydio/util/path","react":"react","react-textfit":"react-textfit"}],12:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _publicPanel = require('../public/Panel');

var _publicPanel2 = _interopRequireDefault(_publicPanel);

var _usersPanel = require('../users/Panel');

var _usersPanel2 = _interopRequireDefault(_usersPanel);

var _advancedPanel = require('../advanced/Panel');

var _advancedPanel2 = _interopRequireDefault(_advancedPanel);

var _ButtonsComputer = require('./ButtonsComputer');

var _ButtonsComputer2 = _interopRequireDefault(_ButtonsComputer);

var React = require('react');

var _require = require('material-ui');

var Tabs = _require.Tabs;
var Tab = _require.Tab;
var Toggle = _require.Toggle;

var _require$requireLib = require('pydio').requireLib('boot');

var ActionDialogMixin = _require$requireLib.ActionDialogMixin;

var ShareModel = require('pydio').requireLib('ReactModelShare');

var _require$requireLib2 = require('pydio').requireLib('hoc');

var PaletteModifier = _require$requireLib2.PaletteModifier;

var MainPanel = React.createClass({
    displayName: 'MainPanel',

    mixins: [ActionDialogMixin],

    getDefaultProps: function getDefaultProps() {
        return {
            dialogTitle: '',
            dialogIsModal: false,
            dialogPadding: false
        };
    },

    propTypes: {
        pydio: React.PropTypes.instanceOf(Pydio).isRequired,
        selection: React.PropTypes.instanceOf(PydioDataModel).isRequired,
        readonly: React.PropTypes.bool
    },

    childContextTypes: {
        messages: React.PropTypes.object,
        getMessage: React.PropTypes.func,
        isReadonly: React.PropTypes.func
    },

    getChildContext: function getChildContext() {
        var messages = this.props.pydio.MessageHash;
        return {
            messages: messages,
            getMessage: function getMessage(messageId) {
                var namespace = arguments.length <= 1 || arguments[1] === undefined ? 'share_center' : arguments[1];

                try {
                    return messages[namespace + (namespace ? "." : "") + messageId] || messageId;
                } catch (e) {
                    return messageId;
                }
            },
            isReadonly: (function () {
                return this.props.readonly;
            }).bind(this)
        };
    },

    modelUpdated: function modelUpdated(eventData) {
        var _this = this;

        if (this.isMounted()) {
            var modelFirstLoad = this.state.modelFirstLoad;

            var afterState = undefined;
            if (modelFirstLoad) {
                afterState = function () {
                    _this.setState({ modelFirstLoad: false });
                };
            }
            this.setState({
                status: eventData.status,
                model: eventData.model
            }, afterState);
        }
    },

    getInitialState: function getInitialState() {
        return {
            status: 'idle',
            mailerData: false,
            model: new ShareModel(this.props.pydio, this.props.selection.getUniqueNode(), this.props.selection),
            modelFirstLoad: true
        };
    },

    componentDidMount: function componentDidMount() {
        this.state.model.observe("status_changed", this.modelUpdated);
        this.state.model.initLoad();
    },

    componentWillUnmount: function componentWillUnmount() {
        if (this.buttonsComputer) this.buttonsComputer.stop();
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var _this2 = this;

        if (nextProps.selection && nextProps.selection !== this.props.selection) {
            var nextModel = new ShareModel(this.props.pydio, nextProps.selection.getUniqueNode(), nextProps.selection);
            this.setState({ model: nextModel, status: 'idle', mailerData: false }, function () {
                _this2.componentDidMount();
            });
        }
    },

    getButtons: function getButtons(updater) {

        this.buttonsComputer = new _ButtonsComputer2['default'](this.props.pydio, this.state.model, updater, this.dismiss, this.getMessage, this.props.noModal);
        this.buttonsComputer.start();
        return this.buttonsComputer.getButtons();
    },

    showMailer: function showMailer(subject, message) {
        var users = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
        var hash = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

        if (ShareModel.forceMailerOldSchool()) {
            subject = encodeURIComponent(subject);
            global.location.href = "mailto:custom-email@domain.com?Subject=" + subject + "&Body=" + message;
            return;
        }
        var linkData = hash ? this.state.model.getLinkData(hash) : undefined;
        global.ResourcesManager.loadClassesAndApply(['PydioMailer'], (function () {
            this.setState({
                mailerData: {
                    subject: subject,
                    message: message,
                    users: users,
                    hash: hash,
                    enableIdentification: linkData && linkData.target_users,
                    crippleIdentificationKeys: true,
                    identifiedOnly: linkData && linkData.restrict_to_target_users
                }
            });
        }).bind(this));
    },

    toggleMailerData: function toggleMailerData(data) {
        this.setState({ mailerData: _extends({}, this.state.mailerData, data) });
    },

    dismissMailer: function dismissMailer() {
        this.setState({ mailerData: false });
    },

    mailerProcessPost: function mailerProcessPost(Email, users, subject, message, link, callback) {
        var _state = this.state;
        var model = _state.model;
        var mailerData = _state.mailerData;
        var crippleIdentificationKeys = mailerData.crippleIdentificationKeys;
        var identifiedOnly = mailerData.identifiedOnly;
        var hash = mailerData.hash;

        var client = PydioApi.getClient();
        var shareLabels = {},
            shareMails = {};
        Object.keys(users).forEach(function (u) {
            var k = crippleIdentificationKeys ? Math.random().toString(36).substring(7) : u;
            shareLabels[k] = users[u].getLabel();
            shareMails[k] = u;
        });
        // Store keys
        client.request({
            get_action: 'share_link_update_target_users',
            hash: hash,
            json_users: JSON.stringify(shareLabels),
            restrict: identifiedOnly ? 'true' : 'false'
        }, function () {
            var email = new Email();
            var originalLink = model.getPublicLink(hash);
            var regexp = new RegExp(originalLink, 'g');
            Object.keys(shareMails).forEach(function (u) {
                var newLink = originalLink + '?u=' + u;
                var newMessage = message.replace(regexp, newLink);
                email.addTarget(shareMails[u], subject, newMessage);
            });
            email.post(function (res) {
                if (res) {
                    model.load(true); // Reload data
                }
                callback(res);
            });
        });
    },

    getMessage: function getMessage(key) {
        var namespace = arguments.length <= 1 || arguments[1] === undefined ? 'share_center' : arguments[1];

        return this.props.pydio.MessageHash[namespace + (namespace ? '.' : '') + key];
    },

    render: function render() {
        var _this3 = this;

        var _state2 = this.state;
        var model = _state2.model;
        var modelFirstLoad = _state2.modelFirstLoad;

        var buttonStyle = { textTransform: 'none' };
        var showMailer = ShareModel.mailerActive() ? this.showMailer : null;
        var auth = ShareModel.getAuthorizations(this.props.pydio);
        var panels = [],
            hasPublicLink = undefined,
            initialSelectedIndex = undefined;

        if (model.getNode().isLeaf() && auth.file_public_link || !model.getNode().isLeaf() && auth.folder_public_link) {
            var publicLinks = model.getPublicLinks();
            var linkData = undefined;
            if (publicLinks.length) {
                linkData = publicLinks[0];
            }
            var pubLabel = this.getMessage(121);
            if (model.hasPublicLink()) {
                pubLabel = React.createElement(
                    'span',
                    null,
                    pubLabel,
                    ' ',
                    React.createElement('span', { className: 'mdi mdi-check' })
                );
                hasPublicLink = true;
            }
            panels.push(React.createElement(
                Tab,
                { key: 'public-link', value: 'public-link', label: pubLabel, buttonStyle: buttonStyle },
                React.createElement(_publicPanel2['default'], {
                    showMailer: showMailer,
                    linkData: linkData,
                    pydio: this.props.pydio,
                    shareModel: model,
                    authorizations: auth,
                    style: { height: '100%', overflowY: 'auto' }
                })
            ));
        }
        if (model.getNode().isLeaf() && auth.file_workspaces || !model.getNode().isLeaf() && auth.folder_workspaces) {
            var totalUsers = model.getSharedUsers().length + model.getOcsLinks().length;
            panels.push(React.createElement(
                Tab,
                { key: 'target-users', value: 'target-users', label: this.getMessage(249, '') + (totalUsers ? ' (' + totalUsers + ')' : ''), buttonStyle: buttonStyle },
                React.createElement(_usersPanel2['default'], {
                    showMailer: showMailer,
                    shareModel: model,
                    pydio: this.props.pydio,
                    style: { height: '100%', overflowY: 'auto' }
                })
            ));
            if (modelFirstLoad && !hasPublicLink && totalUsers) {
                initialSelectedIndex = 'target-users';
            }
        }
        if (panels.length > 0) {
            panels.push(React.createElement(
                Tab,
                { key: 'share-permissions', value: 'share-permissions', label: this.getMessage(486, ''), buttonStyle: buttonStyle },
                React.createElement(_advancedPanel2['default'], {
                    showMailer: showMailer,
                    pydio: this.props.pydio,
                    shareModel: model,
                    style: { height: '100%', overflowY: 'auto' }
                })
            ));
        }
        var mailer = undefined;
        if (this.state.mailerData) {
            var mailerData = this.state.mailerData;

            var customizeMessagePane = undefined;
            if (mailerData.hash) {
                var style = mailerData.enableIdentification ? { padding: '10px 20px', backgroundColor: '#ECEFF1' } : { padding: '10px 20px 0' };
                var letUserChooseCripple = this.props.pydio.getPluginConfigs('action.share').get('EMAIL_PERSONAL_LINK_SEND_CLEAR');
                customizeMessagePane = React.createElement(
                    'div',
                    { style: style },
                    React.createElement(Toggle, { label: this.getMessage(235), toggled: mailerData.enableIdentification, onToggle: function (e, c) {
                            _this3.toggleMailerData({ enableIdentification: c });
                        } }),
                    mailerData.enableIdentification && React.createElement(Toggle, { label: "-- " + this.getMessage(236), toggled: mailerData.identifiedOnly, onToggle: function (e, c) {
                            _this3.toggleMailerData({ identifiedOnly: c });
                        } }),
                    mailerData.enableIdentification && letUserChooseCripple && React.createElement(Toggle, { label: "-- " + this.getMessage(237), toggled: mailerData.crippleIdentificationKeys, onToggle: function (e, c) {
                            _this3.toggleMailerData({ crippleIdentificationKeys: c });
                        } })
                );
            }
            mailer = React.createElement(PydioMailer.Pane, _extends({}, mailerData, {
                onDismiss: this.dismissMailer,
                overlay: true,
                className: 'share-center-mailer',
                panelTitle: this.props.pydio.MessageHash["share_center.45"],
                additionalPaneTop: customizeMessagePane,
                processPost: mailerData.enableIdentification ? this.mailerProcessPost : null
            }));
        }

        return React.createElement(Content, _extends({}, this.props, {
            model: this.state.model,
            panels: panels,
            mailer: mailer,
            initialSelectedIndex: initialSelectedIndex
        }));
    }

});

var Content = (function (_React$Component) {
    _inherits(Content, _React$Component);

    function Content() {
        _classCallCheck(this, Content);

        _get(Object.getPrototypeOf(Content.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Content, [{
        key: 'render',
        value: function render() {

            var tabStyles = {
                style: {
                    flexGrow: 1,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                },
                tabItemContainerStyle: {
                    flexShrink: 0
                },
                contentContainerStyle: {
                    flexGrow: 1,
                    overflowY: 'auto'
                },
                tabTemplateStyle: {
                    height: '100%',
                    backgroundColor: '#fafafa'
                }
            };

            return React.createElement(
                'div',
                { className: 'react_share_form', style: _extends({ width: 420, display: 'flex', flexDirection: 'column' }, this.props.style) },
                React.createElement(_Header2['default'], _extends({}, this.props, { shareModel: this.props.model })),
                React.createElement(
                    Tabs,
                    _extends({ value: this.props.initialSelectedIndex }, tabStyles),
                    this.props.panels
                ),
                this.props.mailer
            );
        }
    }]);

    return Content;
})(React.Component);

Content = PaletteModifier({ primary1Color: '#4aceb0' })(Content);

exports['default'] = MainPanel;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../advanced/Panel":4,"../public/Panel":14,"../users/Panel":18,"./ButtonsComputer":9,"./Header":11,"material-ui":"material-ui","pydio":"pydio","react":"react"}],13:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var _TargetedUsers = require('./TargetedUsers');

var _TargetedUsers2 = _interopRequireDefault(_TargetedUsers);

var _mainActionButton = require('../main/ActionButton');

var _mainActionButton2 = _interopRequireDefault(_mainActionButton);

var React = require('react');

var _require = require('material-ui');

var RaisedButton = _require.RaisedButton;
var FloatingActionButton = _require.FloatingActionButton;
var TextField = _require.TextField;
var Paper = _require.Paper;

var ShareModel = require('pydio').requireLib('ReactModelShare');
var QRCode = require('qrcode.react');
var Clipboard = require('clipboard');

var PathUtils = require('pydio/util/path');
var LangUtils = require('pydio/util/lang');

var PublicLinkField = React.createClass({
    displayName: 'PublicLinkField',

    propTypes: {
        linkData: React.PropTypes.object.isRequired,
        shareModel: React.PropTypes.instanceOf(ShareModel),
        editAllowed: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        showMailer: React.PropTypes.func
    },
    getInitialState: function getInitialState() {
        return { editLink: false, copyMessage: '', showQRCode: false };
    },
    toggleEditMode: function toggleEditMode() {
        if (this.state.editLink && this.state.customLink) {
            this.props.shareModel.updateCustomLink(this.props.linkData.hash, this.state.customLink);
        }
        this.setState({ editLink: !this.state.editLink });
    },
    changeLink: function changeLink(event) {
        var value = event.target.value;
        value = LangUtils.computeStringSlug(value);
        this.setState({ customLink: value });
    },
    clearCopyMessage: function clearCopyMessage() {
        global.setTimeout((function () {
            this.setState({ copyMessage: '' });
        }).bind(this), 5000);
    },

    attachClipboard: function attachClipboard() {
        this.detachClipboard();
        if (this.refs['copy-button']) {
            this._clip = new Clipboard(this.refs['copy-button'], {
                text: (function (trigger) {
                    return this.props.linkData['public_link'];
                }).bind(this)
            });
            this._clip.on('success', (function () {
                this.setState({ copyMessage: this.props.getMessage('192') }, this.clearCopyMessage);
            }).bind(this));
            this._clip.on('error', (function () {
                var copyMessage = undefined;
                if (global.navigator.platform.indexOf("Mac") === 0) {
                    copyMessage = this.props.getMessage('144');
                } else {
                    copyMessage = this.props.getMessage('143');
                }
                this.refs['public-link-field'].focus();
                this.setState({ copyMessage: copyMessage }, this.clearCopyMessage);
            }).bind(this));
        }
    },
    detachClipboard: function detachClipboard() {
        if (this._clip) {
            this._clip.destroy();
        }
    },

    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
        this.attachClipboard();
    },

    componentDidMount: function componentDidMount() {
        this.attachClipboard();
    },

    componentWillUnmount: function componentWillUnmount() {
        this.detachClipboard();
    },

    openMailer: function openMailer() {
        var mailData = this.props.shareModel.prepareEmail("link", this.props.linkData.hash);
        this.props.showMailer(mailData.subject, mailData.message, [], this.props.linkData.hash);
    },

    toggleQRCode: function toggleQRCode() {
        this.setState({ showQRCode: !this.state.showQRCode });
    },

    render: function render() {
        var publicLink = this.props.linkData['public_link'];
        var editAllowed = this.props.editAllowed && !this.props.linkData['hash_is_shorten'] && !this.props.isReadonly() && this.props.shareModel.currentIsOwner();
        if (this.state.editLink && editAllowed) {
            return React.createElement(
                Paper,
                { zDepth: 0, rounded: false, className: "public-link-container edit-link" },
                React.createElement(
                    'div',
                    { style: { display: 'flex', alignItems: 'center' } },
                    React.createElement(
                        'span',
                        { style: { fontSize: 16, color: 'rgba(0,0,0,0.4)', display: 'inline-block', maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } },
                        PathUtils.getDirname(publicLink) + '/ '
                    ),
                    React.createElement(TextField, { style: { flex: 1, marginRight: 10, marginLeft: 10 }, onChange: this.changeLink, value: this.state.customLink !== undefined ? this.state.customLink : this.props.linkData['hash'] }),
                    React.createElement(FloatingActionButton, { mini: true, iconClassName: 'mdi mdi-check', onTouchTap: this.toggleEditMode })
                ),
                React.createElement(
                    'div',
                    { className: 'section-legend' },
                    this.props.getMessage('194')
                )
            );
        } else {
            var copyButton = React.createElement('span', { ref: 'copy-button', className: 'copy-link-button mdi mdi-content-copy', title: this.props.getMessage('191') });
            var setHtml = (function () {
                return { __html: this.state.copyMessage };
            }).bind(this);
            var _focus = function _focus(e) {
                e.target.select();
            };
            var actionLinks = [],
                qrCode = undefined;
            if (this.props.showMailer) {
                actionLinks.push(React.createElement(_mainActionButton2['default'], { key: 'outline', callback: this.openMailer, mdiIcon: 'email-outline', messageId: '45' }));
            }
            if (editAllowed) {
                actionLinks.push(React.createElement(_mainActionButton2['default'], { key: 'pencil', callback: this.toggleEditMode, mdiIcon: 'pencil', messageId: "193" }));
            }
            if (ShareModel.qrcodeEnabled()) {
                actionLinks.push(React.createElement(_mainActionButton2['default'], { key: 'qrcode', callback: this.toggleQRCode, mdiIcon: 'qrcode', messageId: '94' }));
            }
            if (actionLinks.length) {
                actionLinks = React.createElement(
                    'div',
                    { className: 'additional-actions-links' },
                    actionLinks
                );
            } else {
                actionLinks = null;
            }
            if (this.state.showQRCode) {
                qrCode = React.createElement(
                    'div',
                    { className: 'qrCode' },
                    React.createElement(QRCode, { size: 128, value: publicLink, level: 'Q' })
                );
            }
            return React.createElement(
                Paper,
                { zDepth: 0, rounded: false, className: 'public-link-container' },
                React.createElement(
                    'div',
                    { style: { position: 'relative' } },
                    React.createElement(TextField, {
                        className: "public-link" + (this.props.linkData['is_expired'] ? ' link-expired' : ''),
                        type: 'text',
                        name: 'Link',
                        ref: 'public-link-field',
                        value: publicLink,
                        onFocus: _focus,
                        fullWidth: true
                    }),
                    ' ',
                    copyButton
                ),
                React.createElement('div', { style: { textAlign: 'center' }, className: 'section-legend', dangerouslySetInnerHTML: setHtml() }),
                this.props.linkData.target_users && React.createElement(_TargetedUsers2['default'], this.props),
                actionLinks,
                qrCode
            );
        }
    }
});

exports['default'] = PublicLinkField = (0, _ShareContextConsumer2['default'])(PublicLinkField);
exports['default'] = PublicLinkField;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../ShareContextConsumer":1,"../main/ActionButton":8,"./TargetedUsers":17,"clipboard":"clipboard","material-ui":"material-ui","pydio":"pydio","pydio/util/lang":"pydio/util/lang","pydio/util/path":"pydio/util/path","qrcode.react":"qrcode.react","react":"react"}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _Permissions = require('./Permissions');

var _Permissions2 = _interopRequireDefault(_Permissions);

var _SecureOptions = require('./SecureOptions');

var _SecureOptions2 = _interopRequireDefault(_SecureOptions);

var _mainCard = require('../main/Card');

var _mainCard2 = _interopRequireDefault(_mainCard);

var React = require('react');

var _require$requireLib = require('pydio').requireLib('form');

var ValidPassword = _require$requireLib.ValidPassword;

var _require = require('material-ui');

var RaisedButton = _require.RaisedButton;
var Checkbox = _require.Checkbox;
var Divider = _require.Divider;

var PublicLinkPanel = React.createClass({
    displayName: 'PublicLinkPanel',

    propTypes: {
        linkData: React.PropTypes.object,
        pydio: React.PropTypes.instanceOf(Pydio),
        shareModel: React.PropTypes.instanceOf(ReactModel.Share),
        authorizations: React.PropTypes.object,
        showMailer: React.PropTypes.func
    },

    disableSave: function disableSave() {
        this.setState({ disabled: true });
    },
    enableSave: function enableSave() {
        this.setState({ disabled: false });
    },
    componentDidMount: function componentDidMount() {
        this.props.shareModel.observe('saving', this.disableSave);
        this.props.shareModel.observe('saved', this.enableSave);
    },
    componendWillUnmount: function componendWillUnmount() {
        this.props.shareModel.stopObserving('saving', this.disableSave);
        this.props.shareModel.stopObserving('saved', this.enableSave);
    },

    toggleLink: function toggleLink() {
        var publicLinks = this.props.shareModel.getPublicLinks();
        if (this.state.showTemporaryPassword) {
            this.setState({ showTemporaryPassword: false, temporaryPassword: null });
        } else if (!publicLinks.length && ReactModel.Share.getAuthorizations(this.props.pydio).password_mandatory) {
            this.setState({ showTemporaryPassword: true, temporaryPassword: '' });
        } else {
            this.props.shareModel.togglePublicLink();
        }
    },

    getInitialState: function getInitialState() {
        return { showTemporaryPassword: false, temporaryPassword: null, disabled: false };
    },

    updateTemporaryPassword: function updateTemporaryPassword(value, event) {
        if (value == undefined) value = event.currentTarget.getValue();
        this.setState({ temporaryPassword: value });
    },

    enableLinkWithPassword: function enableLinkWithPassword() {
        this.props.shareModel.enablePublicLinkWithPassword(this.state.temporaryPassword);
        this.setState({ showTemporaryPassword: false, temporaryPassword: null });
    },

    render: function render() {

        var publicLinkPanes = undefined,
            publicLinkField = undefined;
        if (this.props.linkData) {
            publicLinkField = React.createElement(_Field2['default'], {
                showMailer: this.props.showMailer,
                linkData: this.props.linkData,
                shareModel: this.props.shareModel,
                editAllowed: this.props.authorizations.editable_hash,
                key: 'public-link'
            });
            publicLinkPanes = [React.createElement(_Permissions2['default'], {
                linkData: this.props.linkData,
                shareModel: this.props.shareModel,
                key: 'public-perm'
            }), React.createElement(_SecureOptions2['default'], {
                linkData: this.props.linkData,
                shareModel: this.props.shareModel,
                pydio: this.props.pydio,
                key: 'public-secure'
            })];
        } else if (this.state.showTemporaryPassword) {
            publicLinkField = React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'section-legend', style: { marginTop: 20 } },
                    this.props.getMessage('215')
                ),
                React.createElement(
                    'div',
                    { style: { display: 'flex', alignItems: 'baseline' } },
                    React.createElement(
                        'div',
                        { style: { flex: 1 } },
                        React.createElement(ValidPassword, {
                            attributes: { label: this.props.getMessage('23') },
                            value: this.state.temporaryPassword,
                            onChange: this.updateTemporaryPassword
                        })
                    ),
                    React.createElement(
                        'div',
                        { style: { marginLeft: 7, marginTop: 26 } },
                        React.createElement(RaisedButton, { label: this.props.getMessage('92'), secondary: true, onClick: this.enableLinkWithPassword })
                    )
                )
            );
        } else {
            publicLinkField = React.createElement(
                'div',
                { className: 'section-legend', style: { paddingBottom: 16, paddingTop: 16 } },
                this.props.getMessage('190')
            );
        }
        var checked = !!this.props.linkData;
        var disableForNotOwner = false;
        if (checked && !this.props.shareModel.currentIsOwner()) {
            disableForNotOwner = true;
        }
        return React.createElement(
            'div',
            { style: this.props.style },
            React.createElement(
                _mainCard2['default'],
                null,
                React.createElement(Checkbox, {
                    disabled: this.props.isReadonly() || disableForNotOwner || this.state.disabled,
                    onCheck: this.toggleLink,
                    checked: !!this.props.linkData || this.state.showTemporaryPassword,
                    label: this.props.getMessage('189'),
                    labelStyle: { fontSize: 18 }
                }),
                publicLinkField
            ),
            publicLinkPanes
        );
    }
});

exports['default'] = PublicLinkPanel = (0, _ShareContextConsumer2['default'])(PublicLinkPanel);
exports['default'] = PublicLinkPanel;
module.exports = exports['default'];

},{"../ShareContextConsumer":1,"../main/Card":10,"./Field":13,"./Permissions":15,"./SecureOptions":16,"material-ui":"material-ui","pydio":"pydio","react":"react"}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var _mainCard = require('../main/Card');

var _mainCard2 = _interopRequireDefault(_mainCard);

var React = require('react');

var _require = require('material-ui');

var Checkbox = _require.Checkbox;
var Paper = _require.Paper;

var ShareModel = require('pydio').requireLib('ReactModelShare');

var PublicLinkPermissions = React.createClass({
    displayName: 'PublicLinkPermissions',

    propTypes: {
        linkData: React.PropTypes.object.isRequired,
        shareModel: React.PropTypes.instanceOf(ShareModel),
        style: React.PropTypes.object
    },

    changePermission: function changePermission(event) {
        var name = event.target.name;
        var checked = event.target.checked;
        this.props.shareModel.setPublicLinkPermission(this.props.linkData.hash, name, checked);
    },

    render: function render() {
        var linkId = this.props.linkData.hash;
        var perms = [],
            previewWarning;
        var currentIsFolder = !this.props.shareModel.getNode().isLeaf();
        perms.push({
            NAME: 'read',
            LABEL: this.props.getMessage('72'),
            DISABLED: currentIsFolder && !this.props.shareModel.getPublicLinkPermission(linkId, 'write')
        });
        perms.push({
            NAME: 'download',
            LABEL: this.props.getMessage('73')
        });
        if (currentIsFolder) {
            perms.push({
                NAME: 'write',
                LABEL: this.props.getMessage('74')
            });
        } else if (this.props.shareModel.fileHasWriteableEditors()) {
            perms.push({
                NAME: 'write',
                LABEL: this.props.getMessage('74b')
            });
        }
        if (this.props.shareModel.isPublicLinkPreviewDisabled() && this.props.shareModel.getPublicLinkPermission(linkId, 'read')) {
            previewWarning = React.createElement(
                'div',
                null,
                this.props.getMessage('195')
            );
        }
        return React.createElement(
            _mainCard2['default'],
            { title: this.props.getMessage('71'), style: this.props.style },
            React.createElement(
                'div',
                { className: 'section-legend' },
                this.props.getMessage('70r')
            ),
            React.createElement(
                'div',
                { style: { margin: '10px 0 20px' }, className: 'ie_material_checkbox_fix' },
                perms.map((function (p) {
                    return React.createElement(
                        'div',
                        { key: p.NAME, style: { display: 'inline-block', width: '33%' } },
                        React.createElement(Checkbox, {
                            disabled: p.DISABLED || this.props.isReadonly(),
                            type: 'checkbox',
                            name: p.NAME,
                            label: p.LABEL,
                            onCheck: this.changePermission,
                            checked: this.props.shareModel.getPublicLinkPermission(linkId, p.NAME),
                            labelStyle: { whiteSpace: 'nowrap' }
                        })
                    );
                }).bind(this)),
                previewWarning
            )
        );
    }
});

exports['default'] = PublicLinkPermissions = (0, _ShareContextConsumer2['default'])(PublicLinkPermissions);
exports['default'] = PublicLinkPermissions;
module.exports = exports['default'];

},{"../ShareContextConsumer":1,"../main/Card":10,"material-ui":"material-ui","pydio":"pydio","react":"react"}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var _mainCard = require('../main/Card');

var _mainCard2 = _interopRequireDefault(_mainCard);

var React = require('react');

var _require = require('material-ui');

var FlatButton = _require.FlatButton;
var TextField = _require.TextField;
var DatePicker = _require.DatePicker;

var _require$requireLib = require('pydio').requireLib('form');

var ValidPassword = _require$requireLib.ValidPassword;

var ShareModel = require('pydio').requireLib('ReactModelShare');

var PublicLinkSecureOptions = React.createClass({
    displayName: 'PublicLinkSecureOptions',

    propTypes: {
        linkData: React.PropTypes.object.isRequired,
        shareModel: React.PropTypes.instanceOf(ShareModel),
        style: React.PropTypes.object
    },

    updateDLExpirationField: function updateDLExpirationField(event) {
        var newValue = event.currentTarget.value;
        if (parseInt(newValue) < 0) newValue = -parseInt(newValue);
        this.props.shareModel.setExpirationFor(this.props.linkData.hash, "downloads", newValue);
    },

    updateDaysExpirationField: function updateDaysExpirationField(event, newValue) {
        if (!newValue) {
            newValue = event.currentTarget.getValue();
        }
        this.props.shareModel.setExpirationFor(this.props.linkData.hash, "days", newValue);
    },

    onDateChange: function onDateChange(event, value) {
        var today = new Date();
        var date1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
        var date2 = Date.UTC(value.getFullYear(), value.getMonth(), value.getDate());
        var ms = Math.abs(date1 - date2);
        var integerVal = Math.floor(ms / 1000 / 60 / 60 / 24); //floor should be unnecessary, but just in case
        this.updateDaysExpirationField(event, integerVal);
    },

    resetPassword: function resetPassword() {
        this.props.shareModel.resetPassword(this.props.linkData.hash);
    },

    updatePassword: function updatePassword(newValue, oldValue) {
        this.props.shareModel.updatePassword(this.props.linkData.hash, newValue);
    },

    renderPasswordContainer: function renderPasswordContainer() {
        var linkId = this.props.linkData.hash;
        var passwordField;
        if (this.props.shareModel.hasHiddenPassword(linkId)) {
            var resetPassword = React.createElement(FlatButton, {
                disabled: this.props.isReadonly(),
                secondary: true,
                onClick: this.resetPassword,
                label: this.props.getMessage('174')
            });
            passwordField = React.createElement(TextField, {
                floatingLabelText: this.props.getMessage('23'),
                disabled: true,
                value: '********',
                onChange: this.updatePassword,
                fullWidth: true
            });
        } else if (!this.props.isReadonly()) {
            passwordField = React.createElement(ValidPassword, {
                name: 'share-password',
                attributes: { label: this.props.getMessage('23') },
                value: this.props.shareModel.getPassword(linkId),
                onChange: this.updatePassword
            });
        }
        if (passwordField) {
            return React.createElement(
                'div',
                { className: 'password-container', style: { display: 'flex', alignItems: 'baseline', marginBottom: 10 } },
                React.createElement('span', { className: 'ajxp_icon_span mdi mdi-file-lock' }),
                React.createElement(
                    'div',
                    { style: { width: resetPassword ? '50%' : '100%', display: 'inline-block' } },
                    passwordField
                ),
                resetPassword && React.createElement(
                    'div',
                    { style: { width: '50%', display: 'inline-block' } },
                    resetPassword
                )
            );
        } else {
            return null;
        }
    },

    formatDate: function formatDate(dateObject) {
        var dateFormatDay = this.props.getMessage('date_format', '').split(' ').shift();
        return dateFormatDay.replace('Y', dateObject.getFullYear()).replace('m', dateObject.getMonth() + 1).replace('d', dateObject.getDate());
    },

    render: function render() {
        var linkId = this.props.linkData.hash;
        var passContainer = this.renderPasswordContainer();
        var crtLinkDLAllowed = this.props.shareModel.getPublicLinkPermission(linkId, 'download');
        var dlLimitValue = this.props.shareModel.getExpirationFor(linkId, 'downloads') === 0 ? "" : this.props.shareModel.getExpirationFor(linkId, 'downloads');
        var expirationDateValue = this.props.shareModel.getExpirationFor(linkId, 'days') === 0 ? "" : this.props.shareModel.getExpirationFor(linkId, 'days');
        var auth = ShareModel.getAuthorizations(this.props.pydio);
        var today = new Date();

        var calIcon = React.createElement('span', { className: 'ajxp_icon_span mdi mdi-calendar-clock' });
        var expDate = undefined,
            maxDate = undefined,
            maxDownloads = null,
            dateExpired = false,
            dlExpired = false;
        if (parseInt(auth.max_expiration) > 0) {
            maxDate = new Date();
            maxDate.setDate(today.getDate() + parseInt(auth.max_expiration));
        }
        if (parseInt(auth.max_downloads) > 0) {
            maxDownloads = parseInt(auth.max_downloads);
            dlLimitValue = Math.min(dlLimitValue, maxDownloads);
        }
        if (expirationDateValue) {
            if (expirationDateValue < 0) {
                dateExpired = true;
            }
            expDate = new Date();
            expDate.setDate(today.getDate() + parseInt(expirationDateValue));
            var clearValue = (function () {
                this.props.shareModel.setExpirationFor(linkId, "days", "");
            }).bind(this);
            calIcon = React.createElement('span', { className: 'mdi mdi-close-circle ajxp_icon_span', onClick: clearValue });
            var calLabel = React.createElement(
                'span',
                { className: 'calLabelHasValue' },
                this.props.getMessage(dateExpired ? '21b' : '21')
            );
        }
        if (dlLimitValue) {
            var dlCounter = this.props.shareModel.getDownloadCounter(linkId);
            var resetDl = (function () {
                if (window.confirm(this.props.getMessage('106'))) {
                    this.props.shareModel.resetDownloadCounter(linkId, function () {});
                }
            }).bind(this);
            if (dlCounter) {
                var resetLink = React.createElement(
                    'a',
                    { style: { cursor: 'pointer' }, onClick: resetDl, title: this.props.getMessage('17') },
                    '(',
                    this.props.getMessage('16'),
                    ')'
                );
                if (dlCounter >= dlLimitValue) {
                    dlExpired = true;
                }
            }
            var dlCounterString = React.createElement(
                'span',
                { className: 'dlCounterString' },
                dlCounter + '/' + dlLimitValue,
                ' ',
                resetLink
            );
        }
        return React.createElement(
            _mainCard2['default'],
            { style: this.props.style, title: this.props.getMessage('196') },
            React.createElement(
                'div',
                { className: 'section-legend' },
                this.props.getMessage('24')
            ),
            passContainer,
            React.createElement(
                'div',
                { className: 'expires', style: { display: 'flex', alignItems: 'center' } },
                React.createElement(
                    'div',
                    { style: { flex: 1, display: 'flex', alignItems: 'center', position: 'relative' }, className: dateExpired ? 'limit-block-expired' : null },
                    calIcon,
                    React.createElement(DatePicker, {
                        ref: 'expirationDate',
                        key: 'start',
                        value: expDate,
                        minDate: new Date(),
                        maxDate: maxDate,
                        autoOk: true,
                        disabled: this.props.isReadonly(),
                        onChange: this.onDateChange,
                        showYearSelector: true,
                        floatingLabelText: this.props.getMessage(dateExpired ? '21b' : '21'),
                        mode: 'landscape',
                        formatDate: this.formatDate,
                        style: { flex: 1 },
                        fullWidth: true
                    })
                ),
                React.createElement(
                    'div',
                    { style: { flex: 1, alignItems: 'center', display: crtLinkDLAllowed ? 'flex' : 'none', position: 'relative' }, className: dlExpired ? 'limit-block-expired' : null },
                    React.createElement('span', { className: 'mdi mdi-download ajxp_icon_span' }),
                    React.createElement(TextField, {
                        type: 'number',
                        disabled: this.props.isReadonly(),
                        floatingLabelText: this.props.getMessage(dlExpired ? '22b' : '22'),
                        value: dlLimitValue > 0 ? dlLimitValue : '',
                        onChange: this.updateDLExpirationField,
                        fullWidth: true,
                        style: { flex: 1 }
                    }),
                    dlCounterString
                )
            )
        );
    }
});

exports['default'] = PublicLinkSecureOptions = (0, _ShareContextConsumer2['default'])(PublicLinkSecureOptions);
exports['default'] = PublicLinkSecureOptions;
module.exports = exports['default'];

},{"../ShareContextConsumer":1,"../main/Card":10,"material-ui":"material-ui","pydio":"pydio","react":"react"}],17:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var React = require('react');
var ReactDOM = require('react-dom');

var _require = require('material-ui');

var RaisedButton = _require.RaisedButton;
var TextField = _require.TextField;
var Paper = _require.Paper;
var IconButton = _require.IconButton;

var ShareModel = require('pydio').requireLib('ReactModelShare');
var Clipboard = require('clipboard');

var TargetedUserLink = (function (_React$Component) {
    _inherits(TargetedUserLink, _React$Component);

    function TargetedUserLink(props) {
        _classCallCheck(this, TargetedUserLink);

        _get(Object.getPrototypeOf(TargetedUserLink.prototype), 'constructor', this).call(this, props);
        this.state = { copyMessage: '' };
    }

    _createClass(TargetedUserLink, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this._clip) {
                this._clip.destroy();
            }
            if (this._button) {
                this._clip = new Clipboard(this._button, {
                    text: (function (trigger) {
                        return this.props.link;
                    }).bind(this)
                });
                this._clip.on('success', (function () {
                    this.setState({ copyMessage: this.props.getMessage('192') }, this.clearCopyMessage);
                }).bind(this));
                this._clip.on('error', (function () {
                    var copyMessage = undefined;
                    if (global.navigator.platform.indexOf("Mac") === 0) {
                        copyMessage = this.props.getMessage('144');
                    } else {
                        copyMessage = this.props.getMessage('share_center.143');
                    }
                    this.setState({ copyMessage: copyMessage }, this.clearCopyMessage);
                }).bind(this));
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this._clip) {
                this._clip.destroy();
            }
        }
    }, {
        key: 'clearCopyMessage',
        value: function clearCopyMessage() {
            setTimeout((function () {
                this.setState({ copyMessage: '' });
            }).bind(this), 5000);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            var _props = this.props;
            var display = _props.display;
            var link = _props.link;
            var download_count = _props.download_count;

            return React.createElement(
                'div',
                { style: { display: 'flex' } },
                React.createElement(
                    'div',
                    { style: { flex: 1 } },
                    display,
                    React.createElement(IconButton, {
                        pydio: this.props.pydio,
                        ref: function (ref) {
                            _this._button = ReactDOM.findDOMNode(ref);
                        },
                        iconClassName: 'mdi mdi-link',
                        tooltip: this.state.copyMessage || link,
                        iconStyle: { fontSize: 13, lineHeight: '17px' }, style: { width: 34, height: 34, padding: 6 }
                    })
                ),
                React.createElement(
                    'div',
                    { style: { width: 40, textAlign: 'center' } },
                    download_count
                )
            );
        }
    }]);

    return TargetedUserLink;
})(React.Component);

var TargetedUsers = (function (_React$Component2) {
    _inherits(TargetedUsers, _React$Component2);

    function TargetedUsers(props, context) {
        _classCallCheck(this, TargetedUsers);

        _get(Object.getPrototypeOf(TargetedUsers.prototype), 'constructor', this).call(this, props, context);
        this.state = { open: false };
    }

    _createClass(TargetedUsers, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var target_users = this.props.linkData.target_users;

            var items = Object.keys(target_users).map(function (k) {
                var userData = target_users[k];
                var title = _this2.props.linkData.public_link + '?u=' + k;
                return React.createElement(TargetedUserLink, _extends({}, userData, { link: title }));
            });
            if (!items.length) return null;

            var rootStyle = {
                lineHeight: '34px',
                padding: '4px 10px 4px',
                fontSize: 14,
                backgroundColor: '#fafafa',
                borderRadius: 2
            };
            var headerStyle = {
                borderBottom: this.state.open ? '1px solid #757575' : '',
                color: 'rgba(0, 0, 0, 0.36)'
            };

            return React.createElement(
                'div',
                { style: rootStyle },
                React.createElement(
                    'div',
                    { style: _extends({ display: 'flex' }, headerStyle) },
                    React.createElement(
                        'div',
                        { style: { flex: 1 } },
                        this.props.getMessage('245').replace('%s', items.length),
                        ' ',
                        React.createElement('span', { className: 'mdi mdi-chevron-' + (this.state.open ? 'up' : 'down'), style: { cursor: 'pointer' }, onClick: function () {
                                _this2.setState({ open: !_this2.state.open });
                            } })
                    ),
                    this.state.open && React.createElement(
                        'div',
                        { style: { width: 40, textAlign: 'center' } },
                        '#DL'
                    )
                ),
                this.state.open && React.createElement(
                    'div',
                    null,
                    items
                )
            );
        }
    }]);

    return TargetedUsers;
})(React.Component);

TargetedUsers.propTypes = {

    linkData: React.PropTypes.object.isRequired,
    shareModel: React.PropTypes.instanceOf(ShareModel)

};

exports['default'] = TargetedUsers = (0, _ShareContextConsumer2['default'])(TargetedUsers);
TargetedUserLink = (0, _ShareContextConsumer2['default'])(TargetedUserLink);

exports['default'] = TargetedUsers;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../ShareContextConsumer":1,"clipboard":"clipboard","material-ui":"material-ui","pydio":"pydio","react":"react","react-dom":"react-dom"}],18:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var _RemoteUsers = require('./RemoteUsers');

var _RemoteUsers2 = _interopRequireDefault(_RemoteUsers);

var _SharedUsers = require('./SharedUsers');

var _SharedUsers2 = _interopRequireDefault(_SharedUsers);

var React = require('react');

var _require = require('material-ui');

var Divider = _require.Divider;

var ShareModel = require('pydio').requireLib('ReactModelShare');

var UsersPanel = React.createClass({
    displayName: 'UsersPanel',

    propTypes: {
        shareModel: React.PropTypes.instanceOf(ShareModel),
        showMailer: React.PropTypes.func
    },

    onUserUpdate: function onUserUpdate(operation, userId, userData) {
        this.props.shareModel.updateSharedUser(operation, userId, userData);
    },

    onSaveSelection: function onSaveSelection() {
        var label = window.prompt(this.props.getMessage(510, ''));
        if (!label) return;
        this.props.shareModel.saveSelectionAsTeam(label);
    },

    sendInvitations: function sendInvitations(userObjects) {
        try {
            var mailData = this.props.shareModel.prepareEmail("repository");
            this.props.showMailer(mailData.subject, mailData.message, userObjects);
        } catch (e) {
            global.alert(e.message);
        }
    },

    render: function render() {
        var currentUsers = this.props.shareModel.getSharedUsers();
        var federatedEnabled = ShareModel.federatedSharingEnabled();
        return React.createElement(
            'div',
            { style: this.props.style },
            React.createElement(_SharedUsers2['default'], {
                showTitle: federatedEnabled,
                users: currentUsers,
                userObjects: this.props.shareModel.getSharedUsersAsObjects(),
                sendInvitations: this.props.showMailer ? this.sendInvitations : null,
                onUserUpdate: this.onUserUpdate,
                saveSelectionAsTeam: PydioUsers.Client.saveSelectionSupported() ? this.onSaveSelection : null,
                pydio: this.props.pydio
            }),
            federatedEnabled && React.createElement(_RemoteUsers2['default'], {
                shareModel: this.props.shareModel,
                onUserUpdate: this.onUserUpdate,
                pydio: this.props.pydio
            })
        );
    }
});

exports['default'] = UsersPanel = (0, _ShareContextConsumer2['default'])(UsersPanel);
exports['default'] = UsersPanel;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../ShareContextConsumer":1,"./RemoteUsers":20,"./SharedUsers":22,"material-ui":"material-ui","pydio":"pydio","react":"react"}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var _UserBadge = require('./UserBadge');

var _UserBadge2 = _interopRequireDefault(_UserBadge);

var React = require('react');

var RemoteUserEntry = React.createClass({
    displayName: 'RemoteUserEntry',

    propTypes: {
        shareModel: React.PropTypes.instanceOf(ReactModel.Share),
        linkData: React.PropTypes.object.isRequired,
        onRemoveUser: React.PropTypes.func.isRequired,
        onUserUpdate: React.PropTypes.func.isRequired
    },

    getInitialState: function getInitialState() {
        return {
            internalUser: this.props.shareModel.getSharedUser(this.props.linkData['internal_user_id'])
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps(newProps, oldProps) {
        this.setState({
            internalUser: newProps.shareModel.getSharedUser(newProps.linkData['internal_user_id'])
        });
    },

    getStatus: function getStatus() {
        var link = this.props.linkData;
        if (!link.invitation) return -1;else return link.invitation.STATUS;
    },

    getStatusString: function getStatusString() {
        var statuses = { 's-1': 214, 's1': 211, 's2': 212, 's4': 213 };
        return this.props.getMessage(statuses['s' + this.getStatus()]);
    },

    buildLabel: function buildLabel() {
        var link = this.props.linkData;
        var host = link.HOST || (link.invitation ? link.invitation.HOST : null);
        var user = link.USER || (link.invitation ? link.invitation.USER : null);
        if (!host || !user) return "Error";
        return user + " @ " + host;
    },

    removeUser: function removeUser() {
        this.props.onRemoveUser(this.props.linkData['hash']);
    },

    onUpdateRight: function onUpdateRight(event) {
        var target = event.target;
        this.props.onUserUpdate('update_right', this.state.internalUser.ID, { right: target.name, add: target.checked });
    },

    render: function render() {
        var menuItems = [];
        if (!this.props.isReadonly()) {
            menuItems = [{
                text: this.props.getMessage('257', ''),
                callback: this.removeUser
            }];
        }
        var status = this.getStatus();
        var additionalItem;
        if (status == 2) {
            additionalItem = React.createElement(
                'span',
                { className: 'user-badge-rights-container' },
                React.createElement('input', { type: 'checkbox', name: 'read', disabled: this.props.isReadonly(), checked: this.state.internalUser.RIGHT.indexOf('r') !== -1, onChange: this.onUpdateRight }),
                React.createElement('input', { type: 'checkbox', name: 'write', disabled: this.props.isReadonly(), checked: this.state.internalUser.RIGHT.indexOf('w') !== -1, onChange: this.onUpdateRight })
            );
        } else {
            additionalItem = React.createElement(
                'span',
                { className: 'user-badge-rights-container' },
                this.getStatusString()
            );
        }

        return React.createElement(
            _UserBadge2['default'],
            {
                label: this.buildLabel(),
                avatar: null,
                type: "remote_user",
                menus: menuItems
            },
            additionalItem
        );
    }

});

exports['default'] = RemoteUserEntry = (0, _ShareContextConsumer2['default'])(RemoteUserEntry);
exports['default'] = RemoteUserEntry;
module.exports = exports['default'];

},{"../ShareContextConsumer":1,"./UserBadge":23,"react":"react"}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var _RemoteUserEntry = require('./RemoteUserEntry');

var _RemoteUserEntry2 = _interopRequireDefault(_RemoteUserEntry);

var _mainCard = require('../main/Card');

var _mainCard2 = _interopRequireDefault(_mainCard);

var _mainActionButton = require('../main/ActionButton');

var _mainActionButton2 = _interopRequireDefault(_mainActionButton);

var React = require('react');

var _require = require('material-ui');

var TextField = _require.TextField;
var IconButton = _require.IconButton;
var Paper = _require.Paper;

var Pydio = require('pydio');

var _Pydio$requireLib = Pydio.requireLib('ReactModelShare');

var ReactModelShare = _Pydio$requireLib.ReactModelShare;

var _Pydio$requireLib2 = Pydio.requireLib('components');

var AddressBook = _Pydio$requireLib2.AddressBook;

var RemoteUsers = React.createClass({
    displayName: 'RemoteUsers',

    propTypes: {
        shareModel: React.PropTypes.instanceOf(ReactModelShare),
        onUserUpdate: React.PropTypes.func.isRequired,
        pydio: React.PropTypes.instanceOf(Pydio)
    },

    getInitialState: function getInitialState() {
        return { addDisabled: true, showUserForm: false };
    },

    addUser: function addUser() {
        var h = this.refs["host"].getValue();
        var u = this.refs["user"].getValue();
        this.props.shareModel.createRemoteLink(h, u);
    },

    removeUser: function removeUser(linkId) {
        this.props.shareModel.removeRemoteLink(linkId);
    },

    monitorInput: function monitorInput() {
        var h = this.refs["host"].getValue();
        var u = this.refs["user"].getValue();
        this.setState({ addDisabled: !(h && u) });
    },

    onAddressBookItemSelected: function onAddressBookItemSelected(uObject, parent) {
        var trustedServerId = uObject.trustedServerId;

        var userId = uObject.getId();
        this.props.shareModel.createRemoteLink('trusted://' + trustedServerId, userId);
    },

    getActions: function getActions() {
        var _this = this;

        var ocsRemotes = this.props.pydio.getPluginConfigs('core.ocs').get('TRUSTED_SERVERS');
        var hasTrusted = ocsRemotes && ocsRemotes.length;

        return [React.createElement(_mainActionButton2['default'], { key: 'manual', mdiIcon: 'account-plus', messageId: '45', onTouchTap: function () {
                _this.setState({ showUserForm: true });
            } }), React.createElement(AddressBook, {
            key: 'addressbook',
            mode: 'popover',
            pydio: this.props.pydio,
            onItemSelected: this.onAddressBookItemSelected,
            usersFrom: 'remote',
            disableSearch: true,
            popoverButton: React.createElement(_mainActionButton2['default'], { mdiIcon: 'server-network', messageId: '45' })
        })];
    },

    renderUserForm: function renderUserForm() {
        var _this2 = this;

        if (this.props.isReadonly()) {
            return null;
        }
        return React.createElement(
            Paper,
            { zDepth: 0, style: { padding: '0 16px', backgroundColor: '#FAFAFA', marginTop: 10 } },
            React.createElement(
                'div',
                null,
                React.createElement(TextField, { fullWidth: true, ref: 'host', floatingLabelText: this.props.getMessage('209'), onChange: this.monitorInput }),
                React.createElement(TextField, { fullWidth: true, ref: 'user', type: 'text', floatingLabelText: this.props.getMessage('210'), onChange: this.monitorInput })
            ),
            React.createElement(
                'div',
                { style: { textAlign: 'right' } },
                React.createElement(IconButton, { tooltip: 'Cancel', iconClassName: 'mdi mdi-undo', onClick: function () {
                        _this2.setState({ showUserForm: false });
                    } }),
                React.createElement(IconButton, { tooltip: this.props.getMessage('45'), iconClassName: 'icon-plus-sign', onClick: this.addUser, disabled: this.state.addDisabled })
            )
        );
    },

    render: function render() {
        var ocsLinks = this.props.shareModel.getOcsLinksByStatus(),
            inv,
            rwHeader,
            hasActiveOcsLink = false;

        inv = ocsLinks.map((function (link) {
            hasActiveOcsLink = !hasActiveOcsLink && link && link.invitation && link.invitation.STATUS == 2 ? true : hasActiveOcsLink;

            return React.createElement(_RemoteUserEntry2['default'], {
                shareModel: this.props.shareModel,
                linkData: link,
                onRemoveUser: this.removeUser,
                onUserUpdate: this.props.onUserUpdate
            });
        }).bind(this));

        if (hasActiveOcsLink) {
            rwHeader = React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'shared-users-rights-header' },
                    React.createElement(
                        'span',
                        { className: 'read' },
                        this.props.getMessage('361', '')
                    ),
                    React.createElement(
                        'span',
                        { className: 'read' },
                        this.props.getMessage('181')
                    )
                )
            );
        }

        return React.createElement(
            _mainCard2['default'],
            { title: this.props.getMessage('207'), actions: this.getActions() },
            !ocsLinks.length && React.createElement(
                'div',
                { style: { color: 'rgba(0,0,0,0.43)', paddingBottom: 16 } },
                this.props.getMessage('208')
            ),
            React.createElement(
                'div',
                null,
                rwHeader,
                inv
            ),
            this.state.showUserForm && this.renderUserForm()
        );
    }
});

exports['default'] = RemoteUsers = (0, _ShareContextConsumer2['default'])(RemoteUsers);
exports['default'] = RemoteUsers;
module.exports = exports['default'];

},{"../ShareContextConsumer":1,"../main/ActionButton":8,"../main/Card":10,"./RemoteUserEntry":19,"material-ui":"material-ui","pydio":"pydio","react":"react"}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _UserBadge = require('./UserBadge');

var _UserBadge2 = _interopRequireDefault(_UserBadge);

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var React = require('react');

var SharedUserEntry = React.createClass({
    displayName: 'SharedUserEntry',

    propTypes: {
        userEntry: React.PropTypes.object.isRequired,
        userObject: React.PropTypes.instanceOf(PydioUsers.User).isRequired,
        onUserUpdate: React.PropTypes.func.isRequired,
        sendInvitations: React.PropTypes.func
    },
    onRemove: function onRemove() {
        this.props.onUserUpdate('remove', this.props.userEntry.ID, this.props.userEntry);
    },
    onToggleWatch: function onToggleWatch() {
        this.props.onUserUpdate('update_right', this.props.userEntry.ID, { right: 'watch', add: !this.props.userEntry['WATCH'] });
    },
    onInvite: function onInvite() {
        var targets = {};
        targets[this.props.userObject.getId()] = this.props.userObject;
        this.props.sendInvitations(targets);
    },
    onUpdateRight: function onUpdateRight(event) {
        var target = event.target;
        this.props.onUserUpdate('update_right', this.props.userEntry.ID, { right: target.name, add: target.checked });
    },
    render: function render() {
        var menuItems = [];
        if (this.props.userEntry.TYPE != 'group') {
            if (!this.props.isReadonly()) {
                // Toggle Notif
                menuItems.push({
                    text: this.props.getMessage('183'),
                    callback: this.onToggleWatch,
                    checked: this.props.userEntry.WATCH
                });
            }
            if (this.props.sendInvitations) {
                // Send invitation
                menuItems.push({
                    text: this.props.getMessage('45'),
                    callback: this.onInvite
                });
            }
        }
        if (!this.props.isReadonly()) {
            // Remove Entry
            menuItems.push({
                text: this.props.getMessage('257', ''),
                callback: this.onRemove
            });
        }
        return React.createElement(
            _UserBadge2['default'],
            {
                label: this.props.userEntry.LABEL || this.props.userEntry.ID,
                avatar: this.props.userEntry.AVATAR,
                type: this.props.userEntry.TYPE,
                menus: menuItems
            },
            React.createElement(
                'span',
                { className: 'user-badge-rights-container', style: !menuItems.length ? { marginRight: 48 } : {} },
                React.createElement('input', { type: 'checkbox', name: 'read', disabled: this.props.isReadonly(), checked: this.props.userEntry.RIGHT.indexOf('r') !== -1, onChange: this.onUpdateRight }),
                React.createElement('input', { type: 'checkbox', name: 'write', disabled: this.props.isReadonly(), checked: this.props.userEntry.RIGHT.indexOf('w') !== -1, onChange: this.onUpdateRight })
            )
        );
    }
});

exports['default'] = SharedUserEntry = (0, _ShareContextConsumer2['default'])(SharedUserEntry);
exports['default'] = SharedUserEntry;
module.exports = exports['default'];

},{"../ShareContextConsumer":1,"./UserBadge":23,"react":"react"}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ShareContextConsumer = require('../ShareContextConsumer');

var _ShareContextConsumer2 = _interopRequireDefault(_ShareContextConsumer);

var _UserBadge = require('./UserBadge');

var _UserBadge2 = _interopRequireDefault(_UserBadge);

var _SharedUserEntry = require('./SharedUserEntry');

var _SharedUserEntry2 = _interopRequireDefault(_SharedUserEntry);

var _mainActionButton = require('../main/ActionButton');

var _mainActionButton2 = _interopRequireDefault(_mainActionButton);

var _mainCard = require('../main/Card');

var _mainCard2 = _interopRequireDefault(_mainCard);

var React = require('react');

var Pydio = require('pydio');

var _Pydio$requireLib = Pydio.requireLib('components');

var UsersCompleter = _Pydio$requireLib.UsersCompleter;

var _require = require('material-ui');

var Paper = _require.Paper;

var SharedUsers = React.createClass({
    displayName: 'SharedUsers',

    propTypes: {
        pydio: React.PropTypes.instanceOf(Pydio),
        users: React.PropTypes.array.isRequired,
        userObjects: React.PropTypes.object.isRequired,
        onUserUpdate: React.PropTypes.func.isRequired,
        saveSelectionAsTeam: React.PropTypes.func,
        sendInvitations: React.PropTypes.func,
        showTitle: React.PropTypes.bool
    },
    sendInvitationToAllUsers: function sendInvitationToAllUsers() {
        this.props.sendInvitations(this.props.userObjects);
    },
    clearAllUsers: function clearAllUsers() {
        this.props.users.map((function (entry) {
            this.props.onUserUpdate('remove', entry.ID, entry);
        }).bind(this));
    },
    valueSelected: function valueSelected(userObject) {
        var newEntry = {
            ID: userObject.getId(),
            RIGHT: 'r',
            LABEL: userObject.getLabel(),
            TYPE: userObject.getGroup() ? 'group' : 'user'
        };
        this.props.onUserUpdate('add', newEntry.ID, newEntry);
    },
    completerRenderSuggestion: function completerRenderSuggestion(userObject) {
        var type = userObject.getType() === 'team' || userObject.getId().indexOf('/AJXP_TEAM/') === 0 ? 'team' : userObject.getGroup() ? 'group' : userObject.getTemporary() ? 'temporary' : userObject.getExternal() ? 'tmp_user' : 'user';

        return React.createElement(_UserBadge2['default'], {
            label: userObject.getExtendedLabel() || userObject.getLabel(),
            avatar: userObject.getAvatar(),
            type: type
        });
    },

    render: function render() {
        // sort by group/user then by ID;
        var userEntries = this.props.users.sort(function (a, b) {
            return b.TYPE === 'group' || b.TYPE === 'team' ? 1 : a.TYPE === 'group' || a.TYPE === 'team' ? -1 : a.ID > b.ID ? 1 : b.ID > a.ID ? -1 : 0;
        }).map((function (u) {
            return React.createElement(_SharedUserEntry2['default'], {
                userEntry: u,
                userObject: this.props.userObjects[u.ID],
                key: u.ID,
                shareModel: this.props.shareModel,
                onUserUpdate: this.props.onUserUpdate,
                sendInvitations: this.props.sendInvitations
            });
        }).bind(this));
        var actionLinks = [];
        if (this.props.users.length && !this.props.isReadonly()) {
            actionLinks.push(React.createElement(_mainActionButton2['default'], { key: 'clear', callback: this.clearAllUsers, mdiIcon: 'delete', messageId: '180' }));
        }
        if (this.props.sendInvitations && this.props.users.length) {
            actionLinks.push(React.createElement(_mainActionButton2['default'], { key: 'invite', callback: this.sendInvitationToAllUsers, mdiIcon: 'email-outline', messageId: '45' }));
        }
        if (this.props.saveSelectionAsTeam && this.props.users.length > 1 && !this.props.isReadonly()) {
            actionLinks.push(React.createElement(_mainActionButton2['default'], { key: 'team', callback: this.props.saveSelectionAsTeam, mdiIcon: 'account-multiple-plus', messageId: '509', messageCoreNamespace: true }));
        }
        var rwHeader = undefined,
            usersInput = undefined;
        if (this.props.users.length) {
            rwHeader = React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'shared-users-rights-header' },
                    React.createElement(
                        'span',
                        { className: 'read' },
                        this.props.getMessage('361', '')
                    ),
                    React.createElement(
                        'span',
                        { className: 'read' },
                        this.props.getMessage('181')
                    )
                )
            );
        }
        if (!this.props.isReadonly()) {
            var excludes = this.props.users.map(function (u) {
                return u.ID;
            });
            usersInput = React.createElement(UsersCompleter, {
                className: 'share-form-users',
                fieldLabel: this.props.getMessage('34'),
                renderSuggestion: this.completerRenderSuggestion,
                onValueSelected: this.valueSelected,
                excludes: excludes,
                pydio: this.props.pydio,
                showAddressBook: true,
                usersFrom: 'local'
            });
        }
        return React.createElement(
            _mainCard2['default'],
            {
                title: this.props.showTitle ? this.props.getMessage('217') : null,
                actions: actionLinks
            },
            React.createElement(
                'div',
                { style: userEntries.length ? { margin: '-20px 8px 16px' } : { marginTop: -20 } },
                usersInput
            ),
            rwHeader,
            React.createElement(
                'div',
                null,
                userEntries
            ),
            !userEntries.length && React.createElement(
                'div',
                { style: { color: 'rgba(0,0,0,0.43)' } },
                this.props.getMessage('182')
            )
        );
    }
});

exports['default'] = SharedUsers = (0, _ShareContextConsumer2['default'])(SharedUsers);
exports['default'] = SharedUsers;
module.exports = exports['default'];

},{"../ShareContextConsumer":1,"../main/ActionButton":8,"../main/Card":10,"./SharedUserEntry":21,"./UserBadge":23,"material-ui":"material-ui","pydio":"pydio","react":"react"}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('react');

var Component = _require.Component;
var PropTypes = _require.PropTypes;

var _require2 = require('material-ui');

var MenuItem = _require2.MenuItem;
var IconMenu = _require2.IconMenu;
var IconButton = _require2.IconButton;

var _require3 = require('material-ui/styles');

var muiThemeable = _require3.muiThemeable;

var Color = require('color');

var UserBadge = (function (_Component) {
    _inherits(UserBadge, _Component);

    function UserBadge() {
        _classCallCheck(this, UserBadge);

        _get(Object.getPrototypeOf(UserBadge.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(UserBadge, [{
        key: 'renderMenu',
        value: function renderMenu() {
            if (!this.props.menus || !this.props.menus.length) {
                return null;
            }
            var menuItems = this.props.menus.map(function (m) {
                var rightIcon = undefined;
                if (m.checked) {
                    rightIcon = React.createElement('span', { className: 'mdi mdi-check' });
                }
                return React.createElement(MenuItem, {
                    primaryText: m.text,
                    onTouchTap: m.callback,
                    rightIcon: rightIcon });
            });
            var iconStyle = { fontSize: 18 };
            return React.createElement(
                IconMenu,
                {
                    iconButtonElement: React.createElement(IconButton, { style: { padding: 16 }, iconStyle: iconStyle, iconClassName: 'icon-ellipsis-vertical' }),
                    anchorOrigin: { horizontal: 'right', vertical: 'top' },
                    targetOrigin: { horizontal: 'right', vertical: 'top' }
                },
                menuItems
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var avatar = undefined;
            var avatarColor = this.props.muiTheme.palette.avatarsColor;
            if (this.props.type == 'group') {
                avatarColor = Color(avatarColor).darken(.2).toString();
                avatar = React.createElement('span', { className: 'avatar mdi mdi-account-multiple', style: { backgroundColor: avatarColor } });
            } else if (this.props.type == 'team') {
                avatarColor = Color(avatarColor).darken(.2).toString();
                avatar = React.createElement('span', { className: 'avatar mdi mdi-account-multiple-outline', style: { backgroundColor: avatarColor } });
            } else if (this.props.type == 'temporary') {
                avatarColor = Color(avatarColor).lighten(.2).toString();
                avatar = React.createElement('span', { className: 'avatar mdi mdi-account-plus', style: { backgroundColor: avatarColor } });
            } else if (this.props.type == 'remote_user') {
                avatar = React.createElement('span', { className: 'avatar mdi mdi-account-network', style: { backgroundColor: avatarColor } });
            } else {
                avatar = React.createElement('span', { className: 'avatar mdi mdi-account', style: { backgroundColor: avatarColor } });
            }
            var menu = this.renderMenu();
            return React.createElement(
                'div',
                { className: "share-dialog user-badge user-type-" + this.props.type },
                avatar,
                React.createElement(
                    'span',
                    { className: 'user-badge-label' },
                    this.props.label
                ),
                this.props.children,
                menu
            );
        }
    }]);

    return UserBadge;
})(Component);

UserBadge.propTypes = {
    label: PropTypes.string,
    avatar: PropTypes.string,
    type: PropTypes.string,
    menus: PropTypes.object,
    muiTheme: PropTypes.object
};

exports['default'] = UserBadge = muiThemeable()(UserBadge);

exports['default'] = UserBadge;
module.exports = exports['default'];

},{"color":"color","material-ui":"material-ui","material-ui/styles":"material-ui/styles","react":"react"}]},{},[7])(7)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJyZXMvYnVpbGQvZGlhbG9nL1NoYXJlQ29udGV4dENvbnN1bWVyLmpzIiwicmVzL2J1aWxkL2RpYWxvZy9hZHZhbmNlZC9MYWJlbERlc2NyaXB0aW9uUGFuZWwuanMiLCJyZXMvYnVpbGQvZGlhbG9nL2FkdmFuY2VkL05vdGlmaWNhdGlvblBhbmVsLmpzIiwicmVzL2J1aWxkL2RpYWxvZy9hZHZhbmNlZC9QYW5lbC5qcyIsInJlcy9idWlsZC9kaWFsb2cvYWR2YW5jZWQvUHVibGljTGlua1RlbXBsYXRlLmpzIiwicmVzL2J1aWxkL2RpYWxvZy9hZHZhbmNlZC9WaXNpYmlsaXR5UGFuZWwuanMiLCJyZXMvYnVpbGQvZGlhbG9nL2luZGV4LmpzIiwicmVzL2J1aWxkL2RpYWxvZy9tYWluL0FjdGlvbkJ1dHRvbi5qcyIsInJlcy9idWlsZC9kaWFsb2cvbWFpbi9CdXR0b25zQ29tcHV0ZXIuanMiLCJyZXMvYnVpbGQvZGlhbG9nL21haW4vQ2FyZC5qcyIsInJlcy9idWlsZC9kaWFsb2cvbWFpbi9IZWFkZXIuanMiLCJyZXMvYnVpbGQvZGlhbG9nL21haW4vUGFuZWwuanMiLCJyZXMvYnVpbGQvZGlhbG9nL3B1YmxpYy9GaWVsZC5qcyIsInJlcy9idWlsZC9kaWFsb2cvcHVibGljL1BhbmVsLmpzIiwicmVzL2J1aWxkL2RpYWxvZy9wdWJsaWMvUGVybWlzc2lvbnMuanMiLCJyZXMvYnVpbGQvZGlhbG9nL3B1YmxpYy9TZWN1cmVPcHRpb25zLmpzIiwicmVzL2J1aWxkL2RpYWxvZy9wdWJsaWMvVGFyZ2V0ZWRVc2Vycy5qcyIsInJlcy9idWlsZC9kaWFsb2cvdXNlcnMvUGFuZWwuanMiLCJyZXMvYnVpbGQvZGlhbG9nL3VzZXJzL1JlbW90ZVVzZXJFbnRyeS5qcyIsInJlcy9idWlsZC9kaWFsb2cvdXNlcnMvUmVtb3RlVXNlcnMuanMiLCJyZXMvYnVpbGQvZGlhbG9nL3VzZXJzL1NoYXJlZFVzZXJFbnRyeS5qcyIsInJlcy9idWlsZC9kaWFsb2cvdXNlcnMvU2hhcmVkVXNlcnMuanMiLCJyZXMvYnVpbGQvZGlhbG9nL3VzZXJzL1VzZXJCYWRnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDbFpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDbFBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDN01BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBkZXNjID0gcGFyZW50ID0gdW5kZWZpbmVkOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBmdW5jdGlvbiAoUHlkaW9Db21wb25lbnQpIHtcbiAgICB2YXIgU2hhcmVDb250ZXh0Q29uc3VtZXIgPSAoZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgICAgICAgX2luaGVyaXRzKFNoYXJlQ29udGV4dENvbnN1bWVyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgICAgICBmdW5jdGlvbiBTaGFyZUNvbnRleHRDb25zdW1lcigpIHtcbiAgICAgICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTaGFyZUNvbnRleHRDb25zdW1lcik7XG5cbiAgICAgICAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFNoYXJlQ29udGV4dENvbnN1bWVyLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cblxuICAgICAgICBfY3JlYXRlQ2xhc3MoU2hhcmVDb250ZXh0Q29uc3VtZXIsIFt7XG4gICAgICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2NvbnRleHQgPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2VzID0gX2NvbnRleHQubWVzc2FnZXM7XG4gICAgICAgICAgICAgICAgdmFyIGdldE1lc3NhZ2UgPSBfY29udGV4dC5nZXRNZXNzYWdlO1xuICAgICAgICAgICAgICAgIHZhciBpc1JlYWRvbmx5ID0gX2NvbnRleHQuaXNSZWFkb25seTtcblxuICAgICAgICAgICAgICAgIHZhciBjb250ZXh0UHJvcHMgPSB7IG1lc3NhZ2VzOiBtZXNzYWdlcywgZ2V0TWVzc2FnZTogZ2V0TWVzc2FnZSwgaXNSZWFkb25seTogaXNSZWFkb25seSB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFB5ZGlvQ29tcG9uZW50LCBfZXh0ZW5kcyh7fSwgdGhpcy5wcm9wcywgY29udGV4dFByb3BzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1dKTtcblxuICAgICAgICByZXR1cm4gU2hhcmVDb250ZXh0Q29uc3VtZXI7XG4gICAgfSkoUmVhY3QuQ29tcG9uZW50KTtcblxuICAgIFNoYXJlQ29udGV4dENvbnN1bWVyLmNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgbWVzc2FnZXM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGdldE1lc3NhZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBpc1JlYWRvbmx5OiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuICAgIH07XG5cbiAgICByZXR1cm4gU2hhcmVDb250ZXh0Q29uc3VtZXI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX1NoYXJlQ29udGV4dENvbnN1bWVyID0gcmVxdWlyZSgnLi4vU2hhcmVDb250ZXh0Q29uc3VtZXInKTtcblxudmFyIF9TaGFyZUNvbnRleHRDb25zdW1lcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TaGFyZUNvbnRleHRDb25zdW1lcik7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJ21hdGVyaWFsLXVpJyk7XG5cbnZhciBUZXh0RmllbGQgPSBfcmVxdWlyZS5UZXh0RmllbGQ7XG52YXIgU3ViaGVhZGVyID0gX3JlcXVpcmUuU3ViaGVhZGVyO1xuXG52YXIgTGFiZWxEZXNjcmlwdGlvblBhbmVsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnTGFiZWxEZXNjcmlwdGlvblBhbmVsJyxcblxuICAgIHVwZGF0ZUxhYmVsOiBmdW5jdGlvbiB1cGRhdGVMYWJlbChldmVudCkge1xuICAgICAgICB0aGlzLnByb3BzLnNoYXJlTW9kZWwuc2V0R2xvYmFsKFwibGFiZWxcIiwgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSk7XG4gICAgfSxcblxuICAgIHVwZGF0ZURlc2NyaXB0aW9uOiBmdW5jdGlvbiB1cGRhdGVEZXNjcmlwdGlvbihldmVudCkge1xuICAgICAgICB0aGlzLnByb3BzLnNoYXJlTW9kZWwuc2V0R2xvYmFsKFwiZGVzY3JpcHRpb25cIiwgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSk7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgbGFiZWwgPSB1bmRlZmluZWQsXG4gICAgICAgICAgICBsYWJlbExlZ2VuZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnNoYXJlTW9kZWwuZ2V0Tm9kZSgpLmlzTGVhZigpKSB7XG4gICAgICAgICAgICBsYWJlbCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEZpZWxkLCB7XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuaXNSZWFkb25seSgpLFxuICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0OiB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzM1JykgKyAnICggJyArIHRoaXMucHJvcHMuZ2V0TWVzc2FnZSgnMTQ2JykgKyAnICknLFxuICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxTdHlsZTogeyB3aGl0ZVNwYWNlOiAnbm93cmFwJywgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycgfSxcbiAgICAgICAgICAgICAgICBuYW1lOiAnbGFiZWwnLFxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLnVwZGF0ZUxhYmVsLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnNoYXJlTW9kZWwuZ2V0R2xvYmFsKCdsYWJlbCcpIHx8ICcnLFxuICAgICAgICAgICAgICAgIGZ1bGxXaWR0aDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgIHsgc3R5bGU6IHRoaXMucHJvcHMuc3R5bGUgfSxcbiAgICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0RmllbGQsIHtcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5pc1JlYWRvbmx5KCksXG4gICAgICAgICAgICAgICAgZmxvYXRpbmdMYWJlbFRleHQ6IHRoaXMucHJvcHMuZ2V0TWVzc2FnZSgnMTQ1JykgKyAnICggJyArIHRoaXMucHJvcHMuZ2V0TWVzc2FnZSgnMTk3JykgKyAnICknLFxuICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxTdHlsZTogeyB3aGl0ZVNwYWNlOiAnbm93cmFwJywgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycgfSxcbiAgICAgICAgICAgICAgICBuYW1lOiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLnVwZGF0ZURlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnNoYXJlTW9kZWwuZ2V0R2xvYmFsKCdkZXNjcmlwdGlvbicpIHx8ICcnLFxuICAgICAgICAgICAgICAgIGZ1bGxXaWR0aDogdHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gTGFiZWxEZXNjcmlwdGlvblBhbmVsID0gKDAsIF9TaGFyZUNvbnRleHRDb25zdW1lcjJbJ2RlZmF1bHQnXSkoTGFiZWxEZXNjcmlwdGlvblBhbmVsKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gTGFiZWxEZXNjcmlwdGlvblBhbmVsO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9TaGFyZUNvbnRleHRDb25zdW1lciA9IHJlcXVpcmUoJy4uL1NoYXJlQ29udGV4dENvbnN1bWVyJyk7XG5cbnZhciBfU2hhcmVDb250ZXh0Q29uc3VtZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU2hhcmVDb250ZXh0Q29uc3VtZXIpO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCdtYXRlcmlhbC11aScpO1xuXG52YXIgVGV4dEZpZWxkID0gX3JlcXVpcmUuVGV4dEZpZWxkO1xudmFyIFNlbGVjdEZpZWxkID0gX3JlcXVpcmUuU2VsZWN0RmllbGQ7XG52YXIgTWVudUl0ZW0gPSBfcmVxdWlyZS5NZW51SXRlbTtcblxudmFyIE5vdGlmaWNhdGlvblBhbmVsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnTm90aWZpY2F0aW9uUGFuZWwnLFxuXG4gICAgZHJvcERvd25DaGFuZ2U6IGZ1bmN0aW9uIGRyb3BEb3duQ2hhbmdlKGV2ZW50LCBpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zaGFyZU1vZGVsLnNldEdsb2JhbCgnd2F0Y2gnLCB2YWx1ZSAhPT0gJ25vX3dhdGNoJyk7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgbWVudUl0ZW1zID0gW1JlYWN0LmNyZWF0ZUVsZW1lbnQoTWVudUl0ZW0sIHsgdmFsdWU6ICdub193YXRjaCcsIHByaW1hcnlUZXh0OiB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzE4NycpIH0pLCBSZWFjdC5jcmVhdGVFbGVtZW50KE1lbnVJdGVtLCB7IHZhbHVlOiAnd2F0Y2hfcmVhZCcsIHByaW1hcnlUZXh0OiB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzE4NCcpIH0pXTtcblxuICAgICAgICB2YXIgc2VsZWN0ZWRJbmRleCA9IHRoaXMucHJvcHMuc2hhcmVNb2RlbC5nZXRHbG9iYWwoJ3dhdGNoJykgPyAnd2F0Y2hfcmVhZCcgOiAnbm9fd2F0Y2gnO1xuXG4gICAgICAgIHZhciB1bnVzZWRMZWdlbmQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2Zvcm0tbGVnZW5kJyB9LFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXRNZXNzYWdlKCcxODgnKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgeyBzdHlsZTogdGhpcy5wcm9wcy5zdHlsZSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBTZWxlY3RGaWVsZCxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmlzUmVhZG9ubHkoKSxcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogc2VsZWN0ZWRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuZHJvcERvd25DaGFuZ2UsXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0OiB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzIxOCcpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZW51SXRlbXNcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuTm90aWZpY2F0aW9uUGFuZWwgPSAoMCwgX1NoYXJlQ29udGV4dENvbnN1bWVyMlsnZGVmYXVsdCddKShOb3RpZmljYXRpb25QYW5lbCk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBOb3RpZmljYXRpb25QYW5lbDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxudmFyIF9MYWJlbERlc2NyaXB0aW9uUGFuZWwgPSByZXF1aXJlKCcuL0xhYmVsRGVzY3JpcHRpb25QYW5lbCcpO1xuXG52YXIgX0xhYmVsRGVzY3JpcHRpb25QYW5lbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9MYWJlbERlc2NyaXB0aW9uUGFuZWwpO1xuXG52YXIgX05vdGlmaWNhdGlvblBhbmVsID0gcmVxdWlyZSgnLi9Ob3RpZmljYXRpb25QYW5lbCcpO1xuXG52YXIgX05vdGlmaWNhdGlvblBhbmVsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX05vdGlmaWNhdGlvblBhbmVsKTtcblxudmFyIF9QdWJsaWNMaW5rVGVtcGxhdGUgPSByZXF1aXJlKCcuL1B1YmxpY0xpbmtUZW1wbGF0ZScpO1xuXG52YXIgX1B1YmxpY0xpbmtUZW1wbGF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9QdWJsaWNMaW5rVGVtcGxhdGUpO1xuXG52YXIgX1Zpc2liaWxpdHlQYW5lbCA9IHJlcXVpcmUoJy4vVmlzaWJpbGl0eVBhbmVsJyk7XG5cbnZhciBfVmlzaWJpbGl0eVBhbmVsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1Zpc2liaWxpdHlQYW5lbCk7XG5cbnZhciBfU2hhcmVDb250ZXh0Q29uc3VtZXIgPSByZXF1aXJlKCcuLi9TaGFyZUNvbnRleHRDb25zdW1lcicpO1xuXG52YXIgX1NoYXJlQ29udGV4dENvbnN1bWVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NoYXJlQ29udGV4dENvbnN1bWVyKTtcblxudmFyIF9tYWluQ2FyZCA9IHJlcXVpcmUoJy4uL21haW4vQ2FyZCcpO1xuXG52YXIgX21haW5DYXJkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21haW5DYXJkKTtcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIFNoYXJlTW9kZWwgPSByZXF1aXJlKCdweWRpbycpLnJlcXVpcmVMaWIoJ1JlYWN0TW9kZWxTaGFyZScpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCdtYXRlcmlhbC11aScpO1xuXG52YXIgRGl2aWRlciA9IF9yZXF1aXJlLkRpdmlkZXI7XG5cbnZhciBQYW5lbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ1BhbmVsJyxcblxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBweWRpbzogUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoUHlkaW8pLFxuICAgICAgICBzaGFyZU1vZGVsOiBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihTaGFyZU1vZGVsKVxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcblxuICAgICAgICB2YXIgbGF5b3V0RGF0YSA9IFNoYXJlTW9kZWwuY29tcGlsZUxheW91dERhdGEodGhpcy5wcm9wcy5weWRpbywgdGhpcy5wcm9wcy5zaGFyZU1vZGVsLmdldE5vZGUoKSk7XG4gICAgICAgIHZhciBsYXlvdXRQYW5lID0gdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmlzaWJpbGl0eVBhbmVsID0gdW5kZWZpbmVkO1xuICAgICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgICAgdmFyIHN0eWxlID0gX3Byb3BzLnN0eWxlO1xuXG4gICAgICAgIHZhciBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcHJvcHMsIFsnc3R5bGUnXSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnNoYXJlTW9kZWwuZ2V0Tm9kZSgpLmlzTGVhZigpICYmIGxheW91dERhdGEubGVuZ3RoID4gMSAmJiB0aGlzLnByb3BzLnNoYXJlTW9kZWwuaGFzUHVibGljTGluaygpKSB7XG4gICAgICAgICAgICBsYXlvdXRQYW5lID0gUmVhY3QuY3JlYXRlRWxlbWVudChfUHVibGljTGlua1RlbXBsYXRlMlsnZGVmYXVsdCddLCBfZXh0ZW5kcyh7fSwgcHJvcHMsIHsgbGlua0RhdGE6IHRoaXMucHJvcHMuc2hhcmVNb2RlbC5nZXRQdWJsaWNMaW5rcygpWzBdLCBsYXlvdXREYXRhOiBsYXlvdXREYXRhIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuc2hhcmVNb2RlbC5jdXJyZW50UmVwb0lzVXNlclNjb3BlKCkpIHtcbiAgICAgICAgICAgIHZpc2liaWxpdHlQYW5lbCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoX1Zpc2liaWxpdHlQYW5lbDJbJ2RlZmF1bHQnXSwgX2V4dGVuZHMoe30sIHByb3BzLCB7IHN0eWxlOiB7IHBhZGRpbmdCb3R0b206IDE2IH0gfSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBfbWFpbkNhcmQyWydkZWZhdWx0J10sXG4gICAgICAgICAgICAgICAgeyBzdHlsZTogdGhpcy5wcm9wcy5zdHlsZSwgdGl0bGU6IHRoaXMucHJvcHMuZ2V0TWVzc2FnZSgnNDg2JywgJycpIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChfTGFiZWxEZXNjcmlwdGlvblBhbmVsMlsnZGVmYXVsdCddLCBfZXh0ZW5kcyh7fSwgcHJvcHMsIHsgc3R5bGU6IHsgbWFyZ2luVG9wOiAtMTAgfSB9KSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChfTm90aWZpY2F0aW9uUGFuZWwyWydkZWZhdWx0J10sIHByb3BzKSxcbiAgICAgICAgICAgICAgICBsYXlvdXRQYW5lXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgdmlzaWJpbGl0eVBhbmVsXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFBhbmVsID0gKDAsIF9TaGFyZUNvbnRleHRDb25zdW1lcjJbJ2RlZmF1bHQnXSkoUGFuZWwpO1xuZXhwb3J0c1snZGVmYXVsdCddID0gUGFuZWw7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX1NoYXJlQ29udGV4dENvbnN1bWVyID0gcmVxdWlyZSgnLi4vU2hhcmVDb250ZXh0Q29uc3VtZXInKTtcblxudmFyIF9TaGFyZUNvbnRleHRDb25zdW1lcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TaGFyZUNvbnRleHRDb25zdW1lcik7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJ21hdGVyaWFsLXVpJyk7XG5cbnZhciBUZXh0RmllbGQgPSBfcmVxdWlyZS5UZXh0RmllbGQ7XG52YXIgU2VsZWN0RmllbGQgPSBfcmVxdWlyZS5TZWxlY3RGaWVsZDtcbnZhciBNZW51SXRlbSA9IF9yZXF1aXJlLk1lbnVJdGVtO1xuXG52YXIgUHVibGljTGlua1RlbXBsYXRlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnUHVibGljTGlua1RlbXBsYXRlJyxcblxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBsaW5rRGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxuICAgIH0sXG5cbiAgICBvbkRyb3BEb3duQ2hhbmdlOiBmdW5jdGlvbiBvbkRyb3BEb3duQ2hhbmdlKGV2ZW50LCBpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zaGFyZU1vZGVsLnNldFRlbXBsYXRlKHRoaXMucHJvcHMubGlua0RhdGEuaGFzaCwgdmFsdWUpO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGNydExhYmVsID0gdW5kZWZpbmVkO1xuICAgICAgICB2YXIgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnNoYXJlTW9kZWwuZ2V0VGVtcGxhdGUodGhpcy5wcm9wcy5saW5rRGF0YS5oYXNoKTtcbiAgICAgICAgdmFyIG1lbnVJdGVtcyA9IHRoaXMucHJvcHMubGF5b3V0RGF0YS5tYXAoZnVuY3Rpb24gKGwpIHtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZCAmJiBsLkxBWU9VVF9FTEVNRU5UID09PSBzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGNydExhYmVsID0gbC5MQVlPVVRfTEFCRUw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXNlbGVjdGVkICYmICFjcnRMYWJlbCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gbC5MQVlPVVRfRUxFTUVOVCwgY3J0TGFiZWwgPSBsLkxBWU9VVF9MQUJFTDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE1lbnVJdGVtLCB7IGtleTogbC5MQVlPVVRfRUxFTUVOVCwgdmFsdWU6IGwuTEFZT1VUX0VMRU1FTlQsIHByaW1hcnlUZXh0OiBsLkxBWU9VVF9MQUJFTCB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciB1bnVzZWRMZWdlbmQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2Zvcm0tbGVnZW5kJyB9LFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXRNZXNzYWdlKCcxOTgnKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgeyBzdHlsZTogdGhpcy5wcm9wcy5zdHlsZSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBTZWxlY3RGaWVsZCxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkRyb3BEb3duQ2hhbmdlLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5pc1JlYWRvbmx5KCksXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0OiB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzE1MScpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZW51SXRlbXNcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuUHVibGljTGlua1RlbXBsYXRlID0gKDAsIF9TaGFyZUNvbnRleHRDb25zdW1lcjJbJ2RlZmF1bHQnXSkoUHVibGljTGlua1RlbXBsYXRlKTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFB1YmxpY0xpbmtUZW1wbGF0ZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfU2hhcmVDb250ZXh0Q29uc3VtZXIgPSByZXF1aXJlKCcuLi9TaGFyZUNvbnRleHRDb25zdW1lcicpO1xuXG52YXIgX1NoYXJlQ29udGV4dENvbnN1bWVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NoYXJlQ29udGV4dENvbnN1bWVyKTtcblxudmFyIF9tYWluQ2FyZCA9IHJlcXVpcmUoJy4uL21haW4vQ2FyZCcpO1xuXG52YXIgX21haW5DYXJkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21haW5DYXJkKTtcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnbWF0ZXJpYWwtdWknKTtcblxudmFyIENoZWNrYm94ID0gX3JlcXVpcmUuQ2hlY2tib3g7XG52YXIgUmFpc2VkQnV0dG9uID0gX3JlcXVpcmUuUmFpc2VkQnV0dG9uO1xudmFyIFRleHRGaWVsZCA9IF9yZXF1aXJlLlRleHRGaWVsZDtcblxudmFyIFZpc2liaWxpdHlQYW5lbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ1Zpc2liaWxpdHlQYW5lbCcsXG5cbiAgICB0b2dnbGVWaXNpYmlsaXR5OiBmdW5jdGlvbiB0b2dnbGVWaXNpYmlsaXR5KCkge1xuICAgICAgICB0aGlzLnByb3BzLnNoYXJlTW9kZWwudG9nZ2xlVmlzaWJpbGl0eSgpO1xuICAgIH0sXG4gICAgdHJhbnNmZXJPd25lcnNoaXA6IGZ1bmN0aW9uIHRyYW5zZmVyT3duZXJzaGlwKCkge1xuICAgICAgICB0aGlzLnByb3BzLnNoYXJlTW9kZWwuc2V0TmV3U2hhcmVPd25lcih0aGlzLnJlZnNbJ25ld093bmVyJ10uZ2V0VmFsdWUoKSk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRJc093bmVyID0gdGhpcy5wcm9wcy5zaGFyZU1vZGVsLmN1cnJlbnRJc093bmVyKCk7XG5cbiAgICAgICAgdmFyIGxlZ2VuZDtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hhcmVNb2RlbC5pc1B1YmxpYygpKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudElzT3duZXIpIHtcbiAgICAgICAgICAgICAgICBsZWdlbmQgPSB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzIwMScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZWdlbmQgPSB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzIwMicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGVnZW5kID0gdGhpcy5wcm9wcy5nZXRNZXNzYWdlKCcyMDYnKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2hvd1RvZ2dsZSA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENoZWNrYm94LCB7IHR5cGU6ICdjaGVja2JveCcsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3NoYXJlX3Zpc2liaWxpdHknLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhY3VycmVudElzT3duZXIgfHwgdGhpcy5wcm9wcy5pc1JlYWRvbmx5KCksXG4gICAgICAgICAgICAgICAgb25DaGVjazogdGhpcy50b2dnbGVWaXNpYmlsaXR5LFxuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHRoaXMucHJvcHMuc2hhcmVNb2RlbC5pc1B1YmxpYygpLFxuICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzIwMCcpXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdzZWN0aW9uLWxlZ2VuZCcgfSxcbiAgICAgICAgICAgICAgICBsZWdlbmRcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hhcmVNb2RlbC5pc1B1YmxpYygpICYmIGN1cnJlbnRJc093bmVyICYmICF0aGlzLnByb3BzLmlzUmVhZG9ubHkoKSkge1xuICAgICAgICAgICAgdmFyIHNob3dUcmFuc2ZlciA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdvd25lcnNoaXAtZm9ybScgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnaDQnLFxuICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzIwMycpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdzZWN0aW9uLWxlZ2VuZCcgfSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXRNZXNzYWdlKCcyMDQnKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEZpZWxkLCB7IHJlZjogJ25ld093bmVyJywgZmxvYXRpbmdMYWJlbFRleHQ6IHRoaXMucHJvcHMuZ2V0TWVzc2FnZSgnMjA1JykgfSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmFpc2VkQnV0dG9uLCB7IGxhYmVsOiB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzIwM2InKSwgb25DbGljazogdGhpcy50cmFuc2Zlck93bmVyc2hpcCB9KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBfbWFpbkNhcmQyWydkZWZhdWx0J10sXG4gICAgICAgICAgICB7IHN0eWxlOiB0aGlzLnByb3BzLnN0eWxlLCB0aXRsZTogdGhpcy5wcm9wcy5nZXRNZXNzYWdlKCcxOTknKSB9LFxuICAgICAgICAgICAgc2hvd1RvZ2dsZSxcbiAgICAgICAgICAgIHNob3dUcmFuc2ZlclxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5WaXNpYmlsaXR5UGFuZWwgPSAoMCwgX1NoYXJlQ29udGV4dENvbnN1bWVyMlsnZGVmYXVsdCddKShWaXNpYmlsaXR5UGFuZWwpO1xuZXhwb3J0c1snZGVmYXVsdCddID0gVmlzaWJpbGl0eVBhbmVsO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfbWFpblBhbmVsID0gcmVxdWlyZSgnLi9tYWluL1BhbmVsJyk7XG5cbnZhciBfbWFpblBhbmVsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21haW5QYW5lbCk7XG5cbnZhciBfcHVibGljRmllbGQgPSByZXF1aXJlKCcuL3B1YmxpYy9GaWVsZCcpO1xuXG52YXIgX3B1YmxpY0ZpZWxkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3B1YmxpY0ZpZWxkKTtcblxudmFyIF9wdWJsaWNQYW5lbCA9IHJlcXVpcmUoJy4vcHVibGljL1BhbmVsJyk7XG5cbnZhciBfcHVibGljUGFuZWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHVibGljUGFuZWwpO1xuXG5leHBvcnRzLk1haW5QYW5lbCA9IF9tYWluUGFuZWwyWydkZWZhdWx0J107XG5leHBvcnRzLlB1YmxpY0xpbmtGaWVsZCA9IF9wdWJsaWNGaWVsZDJbJ2RlZmF1bHQnXTtcbmV4cG9ydHMuUHVibGljTGlua1BhbmVsID0gX3B1YmxpY1BhbmVsMlsnZGVmYXVsdCddO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBkZXNjID0gcGFyZW50ID0gdW5kZWZpbmVkOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfU2hhcmVDb250ZXh0Q29uc3VtZXIgPSByZXF1aXJlKCcuLi9TaGFyZUNvbnRleHRDb25zdW1lcicpO1xuXG52YXIgX1NoYXJlQ29udGV4dENvbnN1bWVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NoYXJlQ29udGV4dENvbnN1bWVyKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIENvbXBvbmVudCA9IF9yZXF1aXJlLkNvbXBvbmVudDtcbnZhciBQcm9wVHlwZXMgPSBfcmVxdWlyZS5Qcm9wVHlwZXM7XG5cbnZhciBfcmVxdWlyZTIgPSByZXF1aXJlKCdtYXRlcmlhbC11aScpO1xuXG52YXIgSWNvbkJ1dHRvbiA9IF9yZXF1aXJlMi5JY29uQnV0dG9uO1xuXG52YXIgX3JlcXVpcmUzID0gcmVxdWlyZSgnbWF0ZXJpYWwtdWkvc3R5bGVzJyk7XG5cbnZhciBtdWlUaGVtZWFibGUgPSBfcmVxdWlyZTMubXVpVGhlbWVhYmxlO1xuXG52YXIgQWN0aW9uQnV0dG9uID0gKGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKEFjdGlvbkJ1dHRvbiwgX0NvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBBY3Rpb25CdXR0b24oKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBY3Rpb25CdXR0b24pO1xuXG4gICAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEFjdGlvbkJ1dHRvbi5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhBY3Rpb25CdXR0b24sIFt7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICB2YXIgcGFsZXR0ZSA9IHRoaXMucHJvcHMubXVpVGhlbWUucGFsZXR0ZTtcblxuICAgICAgICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICAgICAgICAgIHJvb3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBwYWxldHRlLnByaW1hcnkxQ29sb3IsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzNiwgaGVpZ2h0OiAzNixcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogOCxcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAnMCA2cHgnLFxuICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGljb246IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAyMCxcbiAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzIwcHgnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbkJ1dHRvbiwge1xuICAgICAgICAgICAgICAgIHN0eWxlOiBzdHlsZS5yb290LFxuICAgICAgICAgICAgICAgIGljb25TdHlsZTogc3R5bGUuaWNvbixcbiAgICAgICAgICAgICAgICBvblRvdWNoVGFwOiB0aGlzLnByb3BzLmNhbGxiYWNrIHx8IHRoaXMucHJvcHMub25Ub3VjaFRhcCxcbiAgICAgICAgICAgICAgICBpY29uQ2xhc3NOYW1lOiBcIm1kaSBtZGktXCIgKyB0aGlzLnByb3BzLm1kaUljb24sXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogdGhpcy5wcm9wcy5nZXRNZXNzYWdlKHRoaXMucHJvcHMubWVzc2FnZUlkLCB0aGlzLnByb3BzLm1lc3NhZ2VDb3JlTmFtZXNwYWNlID8gJycgOiB1bmRlZmluZWQpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBBY3Rpb25CdXR0b247XG59KShDb21wb25lbnQpO1xuXG5BY3Rpb25CdXR0b24ucHJvcFR5cGVzID0ge1xuICAgIGNhbGxiYWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblRvdWNoVGFwOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBtZGlJY29uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1lc3NhZ2VJZDogUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuQWN0aW9uQnV0dG9uID0gKDAsIF9TaGFyZUNvbnRleHRDb25zdW1lcjJbJ2RlZmF1bHQnXSkoQWN0aW9uQnV0dG9uKTtcbkFjdGlvbkJ1dHRvbiA9IG11aVRoZW1lYWJsZSgpKEFjdGlvbkJ1dHRvbik7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEFjdGlvbkJ1dHRvbjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnbWF0ZXJpYWwtdWknKTtcblxudmFyIEZsYXRCdXR0b24gPSBfcmVxdWlyZS5GbGF0QnV0dG9uO1xudmFyIEljb25CdXR0b24gPSBfcmVxdWlyZS5JY29uQnV0dG9uO1xuXG52YXIgQnV0dG9uc0NvbXB1dGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCdXR0b25zQ29tcHV0ZXIocHlkaW8sIHNoYXJlTW9kZWwsIGJ1dHRvbnNVcGRhdGVyLCBkaXNtaXNzQ2FsbGJhY2ssIGdldE1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIHVzZUljb25CdXR0b25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSA1IHx8IGFyZ3VtZW50c1s1XSA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBhcmd1bWVudHNbNV07XG5cbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJ1dHRvbnNDb21wdXRlcik7XG5cbiAgICAgICAgdGhpcy5weWRpbyA9IHB5ZGlvO1xuICAgICAgICB0aGlzLl9idXR0b25zVXBkYXRlciA9IGJ1dHRvbnNVcGRhdGVyO1xuICAgICAgICB0aGlzLl9kaXNtaXNzQ2FsbGJhY2sgPSBkaXNtaXNzQ2FsbGJhY2s7XG4gICAgICAgIHRoaXMuX3NoYXJlTW9kZWwgPSBzaGFyZU1vZGVsO1xuICAgICAgICB0aGlzLl9zYXZlRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZ2V0TWVzc2FnZSA9IGdldE1lc3NhZ2U7XG4gICAgICAgIHRoaXMuX2ljb25CdXR0b25zID0gdXNlSWNvbkJ1dHRvbnM7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEJ1dHRvbnNDb21wdXRlciwgW3tcbiAgICAgICAga2V5OiAnZW5hYmxlU2F2ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBlbmFibGVTYXZlKCkge1xuICAgICAgICAgICAgdGhpcy5fc2F2ZURpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm1vZGVsVXBkYXRlZCgpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdkaXNhYmxlU2F2ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNhYmxlU2F2ZSgpIHtcbiAgICAgICAgICAgIHRoaXMuX3NhdmVEaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1vZGVsVXBkYXRlZCgpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICd0cmlnZ2VyTW9kZWxTYXZlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHRyaWdnZXJNb2RlbFNhdmUoKSB7XG4gICAgICAgICAgICB0aGlzLl9zaGFyZU1vZGVsLnNhdmUoKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAndHJpZ2dlck1vZGVsUmV2ZXJ0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHRyaWdnZXJNb2RlbFJldmVydCgpIHtcbiAgICAgICAgICAgIHRoaXMuX3NoYXJlTW9kZWwucmV2ZXJ0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdkaXNhYmxlQWxsU2hhcmUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGlzYWJsZUFsbFNoYXJlKCkge1xuICAgICAgICAgICAgdGhpcy5fc2hhcmVNb2RlbC5zdG9wU2hhcmluZyh0aGlzLl9kaXNtaXNzQ2FsbGJhY2suYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ21vZGVsVXBkYXRlZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBtb2RlbFVwZGF0ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLl9idXR0b25zVXBkYXRlcih0aGlzLmdldEJ1dHRvbnMoKSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3N0YXJ0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICAgICAgdGhpcy5fbW9kZWxPYnNlcnZlciA9IHRoaXMubW9kZWxVcGRhdGVkLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9kaXNhYmxlU2F2ZU9ic2VydmVyID0gdGhpcy5kaXNhYmxlU2F2ZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fZW5hYmxlU2F2ZU9ic2VydmVyID0gdGhpcy5lbmFibGVTYXZlLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9zaGFyZU1vZGVsLm9ic2VydmUoXCJzdGF0dXNfY2hhbmdlZFwiLCB0aGlzLl9tb2RlbE9ic2VydmVyKTtcbiAgICAgICAgICAgIHRoaXMuX3NoYXJlTW9kZWwub2JzZXJ2ZSgnc2F2aW5nJywgdGhpcy5fZGlzYWJsZVNhdmVPYnNlcnZlcik7XG4gICAgICAgICAgICB0aGlzLl9zaGFyZU1vZGVsLm9ic2VydmUoJ3NhdmVkJywgdGhpcy5fZW5hYmxlU2F2ZU9ic2VydmVyKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc3RvcCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICAgICAgdGhpcy5fc2hhcmVNb2RlbC5zdG9wT2JzZXJ2aW5nKFwic3RhdHVzX2NoYW5nZWRcIiwgdGhpcy5fbW9kZWxPYnNlcnZlcik7XG4gICAgICAgICAgICB0aGlzLl9zaGFyZU1vZGVsLnN0b3BPYnNlcnZpbmcoJ3NhdmluZycsIHRoaXMuX2Rpc2FibGVTYXZlT2JzZXJ2ZXIpO1xuICAgICAgICAgICAgdGhpcy5fc2hhcmVNb2RlbC5zdG9wT2JzZXJ2aW5nKCdzYXZlZCcsIHRoaXMuX2VuYWJsZVNhdmVPYnNlcnZlcik7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldEJ1dHRvbnMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QnV0dG9ucygpIHtcbiAgICAgICAgICAgIHZhciBidXR0b25zID0gW107XG4gICAgICAgICAgICB2YXIgaWMgPSB0aGlzLl9pY29uQnV0dG9ucztcbiAgICAgICAgICAgIGlmICh0aGlzLl9zaGFyZU1vZGVsLmdldFN0YXR1cygpID09ICdtb2RpZmllZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoaWMpIHtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9ucy5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbkJ1dHRvbiwgeyBpY29uQ2xhc3NOYW1lOiAnbWRpIG1kaS11bmRvLXZhcmlhbnQnLCBvblRvdWNoVGFwOiB0aGlzLnRyaWdnZXJNb2RlbFJldmVydC5iaW5kKHRoaXMpLCB0b29sdGlwOiB0aGlzLl9nZXRNZXNzYWdlKCcxNzknKSB9KSk7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbnMucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KEljb25CdXR0b24sIHsgaWNvbkNsYXNzTmFtZTogJ21kaSBtZGktY2hlY2snLCBzZWNvbmRhcnk6IHRydWUsIGRpc2FibGVkOiB0aGlzLl9zYXZlRGlzYWJsZWQsIHRvb2x0aXA6IHRoaXMuX2dldE1lc3NhZ2UoJzUzJywgJycpLCBvblRvdWNoVGFwOiB0aGlzLnRyaWdnZXJNb2RlbFNhdmUuYmluZCh0aGlzKSB9KSk7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbnMucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KEljb25CdXR0b24sIHsgaWNvbkNsYXNzTmFtZTogJ21kaSBtZGktY2xvc2UnLCBzZWNvbmRhcnk6IGZhbHNlLCB0b29sdGlwOiB0aGlzLl9nZXRNZXNzYWdlKCc4NicsICcnKSwgb25Ub3VjaFRhcDogdGhpcy5fZGlzbWlzc0NhbGxiYWNrLmJpbmQodGhpcykgfSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbnMucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2EnLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogeyBjdXJzb3I6ICdwb2ludGVyJywgY29sb3I6ICdyZ2JhKDAsMCwwLDAuNTMpJyB9LCBvbkNsaWNrOiB0aGlzLnRyaWdnZXJNb2RlbFJldmVydC5iaW5kKHRoaXMpIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRNZXNzYWdlKCcxNzknKVxuICAgICAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9ucy5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmxhdEJ1dHRvbiwgeyBzZWNvbmRhcnk6IHRydWUsIGRpc2FibGVkOiB0aGlzLl9zYXZlRGlzYWJsZWQsIGxhYmVsOiB0aGlzLl9nZXRNZXNzYWdlKCc1MycsICcnKSwgb25Ub3VjaFRhcDogdGhpcy50cmlnZ2VyTW9kZWxTYXZlLmJpbmQodGhpcykgfSkpO1xuICAgICAgICAgICAgICAgICAgICBidXR0b25zLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChGbGF0QnV0dG9uLCB7IHNlY29uZGFyeTogZmFsc2UsIGxhYmVsOiB0aGlzLl9nZXRNZXNzYWdlKCc4NicsICcnKSwgb25Ub3VjaFRhcDogdGhpcy5fZGlzbWlzc0NhbGxiYWNrLmJpbmQodGhpcykgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NoYXJlTW9kZWwuaGFzQWN0aXZlU2hhcmVzKCkgJiYgdGhpcy5fc2hhcmVNb2RlbC5jdXJyZW50SXNPd25lcigpIHx8IHRoaXMuX3NoYXJlTW9kZWwuZ2V0U3RhdHVzKCkgPT09ICdlcnJvcicgfHwgdGhpcy5weWRpby51c2VyLmFjdGl2ZVJlcG9zaXRvcnkgPT09IFwiYWp4cF9jb25mXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGljKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b25zLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChJY29uQnV0dG9uLCB7IGljb25DbGFzc05hbWU6ICdtZGkgbWRpLWNhbmNlbCcsIGRpc2FibGVkOiB0aGlzLl9zYXZlRGlzYWJsZWQsIHNlY29uZGFyeTogdHJ1ZSwgdG9vbHRpcDogdGhpcy5fZ2V0TWVzc2FnZSgnNicpLCBvblRvdWNoVGFwOiB0aGlzLmRpc2FibGVBbGxTaGFyZS5iaW5kKHRoaXMpIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnMucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KEZsYXRCdXR0b24sIHsgZGlzYWJsZWQ6IHRoaXMuX3NhdmVEaXNhYmxlZCwgc2Vjb25kYXJ5OiB0cnVlLCBsYWJlbDogdGhpcy5fZ2V0TWVzc2FnZSgnNicpLCBvblRvdWNoVGFwOiB0aGlzLmRpc2FibGVBbGxTaGFyZS5iaW5kKHRoaXMpIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaWMpIHtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9ucy5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbkJ1dHRvbiwgeyBpY29uQ2xhc3NOYW1lOiAnbWRpIG1kaS1jbG9zZScsIHNlY29uZGFyeTogZmFsc2UsIHRvb2x0aXA6IHRoaXMuX2dldE1lc3NhZ2UoJzg2JywgJycpLCBvblRvdWNoVGFwOiB0aGlzLl9kaXNtaXNzQ2FsbGJhY2suYmluZCh0aGlzKSB9KSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9ucy5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmxhdEJ1dHRvbiwgeyBzZWNvbmRhcnk6IGZhbHNlLCBsYWJlbDogdGhpcy5fZ2V0TWVzc2FnZSgnODYnLCAnJyksIG9uVG91Y2hUYXA6IHRoaXMuX2Rpc21pc3NDYWxsYmFjay5iaW5kKHRoaXMpIH0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYnV0dG9ucztcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBCdXR0b25zQ29tcHV0ZXI7XG59KSgpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBCdXR0b25zQ29tcHV0ZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgZGVzYyA9IHBhcmVudCA9IHVuZGVmaW5lZDsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIENvbXBvbmVudCA9IF9yZXF1aXJlLkNvbXBvbmVudDtcblxudmFyIF9yZXF1aXJlMiA9IHJlcXVpcmUoJ21hdGVyaWFsLXVpJyk7XG5cbnZhciBQYXBlciA9IF9yZXF1aXJlMi5QYXBlcjtcblxudmFyIENhcmQgPSAoZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoQ2FyZCwgX0NvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBDYXJkKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ2FyZCk7XG5cbiAgICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ2FyZC5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhDYXJkLCBbe1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuXG4gICAgICAgICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgcGFuZWw6IF9leHRlbmRzKHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMTYsXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjogMTBcbiAgICAgICAgICAgICAgICB9LCB0aGlzLnByb3BzLnN0eWxlKSxcbiAgICAgICAgICAgICAgICB0aXRsZTogX2V4dGVuZHMoe1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wOiAwLFxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMThcbiAgICAgICAgICAgICAgICB9LCB0aGlzLnByb3BzLnRpdGxlU3R5bGUpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBQYXBlcixcbiAgICAgICAgICAgICAgICB7IHpEZXB0aDogMSwgcm91bmRlZDogZmFsc2UsIHN0eWxlOiBzdHlsZS5wYW5lbCB9LFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudGl0bGUgJiYgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2gzJyxcbiAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGUudGl0bGUgfSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy50aXRsZVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlbixcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmFjdGlvbnMgJiYgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgdGV4dEFsaWduOiAnY2VudGVyJywgY2xlYXI6ICdib3RoJywgcG9zaXRpb246ICdyZWxhdGl2ZScsIHBhZGRpbmc6ICcxMHB4IDAnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5hY3Rpb25zXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBDYXJkO1xufSkoQ29tcG9uZW50KTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gQ2FyZDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfU2hhcmVDb250ZXh0Q29uc3VtZXIgPSByZXF1aXJlKCcuLi9TaGFyZUNvbnRleHRDb25zdW1lcicpO1xuXG52YXIgX1NoYXJlQ29udGV4dENvbnN1bWVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NoYXJlQ29udGV4dENvbnN1bWVyKTtcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgncmVhY3QtdGV4dGZpdCcpO1xuXG52YXIgVGV4dGZpdCA9IF9yZXF1aXJlLlRleHRmaXQ7XG5cbnZhciBfcmVxdWlyZTIgPSByZXF1aXJlKCdtYXRlcmlhbC11aS9zdHlsZXMnKTtcblxudmFyIG11aVRoZW1lYWJsZSA9IF9yZXF1aXJlMi5tdWlUaGVtZWFibGU7XG5cbnZhciBQYXRoVXRpbHMgPSByZXF1aXJlKCdweWRpby91dGlsL3BhdGgnKTtcblxudmFyIEhlYWRlclBhbmVsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnSGVhZGVyUGFuZWwnLFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMubm9Nb2RhbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5vZGVQYXRoID0gdGhpcy5wcm9wcy5zaGFyZU1vZGVsLmdldE5vZGUoKS5nZXRQYXRoKCk7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2hlYWRlclBhbmVsJywgc3R5bGU6IHsgYmFja2dyb3VuZENvbG9yOiB0aGlzLnByb3BzLm11aVRoZW1lLnBhbGV0dGUucHJpbWFyeTFDb2xvciB9IH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIFRleHRmaXQsXG4gICAgICAgICAgICAgICAgeyBtb2RlOiAnc2luZ2xlJywgbWF4OiAzMCB9LFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0TWVzc2FnZSgnNDQnKS5yZXBsYWNlKCclcycsIFBhdGhVdGlscy5nZXRCYXNlbmFtZShub2RlUGF0aCkpXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEhlYWRlclBhbmVsID0gKDAsIF9TaGFyZUNvbnRleHRDb25zdW1lcjJbJ2RlZmF1bHQnXSkoSGVhZGVyUGFuZWwpO1xuZXhwb3J0c1snZGVmYXVsdCddID0gSGVhZGVyUGFuZWwgPSBtdWlUaGVtZWFibGUoKShIZWFkZXJQYW5lbCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEhlYWRlclBhbmVsO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94NSwgX3g2LCBfeDcpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3g1LCBwcm9wZXJ0eSA9IF94NiwgcmVjZWl2ZXIgPSBfeDc7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3g1ID0gcGFyZW50OyBfeDYgPSBwcm9wZXJ0eTsgX3g3ID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGRlc2MgPSBwYXJlbnQgPSB1bmRlZmluZWQ7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9IZWFkZXIgPSByZXF1aXJlKCcuL0hlYWRlcicpO1xuXG52YXIgX0hlYWRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9IZWFkZXIpO1xuXG52YXIgX3B1YmxpY1BhbmVsID0gcmVxdWlyZSgnLi4vcHVibGljL1BhbmVsJyk7XG5cbnZhciBfcHVibGljUGFuZWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHVibGljUGFuZWwpO1xuXG52YXIgX3VzZXJzUGFuZWwgPSByZXF1aXJlKCcuLi91c2Vycy9QYW5lbCcpO1xuXG52YXIgX3VzZXJzUGFuZWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlcnNQYW5lbCk7XG5cbnZhciBfYWR2YW5jZWRQYW5lbCA9IHJlcXVpcmUoJy4uL2FkdmFuY2VkL1BhbmVsJyk7XG5cbnZhciBfYWR2YW5jZWRQYW5lbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hZHZhbmNlZFBhbmVsKTtcblxudmFyIF9CdXR0b25zQ29tcHV0ZXIgPSByZXF1aXJlKCcuL0J1dHRvbnNDb21wdXRlcicpO1xuXG52YXIgX0J1dHRvbnNDb21wdXRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9CdXR0b25zQ29tcHV0ZXIpO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCdtYXRlcmlhbC11aScpO1xuXG52YXIgVGFicyA9IF9yZXF1aXJlLlRhYnM7XG52YXIgVGFiID0gX3JlcXVpcmUuVGFiO1xudmFyIFRvZ2dsZSA9IF9yZXF1aXJlLlRvZ2dsZTtcblxudmFyIF9yZXF1aXJlJHJlcXVpcmVMaWIgPSByZXF1aXJlKCdweWRpbycpLnJlcXVpcmVMaWIoJ2Jvb3QnKTtcblxudmFyIEFjdGlvbkRpYWxvZ01peGluID0gX3JlcXVpcmUkcmVxdWlyZUxpYi5BY3Rpb25EaWFsb2dNaXhpbjtcblxudmFyIFNoYXJlTW9kZWwgPSByZXF1aXJlKCdweWRpbycpLnJlcXVpcmVMaWIoJ1JlYWN0TW9kZWxTaGFyZScpO1xuXG52YXIgX3JlcXVpcmUkcmVxdWlyZUxpYjIgPSByZXF1aXJlKCdweWRpbycpLnJlcXVpcmVMaWIoJ2hvYycpO1xuXG52YXIgUGFsZXR0ZU1vZGlmaWVyID0gX3JlcXVpcmUkcmVxdWlyZUxpYjIuUGFsZXR0ZU1vZGlmaWVyO1xuXG52YXIgTWFpblBhbmVsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnTWFpblBhbmVsJyxcblxuICAgIG1peGluczogW0FjdGlvbkRpYWxvZ01peGluXSxcblxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlhbG9nVGl0bGU6ICcnLFxuICAgICAgICAgICAgZGlhbG9nSXNNb2RhbDogZmFsc2UsXG4gICAgICAgICAgICBkaWFsb2dQYWRkaW5nOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgcHlkaW86IFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKFB5ZGlvKS5pc1JlcXVpcmVkLFxuICAgICAgICBzZWxlY3Rpb246IFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKFB5ZGlvRGF0YU1vZGVsKS5pc1JlcXVpcmVkLFxuICAgICAgICByZWFkb25seTogUmVhY3QuUHJvcFR5cGVzLmJvb2xcbiAgICB9LFxuXG4gICAgY2hpbGRDb250ZXh0VHlwZXM6IHtcbiAgICAgICAgbWVzc2FnZXM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGdldE1lc3NhZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBpc1JlYWRvbmx5OiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuICAgIH0sXG5cbiAgICBnZXRDaGlsZENvbnRleHQ6IGZ1bmN0aW9uIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICAgICAgdmFyIG1lc3NhZ2VzID0gdGhpcy5wcm9wcy5weWRpby5NZXNzYWdlSGFzaDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1lc3NhZ2VzOiBtZXNzYWdlcyxcbiAgICAgICAgICAgIGdldE1lc3NhZ2U6IGZ1bmN0aW9uIGdldE1lc3NhZ2UobWVzc2FnZUlkKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWVzcGFjZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/ICdzaGFyZV9jZW50ZXInIDogYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2VzW25hbWVzcGFjZSArIChuYW1lc3BhY2UgPyBcIi5cIiA6IFwiXCIpICsgbWVzc2FnZUlkXSB8fCBtZXNzYWdlSWQ7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZUlkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1JlYWRvbmx5OiAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnJlYWRvbmx5O1xuICAgICAgICAgICAgfSkuYmluZCh0aGlzKVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBtb2RlbFVwZGF0ZWQ6IGZ1bmN0aW9uIG1vZGVsVXBkYXRlZChldmVudERhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICBpZiAodGhpcy5pc01vdW50ZWQoKSkge1xuICAgICAgICAgICAgdmFyIG1vZGVsRmlyc3RMb2FkID0gdGhpcy5zdGF0ZS5tb2RlbEZpcnN0TG9hZDtcblxuICAgICAgICAgICAgdmFyIGFmdGVyU3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAobW9kZWxGaXJzdExvYWQpIHtcbiAgICAgICAgICAgICAgICBhZnRlclN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7IG1vZGVsRmlyc3RMb2FkOiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBldmVudERhdGEuc3RhdHVzLFxuICAgICAgICAgICAgICAgIG1vZGVsOiBldmVudERhdGEubW9kZWxcbiAgICAgICAgICAgIH0sIGFmdGVyU3RhdGUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdHVzOiAnaWRsZScsXG4gICAgICAgICAgICBtYWlsZXJEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIG1vZGVsOiBuZXcgU2hhcmVNb2RlbCh0aGlzLnByb3BzLnB5ZGlvLCB0aGlzLnByb3BzLnNlbGVjdGlvbi5nZXRVbmlxdWVOb2RlKCksIHRoaXMucHJvcHMuc2VsZWN0aW9uKSxcbiAgICAgICAgICAgIG1vZGVsRmlyc3RMb2FkOiB0cnVlXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5tb2RlbC5vYnNlcnZlKFwic3RhdHVzX2NoYW5nZWRcIiwgdGhpcy5tb2RlbFVwZGF0ZWQpO1xuICAgICAgICB0aGlzLnN0YXRlLm1vZGVsLmluaXRMb2FkKCk7XG4gICAgfSxcblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYnV0dG9uc0NvbXB1dGVyKSB0aGlzLmJ1dHRvbnNDb21wdXRlci5zdG9wKCk7XG4gICAgfSxcblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgIGlmIChuZXh0UHJvcHMuc2VsZWN0aW9uICYmIG5leHRQcm9wcy5zZWxlY3Rpb24gIT09IHRoaXMucHJvcHMuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB2YXIgbmV4dE1vZGVsID0gbmV3IFNoYXJlTW9kZWwodGhpcy5wcm9wcy5weWRpbywgbmV4dFByb3BzLnNlbGVjdGlvbi5nZXRVbmlxdWVOb2RlKCksIG5leHRQcm9wcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG1vZGVsOiBuZXh0TW9kZWwsIHN0YXR1czogJ2lkbGUnLCBtYWlsZXJEYXRhOiBmYWxzZSB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMyLmNvbXBvbmVudERpZE1vdW50KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRCdXR0b25zOiBmdW5jdGlvbiBnZXRCdXR0b25zKHVwZGF0ZXIpIHtcblxuICAgICAgICB0aGlzLmJ1dHRvbnNDb21wdXRlciA9IG5ldyBfQnV0dG9uc0NvbXB1dGVyMlsnZGVmYXVsdCddKHRoaXMucHJvcHMucHlkaW8sIHRoaXMuc3RhdGUubW9kZWwsIHVwZGF0ZXIsIHRoaXMuZGlzbWlzcywgdGhpcy5nZXRNZXNzYWdlLCB0aGlzLnByb3BzLm5vTW9kYWwpO1xuICAgICAgICB0aGlzLmJ1dHRvbnNDb21wdXRlci5zdGFydCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5idXR0b25zQ29tcHV0ZXIuZ2V0QnV0dG9ucygpO1xuICAgIH0sXG5cbiAgICBzaG93TWFpbGVyOiBmdW5jdGlvbiBzaG93TWFpbGVyKHN1YmplY3QsIG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIHVzZXJzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gW10gOiBhcmd1bWVudHNbMl07XG4gICAgICAgIHZhciBoYXNoID0gYXJndW1lbnRzLmxlbmd0aCA8PSAzIHx8IGFyZ3VtZW50c1szXSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGFyZ3VtZW50c1szXTtcblxuICAgICAgICBpZiAoU2hhcmVNb2RlbC5mb3JjZU1haWxlck9sZFNjaG9vbCgpKSB7XG4gICAgICAgICAgICBzdWJqZWN0ID0gZW5jb2RlVVJJQ29tcG9uZW50KHN1YmplY3QpO1xuICAgICAgICAgICAgZ2xvYmFsLmxvY2F0aW9uLmhyZWYgPSBcIm1haWx0bzpjdXN0b20tZW1haWxAZG9tYWluLmNvbT9TdWJqZWN0PVwiICsgc3ViamVjdCArIFwiJkJvZHk9XCIgKyBtZXNzYWdlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsaW5rRGF0YSA9IGhhc2ggPyB0aGlzLnN0YXRlLm1vZGVsLmdldExpbmtEYXRhKGhhc2gpIDogdW5kZWZpbmVkO1xuICAgICAgICBnbG9iYWwuUmVzb3VyY2VzTWFuYWdlci5sb2FkQ2xhc3Nlc0FuZEFwcGx5KFsnUHlkaW9NYWlsZXInXSwgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIG1haWxlckRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgc3ViamVjdDogc3ViamVjdCxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgdXNlcnM6IHVzZXJzLFxuICAgICAgICAgICAgICAgICAgICBoYXNoOiBoYXNoLFxuICAgICAgICAgICAgICAgICAgICBlbmFibGVJZGVudGlmaWNhdGlvbjogbGlua0RhdGEgJiYgbGlua0RhdGEudGFyZ2V0X3VzZXJzLFxuICAgICAgICAgICAgICAgICAgICBjcmlwcGxlSWRlbnRpZmljYXRpb25LZXlzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVkT25seTogbGlua0RhdGEgJiYgbGlua0RhdGEucmVzdHJpY3RfdG9fdGFyZ2V0X3VzZXJzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmJpbmQodGhpcykpO1xuICAgIH0sXG5cbiAgICB0b2dnbGVNYWlsZXJEYXRhOiBmdW5jdGlvbiB0b2dnbGVNYWlsZXJEYXRhKGRhdGEpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG1haWxlckRhdGE6IF9leHRlbmRzKHt9LCB0aGlzLnN0YXRlLm1haWxlckRhdGEsIGRhdGEpIH0pO1xuICAgIH0sXG5cbiAgICBkaXNtaXNzTWFpbGVyOiBmdW5jdGlvbiBkaXNtaXNzTWFpbGVyKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbWFpbGVyRGF0YTogZmFsc2UgfSk7XG4gICAgfSxcblxuICAgIG1haWxlclByb2Nlc3NQb3N0OiBmdW5jdGlvbiBtYWlsZXJQcm9jZXNzUG9zdChFbWFpbCwgdXNlcnMsIHN1YmplY3QsIG1lc3NhZ2UsIGxpbmssIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBfc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICB2YXIgbW9kZWwgPSBfc3RhdGUubW9kZWw7XG4gICAgICAgIHZhciBtYWlsZXJEYXRhID0gX3N0YXRlLm1haWxlckRhdGE7XG4gICAgICAgIHZhciBjcmlwcGxlSWRlbnRpZmljYXRpb25LZXlzID0gbWFpbGVyRGF0YS5jcmlwcGxlSWRlbnRpZmljYXRpb25LZXlzO1xuICAgICAgICB2YXIgaWRlbnRpZmllZE9ubHkgPSBtYWlsZXJEYXRhLmlkZW50aWZpZWRPbmx5O1xuICAgICAgICB2YXIgaGFzaCA9IG1haWxlckRhdGEuaGFzaDtcblxuICAgICAgICB2YXIgY2xpZW50ID0gUHlkaW9BcGkuZ2V0Q2xpZW50KCk7XG4gICAgICAgIHZhciBzaGFyZUxhYmVscyA9IHt9LFxuICAgICAgICAgICAgc2hhcmVNYWlscyA9IHt9O1xuICAgICAgICBPYmplY3Qua2V5cyh1c2VycykuZm9yRWFjaChmdW5jdGlvbiAodSkge1xuICAgICAgICAgICAgdmFyIGsgPSBjcmlwcGxlSWRlbnRpZmljYXRpb25LZXlzID8gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpIDogdTtcbiAgICAgICAgICAgIHNoYXJlTGFiZWxzW2tdID0gdXNlcnNbdV0uZ2V0TGFiZWwoKTtcbiAgICAgICAgICAgIHNoYXJlTWFpbHNba10gPSB1O1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gU3RvcmUga2V5c1xuICAgICAgICBjbGllbnQucmVxdWVzdCh7XG4gICAgICAgICAgICBnZXRfYWN0aW9uOiAnc2hhcmVfbGlua191cGRhdGVfdGFyZ2V0X3VzZXJzJyxcbiAgICAgICAgICAgIGhhc2g6IGhhc2gsXG4gICAgICAgICAgICBqc29uX3VzZXJzOiBKU09OLnN0cmluZ2lmeShzaGFyZUxhYmVscyksXG4gICAgICAgICAgICByZXN0cmljdDogaWRlbnRpZmllZE9ubHkgPyAndHJ1ZScgOiAnZmFsc2UnXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBlbWFpbCA9IG5ldyBFbWFpbCgpO1xuICAgICAgICAgICAgdmFyIG9yaWdpbmFsTGluayA9IG1vZGVsLmdldFB1YmxpY0xpbmsoaGFzaCk7XG4gICAgICAgICAgICB2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cChvcmlnaW5hbExpbmssICdnJyk7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhzaGFyZU1haWxzKS5mb3JFYWNoKGZ1bmN0aW9uICh1KSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0xpbmsgPSBvcmlnaW5hbExpbmsgKyAnP3U9JyArIHU7XG4gICAgICAgICAgICAgICAgdmFyIG5ld01lc3NhZ2UgPSBtZXNzYWdlLnJlcGxhY2UocmVnZXhwLCBuZXdMaW5rKTtcbiAgICAgICAgICAgICAgICBlbWFpbC5hZGRUYXJnZXQoc2hhcmVNYWlsc1t1XSwgc3ViamVjdCwgbmV3TWVzc2FnZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVtYWlsLnBvc3QoZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwubG9hZCh0cnVlKTsgLy8gUmVsb2FkIGRhdGFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgZ2V0TWVzc2FnZTogZnVuY3Rpb24gZ2V0TWVzc2FnZShrZXkpIHtcbiAgICAgICAgdmFyIG5hbWVzcGFjZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/ICdzaGFyZV9jZW50ZXInIDogYXJndW1lbnRzWzFdO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnB5ZGlvLk1lc3NhZ2VIYXNoW25hbWVzcGFjZSArIChuYW1lc3BhY2UgPyAnLicgOiAnJykgKyBrZXldO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIF9zdGF0ZTIgPSB0aGlzLnN0YXRlO1xuICAgICAgICB2YXIgbW9kZWwgPSBfc3RhdGUyLm1vZGVsO1xuICAgICAgICB2YXIgbW9kZWxGaXJzdExvYWQgPSBfc3RhdGUyLm1vZGVsRmlyc3RMb2FkO1xuXG4gICAgICAgIHZhciBidXR0b25TdHlsZSA9IHsgdGV4dFRyYW5zZm9ybTogJ25vbmUnIH07XG4gICAgICAgIHZhciBzaG93TWFpbGVyID0gU2hhcmVNb2RlbC5tYWlsZXJBY3RpdmUoKSA/IHRoaXMuc2hvd01haWxlciA6IG51bGw7XG4gICAgICAgIHZhciBhdXRoID0gU2hhcmVNb2RlbC5nZXRBdXRob3JpemF0aW9ucyh0aGlzLnByb3BzLnB5ZGlvKTtcbiAgICAgICAgdmFyIHBhbmVscyA9IFtdLFxuICAgICAgICAgICAgaGFzUHVibGljTGluayA9IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGluaXRpYWxTZWxlY3RlZEluZGV4ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmIChtb2RlbC5nZXROb2RlKCkuaXNMZWFmKCkgJiYgYXV0aC5maWxlX3B1YmxpY19saW5rIHx8ICFtb2RlbC5nZXROb2RlKCkuaXNMZWFmKCkgJiYgYXV0aC5mb2xkZXJfcHVibGljX2xpbmspIHtcbiAgICAgICAgICAgIHZhciBwdWJsaWNMaW5rcyA9IG1vZGVsLmdldFB1YmxpY0xpbmtzKCk7XG4gICAgICAgICAgICB2YXIgbGlua0RhdGEgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAocHVibGljTGlua3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGlua0RhdGEgPSBwdWJsaWNMaW5rc1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwdWJMYWJlbCA9IHRoaXMuZ2V0TWVzc2FnZSgxMjEpO1xuICAgICAgICAgICAgaWYgKG1vZGVsLmhhc1B1YmxpY0xpbmsoKSkge1xuICAgICAgICAgICAgICAgIHB1YkxhYmVsID0gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICBwdWJMYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgJyAnLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBjbGFzc05hbWU6ICdtZGkgbWRpLWNoZWNrJyB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaGFzUHVibGljTGluayA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYW5lbHMucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIFRhYixcbiAgICAgICAgICAgICAgICB7IGtleTogJ3B1YmxpYy1saW5rJywgdmFsdWU6ICdwdWJsaWMtbGluaycsIGxhYmVsOiBwdWJMYWJlbCwgYnV0dG9uU3R5bGU6IGJ1dHRvblN0eWxlIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChfcHVibGljUGFuZWwyWydkZWZhdWx0J10sIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd01haWxlcjogc2hvd01haWxlcixcbiAgICAgICAgICAgICAgICAgICAgbGlua0RhdGE6IGxpbmtEYXRhLFxuICAgICAgICAgICAgICAgICAgICBweWRpbzogdGhpcy5wcm9wcy5weWRpbyxcbiAgICAgICAgICAgICAgICAgICAgc2hhcmVNb2RlbDogbW9kZWwsXG4gICAgICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb25zOiBhdXRoLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogeyBoZWlnaHQ6ICcxMDAlJywgb3ZlcmZsb3dZOiAnYXV0bycgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobW9kZWwuZ2V0Tm9kZSgpLmlzTGVhZigpICYmIGF1dGguZmlsZV93b3Jrc3BhY2VzIHx8ICFtb2RlbC5nZXROb2RlKCkuaXNMZWFmKCkgJiYgYXV0aC5mb2xkZXJfd29ya3NwYWNlcykge1xuICAgICAgICAgICAgdmFyIHRvdGFsVXNlcnMgPSBtb2RlbC5nZXRTaGFyZWRVc2VycygpLmxlbmd0aCArIG1vZGVsLmdldE9jc0xpbmtzKCkubGVuZ3RoO1xuICAgICAgICAgICAgcGFuZWxzLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBUYWIsXG4gICAgICAgICAgICAgICAgeyBrZXk6ICd0YXJnZXQtdXNlcnMnLCB2YWx1ZTogJ3RhcmdldC11c2VycycsIGxhYmVsOiB0aGlzLmdldE1lc3NhZ2UoMjQ5LCAnJykgKyAodG90YWxVc2VycyA/ICcgKCcgKyB0b3RhbFVzZXJzICsgJyknIDogJycpLCBidXR0b25TdHlsZTogYnV0dG9uU3R5bGUgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KF91c2Vyc1BhbmVsMlsnZGVmYXVsdCddLCB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dNYWlsZXI6IHNob3dNYWlsZXIsXG4gICAgICAgICAgICAgICAgICAgIHNoYXJlTW9kZWw6IG1vZGVsLFxuICAgICAgICAgICAgICAgICAgICBweWRpbzogdGhpcy5wcm9wcy5weWRpbyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHsgaGVpZ2h0OiAnMTAwJScsIG92ZXJmbG93WTogJ2F1dG8nIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICBpZiAobW9kZWxGaXJzdExvYWQgJiYgIWhhc1B1YmxpY0xpbmsgJiYgdG90YWxVc2Vycykge1xuICAgICAgICAgICAgICAgIGluaXRpYWxTZWxlY3RlZEluZGV4ID0gJ3RhcmdldC11c2Vycyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhbmVscy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBwYW5lbHMucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIFRhYixcbiAgICAgICAgICAgICAgICB7IGtleTogJ3NoYXJlLXBlcm1pc3Npb25zJywgdmFsdWU6ICdzaGFyZS1wZXJtaXNzaW9ucycsIGxhYmVsOiB0aGlzLmdldE1lc3NhZ2UoNDg2LCAnJyksIGJ1dHRvblN0eWxlOiBidXR0b25TdHlsZSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoX2FkdmFuY2VkUGFuZWwyWydkZWZhdWx0J10sIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd01haWxlcjogc2hvd01haWxlcixcbiAgICAgICAgICAgICAgICAgICAgcHlkaW86IHRoaXMucHJvcHMucHlkaW8sXG4gICAgICAgICAgICAgICAgICAgIHNoYXJlTW9kZWw6IG1vZGVsLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogeyBoZWlnaHQ6ICcxMDAlJywgb3ZlcmZsb3dZOiAnYXV0bycgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWFpbGVyID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5tYWlsZXJEYXRhKSB7XG4gICAgICAgICAgICB2YXIgbWFpbGVyRGF0YSA9IHRoaXMuc3RhdGUubWFpbGVyRGF0YTtcblxuICAgICAgICAgICAgdmFyIGN1c3RvbWl6ZU1lc3NhZ2VQYW5lID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKG1haWxlckRhdGEuaGFzaCkge1xuICAgICAgICAgICAgICAgIHZhciBzdHlsZSA9IG1haWxlckRhdGEuZW5hYmxlSWRlbnRpZmljYXRpb24gPyB7IHBhZGRpbmc6ICcxMHB4IDIwcHgnLCBiYWNrZ3JvdW5kQ29sb3I6ICcjRUNFRkYxJyB9IDogeyBwYWRkaW5nOiAnMTBweCAyMHB4IDAnIH07XG4gICAgICAgICAgICAgICAgdmFyIGxldFVzZXJDaG9vc2VDcmlwcGxlID0gdGhpcy5wcm9wcy5weWRpby5nZXRQbHVnaW5Db25maWdzKCdhY3Rpb24uc2hhcmUnKS5nZXQoJ0VNQUlMX1BFUlNPTkFMX0xJTktfU0VORF9DTEVBUicpO1xuICAgICAgICAgICAgICAgIGN1c3RvbWl6ZU1lc3NhZ2VQYW5lID0gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVG9nZ2xlLCB7IGxhYmVsOiB0aGlzLmdldE1lc3NhZ2UoMjM1KSwgdG9nZ2xlZDogbWFpbGVyRGF0YS5lbmFibGVJZGVudGlmaWNhdGlvbiwgb25Ub2dnbGU6IGZ1bmN0aW9uIChlLCBjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMzLnRvZ2dsZU1haWxlckRhdGEoeyBlbmFibGVJZGVudGlmaWNhdGlvbjogYyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSksXG4gICAgICAgICAgICAgICAgICAgIG1haWxlckRhdGEuZW5hYmxlSWRlbnRpZmljYXRpb24gJiYgUmVhY3QuY3JlYXRlRWxlbWVudChUb2dnbGUsIHsgbGFiZWw6IFwiLS0gXCIgKyB0aGlzLmdldE1lc3NhZ2UoMjM2KSwgdG9nZ2xlZDogbWFpbGVyRGF0YS5pZGVudGlmaWVkT25seSwgb25Ub2dnbGU6IGZ1bmN0aW9uIChlLCBjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMzLnRvZ2dsZU1haWxlckRhdGEoeyBpZGVudGlmaWVkT25seTogYyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSksXG4gICAgICAgICAgICAgICAgICAgIG1haWxlckRhdGEuZW5hYmxlSWRlbnRpZmljYXRpb24gJiYgbGV0VXNlckNob29zZUNyaXBwbGUgJiYgUmVhY3QuY3JlYXRlRWxlbWVudChUb2dnbGUsIHsgbGFiZWw6IFwiLS0gXCIgKyB0aGlzLmdldE1lc3NhZ2UoMjM3KSwgdG9nZ2xlZDogbWFpbGVyRGF0YS5jcmlwcGxlSWRlbnRpZmljYXRpb25LZXlzLCBvblRvZ2dsZTogZnVuY3Rpb24gKGUsIGMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpczMudG9nZ2xlTWFpbGVyRGF0YSh7IGNyaXBwbGVJZGVudGlmaWNhdGlvbktleXM6IGMgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1haWxlciA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoUHlkaW9NYWlsZXIuUGFuZSwgX2V4dGVuZHMoe30sIG1haWxlckRhdGEsIHtcbiAgICAgICAgICAgICAgICBvbkRpc21pc3M6IHRoaXMuZGlzbWlzc01haWxlcixcbiAgICAgICAgICAgICAgICBvdmVybGF5OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3NoYXJlLWNlbnRlci1tYWlsZXInLFxuICAgICAgICAgICAgICAgIHBhbmVsVGl0bGU6IHRoaXMucHJvcHMucHlkaW8uTWVzc2FnZUhhc2hbXCJzaGFyZV9jZW50ZXIuNDVcIl0sXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFBhbmVUb3A6IGN1c3RvbWl6ZU1lc3NhZ2VQYW5lLFxuICAgICAgICAgICAgICAgIHByb2Nlc3NQb3N0OiBtYWlsZXJEYXRhLmVuYWJsZUlkZW50aWZpY2F0aW9uID8gdGhpcy5tYWlsZXJQcm9jZXNzUG9zdCA6IG51bGxcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENvbnRlbnQsIF9leHRlbmRzKHt9LCB0aGlzLnByb3BzLCB7XG4gICAgICAgICAgICBtb2RlbDogdGhpcy5zdGF0ZS5tb2RlbCxcbiAgICAgICAgICAgIHBhbmVsczogcGFuZWxzLFxuICAgICAgICAgICAgbWFpbGVyOiBtYWlsZXIsXG4gICAgICAgICAgICBpbml0aWFsU2VsZWN0ZWRJbmRleDogaW5pdGlhbFNlbGVjdGVkSW5kZXhcbiAgICAgICAgfSkpO1xuICAgIH1cblxufSk7XG5cbnZhciBDb250ZW50ID0gKGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKENvbnRlbnQsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gQ29udGVudCgpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbnRlbnQpO1xuXG4gICAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKENvbnRlbnQucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoQ29udGVudCwgW3tcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcblxuICAgICAgICAgICAgdmFyIHRhYlN0eWxlcyA9IHtcbiAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBmbGV4R3JvdzogMSxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0YWJJdGVtQ29udGFpbmVyU3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgZmxleFNocmluazogMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGZsZXhHcm93OiAxLFxuICAgICAgICAgICAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGFiVGVtcGxhdGVTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZhZmFmYSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ3JlYWN0X3NoYXJlX2Zvcm0nLCBzdHlsZTogX2V4dGVuZHMoeyB3aWR0aDogNDIwLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nIH0sIHRoaXMucHJvcHMuc3R5bGUpIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChfSGVhZGVyMlsnZGVmYXVsdCddLCBfZXh0ZW5kcyh7fSwgdGhpcy5wcm9wcywgeyBzaGFyZU1vZGVsOiB0aGlzLnByb3BzLm1vZGVsIH0pKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICBUYWJzLFxuICAgICAgICAgICAgICAgICAgICBfZXh0ZW5kcyh7IHZhbHVlOiB0aGlzLnByb3BzLmluaXRpYWxTZWxlY3RlZEluZGV4IH0sIHRhYlN0eWxlcyksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucGFuZWxzXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm1haWxlclxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBDb250ZW50O1xufSkoUmVhY3QuQ29tcG9uZW50KTtcblxuQ29udGVudCA9IFBhbGV0dGVNb2RpZmllcih7IHByaW1hcnkxQ29sb3I6ICcjNGFjZWIwJyB9KShDb250ZW50KTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gTWFpblBhbmVsO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9TaGFyZUNvbnRleHRDb25zdW1lciA9IHJlcXVpcmUoJy4uL1NoYXJlQ29udGV4dENvbnN1bWVyJyk7XG5cbnZhciBfU2hhcmVDb250ZXh0Q29uc3VtZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU2hhcmVDb250ZXh0Q29uc3VtZXIpO1xuXG52YXIgX1RhcmdldGVkVXNlcnMgPSByZXF1aXJlKCcuL1RhcmdldGVkVXNlcnMnKTtcblxudmFyIF9UYXJnZXRlZFVzZXJzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1RhcmdldGVkVXNlcnMpO1xuXG52YXIgX21haW5BY3Rpb25CdXR0b24gPSByZXF1aXJlKCcuLi9tYWluL0FjdGlvbkJ1dHRvbicpO1xuXG52YXIgX21haW5BY3Rpb25CdXR0b24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWFpbkFjdGlvbkJ1dHRvbik7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJ21hdGVyaWFsLXVpJyk7XG5cbnZhciBSYWlzZWRCdXR0b24gPSBfcmVxdWlyZS5SYWlzZWRCdXR0b247XG52YXIgRmxvYXRpbmdBY3Rpb25CdXR0b24gPSBfcmVxdWlyZS5GbG9hdGluZ0FjdGlvbkJ1dHRvbjtcbnZhciBUZXh0RmllbGQgPSBfcmVxdWlyZS5UZXh0RmllbGQ7XG52YXIgUGFwZXIgPSBfcmVxdWlyZS5QYXBlcjtcblxudmFyIFNoYXJlTW9kZWwgPSByZXF1aXJlKCdweWRpbycpLnJlcXVpcmVMaWIoJ1JlYWN0TW9kZWxTaGFyZScpO1xudmFyIFFSQ29kZSA9IHJlcXVpcmUoJ3FyY29kZS5yZWFjdCcpO1xudmFyIENsaXBib2FyZCA9IHJlcXVpcmUoJ2NsaXBib2FyZCcpO1xuXG52YXIgUGF0aFV0aWxzID0gcmVxdWlyZSgncHlkaW8vdXRpbC9wYXRoJyk7XG52YXIgTGFuZ1V0aWxzID0gcmVxdWlyZSgncHlkaW8vdXRpbC9sYW5nJyk7XG5cbnZhciBQdWJsaWNMaW5rRmllbGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdQdWJsaWNMaW5rRmllbGQnLFxuXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGxpbmtEYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgIHNoYXJlTW9kZWw6IFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKFNoYXJlTW9kZWwpLFxuICAgICAgICBlZGl0QWxsb3dlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgc2hvd01haWxlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmNcbiAgICB9LFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4geyBlZGl0TGluazogZmFsc2UsIGNvcHlNZXNzYWdlOiAnJywgc2hvd1FSQ29kZTogZmFsc2UgfTtcbiAgICB9LFxuICAgIHRvZ2dsZUVkaXRNb2RlOiBmdW5jdGlvbiB0b2dnbGVFZGl0TW9kZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZWRpdExpbmsgJiYgdGhpcy5zdGF0ZS5jdXN0b21MaW5rKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnNoYXJlTW9kZWwudXBkYXRlQ3VzdG9tTGluayh0aGlzLnByb3BzLmxpbmtEYXRhLmhhc2gsIHRoaXMuc3RhdGUuY3VzdG9tTGluayk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGVkaXRMaW5rOiAhdGhpcy5zdGF0ZS5lZGl0TGluayB9KTtcbiAgICB9LFxuICAgIGNoYW5nZUxpbms6IGZ1bmN0aW9uIGNoYW5nZUxpbmsoZXZlbnQpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICB2YWx1ZSA9IExhbmdVdGlscy5jb21wdXRlU3RyaW5nU2x1Zyh2YWx1ZSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjdXN0b21MaW5rOiB2YWx1ZSB9KTtcbiAgICB9LFxuICAgIGNsZWFyQ29weU1lc3NhZ2U6IGZ1bmN0aW9uIGNsZWFyQ29weU1lc3NhZ2UoKSB7XG4gICAgICAgIGdsb2JhbC5zZXRUaW1lb3V0KChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29weU1lc3NhZ2U6ICcnIH0pO1xuICAgICAgICB9KS5iaW5kKHRoaXMpLCA1MDAwKTtcbiAgICB9LFxuXG4gICAgYXR0YWNoQ2xpcGJvYXJkOiBmdW5jdGlvbiBhdHRhY2hDbGlwYm9hcmQoKSB7XG4gICAgICAgIHRoaXMuZGV0YWNoQ2xpcGJvYXJkKCk7XG4gICAgICAgIGlmICh0aGlzLnJlZnNbJ2NvcHktYnV0dG9uJ10pIHtcbiAgICAgICAgICAgIHRoaXMuX2NsaXAgPSBuZXcgQ2xpcGJvYXJkKHRoaXMucmVmc1snY29weS1idXR0b24nXSwge1xuICAgICAgICAgICAgICAgIHRleHQ6IChmdW5jdGlvbiAodHJpZ2dlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5saW5rRGF0YVsncHVibGljX2xpbmsnXTtcbiAgICAgICAgICAgICAgICB9KS5iaW5kKHRoaXMpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2NsaXAub24oJ3N1Y2Nlc3MnLCAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb3B5TWVzc2FnZTogdGhpcy5wcm9wcy5nZXRNZXNzYWdlKCcxOTInKSB9LCB0aGlzLmNsZWFyQ29weU1lc3NhZ2UpO1xuICAgICAgICAgICAgfSkuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLl9jbGlwLm9uKCdlcnJvcicsIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvcHlNZXNzYWdlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGlmIChnbG9iYWwubmF2aWdhdG9yLnBsYXRmb3JtLmluZGV4T2YoXCJNYWNcIikgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29weU1lc3NhZ2UgPSB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzE0NCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvcHlNZXNzYWdlID0gdGhpcy5wcm9wcy5nZXRNZXNzYWdlKCcxNDMnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzWydwdWJsaWMtbGluay1maWVsZCddLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvcHlNZXNzYWdlOiBjb3B5TWVzc2FnZSB9LCB0aGlzLmNsZWFyQ29weU1lc3NhZ2UpO1xuICAgICAgICAgICAgfSkuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGRldGFjaENsaXBib2FyZDogZnVuY3Rpb24gZGV0YWNoQ2xpcGJvYXJkKCkge1xuICAgICAgICBpZiAodGhpcy5fY2xpcCkge1xuICAgICAgICAgICAgdGhpcy5fY2xpcC5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgICAgdGhpcy5hdHRhY2hDbGlwYm9hcmQoKTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmF0dGFjaENsaXBib2FyZCgpO1xuICAgIH0sXG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMuZGV0YWNoQ2xpcGJvYXJkKCk7XG4gICAgfSxcblxuICAgIG9wZW5NYWlsZXI6IGZ1bmN0aW9uIG9wZW5NYWlsZXIoKSB7XG4gICAgICAgIHZhciBtYWlsRGF0YSA9IHRoaXMucHJvcHMuc2hhcmVNb2RlbC5wcmVwYXJlRW1haWwoXCJsaW5rXCIsIHRoaXMucHJvcHMubGlua0RhdGEuaGFzaCk7XG4gICAgICAgIHRoaXMucHJvcHMuc2hvd01haWxlcihtYWlsRGF0YS5zdWJqZWN0LCBtYWlsRGF0YS5tZXNzYWdlLCBbXSwgdGhpcy5wcm9wcy5saW5rRGF0YS5oYXNoKTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlUVJDb2RlOiBmdW5jdGlvbiB0b2dnbGVRUkNvZGUoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93UVJDb2RlOiAhdGhpcy5zdGF0ZS5zaG93UVJDb2RlIH0pO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIHB1YmxpY0xpbmsgPSB0aGlzLnByb3BzLmxpbmtEYXRhWydwdWJsaWNfbGluayddO1xuICAgICAgICB2YXIgZWRpdEFsbG93ZWQgPSB0aGlzLnByb3BzLmVkaXRBbGxvd2VkICYmICF0aGlzLnByb3BzLmxpbmtEYXRhWydoYXNoX2lzX3Nob3J0ZW4nXSAmJiAhdGhpcy5wcm9wcy5pc1JlYWRvbmx5KCkgJiYgdGhpcy5wcm9wcy5zaGFyZU1vZGVsLmN1cnJlbnRJc093bmVyKCk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVkaXRMaW5rICYmIGVkaXRBbGxvd2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBQYXBlcixcbiAgICAgICAgICAgICAgICB7IHpEZXB0aDogMCwgcm91bmRlZDogZmFsc2UsIGNsYXNzTmFtZTogXCJwdWJsaWMtbGluay1jb250YWluZXIgZWRpdC1saW5rXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgZm9udFNpemU6IDE2LCBjb2xvcjogJ3JnYmEoMCwwLDAsMC40KScsIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLCBtYXhXaWR0aDogMjAwLCB3aGl0ZVNwYWNlOiAnbm93cmFwJywgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUGF0aFV0aWxzLmdldERpcm5hbWUocHVibGljTGluaykgKyAnLyAnXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEZpZWxkLCB7IHN0eWxlOiB7IGZsZXg6IDEsIG1hcmdpblJpZ2h0OiAxMCwgbWFyZ2luTGVmdDogMTAgfSwgb25DaGFuZ2U6IHRoaXMuY2hhbmdlTGluaywgdmFsdWU6IHRoaXMuc3RhdGUuY3VzdG9tTGluayAhPT0gdW5kZWZpbmVkID8gdGhpcy5zdGF0ZS5jdXN0b21MaW5rIDogdGhpcy5wcm9wcy5saW5rRGF0YVsnaGFzaCddIH0pLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZsb2F0aW5nQWN0aW9uQnV0dG9uLCB7IG1pbmk6IHRydWUsIGljb25DbGFzc05hbWU6ICdtZGkgbWRpLWNoZWNrJywgb25Ub3VjaFRhcDogdGhpcy50b2dnbGVFZGl0TW9kZSB9KVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnc2VjdGlvbi1sZWdlbmQnIH0sXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0TWVzc2FnZSgnMTk0JylcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGNvcHlCdXR0b24gPSBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyByZWY6ICdjb3B5LWJ1dHRvbicsIGNsYXNzTmFtZTogJ2NvcHktbGluay1idXR0b24gbWRpIG1kaS1jb250ZW50LWNvcHknLCB0aXRsZTogdGhpcy5wcm9wcy5nZXRNZXNzYWdlKCcxOTEnKSB9KTtcbiAgICAgICAgICAgIHZhciBzZXRIdG1sID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBfX2h0bWw6IHRoaXMuc3RhdGUuY29weU1lc3NhZ2UgfTtcbiAgICAgICAgICAgIH0pLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB2YXIgX2ZvY3VzID0gZnVuY3Rpb24gX2ZvY3VzKGUpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5zZWxlY3QoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgYWN0aW9uTGlua3MgPSBbXSxcbiAgICAgICAgICAgICAgICBxckNvZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93TWFpbGVyKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uTGlua3MucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KF9tYWluQWN0aW9uQnV0dG9uMlsnZGVmYXVsdCddLCB7IGtleTogJ291dGxpbmUnLCBjYWxsYmFjazogdGhpcy5vcGVuTWFpbGVyLCBtZGlJY29uOiAnZW1haWwtb3V0bGluZScsIG1lc3NhZ2VJZDogJzQ1JyB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZWRpdEFsbG93ZWQpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25MaW5rcy5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoX21haW5BY3Rpb25CdXR0b24yWydkZWZhdWx0J10sIHsga2V5OiAncGVuY2lsJywgY2FsbGJhY2s6IHRoaXMudG9nZ2xlRWRpdE1vZGUsIG1kaUljb246ICdwZW5jaWwnLCBtZXNzYWdlSWQ6IFwiMTkzXCIgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFNoYXJlTW9kZWwucXJjb2RlRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uTGlua3MucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KF9tYWluQWN0aW9uQnV0dG9uMlsnZGVmYXVsdCddLCB7IGtleTogJ3FyY29kZScsIGNhbGxiYWNrOiB0aGlzLnRvZ2dsZVFSQ29kZSwgbWRpSWNvbjogJ3FyY29kZScsIG1lc3NhZ2VJZDogJzk0JyB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWN0aW9uTGlua3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uTGlua3MgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdhZGRpdGlvbmFsLWFjdGlvbnMtbGlua3MnIH0sXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbkxpbmtzXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uTGlua3MgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2hvd1FSQ29kZSkge1xuICAgICAgICAgICAgICAgIHFyQ29kZSA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ3FyQ29kZScgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChRUkNvZGUsIHsgc2l6ZTogMTI4LCB2YWx1ZTogcHVibGljTGluaywgbGV2ZWw6ICdRJyB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBQYXBlcixcbiAgICAgICAgICAgICAgICB7IHpEZXB0aDogMCwgcm91bmRlZDogZmFsc2UsIGNsYXNzTmFtZTogJ3B1YmxpYy1saW5rLWNvbnRhaW5lcicgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogeyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEZpZWxkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicHVibGljLWxpbmtcIiArICh0aGlzLnByb3BzLmxpbmtEYXRhWydpc19leHBpcmVkJ10gPyAnIGxpbmstZXhwaXJlZCcgOiAnJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnTGluaycsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY6ICdwdWJsaWMtbGluay1maWVsZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcHVibGljTGluayxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM6IF9mb2N1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgJyAnLFxuICAgICAgICAgICAgICAgICAgICBjb3B5QnV0dG9uXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IHRleHRBbGlnbjogJ2NlbnRlcicgfSwgY2xhc3NOYW1lOiAnc2VjdGlvbi1sZWdlbmQnLCBkYW5nZXJvdXNseVNldElubmVySFRNTDogc2V0SHRtbCgpIH0pLFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMubGlua0RhdGEudGFyZ2V0X3VzZXJzICYmIFJlYWN0LmNyZWF0ZUVsZW1lbnQoX1RhcmdldGVkVXNlcnMyWydkZWZhdWx0J10sIHRoaXMucHJvcHMpLFxuICAgICAgICAgICAgICAgIGFjdGlvbkxpbmtzLFxuICAgICAgICAgICAgICAgIHFyQ29kZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBQdWJsaWNMaW5rRmllbGQgPSAoMCwgX1NoYXJlQ29udGV4dENvbnN1bWVyMlsnZGVmYXVsdCddKShQdWJsaWNMaW5rRmllbGQpO1xuZXhwb3J0c1snZGVmYXVsdCddID0gUHVibGljTGlua0ZpZWxkO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9TaGFyZUNvbnRleHRDb25zdW1lciA9IHJlcXVpcmUoJy4uL1NoYXJlQ29udGV4dENvbnN1bWVyJyk7XG5cbnZhciBfU2hhcmVDb250ZXh0Q29uc3VtZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU2hhcmVDb250ZXh0Q29uc3VtZXIpO1xuXG52YXIgX0ZpZWxkID0gcmVxdWlyZSgnLi9GaWVsZCcpO1xuXG52YXIgX0ZpZWxkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0ZpZWxkKTtcblxudmFyIF9QZXJtaXNzaW9ucyA9IHJlcXVpcmUoJy4vUGVybWlzc2lvbnMnKTtcblxudmFyIF9QZXJtaXNzaW9uczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9QZXJtaXNzaW9ucyk7XG5cbnZhciBfU2VjdXJlT3B0aW9ucyA9IHJlcXVpcmUoJy4vU2VjdXJlT3B0aW9ucycpO1xuXG52YXIgX1NlY3VyZU9wdGlvbnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU2VjdXJlT3B0aW9ucyk7XG5cbnZhciBfbWFpbkNhcmQgPSByZXF1aXJlKCcuLi9tYWluL0NhcmQnKTtcblxudmFyIF9tYWluQ2FyZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tYWluQ2FyZCk7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVxdWlyZSRyZXF1aXJlTGliID0gcmVxdWlyZSgncHlkaW8nKS5yZXF1aXJlTGliKCdmb3JtJyk7XG5cbnZhciBWYWxpZFBhc3N3b3JkID0gX3JlcXVpcmUkcmVxdWlyZUxpYi5WYWxpZFBhc3N3b3JkO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCdtYXRlcmlhbC11aScpO1xuXG52YXIgUmFpc2VkQnV0dG9uID0gX3JlcXVpcmUuUmFpc2VkQnV0dG9uO1xudmFyIENoZWNrYm94ID0gX3JlcXVpcmUuQ2hlY2tib3g7XG52YXIgRGl2aWRlciA9IF9yZXF1aXJlLkRpdmlkZXI7XG5cbnZhciBQdWJsaWNMaW5rUGFuZWwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdQdWJsaWNMaW5rUGFuZWwnLFxuXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGxpbmtEYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBweWRpbzogUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoUHlkaW8pLFxuICAgICAgICBzaGFyZU1vZGVsOiBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihSZWFjdE1vZGVsLlNoYXJlKSxcbiAgICAgICAgYXV0aG9yaXphdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIHNob3dNYWlsZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG4gICAgfSxcblxuICAgIGRpc2FibGVTYXZlOiBmdW5jdGlvbiBkaXNhYmxlU2F2ZSgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRpc2FibGVkOiB0cnVlIH0pO1xuICAgIH0sXG4gICAgZW5hYmxlU2F2ZTogZnVuY3Rpb24gZW5hYmxlU2F2ZSgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRpc2FibGVkOiBmYWxzZSB9KTtcbiAgICB9LFxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zaGFyZU1vZGVsLm9ic2VydmUoJ3NhdmluZycsIHRoaXMuZGlzYWJsZVNhdmUpO1xuICAgICAgICB0aGlzLnByb3BzLnNoYXJlTW9kZWwub2JzZXJ2ZSgnc2F2ZWQnLCB0aGlzLmVuYWJsZVNhdmUpO1xuICAgIH0sXG4gICAgY29tcG9uZW5kV2lsbFVubW91bnQ6IGZ1bmN0aW9uIGNvbXBvbmVuZFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLnNoYXJlTW9kZWwuc3RvcE9ic2VydmluZygnc2F2aW5nJywgdGhpcy5kaXNhYmxlU2F2ZSk7XG4gICAgICAgIHRoaXMucHJvcHMuc2hhcmVNb2RlbC5zdG9wT2JzZXJ2aW5nKCdzYXZlZCcsIHRoaXMuZW5hYmxlU2F2ZSk7XG4gICAgfSxcblxuICAgIHRvZ2dsZUxpbms6IGZ1bmN0aW9uIHRvZ2dsZUxpbmsoKSB7XG4gICAgICAgIHZhciBwdWJsaWNMaW5rcyA9IHRoaXMucHJvcHMuc2hhcmVNb2RlbC5nZXRQdWJsaWNMaW5rcygpO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zaG93VGVtcG9yYXJ5UGFzc3dvcmQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93VGVtcG9yYXJ5UGFzc3dvcmQ6IGZhbHNlLCB0ZW1wb3JhcnlQYXNzd29yZDogbnVsbCB9KTtcbiAgICAgICAgfSBlbHNlIGlmICghcHVibGljTGlua3MubGVuZ3RoICYmIFJlYWN0TW9kZWwuU2hhcmUuZ2V0QXV0aG9yaXphdGlvbnModGhpcy5wcm9wcy5weWRpbykucGFzc3dvcmRfbWFuZGF0b3J5KSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2hvd1RlbXBvcmFyeVBhc3N3b3JkOiB0cnVlLCB0ZW1wb3JhcnlQYXNzd29yZDogJycgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnNoYXJlTW9kZWwudG9nZ2xlUHVibGljTGluaygpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4geyBzaG93VGVtcG9yYXJ5UGFzc3dvcmQ6IGZhbHNlLCB0ZW1wb3JhcnlQYXNzd29yZDogbnVsbCwgZGlzYWJsZWQ6IGZhbHNlIH07XG4gICAgfSxcblxuICAgIHVwZGF0ZVRlbXBvcmFyeVBhc3N3b3JkOiBmdW5jdGlvbiB1cGRhdGVUZW1wb3JhcnlQYXNzd29yZCh2YWx1ZSwgZXZlbnQpIHtcbiAgICAgICAgaWYgKHZhbHVlID09IHVuZGVmaW5lZCkgdmFsdWUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldFZhbHVlKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB0ZW1wb3JhcnlQYXNzd29yZDogdmFsdWUgfSk7XG4gICAgfSxcblxuICAgIGVuYWJsZUxpbmtXaXRoUGFzc3dvcmQ6IGZ1bmN0aW9uIGVuYWJsZUxpbmtXaXRoUGFzc3dvcmQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc2hhcmVNb2RlbC5lbmFibGVQdWJsaWNMaW5rV2l0aFBhc3N3b3JkKHRoaXMuc3RhdGUudGVtcG9yYXJ5UGFzc3dvcmQpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2hvd1RlbXBvcmFyeVBhc3N3b3JkOiBmYWxzZSwgdGVtcG9yYXJ5UGFzc3dvcmQ6IG51bGwgfSk7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuXG4gICAgICAgIHZhciBwdWJsaWNMaW5rUGFuZXMgPSB1bmRlZmluZWQsXG4gICAgICAgICAgICBwdWJsaWNMaW5rRmllbGQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmxpbmtEYXRhKSB7XG4gICAgICAgICAgICBwdWJsaWNMaW5rRmllbGQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KF9GaWVsZDJbJ2RlZmF1bHQnXSwge1xuICAgICAgICAgICAgICAgIHNob3dNYWlsZXI6IHRoaXMucHJvcHMuc2hvd01haWxlcixcbiAgICAgICAgICAgICAgICBsaW5rRGF0YTogdGhpcy5wcm9wcy5saW5rRGF0YSxcbiAgICAgICAgICAgICAgICBzaGFyZU1vZGVsOiB0aGlzLnByb3BzLnNoYXJlTW9kZWwsXG4gICAgICAgICAgICAgICAgZWRpdEFsbG93ZWQ6IHRoaXMucHJvcHMuYXV0aG9yaXphdGlvbnMuZWRpdGFibGVfaGFzaCxcbiAgICAgICAgICAgICAgICBrZXk6ICdwdWJsaWMtbGluaydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcHVibGljTGlua1BhbmVzID0gW1JlYWN0LmNyZWF0ZUVsZW1lbnQoX1Blcm1pc3Npb25zMlsnZGVmYXVsdCddLCB7XG4gICAgICAgICAgICAgICAgbGlua0RhdGE6IHRoaXMucHJvcHMubGlua0RhdGEsXG4gICAgICAgICAgICAgICAgc2hhcmVNb2RlbDogdGhpcy5wcm9wcy5zaGFyZU1vZGVsLFxuICAgICAgICAgICAgICAgIGtleTogJ3B1YmxpYy1wZXJtJ1xuICAgICAgICAgICAgfSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoX1NlY3VyZU9wdGlvbnMyWydkZWZhdWx0J10sIHtcbiAgICAgICAgICAgICAgICBsaW5rRGF0YTogdGhpcy5wcm9wcy5saW5rRGF0YSxcbiAgICAgICAgICAgICAgICBzaGFyZU1vZGVsOiB0aGlzLnByb3BzLnNoYXJlTW9kZWwsXG4gICAgICAgICAgICAgICAgcHlkaW86IHRoaXMucHJvcHMucHlkaW8sXG4gICAgICAgICAgICAgICAga2V5OiAncHVibGljLXNlY3VyZSdcbiAgICAgICAgICAgIH0pXTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlLnNob3dUZW1wb3JhcnlQYXNzd29yZCkge1xuICAgICAgICAgICAgcHVibGljTGlua0ZpZWxkID0gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ3NlY3Rpb24tbGVnZW5kJywgc3R5bGU6IHsgbWFyZ2luVG9wOiAyMCB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0TWVzc2FnZSgnMjE1JylcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2Jhc2VsaW5lJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgZmxleDogMSB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFZhbGlkUGFzc3dvcmQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7IGxhYmVsOiB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzIzJykgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS50ZW1wb3JhcnlQYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy51cGRhdGVUZW1wb3JhcnlQYXNzd29yZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogeyBtYXJnaW5MZWZ0OiA3LCBtYXJnaW5Ub3A6IDI2IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmFpc2VkQnV0dG9uLCB7IGxhYmVsOiB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzkyJyksIHNlY29uZGFyeTogdHJ1ZSwgb25DbGljazogdGhpcy5lbmFibGVMaW5rV2l0aFBhc3N3b3JkIH0pXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHVibGljTGlua0ZpZWxkID0gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ3NlY3Rpb24tbGVnZW5kJywgc3R5bGU6IHsgcGFkZGluZ0JvdHRvbTogMTYsIHBhZGRpbmdUb3A6IDE2IH0gfSxcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzE5MCcpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjaGVja2VkID0gISF0aGlzLnByb3BzLmxpbmtEYXRhO1xuICAgICAgICB2YXIgZGlzYWJsZUZvck5vdE93bmVyID0gZmFsc2U7XG4gICAgICAgIGlmIChjaGVja2VkICYmICF0aGlzLnByb3BzLnNoYXJlTW9kZWwuY3VycmVudElzT3duZXIoKSkge1xuICAgICAgICAgICAgZGlzYWJsZUZvck5vdE93bmVyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgeyBzdHlsZTogdGhpcy5wcm9wcy5zdHlsZSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBfbWFpbkNhcmQyWydkZWZhdWx0J10sXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENoZWNrYm94LCB7XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmlzUmVhZG9ubHkoKSB8fCBkaXNhYmxlRm9yTm90T3duZXIgfHwgdGhpcy5zdGF0ZS5kaXNhYmxlZCxcbiAgICAgICAgICAgICAgICAgICAgb25DaGVjazogdGhpcy50b2dnbGVMaW5rLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiAhIXRoaXMucHJvcHMubGlua0RhdGEgfHwgdGhpcy5zdGF0ZS5zaG93VGVtcG9yYXJ5UGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzE4OScpLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbFN0eWxlOiB7IGZvbnRTaXplOiAxOCB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgcHVibGljTGlua0ZpZWxkXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgcHVibGljTGlua1BhbmVzXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFB1YmxpY0xpbmtQYW5lbCA9ICgwLCBfU2hhcmVDb250ZXh0Q29uc3VtZXIyWydkZWZhdWx0J10pKFB1YmxpY0xpbmtQYW5lbCk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBQdWJsaWNMaW5rUGFuZWw7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX1NoYXJlQ29udGV4dENvbnN1bWVyID0gcmVxdWlyZSgnLi4vU2hhcmVDb250ZXh0Q29uc3VtZXInKTtcblxudmFyIF9TaGFyZUNvbnRleHRDb25zdW1lcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TaGFyZUNvbnRleHRDb25zdW1lcik7XG5cbnZhciBfbWFpbkNhcmQgPSByZXF1aXJlKCcuLi9tYWluL0NhcmQnKTtcblxudmFyIF9tYWluQ2FyZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tYWluQ2FyZCk7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJ21hdGVyaWFsLXVpJyk7XG5cbnZhciBDaGVja2JveCA9IF9yZXF1aXJlLkNoZWNrYm94O1xudmFyIFBhcGVyID0gX3JlcXVpcmUuUGFwZXI7XG5cbnZhciBTaGFyZU1vZGVsID0gcmVxdWlyZSgncHlkaW8nKS5yZXF1aXJlTGliKCdSZWFjdE1vZGVsU2hhcmUnKTtcblxudmFyIFB1YmxpY0xpbmtQZXJtaXNzaW9ucyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ1B1YmxpY0xpbmtQZXJtaXNzaW9ucycsXG5cbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgbGlua0RhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgc2hhcmVNb2RlbDogUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoU2hhcmVNb2RlbCksXG4gICAgICAgIHN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG4gICAgfSxcblxuICAgIGNoYW5nZVBlcm1pc3Npb246IGZ1bmN0aW9uIGNoYW5nZVBlcm1pc3Npb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIG5hbWUgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICAgICAgdmFyIGNoZWNrZWQgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5wcm9wcy5zaGFyZU1vZGVsLnNldFB1YmxpY0xpbmtQZXJtaXNzaW9uKHRoaXMucHJvcHMubGlua0RhdGEuaGFzaCwgbmFtZSwgY2hlY2tlZCk7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgbGlua0lkID0gdGhpcy5wcm9wcy5saW5rRGF0YS5oYXNoO1xuICAgICAgICB2YXIgcGVybXMgPSBbXSxcbiAgICAgICAgICAgIHByZXZpZXdXYXJuaW5nO1xuICAgICAgICB2YXIgY3VycmVudElzRm9sZGVyID0gIXRoaXMucHJvcHMuc2hhcmVNb2RlbC5nZXROb2RlKCkuaXNMZWFmKCk7XG4gICAgICAgIHBlcm1zLnB1c2goe1xuICAgICAgICAgICAgTkFNRTogJ3JlYWQnLFxuICAgICAgICAgICAgTEFCRUw6IHRoaXMucHJvcHMuZ2V0TWVzc2FnZSgnNzInKSxcbiAgICAgICAgICAgIERJU0FCTEVEOiBjdXJyZW50SXNGb2xkZXIgJiYgIXRoaXMucHJvcHMuc2hhcmVNb2RlbC5nZXRQdWJsaWNMaW5rUGVybWlzc2lvbihsaW5rSWQsICd3cml0ZScpXG4gICAgICAgIH0pO1xuICAgICAgICBwZXJtcy5wdXNoKHtcbiAgICAgICAgICAgIE5BTUU6ICdkb3dubG9hZCcsXG4gICAgICAgICAgICBMQUJFTDogdGhpcy5wcm9wcy5nZXRNZXNzYWdlKCc3MycpXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY3VycmVudElzRm9sZGVyKSB7XG4gICAgICAgICAgICBwZXJtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBOQU1FOiAnd3JpdGUnLFxuICAgICAgICAgICAgICAgIExBQkVMOiB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzc0JylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuc2hhcmVNb2RlbC5maWxlSGFzV3JpdGVhYmxlRWRpdG9ycygpKSB7XG4gICAgICAgICAgICBwZXJtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBOQU1FOiAnd3JpdGUnLFxuICAgICAgICAgICAgICAgIExBQkVMOiB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzc0YicpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaGFyZU1vZGVsLmlzUHVibGljTGlua1ByZXZpZXdEaXNhYmxlZCgpICYmIHRoaXMucHJvcHMuc2hhcmVNb2RlbC5nZXRQdWJsaWNMaW5rUGVybWlzc2lvbihsaW5rSWQsICdyZWFkJykpIHtcbiAgICAgICAgICAgIHByZXZpZXdXYXJuaW5nID0gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0TWVzc2FnZSgnMTk1JylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBfbWFpbkNhcmQyWydkZWZhdWx0J10sXG4gICAgICAgICAgICB7IHRpdGxlOiB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzcxJyksIHN0eWxlOiB0aGlzLnByb3BzLnN0eWxlIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnc2VjdGlvbi1sZWdlbmQnIH0sXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXRNZXNzYWdlKCc3MHInKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBzdHlsZTogeyBtYXJnaW46ICcxMHB4IDAgMjBweCcgfSwgY2xhc3NOYW1lOiAnaWVfbWF0ZXJpYWxfY2hlY2tib3hfZml4JyB9LFxuICAgICAgICAgICAgICAgIHBlcm1zLm1hcCgoZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiBwLk5BTUUsIHN0eWxlOiB7IGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLCB3aWR0aDogJzMzJScgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDaGVja2JveCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBwLkRJU0FCTEVEIHx8IHRoaXMucHJvcHMuaXNSZWFkb25seSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcC5OQU1FLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBwLkxBQkVMLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hlY2s6IHRoaXMuY2hhbmdlUGVybWlzc2lvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiB0aGlzLnByb3BzLnNoYXJlTW9kZWwuZ2V0UHVibGljTGlua1Blcm1pc3Npb24obGlua0lkLCBwLk5BTUUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsU3R5bGU6IHsgd2hpdGVTcGFjZTogJ25vd3JhcCcgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KS5iaW5kKHRoaXMpKSxcbiAgICAgICAgICAgICAgICBwcmV2aWV3V2FybmluZ1xuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBQdWJsaWNMaW5rUGVybWlzc2lvbnMgPSAoMCwgX1NoYXJlQ29udGV4dENvbnN1bWVyMlsnZGVmYXVsdCddKShQdWJsaWNMaW5rUGVybWlzc2lvbnMpO1xuZXhwb3J0c1snZGVmYXVsdCddID0gUHVibGljTGlua1Blcm1pc3Npb25zO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9TaGFyZUNvbnRleHRDb25zdW1lciA9IHJlcXVpcmUoJy4uL1NoYXJlQ29udGV4dENvbnN1bWVyJyk7XG5cbnZhciBfU2hhcmVDb250ZXh0Q29uc3VtZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU2hhcmVDb250ZXh0Q29uc3VtZXIpO1xuXG52YXIgX21haW5DYXJkID0gcmVxdWlyZSgnLi4vbWFpbi9DYXJkJyk7XG5cbnZhciBfbWFpbkNhcmQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWFpbkNhcmQpO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCdtYXRlcmlhbC11aScpO1xuXG52YXIgRmxhdEJ1dHRvbiA9IF9yZXF1aXJlLkZsYXRCdXR0b247XG52YXIgVGV4dEZpZWxkID0gX3JlcXVpcmUuVGV4dEZpZWxkO1xudmFyIERhdGVQaWNrZXIgPSBfcmVxdWlyZS5EYXRlUGlja2VyO1xuXG52YXIgX3JlcXVpcmUkcmVxdWlyZUxpYiA9IHJlcXVpcmUoJ3B5ZGlvJykucmVxdWlyZUxpYignZm9ybScpO1xuXG52YXIgVmFsaWRQYXNzd29yZCA9IF9yZXF1aXJlJHJlcXVpcmVMaWIuVmFsaWRQYXNzd29yZDtcblxudmFyIFNoYXJlTW9kZWwgPSByZXF1aXJlKCdweWRpbycpLnJlcXVpcmVMaWIoJ1JlYWN0TW9kZWxTaGFyZScpO1xuXG52YXIgUHVibGljTGlua1NlY3VyZU9wdGlvbnMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdQdWJsaWNMaW5rU2VjdXJlT3B0aW9ucycsXG5cbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgbGlua0RhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgc2hhcmVNb2RlbDogUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoU2hhcmVNb2RlbCksXG4gICAgICAgIHN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG4gICAgfSxcblxuICAgIHVwZGF0ZURMRXhwaXJhdGlvbkZpZWxkOiBmdW5jdGlvbiB1cGRhdGVETEV4cGlyYXRpb25GaWVsZChldmVudCkge1xuICAgICAgICB2YXIgbmV3VmFsdWUgPSBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlO1xuICAgICAgICBpZiAocGFyc2VJbnQobmV3VmFsdWUpIDwgMCkgbmV3VmFsdWUgPSAtcGFyc2VJbnQobmV3VmFsdWUpO1xuICAgICAgICB0aGlzLnByb3BzLnNoYXJlTW9kZWwuc2V0RXhwaXJhdGlvbkZvcih0aGlzLnByb3BzLmxpbmtEYXRhLmhhc2gsIFwiZG93bmxvYWRzXCIsIG5ld1ZhbHVlKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlRGF5c0V4cGlyYXRpb25GaWVsZDogZnVuY3Rpb24gdXBkYXRlRGF5c0V4cGlyYXRpb25GaWVsZChldmVudCwgbmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKCFuZXdWYWx1ZSkge1xuICAgICAgICAgICAgbmV3VmFsdWUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldFZhbHVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5zaGFyZU1vZGVsLnNldEV4cGlyYXRpb25Gb3IodGhpcy5wcm9wcy5saW5rRGF0YS5oYXNoLCBcImRheXNcIiwgbmV3VmFsdWUpO1xuICAgIH0sXG5cbiAgICBvbkRhdGVDaGFuZ2U6IGZ1bmN0aW9uIG9uRGF0ZUNoYW5nZShldmVudCwgdmFsdWUpIHtcbiAgICAgICAgdmFyIHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgdmFyIGRhdGUxID0gRGF0ZS5VVEModG9kYXkuZ2V0RnVsbFllYXIoKSwgdG9kYXkuZ2V0TW9udGgoKSwgdG9kYXkuZ2V0RGF0ZSgpKTtcbiAgICAgICAgdmFyIGRhdGUyID0gRGF0ZS5VVEModmFsdWUuZ2V0RnVsbFllYXIoKSwgdmFsdWUuZ2V0TW9udGgoKSwgdmFsdWUuZ2V0RGF0ZSgpKTtcbiAgICAgICAgdmFyIG1zID0gTWF0aC5hYnMoZGF0ZTEgLSBkYXRlMik7XG4gICAgICAgIHZhciBpbnRlZ2VyVmFsID0gTWF0aC5mbG9vcihtcyAvIDEwMDAgLyA2MCAvIDYwIC8gMjQpOyAvL2Zsb29yIHNob3VsZCBiZSB1bm5lY2Vzc2FyeSwgYnV0IGp1c3QgaW4gY2FzZVxuICAgICAgICB0aGlzLnVwZGF0ZURheXNFeHBpcmF0aW9uRmllbGQoZXZlbnQsIGludGVnZXJWYWwpO1xuICAgIH0sXG5cbiAgICByZXNldFBhc3N3b3JkOiBmdW5jdGlvbiByZXNldFBhc3N3b3JkKCkge1xuICAgICAgICB0aGlzLnByb3BzLnNoYXJlTW9kZWwucmVzZXRQYXNzd29yZCh0aGlzLnByb3BzLmxpbmtEYXRhLmhhc2gpO1xuICAgIH0sXG5cbiAgICB1cGRhdGVQYXNzd29yZDogZnVuY3Rpb24gdXBkYXRlUGFzc3dvcmQobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc2hhcmVNb2RlbC51cGRhdGVQYXNzd29yZCh0aGlzLnByb3BzLmxpbmtEYXRhLmhhc2gsIG5ld1ZhbHVlKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyUGFzc3dvcmRDb250YWluZXI6IGZ1bmN0aW9uIHJlbmRlclBhc3N3b3JkQ29udGFpbmVyKCkge1xuICAgICAgICB2YXIgbGlua0lkID0gdGhpcy5wcm9wcy5saW5rRGF0YS5oYXNoO1xuICAgICAgICB2YXIgcGFzc3dvcmRGaWVsZDtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hhcmVNb2RlbC5oYXNIaWRkZW5QYXNzd29yZChsaW5rSWQpKSB7XG4gICAgICAgICAgICB2YXIgcmVzZXRQYXNzd29yZCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmxhdEJ1dHRvbiwge1xuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmlzUmVhZG9ubHkoKSxcbiAgICAgICAgICAgICAgICBzZWNvbmRhcnk6IHRydWUsXG4gICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5yZXNldFBhc3N3b3JkLFxuICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzE3NCcpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHBhc3N3b3JkRmllbGQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRGaWVsZCwge1xuICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0OiB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzIzJyksXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICcqKioqKioqKicsXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMudXBkYXRlUGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgZnVsbFdpZHRoOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5wcm9wcy5pc1JlYWRvbmx5KCkpIHtcbiAgICAgICAgICAgIHBhc3N3b3JkRmllbGQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFZhbGlkUGFzc3dvcmQsIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnc2hhcmUtcGFzc3dvcmQnLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHsgbGFiZWw6IHRoaXMucHJvcHMuZ2V0TWVzc2FnZSgnMjMnKSB9LFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnNoYXJlTW9kZWwuZ2V0UGFzc3dvcmQobGlua0lkKSxcbiAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy51cGRhdGVQYXNzd29yZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhc3N3b3JkRmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAncGFzc3dvcmQtY29udGFpbmVyJywgc3R5bGU6IHsgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnYmFzZWxpbmUnLCBtYXJnaW5Cb3R0b206IDEwIH0gfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBjbGFzc05hbWU6ICdhanhwX2ljb25fc3BhbiBtZGkgbWRpLWZpbGUtbG9jaycgfSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgd2lkdGg6IHJlc2V0UGFzc3dvcmQgPyAnNTAlJyA6ICcxMDAlJywgZGlzcGxheTogJ2lubGluZS1ibG9jaycgfSB9LFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZEZpZWxkXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICByZXNldFBhc3N3b3JkICYmIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IHdpZHRoOiAnNTAlJywgZGlzcGxheTogJ2lubGluZS1ibG9jaycgfSB9LFxuICAgICAgICAgICAgICAgICAgICByZXNldFBhc3N3b3JkXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGZvcm1hdERhdGU6IGZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZU9iamVjdCkge1xuICAgICAgICB2YXIgZGF0ZUZvcm1hdERheSA9IHRoaXMucHJvcHMuZ2V0TWVzc2FnZSgnZGF0ZV9mb3JtYXQnLCAnJykuc3BsaXQoJyAnKS5zaGlmdCgpO1xuICAgICAgICByZXR1cm4gZGF0ZUZvcm1hdERheS5yZXBsYWNlKCdZJywgZGF0ZU9iamVjdC5nZXRGdWxsWWVhcigpKS5yZXBsYWNlKCdtJywgZGF0ZU9iamVjdC5nZXRNb250aCgpICsgMSkucmVwbGFjZSgnZCcsIGRhdGVPYmplY3QuZ2V0RGF0ZSgpKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHZhciBsaW5rSWQgPSB0aGlzLnByb3BzLmxpbmtEYXRhLmhhc2g7XG4gICAgICAgIHZhciBwYXNzQ29udGFpbmVyID0gdGhpcy5yZW5kZXJQYXNzd29yZENvbnRhaW5lcigpO1xuICAgICAgICB2YXIgY3J0TGlua0RMQWxsb3dlZCA9IHRoaXMucHJvcHMuc2hhcmVNb2RlbC5nZXRQdWJsaWNMaW5rUGVybWlzc2lvbihsaW5rSWQsICdkb3dubG9hZCcpO1xuICAgICAgICB2YXIgZGxMaW1pdFZhbHVlID0gdGhpcy5wcm9wcy5zaGFyZU1vZGVsLmdldEV4cGlyYXRpb25Gb3IobGlua0lkLCAnZG93bmxvYWRzJykgPT09IDAgPyBcIlwiIDogdGhpcy5wcm9wcy5zaGFyZU1vZGVsLmdldEV4cGlyYXRpb25Gb3IobGlua0lkLCAnZG93bmxvYWRzJyk7XG4gICAgICAgIHZhciBleHBpcmF0aW9uRGF0ZVZhbHVlID0gdGhpcy5wcm9wcy5zaGFyZU1vZGVsLmdldEV4cGlyYXRpb25Gb3IobGlua0lkLCAnZGF5cycpID09PSAwID8gXCJcIiA6IHRoaXMucHJvcHMuc2hhcmVNb2RlbC5nZXRFeHBpcmF0aW9uRm9yKGxpbmtJZCwgJ2RheXMnKTtcbiAgICAgICAgdmFyIGF1dGggPSBTaGFyZU1vZGVsLmdldEF1dGhvcml6YXRpb25zKHRoaXMucHJvcHMucHlkaW8pO1xuICAgICAgICB2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIHZhciBjYWxJY29uID0gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgY2xhc3NOYW1lOiAnYWp4cF9pY29uX3NwYW4gbWRpIG1kaS1jYWxlbmRhci1jbG9jaycgfSk7XG4gICAgICAgIHZhciBleHBEYXRlID0gdW5kZWZpbmVkLFxuICAgICAgICAgICAgbWF4RGF0ZSA9IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIG1heERvd25sb2FkcyA9IG51bGwsXG4gICAgICAgICAgICBkYXRlRXhwaXJlZCA9IGZhbHNlLFxuICAgICAgICAgICAgZGxFeHBpcmVkID0gZmFsc2U7XG4gICAgICAgIGlmIChwYXJzZUludChhdXRoLm1heF9leHBpcmF0aW9uKSA+IDApIHtcbiAgICAgICAgICAgIG1heERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgbWF4RGF0ZS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSArIHBhcnNlSW50KGF1dGgubWF4X2V4cGlyYXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyc2VJbnQoYXV0aC5tYXhfZG93bmxvYWRzKSA+IDApIHtcbiAgICAgICAgICAgIG1heERvd25sb2FkcyA9IHBhcnNlSW50KGF1dGgubWF4X2Rvd25sb2Fkcyk7XG4gICAgICAgICAgICBkbExpbWl0VmFsdWUgPSBNYXRoLm1pbihkbExpbWl0VmFsdWUsIG1heERvd25sb2Fkcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV4cGlyYXRpb25EYXRlVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChleHBpcmF0aW9uRGF0ZVZhbHVlIDwgMCkge1xuICAgICAgICAgICAgICAgIGRhdGVFeHBpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4cERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgZXhwRGF0ZS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSArIHBhcnNlSW50KGV4cGlyYXRpb25EYXRlVmFsdWUpKTtcbiAgICAgICAgICAgIHZhciBjbGVhclZhbHVlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnNoYXJlTW9kZWwuc2V0RXhwaXJhdGlvbkZvcihsaW5rSWQsIFwiZGF5c1wiLCBcIlwiKTtcbiAgICAgICAgICAgIH0pLmJpbmQodGhpcyk7XG4gICAgICAgICAgICBjYWxJY29uID0gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgY2xhc3NOYW1lOiAnbWRpIG1kaS1jbG9zZS1jaXJjbGUgYWp4cF9pY29uX3NwYW4nLCBvbkNsaWNrOiBjbGVhclZhbHVlIH0pO1xuICAgICAgICAgICAgdmFyIGNhbExhYmVsID0gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnc3BhbicsXG4gICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdjYWxMYWJlbEhhc1ZhbHVlJyB9LFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0TWVzc2FnZShkYXRlRXhwaXJlZCA/ICcyMWInIDogJzIxJylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRsTGltaXRWYWx1ZSkge1xuICAgICAgICAgICAgdmFyIGRsQ291bnRlciA9IHRoaXMucHJvcHMuc2hhcmVNb2RlbC5nZXREb3dubG9hZENvdW50ZXIobGlua0lkKTtcbiAgICAgICAgICAgIHZhciByZXNldERsID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmNvbmZpcm0odGhpcy5wcm9wcy5nZXRNZXNzYWdlKCcxMDYnKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zaGFyZU1vZGVsLnJlc2V0RG93bmxvYWRDb3VudGVyKGxpbmtJZCwgZnVuY3Rpb24gKCkge30pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmJpbmQodGhpcyk7XG4gICAgICAgICAgICBpZiAoZGxDb3VudGVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc2V0TGluayA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdhJyxcbiAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogeyBjdXJzb3I6ICdwb2ludGVyJyB9LCBvbkNsaWNrOiByZXNldERsLCB0aXRsZTogdGhpcy5wcm9wcy5nZXRNZXNzYWdlKCcxNycpIH0sXG4gICAgICAgICAgICAgICAgICAgICcoJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXRNZXNzYWdlKCcxNicpLFxuICAgICAgICAgICAgICAgICAgICAnKSdcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGlmIChkbENvdW50ZXIgPj0gZGxMaW1pdFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRsRXhwaXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGRsQ291bnRlclN0cmluZyA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ3NwYW4nLFxuICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnZGxDb3VudGVyU3RyaW5nJyB9LFxuICAgICAgICAgICAgICAgIGRsQ291bnRlciArICcvJyArIGRsTGltaXRWYWx1ZSxcbiAgICAgICAgICAgICAgICAnICcsXG4gICAgICAgICAgICAgICAgcmVzZXRMaW5rXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgX21haW5DYXJkMlsnZGVmYXVsdCddLFxuICAgICAgICAgICAgeyBzdHlsZTogdGhpcy5wcm9wcy5zdHlsZSwgdGl0bGU6IHRoaXMucHJvcHMuZ2V0TWVzc2FnZSgnMTk2JykgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdzZWN0aW9uLWxlZ2VuZCcgfSxcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzI0JylcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBwYXNzQ29udGFpbmVyLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2V4cGlyZXMnLCBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH0gfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogeyBmbGV4OiAxLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9LCBjbGFzc05hbWU6IGRhdGVFeHBpcmVkID8gJ2xpbWl0LWJsb2NrLWV4cGlyZWQnIDogbnVsbCB9LFxuICAgICAgICAgICAgICAgICAgICBjYWxJY29uLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERhdGVQaWNrZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogJ2V4cGlyYXRpb25EYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBleHBEYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWluRGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heERhdGU6IG1heERhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvT2s6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5pc1JlYWRvbmx5KCksXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkRhdGVDaGFuZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93WWVhclNlbGVjdG9yOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmxvYXRpbmdMYWJlbFRleHQ6IHRoaXMucHJvcHMuZ2V0TWVzc2FnZShkYXRlRXhwaXJlZCA/ICcyMWInIDogJzIxJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiAnbGFuZHNjYXBlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdERhdGU6IHRoaXMuZm9ybWF0RGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7IGZsZXg6IDEgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgZmxleDogMSwgYWxpZ25JdGVtczogJ2NlbnRlcicsIGRpc3BsYXk6IGNydExpbmtETEFsbG93ZWQgPyAnZmxleCcgOiAnbm9uZScsIHBvc2l0aW9uOiAncmVsYXRpdmUnIH0sIGNsYXNzTmFtZTogZGxFeHBpcmVkID8gJ2xpbWl0LWJsb2NrLWV4cGlyZWQnIDogbnVsbCB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBjbGFzc05hbWU6ICdtZGkgbWRpLWRvd25sb2FkIGFqeHBfaWNvbl9zcGFuJyB9KSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0RmllbGQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuaXNSZWFkb25seSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmxvYXRpbmdMYWJlbFRleHQ6IHRoaXMucHJvcHMuZ2V0TWVzc2FnZShkbEV4cGlyZWQgPyAnMjJiJyA6ICcyMicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRsTGltaXRWYWx1ZSA+IDAgPyBkbExpbWl0VmFsdWUgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLnVwZGF0ZURMRXhwaXJhdGlvbkZpZWxkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHsgZmxleDogMSB9XG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICBkbENvdW50ZXJTdHJpbmdcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFB1YmxpY0xpbmtTZWN1cmVPcHRpb25zID0gKDAsIF9TaGFyZUNvbnRleHRDb25zdW1lcjJbJ2RlZmF1bHQnXSkoUHVibGljTGlua1NlY3VyZU9wdGlvbnMpO1xuZXhwb3J0c1snZGVmYXVsdCddID0gUHVibGljTGlua1NlY3VyZU9wdGlvbnM7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgZGVzYyA9IHBhcmVudCA9IHVuZGVmaW5lZDsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX1NoYXJlQ29udGV4dENvbnN1bWVyID0gcmVxdWlyZSgnLi4vU2hhcmVDb250ZXh0Q29uc3VtZXInKTtcblxudmFyIF9TaGFyZUNvbnRleHRDb25zdW1lcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TaGFyZUNvbnRleHRDb25zdW1lcik7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnbWF0ZXJpYWwtdWknKTtcblxudmFyIFJhaXNlZEJ1dHRvbiA9IF9yZXF1aXJlLlJhaXNlZEJ1dHRvbjtcbnZhciBUZXh0RmllbGQgPSBfcmVxdWlyZS5UZXh0RmllbGQ7XG52YXIgUGFwZXIgPSBfcmVxdWlyZS5QYXBlcjtcbnZhciBJY29uQnV0dG9uID0gX3JlcXVpcmUuSWNvbkJ1dHRvbjtcblxudmFyIFNoYXJlTW9kZWwgPSByZXF1aXJlKCdweWRpbycpLnJlcXVpcmVMaWIoJ1JlYWN0TW9kZWxTaGFyZScpO1xudmFyIENsaXBib2FyZCA9IHJlcXVpcmUoJ2NsaXBib2FyZCcpO1xuXG52YXIgVGFyZ2V0ZWRVc2VyTGluayA9IChmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhUYXJnZXRlZFVzZXJMaW5rLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIFRhcmdldGVkVXNlckxpbmsocHJvcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFRhcmdldGVkVXNlckxpbmspO1xuXG4gICAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFRhcmdldGVkVXNlckxpbmsucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IGNvcHlNZXNzYWdlOiAnJyB9O1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhUYXJnZXRlZFVzZXJMaW5rLCBbe1xuICAgICAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jbGlwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2xpcC5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fYnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2xpcCA9IG5ldyBDbGlwYm9hcmQodGhpcy5fYnV0dG9uLCB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IChmdW5jdGlvbiAodHJpZ2dlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMubGluaztcbiAgICAgICAgICAgICAgICAgICAgfSkuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NsaXAub24oJ3N1Y2Nlc3MnLCAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29weU1lc3NhZ2U6IHRoaXMucHJvcHMuZ2V0TWVzc2FnZSgnMTkyJykgfSwgdGhpcy5jbGVhckNvcHlNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9KS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGlwLm9uKCdlcnJvcicsIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb3B5TWVzc2FnZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdsb2JhbC5uYXZpZ2F0b3IucGxhdGZvcm0uaW5kZXhPZihcIk1hY1wiKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29weU1lc3NhZ2UgPSB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzE0NCcpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29weU1lc3NhZ2UgPSB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJ3NoYXJlX2NlbnRlci4xNDMnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29weU1lc3NhZ2U6IGNvcHlNZXNzYWdlIH0sIHRoaXMuY2xlYXJDb3B5TWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfSkuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudFdpbGxVbm1vdW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NsaXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGlwLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY2xlYXJDb3B5TWVzc2FnZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjbGVhckNvcHlNZXNzYWdlKCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb3B5TWVzc2FnZTogJycgfSk7XG4gICAgICAgICAgICB9KS5iaW5kKHRoaXMpLCA1MDAwKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgICAgICAgdmFyIGRpc3BsYXkgPSBfcHJvcHMuZGlzcGxheTtcbiAgICAgICAgICAgIHZhciBsaW5rID0gX3Byb3BzLmxpbms7XG4gICAgICAgICAgICB2YXIgZG93bmxvYWRfY291bnQgPSBfcHJvcHMuZG93bmxvYWRfY291bnQ7XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgZGlzcGxheTogJ2ZsZXgnIH0gfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogeyBmbGV4OiAxIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJY29uQnV0dG9uLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBweWRpbzogdGhpcy5wcm9wcy5weWRpbyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogZnVuY3Rpb24gKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9idXR0b24gPSBSZWFjdERPTS5maW5kRE9NTm9kZShyZWYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb25DbGFzc05hbWU6ICdtZGkgbWRpLWxpbmsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogdGhpcy5zdGF0ZS5jb3B5TWVzc2FnZSB8fCBsaW5rLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvblN0eWxlOiB7IGZvbnRTaXplOiAxMywgbGluZUhlaWdodDogJzE3cHgnIH0sIHN0eWxlOiB7IHdpZHRoOiAzNCwgaGVpZ2h0OiAzNCwgcGFkZGluZzogNiB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogeyB3aWR0aDogNDAsIHRleHRBbGlnbjogJ2NlbnRlcicgfSB9LFxuICAgICAgICAgICAgICAgICAgICBkb3dubG9hZF9jb3VudFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gVGFyZ2V0ZWRVc2VyTGluaztcbn0pKFJlYWN0LkNvbXBvbmVudCk7XG5cbnZhciBUYXJnZXRlZFVzZXJzID0gKGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50Mikge1xuICAgIF9pbmhlcml0cyhUYXJnZXRlZFVzZXJzLCBfUmVhY3QkQ29tcG9uZW50Mik7XG5cbiAgICBmdW5jdGlvbiBUYXJnZXRlZFVzZXJzKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBUYXJnZXRlZFVzZXJzKTtcblxuICAgICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihUYXJnZXRlZFVzZXJzLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpO1xuICAgICAgICB0aGlzLnN0YXRlID0geyBvcGVuOiBmYWxzZSB9O1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhUYXJnZXRlZFVzZXJzLCBbe1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciB0YXJnZXRfdXNlcnMgPSB0aGlzLnByb3BzLmxpbmtEYXRhLnRhcmdldF91c2VycztcblxuICAgICAgICAgICAgdmFyIGl0ZW1zID0gT2JqZWN0LmtleXModGFyZ2V0X3VzZXJzKS5tYXAoZnVuY3Rpb24gKGspIHtcbiAgICAgICAgICAgICAgICB2YXIgdXNlckRhdGEgPSB0YXJnZXRfdXNlcnNba107XG4gICAgICAgICAgICAgICAgdmFyIHRpdGxlID0gX3RoaXMyLnByb3BzLmxpbmtEYXRhLnB1YmxpY19saW5rICsgJz91PScgKyBrO1xuICAgICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFRhcmdldGVkVXNlckxpbmssIF9leHRlbmRzKHt9LCB1c2VyRGF0YSwgeyBsaW5rOiB0aXRsZSB9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghaXRlbXMubGVuZ3RoKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgdmFyIHJvb3RTdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMzRweCcsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogJzRweCAxMHB4IDRweCcsXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IDE0LFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmYWZhZmEnLFxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogMlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBoZWFkZXJTdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBib3JkZXJCb3R0b206IHRoaXMuc3RhdGUub3BlbiA/ICcxcHggc29saWQgIzc1NzU3NScgOiAnJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC4zNiknXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICB7IHN0eWxlOiByb290U3R5bGUgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogX2V4dGVuZHMoeyBkaXNwbGF5OiAnZmxleCcgfSwgaGVhZGVyU3R5bGUpIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgZmxleDogMSB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzI0NScpLnJlcGxhY2UoJyVzJywgaXRlbXMubGVuZ3RoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICcgJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IGNsYXNzTmFtZTogJ21kaSBtZGktY2hldnJvbi0nICsgKHRoaXMuc3RhdGUub3BlbiA/ICd1cCcgOiAnZG93bicpLCBzdHlsZTogeyBjdXJzb3I6ICdwb2ludGVyJyB9LCBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzMi5zZXRTdGF0ZSh7IG9wZW46ICFfdGhpczIuc3RhdGUub3BlbiB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0pXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUub3BlbiAmJiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IHdpZHRoOiA0MCwgdGV4dEFsaWduOiAnY2VudGVyJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnI0RMJ1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLm9wZW4gJiYgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBUYXJnZXRlZFVzZXJzO1xufSkoUmVhY3QuQ29tcG9uZW50KTtcblxuVGFyZ2V0ZWRVc2Vycy5wcm9wVHlwZXMgPSB7XG5cbiAgICBsaW5rRGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHNoYXJlTW9kZWw6IFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKFNoYXJlTW9kZWwpXG5cbn07XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFRhcmdldGVkVXNlcnMgPSAoMCwgX1NoYXJlQ29udGV4dENvbnN1bWVyMlsnZGVmYXVsdCddKShUYXJnZXRlZFVzZXJzKTtcblRhcmdldGVkVXNlckxpbmsgPSAoMCwgX1NoYXJlQ29udGV4dENvbnN1bWVyMlsnZGVmYXVsdCddKShUYXJnZXRlZFVzZXJMaW5rKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gVGFyZ2V0ZWRVc2Vycztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfU2hhcmVDb250ZXh0Q29uc3VtZXIgPSByZXF1aXJlKCcuLi9TaGFyZUNvbnRleHRDb25zdW1lcicpO1xuXG52YXIgX1NoYXJlQ29udGV4dENvbnN1bWVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NoYXJlQ29udGV4dENvbnN1bWVyKTtcblxudmFyIF9SZW1vdGVVc2VycyA9IHJlcXVpcmUoJy4vUmVtb3RlVXNlcnMnKTtcblxudmFyIF9SZW1vdGVVc2VyczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9SZW1vdGVVc2Vycyk7XG5cbnZhciBfU2hhcmVkVXNlcnMgPSByZXF1aXJlKCcuL1NoYXJlZFVzZXJzJyk7XG5cbnZhciBfU2hhcmVkVXNlcnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU2hhcmVkVXNlcnMpO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCdtYXRlcmlhbC11aScpO1xuXG52YXIgRGl2aWRlciA9IF9yZXF1aXJlLkRpdmlkZXI7XG5cbnZhciBTaGFyZU1vZGVsID0gcmVxdWlyZSgncHlkaW8nKS5yZXF1aXJlTGliKCdSZWFjdE1vZGVsU2hhcmUnKTtcblxudmFyIFVzZXJzUGFuZWwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdVc2Vyc1BhbmVsJyxcblxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBzaGFyZU1vZGVsOiBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihTaGFyZU1vZGVsKSxcbiAgICAgICAgc2hvd01haWxlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmNcbiAgICB9LFxuXG4gICAgb25Vc2VyVXBkYXRlOiBmdW5jdGlvbiBvblVzZXJVcGRhdGUob3BlcmF0aW9uLCB1c2VySWQsIHVzZXJEYXRhKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc2hhcmVNb2RlbC51cGRhdGVTaGFyZWRVc2VyKG9wZXJhdGlvbiwgdXNlcklkLCB1c2VyRGF0YSk7XG4gICAgfSxcblxuICAgIG9uU2F2ZVNlbGVjdGlvbjogZnVuY3Rpb24gb25TYXZlU2VsZWN0aW9uKCkge1xuICAgICAgICB2YXIgbGFiZWwgPSB3aW5kb3cucHJvbXB0KHRoaXMucHJvcHMuZ2V0TWVzc2FnZSg1MTAsICcnKSk7XG4gICAgICAgIGlmICghbGFiZWwpIHJldHVybjtcbiAgICAgICAgdGhpcy5wcm9wcy5zaGFyZU1vZGVsLnNhdmVTZWxlY3Rpb25Bc1RlYW0obGFiZWwpO1xuICAgIH0sXG5cbiAgICBzZW5kSW52aXRhdGlvbnM6IGZ1bmN0aW9uIHNlbmRJbnZpdGF0aW9ucyh1c2VyT2JqZWN0cykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIG1haWxEYXRhID0gdGhpcy5wcm9wcy5zaGFyZU1vZGVsLnByZXBhcmVFbWFpbChcInJlcG9zaXRvcnlcIik7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnNob3dNYWlsZXIobWFpbERhdGEuc3ViamVjdCwgbWFpbERhdGEubWVzc2FnZSwgdXNlck9iamVjdHMpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBnbG9iYWwuYWxlcnQoZS5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRVc2VycyA9IHRoaXMucHJvcHMuc2hhcmVNb2RlbC5nZXRTaGFyZWRVc2VycygpO1xuICAgICAgICB2YXIgZmVkZXJhdGVkRW5hYmxlZCA9IFNoYXJlTW9kZWwuZmVkZXJhdGVkU2hhcmluZ0VuYWJsZWQoKTtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgIHsgc3R5bGU6IHRoaXMucHJvcHMuc3R5bGUgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoX1NoYXJlZFVzZXJzMlsnZGVmYXVsdCddLCB7XG4gICAgICAgICAgICAgICAgc2hvd1RpdGxlOiBmZWRlcmF0ZWRFbmFibGVkLFxuICAgICAgICAgICAgICAgIHVzZXJzOiBjdXJyZW50VXNlcnMsXG4gICAgICAgICAgICAgICAgdXNlck9iamVjdHM6IHRoaXMucHJvcHMuc2hhcmVNb2RlbC5nZXRTaGFyZWRVc2Vyc0FzT2JqZWN0cygpLFxuICAgICAgICAgICAgICAgIHNlbmRJbnZpdGF0aW9uczogdGhpcy5wcm9wcy5zaG93TWFpbGVyID8gdGhpcy5zZW5kSW52aXRhdGlvbnMgOiBudWxsLFxuICAgICAgICAgICAgICAgIG9uVXNlclVwZGF0ZTogdGhpcy5vblVzZXJVcGRhdGUsXG4gICAgICAgICAgICAgICAgc2F2ZVNlbGVjdGlvbkFzVGVhbTogUHlkaW9Vc2Vycy5DbGllbnQuc2F2ZVNlbGVjdGlvblN1cHBvcnRlZCgpID8gdGhpcy5vblNhdmVTZWxlY3Rpb24gOiBudWxsLFxuICAgICAgICAgICAgICAgIHB5ZGlvOiB0aGlzLnByb3BzLnB5ZGlvXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGZlZGVyYXRlZEVuYWJsZWQgJiYgUmVhY3QuY3JlYXRlRWxlbWVudChfUmVtb3RlVXNlcnMyWydkZWZhdWx0J10sIHtcbiAgICAgICAgICAgICAgICBzaGFyZU1vZGVsOiB0aGlzLnByb3BzLnNoYXJlTW9kZWwsXG4gICAgICAgICAgICAgICAgb25Vc2VyVXBkYXRlOiB0aGlzLm9uVXNlclVwZGF0ZSxcbiAgICAgICAgICAgICAgICBweWRpbzogdGhpcy5wcm9wcy5weWRpb1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gVXNlcnNQYW5lbCA9ICgwLCBfU2hhcmVDb250ZXh0Q29uc3VtZXIyWydkZWZhdWx0J10pKFVzZXJzUGFuZWwpO1xuZXhwb3J0c1snZGVmYXVsdCddID0gVXNlcnNQYW5lbDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfU2hhcmVDb250ZXh0Q29uc3VtZXIgPSByZXF1aXJlKCcuLi9TaGFyZUNvbnRleHRDb25zdW1lcicpO1xuXG52YXIgX1NoYXJlQ29udGV4dENvbnN1bWVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NoYXJlQ29udGV4dENvbnN1bWVyKTtcblxudmFyIF9Vc2VyQmFkZ2UgPSByZXF1aXJlKCcuL1VzZXJCYWRnZScpO1xuXG52YXIgX1VzZXJCYWRnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Vc2VyQmFkZ2UpO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgUmVtb3RlVXNlckVudHJ5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnUmVtb3RlVXNlckVudHJ5JyxcblxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBzaGFyZU1vZGVsOiBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihSZWFjdE1vZGVsLlNoYXJlKSxcbiAgICAgICAgbGlua0RhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgb25SZW1vdmVVc2VyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICBvblVzZXJVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgICB9LFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbnRlcm5hbFVzZXI6IHRoaXMucHJvcHMuc2hhcmVNb2RlbC5nZXRTaGFyZWRVc2VyKHRoaXMucHJvcHMubGlua0RhdGFbJ2ludGVybmFsX3VzZXJfaWQnXSlcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcywgb2xkUHJvcHMpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpbnRlcm5hbFVzZXI6IG5ld1Byb3BzLnNoYXJlTW9kZWwuZ2V0U2hhcmVkVXNlcihuZXdQcm9wcy5saW5rRGF0YVsnaW50ZXJuYWxfdXNlcl9pZCddKVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgZ2V0U3RhdHVzOiBmdW5jdGlvbiBnZXRTdGF0dXMoKSB7XG4gICAgICAgIHZhciBsaW5rID0gdGhpcy5wcm9wcy5saW5rRGF0YTtcbiAgICAgICAgaWYgKCFsaW5rLmludml0YXRpb24pIHJldHVybiAtMTtlbHNlIHJldHVybiBsaW5rLmludml0YXRpb24uU1RBVFVTO1xuICAgIH0sXG5cbiAgICBnZXRTdGF0dXNTdHJpbmc6IGZ1bmN0aW9uIGdldFN0YXR1c1N0cmluZygpIHtcbiAgICAgICAgdmFyIHN0YXR1c2VzID0geyAncy0xJzogMjE0LCAnczEnOiAyMTEsICdzMic6IDIxMiwgJ3M0JzogMjEzIH07XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmdldE1lc3NhZ2Uoc3RhdHVzZXNbJ3MnICsgdGhpcy5nZXRTdGF0dXMoKV0pO1xuICAgIH0sXG5cbiAgICBidWlsZExhYmVsOiBmdW5jdGlvbiBidWlsZExhYmVsKCkge1xuICAgICAgICB2YXIgbGluayA9IHRoaXMucHJvcHMubGlua0RhdGE7XG4gICAgICAgIHZhciBob3N0ID0gbGluay5IT1NUIHx8IChsaW5rLmludml0YXRpb24gPyBsaW5rLmludml0YXRpb24uSE9TVCA6IG51bGwpO1xuICAgICAgICB2YXIgdXNlciA9IGxpbmsuVVNFUiB8fCAobGluay5pbnZpdGF0aW9uID8gbGluay5pbnZpdGF0aW9uLlVTRVIgOiBudWxsKTtcbiAgICAgICAgaWYgKCFob3N0IHx8ICF1c2VyKSByZXR1cm4gXCJFcnJvclwiO1xuICAgICAgICByZXR1cm4gdXNlciArIFwiIEAgXCIgKyBob3N0O1xuICAgIH0sXG5cbiAgICByZW1vdmVVc2VyOiBmdW5jdGlvbiByZW1vdmVVc2VyKCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uUmVtb3ZlVXNlcih0aGlzLnByb3BzLmxpbmtEYXRhWydoYXNoJ10pO1xuICAgIH0sXG5cbiAgICBvblVwZGF0ZVJpZ2h0OiBmdW5jdGlvbiBvblVwZGF0ZVJpZ2h0KGV2ZW50KSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHRoaXMucHJvcHMub25Vc2VyVXBkYXRlKCd1cGRhdGVfcmlnaHQnLCB0aGlzLnN0YXRlLmludGVybmFsVXNlci5JRCwgeyByaWdodDogdGFyZ2V0Lm5hbWUsIGFkZDogdGFyZ2V0LmNoZWNrZWQgfSk7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgbWVudUl0ZW1zID0gW107XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5pc1JlYWRvbmx5KCkpIHtcbiAgICAgICAgICAgIG1lbnVJdGVtcyA9IFt7XG4gICAgICAgICAgICAgICAgdGV4dDogdGhpcy5wcm9wcy5nZXRNZXNzYWdlKCcyNTcnLCAnJyksXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IHRoaXMucmVtb3ZlVXNlclxuICAgICAgICAgICAgfV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0YXR1cyA9IHRoaXMuZ2V0U3RhdHVzKCk7XG4gICAgICAgIHZhciBhZGRpdGlvbmFsSXRlbTtcbiAgICAgICAgaWYgKHN0YXR1cyA9PSAyKSB7XG4gICAgICAgICAgICBhZGRpdGlvbmFsSXRlbSA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ3NwYW4nLFxuICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAndXNlci1iYWRnZS1yaWdodHMtY29udGFpbmVyJyB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgeyB0eXBlOiAnY2hlY2tib3gnLCBuYW1lOiAncmVhZCcsIGRpc2FibGVkOiB0aGlzLnByb3BzLmlzUmVhZG9ubHkoKSwgY2hlY2tlZDogdGhpcy5zdGF0ZS5pbnRlcm5hbFVzZXIuUklHSFQuaW5kZXhPZigncicpICE9PSAtMSwgb25DaGFuZ2U6IHRoaXMub25VcGRhdGVSaWdodCB9KSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdpbnB1dCcsIHsgdHlwZTogJ2NoZWNrYm94JywgbmFtZTogJ3dyaXRlJywgZGlzYWJsZWQ6IHRoaXMucHJvcHMuaXNSZWFkb25seSgpLCBjaGVja2VkOiB0aGlzLnN0YXRlLmludGVybmFsVXNlci5SSUdIVC5pbmRleE9mKCd3JykgIT09IC0xLCBvbkNoYW5nZTogdGhpcy5vblVwZGF0ZVJpZ2h0IH0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkaXRpb25hbEl0ZW0gPSBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdzcGFuJyxcbiAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ3VzZXItYmFkZ2UtcmlnaHRzLWNvbnRhaW5lcicgfSxcbiAgICAgICAgICAgICAgICB0aGlzLmdldFN0YXR1c1N0cmluZygpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBfVXNlckJhZGdlMlsnZGVmYXVsdCddLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLmJ1aWxkTGFiZWwoKSxcbiAgICAgICAgICAgICAgICBhdmF0YXI6IG51bGwsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJyZW1vdGVfdXNlclwiLFxuICAgICAgICAgICAgICAgIG1lbnVzOiBtZW51SXRlbXNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZGRpdGlvbmFsSXRlbVxuICAgICAgICApO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFJlbW90ZVVzZXJFbnRyeSA9ICgwLCBfU2hhcmVDb250ZXh0Q29uc3VtZXIyWydkZWZhdWx0J10pKFJlbW90ZVVzZXJFbnRyeSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBSZW1vdGVVc2VyRW50cnk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX1NoYXJlQ29udGV4dENvbnN1bWVyID0gcmVxdWlyZSgnLi4vU2hhcmVDb250ZXh0Q29uc3VtZXInKTtcblxudmFyIF9TaGFyZUNvbnRleHRDb25zdW1lcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TaGFyZUNvbnRleHRDb25zdW1lcik7XG5cbnZhciBfUmVtb3RlVXNlckVudHJ5ID0gcmVxdWlyZSgnLi9SZW1vdGVVc2VyRW50cnknKTtcblxudmFyIF9SZW1vdGVVc2VyRW50cnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUmVtb3RlVXNlckVudHJ5KTtcblxudmFyIF9tYWluQ2FyZCA9IHJlcXVpcmUoJy4uL21haW4vQ2FyZCcpO1xuXG52YXIgX21haW5DYXJkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21haW5DYXJkKTtcblxudmFyIF9tYWluQWN0aW9uQnV0dG9uID0gcmVxdWlyZSgnLi4vbWFpbi9BY3Rpb25CdXR0b24nKTtcblxudmFyIF9tYWluQWN0aW9uQnV0dG9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21haW5BY3Rpb25CdXR0b24pO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCdtYXRlcmlhbC11aScpO1xuXG52YXIgVGV4dEZpZWxkID0gX3JlcXVpcmUuVGV4dEZpZWxkO1xudmFyIEljb25CdXR0b24gPSBfcmVxdWlyZS5JY29uQnV0dG9uO1xudmFyIFBhcGVyID0gX3JlcXVpcmUuUGFwZXI7XG5cbnZhciBQeWRpbyA9IHJlcXVpcmUoJ3B5ZGlvJyk7XG5cbnZhciBfUHlkaW8kcmVxdWlyZUxpYiA9IFB5ZGlvLnJlcXVpcmVMaWIoJ1JlYWN0TW9kZWxTaGFyZScpO1xuXG52YXIgUmVhY3RNb2RlbFNoYXJlID0gX1B5ZGlvJHJlcXVpcmVMaWIuUmVhY3RNb2RlbFNoYXJlO1xuXG52YXIgX1B5ZGlvJHJlcXVpcmVMaWIyID0gUHlkaW8ucmVxdWlyZUxpYignY29tcG9uZW50cycpO1xuXG52YXIgQWRkcmVzc0Jvb2sgPSBfUHlkaW8kcmVxdWlyZUxpYjIuQWRkcmVzc0Jvb2s7XG5cbnZhciBSZW1vdGVVc2VycyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ1JlbW90ZVVzZXJzJyxcblxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBzaGFyZU1vZGVsOiBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihSZWFjdE1vZGVsU2hhcmUpLFxuICAgICAgICBvblVzZXJVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIHB5ZGlvOiBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihQeWRpbylcbiAgICB9LFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7IGFkZERpc2FibGVkOiB0cnVlLCBzaG93VXNlckZvcm06IGZhbHNlIH07XG4gICAgfSxcblxuICAgIGFkZFVzZXI6IGZ1bmN0aW9uIGFkZFVzZXIoKSB7XG4gICAgICAgIHZhciBoID0gdGhpcy5yZWZzW1wiaG9zdFwiXS5nZXRWYWx1ZSgpO1xuICAgICAgICB2YXIgdSA9IHRoaXMucmVmc1tcInVzZXJcIl0uZ2V0VmFsdWUoKTtcbiAgICAgICAgdGhpcy5wcm9wcy5zaGFyZU1vZGVsLmNyZWF0ZVJlbW90ZUxpbmsoaCwgdSk7XG4gICAgfSxcblxuICAgIHJlbW92ZVVzZXI6IGZ1bmN0aW9uIHJlbW92ZVVzZXIobGlua0lkKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc2hhcmVNb2RlbC5yZW1vdmVSZW1vdGVMaW5rKGxpbmtJZCk7XG4gICAgfSxcblxuICAgIG1vbml0b3JJbnB1dDogZnVuY3Rpb24gbW9uaXRvcklucHV0KCkge1xuICAgICAgICB2YXIgaCA9IHRoaXMucmVmc1tcImhvc3RcIl0uZ2V0VmFsdWUoKTtcbiAgICAgICAgdmFyIHUgPSB0aGlzLnJlZnNbXCJ1c2VyXCJdLmdldFZhbHVlKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBhZGREaXNhYmxlZDogIShoICYmIHUpIH0pO1xuICAgIH0sXG5cbiAgICBvbkFkZHJlc3NCb29rSXRlbVNlbGVjdGVkOiBmdW5jdGlvbiBvbkFkZHJlc3NCb29rSXRlbVNlbGVjdGVkKHVPYmplY3QsIHBhcmVudCkge1xuICAgICAgICB2YXIgdHJ1c3RlZFNlcnZlcklkID0gdU9iamVjdC50cnVzdGVkU2VydmVySWQ7XG5cbiAgICAgICAgdmFyIHVzZXJJZCA9IHVPYmplY3QuZ2V0SWQoKTtcbiAgICAgICAgdGhpcy5wcm9wcy5zaGFyZU1vZGVsLmNyZWF0ZVJlbW90ZUxpbmsoJ3RydXN0ZWQ6Ly8nICsgdHJ1c3RlZFNlcnZlcklkLCB1c2VySWQpO1xuICAgIH0sXG5cbiAgICBnZXRBY3Rpb25zOiBmdW5jdGlvbiBnZXRBY3Rpb25zKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIHZhciBvY3NSZW1vdGVzID0gdGhpcy5wcm9wcy5weWRpby5nZXRQbHVnaW5Db25maWdzKCdjb3JlLm9jcycpLmdldCgnVFJVU1RFRF9TRVJWRVJTJyk7XG4gICAgICAgIHZhciBoYXNUcnVzdGVkID0gb2NzUmVtb3RlcyAmJiBvY3NSZW1vdGVzLmxlbmd0aDtcblxuICAgICAgICByZXR1cm4gW1JlYWN0LmNyZWF0ZUVsZW1lbnQoX21haW5BY3Rpb25CdXR0b24yWydkZWZhdWx0J10sIHsga2V5OiAnbWFudWFsJywgbWRpSWNvbjogJ2FjY291bnQtcGx1cycsIG1lc3NhZ2VJZDogJzQ1Jywgb25Ub3VjaFRhcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHsgc2hvd1VzZXJGb3JtOiB0cnVlIH0pO1xuICAgICAgICAgICAgfSB9KSwgUmVhY3QuY3JlYXRlRWxlbWVudChBZGRyZXNzQm9vaywge1xuICAgICAgICAgICAga2V5OiAnYWRkcmVzc2Jvb2snLFxuICAgICAgICAgICAgbW9kZTogJ3BvcG92ZXInLFxuICAgICAgICAgICAgcHlkaW86IHRoaXMucHJvcHMucHlkaW8sXG4gICAgICAgICAgICBvbkl0ZW1TZWxlY3RlZDogdGhpcy5vbkFkZHJlc3NCb29rSXRlbVNlbGVjdGVkLFxuICAgICAgICAgICAgdXNlcnNGcm9tOiAncmVtb3RlJyxcbiAgICAgICAgICAgIGRpc2FibGVTZWFyY2g6IHRydWUsXG4gICAgICAgICAgICBwb3BvdmVyQnV0dG9uOiBSZWFjdC5jcmVhdGVFbGVtZW50KF9tYWluQWN0aW9uQnV0dG9uMlsnZGVmYXVsdCddLCB7IG1kaUljb246ICdzZXJ2ZXItbmV0d29yaycsIG1lc3NhZ2VJZDogJzQ1JyB9KVxuICAgICAgICB9KV07XG4gICAgfSxcblxuICAgIHJlbmRlclVzZXJGb3JtOiBmdW5jdGlvbiByZW5kZXJVc2VyRm9ybSgpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaXNSZWFkb25seSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIFBhcGVyLFxuICAgICAgICAgICAgeyB6RGVwdGg6IDAsIHN0eWxlOiB7IHBhZGRpbmc6ICcwIDE2cHgnLCBiYWNrZ3JvdW5kQ29sb3I6ICcjRkFGQUZBJywgbWFyZ2luVG9wOiAxMCB9IH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0RmllbGQsIHsgZnVsbFdpZHRoOiB0cnVlLCByZWY6ICdob3N0JywgZmxvYXRpbmdMYWJlbFRleHQ6IHRoaXMucHJvcHMuZ2V0TWVzc2FnZSgnMjA5JyksIG9uQ2hhbmdlOiB0aGlzLm1vbml0b3JJbnB1dCB9KSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRGaWVsZCwgeyBmdWxsV2lkdGg6IHRydWUsIHJlZjogJ3VzZXInLCB0eXBlOiAndGV4dCcsIGZsb2F0aW5nTGFiZWxUZXh0OiB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzIxMCcpLCBvbkNoYW5nZTogdGhpcy5tb25pdG9ySW5wdXQgfSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgdGV4dEFsaWduOiAncmlnaHQnIH0gfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEljb25CdXR0b24sIHsgdG9vbHRpcDogJ0NhbmNlbCcsIGljb25DbGFzc05hbWU6ICdtZGkgbWRpLXVuZG8nLCBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpczIuc2V0U3RhdGUoeyBzaG93VXNlckZvcm06IGZhbHNlIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IH0pLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbkJ1dHRvbiwgeyB0b29sdGlwOiB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzQ1JyksIGljb25DbGFzc05hbWU6ICdpY29uLXBsdXMtc2lnbicsIG9uQ2xpY2s6IHRoaXMuYWRkVXNlciwgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuYWRkRGlzYWJsZWQgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHZhciBvY3NMaW5rcyA9IHRoaXMucHJvcHMuc2hhcmVNb2RlbC5nZXRPY3NMaW5rc0J5U3RhdHVzKCksXG4gICAgICAgICAgICBpbnYsXG4gICAgICAgICAgICByd0hlYWRlcixcbiAgICAgICAgICAgIGhhc0FjdGl2ZU9jc0xpbmsgPSBmYWxzZTtcblxuICAgICAgICBpbnYgPSBvY3NMaW5rcy5tYXAoKGZ1bmN0aW9uIChsaW5rKSB7XG4gICAgICAgICAgICBoYXNBY3RpdmVPY3NMaW5rID0gIWhhc0FjdGl2ZU9jc0xpbmsgJiYgbGluayAmJiBsaW5rLmludml0YXRpb24gJiYgbGluay5pbnZpdGF0aW9uLlNUQVRVUyA9PSAyID8gdHJ1ZSA6IGhhc0FjdGl2ZU9jc0xpbms7XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KF9SZW1vdGVVc2VyRW50cnkyWydkZWZhdWx0J10sIHtcbiAgICAgICAgICAgICAgICBzaGFyZU1vZGVsOiB0aGlzLnByb3BzLnNoYXJlTW9kZWwsXG4gICAgICAgICAgICAgICAgbGlua0RhdGE6IGxpbmssXG4gICAgICAgICAgICAgICAgb25SZW1vdmVVc2VyOiB0aGlzLnJlbW92ZVVzZXIsXG4gICAgICAgICAgICAgICAgb25Vc2VyVXBkYXRlOiB0aGlzLnByb3BzLm9uVXNlclVwZGF0ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmJpbmQodGhpcykpO1xuXG4gICAgICAgIGlmIChoYXNBY3RpdmVPY3NMaW5rKSB7XG4gICAgICAgICAgICByd0hlYWRlciA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdzaGFyZWQtdXNlcnMtcmlnaHRzLWhlYWRlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAncmVhZCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0TWVzc2FnZSgnMzYxJywgJycpXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ3JlYWQnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzE4MScpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBfbWFpbkNhcmQyWydkZWZhdWx0J10sXG4gICAgICAgICAgICB7IHRpdGxlOiB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzIwNycpLCBhY3Rpb25zOiB0aGlzLmdldEFjdGlvbnMoKSB9LFxuICAgICAgICAgICAgIW9jc0xpbmtzLmxlbmd0aCAmJiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgY29sb3I6ICdyZ2JhKDAsMCwwLDAuNDMpJywgcGFkZGluZ0JvdHRvbTogMTYgfSB9LFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0TWVzc2FnZSgnMjA4JylcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgcndIZWFkZXIsXG4gICAgICAgICAgICAgICAgaW52XG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zaG93VXNlckZvcm0gJiYgdGhpcy5yZW5kZXJVc2VyRm9ybSgpXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFJlbW90ZVVzZXJzID0gKDAsIF9TaGFyZUNvbnRleHRDb25zdW1lcjJbJ2RlZmF1bHQnXSkoUmVtb3RlVXNlcnMpO1xuZXhwb3J0c1snZGVmYXVsdCddID0gUmVtb3RlVXNlcnM7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX1VzZXJCYWRnZSA9IHJlcXVpcmUoJy4vVXNlckJhZGdlJyk7XG5cbnZhciBfVXNlckJhZGdlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1VzZXJCYWRnZSk7XG5cbnZhciBfU2hhcmVDb250ZXh0Q29uc3VtZXIgPSByZXF1aXJlKCcuLi9TaGFyZUNvbnRleHRDb25zdW1lcicpO1xuXG52YXIgX1NoYXJlQ29udGV4dENvbnN1bWVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NoYXJlQ29udGV4dENvbnN1bWVyKTtcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIFNoYXJlZFVzZXJFbnRyeSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ1NoYXJlZFVzZXJFbnRyeScsXG5cbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgdXNlckVudHJ5OiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgIHVzZXJPYmplY3Q6IFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKFB5ZGlvVXNlcnMuVXNlcikuaXNSZXF1aXJlZCxcbiAgICAgICAgb25Vc2VyVXBkYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICBzZW5kSW52aXRhdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG4gICAgfSxcbiAgICBvblJlbW92ZTogZnVuY3Rpb24gb25SZW1vdmUoKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25Vc2VyVXBkYXRlKCdyZW1vdmUnLCB0aGlzLnByb3BzLnVzZXJFbnRyeS5JRCwgdGhpcy5wcm9wcy51c2VyRW50cnkpO1xuICAgIH0sXG4gICAgb25Ub2dnbGVXYXRjaDogZnVuY3Rpb24gb25Ub2dnbGVXYXRjaCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblVzZXJVcGRhdGUoJ3VwZGF0ZV9yaWdodCcsIHRoaXMucHJvcHMudXNlckVudHJ5LklELCB7IHJpZ2h0OiAnd2F0Y2gnLCBhZGQ6ICF0aGlzLnByb3BzLnVzZXJFbnRyeVsnV0FUQ0gnXSB9KTtcbiAgICB9LFxuICAgIG9uSW52aXRlOiBmdW5jdGlvbiBvbkludml0ZSgpIHtcbiAgICAgICAgdmFyIHRhcmdldHMgPSB7fTtcbiAgICAgICAgdGFyZ2V0c1t0aGlzLnByb3BzLnVzZXJPYmplY3QuZ2V0SWQoKV0gPSB0aGlzLnByb3BzLnVzZXJPYmplY3Q7XG4gICAgICAgIHRoaXMucHJvcHMuc2VuZEludml0YXRpb25zKHRhcmdldHMpO1xuICAgIH0sXG4gICAgb25VcGRhdGVSaWdodDogZnVuY3Rpb24gb25VcGRhdGVSaWdodChldmVudCkge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICB0aGlzLnByb3BzLm9uVXNlclVwZGF0ZSgndXBkYXRlX3JpZ2h0JywgdGhpcy5wcm9wcy51c2VyRW50cnkuSUQsIHsgcmlnaHQ6IHRhcmdldC5uYW1lLCBhZGQ6IHRhcmdldC5jaGVja2VkIH0pO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHZhciBtZW51SXRlbXMgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudXNlckVudHJ5LlRZUEUgIT0gJ2dyb3VwJykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnByb3BzLmlzUmVhZG9ubHkoKSkge1xuICAgICAgICAgICAgICAgIC8vIFRvZ2dsZSBOb3RpZlxuICAgICAgICAgICAgICAgIG1lbnVJdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdGhpcy5wcm9wcy5nZXRNZXNzYWdlKCcxODMnKSxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHRoaXMub25Ub2dnbGVXYXRjaCxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogdGhpcy5wcm9wcy51c2VyRW50cnkuV0FUQ0hcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmRJbnZpdGF0aW9ucykge1xuICAgICAgICAgICAgICAgIC8vIFNlbmQgaW52aXRhdGlvblxuICAgICAgICAgICAgICAgIG1lbnVJdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdGhpcy5wcm9wcy5nZXRNZXNzYWdlKCc0NScpLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogdGhpcy5vbkludml0ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5pc1JlYWRvbmx5KCkpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBFbnRyeVxuICAgICAgICAgICAgbWVudUl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMucHJvcHMuZ2V0TWVzc2FnZSgnMjU3JywgJycpLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB0aGlzLm9uUmVtb3ZlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIF9Vc2VyQmFkZ2UyWydkZWZhdWx0J10sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMucHJvcHMudXNlckVudHJ5LkxBQkVMIHx8IHRoaXMucHJvcHMudXNlckVudHJ5LklELFxuICAgICAgICAgICAgICAgIGF2YXRhcjogdGhpcy5wcm9wcy51c2VyRW50cnkuQVZBVEFSLFxuICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMucHJvcHMudXNlckVudHJ5LlRZUEUsXG4gICAgICAgICAgICAgICAgbWVudXM6IG1lbnVJdGVtc1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ3NwYW4nLFxuICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAndXNlci1iYWRnZS1yaWdodHMtY29udGFpbmVyJywgc3R5bGU6ICFtZW51SXRlbXMubGVuZ3RoID8geyBtYXJnaW5SaWdodDogNDggfSA6IHt9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7IHR5cGU6ICdjaGVja2JveCcsIG5hbWU6ICdyZWFkJywgZGlzYWJsZWQ6IHRoaXMucHJvcHMuaXNSZWFkb25seSgpLCBjaGVja2VkOiB0aGlzLnByb3BzLnVzZXJFbnRyeS5SSUdIVC5pbmRleE9mKCdyJykgIT09IC0xLCBvbkNoYW5nZTogdGhpcy5vblVwZGF0ZVJpZ2h0IH0pLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgeyB0eXBlOiAnY2hlY2tib3gnLCBuYW1lOiAnd3JpdGUnLCBkaXNhYmxlZDogdGhpcy5wcm9wcy5pc1JlYWRvbmx5KCksIGNoZWNrZWQ6IHRoaXMucHJvcHMudXNlckVudHJ5LlJJR0hULmluZGV4T2YoJ3cnKSAhPT0gLTEsIG9uQ2hhbmdlOiB0aGlzLm9uVXBkYXRlUmlnaHQgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gU2hhcmVkVXNlckVudHJ5ID0gKDAsIF9TaGFyZUNvbnRleHRDb25zdW1lcjJbJ2RlZmF1bHQnXSkoU2hhcmVkVXNlckVudHJ5KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFNoYXJlZFVzZXJFbnRyeTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfU2hhcmVDb250ZXh0Q29uc3VtZXIgPSByZXF1aXJlKCcuLi9TaGFyZUNvbnRleHRDb25zdW1lcicpO1xuXG52YXIgX1NoYXJlQ29udGV4dENvbnN1bWVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NoYXJlQ29udGV4dENvbnN1bWVyKTtcblxudmFyIF9Vc2VyQmFkZ2UgPSByZXF1aXJlKCcuL1VzZXJCYWRnZScpO1xuXG52YXIgX1VzZXJCYWRnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Vc2VyQmFkZ2UpO1xuXG52YXIgX1NoYXJlZFVzZXJFbnRyeSA9IHJlcXVpcmUoJy4vU2hhcmVkVXNlckVudHJ5Jyk7XG5cbnZhciBfU2hhcmVkVXNlckVudHJ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NoYXJlZFVzZXJFbnRyeSk7XG5cbnZhciBfbWFpbkFjdGlvbkJ1dHRvbiA9IHJlcXVpcmUoJy4uL21haW4vQWN0aW9uQnV0dG9uJyk7XG5cbnZhciBfbWFpbkFjdGlvbkJ1dHRvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tYWluQWN0aW9uQnV0dG9uKTtcblxudmFyIF9tYWluQ2FyZCA9IHJlcXVpcmUoJy4uL21haW4vQ2FyZCcpO1xuXG52YXIgX21haW5DYXJkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21haW5DYXJkKTtcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIFB5ZGlvID0gcmVxdWlyZSgncHlkaW8nKTtcblxudmFyIF9QeWRpbyRyZXF1aXJlTGliID0gUHlkaW8ucmVxdWlyZUxpYignY29tcG9uZW50cycpO1xuXG52YXIgVXNlcnNDb21wbGV0ZXIgPSBfUHlkaW8kcmVxdWlyZUxpYi5Vc2Vyc0NvbXBsZXRlcjtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnbWF0ZXJpYWwtdWknKTtcblxudmFyIFBhcGVyID0gX3JlcXVpcmUuUGFwZXI7XG5cbnZhciBTaGFyZWRVc2VycyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ1NoYXJlZFVzZXJzJyxcblxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBweWRpbzogUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoUHlkaW8pLFxuICAgICAgICB1c2VyczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gICAgICAgIHVzZXJPYmplY3RzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgIG9uVXNlclVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgc2F2ZVNlbGVjdGlvbkFzVGVhbTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHNlbmRJbnZpdGF0aW9uczogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHNob3dUaXRsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2xcbiAgICB9LFxuICAgIHNlbmRJbnZpdGF0aW9uVG9BbGxVc2VyczogZnVuY3Rpb24gc2VuZEludml0YXRpb25Ub0FsbFVzZXJzKCkge1xuICAgICAgICB0aGlzLnByb3BzLnNlbmRJbnZpdGF0aW9ucyh0aGlzLnByb3BzLnVzZXJPYmplY3RzKTtcbiAgICB9LFxuICAgIGNsZWFyQWxsVXNlcnM6IGZ1bmN0aW9uIGNsZWFyQWxsVXNlcnMoKSB7XG4gICAgICAgIHRoaXMucHJvcHMudXNlcnMubWFwKChmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25Vc2VyVXBkYXRlKCdyZW1vdmUnLCBlbnRyeS5JRCwgZW50cnkpO1xuICAgICAgICB9KS5iaW5kKHRoaXMpKTtcbiAgICB9LFxuICAgIHZhbHVlU2VsZWN0ZWQ6IGZ1bmN0aW9uIHZhbHVlU2VsZWN0ZWQodXNlck9iamVjdCkge1xuICAgICAgICB2YXIgbmV3RW50cnkgPSB7XG4gICAgICAgICAgICBJRDogdXNlck9iamVjdC5nZXRJZCgpLFxuICAgICAgICAgICAgUklHSFQ6ICdyJyxcbiAgICAgICAgICAgIExBQkVMOiB1c2VyT2JqZWN0LmdldExhYmVsKCksXG4gICAgICAgICAgICBUWVBFOiB1c2VyT2JqZWN0LmdldEdyb3VwKCkgPyAnZ3JvdXAnIDogJ3VzZXInXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucHJvcHMub25Vc2VyVXBkYXRlKCdhZGQnLCBuZXdFbnRyeS5JRCwgbmV3RW50cnkpO1xuICAgIH0sXG4gICAgY29tcGxldGVyUmVuZGVyU3VnZ2VzdGlvbjogZnVuY3Rpb24gY29tcGxldGVyUmVuZGVyU3VnZ2VzdGlvbih1c2VyT2JqZWN0KSB7XG4gICAgICAgIHZhciB0eXBlID0gdXNlck9iamVjdC5nZXRUeXBlKCkgPT09ICd0ZWFtJyB8fCB1c2VyT2JqZWN0LmdldElkKCkuaW5kZXhPZignL0FKWFBfVEVBTS8nKSA9PT0gMCA/ICd0ZWFtJyA6IHVzZXJPYmplY3QuZ2V0R3JvdXAoKSA/ICdncm91cCcgOiB1c2VyT2JqZWN0LmdldFRlbXBvcmFyeSgpID8gJ3RlbXBvcmFyeScgOiB1c2VyT2JqZWN0LmdldEV4dGVybmFsKCkgPyAndG1wX3VzZXInIDogJ3VzZXInO1xuXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KF9Vc2VyQmFkZ2UyWydkZWZhdWx0J10sIHtcbiAgICAgICAgICAgIGxhYmVsOiB1c2VyT2JqZWN0LmdldEV4dGVuZGVkTGFiZWwoKSB8fCB1c2VyT2JqZWN0LmdldExhYmVsKCksXG4gICAgICAgICAgICBhdmF0YXI6IHVzZXJPYmplY3QuZ2V0QXZhdGFyKCksXG4gICAgICAgICAgICB0eXBlOiB0eXBlXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgLy8gc29ydCBieSBncm91cC91c2VyIHRoZW4gYnkgSUQ7XG4gICAgICAgIHZhciB1c2VyRW50cmllcyA9IHRoaXMucHJvcHMudXNlcnMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGIuVFlQRSA9PT0gJ2dyb3VwJyB8fCBiLlRZUEUgPT09ICd0ZWFtJyA/IDEgOiBhLlRZUEUgPT09ICdncm91cCcgfHwgYS5UWVBFID09PSAndGVhbScgPyAtMSA6IGEuSUQgPiBiLklEID8gMSA6IGIuSUQgPiBhLklEID8gLTEgOiAwO1xuICAgICAgICB9KS5tYXAoKGZ1bmN0aW9uICh1KSB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChfU2hhcmVkVXNlckVudHJ5MlsnZGVmYXVsdCddLCB7XG4gICAgICAgICAgICAgICAgdXNlckVudHJ5OiB1LFxuICAgICAgICAgICAgICAgIHVzZXJPYmplY3Q6IHRoaXMucHJvcHMudXNlck9iamVjdHNbdS5JRF0sXG4gICAgICAgICAgICAgICAga2V5OiB1LklELFxuICAgICAgICAgICAgICAgIHNoYXJlTW9kZWw6IHRoaXMucHJvcHMuc2hhcmVNb2RlbCxcbiAgICAgICAgICAgICAgICBvblVzZXJVcGRhdGU6IHRoaXMucHJvcHMub25Vc2VyVXBkYXRlLFxuICAgICAgICAgICAgICAgIHNlbmRJbnZpdGF0aW9uczogdGhpcy5wcm9wcy5zZW5kSW52aXRhdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdmFyIGFjdGlvbkxpbmtzID0gW107XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnVzZXJzLmxlbmd0aCAmJiAhdGhpcy5wcm9wcy5pc1JlYWRvbmx5KCkpIHtcbiAgICAgICAgICAgIGFjdGlvbkxpbmtzLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChfbWFpbkFjdGlvbkJ1dHRvbjJbJ2RlZmF1bHQnXSwgeyBrZXk6ICdjbGVhcicsIGNhbGxiYWNrOiB0aGlzLmNsZWFyQWxsVXNlcnMsIG1kaUljb246ICdkZWxldGUnLCBtZXNzYWdlSWQ6ICcxODAnIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kSW52aXRhdGlvbnMgJiYgdGhpcy5wcm9wcy51c2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFjdGlvbkxpbmtzLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChfbWFpbkFjdGlvbkJ1dHRvbjJbJ2RlZmF1bHQnXSwgeyBrZXk6ICdpbnZpdGUnLCBjYWxsYmFjazogdGhpcy5zZW5kSW52aXRhdGlvblRvQWxsVXNlcnMsIG1kaUljb246ICdlbWFpbC1vdXRsaW5lJywgbWVzc2FnZUlkOiAnNDUnIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zYXZlU2VsZWN0aW9uQXNUZWFtICYmIHRoaXMucHJvcHMudXNlcnMubGVuZ3RoID4gMSAmJiAhdGhpcy5wcm9wcy5pc1JlYWRvbmx5KCkpIHtcbiAgICAgICAgICAgIGFjdGlvbkxpbmtzLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChfbWFpbkFjdGlvbkJ1dHRvbjJbJ2RlZmF1bHQnXSwgeyBrZXk6ICd0ZWFtJywgY2FsbGJhY2s6IHRoaXMucHJvcHMuc2F2ZVNlbGVjdGlvbkFzVGVhbSwgbWRpSWNvbjogJ2FjY291bnQtbXVsdGlwbGUtcGx1cycsIG1lc3NhZ2VJZDogJzUwOScsIG1lc3NhZ2VDb3JlTmFtZXNwYWNlOiB0cnVlIH0pKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcndIZWFkZXIgPSB1bmRlZmluZWQsXG4gICAgICAgICAgICB1c2Vyc0lucHV0ID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy51c2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJ3SGVhZGVyID0gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ3NoYXJlZC11c2Vycy1yaWdodHMtaGVhZGVyJyB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdyZWFkJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5nZXRNZXNzYWdlKCczNjEnLCAnJylcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAncmVhZCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0TWVzc2FnZSgnMTgxJylcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmlzUmVhZG9ubHkoKSkge1xuICAgICAgICAgICAgdmFyIGV4Y2x1ZGVzID0gdGhpcy5wcm9wcy51c2Vycy5tYXAoZnVuY3Rpb24gKHUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdS5JRDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXNlcnNJbnB1dCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoVXNlcnNDb21wbGV0ZXIsIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdzaGFyZS1mb3JtLXVzZXJzJyxcbiAgICAgICAgICAgICAgICBmaWVsZExhYmVsOiB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzM0JyksXG4gICAgICAgICAgICAgICAgcmVuZGVyU3VnZ2VzdGlvbjogdGhpcy5jb21wbGV0ZXJSZW5kZXJTdWdnZXN0aW9uLFxuICAgICAgICAgICAgICAgIG9uVmFsdWVTZWxlY3RlZDogdGhpcy52YWx1ZVNlbGVjdGVkLFxuICAgICAgICAgICAgICAgIGV4Y2x1ZGVzOiBleGNsdWRlcyxcbiAgICAgICAgICAgICAgICBweWRpbzogdGhpcy5wcm9wcy5weWRpbyxcbiAgICAgICAgICAgICAgICBzaG93QWRkcmVzc0Jvb2s6IHRydWUsXG4gICAgICAgICAgICAgICAgdXNlcnNGcm9tOiAnbG9jYWwnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIF9tYWluQ2FyZDJbJ2RlZmF1bHQnXSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy5zaG93VGl0bGUgPyB0aGlzLnByb3BzLmdldE1lc3NhZ2UoJzIxNycpIDogbnVsbCxcbiAgICAgICAgICAgICAgICBhY3Rpb25zOiBhY3Rpb25MaW5rc1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBzdHlsZTogdXNlckVudHJpZXMubGVuZ3RoID8geyBtYXJnaW46ICctMjBweCA4cHggMTZweCcgfSA6IHsgbWFyZ2luVG9wOiAtMjAgfSB9LFxuICAgICAgICAgICAgICAgIHVzZXJzSW5wdXRcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICByd0hlYWRlcixcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICB1c2VyRW50cmllc1xuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICF1c2VyRW50cmllcy5sZW5ndGggJiYgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IGNvbG9yOiAncmdiYSgwLDAsMCwwLjQzKScgfSB9LFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0TWVzc2FnZSgnMTgyJylcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gU2hhcmVkVXNlcnMgPSAoMCwgX1NoYXJlQ29udGV4dENvbnN1bWVyMlsnZGVmYXVsdCddKShTaGFyZWRVc2Vycyk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBTaGFyZWRVc2Vycztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBkZXNjID0gcGFyZW50ID0gdW5kZWZpbmVkOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgQ29tcG9uZW50ID0gX3JlcXVpcmUuQ29tcG9uZW50O1xudmFyIFByb3BUeXBlcyA9IF9yZXF1aXJlLlByb3BUeXBlcztcblxudmFyIF9yZXF1aXJlMiA9IHJlcXVpcmUoJ21hdGVyaWFsLXVpJyk7XG5cbnZhciBNZW51SXRlbSA9IF9yZXF1aXJlMi5NZW51SXRlbTtcbnZhciBJY29uTWVudSA9IF9yZXF1aXJlMi5JY29uTWVudTtcbnZhciBJY29uQnV0dG9uID0gX3JlcXVpcmUyLkljb25CdXR0b247XG5cbnZhciBfcmVxdWlyZTMgPSByZXF1aXJlKCdtYXRlcmlhbC11aS9zdHlsZXMnKTtcblxudmFyIG11aVRoZW1lYWJsZSA9IF9yZXF1aXJlMy5tdWlUaGVtZWFibGU7XG5cbnZhciBDb2xvciA9IHJlcXVpcmUoJ2NvbG9yJyk7XG5cbnZhciBVc2VyQmFkZ2UgPSAoZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoVXNlckJhZGdlLCBfQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIFVzZXJCYWRnZSgpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFVzZXJCYWRnZSk7XG5cbiAgICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoVXNlckJhZGdlLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKFVzZXJCYWRnZSwgW3tcbiAgICAgICAga2V5OiAncmVuZGVyTWVudScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXJNZW51KCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnByb3BzLm1lbnVzIHx8ICF0aGlzLnByb3BzLm1lbnVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1lbnVJdGVtcyA9IHRoaXMucHJvcHMubWVudXMubWFwKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJpZ2h0SWNvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBpZiAobS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0SWNvbiA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IGNsYXNzTmFtZTogJ21kaSBtZGktY2hlY2snIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChNZW51SXRlbSwge1xuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5VGV4dDogbS50ZXh0LFxuICAgICAgICAgICAgICAgICAgICBvblRvdWNoVGFwOiBtLmNhbGxiYWNrLFxuICAgICAgICAgICAgICAgICAgICByaWdodEljb246IHJpZ2h0SWNvbiB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGljb25TdHlsZSA9IHsgZm9udFNpemU6IDE4IH07XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBJY29uTWVudSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGljb25CdXR0b25FbGVtZW50OiBSZWFjdC5jcmVhdGVFbGVtZW50KEljb25CdXR0b24sIHsgc3R5bGU6IHsgcGFkZGluZzogMTYgfSwgaWNvblN0eWxlOiBpY29uU3R5bGUsIGljb25DbGFzc05hbWU6ICdpY29uLWVsbGlwc2lzLXZlcnRpY2FsJyB9KSxcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9yT3JpZ2luOiB7IGhvcml6b250YWw6ICdyaWdodCcsIHZlcnRpY2FsOiAndG9wJyB9LFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRPcmlnaW46IHsgaG9yaXpvbnRhbDogJ3JpZ2h0JywgdmVydGljYWw6ICd0b3AnIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1lbnVJdGVtc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHZhciBhdmF0YXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB2YXIgYXZhdGFyQ29sb3IgPSB0aGlzLnByb3BzLm11aVRoZW1lLnBhbGV0dGUuYXZhdGFyc0NvbG9yO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudHlwZSA9PSAnZ3JvdXAnKSB7XG4gICAgICAgICAgICAgICAgYXZhdGFyQ29sb3IgPSBDb2xvcihhdmF0YXJDb2xvcikuZGFya2VuKC4yKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGF2YXRhciA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IGNsYXNzTmFtZTogJ2F2YXRhciBtZGkgbWRpLWFjY291bnQtbXVsdGlwbGUnLCBzdHlsZTogeyBiYWNrZ3JvdW5kQ29sb3I6IGF2YXRhckNvbG9yIH0gfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMudHlwZSA9PSAndGVhbScpIHtcbiAgICAgICAgICAgICAgICBhdmF0YXJDb2xvciA9IENvbG9yKGF2YXRhckNvbG9yKS5kYXJrZW4oLjIpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgYXZhdGFyID0gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgY2xhc3NOYW1lOiAnYXZhdGFyIG1kaSBtZGktYWNjb3VudC1tdWx0aXBsZS1vdXRsaW5lJywgc3R5bGU6IHsgYmFja2dyb3VuZENvbG9yOiBhdmF0YXJDb2xvciB9IH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnR5cGUgPT0gJ3RlbXBvcmFyeScpIHtcbiAgICAgICAgICAgICAgICBhdmF0YXJDb2xvciA9IENvbG9yKGF2YXRhckNvbG9yKS5saWdodGVuKC4yKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGF2YXRhciA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IGNsYXNzTmFtZTogJ2F2YXRhciBtZGkgbWRpLWFjY291bnQtcGx1cycsIHN0eWxlOiB7IGJhY2tncm91bmRDb2xvcjogYXZhdGFyQ29sb3IgfSB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy50eXBlID09ICdyZW1vdGVfdXNlcicpIHtcbiAgICAgICAgICAgICAgICBhdmF0YXIgPSBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBjbGFzc05hbWU6ICdhdmF0YXIgbWRpIG1kaS1hY2NvdW50LW5ldHdvcmsnLCBzdHlsZTogeyBiYWNrZ3JvdW5kQ29sb3I6IGF2YXRhckNvbG9yIH0gfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF2YXRhciA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IGNsYXNzTmFtZTogJ2F2YXRhciBtZGkgbWRpLWFjY291bnQnLCBzdHlsZTogeyBiYWNrZ3JvdW5kQ29sb3I6IGF2YXRhckNvbG9yIH0gfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWVudSA9IHRoaXMucmVuZGVyTWVudSgpO1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6IFwic2hhcmUtZGlhbG9nIHVzZXItYmFkZ2UgdXNlci10eXBlLVwiICsgdGhpcy5wcm9wcy50eXBlIH0sXG4gICAgICAgICAgICAgICAgYXZhdGFyLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICd1c2VyLWJhZGdlLWxhYmVsJyB9LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmxhYmVsXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuLFxuICAgICAgICAgICAgICAgIG1lbnVcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gVXNlckJhZGdlO1xufSkoQ29tcG9uZW50KTtcblxuVXNlckJhZGdlLnByb3BUeXBlcyA9IHtcbiAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhdmF0YXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtZW51czogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBtdWlUaGVtZTogUHJvcFR5cGVzLm9iamVjdFxufTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gVXNlckJhZGdlID0gbXVpVGhlbWVhYmxlKCkoVXNlckJhZGdlKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gVXNlckJhZGdlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4iXX0=
