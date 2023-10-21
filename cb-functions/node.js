'use strict';
var lib = require('./lib.js');

module.exports = function (RED) {
    function FunctionsRestApiNode(config) {
        RED.nodes.createNode(this, config);
        this.service = RED.nodes.getNode(config.service);
        this.method = config.method;
        this.get_collection_bucket = config.get_collection_bucket;
        this.get_collection_bucketType = config.get_collection_bucketType || 'str';
        this.get_collection_scope = config.get_collection_scope;
        this.get_collection_scopeType = config.get_collection_scopeType || 'str';
        this.get_library_library = config.get_library_library;
        this.get_library_libraryType = config.get_library_libraryType || 'str';
        this.get_library_bucket = config.get_library_bucket;
        this.get_library_bucketType = config.get_library_bucketType || 'str';
        this.get_library_scope = config.get_library_scope;
        this.get_library_scopeType = config.get_library_scopeType || 'str';
        this.post_library_functions = config.post_library_functions;
        this.post_library_functionsType = config.post_library_functionsType || 'str';
        this.post_library_library = config.post_library_library;
        this.post_library_libraryType = config.post_library_libraryType || 'str';
        this.post_library_bucket = config.post_library_bucket;
        this.post_library_bucketType = config.post_library_bucketType || 'str';
        this.post_library_scope = config.post_library_scope;
        this.post_library_scopeType = config.post_library_scopeType || 'str';
        this.delete_library_library = config.delete_library_library;
        this.delete_library_libraryType = config.delete_library_libraryType || 'str';
        this.delete_library_bucket = config.delete_library_bucket;
        this.delete_library_bucketType = config.delete_library_bucketType || 'str';
        this.delete_library_scope = config.delete_library_scope;
        this.delete_library_scopeType = config.delete_library_scopeType || 'str';
        var node = this;

        node.on('input', function (msg) {
            var errorFlag = false;
            var client;
            if (this.service && this.service.host) {
                client = new lib.FunctionsRestApi({ domain: this.service.host });
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

                get_collection_nodeParam = node.get_collection_bucket;
                get_collection_nodeParamType = node.get_collection_bucketType;
                if (get_collection_nodeParamType === 'str') {
                    get_collection_parameters.bucket = get_collection_nodeParam || '';
                } else {
                    get_collection_parameters.bucket = RED.util.getMessageProperty(msg, get_collection_nodeParam);
                }
                get_collection_parameters.bucket = !!get_collection_parameters.bucket ? get_collection_parameters.bucket : msg.payload;
                
                get_collection_nodeParam = node.get_collection_scope;
                get_collection_nodeParamType = node.get_collection_scopeType;
                if (get_collection_nodeParamType === 'str') {
                    get_collection_parameters.scope = get_collection_nodeParam || '';
                } else {
                    get_collection_parameters.scope = RED.util.getMessageProperty(msg, get_collection_nodeParam);
                }
                get_collection_parameters.scope = !!get_collection_parameters.scope ? get_collection_parameters.scope : msg.payload;
                                result = client.get_collection(get_collection_parameters);
            }
            if (!errorFlag && node.method === 'get_library') {
                var get_library_parameters = [];
                var get_library_nodeParam;
                var get_library_nodeParamType;

                get_library_nodeParam = node.get_library_library;
                get_library_nodeParamType = node.get_library_libraryType;
                if (get_library_nodeParamType === 'str') {
                    get_library_parameters.library = get_library_nodeParam || '';
                } else {
                    get_library_parameters.library = RED.util.getMessageProperty(msg, get_library_nodeParam);
                }
                get_library_parameters.library = !!get_library_parameters.library ? get_library_parameters.library : msg.payload;
                
                get_library_nodeParam = node.get_library_bucket;
                get_library_nodeParamType = node.get_library_bucketType;
                if (get_library_nodeParamType === 'str') {
                    get_library_parameters.bucket = get_library_nodeParam || '';
                } else {
                    get_library_parameters.bucket = RED.util.getMessageProperty(msg, get_library_nodeParam);
                }
                get_library_parameters.bucket = !!get_library_parameters.bucket ? get_library_parameters.bucket : msg.payload;
                
                get_library_nodeParam = node.get_library_scope;
                get_library_nodeParamType = node.get_library_scopeType;
                if (get_library_nodeParamType === 'str') {
                    get_library_parameters.scope = get_library_nodeParam || '';
                } else {
                    get_library_parameters.scope = RED.util.getMessageProperty(msg, get_library_nodeParam);
                }
                get_library_parameters.scope = !!get_library_parameters.scope ? get_library_parameters.scope : msg.payload;
                                result = client.get_library(get_library_parameters);
            }
            if (!errorFlag && node.method === 'post_library') {
                var post_library_parameters = [];
                var post_library_nodeParam;
                var post_library_nodeParamType;

                post_library_nodeParam = node.post_library_functions;
                post_library_nodeParamType = node.post_library_functionsType;
                if (post_library_nodeParamType === 'str') {
                    post_library_parameters.functions = post_library_nodeParam || '';
                } else {
                    post_library_parameters.functions = RED.util.getMessageProperty(msg, post_library_nodeParam);
                }
                post_library_parameters.functions = !!post_library_parameters.functions ? post_library_parameters.functions : msg.payload;
                
                post_library_nodeParam = node.post_library_library;
                post_library_nodeParamType = node.post_library_libraryType;
                if (post_library_nodeParamType === 'str') {
                    post_library_parameters.library = post_library_nodeParam || '';
                } else {
                    post_library_parameters.library = RED.util.getMessageProperty(msg, post_library_nodeParam);
                }
                post_library_parameters.library = !!post_library_parameters.library ? post_library_parameters.library : msg.payload;
                
                post_library_nodeParam = node.post_library_bucket;
                post_library_nodeParamType = node.post_library_bucketType;
                if (post_library_nodeParamType === 'str') {
                    post_library_parameters.bucket = post_library_nodeParam || '';
                } else {
                    post_library_parameters.bucket = RED.util.getMessageProperty(msg, post_library_nodeParam);
                }
                post_library_parameters.bucket = !!post_library_parameters.bucket ? post_library_parameters.bucket : msg.payload;
                
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
                
                delete_library_nodeParam = node.delete_library_bucket;
                delete_library_nodeParamType = node.delete_library_bucketType;
                if (delete_library_nodeParamType === 'str') {
                    delete_library_parameters.bucket = delete_library_nodeParam || '';
                } else {
                    delete_library_parameters.bucket = RED.util.getMessageProperty(msg, delete_library_nodeParam);
                }
                delete_library_parameters.bucket = !!delete_library_parameters.bucket ? delete_library_parameters.bucket : msg.payload;
                
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
                node.status({ fill: 'blue', shape: 'dot', text: 'FunctionsRestApi.status.requesting' });
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

    RED.nodes.registerType('functions-rest-api', FunctionsRestApiNode);
    function FunctionsRestApiServiceNode(n) {
        RED.nodes.createNode(this, n);
        this.host = n.host;

        this.username = n.username;
        this.password = n.password;
    }

    RED.nodes.registerType('functions-rest-api-service', FunctionsRestApiServiceNode, {
        credentials: {
            username: { type: 'text' },
            password: { type: 'password' },
            temp: { type: 'text' }
        }
    });
};
