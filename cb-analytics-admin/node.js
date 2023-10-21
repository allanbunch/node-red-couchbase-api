'use strict';
var lib = require('./lib.js');

module.exports = function (RED) {
    function AnalyticsAdministrationRestApisNode(config) {
        RED.nodes.createNode(this, config);
        this.service = RED.nodes.getNode(config.service);
        this.method = config.method;
        this.cancel_request_clientContextId = config.cancel_request_clientContextId;
        this.cancel_request_clientContextIdType = config.cancel_request_clientContextIdType || 'str';
        var node = this;

        node.on('input', function (msg) {
            var errorFlag = false;
            var client;
            if (this.service && this.service.host) {
                client = new lib.AnalyticsAdministrationRestApis({ domain: this.service.host });
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
            if (!errorFlag && node.method === 'cancel_request') {
                var cancel_request_parameters = [];
                var cancel_request_nodeParam;
                var cancel_request_nodeParamType;

                cancel_request_nodeParam = node.cancel_request_clientContextId;
                cancel_request_nodeParamType = node.cancel_request_clientContextIdType;
                if (cancel_request_nodeParamType === 'str') {
                    cancel_request_parameters.clientContextId = cancel_request_nodeParam || '';
                } else {
                    cancel_request_parameters.clientContextId = RED.util.getMessageProperty(msg, cancel_request_nodeParam);
                }
                cancel_request_parameters.clientContextId = !!cancel_request_parameters.clientContextId ? cancel_request_parameters.clientContextId : '';
                result = client.cancel_request(cancel_request_parameters);
            }
            if (!errorFlag && node.method === 'cluster_status') {
                var cluster_status_parameters = [];
                var cluster_status_nodeParam;
                var cluster_status_nodeParamType;
                result = client.cluster_status(cluster_status_parameters);
            }
            if (!errorFlag && node.method === 'restart_cluster') {
                var restart_cluster_parameters = [];
                var restart_cluster_nodeParam;
                var restart_cluster_nodeParamType;
                result = client.restart_cluster(restart_cluster_parameters);
            }
            if (!errorFlag && node.method === 'restart_node') {
                var restart_node_parameters = [];
                var restart_node_nodeParam;
                var restart_node_nodeParamType;
                result = client.restart_node(restart_node_parameters);
            }
            if (!errorFlag && node.method === 'ingestion_status') {
                var ingestion_status_parameters = [];
                var ingestion_status_nodeParam;
                var ingestion_status_nodeParamType;
                result = client.ingestion_status(ingestion_status_parameters);
            }
            if (!errorFlag && node.method === 'monitor_node') {
                var monitor_node_parameters = [];
                var monitor_node_nodeParam;
                var monitor_node_nodeParamType;
                result = client.monitor_node(monitor_node_parameters);
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
                node.status({ fill: 'blue', shape: 'dot', text: 'AnalyticsAdministrationRestApis.status.requesting' });
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

    RED.nodes.registerType('analytics-administration-rest-apis', AnalyticsAdministrationRestApisNode);
    function AnalyticsAdministrationRestApisServiceNode(n) {
        RED.nodes.createNode(this, n);
        this.host = n.host;

        this.username = n.username;
        this.password = n.password;
    }

    RED.nodes.registerType('analytics-administration-rest-apis-service', AnalyticsAdministrationRestApisServiceNode, {
        credentials: {
            username: { type: 'text' },
            password: { type: 'password' },
            temp: { type: 'text' }
        }
    });
};
