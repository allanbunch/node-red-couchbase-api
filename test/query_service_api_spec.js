var should = require('should');
var helper = require('node-red-node-test-helper');
var node = require('../cb-query-service/node.js');

helper.init(require.resolve('node-red'));

describe('query-service-rest-api node', function () {

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
        var flow = [{ id: 'n1', type: 'query-service-rest-api', name: 'query-service-rest-api' }];
        helper.load(node, flow, function () {
            var n1 = helper.getNode('n1');
            n1.should.have.property('name', 'query-service-rest-api');
            done();
        });
    });

    it('should handle post_service()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'query-service-rest-api', name: 'query-service-rest-api',
                method: 'post_service',
                post_service_parameters: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'query-service-rest-api-service', host: 'http://<host name>' }, // (4) define host name
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
    it('should handle get_service()', function (done) {
        var flow = [
            {
                id: 'n1', type: 'query-service-rest-api', name: 'query-service-rest-api',
                method: 'get_service',
                wires: [['n3']],
                service: 'n2'
            },
            { id: 'n2', type: 'query-service-rest-api-service', host: 'http://<host name>' }, // (4) define host name
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
