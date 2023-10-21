'use strict';
var lib = require('./lib.js');

module.exports = function (RED) {
    function AnalyticsLibraryRestApiNode(config) {
        RED.nodes.createNode(this, config);
        this.service = RED.nodes.getNode(config.service);
        this.method = config.method;
        this.post_library_data = config.post_library_data;
        this.post_library_dataType = config.post_library_dataType || 'str';
        this.post_library_type = config.post_library_type;
        this.post_library_typeType = config.post_library_typeType || 'str';
        this.post_library_library = config.post_library_library;
        this.post_library_libraryType = config.post_library_libraryType || 'str';
        this.post_library_scope = config.post_library_scope;
        this.post_library_scopeType = config.post_library_scopeType || 'str';
        this.delete_library_library = config.delete_library_library;
        this.delete_library_libraryType = config.delete_library_libraryType || 'str';
        this.delete_library_scope = config.delete_library_scope;
        this.delete_library_scopeType = config.delete_library_scopeType || 'str';
        var node = this;

        node.on('input', function (msg) {
            var errorFlag = false;
            var client;
            if (this.service && this.service.host) {
                client = new lib.AnalyticsLibraryRestApi({ domain: this.service.host });
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
            if (!errorFlag && node.method === 'get_collection') {
                var get_collection_parameters = [];
                var get_collection_nodeParam;
                var get_collection_nodeParamType;
                result = client.get_collection(get_collection_parameters);
            }
            if (!errorFlag && node.method === 'post_library') {
                var post_library_parameters = [];
                var post_library_nodeParam;
                var post_library_nodeParamType;

                post_library_nodeParam = node.post_library_data;
                post_library_nodeParamType = node.post_library_dataType;
                if (post_library_nodeParamType === 'str') {
                    post_library_parameters.data = post_library_nodeParam || '';
                } else {
                    post_library_parameters.data = RED.util.getMessageProperty(msg, post_library_nodeParam);
                }
                post_library_parameters.data = !!post_library_parameters.data ? post_library_parameters.data : msg.payload;
                
                post_library_nodeParam = node.post_library_type;
                post_library_nodeParamType = node.post_library_typeType;
                if (post_library_nodeParamType === 'str') {
                    post_library_parameters.type = post_library_nodeParam || '';
                } else {
                    post_library_parameters.type = RED.util.getMessageProperty(msg, post_library_nodeParam);
                }
                post_library_parameters.type = !!post_library_parameters.type ? post_library_parameters.type : msg.payload;
                
                post_library_nodeParam = node.post_library_library;
                post_library_nodeParamType = node.post_library_libraryType;
                if (post_library_nodeParamType === 'str') {
                    post_library_parameters.library = post_library_nodeParam || '';
                } else {
                    post_library_parameters.library = RED.util.getMessageProperty(msg, post_library_nodeParam);
                }
                post_library_parameters.library = !!post_library_parameters.library ? post_library_parameters.library : msg.payload;
                
                post_library_nodeParam = node.post_library_scope;
                post_library_nodeParamType = node.post_library_scopeType;
                if (post_library_nodeParamType === 'str') {
                    post_library_parameters.scope = post_library_nodeParam || '';
                } else {
                    post_library_parameters.scope = RED.util.getMessageProperty(msg, post_library_nodeParam);
                }
                post_library_parameters.scope = !!post_library_parameters.scope ? post_library_parameters.scope : msg.payload;
                                result = client.post_library(post_library_parameters);
            }
            if (!errorFlag && node.method === 'delete_library') {
                var delete_library_parameters = [];
                var delete_library_nodeParam;
                var delete_library_nodeParamType;

                delete_library_nodeParam = node.delete_library_library;
                delete_library_nodeParamType = node.delete_library_libraryType;
                if (delete_library_nodeParamType === 'str') {
                    delete_library_parameters.library = delete_library_nodeParam || '';
                } else {
                    delete_library_parameters.library = RED.util.getMessageProperty(msg, delete_library_nodeParam);
                }
                delete_library_parameters.library = !!delete_library_parameters.library ? delete_library_parameters.library : msg.payload;
                
                delete_library_nodeParam = node.delete_library_scope;
                delete_library_nodeParamType = node.delete_library_scopeType;
                if (delete_library_nodeParamType === 'str') {
                    delete_library_parameters.scope = delete_library_nodeParam || '';
                } else {
                    delete_library_parameters.scope = RED.util.getMessageProperty(msg, delete_library_nodeParam);
                }
                delete_library_parameters.scope = !!delete_library_parameters.scope ? delete_library_parameters.scope : msg.payload;
                                result = client.delete_library(delete_library_parameters);
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
                node.status({ fill: 'blue', shape: 'dot', text: 'AnalyticsLibraryRestApi.status.requesting' });
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

    RED.nodes.registerType('analytics-library-rest-api', AnalyticsLibraryRestApiNode);
    function AnalyticsLibraryRestApiServiceNode(n) {
        RED.nodes.createNode(this, n);
        this.host = n.host;

        this.username = n.username;
        this.password = n.password;
    }

    RED.nodes.registerType('analytics-library-rest-api-service', AnalyticsLibraryRestApiServiceNode, {
        credentials: {
            username: { type: 'text' },
            password: { type: 'password' },
            temp: { type: 'text' }
        }
    });
};
