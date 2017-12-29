import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";
import { mockReq, mockRes } from "sinon-express-mock";
let sinonStubPromise = require("sinon-stub-promise");
sinonStubPromise(sinon);

import * as Datastore from "@google-cloud/datastore";
import { Query } from "@google-cloud/datastore";

import { SetAPI } from "./set-api";
import { Set } from "./models";

let sandbox;
beforeEach(function() {
    sandbox = sinon.sandbox.create();
});

afterEach(function() {
    sandbox.restore();
});

describe("SetAPI", () => {
    describe("instance", () => {
        it("should create singleton instance", () => {
            // arrange

            // act
            let instance = SetAPI.instance();

            // assert
            expect(instance).to.not.be.undefined;
        });

        it("should reuse singleton instance", () => {
            // arrange

            // act
            let originalInstance = SetAPI.instance();
            let secondInstance = SetAPI.instance();

            // assert
            expect(originalInstance).to.be.equal(secondInstance);
        });
    });

    describe("putSet", () => {
        it("should validate input on a valid set", () => {
            // arrange
            let body = {
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
            let request = mockReq(body);
            let response = mockRes();
            let validateSetStub = sandbox.stub(Set, "validateSet");
            let dataStoreStub = sandbox.stub(Datastore.prototype);

            // act
            SetAPI.instance().putSet(request, response);

            // assert
            expect(validateSetStub.called).to.be.true;

            // cleanup
            validateSetStub.restore();
        });

        it("should reject input on an invalid set", () => {
            // arrange
            let body = {
                body: {
                    set_code: "?"
                }
            };
            let request = mockReq(body);
            let response = mockRes();
            let validateSetStub = sandbox.stub(Set, "validateSet").callsFake((set) => {
                throw new Error("example error");
            });
            let dataStoreStub = sandbox.stub(Datastore.prototype);

            // act
            SetAPI.instance().putSet(request, response);

            // assert
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            validateSetStub.restore();
        });

        it("should 'put' a valid set", () => {
            // arrange
            let body = {
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
            let request = mockReq(body);
            let response = mockRes();
            let validateSetStub = sandbox.stub(Set, "validateSet");

            let datastoreUpsertStub = sandbox
                .stub(Datastore.prototype, "upsert")
                .returnsPromise()
                .resolves();

            // act
            SetAPI.instance().putSet(request, response);

            // assert
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            validateSetStub.restore();
        });

        it("should fail gracefully on save error", () => {
            // arrange
            let body = {
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
            let request = mockReq(body);
            let response = mockRes();
            let validateSetStub = sandbox.stub(Set, "validateSet");

            let datastoreUpsertStub = sandbox
                .stub(Datastore.prototype, "upsert")
                .returnsPromise()
                .rejects();

            // act
            SetAPI.instance().putSet(request, response);

            // assert
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(500);
            expect(response.json.called).to.be.true;

            // cleanup
            validateSetStub.restore();
        });
    });

    describe("putSets", () => {
        it("should allow input with one or more possible sets", () => {
            // arrange
            let body = {
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
            let request = mockReq(body);
            let response = mockRes();
            let validateSetStub = sandbox.stub(Set, "validateSet");
            let datastoreUpsertStub = sandbox.stub(Datastore.prototype, "upsert");

            // act
            SetAPI.instance().putSets(request, response);

            // assert
            expect(datastoreUpsertStub.called).to.be.true;

            // cleanup
            validateSetStub.restore();
            datastoreUpsertStub.restore();
        });

        it("should deny input with zero possible sets", () => {
            // arrange
            let body = {
                body: []
            };
            let request = mockReq(body);
            let response = mockRes();
            let validateSetStub = sandbox.stub(Set, "validateSet");
            let datastoreUpsertStub = sandbox.stub(Datastore.prototype, "upsert");

            // act
            SetAPI.instance().putSets(request, response);

            // assert
            expect(datastoreUpsertStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            validateSetStub.restore();
            datastoreUpsertStub.restore();
        });

        it("should validate all possible sets", () => {
            // arrange
            let body = {
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
            let request = mockReq(body);
            let response = mockRes();
            let validateSetStub = sandbox.stub(Set, "validateSet");
            let datastoreUpsertStub = sandbox.stub(Datastore.prototype, "upsert");

            // act
            SetAPI.instance().putSets(request, response);

            // assert
            expect(validateSetStub.called).to.be.true;
            expect(validateSetStub.callCount).to.be.equal(2);

            // cleanup
            validateSetStub.restore();
            datastoreUpsertStub.restore();
        });

        it("should 'put' all validated sets", () => {
            // arrange
            let body = {
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
            let request = mockReq(body);
            let response = mockRes();
            let validateSetStub = sandbox.stub(Set, "validateSet");
            let datastoreUpsertStub = sandbox
                .stub(Datastore.prototype, "upsert")
                .returnsPromise()
                .resolves();

            // act
            SetAPI.instance().putSets(request, response);

            // assert
            expect(datastoreUpsertStub.called).to.be.true;
            expect(datastoreUpsertStub.getCall(0).args[0].length).to.be.equal(2);
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            validateSetStub.restore();
            datastoreUpsertStub.restore();
        });

        it("should fail gracefully on save error", () => {
            // arrange
            let body = {
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
            let request = mockReq(body);
            let response = mockRes();
            let validateSetStub = sandbox.stub(Set, "validateSet");
            let datastoreUpsertStub = sandbox
                .stub(Datastore.prototype, "upsert")
                .returnsPromise()
                .rejects();

            // act
            SetAPI.instance().putSets(request, response);

            // assert
            expect(datastoreUpsertStub.called).to.be.true;
            expect(datastoreUpsertStub.getCall(0).args[0].length).to.be.equal(2);
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(500);
            expect(response.json.called).to.be.true;

            // cleanup
            validateSetStub.restore();
            datastoreUpsertStub.restore();
        });

        it("should reject input on invalid sets", () => {
            // arrange
            let body = {
                body: [
                    {
                        set_code: "xxx"
                    },
                    {
                        set_code: "?"
                    }
                ]
            };
            let request = mockReq(body);
            let response = mockRes();
            let validateSetStub = sandbox.stub(Set, "validateSet").callsFake(() => {
                throw new Error("example error");
            });
            let datastoreUpsertStub = sandbox
                .stub(Datastore.prototype, "upsert")
                .returnsPromise()
                .rejects();

            // act
            SetAPI.instance().putSets(request, response);

            // assert
            expect(datastoreUpsertStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            validateSetStub.restore();
            datastoreUpsertStub.restore();
        });
    });

    describe("getSet", () => {
        it("should attempt retrieval on valid set_code", () => {
            // arrange
            let body = {
                body: {
                    set_code: "ust"
                }
            };
            let request = mockReq(body);
            let response = mockRes();
            let validateSetCodeStub = sandbox.stub(Set, "validateSetCode");
            let datastoreGetStub = sandbox.stub(Datastore.prototype, "get");

            // act
            SetAPI.instance().getSet(request, response);

            // assert
            expect(validateSetCodeStub.called).to.be.true;
            expect(datastoreGetStub.called).to.be.true;

            // cleanup
            validateSetCodeStub.restore();
            datastoreGetStub.restore();
        });

        it("should reject retrieval on invalid set_code", () => {
            // arrange
            let body = {
                body: {
                    set_code: "ust"
                }
            };
            let request = mockReq(body);
            let response = mockRes();
            let validateSetCodeStub = sandbox.stub(Set, "validateSetCode").callsFake(() => {
                throw new Error("example error");
            });
            let datastoreGetStub = sandbox.stub(Datastore.prototype, "get");

            // act
            SetAPI.instance().getSet(request, response);

            // assert
            expect(validateSetCodeStub.called).to.be.true;
            expect(datastoreGetStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            validateSetCodeStub.restore();
            datastoreGetStub.restore();
        });

        it("should retrieve a set with a valid set_code", () => {
            // arrange
            let body = {
                body: {
                    set_code: "ust"
                }
            };
            let request = mockReq(body);
            let response = mockRes();
            let validateSetCodeStub = sandbox.stub(Set, "validateSetCode");
            let datastoreGetStub = sandbox.stub(Datastore.prototype, "get");

            // act
            datastoreGetStub.returnsPromise().resolves([{}]);
            SetAPI.instance().getSet(request, response);

            // assert
            expect(validateSetCodeStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreGetStub.restore();
            validateSetCodeStub.restore();
        });

        it("should return a not found error code when no results are returned", () => {
            // arrange
            let body = {
                body: {
                    set_code: "ust"
                }
            };
            let request = mockReq(body);
            let response = mockRes();
            let validateSetCodeStub = sandbox.stub(Set, "validateSetCode");
            let datastoreGetStub = sandbox.stub(Datastore.prototype, "get");

            // act
            datastoreGetStub.returnsPromise().resolves([]);
            SetAPI.instance().getSet(request, response);

            // assert
            expect(validateSetCodeStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreGetStub.restore();
            validateSetCodeStub.restore();
        });

        it("should fail gracefully on save error", () => {
            // arrange
            let body = {
                body: {
                    set_code: "ust"
                }
            };
            let request = mockReq(body);
            let response = mockRes();
            let validateSetCodeStub = sandbox.stub(Set, "validateSetCode");
            let datastoreGetStub = sandbox.stub(Datastore.prototype, "get");

            // act
            datastoreGetStub.returnsPromise().rejects();
            SetAPI.instance().getSet(request, response);

            // assert
            expect(validateSetCodeStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(500);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreGetStub.restore();
            validateSetCodeStub.restore();
        });
    });

    describe("getSets", () => {
        it("should get all sets", () => {
            // arrange
            let body = {
                body: {}
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter");

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("set_name");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
        });

        it("should validate and filter based on block_code", () => {
            // arrange
            let body = {
                body: {
                    block_code: "xln"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateBlockCodeStub = sandbox.stub(Set, "validateBlockCode");

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateBlockCodeStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("block_code");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.block_code);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("block_code");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateBlockCodeStub.restore();
        });

        it("should invalidate and return error on invalid block_code", () => {
            // arrange
            let body = {
                body: {
                    block_code: "xln"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateBlockCodeStub = sandbox.stub(Set, "validateBlockCode").callsFake(() => {
                throw new Error("example error");
            });

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateBlockCodeStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateBlockCodeStub.restore();
        });

        it("should validate and filter based on block_name", () => {
            // arrange
            let body = {
                body: {
                    block_name: "Ixalan"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateBlockNameStub = sandbox.stub(Set, "validateBlockName");

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateBlockNameStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("block_name");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.block_name);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("block_name");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateBlockNameStub.restore();
        });

        it("should invalidate and return error on invalid block_name", () => {
            // arrange
            let body = {
                body: {
                    block_name: "Ixalan"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateBlockNameStub = sandbox.stub(Set, "validateBlockName").callsFake(() => {
                throw new Error("example error");
            });

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateBlockNameStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateBlockNameStub.restore();
        });

        it("should validate and filter based on card_count", () => {
            // arrange
            let body = {
                body: {
                    card_count: 289
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateCardCountStub = sandbox.stub(Set, "validateCardCount");

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateCardCountStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("card_count");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.card_count);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("card_count");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateCardCountStub.restore();
        });

        it("should invalidate and return error on invalid card_count", () => {
            // arrange
            let body = {
                body: {
                    card_count: 289
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateCardCountStub = sandbox.stub(Set, "validateCardCount").callsFake(() => {
                throw new Error("example error");
            });

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateCardCountStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateCardCountStub.restore();
        });

        it("should validate and filter based on icon_url", () => {
            // arrange
            let body = {
                body: {
                    icon_uri: "https://assets.scryfall.com/assets/sets/xln.svg"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateIconUriStub = sandbox.stub(Set, "validateIconUri");

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateIconUriStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("icon_uri");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.icon_uri);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("icon_uri");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIconUriStub.restore();
        });

        it("should invalidate and return error on invalid icon_url", () => {
            // arrange
            let body = {
                body: {
                    icon_uri: "https://assets.scryfall.com/assets/sets/xln.svg"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateIconUriStub = sandbox.stub(Set, "validateIconUri").callsFake(() => {
                throw new Error("example error");
            });

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateIconUriStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIconUriStub.restore();
        });

        it("should validate and filter based on is_digital", () => {
            // arrange
            let body = {
                body: {
                    is_digital: false
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateIsDigitalStub = sandbox.stub(Set, "validateIsDigital");

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateIsDigitalStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("is_digital");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.is_digital);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("is_digital");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIsDigitalStub.restore();
        });

        it("should invalidate and return error on is_digital", () => {
            // arrange
            let body = {
                body: {
                    is_digital: false
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateIsDigitalStub = sandbox.stub(Set, "validateIsDigital").callsFake(() => {
                throw new Error("example error");
            });

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateIsDigitalStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIsDigitalStub.restore();
        });

        it("should validate and filter based on is_foil", () => {
            // arrange
            let body = {
                body: {
                    is_foil: false
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateIsFoilStub = sandbox.stub(Set, "validateIsFoil");

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateIsFoilStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("is_foil");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.is_foil);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("is_foil");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIsFoilStub.restore();
        });

        it("should invalidate and return error on is_foil", () => {
            // arrange
            let body = {
                body: {
                    is_foil: false
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateIsFoilStub = sandbox.stub(Set, "validateIsFoil").callsFake(() => {
                throw new Error("example error");
            });

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateIsFoilStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateIsFoilStub.restore();
        });

        it("should validate and filter based on parent_set_code", () => {
            // arrange
            let body = {
                body: {
                    parent_set_code: "xln"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateParentSetCodeStub = sandbox.stub(Set, "validateParentSetCode");

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateParentSetCodeStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("parent_set_code");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.parent_set_code);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("parent_set_code");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateParentSetCodeStub.restore();
        });

        it("should invalidate and return error on invalid parent_set_code", () => {
            // arrange
            let body = {
                body: {
                    parent_set_code: "xln"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateParentSetCodeStub = sandbox.stub(Set, "validateParentSetCode").callsFake(() => {
                throw new Error("example error");
            });

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateParentSetCodeStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateParentSetCodeStub.restore();
        });

        it("should validate and filter based on release_date", () => {
            // arrange
            let body = {
                body: {
                    release_date: "2017-09-29"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateReleaseDateStub = sandbox.stub(Set, "validateReleaseDate");

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateReleaseDateStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("release_date");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.release_date);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("release_date");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateReleaseDateStub.restore();
        });

        it("should invalidate and return error on invalid release_date", () => {
            // arrange
            let body = {
                body: {
                    release_date: "2017-09-29"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateReleaseDateStub = sandbox.stub(Set, "validateReleaseDate").callsFake(() => {
                throw new Error("example error");
            });

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateReleaseDateStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateReleaseDateStub.restore();
        });

        it("should validate and filter based on set_code", () => {
            // arrange
            let body = {
                body: {
                    set_code: "xln"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateSetCodeStub = sandbox.stub(Set, "validateSetCode");

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateSetCodeStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("set_code");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.set_code);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("set_code");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateSetCodeStub.restore();
        });

        it("should invalidate and return error on invalid set_code", () => {
            // arrange
            let body = {
                body: {
                    set_code: "xln"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateSetCodeStub = sandbox.stub(Set, "validateSetCode").callsFake(() => {
                throw new Error("example error");
            });

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateSetCodeStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateSetCodeStub.restore();
        });

        it("should validate and filter based on set_name", () => {
            // arrange
            let body = {
                body: {
                    set_name: "Ixalan"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateSetNameStub = sandbox.stub(Set, "validateSetName");

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateSetNameStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("set_name");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.set_name);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("set_name");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateSetNameStub.restore();
        });

        it("should invalidate and return error on invalid set_name", () => {
            // arrange
            let body = {
                body: {
                    set_name: "Ixalan"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateSetNameStub = sandbox.stub(Set, "validateSetName").callsFake(() => {
                throw new Error("example error");
            });

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateSetNameStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateSetNameStub.restore();
        });

        it("should validate and filter based on set_type", () => {
            // arrange
            let body = {
                body: {
                    set_type: "expansion"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateSetTypeStub = sandbox.stub(Set, "validateSetType");

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateSetTypeStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("set_type");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.set_type);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("set_type");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateSetTypeStub.restore();
        });

        it("should invalidate and return error on invalid set_type", () => {
            // arrange
            let body = {
                body: {
                    set_type: "expansion"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateSetTypeStub = sandbox.stub(Set, "validateSetType").callsFake(() => {
                throw new Error("example error");
            });

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateSetTypeStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.false;
            expect(queryOrderStub.called).to.be.false;
            expect(datastoreRunQueryStub.called).to.be.false;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(400);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateSetTypeStub.restore();
        });

        it("should allow filtering on multiple keys", () => {
            // arrange
            let body = {
                body: {
                    is_digital: false,
                    set_type: "expansion"
                }
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().resolves();
            let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
                return new Query();
            });
            let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
                return new Query();
            });
            let validateSetTypeStub = sandbox.stub(Set, "validateSetType");

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(validateSetTypeStub.called).to.be.true;
            expect(queryFilterStub.called).to.be.true;
            expect(queryFilterStub.getCall(0).args[0]).to.be.equal("is_digital");
            expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.is_digital);
            expect(queryFilterStub.getCall(1).args[0]).to.be.equal("set_type");
            expect(queryFilterStub.getCall(1).args[1]).to.be.equal("=");
            expect(queryFilterStub.getCall(1).args[2]).to.be.equal(body.body.set_type);
            expect(queryOrderStub.called).to.be.true;
            expect(queryOrderStub.getCall(0).args[0]).to.be.equal("is_digital");
            expect(queryOrderStub.getCall(1).args[0]).to.be.equal("set_type");
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(200);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
            validateSetTypeStub.restore();
        });

        it("should fail gracefully on save error", () => {
            // arrange
            let body = {
                body: {}
            };
            let request = mockReq(body);
            let response = mockRes();

            let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
                return new Query();
            });
            let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
            datastoreRunQueryStub.returnsPromise().rejects();
            let queryOrderStub = sandbox.stub(Query.prototype, "order");
            let queryFilterStub = sandbox.stub(Query.prototype, "filter");

            // act
            SetAPI.instance().getSets(request, response);

            // assert
            expect(datastoreCreateQueryStub.called).to.be.true;
            expect(datastoreRunQueryStub.called).to.be.true;
            expect(response.status.called).to.be.true;
            expect(response.status.getCall(0).args[0]).to.be.equal(500);
            expect(response.json.called).to.be.true;

            // cleanup
            datastoreCreateQueryStub.restore();
            datastoreRunQueryStub.restore();
            queryOrderStub.restore();
            queryFilterStub.restore();
        });
    });
});
