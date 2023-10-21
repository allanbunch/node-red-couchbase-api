'use strict';
var lib = require('./lib.js');

module.exports = function (RED) {
    function AdminRestApiNode(config) {
        RED.nodes.createNode(this, config);
        this.service = RED.nodes.getNode(config.service);
        this.method = config.method;
        this.get_cluster_cluster = config.get_cluster_cluster;
        this.get_cluster_clusterType = config.get_cluster_clusterType || 'str';
        this.get_nodes_cluster = config.get_nodes_cluster;
        this.get_nodes_clusterType = config.get_nodes_clusterType || 'str';
        this.get_node_cluster = config.get_node_cluster;
        this.get_node_clusterType = config.get_node_clusterType || 'str';
        this.get_node_node = config.get_node_node;
        this.get_node_nodeType = config.get_node_nodeType || 'str';
        this.get_prepared_name = config.get_prepared_name;
        this.get_prepared_nameType = config.get_prepared_nameType || 'str';
        this.delete_prepared_name = config.delete_prepared_name;
        this.delete_prepared_nameType = config.delete_prepared_nameType || 'str';
        this.get_active_request_request = config.get_active_request_request;
        this.get_active_request_requestType = config.get_active_request_requestType || 'str';
        this.delete_active_request_request = config.delete_active_request_request;
        this.delete_active_request_requestType = config.delete_active_request_requestType || 'str';
        this.get_completed_request_request = config.get_completed_request_request;
        this.get_completed_request_requestType = config.get_completed_request_requestType || 'str';
        this.delete_completed_request_request = config.delete_completed_request_request;
        this.delete_completed_request_requestType = config.delete_completed_request_requestType || 'str';
        this.get_stat_stat = config.get_stat_stat;
        this.get_stat_statType = config.get_stat_statType || 'str';
        this.post_settings_settings = config.post_settings_settings;
        this.post_settings_settingsType = config.post_settings_settingsType || 'str';
        var node = this;

        node.on('input', function (msg) {
            var errorFlag = false;
            var client;
            if (this.service && this.service.host) {
                client = new lib.AdminRestApi({ domain: this.service.host });
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
            if (!errorFlag && node.method === 'get_clusters') {
                var get_clusters_parameters = [];
                var get_clusters_nodeParam;
                var get_clusters_nodeParamType;
                result = client.get_clusters(get_clusters_parameters);
            }
            if (!errorFlag && node.method === 'get_cluster') {
                var get_cluster_parameters = [];
                var get_cluster_nodeParam;
                var get_cluster_nodeParamType;

                get_cluster_nodeParam = node.get_cluster_cluster;
                get_cluster_nodeParamType = node.get_cluster_clusterType;
                if (get_cluster_nodeParamType === 'str') {
                    get_cluster_parameters.cluster = get_cluster_nodeParam || '';
                } else {
                    get_cluster_parameters.cluster = RED.util.getMessageProperty(msg, get_cluster_nodeParam);
                }
                get_cluster_parameters.cluster = !!get_cluster_parameters.cluster ? get_cluster_parameters.cluster : '';
                result = client.get_cluster(get_cluster_parameters);
            }
            if (!errorFlag && node.method === 'get_nodes') {
                var get_nodes_parameters = [];
                var get_nodes_nodeParam;
                var get_nodes_nodeParamType;

                get_nodes_nodeParam = node.get_nodes_cluster;
                get_nodes_nodeParamType = node.get_nodes_clusterType;
                if (get_nodes_nodeParamType === 'str') {
                    get_nodes_parameters.cluster = get_nodes_nodeParam || '';
                } else {
                    get_nodes_parameters.cluster = RED.util.getMessageProperty(msg, get_nodes_nodeParam);
                }
                get_nodes_parameters.cluster = !!get_nodes_parameters.cluster ? get_nodes_parameters.cluster : '';
                result = client.get_nodes(get_nodes_parameters);
            }
            if (!errorFlag && node.method === 'get_node') {
                var get_node_parameters = [];
                var get_node_nodeParam;
                var get_node_nodeParamType;

                get_node_nodeParam = node.get_node_cluster;
                get_node_nodeParamType = node.get_node_clusterType;
                if (get_node_nodeParamType === 'str') {
                    get_node_parameters.cluster = get_node_nodeParam || '';
                } else {
                    get_node_parameters.cluster = RED.util.getMessageProperty(msg, get_node_nodeParam);
                }
                get_node_parameters.cluster = !!get_node_parameters.cluster ? get_node_parameters.cluster : '';

                get_node_nodeParam = node.get_node_node;
                get_node_nodeParamType = node.get_node_nodeType;
                if (get_node_nodeParamType === 'str') {
                    get_node_parameters.node = get_node_nodeParam || '';
                } else {
                    get_node_parameters.node = RED.util.getMessageProperty(msg, get_node_nodeParam);
                }
                get_node_parameters.node = !!get_node_parameters.node ? get_node_parameters.node : '';
                result = client.get_node(get_node_parameters);
            }
            if (!errorFlag && node.method === 'get_config') {
                var get_config_parameters = [];
                var get_config_nodeParam;
                var get_config_nodeParamType;
                result = client.get_config(get_config_parameters);
            }
            if (!errorFlag && node.method === 'get_prepareds') {
                var get_prepareds_parameters = [];
                var get_prepareds_nodeParam;
                var get_prepareds_nodeParamType;
                result = client.get_prepareds(get_prepareds_parameters);
            }
            if (!errorFlag && node.method === 'get_prepared') {
                var get_prepared_parameters = [];
                var get_prepared_nodeParam;
                var get_prepared_nodeParamType;

                get_prepared_nodeParam = node.get_prepared_name;
                get_prepared_nodeParamType = node.get_prepared_nameType;
                if (get_prepared_nodeParamType === 'str') {
                    get_prepared_parameters.name = get_prepared_nodeParam || '';
                } else {
                    get_prepared_parameters.name = RED.util.getMessageProperty(msg, get_prepared_nodeParam);
                }
                get_prepared_parameters.name = !!get_prepared_parameters.name ? get_prepared_parameters.name : '';
                result = client.get_prepared(get_prepared_parameters);
            }
            if (!errorFlag && node.method === 'delete_prepared') {
                var delete_prepared_parameters = [];
                var delete_prepared_nodeParam;
                var delete_prepared_nodeParamType;

                delete_prepared_nodeParam = node.delete_prepared_name;
                delete_prepared_nodeParamType = node.delete_prepared_nameType;
                if (delete_prepared_nodeParamType === 'str') {
                    delete_prepared_parameters.name = delete_prepared_nodeParam || '';
                } else {
                    delete_prepared_parameters.name = RED.util.getMessageProperty(msg, delete_prepared_nodeParam);
                }
                delete_prepared_parameters.name = !!delete_prepared_parameters.name ? delete_prepared_parameters.name : '';
                result = client.delete_prepared(delete_prepared_parameters);
            }
            if (!errorFlag && node.method === 'get_active_requests') {
                var get_active_requests_parameters = [];
                var get_active_requests_nodeParam;
                var get_active_requests_nodeParamType;
                result = client.get_active_requests(get_active_requests_parameters);
            }
            if (!errorFlag && node.method === 'get_active_request') {
                var get_active_request_parameters = [];
                var get_active_request_nodeParam;
                var get_active_request_nodeParamType;

                get_active_request_nodeParam = node.get_active_request_request;
                get_active_request_nodeParamType = node.get_active_request_requestType;
                if (get_active_request_nodeParamType === 'str') {
                    get_active_request_parameters.request = get_active_request_nodeParam || '';
                } else {
                    get_active_request_parameters.request = RED.util.getMessageProperty(msg, get_active_request_nodeParam);
                }
                get_active_request_parameters.request = !!get_active_request_parameters.request ? get_active_request_parameters.request : '';
                result = client.get_active_request(get_active_request_parameters);
            }
            if (!errorFlag && node.method === 'delete_active_request') {
                var delete_active_request_parameters = [];
                var delete_active_request_nodeParam;
                var delete_active_request_nodeParamType;

                delete_active_request_nodeParam = node.delete_active_request_request;
                delete_active_request_nodeParamType = node.delete_active_request_requestType;
                if (delete_active_request_nodeParamType === 'str') {
                    delete_active_request_parameters.request = delete_active_request_nodeParam || '';
                } else {
                    delete_active_request_parameters.request = RED.util.getMessageProperty(msg, delete_active_request_nodeParam);
                }
                delete_active_request_parameters.request = !!delete_active_request_parameters.request ? delete_active_request_parameters.request : '';
                result = client.delete_active_request(delete_active_request_parameters);
            }
            if (!errorFlag && node.method === 'get_completed_requests') {
                var get_completed_requests_parameters = [];
                var get_completed_requests_nodeParam;
                var get_completed_requests_nodeParamType;
                result = client.get_completed_requests(get_completed_requests_parameters);
            }
            if (!errorFlag && node.method === 'get_completed_request') {
                var get_completed_request_parameters = [];
                var get_completed_request_nodeParam;
                var get_completed_request_nodeParamType;

                get_completed_request_nodeParam = node.get_completed_request_request;
                get_completed_request_nodeParamType = node.get_completed_request_requestType;
                if (get_completed_request_nodeParamType === 'str') {
                    get_completed_request_parameters.request = get_completed_request_nodeParam || '';
                } else {
                    get_completed_request_parameters.request = RED.util.getMessageProperty(msg, get_completed_request_nodeParam);
                }
                get_completed_request_parameters.request = !!get_completed_request_parameters.request ? get_completed_request_parameters.request : '';
                result = client.get_completed_request(get_completed_request_parameters);
            }
            if (!errorFlag && node.method === 'delete_completed_request') {
                var delete_completed_request_parameters = [];
                var delete_completed_request_nodeParam;
                var delete_completed_request_nodeParamType;

                delete_completed_request_nodeParam = node.delete_completed_request_request;
                delete_completed_request_nodeParamType = node.delete_completed_request_requestType;
                if (delete_completed_request_nodeParamType === 'str') {
                    delete_completed_request_parameters.request = delete_completed_request_nodeParam || '';
                } else {
                    delete_completed_request_parameters.request = RED.util.getMessageProperty(msg, delete_completed_request_nodeParam);
                }
                delete_completed_request_parameters.request = !!delete_completed_request_parameters.request ? delete_completed_request_parameters.request : '';
                result = client.delete_completed_request(delete_completed_request_parameters);
            }
            if (!errorFlag && node.method === 'get_prepared_indexes') {
                var get_prepared_indexes_parameters = [];
                var get_prepared_indexes_nodeParam;
                var get_prepared_indexes_nodeParamType;
                result = client.get_prepared_indexes(get_prepared_indexes_parameters);
            }
            if (!errorFlag && node.method === 'get_active_indexes') {
                var get_active_indexes_parameters = [];
                var get_active_indexes_nodeParam;
                var get_active_indexes_nodeParamType;
                result = client.get_active_indexes(get_active_indexes_parameters);
            }
            if (!errorFlag && node.method === 'get_completed_indexes') {
                var get_completed_indexes_parameters = [];
                var get_completed_indexes_nodeParam;
                var get_completed_indexes_nodeParamType;
                result = client.get_completed_indexes(get_completed_indexes_parameters);
            }
            if (!errorFlag && node.method === 'get_ping') {
                var get_ping_parameters = [];
                var get_ping_nodeParam;
                var get_ping_nodeParamType;
                result = client.get_ping(get_ping_parameters);
            }
            if (!errorFlag && node.method === 'get_vitals') {
                var get_vitals_parameters = [];
                var get_vitals_nodeParam;
                var get_vitals_nodeParamType;
                result = client.get_vitals(get_vitals_parameters);
            }
            if (!errorFlag && node.method === 'get_stats') {
                var get_stats_parameters = [];
                var get_stats_nodeParam;
                var get_stats_nodeParamType;
                result = client.get_stats(get_stats_parameters);
            }
            if (!errorFlag && node.method === 'get_stat') {
                var get_stat_parameters = [];
                var get_stat_nodeParam;
                var get_stat_nodeParamType;

                get_stat_nodeParam = node.get_stat_stat;
                get_stat_nodeParamType = node.get_stat_statType;
                if (get_stat_nodeParamType === 'str') {
                    get_stat_parameters.stat = get_stat_nodeParam || '';
                } else {
                    get_stat_parameters.stat = RED.util.getMessageProperty(msg, get_stat_nodeParam);
                }
                get_stat_parameters.stat = !!get_stat_parameters.stat ? get_stat_parameters.stat : 'active_requests';
                result = client.get_stat(get_stat_parameters);
            }
            if (!errorFlag && node.method === 'get_debug_vars') {
                var get_debug_vars_parameters = [];
                var get_debug_vars_nodeParam;
                var get_debug_vars_nodeParamType;
                result = client.get_debug_vars(get_debug_vars_parameters);
            }
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

                post_settings_nodeParam = node.post_settings_settings;
                post_settings_nodeParamType = node.post_settings_settingsType;
                if (post_settings_nodeParamType === 'str') {
                    post_settings_parameters.settings = post_settings_nodeParam || '';
                } else {
                    post_settings_parameters.settings = RED.util.getMessageProperty(msg, post_settings_nodeParam);
                }
                post_settings_parameters.settings = !!post_settings_parameters.settings ? post_settings_parameters.settings : '';
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
                node.status({ fill: 'blue', shape: 'dot', text: 'AdminRestApi.status.requesting' });
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

    RED.nodes.registerType('admin-rest-api', AdminRestApiNode);
    function AdminRestApiServiceNode(n) {
        RED.nodes.createNode(this, n);
        this.host = n.host;

        this.username = n.username;
        this.password = n.password;
    }

    RED.nodes.registerType('admin-rest-api-service', AdminRestApiServiceNode, {
        credentials: {
            username: { type: 'text' },
            password: { type: 'password' },
            temp: { type: 'text' }
        }
    });
};
