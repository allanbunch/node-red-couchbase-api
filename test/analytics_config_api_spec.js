var should = require('should');
var helper = require('node-red-node-test-helper');
var node = require('../analytics-config/node.js');

helper.init(require.resolve('node-red'));

describe('analytics-configuration-rest-api node', function () {

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
        var flow = [{ id: 'n1', type: 'analytics-configuration-rest-api', name: 'analytics-configuration-rest-api' }];
        helper.load(node, flow, function () {
            var n1 = helper.getNode('n1');
            n1.should.have.property('name', 'analytics-configuration-rest-api');
            done();
        });
    });

    it('should handle get_service()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'analytics-configuration-rest-api', name: 'analytics-configuration-rest-api',
                method: 'get_service',
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'analytics-configuration-rest-api-service', host: 'http://<host name>' }, // (4) define host name
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
    it('should handle put_service()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'analytics-configuration-rest-api', name: 'analytics-configuration-rest-api',
                method: 'put_service',
                put_service_service: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'analytics-configuration-rest-api-service', host: 'http://<host name>' }, // (4) define host name
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
    it('should handle get_node()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'analytics-configuration-rest-api', name: 'analytics-configuration-rest-api',
                method: 'get_node',
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'analytics-configuration-rest-api-service', host: 'http://<host name>' }, // (4) define host name
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
    it('should handle put_node()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'analytics-configuration-rest-api', name: 'analytics-configuration-rest-api',
                method: 'put_node',
                put_node_node: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'analytics-configuration-rest-api-service', host: 'http://<host name>' }, // (4) define host name
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
