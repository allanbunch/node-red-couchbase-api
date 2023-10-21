/*jshint -W069 */
/**
 * The Functions REST API is a secondary API provided by the Query service. This API enables you to manage the JavaScript libraries and objects that are used to create {sqlpp} user-defined functions.

The base URL schemes for this API are as follows:

* http://node:8093/
* https://node:18093/ (for secure access)

where `node` is the host name or IP address of a computer running the Query service.

 * @class FunctionsRestApi
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var FunctionsRestApi = (function(){
    'use strict';

    var request = require('request');
    var Q = require('q');
    var fileType = require('file-type');

    function FunctionsRestApi(options){
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
     * @name FunctionsRestApi#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    FunctionsRestApi.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred){
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
            * @name FunctionsRestApi#setBasicAuth
            * @param {string} username
            * @param {string} password
            */
            FunctionsRestApi.prototype.setBasicAuth = function (username, password) {
                this.basic.username = username;
                this.basic.password = password;
            };
        /**
        * Set Auth headers
        * @method
        * @name FunctionsRestApi#setAuthHeaders
        * @param {object} headerParams - headers object
        */
        FunctionsRestApi.prototype.setAuthHeaders = function (headerParams) {
            var headers = headerParams ? headerParams : {};
            if (this.basic.username && this.basic.password) {
                headers['Authorization'] = 'Basic ' + new Buffer(this.basic.username + ':' + this.basic.password).toString("base64");
            }
            return headers;
        };

/**
 * Returns all libraries and functions.

By default, this operation returns all global libraries and functions, and all scoped libraries and functions. To return all the libraries and functions in a single scope, specify a bucket and scope.

 * @method
 * @name FunctionsRestApi#get_collection
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.bucket - For scoped libraries only. The bucket from which to fetch libraries.

     * @param {string} parameters.scope - For scoped libraries only. The scope from which to fetch libraries.

 */
 FunctionsRestApi.prototype.get_collection = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/evaluator/v1/libraries';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


                if(parameters['bucket'] !== undefined){
                    queryParameters['bucket'] = parameters['bucket'];
                }
        
        
        


 

                if(parameters['scope'] !== undefined){
                    queryParameters['scope'] = parameters['scope'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a library with all its functions.

By default, this operation returns a global library. For a scoped library, you must specify the bucket and scope.

 * @method
 * @name FunctionsRestApi#get_library
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.library - The name of a library.
     * @param {string} parameters.bucket - For scoped libraries only. The bucket in which the library is stored.

     * @param {string} parameters.scope - For scoped libraries only. The scope in which the library is stored.

 */
 FunctionsRestApi.prototype.get_library = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/evaluator/v1/libraries/{library}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{library}', parameters['library']);
        
        


        if(parameters['library'] === undefined){
            deferred.reject(new Error('Missing required  parameter: library'));
            return deferred.promise;
        }
 

                if(parameters['bucket'] !== undefined){
                    queryParameters['bucket'] = parameters['bucket'];
                }
        
        
        


 

                if(parameters['scope'] !== undefined){
                    queryParameters['scope'] = parameters['scope'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates the specified library and its associated functions. If the specified library exists, the existing library is overwritten.

By default, this operation creates or updates a global library. For a scoped library, you must specify the bucket and scope.

 * @method
 * @name FunctionsRestApi#post_library
 * @param {object} parameters - method options and parameters
     * @param {} parameters.functions - The JavaScript code for all functions in the library.
     * @param {string} parameters.library - The name of a library.
     * @param {string} parameters.bucket - For scoped libraries only. The bucket in which the library is stored.

     * @param {string} parameters.scope - For scoped libraries only. The scope in which the library is stored.

 */
 FunctionsRestApi.prototype.post_library = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/evaluator/v1/libraries/{library}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['functions'] !== undefined){
                body = parameters['functions'];
            }


        if(parameters['functions'] === undefined){
            deferred.reject(new Error('Missing required  parameter: functions'));
            return deferred.promise;
        }
 
        
            path = path.replace('{library}', parameters['library']);
        
        


        if(parameters['library'] === undefined){
            deferred.reject(new Error('Missing required  parameter: library'));
            return deferred.promise;
        }
 

                if(parameters['bucket'] !== undefined){
                    queryParameters['bucket'] = parameters['bucket'];
                }
        
        
        


 

                if(parameters['scope'] !== undefined){
                    queryParameters['scope'] = parameters['scope'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the specified library entirely.

By default, this operation deletes a global library.
For a scoped library, you must specify the bucket and scope.

 * @method
 * @name FunctionsRestApi#delete_library
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.library - The name of a library.
     * @param {string} parameters.bucket - For scoped libraries only. The bucket in which the library is stored.

     * @param {string} parameters.scope - For scoped libraries only. The scope in which the library is stored.

 */
 FunctionsRestApi.prototype.delete_library = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/evaluator/v1/libraries/{library}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{library}', parameters['library']);
        
        


        if(parameters['library'] === undefined){
            deferred.reject(new Error('Missing required  parameter: library'));
            return deferred.promise;
        }
 

                if(parameters['bucket'] !== undefined){
                    queryParameters['bucket'] = parameters['bucket'];
                }
        
        
        


 

                if(parameters['scope'] !== undefined){
                    queryParameters['scope'] = parameters['scope'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };

    return FunctionsRestApi;
})();

exports.FunctionsRestApi = FunctionsRestApi;
