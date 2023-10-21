'use strict';
var lib = require('./lib.js');

module.exports = function (RED) {
    function AnalyticsSettingsRestApiNode(config) {
        RED.nodes.createNode(this, config);
        this.service = RED.nodes.getNode(config.service);
        this.method = config.method;
        this.post_settings_numReplicas = config.post_settings_numReplicas;
        this.post_settings_numReplicasType = config.post_settings_numReplicasType || 'str';
        var node = this;

        node.on('input', function (msg) {
            var errorFlag = false;
            var client;
            if (this.service && this.service.host) {
                client = new lib.AnalyticsSettingsRestApi({ domain: this.service.host });
            } else {
                node.error('Host in configuration node is not specified.', msg);
                errorFlag = true;
            }
            if (!errorFlag && this.service && this.service.credentials) {
                client.setBasicAuth(this.service.credentials.username, this.service.credentials.password);
            }
            if (!errorFlag) {
                client.body = msg.payload;
            }

            var result;
            if (!errorFlag && node.method === 'get_settings') {
                var get_settings_parameters = [];
                var get_settings_nodeParam;
                var get_settings_nodeParamType;
                result = client.get_settings(get_settings_parameters);
            }
            if (!errorFlag && node.method === 'post_settings') {
                var post_settings_parameters = [];
                var post_settings_nodeParam;
                var post_settings_nodeParamType;

                post_settings_nodeParam = node.post_settings_numReplicas;
                post_settings_nodeParamType = node.post_settings_numReplicasType;
                if (post_settings_nodeParamType === 'str') {
                    post_settings_parameters.numReplicas = post_settings_nodeParam || '';
                } else {
                    post_settings_parameters.numReplicas = RED.util.getMessageProperty(msg, post_settings_nodeParam);
                }
                post_settings_parameters.numReplicas = !!post_settings_parameters.numReplicas ? post_settings_parameters.numReplicas : msg.payload;
                                result = client.post_settings(post_settings_parameters);
            }
            if (!errorFlag && result === undefined) {
                node.error('Method is not specified.', msg);
                errorFlag = true;
            }
            var setData = function (msg, data) {
                if (data) {
                    if (data.response) {
                        if (data.response.statusCode) {
                            msg.statusCode = data.response.statusCode;
                        }
                        if (data.response.headers) {
                            msg.headers = data.response.headers;
                        }
                        if (data.response.request && data.response.request.uri && data.response.request.uri.href) {
                            msg.responseUrl = data.response.request.uri.href;
                        }
                    }
                    if (data.body) {
                        msg.payload = data.body;
                    }
                }
                return msg;
            };
            if (!errorFlag) {
                node.status({ fill: 'blue', shape: 'dot', text: 'AnalyticsSettingsRestApi.status.requesting' });
                result.then(function (data) {
                    node.send(setData(msg, data));
                    node.status({});
                }).catch(function (error) {
                    var message = null;
                    if (error && error.body && error.body.message) {
                        message = error.body.message;
                    }
                    node.error(message, setData(msg, error));
                    node.status({ fill: 'red', shape: 'ring', text: 'node-red:common.status.error' });
                });
            }
        });
    }

    RED.nodes.registerType('analytics-settings-rest-api', AnalyticsSettingsRestApiNode);
    function AnalyticsSettingsRestApiServiceNode(n) {
        RED.nodes.createNode(this, n);
        this.host = n.host;

        this.username = n.username;
        this.password = n.password;
    }

    RED.nodes.registerType('analytics-settings-rest-api-service', AnalyticsSettingsRestApiServiceNode, {
        credentials: {
            username: { type: 'text' },
            password: { type: 'password' },
            temp: { type: 'text' }
        }
    });
};
