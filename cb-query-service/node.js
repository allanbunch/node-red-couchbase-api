'use strict';
var lib = require('./lib.js');

module.exports = function (RED) {
    function QueryServiceRestApiNode(config) {
        RED.nodes.createNode(this, config);
        this.service = RED.nodes.getNode(config.service);
        this.method = config.method;
        this.post_service_parameters = config.post_service_parameters;
        this.post_service_parametersType = config.post_service_parametersType || 'str';
        var node = this;

        node.on('input', function (msg) {
            var errorFlag = false;
            var client;
            if (this.service && this.service.host) {
                client = new lib.QueryServiceRestApi({ domain: this.service.host });
            } else {
                node.error('Host in configuration node is not specified.', msg);
                errorFlag = true;
            }
            if (!errorFlag && this.service && this.service.credentials && this.service.credentials.secureApiKeyValue) {
                if (this.service.secureApiKeyIsQuery) {
                    client.setApiKey(this.service.credentials.secureApiKeyValue,
                        this.service.secureApiKeyHeaderOrQueryName, true);
                } else {
                    client.setApiKey(this.service.credentials.secureApiKeyValue,
                        this.service.secureApiKeyHeaderOrQueryName, false);
                }
            }
            if (!errorFlag && this.service && this.service.credentials) {
                client.setBasicAuth(this.service.credentials.username, this.service.credentials.password);
            }
            if (!errorFlag) {
                client.body = msg.payload;
            }

            var result;
            if (!errorFlag && node.method === 'post_service') {
                var post_service_parameters = [];
                var post_service_nodeParam;
                var post_service_nodeParamType;

                post_service_nodeParam = node.post_service_parameters;
                post_service_nodeParamType = node.post_service_parametersType;
                if (post_service_nodeParamType === 'str') {
                    post_service_parameters.parameters = post_service_nodeParam || '';
                } else {
                    post_service_parameters.parameters = RED.util.getMessageProperty(msg, post_service_nodeParam);
                }
                post_service_parameters.parameters = !!post_service_parameters.parameters ? post_service_parameters.parameters : msg.payload;
                result = client.post_service(post_service_parameters);
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
                node.status({ fill: 'blue', shape: 'dot', text: 'QueryServiceRestApi.status.requesting' });
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

    RED.nodes.registerType('query-service-rest-api', QueryServiceRestApiNode);
    function QueryServiceRestApiServiceNode(n) {
        RED.nodes.createNode(this, n);
        this.host = n.host;

        this.secureApiKeyValue = n.secureApiKeyValue;
        this.secureApiKeyHeaderOrQueryName = n.secureApiKeyHeaderOrQueryName;
        this.secureApiKeyIsQuery = n.secureApiKeyIsQuery;
        this.username = n.username;
        this.password = n.password;
    }

    RED.nodes.registerType('query-service-rest-api-service', QueryServiceRestApiServiceNode, {
        credentials: {
            secureApiKeyValue: { type: 'password' },
            username: { type: 'text' },
            password: { type: 'password' },
            temp: { type: 'text' }
        }
    });
};
