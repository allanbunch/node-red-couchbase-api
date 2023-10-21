/*jshint -W069 */
/**
 * The Analytics Links REST API is provided by the Analytics service.
This API enables you to manage the links to remote Couchbase clusters and external data sources.

The API schemes and host URLs are as follows:

* `http://node:8095/`
* `https://node:18095/` (for secure access)

where `node` is the host name or IP address of a node running the Analytics service.

 * @class AnalyticsLinksRestApi
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var AnalyticsLinksRestApi = (function(){
    'use strict';

    var request = require('request');
    var Q = require('q');
    var fileType = require('file-type');

    function AnalyticsLinksRestApi(options){
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
     * @name AnalyticsLinksRestApi#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    AnalyticsLinksRestApi.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred){
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
            * @name AnalyticsLinksRestApi#setBasicAuth
            * @param {string} username
            * @param {string} password
            */
            AnalyticsLinksRestApi.prototype.setBasicAuth = function (username, password) {
                this.basic.username = username;
                this.basic.password = password;
            };
        /**
        * Set Auth headers
        * @method
        * @name AnalyticsLinksRestApi#setAuthHeaders
        * @param {object} headerParams - headers object
        */
        AnalyticsLinksRestApi.prototype.setAuthHeaders = function (headerParams) {
            var headers = headerParams ? headerParams : {};
            if (this.basic.username && this.basic.password) {
                headers['Authorization'] = 'Basic ' + new Buffer(this.basic.username + ':' + this.basic.password).toString("base64");
            }
            return headers;
        };

