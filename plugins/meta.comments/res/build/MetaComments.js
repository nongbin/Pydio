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

"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

(function (global) {

    var Comment = React.createClass({
        displayName: "Comment",

        propTypes: {
            comment: React.PropTypes.object.isRequired,
            pydio: React.PropTypes.instanceOf(Pydio).isRequired,
            removeComment: React.PropTypes.func.isRequired
        },

        render: function render() {
            var _this = this;

            var c = this.props.comment;
            var _props = this.props;
            var comment = _props.comment;
            var pydio = _props.pydio;
            var removeComment = _props.removeComment;

            var contents = comment.content.split('<br>').map(function (part) {
                return React.createElement(
                    "div",
                    { className: "part" },
                    part
                );
            });
            var link = undefined;
            if (comment.rpath) {
                link = React.createElement(
                    "div",
                    { className: "link" },
                    React.createElement(
                        "a",
                        {
                            title: pydio.MessageHash['meta.comments.4'].replace('%s', comment.rpath),
                            onTouchTap: function () {
                                pydio.goTo(comment.path);
                            }
                        },
                        comment.rpath
                    )
                );
            }
            var deleteButton = undefined;
            if (pydio.user && comment.author === pydio.user.id) {
                var remove = function remove() {
                    _this.props.removeComment(c);
                };
                deleteButton = React.createElement("div", { className: "delete-comment mdi mdi-close", onTouchTap: remove });
            }
            return React.createElement(
                "div",
                { key: comment.uuid, className: "comment" },
                React.createElement(
                    "div",
                    { className: "date" },
                    comment.hdate
                ),
                React.createElement(
                    "div",
                    { className: "comment-line" },
                    React.createElement(
                        "div",
                        { style: { paddingTop: 2 } },
                        React.createElement(PydioComponents.UserAvatar, { avatarSize: 30, pydio: this.props.pydio, userId: comment.author, displayLabel: false })
                    ),
                    React.createElement(
                        MaterialUI.Paper,
                        { zDepth: 0, style: { backgroundColor: '#F5F5F5' }, className: "content" },
                        deleteButton,
                        contents,
                        link
                    )
                )
            );
        }

    });

    var Panel = React.createClass({
        displayName: "Panel",

        getInitialState: function getInitialState() {
            return { comments: [], value: '', history: [], historyCursor: -1 };
        },

        componentDidMount: function componentDidMount() {
            this.start(this.props.node);
        },

        componentWillUnmount: function componentWillUnmount() {
            this.stop();
        },

        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            if (nextProps.node !== this.props.node) {
                this.start(nextProps.node);
            }
        },

        componentDidUpdate: function componentDidUpdate() {
            this.refs.comments.scrollTop = 10000;
        },

        mqObserver: function mqObserver(currentNode, event) {
            var _this2 = this;

            var message = XMLUtils.XPathSelectSingleNode(event, "/tree/metacomments");
            if (!message) {
                return;
            }
            var metaEvent = message.getAttribute('event');
            var path = message.getAttribute('path');
            var crtPath = currentNode.getPath();
            if (path.indexOf(crtPath) !== 0) {
                return;
            }
            if (metaEvent === 'newcomment' && crtPath === currentNode.getPath()) {
                (function () {
                    var data = JSON.parse(message.firstChild.nodeValue);
                    var comments = _this2.state.comments || [];
                    var found = false;
                    comments.forEach(function (el) {
                        if (el.uuid = data.uuid) found = true;
                    });
                    if (!found) {
                        comments.push(data);
                        _this2.setState({ comments: comments });
                    }
                })();
            } else {
                this.loadComments(currentNode);
            }
        },

        start: function start(node) {
            var _this3 = this;

            this.stop();
            var configs = this.props.pydio.getPluginConfigs("mq");
            if (configs) {
                this._mqObs = function (event) {
                    _this3.mqObserver(node, event);
                };
                this.props.pydio.observe("server_message", this._mqObs);
            } else {
                this._pe = new PeriodicalExecuter((function () {
                    this.loadComments(node);
                }).bind(this), 5);
            }
            this.loadComments(node);
        },

        stop: function stop() {
            if (this._pe) {
                this._pe.stop();
            }
            if (this._mqObs) {
                this.props.pydio.stopObserving("server_message", this._mqObs);
                this._mqObs = null;
            }
        },

        loadComments: function loadComments(node) {

            PydioApi.getClient().request({
                get_action: 'load_comments_feed',
                file: node.getPath(),
                sort_by: 'date',
                sort_dir: 'asc'
            }, (function (transport) {

                if (!this.isMounted() || node !== this.props.node) return;
                this.setState({ comments: transport.responseJSON });
            }).bind(this), null, { discrete: true });
        },

        removeComment: function removeComment(comment) {
            var _this4 = this;

            PydioApi.getClient().request({
                get_action: 'delete_comment',
                file: this.props.node.getPath(),
                comment_data: JSON.stringify(comment)
            }, function () {
                _this4.loadComments(_this4.props.node);
            });
        },

        insertComment: function insertComment() {
            var _this5 = this;

            var value = this.refs.new_comment.getValue();
            if (!value) return;
            PydioApi.getClient().request({
                get_action: "post_comment",
                file: this.props.node.getPath(),
                content: value
            }, function (transp) {
                var hist = _this5.state.history;
                hist.unshift(value);
                _this5.setState({ value: '', history: hist, historyCursor: -1 });
                if (!_this5._mqObs) {
                    _this5.loadComments(_this5.props.node);
                } else {
                    var comments = [].concat(_toConsumableArray(_this5.state.comments), [transp.responseJSON]);
                    _this5.setState({ comments: comments });
                }
            });
        },

        keyDown: function keyDown(event) {
            if (event.key === 'Enter') {
                this.insertComment();
            }
            if (!this.state.value || this.state.historyCursor !== -1) {
                if (event.key === 'ArrowUp') {
                    var crt = this.state.historyCursor;
                    if (this.state.history[crt + 1]) {
                        this.setState({ historyCursor: crt + 1, value: this.state.history[crt + 1] });
                    }
                } else if (event.key === 'ArrowDown') {
                    var crt = this.state.historyCursor;
                    if (this.state.history[crt - 1]) {
                        this.setState({ historyCursor: crt - 1, value: this.state.history[crt - 1] });
                    }
                }
            }
        },

        render: function render() {
            var _this6 = this;

            var stateComments = this.state.comments || [];
            var comments = stateComments.map((function (c) {
                return React.createElement(Comment, {
                    key: c.uuid,
                    comment: c,
                    pydio: this.props.pydio,
                    removeComment: this.removeComment
                });
            }).bind(this));

            return React.createElement(
                PydioWorkspaces.InfoPanelCard,
                { style: this.props.style, title: this.props.pydio.MessageHash['meta.comments.1'], icon: "comment-outline", iconColor: "#795548" },
                React.createElement(
                    "div",
                    { style: { maxHeight: 300, overflowY: 'auto', overflowX: 'hidden' }, ref: "comments", className: "comments_feed" },
                    comments
                ),
                React.createElement(MaterialUI.Divider, null),
                React.createElement(
                    "div",
                    { style: { backgroundColor: 'white' } },
                    React.createElement(MaterialUI.TextField, {
                        hintText: this.props.pydio.MessageHash['meta.comments.2'],
                        hintStyle: { whiteSpace: 'nowrap' },
                        multiLine: true,
                        value: this.state.value,
                        ref: "new_comment",
                        onKeyDown: this.keyDown,
                        onChange: function (event, newValue) {
                            _this6.setState({ value: newValue, historyCursor: -1 });
                        },
                        fullWidth: true,
                        underlineShow: false
                    })
                )
            );
        }

    });

    global.MetaComments = {
        Panel: Panel
    };
})(window);
