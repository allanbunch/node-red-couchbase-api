/*jshint -W069 */
/**
 * The Analytics Administration REST APIs are provided by the Analytics service.
These APIs enables you to manage and monitor the Analytics service.

The API schemes and host URLs are as follows:

* `http://node:8095/`
* `https://node:18095/` (for secure access)

where `node` is the host name or IP address of a node running the Analytics service.

 * @class AnalyticsAdministrationRestApis
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var AnalyticsAdministrationRestApis = (function(){
    'use strict';

    var request = require('request');
    var Q = require('q');
    var fileType = require('file-type');

    function AnalyticsAdministrationRestApis(options){
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : '';
        if(this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
                this.basic = (typeof options === 'object') ? (options.basic ? options.basic : {}) : {};
    }

    function mergeQueryParams(parameters, queryParameters) {
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                  .forEach(function(parameterName) {
                      var parameter = parameters.$queryParameters[parameterName];
                      queryParameters[parameterName] = parameter;
            });
        }
        return queryParameters;
    }

    /**
     * HTTP Request
     * @method
     * @name AnalyticsAdministrationRestApis#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    AnalyticsAdministrationRestApis.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred){
        var req = {
            method: method,
            uri: url,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if(Object.keys(form).length > 0) {
            if (req.headers['Content-Type'] && req.headers['Content-Type'][0] === 'multipart/form-data') {
                delete req.body;
                var keyName = Object.keys(form)[0]
                req.formData = {
                    [keyName]: {
                        value: form[keyName],
                        options: {
                            filename: (fileType(form[keyName]) != null ? `file.${ fileType(form[keyName]).ext }` : `file` )
                        }
                    }
                };
            } else {
                req.form = form;
            }
        }
        if(typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body){
            if(error) {
                deferred.reject(error);
            } else {
                if(/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch(e) {}
                }
                if(response.statusCode === 204) {
                    deferred.resolve({ response: response });
                } else if(response.statusCode >= 200 && response.statusCode <= 299) {
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
            * @name AnalyticsAdministrationRestApis#setBasicAuth
            * @param {string} username
            * @param {string} password
            */
            AnalyticsAdministrationRestApis.prototype.setBasicAuth = function (username, password) {
                this.basic.username = username;
                this.basic.password = password;
            };
        /**
        * Set Auth headers
        * @method
        * @name AnalyticsAdministrationRestApis#setAuthHeaders
        * @param {object} headerParams - headers object
        */
        AnalyticsAdministrationRestApis.prototype.setAuthHeaders = function (headerParams) {
            var headers = headerParams ? headerParams : {};
            if (this.basic.username && this.basic.password) {
                headers['Authorization'] = 'Basic ' + new Buffer(this.basic.username + ':' + this.basic.password).toString("base64");
            }
            return headers;
        };

/**
 * Cancels an active request.
 * @method
 * @name AnalyticsAdministrationRestApis#cancel_request
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.clientContextId - Identifier passed by the client that is used to identify an active request to be cancelled.
 */
 AnalyticsAdministrationRestApis.prototype.cancel_request = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/analytics/admin/active_requests';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
        

                if(parameters['clientContextId'] !== undefined){
                    form['client_context_id'] = parameters['clientContextId'];
                }

        if(parameters['clientContextId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientContextId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Shows various details about the current status of the Analytics Service, such as the service state, the state of each node partition, and the replicas of each partition.
 * @method
 * @name AnalyticsAdministrationRestApis#cluster_status
 * @param {object} parameters - method options and parameters
 */
 AnalyticsAdministrationRestApis.prototype.cluster_status = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/analytics/cluster';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Restarts all Analytics Service nodes in the cluster.
 * @method
 * @name AnalyticsAdministrationRestApis#restart_cluster
 * @param {object} parameters - method options and parameters
 */
 AnalyticsAdministrationRestApis.prototype.restart_cluster = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/analytics/cluster/restart';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Restarts the specified Analytics Service node.
 * @method
 * @name AnalyticsAdministrationRestApis#restart_node
 * @param {object} parameters - method options and parameters
 */
 AnalyticsAdministrationRestApis.prototype.restart_node = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/analytics/node/restart';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Shows the progress of ingestion by the Analytics service, for each Analytics collection.
 * @method
 * @name AnalyticsAdministrationRestApis#ingestion_status
 * @param {object} parameters - method options and parameters
 */
 AnalyticsAdministrationRestApis.prototype.ingestion_status = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/analytics/status/ingestion';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Shows the number of mutations in the DCP queue that have not yet been ingested by the Analytics service, for each Analytics collection.

NOTE: This endpoint may not return meaningful results in Couchbase Server 7.0 and later. The reported number of mutations may be different to the actual number of mutations in the Analytics collection. For this reason, this endpoint has been deprecated, and you should use the [Ingestion Status](#ingestion-status) endpoint instead.

 * @method
 * @name AnalyticsAdministrationRestApis#monitor_node
 * @param {object} parameters - method options and parameters
 */
 AnalyticsAdministrationRestApis.prototype.monitor_node = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/analytics/node/agg/stats/remaining';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };

    return AnalyticsAdministrationRestApis;
})();

exports.AnalyticsAdministrationRestApis = AnalyticsAdministrationRestApis;
