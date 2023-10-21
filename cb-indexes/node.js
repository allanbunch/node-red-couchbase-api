'use strict';
var lib = require('./lib.js');

module.exports = function (RED) {
    function IndexStatisticsRestApiNode(config) {
        RED.nodes.createNode(this, config);
        this.service = RED.nodes.getNode(config.service);
        this.method = config.method;
        this.get_node_stats_pretty = config.get_node_stats_pretty;
        this.get_node_stats_prettyType = config.get_node_stats_prettyType || 'str';
        this.get_node_stats_redact = config.get_node_stats_redact;
        this.get_node_stats_redactType = config.get_node_stats_redactType || 'str';
        this.get_node_stats_skipEmpty = config.get_node_stats_skipEmpty;
        this.get_node_stats_skipEmptyType = config.get_node_stats_skipEmptyType || 'str';
        this.get_keyspace_stats_keyspace = config.get_keyspace_stats_keyspace;
        this.get_keyspace_stats_keyspaceType = config.get_keyspace_stats_keyspaceType || 'str';
        this.get_keyspace_stats_pretty = config.get_keyspace_stats_pretty;
        this.get_keyspace_stats_prettyType = config.get_keyspace_stats_prettyType || 'str';
        this.get_keyspace_stats_redact = config.get_keyspace_stats_redact;
        this.get_keyspace_stats_redactType = config.get_keyspace_stats_redactType || 'str';
        this.get_keyspace_stats_skipEmpty = config.get_keyspace_stats_skipEmpty;
        this.get_keyspace_stats_skipEmptyType = config.get_keyspace_stats_skipEmptyType || 'str';
        this.get_index_stats_keyspace = config.get_index_stats_keyspace;
        this.get_index_stats_keyspaceType = config.get_index_stats_keyspaceType || 'str';
        this.get_index_stats_index = config.get_index_stats_index;
        this.get_index_stats_indexType = config.get_index_stats_indexType || 'str';
        this.get_index_stats_pretty = config.get_index_stats_pretty;
        this.get_index_stats_prettyType = config.get_index_stats_prettyType || 'str';
        this.get_index_stats_partition = config.get_index_stats_partition;
        this.get_index_stats_partitionType = config.get_index_stats_partitionType || 'str';
        this.get_index_stats_redact = config.get_index_stats_redact;
        this.get_index_stats_redactType = config.get_index_stats_redactType || 'str';
        this.get_index_stats_skipEmpty = config.get_index_stats_skipEmpty;
        this.get_index_stats_skipEmptyType = config.get_index_stats_skipEmptyType || 'str';
        var node = this;

        node.on('input', function (msg) {
            var errorFlag = false;
            var client;
            if (this.service && this.service.host) {
                client = new lib.IndexStatisticsRestApi({ domain: this.service.host });
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
            if (!errorFlag && node.method === 'get_node_stats') {
                var get_node_stats_parameters = [];
                var get_node_stats_nodeParam;
                var get_node_stats_nodeParamType;

                get_node_stats_nodeParam = node.get_node_stats_pretty;
                get_node_stats_nodeParamType = node.get_node_stats_prettyType;
                if (get_node_stats_nodeParamType === 'str') {
                    get_node_stats_parameters.pretty = get_node_stats_nodeParam || '';
                } else {
                    get_node_stats_parameters.pretty = RED.util.getMessageProperty(msg, get_node_stats_nodeParam);
                }
                get_node_stats_parameters.pretty = !!get_node_stats_parameters.pretty ? get_node_stats_parameters.pretty : msg.payload;
                
                get_node_stats_nodeParam = node.get_node_stats_redact;
                get_node_stats_nodeParamType = node.get_node_stats_redactType;
                if (get_node_stats_nodeParamType === 'str') {
                    get_node_stats_parameters.redact = get_node_stats_nodeParam || '';
                } else {
                    get_node_stats_parameters.redact = RED.util.getMessageProperty(msg, get_node_stats_nodeParam);
                }
                get_node_stats_parameters.redact = !!get_node_stats_parameters.redact ? get_node_stats_parameters.redact : msg.payload;
                
                get_node_stats_nodeParam = node.get_node_stats_skipEmpty;
                get_node_stats_nodeParamType = node.get_node_stats_skipEmptyType;
                if (get_node_stats_nodeParamType === 'str') {
                    get_node_stats_parameters.skipEmpty = get_node_stats_nodeParam || '';
                } else {
                    get_node_stats_parameters.skipEmpty = RED.util.getMessageProperty(msg, get_node_stats_nodeParam);
                }
                get_node_stats_parameters.skipEmpty = !!get_node_stats_parameters.skipEmpty ? get_node_stats_parameters.skipEmpty : msg.payload;
                                result = client.get_node_stats(get_node_stats_parameters);
            }
            if (!errorFlag && node.method === 'get_keyspace_stats') {
                var get_keyspace_stats_parameters = [];
                var get_keyspace_stats_nodeParam;
                var get_keyspace_stats_nodeParamType;

                get_keyspace_stats_nodeParam = node.get_keyspace_stats_keyspace;
                get_keyspace_stats_nodeParamType = node.get_keyspace_stats_keyspaceType;
                if (get_keyspace_stats_nodeParamType === 'str') {
                    get_keyspace_stats_parameters.keyspace = get_keyspace_stats_nodeParam || '';
                } else {
                    get_keyspace_stats_parameters.keyspace = RED.util.getMessageProperty(msg, get_keyspace_stats_nodeParam);
                }
                get_keyspace_stats_parameters.keyspace = !!get_keyspace_stats_parameters.keyspace ? get_keyspace_stats_parameters.keyspace : msg.payload;
                
                get_keyspace_stats_nodeParam = node.get_keyspace_stats_pretty;
                get_keyspace_stats_nodeParamType = node.get_keyspace_stats_prettyType;
                if (get_keyspace_stats_nodeParamType === 'str') {
                    get_keyspace_stats_parameters.pretty = get_keyspace_stats_nodeParam || '';
                } else {
                    get_keyspace_stats_parameters.pretty = RED.util.getMessageProperty(msg, get_keyspace_stats_nodeParam);
                }
                get_keyspace_stats_parameters.pretty = !!get_keyspace_stats_parameters.pretty ? get_keyspace_stats_parameters.pretty : msg.payload;
                
                get_keyspace_stats_nodeParam = node.get_keyspace_stats_redact;
                get_keyspace_stats_nodeParamType = node.get_keyspace_stats_redactType;
                if (get_keyspace_stats_nodeParamType === 'str') {
                    get_keyspace_stats_parameters.redact = get_keyspace_stats_nodeParam || '';
                } else {
                    get_keyspace_stats_parameters.redact = RED.util.getMessageProperty(msg, get_keyspace_stats_nodeParam);
                }
                get_keyspace_stats_parameters.redact = !!get_keyspace_stats_parameters.redact ? get_keyspace_stats_parameters.redact : msg.payload;
                
                get_keyspace_stats_nodeParam = node.get_keyspace_stats_skipEmpty;
                get_keyspace_stats_nodeParamType = node.get_keyspace_stats_skipEmptyType;
                if (get_keyspace_stats_nodeParamType === 'str') {
                    get_keyspace_stats_parameters.skipEmpty = get_keyspace_stats_nodeParam || '';
                } else {
                    get_keyspace_stats_parameters.skipEmpty = RED.util.getMessageProperty(msg, get_keyspace_stats_nodeParam);
                }
                get_keyspace_stats_parameters.skipEmpty = !!get_keyspace_stats_parameters.skipEmpty ? get_keyspace_stats_parameters.skipEmpty : msg.payload;
                                result = client.get_keyspace_stats(get_keyspace_stats_parameters);
            }
            if (!errorFlag && node.method === 'get_index_stats') {
                var get_index_stats_parameters = [];
                var get_index_stats_nodeParam;
                var get_index_stats_nodeParamType;

                get_index_stats_nodeParam = node.get_index_stats_keyspace;
                get_index_stats_nodeParamType = node.get_index_stats_keyspaceType;
                if (get_index_stats_nodeParamType === 'str') {
                    get_index_stats_parameters.keyspace = get_index_stats_nodeParam || '';
                } else {
                    get_index_stats_parameters.keyspace = RED.util.getMessageProperty(msg, get_index_stats_nodeParam);
                }
                get_index_stats_parameters.keyspace = !!get_index_stats_parameters.keyspace ? get_index_stats_parameters.keyspace : msg.payload;
                
                get_index_stats_nodeParam = node.get_index_stats_index;
                get_index_stats_nodeParamType = node.get_index_stats_indexType;
                if (get_index_stats_nodeParamType === 'str') {
                    get_index_stats_parameters.index = get_index_stats_nodeParam || '';
                } else {
                    get_index_stats_parameters.index = RED.util.getMessageProperty(msg, get_index_stats_nodeParam);
                }
                get_index_stats_parameters.index = !!get_index_stats_parameters.index ? get_index_stats_parameters.index : msg.payload;
                
                get_index_stats_nodeParam = node.get_index_stats_pretty;
                get_index_stats_nodeParamType = node.get_index_stats_prettyType;
                if (get_index_stats_nodeParamType === 'str') {
                    get_index_stats_parameters.pretty = get_index_stats_nodeParam || '';
                } else {
                    get_index_stats_parameters.pretty = RED.util.getMessageProperty(msg, get_index_stats_nodeParam);
                }
                get_index_stats_parameters.pretty = !!get_index_stats_parameters.pretty ? get_index_stats_parameters.pretty : msg.payload;
                
                get_index_stats_nodeParam = node.get_index_stats_partition;
                get_index_stats_nodeParamType = node.get_index_stats_partitionType;
                if (get_index_stats_nodeParamType === 'str') {
                    get_index_stats_parameters.partition = get_index_stats_nodeParam || '';
                } else {
                    get_index_stats_parameters.partition = RED.util.getMessageProperty(msg, get_index_stats_nodeParam);
                }
                get_index_stats_parameters.partition = !!get_index_stats_parameters.partition ? get_index_stats_parameters.partition : msg.payload;
                
                get_index_stats_nodeParam = node.get_index_stats_redact;
                get_index_stats_nodeParamType = node.get_index_stats_redactType;
                if (get_index_stats_nodeParamType === 'str') {
                    get_index_stats_parameters.redact = get_index_stats_nodeParam || '';
                } else {
                    get_index_stats_parameters.redact = RED.util.getMessageProperty(msg, get_index_stats_nodeParam);
                }
                get_index_stats_parameters.redact = !!get_index_stats_parameters.redact ? get_index_stats_parameters.redact : msg.payload;
                
                get_index_stats_nodeParam = node.get_index_stats_skipEmpty;
                get_index_stats_nodeParamType = node.get_index_stats_skipEmptyType;
                if (get_index_stats_nodeParamType === 'str') {
                    get_index_stats_parameters.skipEmpty = get_index_stats_nodeParam || '';
                } else {
                    get_index_stats_parameters.skipEmpty = RED.util.getMessageProperty(msg, get_index_stats_nodeParam);
                }
                get_index_stats_parameters.skipEmpty = !!get_index_stats_parameters.skipEmpty ? get_index_stats_parameters.skipEmpty : msg.payload;
                                result = client.get_index_stats(get_index_stats_parameters);
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
                node.status({ fill: 'blue', shape: 'dot', text: 'IndexStatisticsRestApi.status.requesting' });
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

    RED.nodes.registerType('index-statistics-rest-api', IndexStatisticsRestApiNode);
    function IndexStatisticsRestApiServiceNode(n) {
        RED.nodes.createNode(this, n);
        this.host = n.host;

        this.username = n.username;
        this.password = n.password;
    }

    RED.nodes.registerType('index-statistics-rest-api-service', IndexStatisticsRestApiServiceNode, {
        credentials: {
            username: { type: 'text' },
            password: { type: 'password' },
            temp: { type: 'text' }
        }
    });
};
