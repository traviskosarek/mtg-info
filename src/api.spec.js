"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var sinon = require("sinon");
var sinon_express_mock_1 = require("sinon-express-mock");
var sinonStubPromise = require("sinon-stub-promise");
sinonStubPromise(sinon);
var Datastore = require("@google-cloud/datastore");
var datastore_1 = require("@google-cloud/datastore");
var api_1 = require("./api");
var models_1 = require("./models");
var sandbox;
beforeEach(function () {
    sandbox = sinon.sandbox.create();
});
afterEach(function () {
    sandbox.restore();
});
describe("API", function () {
    describe("instance", function () {
        it("should create singleton instance", function () {
            var instance = api_1.API.instance();
            chai_1.expect(instance).to.not.be.undefined;
        });
        it("should reuse singleton instance", function () {
            var originalInstance = api_1.API.instance();
            var secondInstance = api_1.API.instance();
            chai_1.expect(originalInstance).to.be.equal(secondInstance);
        });
    });
    describe("putSet", function () {
        it("should validate input on a valid set", function () {
            var body = {
                body: {
                    set_code: "ust",
                    set_name: "Unstable",
                    release_date: "2017-12-08",
                    set_type: "funny",
                    card_count: 268,
                    parent_set_code: undefined,
                    block_code: undefined,
                    block_name: undefined,
                    icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
                    is_digital: false,
                    is_foil: false
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var validateSetStub = sandbox.stub(models_1.Set, "validateSet");
            var dataStoreStub = sandbox.stub(Datastore.prototype);
            api_1.API.instance().putSet(request, response);
            chai_1.expect(validateSetStub.called).to.be.true;
            validateSetStub.restore();
        });
        it("should reject input on an invalid set", function () {
            var body = {
                body: {
                    set_code: "?"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var validateSetStub = sandbox.stub(models_1.Set, "validateSet").callsFake(function (set) {
                throw new Error("example error");
            });
            var dataStoreStub = sandbox.stub(Datastore.prototype);
            api_1.API.instance().putSet(request, response);
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(400);
            chai_1.expect(response.json.called).to.be.true;
            validateSetStub.restore();
        });
        it("should 'put' a valid set", function () {
            var body = {
                body: {
                    set_code: "ust",
                    set_name: "Unstable",
                    release_date: "2017-12-08",
                    set_type: "funny",
                    card_count: 268,
                    parent_set_code: undefined,
                    block_code: undefined,
                    block_name: undefined,
                    icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
                    is_digital: false,
                    is_foil: false
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var validateSetStub = sandbox.stub(models_1.Set, "validateSet");
            var datastoreUpsertStub = sandbox
                .stub(Datastore.prototype, "upsert")
                .returnsPromise()
                .resolves();
            api_1.API.instance().putSet(request, response);
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(200);
            chai_1.expect(response.json.called).to.be.true;
            validateSetStub.restore();
        });
        it("should fail gracefully on save error", function () {
            var body = {
                body: {
                    set_code: "ust",
                    set_name: "Unstable",
                    release_date: "2017-12-08",
                    set_type: "funny",
                    card_count: 268,
                    parent_set_code: undefined,
                    block_code: undefined,
                    block_name: undefined,
                    icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
                    is_digital: false,
                    is_foil: false
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var validateSetStub = sandbox.stub(models_1.Set, "validateSet");
            var datastoreUpsertStub = sandbox
                .stub(Datastore.prototype, "upsert")
                .returnsPromise()
                .rejects();
            api_1.API.instance().putSet(request, response);
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(500);
            chai_1.expect(response.json.called).to.be.true;
            validateSetStub.restore();
        });
    });
    describe("putSets", function () {
        it("should allow input with one or more possible sets", function () {
            var body = {
                body: [
                    {
                        set_code: "ust",
                        set_name: "Unstable",
                        release_date: "2017-12-08",
                        set_type: "funny",
                        card_count: 268,
                        parent_set_code: undefined,
                        block_code: undefined,
                        block_name: undefined,
                        icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
                        is_digital: false,
                        is_foil: false
                    }
                ]
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var validateSetStub = sandbox.stub(models_1.Set, "validateSet");
            var datastoreUpsertStub = sandbox.stub(Datastore.prototype, "upsert");
            api_1.API.instance().putSets(request, response);
            chai_1.expect(datastoreUpsertStub.called).to.be.true;
            validateSetStub.restore();
            datastoreUpsertStub.restore();
        });
        it("should deny input with zero possible sets", function () {
            var body = {
                body: []
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var validateSetStub = sandbox.stub(models_1.Set, "validateSet");
            var datastoreUpsertStub = sandbox.stub(Datastore.prototype, "upsert");
            api_1.API.instance().putSets(request, response);
            chai_1.expect(datastoreUpsertStub.called).to.be.false;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(400);
            chai_1.expect(response.json.called).to.be.true;
            validateSetStub.restore();
            datastoreUpsertStub.restore();
        });
        it("should validate all possible sets", function () {
            var body = {
                body: [
                    {
                        set_code: "ust",
                        set_name: "Unstable",
                        release_date: "2017-12-08",
                        set_type: "funny",
                        card_count: 268,
                        parent_set_code: undefined,
                        block_code: undefined,
                        block_name: undefined,
                        icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
                        is_digital: false,
                        is_foil: false
                    },
                    {
                        icon_uri: "https://assets.scryfall.com/assets/sets/xln.svg",
                        release_date: "2017-09-29",
                        set_type: "expansion",
                        set_code: "xln",
                        is_foil: false,
                        card_count: 289,
                        is_digital: false,
                        block_name: "Ixalan",
                        set_name: "Ixalan",
                        block_code: "xln"
                    }
                ]
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var validateSetStub = sandbox.stub(models_1.Set, "validateSet");
            var datastoreUpsertStub = sandbox.stub(Datastore.prototype, "upsert");
            api_1.API.instance().putSets(request, response);
            chai_1.expect(validateSetStub.called).to.be.true;
            chai_1.expect(validateSetStub.callCount).to.be.equal(2);
            validateSetStub.restore();
            datastoreUpsertStub.restore();
        });
        it("should 'put' all validated sets", function () {
            var body = {
                body: [
                    {
                        set_code: "ust",
                        set_name: "Unstable",
                        release_date: "2017-12-08",
                        set_type: "funny",
                        card_count: 268,
                        parent_set_code: undefined,
                        block_code: undefined,
                        block_name: undefined,
                        icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
                        is_digital: false,
                        is_foil: false
                    },
                    {
                        icon_uri: "https://assets.scryfall.com/assets/sets/xln.svg",
                        release_date: "2017-09-29",
                        set_type: "expansion",
                        set_code: "xln",
                        is_foil: false,
                        card_count: 289,
                        is_digital: false,
                        block_name: "Ixalan",
                        set_name: "Ixalan",
                        block_code: "xln"
                    }
                ]
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var validateSetStub = sandbox.stub(models_1.Set, "validateSet");
            var datastoreUpsertStub = sandbox
                .stub(Datastore.prototype, "upsert")
                .returnsPromise()
                .resolves();
            api_1.API.instance().putSets(request, response);
            chai_1.expect(datastoreUpsertStub.called).to.be.true;
            chai_1.expect(datastoreUpsertStub.getCall(0).args[0].length).to.be.equal(2);
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(200);
            chai_1.expect(response.json.called).to.be.true;
            validateSetStub.restore();
            datastoreUpsertStub.restore();
        });
        it("should fail gracefully on save error", function () {
            var body = {
                body: [
                    {
                        set_code: "ust",
                        set_name: "Unstable",
                        release_date: "2017-12-08",
                        set_type: "funny",
                        card_count: 268,
                        parent_set_code: undefined,
                        block_code: undefined,
                        block_name: undefined,
                        icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
                        is_digital: false,
                        is_foil: false
                    },
                    {
                        icon_uri: "https://assets.scryfall.com/assets/sets/xln.svg",
                        release_date: "2017-09-29",
                        set_type: "expansion",
                        set_code: "xln",
                        is_foil: false,
                        card_count: 289,
                        is_digital: false,
                        block_name: "Ixalan",
                        set_name: "Ixalan",
                        block_code: "xln"
                    }
                ]
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var validateSetStub = sandbox.stub(models_1.Set, "validateSet");
            var datastoreUpsertStub = sandbox
                .stub(Datastore.prototype, "upsert")
                .returnsPromise()
                .rejects();
            api_1.API.instance().putSets(request, response);
            chai_1.expect(datastoreUpsertStub.called).to.be.true;
            chai_1.expect(datastoreUpsertStub.getCall(0).args[0].length).to.be.equal(2);
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(500);
            chai_1.expect(response.json.called).to.be.true;
            validateSetStub.restore();
            datastoreUpsertStub.restore();
        });
        it("should reject input on invalid sets", function () {
            var body = {
                body: [
                    {
                        set_code: "xxx"
                    },
                    {
                        set_code: "?"
                    }
                ]
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var validateSetStub = sandbox.stub(models_1.Set, "validateSet").callsFake(function () {
                throw new Error("example error");
            });
            var datastoreUpsertStub = sandbox
                .stub(Datastore.prototype, "upsert")
                .returnsPromise()
                .rejects();
            api_1.API.instance().putSets(request, response);
            chai_1.expect(datastoreUpsertStub.called).to.be.false;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(400);
            chai_1.expect(response.json.called).to.be.true;
            validateSetStub.restore();
            datastoreUpsertStub.restore();
        });
    });
    describe("getSet", function () {
        it("should attempt retrieval on valid set_code", function () {
            var body = {
                body: {
                    set_code: "ust"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var validateSetCodeStub = sandbox.stub(models_1.Set, "validateSetCode");
            var datastoreGetStub = sandbox.stub(Datastore.prototype, "get");
            api_1.API.instance().getSet(request, response);
            chai_1.expect(validateSetCodeStub.called).to.be.true;
            chai_1.expect(datastoreGetStub.called).to.be.true;
            validateSetCodeStub.restore();
            datastoreGetStub.restore();
        });
        it("should reject retrieval on invalid set_code", function () {
            var body = {
                body: {
                    set_code: "ust"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var validateSetCodeStub = sandbox.stub(models_1.Set, "validateSetCode").callsFake(function () {
                throw new Error("example error");
            });
            var datastoreGetStub = sandbox.stub(Datastore.prototype, "get");
            api_1.API.instance().getSet(request, response);
            chai_1.expect(validateSetCodeStub.called).to.be.true;
            chai_1.expect(datastoreGetStub.called).to.be.false;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(400);
            chai_1.expect(response.json.called).to.be.true;
            validateSetCodeStub.restore();
            datastoreGetStub.restore();
        });
        it("should retrieve a set with a valid set_code", function () {
            var body = {
                body: {
                    set_code: "ust"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var validateSetCodeStub = sandbox.stub(models_1.Set, "validateSetCode");
            var datastoreGetStub = sandbox.stub(Datastore.prototype, "get");
            datastoreGetStub.returnsPromise().resolves([{}]);
            api_1.API.instance().getSet(request, response);
            chai_1.expect(validateSetCodeStub.called).to.be.true;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(200);
            chai_1.expect(response.json.called).to.be.true;
            datastoreGetStub.restore();
            validateSetCodeStub.restore();
        });
        it("should return a not found error code when no results are returned", function () {
            var body = {
                body: {
                    set_code: "ust"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var validateSetCodeStub = sandbox.stub(models_1.Set, "validateSetCode");
            var datastoreGetStub = sandbox.stub(Datastore.prototype, "get");
            datastoreGetStub.returnsPromise().resolves([]);
            api_1.API.instance().getSet(request, response);
            chai_1.expect(validateSetCodeStub.called).to.be.true;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(400);
            chai_1.expect(response.json.called).to.be.true;
            datastoreGetStub.restore();
            validateSetCodeStub.restore();
        });
        it("should fail gracefully on save error", function () {
            var body = {
                body: {
                    set_code: "ust"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var validateSetCodeStub = sandbox.stub(models_1.Set, "validateSetCode");
            var datastoreGetStub = sandbox.stub(Datastore.prototype, "get");
            datastoreGetStub.returnsPromise().rejects();
            api_1.API.instance().getSet(request, response);
            chai_1.expect(validateSetCodeStub.called).to.be.true;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(500);
            chai_1.expect(response.json.called).to.be.true;
            datastoreGetStub.restore();
            validateSetCodeStub.restore();
        });
    });
    describe("getSets", function () {
        it("should get all sets", function () {
            var body = {
                body: {}
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter");
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(queryOrderStub.called).to.be.true;
            chai_1.expect(queryOrderStub.getCall(0).args[0]).to.be.equal("set_name");
            chai_1.expect(datastoreRunQueryStub.called).to.be.true;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(200);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
        });
        it("should validate and filter based on block_code", function () {
            var body = {
                body: {
                    block_code: "xln"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateBlockCodeStub = sandbox.stub(models_1.Set, "validateBlockCode");
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateBlockCodeStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.true;
            chai_1.expect(queryFilterStub.getCall(0).args[0]).to.be.equal("block_code");
            chai_1.expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            chai_1.expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.block_code);
            chai_1.expect(queryOrderStub.called).to.be.true;
            chai_1.expect(queryOrderStub.getCall(0).args[0]).to.be.equal("block_code");
            chai_1.expect(datastoreRunQueryStub.called).to.be.true;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(200);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateBlockCodeStub.restore();
        });
        it("should invalidate and return error on invalid block_code", function () {
            var body = {
                body: {
                    block_code: "xln"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateBlockCodeStub = sandbox.stub(models_1.Set, "validateBlockCode").callsFake(function () {
                throw new Error("example error");
            });
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateBlockCodeStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.false;
            chai_1.expect(queryOrderStub.called).to.be.false;
            chai_1.expect(datastoreRunQueryStub.called).to.be.false;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(400);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateBlockCodeStub.restore();
        });
        it("should validate and filter based on block_name", function () {
            var body = {
                body: {
                    block_name: "Ixalan"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateBlockNameStub = sandbox.stub(models_1.Set, "validateBlockName");
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateBlockNameStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.true;
            chai_1.expect(queryFilterStub.getCall(0).args[0]).to.be.equal("block_name");
            chai_1.expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            chai_1.expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.block_name);
            chai_1.expect(queryOrderStub.called).to.be.true;
            chai_1.expect(queryOrderStub.getCall(0).args[0]).to.be.equal("block_name");
            chai_1.expect(datastoreRunQueryStub.called).to.be.true;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(200);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateBlockNameStub.restore();
        });
        it("should invalidate and return error on invalid block_name", function () {
            var body = {
                body: {
                    block_name: "Ixalan"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateBlockNameStub = sandbox.stub(models_1.Set, "validateBlockName").callsFake(function () {
                throw new Error("example error");
            });
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateBlockNameStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.false;
            chai_1.expect(queryOrderStub.called).to.be.false;
            chai_1.expect(datastoreRunQueryStub.called).to.be.false;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(400);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateBlockNameStub.restore();
        });
        it("should validate and filter based on card_count", function () {
            var body = {
                body: {
                    card_count: 289
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateCardCountStub = sandbox.stub(models_1.Set, "validateCardCount");
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateCardCountStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.true;
            chai_1.expect(queryFilterStub.getCall(0).args[0]).to.be.equal("card_count");
            chai_1.expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            chai_1.expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.card_count);
            chai_1.expect(queryOrderStub.called).to.be.true;
            chai_1.expect(queryOrderStub.getCall(0).args[0]).to.be.equal("card_count");
            chai_1.expect(datastoreRunQueryStub.called).to.be.true;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(200);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateCardCountStub.restore();
        });
        it("should invalidate and return error on invalid card_count", function () {
            var body = {
                body: {
                    card_count: 289
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateCardCountStub = sandbox.stub(models_1.Set, "validateCardCount").callsFake(function () {
                throw new Error("example error");
            });
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateCardCountStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.false;
            chai_1.expect(queryOrderStub.called).to.be.false;
            chai_1.expect(datastoreRunQueryStub.called).to.be.false;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(400);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateCardCountStub.restore();
        });
        it("should validate and filter based on icon_url", function () {
            var body = {
                body: {
                    icon_uri: "https://assets.scryfall.com/assets/sets/xln.svg"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateIconUriStub = sandbox.stub(models_1.Set, "validateIconUri");
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateIconUriStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.true;
            chai_1.expect(queryFilterStub.getCall(0).args[0]).to.be.equal("icon_uri");
            chai_1.expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            chai_1.expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.icon_uri);
            chai_1.expect(queryOrderStub.called).to.be.true;
            chai_1.expect(queryOrderStub.getCall(0).args[0]).to.be.equal("icon_uri");
            chai_1.expect(datastoreRunQueryStub.called).to.be.true;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(200);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIconUriStub.restore();
        });
        it("should invalidate and return error on invalid icon_url", function () {
            var body = {
                body: {
                    icon_uri: "https://assets.scryfall.com/assets/sets/xln.svg"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateIconUriStub = sandbox.stub(models_1.Set, "validateIconUri").callsFake(function () {
                throw new Error("example error");
            });
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateIconUriStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.false;
            chai_1.expect(queryOrderStub.called).to.be.false;
            chai_1.expect(datastoreRunQueryStub.called).to.be.false;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(400);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIconUriStub.restore();
        });
        it("should validate and filter based on is_digital", function () {
            var body = {
                body: {
                    is_digital: false
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateIsDigitalStub = sandbox.stub(models_1.Set, "validateIsDigital");
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateIsDigitalStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.true;
            chai_1.expect(queryFilterStub.getCall(0).args[0]).to.be.equal("is_digital");
            chai_1.expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            chai_1.expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.is_digital);
            chai_1.expect(queryOrderStub.called).to.be.true;
            chai_1.expect(queryOrderStub.getCall(0).args[0]).to.be.equal("is_digital");
            chai_1.expect(datastoreRunQueryStub.called).to.be.true;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(200);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIsDigitalStub.restore();
        });
        it("should invalidate and return error on is_digital", function () {
            var body = {
                body: {
                    is_digital: false
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateIsDigitalStub = sandbox.stub(models_1.Set, "validateIsDigital").callsFake(function () {
                throw new Error("example error");
            });
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateIsDigitalStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.false;
            chai_1.expect(queryOrderStub.called).to.be.false;
            chai_1.expect(datastoreRunQueryStub.called).to.be.false;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(400);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIsDigitalStub.restore();
        });
        it("should validate and filter based on is_foil", function () {
            var body = {
                body: {
                    is_foil: false
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateIsFoilStub = sandbox.stub(models_1.Set, "validateIsFoil");
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateIsFoilStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.true;
            chai_1.expect(queryFilterStub.getCall(0).args[0]).to.be.equal("is_foil");
            chai_1.expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            chai_1.expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.is_foil);
            chai_1.expect(queryOrderStub.called).to.be.true;
            chai_1.expect(queryOrderStub.getCall(0).args[0]).to.be.equal("is_foil");
            chai_1.expect(datastoreRunQueryStub.called).to.be.true;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(200);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIsFoilStub.restore();
        });
        it("should invalidate and return error on is_foil", function () {
            var body = {
                body: {
                    is_foil: false
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateIsFoilStub = sandbox.stub(models_1.Set, "validateIsFoil").callsFake(function () {
                throw new Error("example error");
            });
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateIsFoilStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.false;
            chai_1.expect(queryOrderStub.called).to.be.false;
            chai_1.expect(datastoreRunQueryStub.called).to.be.false;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(400);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIsFoilStub.restore();
        });
        it("should validate and filter based on parent_set_code", function () {
            var body = {
                body: {
                    parent_set_code: "xln"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateParentSetCodeStub = sandbox.stub(models_1.Set, "validateParentSetCode");
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateParentSetCodeStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.true;
            chai_1.expect(queryFilterStub.getCall(0).args[0]).to.be.equal("parent_set_code");
            chai_1.expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            chai_1.expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.parent_set_code);
            chai_1.expect(queryOrderStub.called).to.be.true;
            chai_1.expect(queryOrderStub.getCall(0).args[0]).to.be.equal("parent_set_code");
            chai_1.expect(datastoreRunQueryStub.called).to.be.true;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(200);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateParentSetCodeStub.restore();
        });
        it("should invalidate and return error on invalid parent_set_code", function () {
            var body = {
                body: {
                    parent_set_code: "xln"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateParentSetCodeStub = sandbox.stub(models_1.Set, "validateParentSetCode").callsFake(function () {
                throw new Error("example error");
            });
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateParentSetCodeStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.false;
            chai_1.expect(queryOrderStub.called).to.be.false;
            chai_1.expect(datastoreRunQueryStub.called).to.be.false;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(400);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateParentSetCodeStub.restore();
        });
        it("should validate and filter based on release_date", function () {
            var body = {
                body: {
                    release_date: "2017-09-29"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateReleaseDateStub = sandbox.stub(models_1.Set, "validateReleaseDate");
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateReleaseDateStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.true;
            chai_1.expect(queryFilterStub.getCall(0).args[0]).to.be.equal("release_date");
            chai_1.expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            chai_1.expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.release_date);
            chai_1.expect(queryOrderStub.called).to.be.true;
            chai_1.expect(queryOrderStub.getCall(0).args[0]).to.be.equal("release_date");
            chai_1.expect(datastoreRunQueryStub.called).to.be.true;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(200);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateReleaseDateStub.restore();
        });
        it("should invalidate and return error on invalid release_date", function () {
            var body = {
                body: {
                    release_date: "2017-09-29"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateReleaseDateStub = sandbox.stub(models_1.Set, "validateReleaseDate").callsFake(function () {
                throw new Error("example error");
            });
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateReleaseDateStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.false;
            chai_1.expect(queryOrderStub.called).to.be.false;
            chai_1.expect(datastoreRunQueryStub.called).to.be.false;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(400);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateReleaseDateStub.restore();
        });
        it("should validate and filter based on set_code", function () {
            var body = {
                body: {
                    set_code: "xln"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateSetCodeStub = sandbox.stub(models_1.Set, "validateSetCode");
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateSetCodeStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.true;
            chai_1.expect(queryFilterStub.getCall(0).args[0]).to.be.equal("set_code");
            chai_1.expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            chai_1.expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.set_code);
            chai_1.expect(queryOrderStub.called).to.be.true;
            chai_1.expect(queryOrderStub.getCall(0).args[0]).to.be.equal("set_code");
            chai_1.expect(datastoreRunQueryStub.called).to.be.true;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(200);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateSetCodeStub.restore();
        });
        it("should invalidate and return error on invalid set_code", function () {
            var body = {
                body: {
                    set_code: "xln"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateSetCodeStub = sandbox.stub(models_1.Set, "validateSetCode").callsFake(function () {
                throw new Error("example error");
            });
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateSetCodeStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.false;
            chai_1.expect(queryOrderStub.called).to.be.false;
            chai_1.expect(datastoreRunQueryStub.called).to.be.false;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(400);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateSetCodeStub.restore();
        });
        it("should validate and filter based on set_name", function () {
            var body = {
                body: {
                    set_name: "Ixalan"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateSetNameStub = sandbox.stub(models_1.Set, "validateSetName");
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateSetNameStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.true;
            chai_1.expect(queryFilterStub.getCall(0).args[0]).to.be.equal("set_name");
            chai_1.expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            chai_1.expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.set_name);
            chai_1.expect(queryOrderStub.called).to.be.true;
            chai_1.expect(queryOrderStub.getCall(0).args[0]).to.be.equal("set_name");
            chai_1.expect(datastoreRunQueryStub.called).to.be.true;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(200);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateSetNameStub.restore();
        });
        it("should invalidate and return error on invalid set_name", function () {
            var body = {
                body: {
                    set_name: "Ixalan"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateSetNameStub = sandbox.stub(models_1.Set, "validateSetName").callsFake(function () {
                throw new Error("example error");
            });
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateSetNameStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.false;
            chai_1.expect(queryOrderStub.called).to.be.false;
            chai_1.expect(datastoreRunQueryStub.called).to.be.false;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(400);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateSetNameStub.restore();
        });
        it("should validate and filter based on set_type", function () {
            var body = {
                body: {
                    set_type: "expansion"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateSetTypeStub = sandbox.stub(models_1.Set, "validateSetType");
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateSetTypeStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.true;
            chai_1.expect(queryFilterStub.getCall(0).args[0]).to.be.equal("set_type");
            chai_1.expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            chai_1.expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.set_type);
            chai_1.expect(queryOrderStub.called).to.be.true;
            chai_1.expect(queryOrderStub.getCall(0).args[0]).to.be.equal("set_type");
            chai_1.expect(datastoreRunQueryStub.called).to.be.true;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(200);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateSetTypeStub.restore();
        });
        it("should invalidate and return error on invalid set_type", function () {
            var body = {
                body: {
                    set_type: "expansion"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateSetTypeStub = sandbox.stub(models_1.Set, "validateSetType").callsFake(function () {
                throw new Error("example error");
            });
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateSetTypeStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.false;
            chai_1.expect(queryOrderStub.called).to.be.false;
            chai_1.expect(datastoreRunQueryStub.called).to.be.false;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(400);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateSetTypeStub.restore();
        });
        it("should allow filtering on multiple keys", function () {
            var body = {
                body: {
                    is_digital: false,
                    set_type: "expansion"
                }
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order").callsFake(function () {
                return new datastore_1.Query();
            });
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter").callsFake(function () {
                return new datastore_1.Query();
            });
            var validateSetTypeStub = sandbox.stub(models_1.Set, "validateSetType");
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(validateSetTypeStub.called).to.be.true;
            chai_1.expect(queryFilterStub.called).to.be.true;
            chai_1.expect(queryFilterStub.getCall(0).args[0]).to.be.equal("is_digital");
            chai_1.expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            chai_1.expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.is_digital);
            chai_1.expect(queryFilterStub.getCall(1).args[0]).to.be.equal("set_type");
            chai_1.expect(queryFilterStub.getCall(1).args[1]).to.be.equal("=");
            chai_1.expect(queryFilterStub.getCall(1).args[2]).to.be.equal(body.body.set_type);
            chai_1.expect(queryOrderStub.called).to.be.true;
            chai_1.expect(queryOrderStub.getCall(0).args[0]).to.be.equal("is_digital");
            chai_1.expect(queryOrderStub.getCall(1).args[0]).to.be.equal("set_type");
            chai_1.expect(datastoreRunQueryStub.called).to.be.true;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(200);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateSetTypeStub.restore();
        });
        it("should fail gracefully on save error", function () {
            var body = {
                body: {}
            };
            var request = sinon_express_mock_1.mockReq(body);
            var response = sinon_express_mock_1.mockRes();
            var datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake(function (kind) {
                return new datastore_1.Query();
            });
            var datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().rejects();
            var queryOrderStub = sandbox.stub(datastore_1.Query.prototype, "order");
            var queryFilterStub = sandbox.stub(datastore_1.Query.prototype, "filter");
            api_1.API.instance().getSets(request, response);
            chai_1.expect(datastoreCreateQueryStub.called).to.be.true;
            chai_1.expect(datastoreRunQueryStub.called).to.be.true;
            chai_1.expect(response.status.called).to.be.true;
            chai_1.expect(response.status.getCall(0).args[0]).to.be.equal(500);
            chai_1.expect(response.json.called).to.be.true;
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
        });
    });
});
//# sourceMappingURL=api.spec.js.map