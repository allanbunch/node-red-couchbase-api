/*jshint -W069 */
/**
 * The Analytics Library REST API is provided by the Analytics service.
This API enables you to manage the libraries that are used to create SQL\+\+ for Analytics user-defined functions.

The API schemes and host URLs are as follows:

* `http://localhost:8095/`
* `https://localhost:18095/` (for secure access)

Note that this API is only available on the loopback interface of a node
running the Analytics service.

 * @class AnalyticsLibraryRestApi
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var AnalyticsLibraryRestApi = (function(){
    'use strict';

    var request = require('request');
    var Q = require('q');
    var fileType = require('file-type');

    function AnalyticsLibraryRestApi(options){
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
     * @name AnalyticsLibraryRestApi#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    AnalyticsLibraryRestApi.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred){
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
            * @name AnalyticsLibraryRestApi#setBasicAuth
            * @param {string} username
            * @param {string} password
            */
            AnalyticsLibraryRestApi.prototype.setBasicAuth = function (username, password) {
                this.basic.username = username;
                this.basic.password = password;
            };
        /**
        * Set Auth headers
        * @method
        * @name AnalyticsLibraryRestApi#setAuthHeaders
        * @param {object} headerParams - headers object
        */
        AnalyticsLibraryRestApi.prototype.setAuthHeaders = function (headerParams) {
            var headers = headerParams ? headerParams : {};
            if (this.basic.username && this.basic.password) {
                headers['Authorization'] = 'Basic ' + new Buffer(this.basic.username + ':' + this.basic.password).toString("base64");
            }
            return headers;
        };

/**
 * Returns all libraries and functions.
 * @method
 * @name AnalyticsLibraryRestApi#get_collection
 * @param {object} parameters - method options and parameters
 */
 AnalyticsLibraryRestApi.prototype.get_collection = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/analytics/library/';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['multipart/form-data'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates the specified library and its associated functions. If the specified library exists, the existing library is overwritten.

 * @method
 * @name AnalyticsLibraryRestApi#post_library
 * @param {object} parameters - method options and parameters
     * @param {file} parameters.data - The library and all its dependencies, packaged by shiv.
    
     * @param {string} parameters.library - The name of a library.
     * @param {string} parameters.scope - The name of the Analytics scope containing the library.

The scope name may contain one or two identifiers, separated by a slash (/). You must URL-encode this parameter to escape any special characters.

 */
 AnalyticsLibraryRestApi.prototype.post_library = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/analytics/library/{scope}/{library}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['multipart/form-data'];

        
        
        

                if(parameters['data'] !== undefined){
                    form['data'] = parameters['data'];
                }

        if(parameters['data'] === undefined){
            deferred.reject(new Error('Missing required  parameter: data'));
            return deferred.promise;
        }
 
        
        
        

                form['type'] = 'python';

        if(parameters['type'] === undefined){
            deferred.reject(new Error('Missing required  parameter: type'));
            return deferred.promise;
        }
 
        
            path = path.replace('{library}', parameters['library']);
        
        


        if(parameters['library'] === undefined){
            deferred.reject(new Error('Missing required  parameter: library'));
            return deferred.promise;
        }
 
        
            path = path.replace('{scope}', parameters['scope']);
        
        


        if(parameters['scope'] === undefined){
            deferred.reject(new Error('Missing required  parameter: scope'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the specified library entirely.
 * @method
 * @name AnalyticsLibraryRestApi#delete_library
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.library - The name of a library.
     * @param {string} parameters.scope - The name of the Analytics scope containing the library.

The scope name may contain one or two identifiers, separated by a slash (/). You must URL-encode this parameter to escape any special characters.

 */
 AnalyticsLibraryRestApi.prototype.delete_library = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/analytics/library/{scope}/{library}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['multipart/form-data'];

        
            path = path.replace('{library}', parameters['library']);
        
        


        if(parameters['library'] === undefined){
            deferred.reject(new Error('Missing required  parameter: library'));
            return deferred.promise;
        }
 
        
            path = path.replace('{scope}', parameters['scope']);
        
        


        if(parameters['scope'] === undefined){
            deferred.reject(new Error('Missing required  parameter: scope'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };

    return AnalyticsLibraryRestApi;
})();

exports.AnalyticsLibraryRestApi = AnalyticsLibraryRestApi;
