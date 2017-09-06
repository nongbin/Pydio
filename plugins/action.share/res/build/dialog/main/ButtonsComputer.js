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
