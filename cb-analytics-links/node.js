'use strict';
var lib = require('./lib.js');

module.exports = function (RED) {
    function AnalyticsLinksRestApiNode(config) {
        RED.nodes.createNode(this, config);
        this.service = RED.nodes.getNode(config.service);
        this.method = config.method;
        this.post_alt_dataverse = config.post_alt_dataverse;
        this.post_alt_dataverseType = config.post_alt_dataverseType || 'str';
        this.post_alt_name = config.post_alt_name;
        this.post_alt_nameType = config.post_alt_nameType || 'str';
        this.post_alt_type = config.post_alt_type;
        this.post_alt_typeType = config.post_alt_typeType || 'str';
        this.post_alt_hostname = config.post_alt_hostname;
        this.post_alt_hostnameType = config.post_alt_hostnameType || 'str';
        this.post_alt_encryption = config.post_alt_encryption;
        this.post_alt_encryptionType = config.post_alt_encryptionType || 'str';
        this.post_alt_username = config.post_alt_username;
        this.post_alt_usernameType = config.post_alt_usernameType || 'str';
        this.post_alt_password = config.post_alt_password;
        this.post_alt_passwordType = config.post_alt_passwordType || 'str';
        this.post_alt_certificate = config.post_alt_certificate;
        this.post_alt_certificateType = config.post_alt_certificateType || 'str';
        this.post_alt_clientCertificate = config.post_alt_clientCertificate;
        this.post_alt_clientCertificateType = config.post_alt_clientCertificateType || 'str';
        this.post_alt_clientKey = config.post_alt_clientKey;
        this.post_alt_clientKeyType = config.post_alt_clientKeyType || 'str';
        this.post_alt_accessKeyId = config.post_alt_accessKeyId;
        this.post_alt_accessKeyIdType = config.post_alt_accessKeyIdType || 'str';
        this.post_alt_secretAccessKey = config.post_alt_secretAccessKey;
        this.post_alt_secretAccessKeyType = config.post_alt_secretAccessKeyType || 'str';
        this.post_alt_sessionToken = config.post_alt_sessionToken;
        this.post_alt_sessionTokenType = config.post_alt_sessionTokenType || 'str';
        this.post_alt_region = config.post_alt_region;
        this.post_alt_regionType = config.post_alt_regionType || 'str';
        this.post_alt_serviceEndpoint = config.post_alt_serviceEndpoint;
        this.post_alt_serviceEndpointType = config.post_alt_serviceEndpointType || 'str';
        this.post_alt_accountName = config.post_alt_accountName;
        this.post_alt_accountNameType = config.post_alt_accountNameType || 'str';
        this.post_alt_accountKey = config.post_alt_accountKey;
        this.post_alt_accountKeyType = config.post_alt_accountKeyType || 'str';
        this.post_alt_sharedAccessSignature = config.post_alt_sharedAccessSignature;
        this.post_alt_sharedAccessSignatureType = config.post_alt_sharedAccessSignatureType || 'str';
        this.post_alt_managedIdentityId = config.post_alt_managedIdentityId;
        this.post_alt_managedIdentityIdType = config.post_alt_managedIdentityIdType || 'str';
        this.post_alt_clientId = config.post_alt_clientId;
        this.post_alt_clientIdType = config.post_alt_clientIdType || 'str';
        this.post_alt_tenantId = config.post_alt_tenantId;
        this.post_alt_tenantIdType = config.post_alt_tenantIdType || 'str';
        this.post_alt_clientSecret = config.post_alt_clientSecret;
        this.post_alt_clientSecretType = config.post_alt_clientSecretType || 'str';
        this.post_alt_clientCertificatePassword = config.post_alt_clientCertificatePassword;
        this.post_alt_clientCertificatePasswordType = config.post_alt_clientCertificatePasswordType || 'str';
        this.post_alt_endpoint = config.post_alt_endpoint;
        this.post_alt_endpointType = config.post_alt_endpointType || 'str';
        this.post_alt_applicationDefaultCredentials = config.post_alt_applicationDefaultCredentials;
        this.post_alt_applicationDefaultCredentialsType = config.post_alt_applicationDefaultCredentialsType || 'str';
        this.post_alt_jsonCredentials = config.post_alt_jsonCredentials;
        this.post_alt_jsonCredentialsType = config.post_alt_jsonCredentialsType || 'str';
        this.get_all_dataverse = config.get_all_dataverse;
        this.get_all_dataverseType = config.get_all_dataverseType || 'str';
        this.get_all_name = config.get_all_name;
        this.get_all_nameType = config.get_all_nameType || 'str';
        this.get_all_type = config.get_all_type;
        this.get_all_typeType = config.get_all_typeType || 'str';
        this.put_alt_dataverse = config.put_alt_dataverse;
        this.put_alt_dataverseType = config.put_alt_dataverseType || 'str';
        this.put_alt_name = config.put_alt_name;
        this.put_alt_nameType = config.put_alt_nameType || 'str';
        this.put_alt_type = config.put_alt_type;
        this.put_alt_typeType = config.put_alt_typeType || 'str';
        this.put_alt_hostname = config.put_alt_hostname;
        this.put_alt_hostnameType = config.put_alt_hostnameType || 'str';
        this.put_alt_encryption = config.put_alt_encryption;
        this.put_alt_encryptionType = config.put_alt_encryptionType || 'str';
        this.put_alt_username = config.put_alt_username;
        this.put_alt_usernameType = config.put_alt_usernameType || 'str';
        this.put_alt_password = config.put_alt_password;
        this.put_alt_passwordType = config.put_alt_passwordType || 'str';
        this.put_alt_certificate = config.put_alt_certificate;
        this.put_alt_certificateType = config.put_alt_certificateType || 'str';
        this.put_alt_clientCertificate = config.put_alt_clientCertificate;
        this.put_alt_clientCertificateType = config.put_alt_clientCertificateType || 'str';
        this.put_alt_clientKey = config.put_alt_clientKey;
        this.put_alt_clientKeyType = config.put_alt_clientKeyType || 'str';
        this.put_alt_accessKeyId = config.put_alt_accessKeyId;
        this.put_alt_accessKeyIdType = config.put_alt_accessKeyIdType || 'str';
        this.put_alt_secretAccessKey = config.put_alt_secretAccessKey;
        this.put_alt_secretAccessKeyType = config.put_alt_secretAccessKeyType || 'str';
        this.put_alt_sessionToken = config.put_alt_sessionToken;
        this.put_alt_sessionTokenType = config.put_alt_sessionTokenType || 'str';
        this.put_alt_region = config.put_alt_region;
        this.put_alt_regionType = config.put_alt_regionType || 'str';
        this.put_alt_serviceEndpoint = config.put_alt_serviceEndpoint;
        this.put_alt_serviceEndpointType = config.put_alt_serviceEndpointType || 'str';
        this.put_alt_accountName = config.put_alt_accountName;
        this.put_alt_accountNameType = config.put_alt_accountNameType || 'str';
        this.put_alt_accountKey = config.put_alt_accountKey;
        this.put_alt_accountKeyType = config.put_alt_accountKeyType || 'str';
        this.put_alt_sharedAccessSignature = config.put_alt_sharedAccessSignature;
        this.put_alt_sharedAccessSignatureType = config.put_alt_sharedAccessSignatureType || 'str';
        this.put_alt_managedIdentityId = config.put_alt_managedIdentityId;
        this.put_alt_managedIdentityIdType = config.put_alt_managedIdentityIdType || 'str';
        this.put_alt_clientId = config.put_alt_clientId;
        this.put_alt_clientIdType = config.put_alt_clientIdType || 'str';
        this.put_alt_tenantId = config.put_alt_tenantId;
        this.put_alt_tenantIdType = config.put_alt_tenantIdType || 'str';
        this.put_alt_clientSecret = config.put_alt_clientSecret;
        this.put_alt_clientSecretType = config.put_alt_clientSecretType || 'str';
        this.put_alt_clientCertificatePassword = config.put_alt_clientCertificatePassword;
        this.put_alt_clientCertificatePasswordType = config.put_alt_clientCertificatePasswordType || 'str';
        this.put_alt_endpoint = config.put_alt_endpoint;
        this.put_alt_endpointType = config.put_alt_endpointType || 'str';
        this.put_alt_applicationDefaultCredentials = config.put_alt_applicationDefaultCredentials;
        this.put_alt_applicationDefaultCredentialsType = config.put_alt_applicationDefaultCredentialsType || 'str';
        this.put_alt_jsonCredentials = config.put_alt_jsonCredentials;
        this.put_alt_jsonCredentialsType = config.put_alt_jsonCredentialsType || 'str';
        this.delete_alt_dataverse = config.delete_alt_dataverse;
        this.delete_alt_dataverseType = config.delete_alt_dataverseType || 'str';
        this.delete_alt_name = config.delete_alt_name;
        this.delete_alt_nameType = config.delete_alt_nameType || 'str';
        this.get_scope_scope = config.get_scope_scope;
        this.get_scope_scopeType = config.get_scope_scopeType || 'str';
        this.get_scope_type = config.get_scope_type;
        this.get_scope_typeType = config.get_scope_typeType || 'str';
        this.post_link_scope = config.post_link_scope;
        this.post_link_scopeType = config.post_link_scopeType || 'str';
        this.post_link_name = config.post_link_name;
        this.post_link_nameType = config.post_link_nameType || 'str';
        this.post_link_type = config.post_link_type;
        this.post_link_typeType = config.post_link_typeType || 'str';
        this.post_link_hostname = config.post_link_hostname;
        this.post_link_hostnameType = config.post_link_hostnameType || 'str';
        this.post_link_encryption = config.post_link_encryption;
        this.post_link_encryptionType = config.post_link_encryptionType || 'str';
        this.post_link_username = config.post_link_username;
        this.post_link_usernameType = config.post_link_usernameType || 'str';
        this.post_link_password = config.post_link_password;
        this.post_link_passwordType = config.post_link_passwordType || 'str';
        this.post_link_certificate = config.post_link_certificate;
        this.post_link_certificateType = config.post_link_certificateType || 'str';
        this.post_link_clientCertificate = config.post_link_clientCertificate;
        this.post_link_clientCertificateType = config.post_link_clientCertificateType || 'str';
        this.post_link_clientKey = config.post_link_clientKey;
        this.post_link_clientKeyType = config.post_link_clientKeyType || 'str';
        this.post_link_accessKeyId = config.post_link_accessKeyId;
        this.post_link_accessKeyIdType = config.post_link_accessKeyIdType || 'str';
        this.post_link_secretAccessKey = config.post_link_secretAccessKey;
        this.post_link_secretAccessKeyType = config.post_link_secretAccessKeyType || 'str';
        this.post_link_sessionToken = config.post_link_sessionToken;
        this.post_link_sessionTokenType = config.post_link_sessionTokenType || 'str';
        this.post_link_region = config.post_link_region;
        this.post_link_regionType = config.post_link_regionType || 'str';
        this.post_link_serviceEndpoint = config.post_link_serviceEndpoint;
        this.post_link_serviceEndpointType = config.post_link_serviceEndpointType || 'str';
        this.post_link_accountName = config.post_link_accountName;
        this.post_link_accountNameType = config.post_link_accountNameType || 'str';
        this.post_link_accountKey = config.post_link_accountKey;
        this.post_link_accountKeyType = config.post_link_accountKeyType || 'str';
        this.post_link_sharedAccessSignature = config.post_link_sharedAccessSignature;
        this.post_link_sharedAccessSignatureType = config.post_link_sharedAccessSignatureType || 'str';
        this.post_link_managedIdentityId = config.post_link_managedIdentityId;
        this.post_link_managedIdentityIdType = config.post_link_managedIdentityIdType || 'str';
        this.post_link_clientId = config.post_link_clientId;
        this.post_link_clientIdType = config.post_link_clientIdType || 'str';
        this.post_link_tenantId = config.post_link_tenantId;
        this.post_link_tenantIdType = config.post_link_tenantIdType || 'str';
        this.post_link_clientSecret = config.post_link_clientSecret;
        this.post_link_clientSecretType = config.post_link_clientSecretType || 'str';
        this.post_link_clientCertificatePassword = config.post_link_clientCertificatePassword;
        this.post_link_clientCertificatePasswordType = config.post_link_clientCertificatePasswordType || 'str';
        this.post_link_endpoint = config.post_link_endpoint;
        this.post_link_endpointType = config.post_link_endpointType || 'str';
        this.post_link_applicationDefaultCredentials = config.post_link_applicationDefaultCredentials;
        this.post_link_applicationDefaultCredentialsType = config.post_link_applicationDefaultCredentialsType || 'str';
        this.post_link_jsonCredentials = config.post_link_jsonCredentials;
        this.post_link_jsonCredentialsType = config.post_link_jsonCredentialsType || 'str';
        this.get_link_scope = config.get_link_scope;
        this.get_link_scopeType = config.get_link_scopeType || 'str';
        this.get_link_name = config.get_link_name;
        this.get_link_nameType = config.get_link_nameType || 'str';
        this.get_link_type = config.get_link_type;
        this.get_link_typeType = config.get_link_typeType || 'str';
        this.put_link_scope = config.put_link_scope;
        this.put_link_scopeType = config.put_link_scopeType || 'str';
        this.put_link_name = config.put_link_name;
        this.put_link_nameType = config.put_link_nameType || 'str';
        this.put_link_type = config.put_link_type;
        this.put_link_typeType = config.put_link_typeType || 'str';
        this.put_link_hostname = config.put_link_hostname;
        this.put_link_hostnameType = config.put_link_hostnameType || 'str';
        this.put_link_encryption = config.put_link_encryption;
        this.put_link_encryptionType = config.put_link_encryptionType || 'str';
        this.put_link_username = config.put_link_username;
        this.put_link_usernameType = config.put_link_usernameType || 'str';
        this.put_link_password = config.put_link_password;
        this.put_link_passwordType = config.put_link_passwordType || 'str';
        this.put_link_certificate = config.put_link_certificate;
        this.put_link_certificateType = config.put_link_certificateType || 'str';
        this.put_link_clientCertificate = config.put_link_clientCertificate;
        this.put_link_clientCertificateType = config.put_link_clientCertificateType || 'str';
        this.put_link_clientKey = config.put_link_clientKey;
        this.put_link_clientKeyType = config.put_link_clientKeyType || 'str';
        this.put_link_accessKeyId = config.put_link_accessKeyId;
        this.put_link_accessKeyIdType = config.put_link_accessKeyIdType || 'str';
        this.put_link_secretAccessKey = config.put_link_secretAccessKey;
        this.put_link_secretAccessKeyType = config.put_link_secretAccessKeyType || 'str';
        this.put_link_sessionToken = config.put_link_sessionToken;
        this.put_link_sessionTokenType = config.put_link_sessionTokenType || 'str';
        this.put_link_region = config.put_link_region;
        this.put_link_regionType = config.put_link_regionType || 'str';
        this.put_link_serviceEndpoint = config.put_link_serviceEndpoint;
        this.put_link_serviceEndpointType = config.put_link_serviceEndpointType || 'str';
        this.put_link_accountName = config.put_link_accountName;
        this.put_link_accountNameType = config.put_link_accountNameType || 'str';
        this.put_link_accountKey = config.put_link_accountKey;
        this.put_link_accountKeyType = config.put_link_accountKeyType || 'str';
        this.put_link_sharedAccessSignature = config.put_link_sharedAccessSignature;
        this.put_link_sharedAccessSignatureType = config.put_link_sharedAccessSignatureType || 'str';
        this.put_link_managedIdentityId = config.put_link_managedIdentityId;
        this.put_link_managedIdentityIdType = config.put_link_managedIdentityIdType || 'str';
        this.put_link_clientId = config.put_link_clientId;
        this.put_link_clientIdType = config.put_link_clientIdType || 'str';
        this.put_link_tenantId = config.put_link_tenantId;
        this.put_link_tenantIdType = config.put_link_tenantIdType || 'str';
        this.put_link_clientSecret = config.put_link_clientSecret;
        this.put_link_clientSecretType = config.put_link_clientSecretType || 'str';
        this.put_link_clientCertificatePassword = config.put_link_clientCertificatePassword;
        this.put_link_clientCertificatePasswordType = config.put_link_clientCertificatePasswordType || 'str';
        this.put_link_endpoint = config.put_link_endpoint;
        this.put_link_endpointType = config.put_link_endpointType || 'str';
        this.put_link_applicationDefaultCredentials = config.put_link_applicationDefaultCredentials;
        this.put_link_applicationDefaultCredentialsType = config.put_link_applicationDefaultCredentialsType || 'str';
        this.put_link_jsonCredentials = config.put_link_jsonCredentials;
        this.put_link_jsonCredentialsType = config.put_link_jsonCredentialsType || 'str';
        this.delete_link_scope = config.delete_link_scope;
        this.delete_link_scopeType = config.delete_link_scopeType || 'str';
        this.delete_link_name = config.delete_link_name;
        this.delete_link_nameType = config.delete_link_nameType || 'str';
        var node = this;

        node.on('input', function (msg) {
            var errorFlag = false;
            var client;
            if (this.service && this.service.host) {
                client = new lib.AnalyticsLinksRestApi({ domain: this.service.host });
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
            if (!errorFlag && node.method === 'post_alt') {
                var post_alt_parameters = [];
                var post_alt_nodeParam;
                var post_alt_nodeParamType;

                post_alt_nodeParam = node.post_alt_dataverse;
                post_alt_nodeParamType = node.post_alt_dataverseType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.dataverse = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.dataverse = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.dataverse = !!post_alt_parameters.dataverse ? post_alt_parameters.dataverse : msg.payload;
                
                post_alt_nodeParam = node.post_alt_name;
                post_alt_nodeParamType = node.post_alt_nameType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.name = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.name = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.name = !!post_alt_parameters.name ? post_alt_parameters.name : msg.payload;
                
                post_alt_nodeParam = node.post_alt_type;
                post_alt_nodeParamType = node.post_alt_typeType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.type = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.type = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.type = !!post_alt_parameters.type ? post_alt_parameters.type : msg.payload;
                
                post_alt_nodeParam = node.post_alt_hostname;
                post_alt_nodeParamType = node.post_alt_hostnameType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.hostname = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.hostname = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.hostname = !!post_alt_parameters.hostname ? post_alt_parameters.hostname : msg.payload;
                
                post_alt_nodeParam = node.post_alt_encryption;
                post_alt_nodeParamType = node.post_alt_encryptionType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.encryption = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.encryption = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.encryption = !!post_alt_parameters.encryption ? post_alt_parameters.encryption : msg.payload;
                
                post_alt_nodeParam = node.post_alt_username;
                post_alt_nodeParamType = node.post_alt_usernameType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.username = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.username = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.username = !!post_alt_parameters.username ? post_alt_parameters.username : msg.payload;
                
                post_alt_nodeParam = node.post_alt_password;
                post_alt_nodeParamType = node.post_alt_passwordType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.password = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.password = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.password = !!post_alt_parameters.password ? post_alt_parameters.password : msg.payload;
                
                post_alt_nodeParam = node.post_alt_certificate;
                post_alt_nodeParamType = node.post_alt_certificateType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.certificate = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.certificate = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.certificate = !!post_alt_parameters.certificate ? post_alt_parameters.certificate : msg.payload;
                
                post_alt_nodeParam = node.post_alt_clientCertificate;
                post_alt_nodeParamType = node.post_alt_clientCertificateType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.clientCertificate = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.clientCertificate = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.clientCertificate = !!post_alt_parameters.clientCertificate ? post_alt_parameters.clientCertificate : msg.payload;
                
                post_alt_nodeParam = node.post_alt_clientKey;
                post_alt_nodeParamType = node.post_alt_clientKeyType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.clientKey = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.clientKey = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.clientKey = !!post_alt_parameters.clientKey ? post_alt_parameters.clientKey : msg.payload;
                
                post_alt_nodeParam = node.post_alt_accessKeyId;
                post_alt_nodeParamType = node.post_alt_accessKeyIdType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.accessKeyId = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.accessKeyId = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.accessKeyId = !!post_alt_parameters.accessKeyId ? post_alt_parameters.accessKeyId : msg.payload;
                
                post_alt_nodeParam = node.post_alt_secretAccessKey;
                post_alt_nodeParamType = node.post_alt_secretAccessKeyType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.secretAccessKey = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.secretAccessKey = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.secretAccessKey = !!post_alt_parameters.secretAccessKey ? post_alt_parameters.secretAccessKey : msg.payload;
                
                post_alt_nodeParam = node.post_alt_sessionToken;
                post_alt_nodeParamType = node.post_alt_sessionTokenType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.sessionToken = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.sessionToken = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.sessionToken = !!post_alt_parameters.sessionToken ? post_alt_parameters.sessionToken : msg.payload;
                
                post_alt_nodeParam = node.post_alt_region;
                post_alt_nodeParamType = node.post_alt_regionType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.region = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.region = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.region = !!post_alt_parameters.region ? post_alt_parameters.region : msg.payload;
                
                post_alt_nodeParam = node.post_alt_serviceEndpoint;
                post_alt_nodeParamType = node.post_alt_serviceEndpointType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.serviceEndpoint = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.serviceEndpoint = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.serviceEndpoint = !!post_alt_parameters.serviceEndpoint ? post_alt_parameters.serviceEndpoint : msg.payload;
                
                post_alt_nodeParam = node.post_alt_accountName;
                post_alt_nodeParamType = node.post_alt_accountNameType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.accountName = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.accountName = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.accountName = !!post_alt_parameters.accountName ? post_alt_parameters.accountName : msg.payload;
                
                post_alt_nodeParam = node.post_alt_accountKey;
                post_alt_nodeParamType = node.post_alt_accountKeyType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.accountKey = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.accountKey = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.accountKey = !!post_alt_parameters.accountKey ? post_alt_parameters.accountKey : msg.payload;
                
                post_alt_nodeParam = node.post_alt_sharedAccessSignature;
                post_alt_nodeParamType = node.post_alt_sharedAccessSignatureType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.sharedAccessSignature = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.sharedAccessSignature = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.sharedAccessSignature = !!post_alt_parameters.sharedAccessSignature ? post_alt_parameters.sharedAccessSignature : msg.payload;
                
                post_alt_nodeParam = node.post_alt_managedIdentityId;
                post_alt_nodeParamType = node.post_alt_managedIdentityIdType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.managedIdentityId = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.managedIdentityId = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.managedIdentityId = !!post_alt_parameters.managedIdentityId ? post_alt_parameters.managedIdentityId : msg.payload;
                
                post_alt_nodeParam = node.post_alt_clientId;
                post_alt_nodeParamType = node.post_alt_clientIdType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.clientId = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.clientId = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.clientId = !!post_alt_parameters.clientId ? post_alt_parameters.clientId : msg.payload;
                
                post_alt_nodeParam = node.post_alt_tenantId;
                post_alt_nodeParamType = node.post_alt_tenantIdType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.tenantId = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.tenantId = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.tenantId = !!post_alt_parameters.tenantId ? post_alt_parameters.tenantId : msg.payload;
                
                post_alt_nodeParam = node.post_alt_clientSecret;
                post_alt_nodeParamType = node.post_alt_clientSecretType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.clientSecret = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.clientSecret = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.clientSecret = !!post_alt_parameters.clientSecret ? post_alt_parameters.clientSecret : msg.payload;
                
                post_alt_nodeParam = node.post_alt_clientCertificatePassword;
                post_alt_nodeParamType = node.post_alt_clientCertificatePasswordType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.clientCertificatePassword = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.clientCertificatePassword = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.clientCertificatePassword = !!post_alt_parameters.clientCertificatePassword ? post_alt_parameters.clientCertificatePassword : msg.payload;
                
                post_alt_nodeParam = node.post_alt_endpoint;
                post_alt_nodeParamType = node.post_alt_endpointType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.endpoint = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.endpoint = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.endpoint = !!post_alt_parameters.endpoint ? post_alt_parameters.endpoint : msg.payload;
                
                post_alt_nodeParam = node.post_alt_applicationDefaultCredentials;
                post_alt_nodeParamType = node.post_alt_applicationDefaultCredentialsType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.applicationDefaultCredentials = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.applicationDefaultCredentials = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.applicationDefaultCredentials = !!post_alt_parameters.applicationDefaultCredentials ? post_alt_parameters.applicationDefaultCredentials : msg.payload;
                
                post_alt_nodeParam = node.post_alt_jsonCredentials;
                post_alt_nodeParamType = node.post_alt_jsonCredentialsType;
                if (post_alt_nodeParamType === 'str') {
                    post_alt_parameters.jsonCredentials = post_alt_nodeParam || '';
                } else {
                    post_alt_parameters.jsonCredentials = RED.util.getMessageProperty(msg, post_alt_nodeParam);
                }
                post_alt_parameters.jsonCredentials = !!post_alt_parameters.jsonCredentials ? post_alt_parameters.jsonCredentials : msg.payload;
                                result = client.post_alt(post_alt_parameters);
            }
            if (!errorFlag && node.method === 'get_all') {
                var get_all_parameters = [];
                var get_all_nodeParam;
                var get_all_nodeParamType;

                get_all_nodeParam = node.get_all_dataverse;
                get_all_nodeParamType = node.get_all_dataverseType;
                if (get_all_nodeParamType === 'str') {
                    get_all_parameters.dataverse = get_all_nodeParam || '';
                } else {
                    get_all_parameters.dataverse = RED.util.getMessageProperty(msg, get_all_nodeParam);
                }
                get_all_parameters.dataverse = !!get_all_parameters.dataverse ? get_all_parameters.dataverse : msg.payload;
                
                get_all_nodeParam = node.get_all_name;
                get_all_nodeParamType = node.get_all_nameType;
                if (get_all_nodeParamType === 'str') {
                    get_all_parameters.name = get_all_nodeParam || '';
                } else {
                    get_all_parameters.name = RED.util.getMessageProperty(msg, get_all_nodeParam);
                }
                get_all_parameters.name = !!get_all_parameters.name ? get_all_parameters.name : msg.payload;
                
                get_all_nodeParam = node.get_all_type;
                get_all_nodeParamType = node.get_all_typeType;
                if (get_all_nodeParamType === 'str') {
                    get_all_parameters.type = get_all_nodeParam || '';
                } else {
                    get_all_parameters.type = RED.util.getMessageProperty(msg, get_all_nodeParam);
                }
                get_all_parameters.type = !!get_all_parameters.type ? get_all_parameters.type : msg.payload;
                                result = client.get_all(get_all_parameters);
            }
            if (!errorFlag && node.method === 'put_alt') {
                var put_alt_parameters = [];
                var put_alt_nodeParam;
                var put_alt_nodeParamType;

                put_alt_nodeParam = node.put_alt_dataverse;
                put_alt_nodeParamType = node.put_alt_dataverseType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.dataverse = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.dataverse = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.dataverse = !!put_alt_parameters.dataverse ? put_alt_parameters.dataverse : msg.payload;
                
                put_alt_nodeParam = node.put_alt_name;
                put_alt_nodeParamType = node.put_alt_nameType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.name = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.name = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.name = !!put_alt_parameters.name ? put_alt_parameters.name : msg.payload;
                
                put_alt_nodeParam = node.put_alt_type;
                put_alt_nodeParamType = node.put_alt_typeType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.type = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.type = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.type = !!put_alt_parameters.type ? put_alt_parameters.type : msg.payload;
                
                put_alt_nodeParam = node.put_alt_hostname;
                put_alt_nodeParamType = node.put_alt_hostnameType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.hostname = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.hostname = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.hostname = !!put_alt_parameters.hostname ? put_alt_parameters.hostname : msg.payload;
                
                put_alt_nodeParam = node.put_alt_encryption;
                put_alt_nodeParamType = node.put_alt_encryptionType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.encryption = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.encryption = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.encryption = !!put_alt_parameters.encryption ? put_alt_parameters.encryption : msg.payload;
                
                put_alt_nodeParam = node.put_alt_username;
                put_alt_nodeParamType = node.put_alt_usernameType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.username = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.username = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.username = !!put_alt_parameters.username ? put_alt_parameters.username : msg.payload;
                
                put_alt_nodeParam = node.put_alt_password;
                put_alt_nodeParamType = node.put_alt_passwordType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.password = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.password = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.password = !!put_alt_parameters.password ? put_alt_parameters.password : msg.payload;
                
                put_alt_nodeParam = node.put_alt_certificate;
                put_alt_nodeParamType = node.put_alt_certificateType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.certificate = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.certificate = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.certificate = !!put_alt_parameters.certificate ? put_alt_parameters.certificate : msg.payload;
                
                put_alt_nodeParam = node.put_alt_clientCertificate;
                put_alt_nodeParamType = node.put_alt_clientCertificateType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.clientCertificate = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.clientCertificate = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.clientCertificate = !!put_alt_parameters.clientCertificate ? put_alt_parameters.clientCertificate : msg.payload;
                
                put_alt_nodeParam = node.put_alt_clientKey;
                put_alt_nodeParamType = node.put_alt_clientKeyType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.clientKey = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.clientKey = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.clientKey = !!put_alt_parameters.clientKey ? put_alt_parameters.clientKey : msg.payload;
                
                put_alt_nodeParam = node.put_alt_accessKeyId;
                put_alt_nodeParamType = node.put_alt_accessKeyIdType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.accessKeyId = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.accessKeyId = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.accessKeyId = !!put_alt_parameters.accessKeyId ? put_alt_parameters.accessKeyId : msg.payload;
                
                put_alt_nodeParam = node.put_alt_secretAccessKey;
                put_alt_nodeParamType = node.put_alt_secretAccessKeyType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.secretAccessKey = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.secretAccessKey = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.secretAccessKey = !!put_alt_parameters.secretAccessKey ? put_alt_parameters.secretAccessKey : msg.payload;
                
                put_alt_nodeParam = node.put_alt_sessionToken;
                put_alt_nodeParamType = node.put_alt_sessionTokenType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.sessionToken = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.sessionToken = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.sessionToken = !!put_alt_parameters.sessionToken ? put_alt_parameters.sessionToken : msg.payload;
                
                put_alt_nodeParam = node.put_alt_region;
                put_alt_nodeParamType = node.put_alt_regionType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.region = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.region = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.region = !!put_alt_parameters.region ? put_alt_parameters.region : msg.payload;
                
                put_alt_nodeParam = node.put_alt_serviceEndpoint;
                put_alt_nodeParamType = node.put_alt_serviceEndpointType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.serviceEndpoint = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.serviceEndpoint = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.serviceEndpoint = !!put_alt_parameters.serviceEndpoint ? put_alt_parameters.serviceEndpoint : msg.payload;
                
                put_alt_nodeParam = node.put_alt_accountName;
                put_alt_nodeParamType = node.put_alt_accountNameType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.accountName = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.accountName = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.accountName = !!put_alt_parameters.accountName ? put_alt_parameters.accountName : msg.payload;
                
                put_alt_nodeParam = node.put_alt_accountKey;
                put_alt_nodeParamType = node.put_alt_accountKeyType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.accountKey = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.accountKey = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.accountKey = !!put_alt_parameters.accountKey ? put_alt_parameters.accountKey : msg.payload;
                
                put_alt_nodeParam = node.put_alt_sharedAccessSignature;
                put_alt_nodeParamType = node.put_alt_sharedAccessSignatureType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.sharedAccessSignature = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.sharedAccessSignature = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.sharedAccessSignature = !!put_alt_parameters.sharedAccessSignature ? put_alt_parameters.sharedAccessSignature : msg.payload;
                
                put_alt_nodeParam = node.put_alt_managedIdentityId;
                put_alt_nodeParamType = node.put_alt_managedIdentityIdType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.managedIdentityId = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.managedIdentityId = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.managedIdentityId = !!put_alt_parameters.managedIdentityId ? put_alt_parameters.managedIdentityId : msg.payload;
                
                put_alt_nodeParam = node.put_alt_clientId;
                put_alt_nodeParamType = node.put_alt_clientIdType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.clientId = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.clientId = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.clientId = !!put_alt_parameters.clientId ? put_alt_parameters.clientId : msg.payload;
                
                put_alt_nodeParam = node.put_alt_tenantId;
                put_alt_nodeParamType = node.put_alt_tenantIdType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.tenantId = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.tenantId = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.tenantId = !!put_alt_parameters.tenantId ? put_alt_parameters.tenantId : msg.payload;
                
                put_alt_nodeParam = node.put_alt_clientSecret;
                put_alt_nodeParamType = node.put_alt_clientSecretType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.clientSecret = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.clientSecret = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.clientSecret = !!put_alt_parameters.clientSecret ? put_alt_parameters.clientSecret : msg.payload;
                
                put_alt_nodeParam = node.put_alt_clientCertificatePassword;
                put_alt_nodeParamType = node.put_alt_clientCertificatePasswordType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.clientCertificatePassword = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.clientCertificatePassword = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.clientCertificatePassword = !!put_alt_parameters.clientCertificatePassword ? put_alt_parameters.clientCertificatePassword : msg.payload;
                
                put_alt_nodeParam = node.put_alt_endpoint;
                put_alt_nodeParamType = node.put_alt_endpointType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.endpoint = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.endpoint = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.endpoint = !!put_alt_parameters.endpoint ? put_alt_parameters.endpoint : msg.payload;
                
                put_alt_nodeParam = node.put_alt_applicationDefaultCredentials;
                put_alt_nodeParamType = node.put_alt_applicationDefaultCredentialsType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.applicationDefaultCredentials = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.applicationDefaultCredentials = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.applicationDefaultCredentials = !!put_alt_parameters.applicationDefaultCredentials ? put_alt_parameters.applicationDefaultCredentials : msg.payload;
                
                put_alt_nodeParam = node.put_alt_jsonCredentials;
                put_alt_nodeParamType = node.put_alt_jsonCredentialsType;
                if (put_alt_nodeParamType === 'str') {
                    put_alt_parameters.jsonCredentials = put_alt_nodeParam || '';
                } else {
                    put_alt_parameters.jsonCredentials = RED.util.getMessageProperty(msg, put_alt_nodeParam);
                }
                put_alt_parameters.jsonCredentials = !!put_alt_parameters.jsonCredentials ? put_alt_parameters.jsonCredentials : msg.payload;
                                result = client.put_alt(put_alt_parameters);
            }
            if (!errorFlag && node.method === 'delete_alt') {
                var delete_alt_parameters = [];
                var delete_alt_nodeParam;
                var delete_alt_nodeParamType;

                delete_alt_nodeParam = node.delete_alt_dataverse;
                delete_alt_nodeParamType = node.delete_alt_dataverseType;
                if (delete_alt_nodeParamType === 'str') {
                    delete_alt_parameters.dataverse = delete_alt_nodeParam || '';
                } else {
                    delete_alt_parameters.dataverse = RED.util.getMessageProperty(msg, delete_alt_nodeParam);
                }
                delete_alt_parameters.dataverse = !!delete_alt_parameters.dataverse ? delete_alt_parameters.dataverse : msg.payload;
                
                delete_alt_nodeParam = node.delete_alt_name;
                delete_alt_nodeParamType = node.delete_alt_nameType;
                if (delete_alt_nodeParamType === 'str') {
                    delete_alt_parameters.name = delete_alt_nodeParam || '';
                } else {
                    delete_alt_parameters.name = RED.util.getMessageProperty(msg, delete_alt_nodeParam);
                }
                delete_alt_parameters.name = !!delete_alt_parameters.name ? delete_alt_parameters.name : msg.payload;
                                result = client.delete_alt(delete_alt_parameters);
            }
            if (!errorFlag && node.method === 'get_scope') {
                var get_scope_parameters = [];
                var get_scope_nodeParam;
                var get_scope_nodeParamType;

                get_scope_nodeParam = node.get_scope_scope;
                get_scope_nodeParamType = node.get_scope_scopeType;
                if (get_scope_nodeParamType === 'str') {
                    get_scope_parameters.scope = get_scope_nodeParam || '';
                } else {
                    get_scope_parameters.scope = RED.util.getMessageProperty(msg, get_scope_nodeParam);
                }
                get_scope_parameters.scope = !!get_scope_parameters.scope ? get_scope_parameters.scope : msg.payload;
                
                get_scope_nodeParam = node.get_scope_type;
                get_scope_nodeParamType = node.get_scope_typeType;
                if (get_scope_nodeParamType === 'str') {
                    get_scope_parameters.type = get_scope_nodeParam || '';
                } else {
                    get_scope_parameters.type = RED.util.getMessageProperty(msg, get_scope_nodeParam);
                }
                get_scope_parameters.type = !!get_scope_parameters.type ? get_scope_parameters.type : msg.payload;
                                result = client.get_scope(get_scope_parameters);
            }
            if (!errorFlag && node.method === 'post_link') {
                var post_link_parameters = [];
                var post_link_nodeParam;
                var post_link_nodeParamType;

                post_link_nodeParam = node.post_link_scope;
                post_link_nodeParamType = node.post_link_scopeType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.scope = post_link_nodeParam || '';
                } else {
                    post_link_parameters.scope = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.scope = !!post_link_parameters.scope ? post_link_parameters.scope : msg.payload;
                
                post_link_nodeParam = node.post_link_name;
                post_link_nodeParamType = node.post_link_nameType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.name = post_link_nodeParam || '';
                } else {
                    post_link_parameters.name = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.name = !!post_link_parameters.name ? post_link_parameters.name : msg.payload;
                
                post_link_nodeParam = node.post_link_type;
                post_link_nodeParamType = node.post_link_typeType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.type = post_link_nodeParam || '';
                } else {
                    post_link_parameters.type = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.type = !!post_link_parameters.type ? post_link_parameters.type : msg.payload;
                
                post_link_nodeParam = node.post_link_hostname;
                post_link_nodeParamType = node.post_link_hostnameType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.hostname = post_link_nodeParam || '';
                } else {
                    post_link_parameters.hostname = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.hostname = !!post_link_parameters.hostname ? post_link_parameters.hostname : msg.payload;
                
                post_link_nodeParam = node.post_link_encryption;
                post_link_nodeParamType = node.post_link_encryptionType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.encryption = post_link_nodeParam || '';
                } else {
                    post_link_parameters.encryption = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.encryption = !!post_link_parameters.encryption ? post_link_parameters.encryption : msg.payload;
                
                post_link_nodeParam = node.post_link_username;
                post_link_nodeParamType = node.post_link_usernameType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.username = post_link_nodeParam || '';
                } else {
                    post_link_parameters.username = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.username = !!post_link_parameters.username ? post_link_parameters.username : msg.payload;
                
                post_link_nodeParam = node.post_link_password;
                post_link_nodeParamType = node.post_link_passwordType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.password = post_link_nodeParam || '';
                } else {
                    post_link_parameters.password = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.password = !!post_link_parameters.password ? post_link_parameters.password : msg.payload;
                
                post_link_nodeParam = node.post_link_certificate;
                post_link_nodeParamType = node.post_link_certificateType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.certificate = post_link_nodeParam || '';
                } else {
                    post_link_parameters.certificate = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.certificate = !!post_link_parameters.certificate ? post_link_parameters.certificate : msg.payload;
                
                post_link_nodeParam = node.post_link_clientCertificate;
                post_link_nodeParamType = node.post_link_clientCertificateType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.clientCertificate = post_link_nodeParam || '';
                } else {
                    post_link_parameters.clientCertificate = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.clientCertificate = !!post_link_parameters.clientCertificate ? post_link_parameters.clientCertificate : msg.payload;
                
                post_link_nodeParam = node.post_link_clientKey;
                post_link_nodeParamType = node.post_link_clientKeyType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.clientKey = post_link_nodeParam || '';
                } else {
                    post_link_parameters.clientKey = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.clientKey = !!post_link_parameters.clientKey ? post_link_parameters.clientKey : msg.payload;
                
                post_link_nodeParam = node.post_link_accessKeyId;
                post_link_nodeParamType = node.post_link_accessKeyIdType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.accessKeyId = post_link_nodeParam || '';
                } else {
                    post_link_parameters.accessKeyId = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.accessKeyId = !!post_link_parameters.accessKeyId ? post_link_parameters.accessKeyId : msg.payload;
                
                post_link_nodeParam = node.post_link_secretAccessKey;
                post_link_nodeParamType = node.post_link_secretAccessKeyType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.secretAccessKey = post_link_nodeParam || '';
                } else {
                    post_link_parameters.secretAccessKey = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.secretAccessKey = !!post_link_parameters.secretAccessKey ? post_link_parameters.secretAccessKey : msg.payload;
                
                post_link_nodeParam = node.post_link_sessionToken;
                post_link_nodeParamType = node.post_link_sessionTokenType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.sessionToken = post_link_nodeParam || '';
                } else {
                    post_link_parameters.sessionToken = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.sessionToken = !!post_link_parameters.sessionToken ? post_link_parameters.sessionToken : msg.payload;
                
                post_link_nodeParam = node.post_link_region;
                post_link_nodeParamType = node.post_link_regionType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.region = post_link_nodeParam || '';
                } else {
                    post_link_parameters.region = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.region = !!post_link_parameters.region ? post_link_parameters.region : msg.payload;
                
                post_link_nodeParam = node.post_link_serviceEndpoint;
                post_link_nodeParamType = node.post_link_serviceEndpointType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.serviceEndpoint = post_link_nodeParam || '';
                } else {
                    post_link_parameters.serviceEndpoint = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.serviceEndpoint = !!post_link_parameters.serviceEndpoint ? post_link_parameters.serviceEndpoint : msg.payload;
                
                post_link_nodeParam = node.post_link_accountName;
                post_link_nodeParamType = node.post_link_accountNameType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.accountName = post_link_nodeParam || '';
                } else {
                    post_link_parameters.accountName = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.accountName = !!post_link_parameters.accountName ? post_link_parameters.accountName : msg.payload;
                
                post_link_nodeParam = node.post_link_accountKey;
                post_link_nodeParamType = node.post_link_accountKeyType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.accountKey = post_link_nodeParam || '';
                } else {
                    post_link_parameters.accountKey = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.accountKey = !!post_link_parameters.accountKey ? post_link_parameters.accountKey : msg.payload;
                
                post_link_nodeParam = node.post_link_sharedAccessSignature;
                post_link_nodeParamType = node.post_link_sharedAccessSignatureType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.sharedAccessSignature = post_link_nodeParam || '';
                } else {
                    post_link_parameters.sharedAccessSignature = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.sharedAccessSignature = !!post_link_parameters.sharedAccessSignature ? post_link_parameters.sharedAccessSignature : msg.payload;
                
                post_link_nodeParam = node.post_link_managedIdentityId;
                post_link_nodeParamType = node.post_link_managedIdentityIdType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.managedIdentityId = post_link_nodeParam || '';
                } else {
                    post_link_parameters.managedIdentityId = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.managedIdentityId = !!post_link_parameters.managedIdentityId ? post_link_parameters.managedIdentityId : msg.payload;
                
                post_link_nodeParam = node.post_link_clientId;
                post_link_nodeParamType = node.post_link_clientIdType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.clientId = post_link_nodeParam || '';
                } else {
                    post_link_parameters.clientId = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.clientId = !!post_link_parameters.clientId ? post_link_parameters.clientId : msg.payload;
                
                post_link_nodeParam = node.post_link_tenantId;
                post_link_nodeParamType = node.post_link_tenantIdType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.tenantId = post_link_nodeParam || '';
                } else {
                    post_link_parameters.tenantId = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.tenantId = !!post_link_parameters.tenantId ? post_link_parameters.tenantId : msg.payload;
                
                post_link_nodeParam = node.post_link_clientSecret;
                post_link_nodeParamType = node.post_link_clientSecretType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.clientSecret = post_link_nodeParam || '';
                } else {
                    post_link_parameters.clientSecret = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.clientSecret = !!post_link_parameters.clientSecret ? post_link_parameters.clientSecret : msg.payload;
                
                post_link_nodeParam = node.post_link_clientCertificatePassword;
                post_link_nodeParamType = node.post_link_clientCertificatePasswordType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.clientCertificatePassword = post_link_nodeParam || '';
                } else {
                    post_link_parameters.clientCertificatePassword = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.clientCertificatePassword = !!post_link_parameters.clientCertificatePassword ? post_link_parameters.clientCertificatePassword : msg.payload;
                
                post_link_nodeParam = node.post_link_endpoint;
                post_link_nodeParamType = node.post_link_endpointType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.endpoint = post_link_nodeParam || '';
                } else {
                    post_link_parameters.endpoint = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.endpoint = !!post_link_parameters.endpoint ? post_link_parameters.endpoint : msg.payload;
                
                post_link_nodeParam = node.post_link_applicationDefaultCredentials;
                post_link_nodeParamType = node.post_link_applicationDefaultCredentialsType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.applicationDefaultCredentials = post_link_nodeParam || '';
                } else {
                    post_link_parameters.applicationDefaultCredentials = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.applicationDefaultCredentials = !!post_link_parameters.applicationDefaultCredentials ? post_link_parameters.applicationDefaultCredentials : msg.payload;
                
                post_link_nodeParam = node.post_link_jsonCredentials;
                post_link_nodeParamType = node.post_link_jsonCredentialsType;
                if (post_link_nodeParamType === 'str') {
                    post_link_parameters.jsonCredentials = post_link_nodeParam || '';
                } else {
                    post_link_parameters.jsonCredentials = RED.util.getMessageProperty(msg, post_link_nodeParam);
                }
                post_link_parameters.jsonCredentials = !!post_link_parameters.jsonCredentials ? post_link_parameters.jsonCredentials : msg.payload;
                                result = client.post_link(post_link_parameters);
            }
            if (!errorFlag && node.method === 'get_link') {
                var get_link_parameters = [];
                var get_link_nodeParam;
                var get_link_nodeParamType;

                get_link_nodeParam = node.get_link_scope;
                get_link_nodeParamType = node.get_link_scopeType;
                if (get_link_nodeParamType === 'str') {
                    get_link_parameters.scope = get_link_nodeParam || '';
                } else {
                    get_link_parameters.scope = RED.util.getMessageProperty(msg, get_link_nodeParam);
                }
                get_link_parameters.scope = !!get_link_parameters.scope ? get_link_parameters.scope : msg.payload;
                
                get_link_nodeParam = node.get_link_name;
                get_link_nodeParamType = node.get_link_nameType;
                if (get_link_nodeParamType === 'str') {
                    get_link_parameters.name = get_link_nodeParam || '';
                } else {
                    get_link_parameters.name = RED.util.getMessageProperty(msg, get_link_nodeParam);
                }
                get_link_parameters.name = !!get_link_parameters.name ? get_link_parameters.name : msg.payload;
                
                get_link_nodeParam = node.get_link_type;
                get_link_nodeParamType = node.get_link_typeType;
                if (get_link_nodeParamType === 'str') {
                    get_link_parameters.type = get_link_nodeParam || '';
                } else {
                    get_link_parameters.type = RED.util.getMessageProperty(msg, get_link_nodeParam);
                }
                get_link_parameters.type = !!get_link_parameters.type ? get_link_parameters.type : msg.payload;
                                result = client.get_link(get_link_parameters);
            }
            if (!errorFlag && node.method === 'put_link') {
                var put_link_parameters = [];
                var put_link_nodeParam;
                var put_link_nodeParamType;

                put_link_nodeParam = node.put_link_scope;
                put_link_nodeParamType = node.put_link_scopeType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.scope = put_link_nodeParam || '';
                } else {
                    put_link_parameters.scope = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.scope = !!put_link_parameters.scope ? put_link_parameters.scope : msg.payload;
                
                put_link_nodeParam = node.put_link_name;
                put_link_nodeParamType = node.put_link_nameType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.name = put_link_nodeParam || '';
                } else {
                    put_link_parameters.name = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.name = !!put_link_parameters.name ? put_link_parameters.name : msg.payload;
                
                put_link_nodeParam = node.put_link_type;
                put_link_nodeParamType = node.put_link_typeType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.type = put_link_nodeParam || '';
                } else {
                    put_link_parameters.type = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.type = !!put_link_parameters.type ? put_link_parameters.type : msg.payload;
                
                put_link_nodeParam = node.put_link_hostname;
                put_link_nodeParamType = node.put_link_hostnameType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.hostname = put_link_nodeParam || '';
                } else {
                    put_link_parameters.hostname = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.hostname = !!put_link_parameters.hostname ? put_link_parameters.hostname : msg.payload;
                
                put_link_nodeParam = node.put_link_encryption;
                put_link_nodeParamType = node.put_link_encryptionType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.encryption = put_link_nodeParam || '';
                } else {
                    put_link_parameters.encryption = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.encryption = !!put_link_parameters.encryption ? put_link_parameters.encryption : msg.payload;
                
                put_link_nodeParam = node.put_link_username;
                put_link_nodeParamType = node.put_link_usernameType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.username = put_link_nodeParam || '';
                } else {
                    put_link_parameters.username = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.username = !!put_link_parameters.username ? put_link_parameters.username : msg.payload;
                
                put_link_nodeParam = node.put_link_password;
                put_link_nodeParamType = node.put_link_passwordType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.password = put_link_nodeParam || '';
                } else {
                    put_link_parameters.password = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.password = !!put_link_parameters.password ? put_link_parameters.password : msg.payload;
                
                put_link_nodeParam = node.put_link_certificate;
                put_link_nodeParamType = node.put_link_certificateType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.certificate = put_link_nodeParam || '';
                } else {
                    put_link_parameters.certificate = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.certificate = !!put_link_parameters.certificate ? put_link_parameters.certificate : msg.payload;
                
                put_link_nodeParam = node.put_link_clientCertificate;
                put_link_nodeParamType = node.put_link_clientCertificateType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.clientCertificate = put_link_nodeParam || '';
                } else {
                    put_link_parameters.clientCertificate = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.clientCertificate = !!put_link_parameters.clientCertificate ? put_link_parameters.clientCertificate : msg.payload;
                
                put_link_nodeParam = node.put_link_clientKey;
                put_link_nodeParamType = node.put_link_clientKeyType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.clientKey = put_link_nodeParam || '';
                } else {
                    put_link_parameters.clientKey = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.clientKey = !!put_link_parameters.clientKey ? put_link_parameters.clientKey : msg.payload;
                
                put_link_nodeParam = node.put_link_accessKeyId;
                put_link_nodeParamType = node.put_link_accessKeyIdType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.accessKeyId = put_link_nodeParam || '';
                } else {
                    put_link_parameters.accessKeyId = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.accessKeyId = !!put_link_parameters.accessKeyId ? put_link_parameters.accessKeyId : msg.payload;
                
                put_link_nodeParam = node.put_link_secretAccessKey;
                put_link_nodeParamType = node.put_link_secretAccessKeyType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.secretAccessKey = put_link_nodeParam || '';
                } else {
                    put_link_parameters.secretAccessKey = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.secretAccessKey = !!put_link_parameters.secretAccessKey ? put_link_parameters.secretAccessKey : msg.payload;
                
                put_link_nodeParam = node.put_link_sessionToken;
                put_link_nodeParamType = node.put_link_sessionTokenType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.sessionToken = put_link_nodeParam || '';
                } else {
                    put_link_parameters.sessionToken = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.sessionToken = !!put_link_parameters.sessionToken ? put_link_parameters.sessionToken : msg.payload;
                
                put_link_nodeParam = node.put_link_region;
                put_link_nodeParamType = node.put_link_regionType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.region = put_link_nodeParam || '';
                } else {
                    put_link_parameters.region = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.region = !!put_link_parameters.region ? put_link_parameters.region : msg.payload;
                
                put_link_nodeParam = node.put_link_serviceEndpoint;
                put_link_nodeParamType = node.put_link_serviceEndpointType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.serviceEndpoint = put_link_nodeParam || '';
                } else {
                    put_link_parameters.serviceEndpoint = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.serviceEndpoint = !!put_link_parameters.serviceEndpoint ? put_link_parameters.serviceEndpoint : msg.payload;
                
                put_link_nodeParam = node.put_link_accountName;
                put_link_nodeParamType = node.put_link_accountNameType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.accountName = put_link_nodeParam || '';
                } else {
                    put_link_parameters.accountName = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.accountName = !!put_link_parameters.accountName ? put_link_parameters.accountName : msg.payload;
                
                put_link_nodeParam = node.put_link_accountKey;
                put_link_nodeParamType = node.put_link_accountKeyType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.accountKey = put_link_nodeParam || '';
                } else {
                    put_link_parameters.accountKey = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.accountKey = !!put_link_parameters.accountKey ? put_link_parameters.accountKey : msg.payload;
                
                put_link_nodeParam = node.put_link_sharedAccessSignature;
                put_link_nodeParamType = node.put_link_sharedAccessSignatureType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.sharedAccessSignature = put_link_nodeParam || '';
                } else {
                    put_link_parameters.sharedAccessSignature = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.sharedAccessSignature = !!put_link_parameters.sharedAccessSignature ? put_link_parameters.sharedAccessSignature : msg.payload;
                
                put_link_nodeParam = node.put_link_managedIdentityId;
                put_link_nodeParamType = node.put_link_managedIdentityIdType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.managedIdentityId = put_link_nodeParam || '';
                } else {
                    put_link_parameters.managedIdentityId = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.managedIdentityId = !!put_link_parameters.managedIdentityId ? put_link_parameters.managedIdentityId : msg.payload;
                
                put_link_nodeParam = node.put_link_clientId;
                put_link_nodeParamType = node.put_link_clientIdType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.clientId = put_link_nodeParam || '';
                } else {
                    put_link_parameters.clientId = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.clientId = !!put_link_parameters.clientId ? put_link_parameters.clientId : msg.payload;
                
                put_link_nodeParam = node.put_link_tenantId;
                put_link_nodeParamType = node.put_link_tenantIdType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.tenantId = put_link_nodeParam || '';
                } else {
                    put_link_parameters.tenantId = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.tenantId = !!put_link_parameters.tenantId ? put_link_parameters.tenantId : msg.payload;
                
                put_link_nodeParam = node.put_link_clientSecret;
                put_link_nodeParamType = node.put_link_clientSecretType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.clientSecret = put_link_nodeParam || '';
                } else {
                    put_link_parameters.clientSecret = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.clientSecret = !!put_link_parameters.clientSecret ? put_link_parameters.clientSecret : msg.payload;
                
                put_link_nodeParam = node.put_link_clientCertificatePassword;
                put_link_nodeParamType = node.put_link_clientCertificatePasswordType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.clientCertificatePassword = put_link_nodeParam || '';
                } else {
                    put_link_parameters.clientCertificatePassword = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.clientCertificatePassword = !!put_link_parameters.clientCertificatePassword ? put_link_parameters.clientCertificatePassword : msg.payload;
                
                put_link_nodeParam = node.put_link_endpoint;
                put_link_nodeParamType = node.put_link_endpointType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.endpoint = put_link_nodeParam || '';
                } else {
                    put_link_parameters.endpoint = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.endpoint = !!put_link_parameters.endpoint ? put_link_parameters.endpoint : msg.payload;
                
                put_link_nodeParam = node.put_link_applicationDefaultCredentials;
                put_link_nodeParamType = node.put_link_applicationDefaultCredentialsType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.applicationDefaultCredentials = put_link_nodeParam || '';
                } else {
                    put_link_parameters.applicationDefaultCredentials = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.applicationDefaultCredentials = !!put_link_parameters.applicationDefaultCredentials ? put_link_parameters.applicationDefaultCredentials : msg.payload;
                
                put_link_nodeParam = node.put_link_jsonCredentials;
                put_link_nodeParamType = node.put_link_jsonCredentialsType;
                if (put_link_nodeParamType === 'str') {
                    put_link_parameters.jsonCredentials = put_link_nodeParam || '';
                } else {
                    put_link_parameters.jsonCredentials = RED.util.getMessageProperty(msg, put_link_nodeParam);
                }
                put_link_parameters.jsonCredentials = !!put_link_parameters.jsonCredentials ? put_link_parameters.jsonCredentials : msg.payload;
                                result = client.put_link(put_link_parameters);
            }
            if (!errorFlag && node.method === 'delete_link') {
                var delete_link_parameters = [];
                var delete_link_nodeParam;
                var delete_link_nodeParamType;

                delete_link_nodeParam = node.delete_link_scope;
                delete_link_nodeParamType = node.delete_link_scopeType;
                if (delete_link_nodeParamType === 'str') {
                    delete_link_parameters.scope = delete_link_nodeParam || '';
                } else {
                    delete_link_parameters.scope = RED.util.getMessageProperty(msg, delete_link_nodeParam);
                }
                delete_link_parameters.scope = !!delete_link_parameters.scope ? delete_link_parameters.scope : msg.payload;
                
                delete_link_nodeParam = node.delete_link_name;
                delete_link_nodeParamType = node.delete_link_nameType;
                if (delete_link_nodeParamType === 'str') {
                    delete_link_parameters.name = delete_link_nodeParam || '';
                } else {
                    delete_link_parameters.name = RED.util.getMessageProperty(msg, delete_link_nodeParam);
                }
                delete_link_parameters.name = !!delete_link_parameters.name ? delete_link_parameters.name : msg.payload;
                                result = client.delete_link(delete_link_parameters);
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
                node.status({ fill: 'blue', shape: 'dot', text: 'AnalyticsLinksRestApi.status.requesting' });
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

    RED.nodes.registerType('analytics-links-rest-api', AnalyticsLinksRestApiNode);
    function AnalyticsLinksRestApiServiceNode(n) {
        RED.nodes.createNode(this, n);
        this.host = n.host;

        this.username = n.username;
        this.password = n.password;
    }

    RED.nodes.registerType('analytics-links-rest-api-service', AnalyticsLinksRestApiServiceNode, {
        credentials: {
            username: { type: 'text' },
            password: { type: 'password' },
            temp: { type: 'text' }
        }
    });
};
