var should = require('should');
var helper = require('node-red-node-test-helper');
var node = require('../analytics-links/node.js');

helper.init(require.resolve('node-red'));

describe('analytics-links-rest-api node', function () {

    before(function (done) {
        helper.startServer(done);
    });

    after(function (done) {
        helper.stopServer(done);
    });

    afterEach(function () {
        helper.unload();
    });

    it('should be loaded', function (done) {
        var flow = [{ id: 'n1', type: 'analytics-links-rest-api', name: 'analytics-links-rest-api' }];
        helper.load(node, flow, function () {
            var n1 = helper.getNode('n1');
            n1.should.have.property('name', 'analytics-links-rest-api');
            done();
        });
    });

    it('should handle post_alt()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'analytics-links-rest-api', name: 'analytics-links-rest-api',
                method: 'post_alt',
                post_alt_dataverse: '<node property>', // (1) define node properties
                post_alt_name: '<node property>', // (1) define node properties
                post_alt_type: '<node property>', // (1) define node properties
                post_alt_hostname: '<node property>', // (1) define node properties
                post_alt_encryption: '<node property>', // (1) define node properties
                post_alt_username: '<node property>', // (1) define node properties
                post_alt_password: '<node property>', // (1) define node properties
                post_alt_certificate: '<node property>', // (1) define node properties
                post_alt_clientCertificate: '<node property>', // (1) define node properties
                post_alt_clientKey: '<node property>', // (1) define node properties
                post_alt_accessKeyId: '<node property>', // (1) define node properties
                post_alt_secretAccessKey: '<node property>', // (1) define node properties
                post_alt_sessionToken: '<node property>', // (1) define node properties
                post_alt_region: '<node property>', // (1) define node properties
                post_alt_serviceEndpoint: '<node property>', // (1) define node properties
                post_alt_accountName: '<node property>', // (1) define node properties
                post_alt_accountKey: '<node property>', // (1) define node properties
                post_alt_sharedAccessSignature: '<node property>', // (1) define node properties
                post_alt_managedIdentityId: '<node property>', // (1) define node properties
                post_alt_clientId: '<node property>', // (1) define node properties
                post_alt_tenantId: '<node property>', // (1) define node properties
                post_alt_clientSecret: '<node property>', // (1) define node properties
                post_alt_clientCertificatePassword: '<node property>', // (1) define node properties
                post_alt_endpoint: '<node property>', // (1) define node properties
                post_alt_applicationDefaultCredentials: '<node property>', // (1) define node properties
                post_alt_jsonCredentials: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'analytics-links-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle get_all()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'analytics-links-rest-api', name: 'analytics-links-rest-api',
                method: 'get_all',
                get_all_dataverse: '<node property>', // (1) define node properties
                get_all_name: '<node property>', // (1) define node properties
                get_all_type: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'analytics-links-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle put_alt()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'analytics-links-rest-api', name: 'analytics-links-rest-api',
                method: 'put_alt',
                put_alt_dataverse: '<node property>', // (1) define node properties
                put_alt_name: '<node property>', // (1) define node properties
                put_alt_type: '<node property>', // (1) define node properties
                put_alt_hostname: '<node property>', // (1) define node properties
                put_alt_encryption: '<node property>', // (1) define node properties
                put_alt_username: '<node property>', // (1) define node properties
                put_alt_password: '<node property>', // (1) define node properties
                put_alt_certificate: '<node property>', // (1) define node properties
                put_alt_clientCertificate: '<node property>', // (1) define node properties
                put_alt_clientKey: '<node property>', // (1) define node properties
                put_alt_accessKeyId: '<node property>', // (1) define node properties
                put_alt_secretAccessKey: '<node property>', // (1) define node properties
                put_alt_sessionToken: '<node property>', // (1) define node properties
                put_alt_region: '<node property>', // (1) define node properties
                put_alt_serviceEndpoint: '<node property>', // (1) define node properties
                put_alt_accountName: '<node property>', // (1) define node properties
                put_alt_accountKey: '<node property>', // (1) define node properties
                put_alt_sharedAccessSignature: '<node property>', // (1) define node properties
                put_alt_managedIdentityId: '<node property>', // (1) define node properties
                put_alt_clientId: '<node property>', // (1) define node properties
                put_alt_tenantId: '<node property>', // (1) define node properties
                put_alt_clientSecret: '<node property>', // (1) define node properties
                put_alt_clientCertificatePassword: '<node property>', // (1) define node properties
                put_alt_endpoint: '<node property>', // (1) define node properties
                put_alt_applicationDefaultCredentials: '<node property>', // (1) define node properties
                put_alt_jsonCredentials: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'analytics-links-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle delete_alt()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'analytics-links-rest-api', name: 'analytics-links-rest-api',
                method: 'delete_alt',
                delete_alt_dataverse: '<node property>', // (1) define node properties
                delete_alt_name: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'analytics-links-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle get_scope()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'analytics-links-rest-api', name: 'analytics-links-rest-api',
                method: 'get_scope',
                get_scope_scope: '<node property>', // (1) define node properties
                get_scope_type: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'analytics-links-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle post_link()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'analytics-links-rest-api', name: 'analytics-links-rest-api',
                method: 'post_link',
                post_link_scope: '<node property>', // (1) define node properties
                post_link_name: '<node property>', // (1) define node properties
                post_link_type: '<node property>', // (1) define node properties
                post_link_hostname: '<node property>', // (1) define node properties
                post_link_encryption: '<node property>', // (1) define node properties
                post_link_username: '<node property>', // (1) define node properties
                post_link_password: '<node property>', // (1) define node properties
                post_link_certificate: '<node property>', // (1) define node properties
                post_link_clientCertificate: '<node property>', // (1) define node properties
                post_link_clientKey: '<node property>', // (1) define node properties
                post_link_accessKeyId: '<node property>', // (1) define node properties
                post_link_secretAccessKey: '<node property>', // (1) define node properties
                post_link_sessionToken: '<node property>', // (1) define node properties
                post_link_region: '<node property>', // (1) define node properties
                post_link_serviceEndpoint: '<node property>', // (1) define node properties
                post_link_accountName: '<node property>', // (1) define node properties
                post_link_accountKey: '<node property>', // (1) define node properties
                post_link_sharedAccessSignature: '<node property>', // (1) define node properties
                post_link_managedIdentityId: '<node property>', // (1) define node properties
                post_link_clientId: '<node property>', // (1) define node properties
                post_link_tenantId: '<node property>', // (1) define node properties
                post_link_clientSecret: '<node property>', // (1) define node properties
                post_link_clientCertificatePassword: '<node property>', // (1) define node properties
                post_link_endpoint: '<node property>', // (1) define node properties
                post_link_applicationDefaultCredentials: '<node property>', // (1) define node properties
                post_link_jsonCredentials: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'analytics-links-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle get_link()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'analytics-links-rest-api', name: 'analytics-links-rest-api',
                method: 'get_link',
                get_link_scope: '<node property>', // (1) define node properties
                get_link_name: '<node property>', // (1) define node properties
                get_link_type: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'analytics-links-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle put_link()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'analytics-links-rest-api', name: 'analytics-links-rest-api',
                method: 'put_link',
                put_link_scope: '<node property>', // (1) define node properties
                put_link_name: '<node property>', // (1) define node properties
                put_link_type: '<node property>', // (1) define node properties
                put_link_hostname: '<node property>', // (1) define node properties
                put_link_encryption: '<node property>', // (1) define node properties
                put_link_username: '<node property>', // (1) define node properties
                put_link_password: '<node property>', // (1) define node properties
                put_link_certificate: '<node property>', // (1) define node properties
                put_link_clientCertificate: '<node property>', // (1) define node properties
                put_link_clientKey: '<node property>', // (1) define node properties
                put_link_accessKeyId: '<node property>', // (1) define node properties
                put_link_secretAccessKey: '<node property>', // (1) define node properties
                put_link_sessionToken: '<node property>', // (1) define node properties
                put_link_region: '<node property>', // (1) define node properties
                put_link_serviceEndpoint: '<node property>', // (1) define node properties
                put_link_accountName: '<node property>', // (1) define node properties
                put_link_accountKey: '<node property>', // (1) define node properties
                put_link_sharedAccessSignature: '<node property>', // (1) define node properties
                put_link_managedIdentityId: '<node property>', // (1) define node properties
                put_link_clientId: '<node property>', // (1) define node properties
                put_link_tenantId: '<node property>', // (1) define node properties
                put_link_clientSecret: '<node property>', // (1) define node properties
                put_link_clientCertificatePassword: '<node property>', // (1) define node properties
                put_link_endpoint: '<node property>', // (1) define node properties
                put_link_applicationDefaultCredentials: '<node property>', // (1) define node properties
                put_link_jsonCredentials: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'analytics-links-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle delete_link()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'analytics-links-rest-api', name: 'analytics-links-rest-api',
                method: 'delete_link',
                delete_link_scope: '<node property>', // (1) define node properties
                delete_link_name: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'analytics-links-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
});
