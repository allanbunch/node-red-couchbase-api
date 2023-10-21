var should = require('should');
var helper = require('node-red-node-test-helper');
var node = require('../analytics-library/node.js');

helper.init(require.resolve('node-red'));

describe('analytics-library-rest-api node', function () {

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
        var flow = [{ id: 'n1', type: 'analytics-library-rest-api', name: 'analytics-library-rest-api' }];
        helper.load(node, flow, function () {
            var n1 = helper.getNode('n1');
            n1.should.have.property('name', 'analytics-library-rest-api');
            done();
        });
    });

    it('should handle get_collection()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'analytics-library-rest-api', name: 'analytics-library-rest-api',
                method: 'get_collection',
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'analytics-library-rest-api-service', host: 'http://<host name>' }, // (4) define host name
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
    it('should handle post_library()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'analytics-library-rest-api', name: 'analytics-library-rest-api',
                method: 'post_library',
                post_library_data: '<node property>', // (1) define node properties
                post_library_type: '<node property>', // (1) define node properties
                post_library_library: '<node property>', // (1) define node properties
                post_library_scope: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'analytics-library-rest-api-service', host: 'http://<host name>' }, // (4) define host name
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
    it('should handle delete_library()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'analytics-library-rest-api', name: 'analytics-library-rest-api',
                method: 'delete_library',
                delete_library_library: '<node property>', // (1) define node properties
                delete_library_scope: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'analytics-library-rest-api-service', host: 'http://<host name>' }, // (4) define host name
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
