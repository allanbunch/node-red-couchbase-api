/*jshint -W069 */
/**
 * The Index Statistics REST API is provided by the Index service.
This API enables you to get Index service statistics.

The API schemes and host URLs are as follows:

* `http://node:9102/`
* `https://node:19102/` (for secure access)

where `node` is the host name or IP address of a computer running the index service.

 * @class IndexStatisticsRestApi
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var IndexStatisticsRestApi = (function(){
    'use strict';

    var request = require('request');
    var Q = require('q');
    var fileType = require('file-type');

    function IndexStatisticsRestApi(options){
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
     * @name IndexStatisticsRestApi#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    IndexStatisticsRestApi.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred){
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
            * @name IndexStatisticsRestApi#setBasicAuth
            * @param {string} username
            * @param {string} password
            */
            IndexStatisticsRestApi.prototype.setBasicAuth = function (username, password) {
                this.basic.username = username;
                this.basic.password = password;
            };
        /**
        * Set Auth headers
        * @method
        * @name IndexStatisticsRestApi#setAuthHeaders
        * @param {object} headerParams - headers object
        */
        IndexStatisticsRestApi.prototype.setAuthHeaders = function (headerParams) {
            var headers = headerParams ? headerParams : {};
            if (this.basic.username && this.basic.password) {
                headers['Authorization'] = 'Basic ' + new Buffer(this.basic.username + ':' + this.basic.password).toString("base64");
            }
            return headers;
        };

/**
 * Returns statistics for an index node, and for all indexes on that node.
 * @method
 * @name IndexStatisticsRestApi#get_node_stats
 * @param {object} parameters - method options and parameters
     * @param {boolean} parameters.pretty - Whether the output should be formatted with indentations and newlines.
     * @param {boolean} parameters.redact - Whether keyspace and index names should be redacted in the output.

     * @param {boolean} parameters.skipEmpty - Whether empty, null, or zero statistics should be omitted from the output.
 */
 IndexStatisticsRestApi.prototype.get_node_stats = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/v1/stats';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pretty'] !== undefined){
                    queryParameters['pretty'] = parameters['pretty'];
                }
        
        
        


 

                if(parameters['redact'] !== undefined){
                    queryParameters['redact'] = parameters['redact'];
                }
        
        
        


 

                if(parameters['skipEmpty'] !== undefined){
                    queryParameters['skipEmpty'] = parameters['skipEmpty'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns statistics for all indexes within a bucket, scope, or collection.
 * @method
 * @name IndexStatisticsRestApi#get_keyspace_stats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.keyspace - The name of a keyspace.
This must contain a bucket name, which may be followed by an optional scope name and an optional collection name, separated by dots.
For example, `bucket.scope.collection`.


If any part of the keyspace name contains a dot, that part of the keyspace name must be wrapped in backticks.
For example, `pass:c[`bucket.1`.scope.collection]`.

     * @param {boolean} parameters.pretty - Whether the output should be formatted with indentations and newlines.
     * @param {boolean} parameters.redact - Whether keyspace and index names should be redacted in the output.

     * @param {boolean} parameters.skipEmpty - Whether empty, null, or zero statistics should be omitted from the output.
 */
 IndexStatisticsRestApi.prototype.get_keyspace_stats = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/v1/stats/{keyspace}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{keyspace}', parameters['keyspace']);
        
        


        if(parameters['keyspace'] === undefined){
            deferred.reject(new Error('Missing required  parameter: keyspace'));
            return deferred.promise;
        }
 

                if(parameters['pretty'] !== undefined){
                    queryParameters['pretty'] = parameters['pretty'];
                }
        
        
        


 

                if(parameters['redact'] !== undefined){
                    queryParameters['redact'] = parameters['redact'];
                }
        
        
        


 

                if(parameters['skipEmpty'] !== undefined){
                    queryParameters['skipEmpty'] = parameters['skipEmpty'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns statistics for an index.
 * @method
 * @name IndexStatisticsRestApi#get_index_stats
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.keyspace - The name of a keyspace.
This must contain a bucket name, which may be followed by an optional scope name and an optional collection name, separated by dots.
For example, `bucket.scope.collection`.


If any part of the keyspace name contains a dot, that part of the keyspace name must be wrapped in backticks.
For example, `pass:c[`bucket.1`.scope.collection]`.

     * @param {string} parameters.index - The name of an index.
     * @param {boolean} parameters.pretty - Whether the output should be formatted with indentations and newlines.
     * @param {boolean} parameters.partition - Whether statistics for index partitions should be included.
     * @param {boolean} parameters.redact - Whether keyspace and index names should be redacted in the output.

     * @param {boolean} parameters.skipEmpty - Whether empty, null, or zero statistics should be omitted from the output.
 */
 IndexStatisticsRestApi.prototype.get_index_stats = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/v1/stats/{keyspace}/{index}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{keyspace}', parameters['keyspace']);
        
        


        if(parameters['keyspace'] === undefined){
            deferred.reject(new Error('Missing required  parameter: keyspace'));
            return deferred.promise;
        }
 
        
            path = path.replace('{index}', parameters['index']);
        
        


        if(parameters['index'] === undefined){
            deferred.reject(new Error('Missing required  parameter: index'));
            return deferred.promise;
        }
 

                if(parameters['pretty'] !== undefined){
                    queryParameters['pretty'] = parameters['pretty'];
                }
        
        
        


 

                if(parameters['partition'] !== undefined){
                    queryParameters['partition'] = parameters['partition'];
                }
        
        
        


 

                if(parameters['redact'] !== undefined){
                    queryParameters['redact'] = parameters['redact'];
                }
        
        
        


 

                if(parameters['skipEmpty'] !== undefined){
                    queryParameters['skipEmpty'] = parameters['skipEmpty'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };

    return IndexStatisticsRestApi;
})();

exports.IndexStatisticsRestApi = IndexStatisticsRestApi;
