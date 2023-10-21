var should = require('should');
var helper = require('node-red-node-test-helper');
var node = require('../analytics-admin/node.js');

helper.init(require.resolve('node-red'));

describe('analytics-administration-rest-apis node', function () {

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
        var flow = [{ id: 'n1', type: 'analytics-administration-rest-apis', name: 'analytics-administration-rest-apis' }];
        helper.load(node, flow, function () {
            var n1 = helper.getNode('n1');
            n1.should.have.property('name', 'analytics-administration-rest-apis');
            done();
        });
    });

    it('should handle cancel_request()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'analytics-administration-rest-apis', name: 'analytics-administration-rest-apis',
                method: 'cancel_request',
                cancel_request_clientContextId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'analytics-administration-rest-apis-service', host: 'http://<host name>' }, // (4) define host name
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
    it('should handle cluster_status()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'analytics-administration-rest-apis', name: 'analytics-administration-rest-apis',
                method: 'cluster_status',
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'analytics-administration-rest-apis-service', host: 'http://<host name>' }, // (4) define host name
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
    it('should handle restart_cluster()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'analytics-administration-rest-apis', name: 'analytics-administration-rest-apis',
                method: 'restart_cluster',
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'analytics-administration-rest-apis-service', host: 'http://<host name>' }, // (4) define host name
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
    it('should handle restart_node()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'analytics-administration-rest-apis', name: 'analytics-administration-rest-apis',
                method: 'restart_node',
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'analytics-administration-rest-apis-service', host: 'http://<host name>' }, // (4) define host name
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
    it('should handle ingestion_status()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'analytics-administration-rest-apis', name: 'analytics-administration-rest-apis',
                method: 'ingestion_status',
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'analytics-administration-rest-apis-service', host: 'http://<host name>' }, // (4) define host name
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
    it('should handle monitor_node()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'analytics-administration-rest-apis', name: 'analytics-administration-rest-apis',
                method: 'monitor_node',
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'analytics-administration-rest-apis-service', host: 'http://<host name>' }, // (4) define host name
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