/**
 * An alternative endpoint for [creating a link](#create-link), provided for backward compatibility.
 * @method
 * @name AnalyticsLinksRestApi#post_alt
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.dataverse - The name of the Analytics scope containing the link.

With this parameter, the scope name may only contain a single identifier.

     * @param {string} parameters.name - The name of the link.
     * @param {string} parameters.type - The type of the link.

`couchbase`: A link to a remote Couchbase cluster.
`s3`: A link to the Amazon S3 service.
`azureblob`: A link to Azure Blob Storage.
`gcs`: A link to Google Cloud Storage.

     * @param {string} parameters.hostname - For Couchbase links only. The remote hostname.

     * @param {string} parameters.encryption - For Couchbase links only. The type of encryption used by the link.

`none`: Neither passwords nor data are encrypted.
`half`: Passwords are encrypted using SCRAM-SHA, but data is not.
`full`: All data and passwords are encrypted and TLS is used.

     * @param {string} parameters.username - For Couchbase links only. The remote username. Required for links with no encryption or half encryption. Required for links with full encryption if using a password.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.password - For Couchbase links only. The remote password. Required for links with no encryption or half encryption. Required for links with full encryption if using a username.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.certificate - For Couchbase links only. The content of the target cluster root certificate. Required for links with full encryption.

You should URL-encode this parameter to escape any special characters. If required, this parameter may contain multiple certificates, separated by new lines.

     * @param {string} parameters.clientCertificate - For Couchbase links, this is the content of the client certificate. Required for links with full encryption if using a client key.

For Azure Blob links, this is the client certificate for the registered application. Used for Azure Active Directory client certificate authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.clientKey - For Couchbase links only. The content of the client key. Required for links with full encryption if using a client certificate.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.accessKeyId - For S3 links only. The Amazon S3 access key ID.

     * @param {string} parameters.secretAccessKey - For S3 links only. The Amazon S3 secret access key.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.sessionToken - For S3 links only. The Amazon S3 session token. Use this parameter if you want the link to have temporary access.

Passing this parameter indicates that the `accessKeyId` and `secretAccessKey` are temporary credentials. The Amazon S3 service validates the session token with each request to check whether the provided credentials have expired or are still valid.

     * @param {string} parameters.region - For S3 links only. The Amazon S3 region.

     * @param {string} parameters.serviceEndpoint - For S3 links only. The Amazon S3 service endpoint.

     * @param {string} parameters.accountName - For Azure Blob links only. The account name. Used for shared key authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.accountKey - For Azure Blob links only. The account key. Used for shared key authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.sharedAccessSignature - For Azure Blob links only. A token that can be used for authentication. Used for shared access signature authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.managedIdentityId - For Azure Blob links only. The managed identity ID. Used for managed identity authentication. Only available if the application is running on an Azure instance, e.g. an Azure virtual machine.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.clientId - For Azure Blob links only. The client ID for the registered application. Used for Azure Active Directory client secret authentication, or Azure Active Directory client certificate authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.tenantId - For Azure Blob links only. The tenant ID where the registered application is created. Used for Azure Active Directory client secret authentication, or Azure Active Directory client certificate authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.clientSecret - For Azure Blob links only. The client secret for the registered application. Used for Azure Active Directory client secret authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.clientCertificatePassword - For Azure Blob links only. The client certificate password for the registered application. Used for Azure Active Directory client certificate authentication, if the client certificate is password-protected.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.endpoint - For Azure Blob links and Google Cloud Storage links. The endpoint URI.

Required for Azure Blob links; optional for Google Cloud Storage links.

    
     * @param {string} parameters.jsonCredentials - For Google Cloud Storage links only. The JSON credentials of the link.

This parameter is not allowed if `applicationDefaultCredentials` is provided.

 */
 AnalyticsLinksRestApi.prototype.post_alt = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/analytics/link';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
        

                if(parameters['dataverse'] !== undefined){
                    form['dataverse'] = parameters['dataverse'];
                }

        if(parameters['dataverse'] === undefined){
            deferred.reject(new Error('Missing required  parameter: dataverse'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['name'] !== undefined){
                    form['name'] = parameters['name'];
                }

        if(parameters['name'] === undefined){
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['type'] !== undefined){
                    form['type'] = parameters['type'];
                }

        if(parameters['type'] === undefined){
            deferred.reject(new Error('Missing required  parameter: type'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['hostname'] !== undefined){
                    form['hostname'] = parameters['hostname'];
                }

        if(parameters['hostname'] === undefined){
            deferred.reject(new Error('Missing required  parameter: hostname'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['encryption'] !== undefined){
                    form['encryption'] = parameters['encryption'];
                }

        if(parameters['encryption'] === undefined){
            deferred.reject(new Error('Missing required  parameter: encryption'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['username'] !== undefined){
                    form['username'] = parameters['username'];
                }

 
        
        
        

                if(parameters['password'] !== undefined){
                    form['password'] = parameters['password'];
                }

 
        
        
        

                if(parameters['certificate'] !== undefined){
                    form['certificate'] = parameters['certificate'];
                }

 
        
        
        

                if(parameters['clientCertificate'] !== undefined){
                    form['clientCertificate'] = parameters['clientCertificate'];
                }

 
        
        
        

                if(parameters['clientKey'] !== undefined){
                    form['clientKey'] = parameters['clientKey'];
                }

 
        
        
        

                if(parameters['accessKeyId'] !== undefined){
                    form['accessKeyId'] = parameters['accessKeyId'];
                }

        if(parameters['accessKeyId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: accessKeyId'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['secretAccessKey'] !== undefined){
                    form['secretAccessKey'] = parameters['secretAccessKey'];
                }

        if(parameters['secretAccessKey'] === undefined){
            deferred.reject(new Error('Missing required  parameter: secretAccessKey'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['sessionToken'] !== undefined){
                    form['sessionToken'] = parameters['sessionToken'];
                }

 
        
        
        

                if(parameters['region'] !== undefined){
                    form['region'] = parameters['region'];
                }

        if(parameters['region'] === undefined){
            deferred.reject(new Error('Missing required  parameter: region'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['serviceEndpoint'] !== undefined){
                    form['serviceEndpoint'] = parameters['serviceEndpoint'];
                }

 
        
        
        

                if(parameters['accountName'] !== undefined){
                    form['accountName'] = parameters['accountName'];
                }

 
        
        
        

                if(parameters['accountKey'] !== undefined){
                    form['accountKey'] = parameters['accountKey'];
                }

 
        
        
        

                if(parameters['sharedAccessSignature'] !== undefined){
                    form['sharedAccessSignature'] = parameters['sharedAccessSignature'];
                }

 
        
        
        

                if(parameters['managedIdentityId'] !== undefined){
                    form['managedIdentityId'] = parameters['managedIdentityId'];
                }

 
        
        
        

                if(parameters['clientId'] !== undefined){
                    form['clientId'] = parameters['clientId'];
                }

 
        
        
        

                if(parameters['tenantId'] !== undefined){
                    form['tenantId'] = parameters['tenantId'];
                }

 
        
        
        

                if(parameters['clientSecret'] !== undefined){
                    form['clientSecret'] = parameters['clientSecret'];
                }

 
        
        
        

                if(parameters['clientCertificatePassword'] !== undefined){
                    form['clientCertificatePassword'] = parameters['clientCertificatePassword'];
                }

 
        
        
        

                if(parameters['endpoint'] !== undefined){
                    form['endpoint'] = parameters['endpoint'];
                }

 
        
        
        

                form['applicationDefaultCredentials'] = 'true';

 
        
        
        

                if(parameters['jsonCredentials'] !== undefined){
                    form['jsonCredentials'] = parameters['jsonCredentials'];
                }

 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns information about all links in all Analytics scopes.
 * @method
 * @name AnalyticsLinksRestApi#get_all
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.dataverse - The name of an Analytics scope. When this parameter is included, the request only returns information about links in the specified scope.

With this parameter, the scope name may only contain a single identifier.

This parameter is provided for backward compatibility. Note that it is deprecated, and will be removed in a future release.

     * @param {string} parameters.name - The name of a link. When this parameter is included, the request only returns information about the specified link. If specified, the `dataverse` parameter must be specified also.

This parameter is provided for backward compatibility. Note that it is deprecated, and will be removed in a future release.

     * @param {string} parameters.type - The type of the link. If this parameter is omitted, all link types are retrieved, excluding the `Local` link.

 */
 AnalyticsLinksRestApi.prototype.get_all = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/analytics/link';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['dataverse'] !== undefined){
                    queryParameters['dataverse'] = parameters['dataverse'];
                }
        
        
        


 

                if(parameters['name'] !== undefined){
                    queryParameters['name'] = parameters['name'];
                }
        
        
        


 

                if(parameters['type'] !== undefined){
                    queryParameters['type'] = parameters['type'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * An alternative endpoint for [editing a link](#edit-link), provided for backward compatibility. The link name, type, and scope name cannot be modified.

 * @method
 * @name AnalyticsLinksRestApi#put_alt
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.dataverse - The name of the Analytics scope containing the link.

With this parameter, the scope name may only contain a single identifier.

     * @param {string} parameters.name - The name of the link.
     * @param {string} parameters.type - The type of the link. If this parameter is specified, the value must match the type that was set when the link was created.

     * @param {string} parameters.hostname - For Couchbase links only. The remote hostname.

     * @param {string} parameters.encryption - For Couchbase links only. The type of encryption used by the link.

`none`: Neither passwords nor data are encrypted.
`half`: Passwords are encrypted using SCRAM-SHA, but data is not.
`full`: All data and passwords are encrypted and TLS is used.

     * @param {string} parameters.username - For Couchbase links only. The remote username. Required for links with no encryption or half encryption. Required for links with full encryption if using a password.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.password - For Couchbase links only. The remote password. Required for links with no encryption or half encryption. Required for links with full encryption if using a username.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.certificate - For Couchbase links only. The content of the target cluster root certificate. Required for links with full encryption.

You should URL-encode this parameter to escape any special characters. If required, this parameter may contain multiple certificates, separated by new lines.

     * @param {string} parameters.clientCertificate - For Couchbase links, this is the content of the client certificate. Required for links with full encryption if using a client key.

For Azure Blob links, this is the client certificate for the registered application. Used for Azure Active Directory client certificate authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.clientKey - For Couchbase links only. The content of the client key. Required for links with full encryption if using a client certificate.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.accessKeyId - For S3 links only. The Amazon S3 access key ID.

     * @param {string} parameters.secretAccessKey - For S3 links only. The Amazon S3 secret access key.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.sessionToken - For S3 links only. The Amazon S3 session token. Use this parameter if you want the link to have temporary access.

Passing this parameter indicates that the `accessKeyId` and `secretAccessKey` are temporary credentials. The Amazon S3 service validates the session token with each request to check whether the provided credentials have expired or are still valid.

     * @param {string} parameters.region - For S3 links only. The Amazon S3 region.

     * @param {string} parameters.serviceEndpoint - For S3 links only. The Amazon S3 service endpoint.

     * @param {string} parameters.accountName - For Azure Blob links only. The account name. Used for shared key authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.accountKey - For Azure Blob links only. The account key. Used for shared key authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.sharedAccessSignature - For Azure Blob links only. A token that can be used for authentication. Used for shared access signature authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.managedIdentityId - For Azure Blob links only. The managed identity ID. Used for managed identity authentication. Only available if the application is running on an Azure instance, e.g. an Azure virtual machine.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.clientId - For Azure Blob links only. The client ID for the registered application. Used for Azure Active Directory client secret authentication, or Azure Active Directory client certificate authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.tenantId - For Azure Blob links only. The tenant ID where the registered application is created. Used for Azure Active Directory client secret authentication, or Azure Active Directory client certificate authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.clientSecret - For Azure Blob links only. The client secret for the registered application. Used for Azure Active Directory client secret authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.clientCertificatePassword - For Azure Blob links only. The client certificate password for the registered application. Used for Azure Active Directory client certificate authentication, if the client certificate is password-protected.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.endpoint - For Azure Blob links and Google Cloud Storage links. The endpoint URI.

Required for Azure Blob links; optional for Google Cloud Storage links.

    
     * @param {string} parameters.jsonCredentials - For Google Cloud Storage links only. The JSON credentials of the link.

This parameter is not allowed if `applicationDefaultCredentials` is provided.

 */
 AnalyticsLinksRestApi.prototype.put_alt = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/analytics/link';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
        

                if(parameters['dataverse'] !== undefined){
                    form['dataverse'] = parameters['dataverse'];
                }

        if(parameters['dataverse'] === undefined){
            deferred.reject(new Error('Missing required  parameter: dataverse'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['name'] !== undefined){
                    form['name'] = parameters['name'];
                }

        if(parameters['name'] === undefined){
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['type'] !== undefined){
                    form['type'] = parameters['type'];
                }

 
        
        
        

                if(parameters['hostname'] !== undefined){
                    form['hostname'] = parameters['hostname'];
                }

        if(parameters['hostname'] === undefined){
            deferred.reject(new Error('Missing required  parameter: hostname'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['encryption'] !== undefined){
                    form['encryption'] = parameters['encryption'];
                }

        if(parameters['encryption'] === undefined){
            deferred.reject(new Error('Missing required  parameter: encryption'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['username'] !== undefined){
                    form['username'] = parameters['username'];
                }

 
        
        
        

                if(parameters['password'] !== undefined){
                    form['password'] = parameters['password'];
                }

 
        
        
        

                if(parameters['certificate'] !== undefined){
                    form['certificate'] = parameters['certificate'];
                }

 
        
        
        

                if(parameters['clientCertificate'] !== undefined){
                    form['clientCertificate'] = parameters['clientCertificate'];
                }

 
        
        
        

                if(parameters['clientKey'] !== undefined){
                    form['clientKey'] = parameters['clientKey'];
                }

 
        
        
        

                if(parameters['accessKeyId'] !== undefined){
                    form['accessKeyId'] = parameters['accessKeyId'];
                }

        if(parameters['accessKeyId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: accessKeyId'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['secretAccessKey'] !== undefined){
                    form['secretAccessKey'] = parameters['secretAccessKey'];
                }

        if(parameters['secretAccessKey'] === undefined){
            deferred.reject(new Error('Missing required  parameter: secretAccessKey'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['sessionToken'] !== undefined){
                    form['sessionToken'] = parameters['sessionToken'];
                }

 
        
        
        

                if(parameters['region'] !== undefined){
                    form['region'] = parameters['region'];
                }

        if(parameters['region'] === undefined){
            deferred.reject(new Error('Missing required  parameter: region'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['serviceEndpoint'] !== undefined){
                    form['serviceEndpoint'] = parameters['serviceEndpoint'];
                }

 
        
        
        

                if(parameters['accountName'] !== undefined){
                    form['accountName'] = parameters['accountName'];
                }

 
        
        
        

                if(parameters['accountKey'] !== undefined){
                    form['accountKey'] = parameters['accountKey'];
                }

 
        
        
        

                if(parameters['sharedAccessSignature'] !== undefined){
                    form['sharedAccessSignature'] = parameters['sharedAccessSignature'];
                }

 
        
        
        

                if(parameters['managedIdentityId'] !== undefined){
                    form['managedIdentityId'] = parameters['managedIdentityId'];
                }

 
        
        
        

                if(parameters['clientId'] !== undefined){
                    form['clientId'] = parameters['clientId'];
                }

 
        
        
        

                if(parameters['tenantId'] !== undefined){
                    form['tenantId'] = parameters['tenantId'];
                }

 
        
        
        

                if(parameters['clientSecret'] !== undefined){
                    form['clientSecret'] = parameters['clientSecret'];
                }

 
        
        
        

                if(parameters['clientCertificatePassword'] !== undefined){
                    form['clientCertificatePassword'] = parameters['clientCertificatePassword'];
                }

 
        
        
        

                if(parameters['endpoint'] !== undefined){
                    form['endpoint'] = parameters['endpoint'];
                }

 
        
        
        

                form['applicationDefaultCredentials'] = 'true';

 
        
        
        

                if(parameters['jsonCredentials'] !== undefined){
                    form['jsonCredentials'] = parameters['jsonCredentials'];
                }

 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * An alternative endpoint for [deleting a link](#delete-link), provided for backward compatibility. The link cannot be deleted if any other entities are using it, such as an Analytics collection. The entities using the link need to be disconnected from the link, otherwise, the delete operation fails.

 * @method
 * @name AnalyticsLinksRestApi#delete_alt
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.dataverse - The name of the Analytics scope containing the link.

With this parameter, the scope name may only contain a single identifier.

     * @param {string} parameters.name - The name of the link.
 */
 AnalyticsLinksRestApi.prototype.delete_alt = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/analytics/link';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
        
        

                if(parameters['dataverse'] !== undefined){
                    form['dataverse'] = parameters['dataverse'];
                }

        if(parameters['dataverse'] === undefined){
            deferred.reject(new Error('Missing required  parameter: dataverse'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['name'] !== undefined){
                    form['name'] = parameters['name'];
                }

        if(parameters['name'] === undefined){
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns information about all links in the specified Analytics scope.
 * @method
 * @name AnalyticsLinksRestApi#get_scope
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.scope - The name of the Analytics scope.

With this parameter, the scope name may contain one or two identifiers, separated by a slash (/). You must URL-encode this parameter to escape any special characters.

     * @param {string} parameters.type - The type of the link. If this parameter is omitted, all link types are retrieved, excluding the `Local` link.

 */
 AnalyticsLinksRestApi.prototype.get_scope = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/analytics/link/{scope}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{scope}', parameters['scope']);
        
        


        if(parameters['scope'] === undefined){
            deferred.reject(new Error('Missing required  parameter: scope'));
            return deferred.promise;
        }
 

                if(parameters['type'] !== undefined){
                    queryParameters['type'] = parameters['type'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates a link in the specified Analytics scope.
 * @method
 * @name AnalyticsLinksRestApi#post_link
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.scope - The name of the Analytics scope.

With this parameter, the scope name may contain one or two identifiers, separated by a slash (/). You must URL-encode this parameter to escape any special characters.

     * @param {string} parameters.name - The name of the link.
     * @param {string} parameters.type - The type of the link.

`couchbase`: A link to a remote Couchbase cluster.
`s3`: A link to the Amazon S3 service.
`azureblob`: A link to Azure Blob Storage.
`gcs`: A link to Google Cloud Storage.

     * @param {string} parameters.hostname - For Couchbase links only. The remote hostname.

     * @param {string} parameters.encryption - For Couchbase links only. The type of encryption used by the link.

`none`: Neither passwords nor data are encrypted.
`half`: Passwords are encrypted using SCRAM-SHA, but data is not.
`full`: All data and passwords are encrypted and TLS is used.

     * @param {string} parameters.username - For Couchbase links only. The remote username. Required for links with no encryption or half encryption. Required for links with full encryption if using a password.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.password - For Couchbase links only. The remote password. Required for links with no encryption or half encryption. Required for links with full encryption if using a username.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.certificate - For Couchbase links only. The content of the target cluster root certificate. Required for links with full encryption.

You should URL-encode this parameter to escape any special characters. If required, this parameter may contain multiple certificates, separated by new lines.

     * @param {string} parameters.clientCertificate - For Couchbase links, this is the content of the client certificate. Required for links with full encryption if using a client key.

For Azure Blob links, this is the client certificate for the registered application. Used for Azure Active Directory client certificate authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.clientKey - For Couchbase links only. The content of the client key. Required for links with full encryption if using a client certificate.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.accessKeyId - For S3 links only. The Amazon S3 access key ID.

     * @param {string} parameters.secretAccessKey - For S3 links only. The Amazon S3 secret access key.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.sessionToken - For S3 links only. The Amazon S3 session token. Use this parameter if you want the link to have temporary access.

Passing this parameter indicates that the `accessKeyId` and `secretAccessKey` are temporary credentials. The Amazon S3 service validates the session token with each request to check whether the provided credentials have expired or are still valid.

     * @param {string} parameters.region - For S3 links only. The Amazon S3 region.

     * @param {string} parameters.serviceEndpoint - For S3 links only. The Amazon S3 service endpoint.

     * @param {string} parameters.accountName - For Azure Blob links only. The account name. Used for shared key authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.accountKey - For Azure Blob links only. The account key. Used for shared key authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.sharedAccessSignature - For Azure Blob links only. A token that can be used for authentication. Used for shared access signature authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.managedIdentityId - For Azure Blob links only. The managed identity ID. Used for managed identity authentication. Only available if the application is running on an Azure instance, e.g. an Azure virtual machine.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.clientId - For Azure Blob links only. The client ID for the registered application. Used for Azure Active Directory client secret authentication, or Azure Active Directory client certificate authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.tenantId - For Azure Blob links only. The tenant ID where the registered application is created. Used for Azure Active Directory client secret authentication, or Azure Active Directory client certificate authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.clientSecret - For Azure Blob links only. The client secret for the registered application. Used for Azure Active Directory client secret authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.clientCertificatePassword - For Azure Blob links only. The client certificate password for the registered application. Used for Azure Active Directory client certificate authentication, if the client certificate is password-protected.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.endpoint - For Azure Blob links and Google Cloud Storage links. The endpoint URI.

Required for Azure Blob links; optional for Google Cloud Storage links.

    
     * @param {string} parameters.jsonCredentials - For Google Cloud Storage links only. The JSON credentials of the link.

This parameter is not allowed if `applicationDefaultCredentials` is provided.

 */
 AnalyticsLinksRestApi.prototype.post_link = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/analytics/link/{scope}/{name}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{scope}', parameters['scope']);
        
        


        if(parameters['scope'] === undefined){
            deferred.reject(new Error('Missing required  parameter: scope'));
            return deferred.promise;
        }
 
        
            path = path.replace('{name}', parameters['name']);
        
        


        if(parameters['name'] === undefined){
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['type'] !== undefined){
                    form['type'] = parameters['type'];
                }

        if(parameters['type'] === undefined){
            deferred.reject(new Error('Missing required  parameter: type'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['hostname'] !== undefined){
                    form['hostname'] = parameters['hostname'];
                }

        if(parameters['hostname'] === undefined){
            deferred.reject(new Error('Missing required  parameter: hostname'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['encryption'] !== undefined){
                    form['encryption'] = parameters['encryption'];
                }

        if(parameters['encryption'] === undefined){
            deferred.reject(new Error('Missing required  parameter: encryption'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['username'] !== undefined){
                    form['username'] = parameters['username'];
                }

 
        
        
        

                if(parameters['password'] !== undefined){
                    form['password'] = parameters['password'];
                }

 
        
        
        

                if(parameters['certificate'] !== undefined){
                    form['certificate'] = parameters['certificate'];
                }

 
        
        
        

                if(parameters['clientCertificate'] !== undefined){
                    form['clientCertificate'] = parameters['clientCertificate'];
                }

 
        
        
        

                if(parameters['clientKey'] !== undefined){
                    form['clientKey'] = parameters['clientKey'];
                }

 
        
        
        

                if(parameters['accessKeyId'] !== undefined){
                    form['accessKeyId'] = parameters['accessKeyId'];
                }

        if(parameters['accessKeyId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: accessKeyId'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['secretAccessKey'] !== undefined){
                    form['secretAccessKey'] = parameters['secretAccessKey'];
                }

        if(parameters['secretAccessKey'] === undefined){
            deferred.reject(new Error('Missing required  parameter: secretAccessKey'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['sessionToken'] !== undefined){
                    form['sessionToken'] = parameters['sessionToken'];
                }

 
        
        
        

                if(parameters['region'] !== undefined){
                    form['region'] = parameters['region'];
                }

        if(parameters['region'] === undefined){
            deferred.reject(new Error('Missing required  parameter: region'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['serviceEndpoint'] !== undefined){
                    form['serviceEndpoint'] = parameters['serviceEndpoint'];
                }

 
        
        
        

                if(parameters['accountName'] !== undefined){
                    form['accountName'] = parameters['accountName'];
                }

 
        
        
        

                if(parameters['accountKey'] !== undefined){
                    form['accountKey'] = parameters['accountKey'];
                }

 
        
        
        

                if(parameters['sharedAccessSignature'] !== undefined){
                    form['sharedAccessSignature'] = parameters['sharedAccessSignature'];
                }

 
        
        
        

                if(parameters['managedIdentityId'] !== undefined){
                    form['managedIdentityId'] = parameters['managedIdentityId'];
                }

 
        
        
        

                if(parameters['clientId'] !== undefined){
                    form['clientId'] = parameters['clientId'];
                }

 
        
        
        

                if(parameters['tenantId'] !== undefined){
                    form['tenantId'] = parameters['tenantId'];
                }

 
        
        
        

                if(parameters['clientSecret'] !== undefined){
                    form['clientSecret'] = parameters['clientSecret'];
                }

 
        
        
        

                if(parameters['clientCertificatePassword'] !== undefined){
                    form['clientCertificatePassword'] = parameters['clientCertificatePassword'];
                }

 
        
        
        

                if(parameters['endpoint'] !== undefined){
                    form['endpoint'] = parameters['endpoint'];
                }

 
        
        
        

                form['applicationDefaultCredentials'] = 'true';

 
        
        
        

                if(parameters['jsonCredentials'] !== undefined){
                    form['jsonCredentials'] = parameters['jsonCredentials'];
                }

 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns information about a link in the specified Analytics scope.
 * @method
 * @name AnalyticsLinksRestApi#get_link
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.scope - The name of the Analytics scope.

With this parameter, the scope name may contain one or two identifiers, separated by a slash (/). You must URL-encode this parameter to escape any special characters.

     * @param {string} parameters.name - The name of the link.
     * @param {string} parameters.type - The type of the link. If this parameter is specified, the value must match the type that was set when the link was created.

 */
 AnalyticsLinksRestApi.prototype.get_link = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/analytics/link/{scope}/{name}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{scope}', parameters['scope']);
        
        


        if(parameters['scope'] === undefined){
            deferred.reject(new Error('Missing required  parameter: scope'));
            return deferred.promise;
        }
 
        
            path = path.replace('{name}', parameters['name']);
        
        


        if(parameters['name'] === undefined){
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }
 

                if(parameters['type'] !== undefined){
                    queryParameters['type'] = parameters['type'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Edits an existing link in the specified Analytics scope. The link name, type, and scope name cannot be modified.

 * @method
 * @name AnalyticsLinksRestApi#put_link
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.scope - The name of the Analytics scope.

With this parameter, the scope name may contain one or two identifiers, separated by a slash (/). You must URL-encode this parameter to escape any special characters.

     * @param {string} parameters.name - The name of the link.
     * @param {string} parameters.type - The type of the link. If this parameter is specified, the value must match the type that was set when the link was created.

     * @param {string} parameters.hostname - For Couchbase links only. The remote hostname.

     * @param {string} parameters.encryption - For Couchbase links only. The type of encryption used by the link.

`none`: Neither passwords nor data are encrypted.
`half`: Passwords are encrypted using SCRAM-SHA, but data is not.
`full`: All data and passwords are encrypted and TLS is used.

     * @param {string} parameters.username - For Couchbase links only. The remote username. Required for links with no encryption or half encryption. Required for links with full encryption if using a password.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.password - For Couchbase links only. The remote password. Required for links with no encryption or half encryption. Required for links with full encryption if using a username.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.certificate - For Couchbase links only. The content of the target cluster root certificate. Required for links with full encryption.

You should URL-encode this parameter to escape any special characters. If required, this parameter may contain multiple certificates, separated by new lines.

     * @param {string} parameters.clientCertificate - For Couchbase links, this is the content of the client certificate. Required for links with full encryption if using a client key.

For Azure Blob links, this is the client certificate for the registered application. Used for Azure Active Directory client certificate authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.clientKey - For Couchbase links only. The content of the client key. Required for links with full encryption if using a client certificate.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.accessKeyId - For S3 links only. The Amazon S3 access key ID.

     * @param {string} parameters.secretAccessKey - For S3 links only. The Amazon S3 secret access key.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.sessionToken - For S3 links only. The Amazon S3 session token. Use this parameter if you want the link to have temporary access.

Passing this parameter indicates that the `accessKeyId` and `secretAccessKey` are temporary credentials. The Amazon S3 service validates the session token with each request to check whether the provided credentials have expired or are still valid.

     * @param {string} parameters.region - For S3 links only. The Amazon S3 region.

     * @param {string} parameters.serviceEndpoint - For S3 links only. The Amazon S3 service endpoint.

     * @param {string} parameters.accountName - For Azure Blob links only. The account name. Used for shared key authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.accountKey - For Azure Blob links only. The account key. Used for shared key authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.sharedAccessSignature - For Azure Blob links only. A token that can be used for authentication. Used for shared access signature authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.managedIdentityId - For Azure Blob links only. The managed identity ID. Used for managed identity authentication. Only available if the application is running on an Azure instance, e.g. an Azure virtual machine.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.clientId - For Azure Blob links only. The client ID for the registered application. Used for Azure Active Directory client secret authentication, or Azure Active Directory client certificate authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.tenantId - For Azure Blob links only. The tenant ID where the registered application is created. Used for Azure Active Directory client secret authentication, or Azure Active Directory client certificate authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.clientSecret - For Azure Blob links only. The client secret for the registered application. Used for Azure Active Directory client secret authentication.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.clientCertificatePassword - For Azure Blob links only. The client certificate password for the registered application. Used for Azure Active Directory client certificate authentication, if the client certificate is password-protected.

You should URL-encode this parameter to escape any special characters.

     * @param {string} parameters.endpoint - For Azure Blob links and Google Cloud Storage links. The endpoint URI.

Required for Azure Blob links; optional for Google Cloud Storage links.

    
     * @param {string} parameters.jsonCredentials - For Google Cloud Storage links only. The JSON credentials of the link.

This parameter is not allowed if `applicationDefaultCredentials` is provided.

 */
 AnalyticsLinksRestApi.prototype.put_link = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/analytics/link/{scope}/{name}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{scope}', parameters['scope']);
        
        


        if(parameters['scope'] === undefined){
            deferred.reject(new Error('Missing required  parameter: scope'));
            return deferred.promise;
        }
 
        
            path = path.replace('{name}', parameters['name']);
        
        


        if(parameters['name'] === undefined){
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['type'] !== undefined){
                    form['type'] = parameters['type'];
                }

 
        
        
        

                if(parameters['hostname'] !== undefined){
                    form['hostname'] = parameters['hostname'];
                }

        if(parameters['hostname'] === undefined){
            deferred.reject(new Error('Missing required  parameter: hostname'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['encryption'] !== undefined){
                    form['encryption'] = parameters['encryption'];
                }

        if(parameters['encryption'] === undefined){
            deferred.reject(new Error('Missing required  parameter: encryption'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['username'] !== undefined){
                    form['username'] = parameters['username'];
                }

 
        
        
        

                if(parameters['password'] !== undefined){
                    form['password'] = parameters['password'];
                }

 
        
        
        

                if(parameters['certificate'] !== undefined){
                    form['certificate'] = parameters['certificate'];
                }

 
        
        
        

                if(parameters['clientCertificate'] !== undefined){
                    form['clientCertificate'] = parameters['clientCertificate'];
                }

 
        
        
        

                if(parameters['clientKey'] !== undefined){
                    form['clientKey'] = parameters['clientKey'];
                }

 
        
        
        

                if(parameters['accessKeyId'] !== undefined){
                    form['accessKeyId'] = parameters['accessKeyId'];
                }

        if(parameters['accessKeyId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: accessKeyId'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['secretAccessKey'] !== undefined){
                    form['secretAccessKey'] = parameters['secretAccessKey'];
                }

        if(parameters['secretAccessKey'] === undefined){
            deferred.reject(new Error('Missing required  parameter: secretAccessKey'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['sessionToken'] !== undefined){
                    form['sessionToken'] = parameters['sessionToken'];
                }

 
        
        
        

                if(parameters['region'] !== undefined){
                    form['region'] = parameters['region'];
                }

        if(parameters['region'] === undefined){
            deferred.reject(new Error('Missing required  parameter: region'));
            return deferred.promise;
        }
 
        
        
        

                if(parameters['serviceEndpoint'] !== undefined){
                    form['serviceEndpoint'] = parameters['serviceEndpoint'];
                }

 
        
        
        

                if(parameters['accountName'] !== undefined){
                    form['accountName'] = parameters['accountName'];
                }

 
        
        
        

                if(parameters['accountKey'] !== undefined){
                    form['accountKey'] = parameters['accountKey'];
                }

 
        
        
        

                if(parameters['sharedAccessSignature'] !== undefined){
                    form['sharedAccessSignature'] = parameters['sharedAccessSignature'];
                }

 
        
        
        

                if(parameters['managedIdentityId'] !== undefined){
                    form['managedIdentityId'] = parameters['managedIdentityId'];
                }

 
        
        
        

                if(parameters['clientId'] !== undefined){
                    form['clientId'] = parameters['clientId'];
                }

 
        
        
        

                if(parameters['tenantId'] !== undefined){
                    form['tenantId'] = parameters['tenantId'];
                }

 
        
        
        

                if(parameters['clientSecret'] !== undefined){
                    form['clientSecret'] = parameters['clientSecret'];
                }

 
        
        
        

                if(parameters['clientCertificatePassword'] !== undefined){
                    form['clientCertificatePassword'] = parameters['clientCertificatePassword'];
                }

 
        
        
        

                if(parameters['endpoint'] !== undefined){
                    form['endpoint'] = parameters['endpoint'];
                }

 
        
        
        

                form['applicationDefaultCredentials'] = 'true';

 
        
        
        

                if(parameters['jsonCredentials'] !== undefined){
                    form['jsonCredentials'] = parameters['jsonCredentials'];
                }

 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes a link in the specified Analytics scope. The link cannot be deleted if any other entities are using it, such as an Analytics collection. The entities using the link need to be disconnected from the link, otherwise, the delete operation fails.

 * @method
 * @name AnalyticsLinksRestApi#delete_link
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.scope - The name of the Analytics scope.

With this parameter, the scope name may contain one or two identifiers, separated by a slash (/). You must URL-encode this parameter to escape any special characters.

     * @param {string} parameters.name - The name of the link.
 */
 AnalyticsLinksRestApi.prototype.delete_link = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/analytics/link/{scope}/{name}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{scope}', parameters['scope']);
        
        


        if(parameters['scope'] === undefined){
            deferred.reject(new Error('Missing required  parameter: scope'));
            return deferred.promise;
        }
 
        
            path = path.replace('{name}', parameters['name']);
        
        


        if(parameters['name'] === undefined){
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };

    return AnalyticsLinksRestApi;
})();

exports.AnalyticsLinksRestApi = AnalyticsLinksRestApi;
