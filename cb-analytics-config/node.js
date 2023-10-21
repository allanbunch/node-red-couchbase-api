'use strict';
var lib = require('./lib.js');

module.exports = function (RED) {
    function AnalyticsConfigurationRestApiNode(config) {
        RED.nodes.createNode(this, config);
        this.service = RED.nodes.getNode(config.service);
        this.method = config.method;
        this.put_service_service = config.put_service_service;
        this.put_service_serviceType = config.put_service_serviceType || 'str';
        this.put_node_node = config.put_node_node;
        this.put_node_nodeType = config.put_node_nodeType || 'str';
        var node = this;

        node.on('input', function (msg) {
            var errorFlag = false;
            var client;
            if (this.service && this.service.host) {
                client = new lib.AnalyticsConfigurationRestApi({ domain: this.service.host });
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
            if (!errorFlag && node.method === 'get_service') {
                var get_service_parameters = [];
                var get_service_nodeParam;
                var get_service_nodeParamType;
                result = client.get_service(get_service_parameters);
            }
            if (!errorFlag && node.method === 'put_service') {
                var put_service_parameters = [];
                var put_service_nodeParam;
                var put_service_nodeParamType;

                put_service_nodeParam = node.put_service_service;
                put_service_nodeParamType = node.put_service_serviceType;
                if (put_service_nodeParamType === 'str') {
                    put_service_parameters.service = put_service_nodeParam || '';
                } else {
                    put_service_parameters.service = RED.util.getMessageProperty(msg, put_service_nodeParam);
                }
                put_service_parameters.service = !!put_service_parameters.service ? put_service_parameters.service : msg.payload;
                                result = client.put_service(put_service_parameters);
            }
            if (!errorFlag && node.method === 'get_node') {
                var get_node_parameters = [];
                var get_node_nodeParam;
                var get_node_nodeParamType;
                result = client.get_node(get_node_parameters);
            }
            if (!errorFlag && node.method === 'put_node') {
                var put_node_parameters = [];
                var put_node_nodeParam;
                var put_node_nodeParamType;

                put_node_nodeParam = node.put_node_node;
                put_node_nodeParamType = node.put_node_nodeType;
                if (put_node_nodeParamType === 'str') {
                    put_node_parameters.node = put_node_nodeParam || '';
                } else {
                    put_node_parameters.node = RED.util.getMessageProperty(msg, put_node_nodeParam);
                }
                put_node_parameters.node = !!put_node_parameters.node ? put_node_parameters.node : msg.payload;
                                result = client.put_node(put_node_parameters);
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
                node.status({ fill: 'blue', shape: 'dot', text: 'AnalyticsConfigurationRestApi.status.requesting' });
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

    RED.nodes.registerType('analytics-configuration-rest-api', AnalyticsConfigurationRestApiNode);
    function AnalyticsConfigurationRestApiServiceNode(n) {
        RED.nodes.createNode(this, n);
        this.host = n.host;

        this.username = n.username;
        this.password = n.password;
    }

    RED.nodes.registerType('analytics-configuration-rest-api-service', AnalyticsConfigurationRestApiServiceNode, {
        credentials: {
            username: { type: 'text' },
            password: { type: 'password' },
            temp: { type: 'text' }
        }
    });
};
