/*jshint -W069 */

const { merge } = require('grunt');

/**
 * The Query Service REST API is provided by the Query service.
This API enables you to run {sqlpp} queries and set request-level parameters.

The API schemes and host URLs are as follows:

* `http://node:8093/`
* `https://node:18093/` (for secure access)

where `node` is the host name or IP address of a node running the Query service.

 * @class QueryServiceRestApi
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var QueryServiceRestApi = (function () {
    'use strict';

    var request = require('request');
    var Q = require('q');
    var fileType = require('file-type');

    function QueryServiceRestApi(options) {
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : '';
        if (this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
        this.apiKey = (typeof options === 'object') ? (options.apiKey ? options.apiKey : {}) : {};
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
     * @name QueryServiceRestApi#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    QueryServiceRestApi.prototype.request = function (method, url, parameters, body, headers, queryParameters, form, deferred) {
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
    * Set Api Key
    * @method
    * @name QueryServiceRestApi#setApiKey
    * @param {string} value - apiKey's value
    * @param {string} headerOrQueryName - the header or query name to send the apiKey at
    * @param {boolean} isQuery - true if send the apiKey as query param, otherwise, send as header param
    */
    QueryServiceRestApi.prototype.setApiKey = function (value, headerOrQueryName, isQuery) {
        this.apiKey.value = value;
        this.apiKey.headerOrQueryName = headerOrQueryName;
        this.apiKey.isQuery = isQuery;
    };
    /**
    * Set Basic Auth
    * @method
    * @name QueryServiceRestApi#setBasicAuth
    * @param {string} username
    * @param {string} password
    */
    QueryServiceRestApi.prototype.setBasicAuth = function (username, password) {
        this.basic.username = username;
        this.basic.password = password;
    };
    /**
    * Set Auth headers
    * @method
    * @name QueryServiceRestApi#setAuthHeaders
    * @param {object} headerParams - headers object
    */
    QueryServiceRestApi.prototype.setAuthHeaders = function (headerParams) {
        var headers = headerParams ? headerParams : {};
        if (!this.apiKey.isQuery && this.apiKey.headerOrQueryName) {
            headers[this.apiKey.headerOrQueryName] = this.apiKey.value;
        }
        if (this.basic.username && this.basic.password) {
            headers['Authorization'] = 'Basic ' + new Buffer(this.basic.username + ':' + this.basic.password).toString("base64");
        }
        return headers;
    };

    /**
     * Enables you to execute a {sqlpp} statement. This method allows you to run queries and modifying statements, and specify query parameters.
    
        * @method
        * @name QueryServiceRestApi#post_service
        * @param {object} parameters - method options and parameters
        * @param {} parameters.parameters - An object specifying one or more query parameters.
    */
    QueryServiceRestApi.prototype.post_service = function (parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();
        var domain = this.domain, path = '/query/service';
        var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];




        if (parameters['parameters'] !== undefined) {
            body = parameters['parameters'];
        }


        if (parameters['parameters'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: parameters'));
            return deferred.promise;
        }

        queryParameters = mergeQueryParams(parameters, queryParameters);

        this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

        return deferred.promise;
    };

    return QueryServiceRestApi;
})();

exports.QueryServiceRestApi = QueryServiceRestApi;
