/*jshint -W069 */
/**
 * The Analytics Configuration REST API is provided by the Analytics service.
This API enables you to configure Analytics nodes and clusters.

The API schemes and host URLs are as follows:

* `http://node:8095/`
* `https://node:18095/` (for secure access)

where `node` is the host name or IP address of a node running the Analytics service.

 * @class AnalyticsConfigurationRestApi
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var AnalyticsConfigurationRestApi = (function(){
    'use strict';

    var request = require('request');
    var Q = require('q');
    var fileType = require('file-type');

    function AnalyticsConfigurationRestApi(options){
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
     * @name AnalyticsConfigurationRestApi#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    AnalyticsConfigurationRestApi.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred){
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
            * @name AnalyticsConfigurationRestApi#setBasicAuth
            * @param {string} username
            * @param {string} password
            */
            AnalyticsConfigurationRestApi.prototype.setBasicAuth = function (username, password) {
                this.basic.username = username;
                this.basic.password = password;
            };
        /**
        * Set Auth headers
        * @method
        * @name AnalyticsConfigurationRestApi#setAuthHeaders
        * @param {object} headerParams - headers object
        */
        AnalyticsConfigurationRestApi.prototype.setAuthHeaders = function (headerParams) {
            var headers = headerParams ? headerParams : {};
            if (this.basic.username && this.basic.password) {
                headers['Authorization'] = 'Basic ' + new Buffer(this.basic.username + ':' + this.basic.password).toString("base64");
            }
            return headers;
        };

/**
 * Views service-level parameters, which apply to all nodes running the Analytics service.
 * @method
 * @name AnalyticsConfigurationRestApi#get_service
 * @param {object} parameters - method options and parameters
 */
 AnalyticsConfigurationRestApi.prototype.get_service = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/analytics/config/service';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Modifies service-level parameters, which apply to all nodes running the Analytics service.

IMPORTANT: For the configuration changes to take effect,
you must restart the Analytics cluster using the [Cluster Restart API](rest-admin.html#cluster-restart).

 * @method
 * @name AnalyticsConfigurationRestApi#put_service
 * @param {object} parameters - method options and parameters
     * @param {} parameters.service - An object specifying one or more of the configurable service-level parameters.
 */
 AnalyticsConfigurationRestApi.prototype.put_service = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/analytics/config/service';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['service'] !== undefined){
                body = parameters['service'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Views node-specific parameters, which apply to the node receiving the request.
 * @method
 * @name AnalyticsConfigurationRestApi#get_node
 * @param {object} parameters - method options and parameters
 */
 AnalyticsConfigurationRestApi.prototype.get_node = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/analytics/config/node';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Views node-specific parameters, which apply to the node receiving the request.

IMPORTANT: For the configuration changes to take effect,
you must restart the node using the [Node Restart API](rest-admin.html#node-restart),
or restart the Analytics cluster using the [Cluster Restart API](rest-admin.html#cluster-restart).

 * @method
 * @name AnalyticsConfigurationRestApi#put_node
 * @param {object} parameters - method options and parameters
     * @param {} parameters.node - An object specifying one or more of the configurable node-level parameters on this node.
 */
 AnalyticsConfigurationRestApi.prototype.put_node = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/analytics/config/node';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['node'] !== undefined){
                body = parameters['node'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };

    return AnalyticsConfigurationRestApi;
})();

exports.AnalyticsConfigurationRestApi = AnalyticsConfigurationRestApi;
