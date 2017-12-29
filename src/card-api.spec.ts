import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";
import { mockReq, mockRes } from "sinon-express-mock";
let sinonStubPromise = require("sinon-stub-promise");
sinonStubPromise(sinon);

import * as Datastore from "@google-cloud/datastore";
import { Query } from "@google-cloud/datastore";

import { CardAPI } from "./card-api";
import { Card } from "./models";

let sandbox;
beforeEach(function() {
    sandbox = sinon.sandbox.create();
});

afterEach(function() {
    sandbox.restore();
});

describe("CardAPI", () => {
    describe("instance", () => {
        it("should create singleton instance", () => {
            // arrange

            // act
            let instance = CardAPI.instance();

            // assert
            expect(instance).to.not.be.undefined;
        });

        it("should reuse singleton instance", () => {
            // arrange

            // act
            let originalInstance = CardAPI.instance();
            let secondInstance = CardAPI.instance();

            // assert
            expect(originalInstance).to.be.equal(secondInstance);
        });
    });

    describe("putCard", () => {
        // it("should validate input on a valid card", () => {
        //     // arrange
        //     let body = {
        //         body: {
        //             set_code: "ust",
        //             set_name: "Unstable",
        //             release_date: "2017-12-08",
        //             set_type: "funny",
        //             card_count: 268,
        //             parent_set_code: undefined,
        //             block_code: undefined,
        //             block_name: undefined,
        //             icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
        //             is_digital: false,
        //             is_foil: false
        //         }
        //     };
        //     let request = mockReq(body);
        //     let response = mockRes();
        //     let validateSetStub = sandbox.stub(Set, "validateSet");
        //     let dataStoreStub = sandbox.stub(Datastore.prototype);

        //     // act
        //     CardAPI.instance().putSet(request, response);

        //     // assert
        //     expect(validateSetStub.called).to.be.true;

        //     // cleanup
        //     validateSetStub.restore();
        // });

        // it("should reject input on an invalid card", () => {
        //     // arrange
        //     let body = {
        //         body: {
        //             set_code: "?"
        //         }
        //     };
        //     let request = mockReq(body);
        //     let response = mockRes();
        //     let validateSetStub = sandbox.stub(Set, "validateSet").callsFake((set) => {
        //         throw new Error("example error");
        //     });
        //     let dataStoreStub = sandbox.stub(Datastore.prototype);

        //     // act
        //     CardAPI.instance().putSet(request, response);

        //     // assert
        //     expect(response.status.called).to.be.true;
        //     expect(response.status.getCall(0).args[0]).to.be.equal(400);
        //     expect(response.json.called).to.be.true;

        //     // cleanup
        //     validateSetStub.restore();
        // });

        // it("should 'put' a valid card", () => {
        //     // arrange
        //     let body = {
        //         body: {
        //             set_code: "ust",
        //             set_name: "Unstable",
        //             release_date: "2017-12-08",
        //             set_type: "funny",
        //             card_count: 268,
        //             parent_set_code: undefined,
        //             block_code: undefined,
        //             block_name: undefined,
        //             icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
        //             is_digital: false,
        //             is_foil: false
        //         }
        //     };
        //     let request = mockReq(body);
        //     let response = mockRes();
        //     let validateSetStub = sandbox.stub(Set, "validateSet");

        //     let datastoreUpsertStub = sandbox
        //         .stub(Datastore.prototype, "upsert")
        //         .returnsPromise()
        //         .resolves();

        //     // act
        //     CardAPI.instance().putSet(request, response);

        //     // assert
        //     expect(response.status.called).to.be.true;
        //     expect(response.status.getCall(0).args[0]).to.be.equal(200);
        //     expect(response.json.called).to.be.true;

        //     // cleanup
        //     validateSetStub.restore();
        // });

        // it("should fail gracefully on save error", () => {
        //     // arrange
        //     let body = {
        //         body: {
        //             set_code: "ust",
        //             set_name: "Unstable",
        //             release_date: "2017-12-08",
        //             set_type: "funny",
        //             card_count: 268,
        //             parent_set_code: undefined,
        //             block_code: undefined,
        //             block_name: undefined,
        //             icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
        //             is_digital: false,
        //             is_foil: false
        //         }
        //     };
        //     let request = mockReq(body);
        //     let response = mockRes();
        //     let validateSetStub = sandbox.stub(Set, "validateSet");

        //     let datastoreUpsertStub = sandbox
        //         .stub(Datastore.prototype, "upsert")
        //         .returnsPromise()
        //         .rejects();

        //     // act
        //     CardAPI.instance().putSet(request, response);

        //     // assert
        //     expect(response.status.called).to.be.true;
        //     expect(response.status.getCall(0).args[0]).to.be.equal(500);
        //     expect(response.json.called).to.be.true;

        //     // cleanup
        //     validateSetStub.restore();
        // });
    });

    describe("putCards", () => {
        // it("should allow input with one or more possible cards", () => {
        //     // arrange
        //     let body = {
        //         body: [
        //             {
        //                 set_code: "ust",
        //                 set_name: "Unstable",
        //                 release_date: "2017-12-08",
        //                 set_type: "funny",
        //                 card_count: 268,
        //                 parent_set_code: undefined,
        //                 block_code: undefined,
        //                 block_name: undefined,
        //                 icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
        //                 is_digital: false,
        //                 is_foil: false
        //             }
        //         ]
        //     };
        //     let request = mockReq(body);
        //     let response = mockRes();
        //     let validateSetStub = sandbox.stub(Set, "validateSet");
        //     let datastoreUpsertStub = sandbox.stub(Datastore.prototype, "upsert");

        //     // act
        //     CardAPI.instance().putSets(request, response);

        //     // assert
        //     expect(datastoreUpsertStub.called).to.be.true;

        //     // cleanup
        //     validateSetStub.restore();
        //     datastoreUpsertStub.restore();
        // });

        // it("should deny input with zero possible cards", () => {
        //     // arrange
        //     let body = {
        //         body: []
        //     };
        //     let request = mockReq(body);
        //     let response = mockRes();
        //     let validateSetStub = sandbox.stub(Set, "validateSet");
        //     let datastoreUpsertStub = sandbox.stub(Datastore.prototype, "upsert");

        //     // act
        //     CardAPI.instance().putSets(request, response);

        //     // assert
        //     expect(datastoreUpsertStub.called).to.be.false;
        //     expect(response.status.called).to.be.true;
        //     expect(response.status.getCall(0).args[0]).to.be.equal(400);
        //     expect(response.json.called).to.be.true;

        //     // cleanup
        //     validateSetStub.restore();
        //     datastoreUpsertStub.restore();
        // });

        // it("should validate all possible cards", () => {
        //     // arrange
        //     let body = {
        //         body: [
        //             {
        //                 set_code: "ust",
        //                 set_name: "Unstable",
        //                 release_date: "2017-12-08",
        //                 set_type: "funny",
        //                 card_count: 268,
        //                 parent_set_code: undefined,
        //                 block_code: undefined,
        //                 block_name: undefined,
        //                 icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
        //                 is_digital: false,
        //                 is_foil: false
        //             },
        //             {
        //                 icon_uri: "https://assets.scryfall.com/assets/sets/xln.svg",
        //                 release_date: "2017-09-29",
        //                 set_type: "expansion",
        //                 set_code: "xln",
        //                 is_foil: false,
        //                 card_count: 289,
        //                 is_digital: false,
        //                 block_name: "Ixalan",
        //                 set_name: "Ixalan",
        //                 block_code: "xln"
        //             }
        //         ]
        //     };
        //     let request = mockReq(body);
        //     let response = mockRes();
        //     let validateSetStub = sandbox.stub(Set, "validateSet");
        //     let datastoreUpsertStub = sandbox.stub(Datastore.prototype, "upsert");

        //     // act
        //     CardAPI.instance().putSets(request, response);

        //     // assert
        //     expect(validateSetStub.called).to.be.true;
        //     expect(validateSetStub.callCount).to.be.equal(2);

        //     // cleanup
        //     validateSetStub.restore();
        //     datastoreUpsertStub.restore();
        // });

        // it("should 'put' all validated cards", () => {
        //     // arrange
        //     let body = {
        //         body: [
        //             {
        //                 set_code: "ust",
        //                 set_name: "Unstable",
        //                 release_date: "2017-12-08",
        //                 set_type: "funny",
        //                 card_count: 268,
        //                 parent_set_code: undefined,
        //                 block_code: undefined,
        //                 block_name: undefined,
        //                 icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
        //                 is_digital: false,
        //                 is_foil: false
        //             },
        //             {
        //                 icon_uri: "https://assets.scryfall.com/assets/sets/xln.svg",
        //                 release_date: "2017-09-29",
        //                 set_type: "expansion",
        //                 set_code: "xln",
        //                 is_foil: false,
        //                 card_count: 289,
        //                 is_digital: false,
        //                 block_name: "Ixalan",
        //                 set_name: "Ixalan",
        //                 block_code: "xln"
        //             }
        //         ]
        //     };
        //     let request = mockReq(body);
        //     let response = mockRes();
        //     let validateSetStub = sandbox.stub(Set, "validateSet");
        //     let datastoreUpsertStub = sandbox
        //         .stub(Datastore.prototype, "upsert")
        //         .returnsPromise()
        //         .resolves();

        //     // act
        //     CardAPI.instance().putSets(request, response);

        //     // assert
        //     expect(datastoreUpsertStub.called).to.be.true;
        //     expect(datastoreUpsertStub.getCall(0).args[0].length).to.be.equal(2);
        //     expect(response.status.called).to.be.true;
        //     expect(response.status.getCall(0).args[0]).to.be.equal(200);
        //     expect(response.json.called).to.be.true;

        //     // cleanup
        //     validateSetStub.restore();
        //     datastoreUpsertStub.restore();
        // });

        // it("should fail gracefully on save error", () => {
        //     // arrange
        //     let body = {
        //         body: [
        //             {
        //                 set_code: "ust",
        //                 set_name: "Unstable",
        //                 release_date: "2017-12-08",
        //                 set_type: "funny",
        //                 card_count: 268,
        //                 parent_set_code: undefined,
        //                 block_code: undefined,
        //                 block_name: undefined,
        //                 icon_uri: "https://assets.scryfall.com/assets/sets/ust.svg",
        //                 is_digital: false,
        //                 is_foil: false
        //             },
        //             {
        //                 icon_uri: "https://assets.scryfall.com/assets/sets/xln.svg",
        //                 release_date: "2017-09-29",
        //                 set_type: "expansion",
        //                 set_code: "xln",
        //                 is_foil: false,
        //                 card_count: 289,
        //                 is_digital: false,
        //                 block_name: "Ixalan",
        //                 set_name: "Ixalan",
        //                 block_code: "xln"
        //             }
        //         ]
        //     };
        //     let request = mockReq(body);
        //     let response = mockRes();
        //     let validateSetStub = sandbox.stub(Set, "validateSet");
        //     let datastoreUpsertStub = sandbox
        //         .stub(Datastore.prototype, "upsert")
        //         .returnsPromise()
        //         .rejects();

        //     // act
        //     CardAPI.instance().putSets(request, response);

        //     // assert
        //     expect(datastoreUpsertStub.called).to.be.true;
        //     expect(datastoreUpsertStub.getCall(0).args[0].length).to.be.equal(2);
        //     expect(response.status.called).to.be.true;
        //     expect(response.status.getCall(0).args[0]).to.be.equal(500);
        //     expect(response.json.called).to.be.true;

        //     // cleanup
        //     validateSetStub.restore();
        //     datastoreUpsertStub.restore();
        // });

        // it("should reject input on invalid cards", () => {
        //     // arrange
        //     let body = {
        //         body: [
        //             {
        //                 set_code: "xxx"
        //             },
        //             {
        //                 set_code: "?"
        //             }
        //         ]
        //     };
        //     let request = mockReq(body);
        //     let response = mockRes();
        //     let validateSetStub = sandbox.stub(Set, "validateSet").callsFake(() => {
        //         throw new Error("example error");
        //     });
        //     let datastoreUpsertStub = sandbox
        //         .stub(Datastore.prototype, "upsert")
        //         .returnsPromise()
        //         .rejects();

        //     // act
        //     CardAPI.instance().putSets(request, response);

        //     // assert
        //     expect(datastoreUpsertStub.called).to.be.false;
        //     expect(response.status.called).to.be.true;
        //     expect(response.status.getCall(0).args[0]).to.be.equal(400);
        //     expect(response.json.called).to.be.true;

        //     // cleanup
        //     validateSetStub.restore();
        //     datastoreUpsertStub.restore();
        // });
    });

    describe("getCard", () => {
        // it("should attempt retrieval on valid set_code", () => {
        //     // arrange
        //     let body = {
        //         body: {
        //             set_code: "ust"
        //         }
        //     };
        //     let request = mockReq(body);
        //     let response = mockRes();
        //     let validateSetCodeStub = sandbox.stub(Set, "validateSetCode");
        //     let datastoreGetStub = sandbox.stub(Datastore.prototype, "get");

        //     // act
        //     CardAPI.instance().getSet(request, response);

        //     // assert
        //     expect(validateSetCodeStub.called).to.be.true;
        //     expect(datastoreGetStub.called).to.be.true;

        //     // cleanup
        //     validateSetCodeStub.restore();
        //     datastoreGetStub.restore();
        // });

        // it("should reject retrieval on invalid set_code", () => {
        //     // arrange
        //     let body = {
        //         body: {
        //             set_code: "ust"
        //         }
        //     };
        //     let request = mockReq(body);
        //     let response = mockRes();
        //     let validateSetCodeStub = sandbox.stub(Set, "validateSetCode").callsFake(() => {
        //         throw new Error("example error");
        //     });
        //     let datastoreGetStub = sandbox.stub(Datastore.prototype, "get");

        //     // act
        //     CardAPI.instance().getSet(request, response);

        //     // assert
        //     expect(validateSetCodeStub.called).to.be.true;
        //     expect(datastoreGetStub.called).to.be.false;
        //     expect(response.status.called).to.be.true;
        //     expect(response.status.getCall(0).args[0]).to.be.equal(400);
        //     expect(response.json.called).to.be.true;

        //     // cleanup
        //     validateSetCodeStub.restore();
        //     datastoreGetStub.restore();
        // });

        // it("should retrieve a card with a valid set_code", () => {
        //     // arrange
        //     let body = {
        //         body: {
        //             set_code: "ust"
        //         }
        //     };
        //     let request = mockReq(body);
        //     let response = mockRes();
        //     let validateSetCodeStub = sandbox.stub(Set, "validateSetCode");
        //     let datastoreGetStub = sandbox.stub(Datastore.prototype, "get");

        //     // act
        //     datastoreGetStub.returnsPromise().resolves([{}]);
        //     CardAPI.instance().getSet(request, response);

        //     // assert
        //     expect(validateSetCodeStub.called).to.be.true;
        //     expect(response.status.called).to.be.true;
        //     expect(response.status.getCall(0).args[0]).to.be.equal(200);
        //     expect(response.json.called).to.be.true;

        //     // cleanup
        //     datastoreGetStub.restore();
        //     validateSetCodeStub.restore();
        // });

        // it("should return a not found error code when no results are returned", () => {
        //     // arrange
        //     let body = {
        //         body: {
        //             set_code: "ust"
        //         }
        //     };
        //     let request = mockReq(body);
        //     let response = mockRes();
        //     let validateSetCodeStub = sandbox.stub(Set, "validateSetCode");
        //     let datastoreGetStub = sandbox.stub(Datastore.prototype, "get");

        //     // act
        //     datastoreGetStub.returnsPromise().resolves([]);
        //     CardAPI.instance().getSet(request, response);

        //     // assert
        //     expect(validateSetCodeStub.called).to.be.true;
        //     expect(response.status.called).to.be.true;
        //     expect(response.status.getCall(0).args[0]).to.be.equal(400);
        //     expect(response.json.called).to.be.true;

        //     // cleanup
        //     datastoreGetStub.restore();
        //     validateSetCodeStub.restore();
        // });

        // it("should fail gracefully on save error", () => {
        //     // arrange
        //     let body = {
        //         body: {
        //             set_code: "ust"
        //         }
        //     };
        //     let request = mockReq(body);
        //     let response = mockRes();
        //     let validateSetCodeStub = sandbox.stub(Set, "validateSetCode");
        //     let datastoreGetStub = sandbox.stub(Datastore.prototype, "get");

        //     // act
        //     datastoreGetStub.returnsPromise().rejects();
        //     CardAPI.instance().getSet(request, response);

        //     // assert
        //     expect(validateSetCodeStub.called).to.be.true;
        //     expect(response.status.called).to.be.true;
        //     expect(response.status.getCall(0).args[0]).to.be.equal(500);
        //     expect(response.json.called).to.be.true;

        //     // cleanup
        //     datastoreGetStub.restore();
        //     validateSetCodeStub.restore();
        // });
    });

    describe("getCards", () => {
        // it("should get all cards", () => {
        //     // arrange
        //     let body = {
        //         body: {}
        //     };
        //     let request = mockReq(body);
        //     let response = mockRes();

        //     let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
        //         return new Query();
        //     });
        //     let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
        //     datastoreRunQueryStub.returnsPromise().resolves();
        //     let queryOrderStub = sandbox.stub(Query.prototype, "order");
        //     let queryFilterStub = sandbox.stub(Query.prototype, "filter");

        //     // act
        //     CardAPI.instance().getSets(request, response);

        //     // assert
        //     expect(datastoreCreateQueryStub.called).to.be.true;
        //     expect(queryOrderStub.called).to.be.true;
        //     expect(queryOrderStub.getCall(0).args[0]).to.be.equal("set_name");
        //     expect(datastoreRunQueryStub.called).to.be.true;
        //     expect(response.status.called).to.be.true;
        //     expect(response.status.getCall(0).args[0]).to.be.equal(200);
        //     expect(response.json.called).to.be.true;

        //     // cleanup
        //     datastoreCreateQueryStub.restore();
        //     datastoreRunQueryStub.restore();
        //     queryOrderStub.restore();
        //     queryFilterStub.restore();
        // });

        // it("should validate and filter based on block_code", () => {
        //     // arrange
        //     let body = {
        //         body: {
        //             block_code: "xln"
        //         }
        //     };
        //     let request = mockReq(body);
        //     let response = mockRes();

        //     let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
        //         return new Query();
        //     });
        //     let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
        //     datastoreRunQueryStub.returnsPromise().resolves();
        //     let queryOrderStub = sandbox.stub(Query.prototype, "order");
        //     let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
        //         return new Query();
        //     });
        //     let validateBlockCodeStub = sandbox.stub(Set, "validateBlockCode");

        //     // act
        //     CardAPI.instance().getSets(request, response);

        //     // assert
        //     expect(datastoreCreateQueryStub.called).to.be.true;
        //     expect(validateBlockCodeStub.called).to.be.true;
        //     expect(queryFilterStub.called).to.be.true;
        //     expect(queryFilterStub.getCall(0).args[0]).to.be.equal("block_code");
        //     expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
        //     expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.block_code);
        //     expect(queryOrderStub.called).to.be.true;
        //     expect(queryOrderStub.getCall(0).args[0]).to.be.equal("block_code");
        //     expect(datastoreRunQueryStub.called).to.be.true;
        //     expect(response.status.called).to.be.true;
        //     expect(response.status.getCall(0).args[0]).to.be.equal(200);
        //     expect(response.json.called).to.be.true;

        //     // cleanup
        //     datastoreCreateQueryStub.restore();
        //     datastoreRunQueryStub.restore();
        //     queryOrderStub.restore();
        //     queryFilterStub.restore();
        //     validateBlockCodeStub.restore();
        // });

        // it("should invalidate and return error on invalid block_code", () => {
        //     // arrange
        //     let body = {
        //         body: {
        //             block_code: "xln"
        //         }
        //     };
        //     let request = mockReq(body);
        //     let response = mockRes();

        //     let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
        //         return new Query();
        //     });
        //     let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
        //     let queryOrderStub = sandbox.stub(Query.prototype, "order");
        //     let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
        //         return new Query();
        //     });
        //     let validateBlockCodeStub = sandbox.stub(Set, "validateBlockCode").callsFake(() => {
        //         throw new Error("example error");
        //     });

        //     // act
        //     CardAPI.instance().getSets(request, response);

        //     // assert
        //     expect(datastoreCreateQueryStub.called).to.be.true;
        //     expect(validateBlockCodeStub.called).to.be.true;
        //     expect(queryFilterStub.called).to.be.false;
        //     expect(queryOrderStub.called).to.be.false;
        //     expect(datastoreRunQueryStub.called).to.be.false;
        //     expect(response.status.called).to.be.true;
        //     expect(response.status.getCall(0).args[0]).to.be.equal(400);
        //     expect(response.json.called).to.be.true;

        //     // cleanup
        //     datastoreCreateQueryStub.restore();
        //     datastoreRunQueryStub.restore();
        //     queryOrderStub.restore();
        //     queryFilterStub.restore();
        //     validateBlockCodeStub.restore();
        // });

        // it("should allow filtering on multiple keys", () => {
        //     // arrange
        //     let body = {
        //         body: {
        //             is_digital: false,
        //             set_type: "expansion"
        //         }
        //     };
        //     let request = mockReq(body);
        //     let response = mockRes();

        //     let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
        //         return new Query();
        //     });
        //     let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
        //     datastoreRunQueryStub.returnsPromise().resolves();
        //     let queryOrderStub = sandbox.stub(Query.prototype, "order").callsFake(() => {
        //         return new Query();
        //     });
        //     let queryFilterStub = sandbox.stub(Query.prototype, "filter").callsFake(() => {
        //         return new Query();
        //     });
        //     let validateSetTypeStub = sandbox.stub(Set, "validateSetType");

        //     // act
        //     CardAPI.instance().getSets(request, response);

        //     // assert
        //     expect(datastoreCreateQueryStub.called).to.be.true;
        //     expect(validateSetTypeStub.called).to.be.true;
        //     expect(queryFilterStub.called).to.be.true;
        //     expect(queryFilterStub.getCall(0).args[0]).to.be.equal("is_digital");
        //     expect(queryFilterStub.getCall(0).args[1]).to.be.equal("=");
        //     expect(queryFilterStub.getCall(0).args[2]).to.be.equal(body.body.is_digital);
        //     expect(queryFilterStub.getCall(1).args[0]).to.be.equal("set_type");
        //     expect(queryFilterStub.getCall(1).args[1]).to.be.equal("=");
        //     expect(queryFilterStub.getCall(1).args[2]).to.be.equal(body.body.set_type);
        //     expect(queryOrderStub.called).to.be.true;
        //     expect(queryOrderStub.getCall(0).args[0]).to.be.equal("is_digital");
        //     expect(queryOrderStub.getCall(1).args[0]).to.be.equal("set_type");
        //     expect(datastoreRunQueryStub.called).to.be.true;
        //     expect(response.status.called).to.be.true;
        //     expect(response.status.getCall(0).args[0]).to.be.equal(200);
        //     expect(response.json.called).to.be.true;

        //     // cleanup
        //     datastoreCreateQueryStub.restore();
        //     datastoreRunQueryStub.restore();
        //     queryOrderStub.restore();
        //     queryFilterStub.restore();
        //     validateSetTypeStub.restore();
        // });

        // it("should fail gracefully on save error", () => {
        //     // arrange
        //     let body = {
        //         body: {}
        //     };
        //     let request = mockReq(body);
        //     let response = mockRes();

        //     let datastoreCreateQueryStub = sandbox.stub(Datastore.prototype, "createQuery").callsFake((kind) => {
        //         return new Query();
        //     });
        //     let datastoreRunQueryStub = sandbox.stub(Datastore.prototype, "runQuery");
        //     datastoreRunQueryStub.returnsPromise().rejects();
        //     let queryOrderStub = sandbox.stub(Query.prototype, "order");
        //     let queryFilterStub = sandbox.stub(Query.prototype, "filter");

        //     // act
        //     CardAPI.instance().getSets(request, response);

        //     // assert
        //     expect(datastoreCreateQueryStub.called).to.be.true;
        //     expect(datastoreRunQueryStub.called).to.be.true;
        //     expect(response.status.called).to.be.true;
        //     expect(response.status.getCall(0).args[0]).to.be.equal(500);
        //     expect(response.json.called).to.be.true;

        //     // cleanup
        //     datastoreCreateQueryStub.restore();
        //     datastoreRunQueryStub.restore();
        //     queryOrderStub.restore();
        //     queryFilterStub.restore();
        // });
    });
});
