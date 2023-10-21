/*jshint -W069 */
/**
 * The Admin REST API is a secondary API provided by the Query service.
This API enables you to retrieve statistics about the clusters and nodes running the Query service; view or specify node-level settings; and view or delete requests.

The API schemes and host URLs are as follows:{blank}

* `+http://node:8093/+`
* `+https://node:18093/+` (for secure access)

where [.var]`node` is the host name or IP address of a computer running the Query service.

 * @class AdminRestApi
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var AdminRestApi = (function () {
    'use strict';

    var request = require('request');
    var Q = require('q');
    var fileType = require('file-type');
    // let fileType;
    // import('file-type').then(module => {
    //     fileType = module.default;
    // });

    function AdminRestApi(options) {
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : '';
        if (this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
        this.basic = (typeof options === 'object') ? (options.basic ? options.basic : {}) : {};
    }

    function mergeQueryParams(parameters, queryParameters) {
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function (parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }
        return queryParameters;
    }

    /**
     * HTTP Request
     * @method
     * @name AdminRestApi#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    AdminRestApi.prototype.request = function (method, url, parameters, body, headers, queryParameters, form, deferred) {
        var req = {
            method: method,
            uri: url,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            if (req.headers['Content-Type'] && req.headers['Content-Type'][0] === 'multipart/form-data') {
                delete req.body;
                var keyName = Object.keys(form)[0]
                req.formData = {
                    [keyName]: {
                        value: form[keyName],
                        options: {
                            filename: (fileType(form[keyName]) != null ? `file.${fileType(form[keyName]).ext}` : `file`)
                        }
                    }
                };
            } else {
                req.form = form;
            }
        }
        if (typeof (body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function (error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) { }
                }
                if (response.statusCode === 204) {
                    deferred.resolve({ response: response });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });
    };

    /**
    * Set Basic Auth
    * @method
    * @name AdminRestApi#setBasicAuth
    * @param {string} username
    * @param {string} password
    */
    AdminRestApi.prototype.setBasicAuth = function (username, password) {
        this.basic.username = username;
        this.basic.password = password;
    };
    /**
    * Set Auth headers
    * @method
    * @name AdminRestApi#setAuthHeaders
    * @param {object} headerParams - headers object
    */
    AdminRestApi.prototype.setAuthHeaders = function (headerParams) {
        var headers = headerParams ? headerParams : {};
        if (this.basic.username && this.basic.password) {
            headers['Authorization'] = 'Basic ' + new Buffer(this.basic.username + ':' + this.basic.password).toString("base64");
        }
        return headers;
    };

    /**
     * Returns information about all clusters.
     * @method
     * @name AdminRestApi#get_clusters
     * @param {object} parameters - method options and parameters
     */
    AdminRestApi.prototype.get_clusters = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/clusters';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns information about the specified cluster.
     * @method
     * @name AdminRestApi#get_cluster
     * @param {object} parameters - method options and parameters
         * @param {string} parameters.cluster - The name of a cluster.
     */
    AdminRestApi.prototype.get_cluster = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/clusters/{cluster}';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


        path = path.replace('{cluster}', parameters['cluster']);




        if (parameters['cluster'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: cluster'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns information about all nodes in the specified cluster.
     * @method
     * @name AdminRestApi#get_nodes
     * @param {object} parameters - method options and parameters
         * @param {string} parameters.cluster - The name of a cluster.
     */
    AdminRestApi.prototype.get_nodes = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/clusters/{cluster}/nodes';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


        path = path.replace('{cluster}', parameters['cluster']);




        if (parameters['cluster'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: cluster'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns information about the specified node in the specified cluster.
     * @method
     * @name AdminRestApi#get_node
     * @param {object} parameters - method options and parameters
         * @param {string} parameters.cluster - The name of a cluster.
         * @param {string} parameters.node - The name of a node.
     */
    AdminRestApi.prototype.get_node = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/clusters/{cluster}/nodes/{node}';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


        path = path.replace('{cluster}', parameters['cluster']);




        if (parameters['cluster'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: cluster'));
            return deferred.promise;
        }


        path = path.replace('{node}', parameters['node']);




        if (parameters['node'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: node'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns the configuration of the query service on the cluster.
     * @method
     * @name AdminRestApi#get_config
     * @param {object} parameters - method options and parameters
     */
    AdminRestApi.prototype.get_config = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/config';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns all prepared statements.
    [NOTE]
    ====
    Refer to xref:manage:monitor/monitoring-n1ql-query.adoc#sys-prepared-get[Get Prepared Statements] for examples.
    ====
    
     * @method
     * @name AdminRestApi#get_prepareds
     * @param {object} parameters - method options and parameters
     */
    AdminRestApi.prototype.get_prepareds = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/prepareds';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns the specified prepared statement.
    [NOTE]
    ====
    Refer to xref:manage:monitor/monitoring-n1ql-query.adoc#sys-prepared-get[Get Prepared Statements] for examples.
    ====
    
     * @method
     * @name AdminRestApi#get_prepared
     * @param {object} parameters - method options and parameters
         * @param {string} parameters.name - The name of a prepared statement.
    This may be a UUID that was assigned automatically, or a name that was user-specified when the statement was created.
    
     */
    AdminRestApi.prototype.get_prepared = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/prepareds/{name}';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


        path = path.replace('{name}', parameters['name']);




        if (parameters['name'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Deletes the specified prepared statement.
    [NOTE]
    ====
    Refer to xref:manage:monitor/monitoring-n1ql-query.adoc#sys-prepared-delete[Delete Prepared Statements] for examples.
    ====
    
     * @method
     * @name AdminRestApi#delete_prepared
     * @param {object} parameters - method options and parameters
         * @param {string} parameters.name - The name of a prepared statement.
    This may be a UUID that was assigned automatically, or a name that was user-specified when the statement was created.
    
     */
    AdminRestApi.prototype.delete_prepared = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/prepareds/{name}';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


        path = path.replace('{name}', parameters['name']);




        if (parameters['name'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns all active query requests.
    [NOTE]
    ====
    Refer to xref:manage:monitor/monitoring-n1ql-query.adoc#sys-active-get[Get Active Requests] for examples.
    ====
    
     * @method
     * @name AdminRestApi#get_active_requests
     * @param {object} parameters - method options and parameters
     */
    AdminRestApi.prototype.get_active_requests = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/active_requests';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns the specified active query request.
    [NOTE]
    ====
    Refer to xref:manage:monitor/monitoring-n1ql-query.adoc#sys-active-get[Get Active Requests] for examples.
    ====
    
     * @method
     * @name AdminRestApi#get_active_request
     * @param {object} parameters - method options and parameters
         * @param {string} parameters.request - The name of a request.
    This is the `requestID` that was assigned automatically when the statement was created.
    
     */
    AdminRestApi.prototype.get_active_request = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/active_requests/{request}';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


        path = path.replace('{request}', parameters['request']);




        if (parameters['request'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: request'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Terminates the specified active query request.
    [NOTE]
    ====
    Refer to xref:manage:monitor/monitoring-n1ql-query.adoc#sys-active-delete[Terminate an Active Request] for examples.
    ====
    
     * @method
     * @name AdminRestApi#delete_active_request
     * @param {object} parameters - method options and parameters
         * @param {string} parameters.request - The name of a request.
    This is the `requestID` that was assigned automatically when the statement was created.
    
     */
    AdminRestApi.prototype.delete_active_request = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/active_requests/{request}';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


        path = path.replace('{request}', parameters['request']);




        if (parameters['request'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: request'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns all completed requests.
    [NOTE]
    ====
    Refer to xref:manage:monitor/monitoring-n1ql-query.adoc#sys-completed-get[Get Completed Requests] for examples.
    ====
    
     * @method
     * @name AdminRestApi#get_completed_requests
     * @param {object} parameters - method options and parameters
     */
    AdminRestApi.prototype.get_completed_requests = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/completed_requests';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns the specified completed request.
    [NOTE]
    ====
    Refer to xref:manage:monitor/monitoring-n1ql-query.adoc#sys-completed-get[Get Completed Requests] for examples.
    ====
    
     * @method
     * @name AdminRestApi#get_completed_request
     * @param {object} parameters - method options and parameters
         * @param {string} parameters.request - The name of a request.
    This is the `requestID` that was assigned automatically when the statement was created.
    
     */
    AdminRestApi.prototype.get_completed_request = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/completed_requests/{request}';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


        path = path.replace('{request}', parameters['request']);




        if (parameters['request'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: request'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Purges the specified completed request.
    [NOTE]
    ====
    Refer to xref:manage:monitor/monitoring-n1ql-query.adoc#sys-completed-delete[Purge the Completed Requests] for examples.
    ====
    
     * @method
     * @name AdminRestApi#delete_completed_request
     * @param {object} parameters - method options and parameters
         * @param {string} parameters.request - The name of a request.
    This is the `requestID` that was assigned automatically when the statement was created.
    
     */
    AdminRestApi.prototype.delete_completed_request = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/completed_requests/{request}';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


        path = path.replace('{request}', parameters['request']);




        if (parameters['request'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: request'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns all prepared index statements.
    [TIP]
    ====
    * Use <<_get_prepared>> to get information about a prepared index statement.
    * Use <<_delete_prepared>> to delete a prepared index statement.
    ====
    
     * @method
     * @name AdminRestApi#get_prepared_indexes
     * @param {object} parameters - method options and parameters
     */
    AdminRestApi.prototype.get_prepared_indexes = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/indexes/prepareds';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns all active index requests.
    [TIP]
    ====
    * Use <<_get_active_request>> to get information about an active index request.
    * Use <<_delete_active_request>> to terminate an active index request.
    ====
    
     * @method
     * @name AdminRestApi#get_active_indexes
     * @param {object} parameters - method options and parameters
     */
    AdminRestApi.prototype.get_active_indexes = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/indexes/active_requests';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns all completed index requests.
    [TIP]
    ====
    * Use <<_get_completed_request>> to get information about a completed index request.
    * Use <<_delete_completed_request>> to purge a completed index request.
    ====
    
     * @method
     * @name AdminRestApi#get_completed_indexes
     * @param {object} parameters - method options and parameters
     */
    AdminRestApi.prototype.get_completed_indexes = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/indexes/completed_requests';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns a minimal response, indicating that the service is running and reachable.
     * @method
     * @name AdminRestApi#get_ping
     * @param {object} parameters - method options and parameters
     */
    AdminRestApi.prototype.get_ping = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/ping';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns data about the running state and health of the query engine.
    This information can be very useful to assess the current workload and performance characteristics of a query engine, and hence load-balance the requests being sent to various query engines.
    [NOTE]
    ====
    Refer to xref:manage:monitor/monitoring-n1ql-query.adoc#vitals[Get System Vitals] for examples.
    ====
    
     * @method
     * @name AdminRestApi#get_vitals
     * @param {object} parameters - method options and parameters
     */
    AdminRestApi.prototype.get_vitals = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/vitals';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns all statistics.
     * @method
     * @name AdminRestApi#get_stats
     * @param {object} parameters - method options and parameters
     */
    AdminRestApi.prototype.get_stats = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/stats';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns the specified statistic.
     * @method
     * @name AdminRestApi#get_stat
     * @param {object} parameters - method options and parameters
         * @param {string} parameters.stat - The name of a statistic.
    Only top-level statistic names can be used.
    You cannot specify a metric.
    
     */
    AdminRestApi.prototype.get_stat = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/stats/{stat}';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


        path = path.replace('{stat}', parameters['stat']);




        if (parameters['stat'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: stat'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Currently unused.
     * @method
     * @name AdminRestApi#get_debug_vars
     * @param {object} parameters - method options and parameters
     */
    AdminRestApi.prototype.get_debug_vars = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/debug/vars';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Returns node-level query settings.
    [NOTE]
    ====
    Refer to xref:settings:query-settings.adoc[Query Settings] for more information.
    ====
    
     * @method
     * @name AdminRestApi#get_settings
     * @param {object} parameters - method options and parameters
     */
    AdminRestApi.prototype.get_settings = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/settings';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };
    /**
     * Updates node-level query settings.
    [NOTE]
    ====
    Refer to xref:settings:query-settings.adoc[Query Settings] for more information.
    ====
    
     * @method
     * @name AdminRestApi#post_settings
     * @param {object} parameters - method options and parameters
         * @param {} parameters.settings - An object specifying node-level query settings.
     */
    AdminRestApi.prototype.post_settings = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/admin/settings';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];




        if (parameters['settings'] !== undefined) {
            body = parameters['settings'];
        }



        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };

    return AdminRestApi;
})();

exports.AdminRestApi = AdminRestApi;
