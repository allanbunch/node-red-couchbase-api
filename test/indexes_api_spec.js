var should = require('should');
var helper = require('node-red-node-test-helper');
var node = require('../cb-indexes/node.js');

helper.init(require.resolve('node-red'));

describe('index-statistics-rest-api node', function () {

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
        var flow = [{ id: 'n1', type: 'index-statistics-rest-api', name: 'index-statistics-rest-api' }];
        helper.load(node, flow, function () {
            var n1 = helper.getNode('n1');
            n1.should.have.property('name', 'index-statistics-rest-api');
            done();
        });
    });

    it('should handle get_node_stats()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'index-statistics-rest-api', name: 'index-statistics-rest-api',
                method: 'get_node_stats',
                get_node_stats_pretty: '<node property>', // (1) define node properties
                get_node_stats_redact: '<node property>', // (1) define node properties
                get_node_stats_skipEmpty: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'index-statistics-rest-api-service', host: 'http://<host name>' }, // (4) define host name
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
    it('should handle get_keyspace_stats()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'index-statistics-rest-api', name: 'index-statistics-rest-api',
                method: 'get_keyspace_stats',
                get_keyspace_stats_keyspace: '<node property>', // (1) define node properties
                get_keyspace_stats_pretty: '<node property>', // (1) define node properties
                get_keyspace_stats_redact: '<node property>', // (1) define node properties
                get_keyspace_stats_skipEmpty: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'index-statistics-rest-api-service', host: 'http://<host name>' }, // (4) define host name
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
    it('should handle get_index_stats()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'index-statistics-rest-api', name: 'index-statistics-rest-api',
                method: 'get_index_stats',
                get_index_stats_keyspace: '<node property>', // (1) define node properties
                get_index_stats_index: '<node property>', // (1) define node properties
                get_index_stats_pretty: '<node property>', // (1) define node properties
                get_index_stats_partition: '<node property>', // (1) define node properties
                get_index_stats_redact: '<node property>', // (1) define node properties
                get_index_stats_skipEmpty: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'index-statistics-rest-api-service', host: 'http://<host name>' }, // (4) define host name
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
