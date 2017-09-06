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
